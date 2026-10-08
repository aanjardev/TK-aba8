"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import {
  createToken,
  createTokenHash,
  getTokenExpiry,
  validatePassword,
} from "@/lib/auth-flow";
import { sendEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";

const TOKEN_TTL_HOURS = 24;

function value(data: FormData, key: string) {
  return String(data.get(key) ?? "").trim();
}

function buildResetUrl(token: string) {
  return `${process.env.NEXTAUTH_URL?.replace(/\/$/, "") ?? "http://localhost:3000"}/reset-password?token=${encodeURIComponent(token)}`;
}

export async function requestPasswordReset(data: FormData) {
  const email = value(data, "email").toLowerCase();
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    throw new Error("Alamat email tidak valid.");
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.status !== "ACTIVE") {
    return;
  }

  const token = createToken();
  const expiresAt = getTokenExpiry();
  const tokenHash = createTokenHash(token);

  await prisma.user.update({
    where: { id: user.id },
    data: { resetToken: tokenHash, resetTokenExpiresAt: expiresAt },
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

  redirect("/login?reset=1");
}
