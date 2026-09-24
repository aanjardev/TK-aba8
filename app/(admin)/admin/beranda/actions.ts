'use server'

import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { mkdir, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { authOptions } from '@/lib/auth'
import { HERO_ICON_NAMES, type HeroIconName } from '@/lib/home-hero'
import { prisma } from '@/lib/prisma'
import { parseJsonList } from '@/lib/admin-utils'

const allowedTypes = new Map([['image/jpeg', 'jpg'], ['image/png', 'png'], ['image/webp', 'webp']])
const value = (data: FormData, key: string) => String(data.get(key) ?? '').trim()

function required(data: FormData, key: string, label: string, min = 2) {
  const result = value(data, key)
  if (result.length < min) throw new Error(`${label} wajib diisi.`)
  return result
}

function safeUrl(data: FormData, key: string) {
  const result = required(data, key, 'Tautan tombol')
  if (!result.startsWith('/') && !/^https?:\/\//i.test(result)) throw new Error('Tautan harus diawali / atau http(s)://.')
  return result
}

async function saveBackground(file: File | null) {
  if (!file || file.size === 0) return undefined
  const extension = allowedTypes.get(file.type)
  if (!extension) throw new Error('Background harus berupa JPG, PNG, atau WEBP.')
  if (file.size > 5 * 1024 * 1024) throw new Error('Ukuran background maksimal 5 MB.')
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'hero')
  await mkdir(uploadDir, { recursive: true })
  const filename = `${Date.now()}-${crypto.randomUUID()}.${extension}`
  await writeFile(path.join(uploadDir, filename), Buffer.from(await file.arrayBuffer()))
  return `/uploads/hero/${filename}`
}

async function removeOldBackground(image: string | null) {
  if (!image?.startsWith('/uploads/hero/')) return
  const root = path.resolve(process.cwd(), 'public', 'uploads', 'hero')
  const target = path.resolve(process.cwd(), 'public', image.slice(1))
  if (target.startsWith(`${root}${path.sep}`)) await unlink(target).catch(() => undefined)
}

export async function updateHomeHero(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session?.user) throw new Error('Anda harus login sebagai admin.')

  const stats=parseJsonList(formData,'stats','Statistik',(raw,index)=>{const item=raw as Record<string,unknown>,statValue=String(item.value??'').trim(),label=String(item.label??'').trim();if(!statValue||!label)throw new Error(`Statistik ${index+1} belum lengkap.`);return{value:statValue,label}})
  if (stats.length > 4) throw new Error('Statistik sekolah maksimal 4 data.')
  const features=parseJsonList(formData,'features','Keunggulan',(raw,index)=>{const item=raw as Record<string,unknown>,icon=String(item.icon??'') as HeroIconName,title=String(item.title??'').trim(),description=String(item.description??'').trim();if(!title||description.length<10)throw new Error(`Keunggulan ${index+1} belum lengkap.`);return{icon:HERO_ICON_NAMES.includes(icon)?icon:'GraduationCap' as HeroIconName,title,description}})

  const oldRows = await prisma.$queryRaw<Array<{ backgroundImage: string | null }>>`
    SELECT backgroundImage FROM HomeHero WHERE id = 'main' LIMIT 1
  `
  const old = oldRows[0]
  const uploaded = await saveBackground(formData.get('backgroundImage') as File | null)
  const headlineTop = required(formData, 'headlineTop', 'Judul baris pertama')
  const headlineHighlight = required(formData, 'headlineHighlight', 'Judul sorotan')
  const headlineBottom = required(formData, 'headlineBottom', 'Judul baris terakhir')
  const description = required(formData, 'description', 'Deskripsi', 10)
  const primaryLabel = required(formData, 'primaryLabel', 'Label tombol utama')
  const primaryUrl = safeUrl(formData, 'primaryUrl')
  const secondaryLabel = required(formData, 'secondaryLabel', 'Label tombol kedua')
  const secondaryUrl = safeUrl(formData, 'secondaryUrl')
  const removeRequested=formData.get('removeBackgroundImage')==='on'
  const backgroundImage = removeRequested ? null : uploaded ?? old?.backgroundImage ?? null
  const statsJson = JSON.stringify(stats)
  const featuresJson = JSON.stringify(features)
  await prisma.$executeRaw`
    INSERT INTO HomeHero (
      id, headlineTop, headlineHighlight, headlineBottom, description,
      primaryLabel, primaryUrl, secondaryLabel, secondaryUrl, backgroundImage,
      stats, features, createdAt, updatedAt
    ) VALUES (
      'main', ${headlineTop}, ${headlineHighlight}, ${headlineBottom}, ${description},
      ${primaryLabel}, ${primaryUrl}, ${secondaryLabel}, ${secondaryUrl}, ${backgroundImage},
      ${statsJson}, ${featuresJson}, NOW(3), NOW(3)
    )
    ON DUPLICATE KEY UPDATE
      headlineTop = VALUES(headlineTop), headlineHighlight = VALUES(headlineHighlight),
      headlineBottom = VALUES(headlineBottom), description = VALUES(description),
      primaryLabel = VALUES(primaryLabel), primaryUrl = VALUES(primaryUrl),
      secondaryLabel = VALUES(secondaryLabel), secondaryUrl = VALUES(secondaryUrl),
      backgroundImage = VALUES(backgroundImage), stats = VALUES(stats),
      features = VALUES(features), updatedAt = NOW(3)
  `
  if (uploaded||removeRequested) await removeOldBackground(old?.backgroundImage ?? null)
  revalidatePath('/')
  revalidatePath('/admin/beranda')
  redirect('/admin/beranda?saved=1')
}
