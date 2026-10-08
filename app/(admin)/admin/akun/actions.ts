"use server";

import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createToken, createTokenHash, getTokenExpiry } from "@/lib/auth-flow";
import { sendEmail } from "@/lib/email";

function value(data: FormData, key: string) {
  return String(data.get(key) ?? "").trim();
}
async function sessionEmail() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Anda harus login sebagai admin.");
  return session.user.email;
}

function buildActivationUrl(token: string) {
  return `${process.env.NEXTAUTH_URL?.replace(/\/$/, "") ?? "http://localhost:3000"}/activate?token=${encodeURIComponent(token)}`;
}

export async function createUser(data: FormData) {
  await sessionEmail();
  const name = value(data, "name"),
    email = value(data, "email").toLowerCase();
  if (!name || !/^\S+@\S+\.\S+$/.test(email))
    throw new Error("Nama dan email yang valid wajib diisi.");
  if (await prisma.user.findUnique({ where: { email } }))
    throw new Error("Email sudah digunakan.");

  const token = createToken();
  const expiresAt = getTokenExpiry();
  await prisma.user.create({
    data: {
      name,
      email,
      password: "",
      status: "PENDING",
      activationToken: createTokenHash(token),
      activationTokenExpiresAt: expiresAt,
    },
  });

  const sent = await sendEmail(email, {
    subject: "Aktivasi akun admin TK ABA 8",
    text: `Halo ${name},\n\nGunakan link berikut untuk membuat password akun admin: ${buildActivationUrl(token)}\n\nLink berlaku selama 24 jam.`,
    html: `<p>Halo ${name},</p><p>Gunakan link berikut untuk membuat password akun admin:</p><p><a href="${buildActivationUrl(token)}">Aktifkan akun</a></p><p>Link berlaku selama 24 jam.</p>`,
  });

  if (!sent)
    throw new Error(
      "Email aktivasi belum dikirim karena konfigurasi SMTP belum tersedia.",
    );
  revalidatePath("/admin/akun");
  redirect("/admin/akun?saved=1");
}

export async function updateUser(id: string, data: FormData) {
  const activeEmail = await sessionEmail();
  const name = value(data, "name"),
    email = value(data, "email").toLowerCase(),
    password = value(data, "password");
  if (!name || !/^\S+@\S+\.\S+$/.test(email))
    throw new Error("Nama dan email yang valid wajib diisi.");
  const duplicate = await prisma.user.findFirst({
    where: { email, NOT: { id } },
  });
  if (duplicate) throw new Error("Email sudah digunakan.");
  const target = await prisma.user.findUniqueOrThrow({ where: { id } });
  const changedOwnEmail = target.email === activeEmail && email !== activeEmail;
  await prisma.user.update({
    where: { id },
    data: {
      name,
      email,
      ...(password ? { password: await bcrypt.hash(password, 12) } : {}),
    },
  });
  revalidatePath("/admin/akun");
  redirect(changedOwnEmail ? "/login?changed=1" : "/admin/akun?saved=1");
}

export async function deleteUser(id: string) {
  const email = await sessionEmail();
  const user = await prisma.user.findUniqueOrThrow({ where: { id } });
  if (user.email === email)
    throw new Error("Akun yang sedang digunakan tidak dapat dihapus.");
  if ((await prisma.user.count()) <= 1)
    throw new Error("Minimal harus ada satu akun admin.");
  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/akun");
}
