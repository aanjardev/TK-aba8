"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createTokenHash, validatePassword } from "@/lib/auth-flow";

function value(data: FormData, key: string) {
  return String(data.get(key) ?? "").trim();
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
