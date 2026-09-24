'use server'

import bcrypt from 'bcryptjs'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

function value(data: FormData, key: string) { return String(data.get(key) ?? '').trim() }
async function sessionEmail() { const session = await getServerSession(authOptions); if (!session?.user?.email) throw new Error('Anda harus login sebagai admin.'); return session.user.email }

export async function createUser(data: FormData) {
  await sessionEmail()
  const name = value(data, 'name'), email = value(data, 'email').toLowerCase(), password = value(data, 'password')
  if (!name || !/^\S+@\S+\.\S+$/.test(email)) throw new Error('Nama dan email yang valid wajib diisi.')
  if (password.length < 8) throw new Error('Password minimal 8 karakter.')
  if (await prisma.user.findUnique({ where: { email } })) throw new Error('Email sudah digunakan.')
  await prisma.user.create({ data: { name, email, password: await bcrypt.hash(password, 12) } })
  revalidatePath('/admin/akun'); redirect('/admin/akun?saved=1')
}

export async function updateUser(id: string, data: FormData) {
  const activeEmail=await sessionEmail()
  const name = value(data, 'name'), email = value(data, 'email').toLowerCase(), password = value(data, 'password')
  if (!name || !/^\S+@\S+\.\S+$/.test(email)) throw new Error('Nama dan email yang valid wajib diisi.')
  const duplicate = await prisma.user.findFirst({ where: { email, NOT: { id } } })
  if (duplicate) throw new Error('Email sudah digunakan.')
  const target=await prisma.user.findUniqueOrThrow({where:{id}})
  const changedOwnEmail=target.email===activeEmail&&email!==activeEmail
  await prisma.user.update({ where: { id }, data: { name, email, ...(password ? { password: await bcrypt.hash(password, 12) } : {}) } })
  revalidatePath('/admin/akun'); redirect(changedOwnEmail?'/login?changed=1':'/admin/akun?saved=1')
}

export async function deleteUser(id: string) {
  const email = await sessionEmail()
  const user = await prisma.user.findUniqueOrThrow({ where: { id } })
  if (user.email === email) throw new Error('Akun yang sedang digunakan tidak dapat dihapus.')
  if (await prisma.user.count() <= 1) throw new Error('Minimal harus ada satu akun admin.')
  await prisma.user.delete({ where: { id } }); revalidatePath('/admin/akun')
}
