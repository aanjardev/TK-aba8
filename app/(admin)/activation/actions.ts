"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  createToken,
  createTokenHash,
  getTokenExpiry,
  validatePassword,
} from "@/lib/auth-flow";
import { sendEmail } from "@/lib/email";

const TOKEN_TTL_HOURS = 24;

function value(data: FormData, key: string) {
  return String(data.get(key) ?? "").trim();
}

function buildBaseUrl() {
  return process.env.NEXTAUTH_URL ?? "http://localhost:3000";
}

function buildActivationUrl(token: string) {
  return `${buildBaseUrl().replace(/\/$/, "")}/activate?token=${encodeURIComponent(token)}`;
}

function buildResetUrl(token: string) {
  return `${buildBaseUrl().replace(/\/$/, "")}/reset-password?token=${encodeURIComponent(token)}`;
}

export async function requestActivation(data: FormData) {
  const email = value(data, "email").toLowerCase();
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    throw new Error("Alamat email tidak valid.");
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.status !== "PENDING") {
    return;
  }

  const token = createToken();
  const expiresAt = getTokenExpiry();
  const tokenHash = createTokenHash(token);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      activationToken: tokenHash,
      activationTokenExpiresAt: expiresAt,
      status: "PENDING",
    },
  });

  const sent = await sendEmail(email, {
    subject: "Aktivasi akun admin TK ABA 8",
    text: `Gunakan link berikut untuk membuat password akun admin: ${buildActivationUrl(token)}\n\nLink berlaku selama ${TOKEN_TTL_HOURS} jam.`,
    html: `<p>Gunakan link berikut untuk membuat password akun admin:</p><p><a href="${buildActivationUrl(token)}">Aktifkan akun</a></p><p>Link berlaku selama ${TOKEN_TTL_HOURS} jam.</p>`,
  });

  if (!sent) {
    throw new Error(
      "Email aktivasi belum dikirim karena konfigurasi SMTP belum tersedia. Silakan hubungi administrator.",
    );
  }
}

export async function activateAccount(data: FormData) {
  const token = value(data, "token");
  const email = value(data, "email").toLowerCase();
  const password = value(data, "password");
  const confirmation = value(data, "confirmation");

  if (!token) throw new Error("Token aktivasi tidak valid.");
  if (!email || !/^\S+@\S+\.\S+$/.test(email))
    throw new Error("Alamat email tidak valid.");
  if (password !== confirmation)
    throw new Error("Konfirmasi password tidak cocok.");
  if (!validatePassword(password))
    throw new Error(
      "Password minimal 8 karakter dan harus mengandung huruf besar, huruf kecil, angka, dan simbol.",
    );

  const user = await prisma.user.findUnique({ where: { email } });

  if (
    !user ||
    !user.activationToken ||
    !user.activationTokenExpiresAt ||
    user.status !== "PENDING"
  ) {
    throw new Error("Token aktivasi tidak valid atau sudah kedaluwarsa.");
  }

  if (
    user.activationToken !== createTokenHash(token) ||
    user.activationTokenExpiresAt <= new Date()
  ) {
    throw new Error("Token aktivasi tidak valid atau sudah kedaluwarsa.");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: await bcrypt.hash(password, 12),
      status: "ACTIVE",
      activationToken: null,
      activationTokenExpiresAt: null,
    },
  });

  revalidatePath("/admin");
  redirect("/login?activated=1");
}

export async function requestPasswordReset(data: FormData) {
  const email = value(data, "email").toLowerCase();
  if (!/^(?:\S+)@\S+\.\S+$/.test(email))
    throw new Error("Alamat email tidak valid.");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.status !== "ACTIVE") {
    return;
  }

  const token = createToken();
  const expiresAt = getTokenExpiry();
  const tokenHash = createTokenHash(token);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetToken: tokenHash,
      resetTokenExpiresAt: expiresAt,
    },
  });

  const sent = await sendEmail(email, {
    subject: "Reset password admin TK ABA 8",
    text: `Gunakan link berikut untuk reset password: ${buildResetUrl(token)}\n\nLink berlaku selama ${TOKEN_TTL_HOURS} jam.`,
    html: `<p>Gunakan link berikut untuk reset password:</p><p><a href="${buildResetUrl(token)}">Atur ulang password</a></p><p>Link berlaku selama ${TOKEN_TTL_HOURS} jam.</p>`,
  });

  if (!sent) {
    throw new Error(
      "Email reset password belum dikirim karena konfigurasi SMTP belum tersedia. Silakan hubungi administrator.",
    );
  }
}

export async function resetPassword(data: FormData) {
  const token = value(data, "token");
  const email = value(data, "email").toLowerCase();
  const password = value(data, "password");
  const confirmation = value(data, "confirmation");

  if (!token) throw new Error("Token reset password tidak valid.");
  if (!email || !/^\S+@\S+\.\S+$/.test(email))
    throw new Error("Alamat email tidak valid.");
  if (password !== confirmation)
    throw new Error("Konfirmasi password tidak cocok.");
  if (!validatePassword(password))
    throw new Error(
      "Password minimal 8 karakter dan harus mengandung huruf besar, huruf kecil, angka, dan simbol.",
    );

  const user = await prisma.user.findUnique({ where: { email } });

  if (
    !user ||
    !user.resetToken ||
    !user.resetTokenExpiresAt ||
    user.status !== "ACTIVE"
  ) {
    throw new Error("Token reset password tidak valid atau sudah kedaluwarsa.");
  }

  if (
    user.resetToken !== createTokenHash(token) ||
    user.resetTokenExpiresAt <= new Date()
  ) {
    throw new Error("Token reset password tidak valid atau sudah kedaluwarsa.");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: await bcrypt.hash(password, 12),
      resetToken: null,
      resetTokenExpiresAt: null,
    },
  });

  revalidatePath("/admin");
  redirect("/login?reset=1");
}
