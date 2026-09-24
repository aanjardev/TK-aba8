'use server'

import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { mkdir, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const allowedTypes = new Map([
  ['image/jpeg', 'jpg'], ['image/png', 'png'], ['image/webp', 'webp'],
])

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? '').trim()
}

function slugify(value: string) {
  return value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 90)
}

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session?.user) throw new Error('Anda harus login sebagai admin.')
}

async function uniqueSlug(title: string, currentId?: string) {
  const base = slugify(title) || `berita-${Date.now()}`
  let slug = base
  let suffix = 2
  while (await prisma.news.findFirst({ where: { slug, ...(currentId ? { NOT: { id: currentId } } : {}) }, select: { id: true } })) {
    slug = `${base}-${suffix++}`
  }
  return slug
}

async function saveImage(file: File | null) {
  if (!file || file.size === 0) return undefined
  const extension = allowedTypes.get(file.type)
  if (!extension) throw new Error('Gambar harus berformat JPG, PNG, atau WEBP.')
  if (file.size > 5 * 1024 * 1024) throw new Error('Ukuran gambar maksimal 5 MB.')
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'news')
  await mkdir(uploadDir, { recursive: true })
  const filename = `${Date.now()}-${crypto.randomUUID()}.${extension}`
  await writeFile(path.join(uploadDir, filename), Buffer.from(await file.arrayBuffer()))
  return `/uploads/news/${filename}`
}

async function removeImage(image: string | null) {
  if (!image?.startsWith('/uploads/news/')) return
  const target = path.resolve(process.cwd(), 'public', image.slice(1))
  const root = path.resolve(process.cwd(), 'public', 'uploads', 'news')
  if (!target.startsWith(`${root}${path.sep}`)) return
  await unlink(target).catch(() => undefined)
}

function validate(title: string, excerpt: string, content: string) {
  if (title.length < 5) throw new Error('Judul minimal 5 karakter.')
  if (excerpt.length < 20) throw new Error('Ringkasan minimal 20 karakter.')
  if (content.length < 30) throw new Error('Konten minimal 30 karakter.')
}

export async function createNews(formData: FormData) {
  await requireAdmin()
  const title = text(formData, 'title')
  const excerpt = text(formData, 'excerpt')
  const content = text(formData, 'content')
  validate(title, excerpt, content)
  const status = text(formData, 'intent') === 'publish' ? 'PUBLISHED' : 'DRAFT'
  const dateValue = text(formData, 'publishedAt')
  const image = await saveImage(formData.get('image') as File | null)

  await prisma.news.create({ data: {
    title, slug: await uniqueSlug(title), category: text(formData, 'category') || 'Berita',
    excerpt, content, image, imageAlt: text(formData, 'imageAlt') || title,
    author: text(formData, 'author') || null, isFeatured: formData.get('isFeatured') === 'on',
    status, publishedAt: status === 'PUBLISHED' ? (dateValue ? new Date(`${dateValue}T12:00:00+07:00`) : new Date()) : null,
  } })
  revalidatePath('/'); revalidatePath('/berita'); redirect('/admin/berita')
}

export async function updateNews(id: string, formData: FormData) {
  await requireAdmin()
  const old = await prisma.news.findUniqueOrThrow({ where: { id } })
  const title = text(formData, 'title')
  const excerpt = text(formData, 'excerpt')
  const content = text(formData, 'content')
  validate(title, excerpt, content)
  const status = text(formData, 'intent') === 'publish' ? 'PUBLISHED' : 'DRAFT'
  const uploaded = await saveImage(formData.get('image') as File | null)
  const removeRequested = formData.get('removeImage') === 'on'
  const finalImage = removeRequested ? null : uploaded ?? old.image
  const dateValue = text(formData, 'publishedAt')
  await prisma.news.update({ where: { id }, data: {
    title, slug: title === old.title ? old.slug : await uniqueSlug(title, id),
    category: text(formData, 'category') || 'Berita', excerpt, content,
    image: finalImage, imageAlt: text(formData, 'imageAlt') || title,
    author: text(formData, 'author') || null, isFeatured: formData.get('isFeatured') === 'on', status,
    publishedAt: status === 'PUBLISHED' ? (dateValue ? new Date(`${dateValue}T12:00:00+07:00`) : old.publishedAt ?? new Date()) : null,
  } })
  if ((uploaded || removeRequested) && old.image) await removeImage(old.image)
  revalidatePath('/'); revalidatePath('/berita'); revalidatePath(`/berita/${old.slug}`); redirect('/admin/berita')
}

export async function deleteNews(id: string) {
  await requireAdmin()
  const item = await prisma.news.delete({ where: { id } })
  await removeImage(item.image)
  revalidatePath('/'); revalidatePath('/berita'); revalidatePath(`/berita/${item.slug}`)
}
