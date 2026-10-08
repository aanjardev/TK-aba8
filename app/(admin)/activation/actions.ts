"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { validatePassword } from "@/lib/auth-flow";

function value(data: FormData, key: string) {
  return String(data.get(key) ?? "").trim();
}

export async function checkPendingActivation(data: FormData) {
  const email = value(data, "email").toLowerCase();
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    throw new Error("Alamat email tidak valid.");
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.status !== "PENDING") {
    throw new Error("Email tidak terdaftar sebagai akun pending.");
  }

  return email;
}

export async function activateAccount(data: FormData) {
  const email = value(data, "email").toLowerCase();
  const password = value(data, "password");
  const confirmation = value(data, "confirmation");

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    throw new Error("Alamat email tidak valid.");
  }
  if (password !== confirmation) {
    throw new Error("Konfirmasi password tidak cocok.");
  }
  if (!validatePassword(password)) {
    throw new Error(
      "Password minimal 8 karakter dan harus mengandung huruf besar, huruf kecil, angka, dan simbol.",
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.status !== "PENDING") {
    throw new Error("Email tidak terdaftar sebagai akun pending.");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: await bcrypt.hash(password, 12),
      status: "ACTIVE",
      activationToken: null,
      activationTokenExpiresAt: null,
      resetToken: null,
      resetTokenExpiresAt: null,
    },
  });

  revalidatePath("/admin");
  redirect("/login?activated=1");
}
