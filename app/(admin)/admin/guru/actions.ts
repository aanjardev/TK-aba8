'use server'

import crypto from 'node:crypto'
import path from 'node:path'
import { mkdir, unlink, writeFile } from 'node:fs/promises'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { STAFF_CATEGORIES, type StaffCategoryValue } from '@/lib/staff'

function value(data: FormData, key: string) { return String(data.get(key) ?? '').trim() }
function required(data: FormData, key: string, label: string) { const result = value(data, key); if (!result) throw new Error(`${label} wajib diisi.`); return result }
async function requireAdmin() { if (!(await getServerSession(authOptions))?.user) throw new Error('Anda harus login sebagai admin.') }

async function saveImage(file: File | null) {
  if (!file?.size) return undefined
  const ext = ({ 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' } as Record<string, string>)[file.type]
  if (!ext) throw new Error('Foto harus berupa JPG, PNG, atau WebP.')
  if (file.size > 5 * 1024 * 1024) throw new Error('Ukuran foto maksimal 5 MB.')
  const directory = path.join(process.cwd(), 'public', 'uploads', 'staff')
  await mkdir(directory, { recursive: true })
  const filename = `${Date.now()}-${crypto.randomUUID()}.${ext}`
  await writeFile(path.join(directory, filename), Buffer.from(await file.arrayBuffer()))
  return `/uploads/staff/${filename}`
}

async function removeImage(image: string | null) {
  if (!image?.startsWith('/uploads/staff/')) return
  const root = path.resolve(process.cwd(), 'public', 'uploads', 'staff')
  const target = path.resolve(process.cwd(), 'public', image.slice(1))
  if (target.startsWith(`${root}${path.sep}`)) await unlink(target).catch(() => undefined)
}

function staffData(data: FormData) {
  const rawCategory = value(data, 'category') as StaffCategoryValue
  return {
    name: required(data, 'name', 'Nama'),
    category: STAFF_CATEGORIES.includes(rawCategory) ? rawCategory : 'TEACHER' as const,
    position: required(data, 'position', 'Jabatan'),
    identityNo: value(data, 'identityNo') || null,
    education: value(data, 'education') || null,
    imageAlt: value(data, 'imageAlt') || null,
    isActive: data.get('isActive') === 'on',
    sortOrder: Number(value(data, 'sortOrder')) || 0,
  }
}

function refresh() { revalidatePath('/guru'); revalidatePath('/admin/guru'); revalidatePath('/admin') }

export async function createStaff(data: FormData) {
  await requireAdmin()
  const image = await saveImage(data.get('image') as File | null)
  await prisma.staff.create({ data: { ...staffData(data), image } })
  refresh(); redirect('/admin/guru?saved=1')
}

export async function updateStaff(id: string, data: FormData) {
  await requireAdmin()
  const old = await prisma.staff.findUniqueOrThrow({ where: { id } })
  const uploaded = await saveImage(data.get('image') as File | null)
  const removeRequested = data.get('removeImage') === 'on'
  const image = removeRequested ? null : uploaded ?? old.image
  await prisma.staff.update({ where: { id }, data: { ...staffData(data), image } })
  if ((uploaded || removeRequested) && old.image) await removeImage(old.image)
  refresh(); redirect('/admin/guru?saved=1')
}

export async function deleteStaff(id: string) {
  await requireAdmin()
  const item = await prisma.staff.delete({ where: { id } })
  await removeImage(item.image); refresh()
}
