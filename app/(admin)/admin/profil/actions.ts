'use server'

import bcrypt from 'bcryptjs'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

async function currentUser() { const session = await getServerSession(authOptions); if (!session?.user?.email) throw new Error('Anda harus login.'); return prisma.user.findUniqueOrThrow({ where: { email: session.user.email } }) }
const value = (data: FormData, key: string) => String(data.get(key) ?? '').trim()

export async function updateProfile(data: FormData) {
  const user = await currentUser(), name = value(data, 'name'), email = value(data, 'email').toLowerCase()
  if (!name || !/^\S+@\S+\.\S+$/.test(email)) throw new Error('Nama dan email yang valid wajib diisi.')
  const duplicate = await prisma.user.findFirst({ where: { email, NOT: { id: user.id } } }); if (duplicate) throw new Error('Email sudah digunakan.')
  await prisma.user.update({ where: { id: user.id }, data: { name, email } }); redirect(email!==user.email?'/login?changed=1':'/admin/profil?saved=profile')
}

export async function changePassword(data: FormData) {
  const user = await currentUser(), current = value(data, 'currentPassword'), password = value(data, 'password'), confirmation = value(data, 'confirmation')
  if (!(await bcrypt.compare(current, user.password))) throw new Error('Password saat ini tidak sesuai.')
  if (password.length < 8) throw new Error('Password baru minimal 8 karakter.')
  if (password !== confirmation) throw new Error('Konfirmasi password tidak sama.')
  await prisma.user.update({ where: { id: user.id }, data: { password: await bcrypt.hash(password, 12) } }); redirect('/admin/profil?tab=pengaturan&saved=password')
}
