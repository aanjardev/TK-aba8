'use server'

import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { mkdir, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { parseJsonList } from '@/lib/admin-utils'

const value = (data: FormData, key: string) => String(data.get(key) ?? '').trim()
const required = (data: FormData, key: string, label: string) => {
  const result = value(data, key)
  if (!result) throw new Error(`${label} wajib diisi.`)
  return result
}

const fileTypes: Record<string, { folder: string; extensions: Record<string, string> }> = {
  brochureFile: { folder: 'brochure', extensions: { 'application/pdf': 'pdf', 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' } },
  registrationFormFile: { folder: 'form', extensions: { 'application/pdf': 'pdf' } },
}

async function saveDocument(data: FormData, key: keyof typeof fileTypes) {
  const file = data.get(key) as File | null
  if (!file || file.size === 0) return undefined
  const config = fileTypes[key]
  const extension = config.extensions[file.type]
  if (!extension) throw new Error(key === 'brochureFile' ? 'Brosur harus PDF, JPG, PNG, atau WebP.' : 'Formulir harus berupa PDF.')
  if (file.size > 8 * 1024 * 1024) throw new Error('Ukuran dokumen maksimal 8 MB.')
  const directory = path.join(process.cwd(), 'public', 'uploads', 'registration', config.folder)
  await mkdir(directory, { recursive: true })
  const filename = `${Date.now()}-${crypto.randomUUID()}.${extension}`
  await writeFile(path.join(directory, filename), Buffer.from(await file.arrayBuffer()))
  return `/uploads/registration/${config.folder}/${filename}`
}

async function removeDocument(file: string | null) {
  if (!file?.startsWith('/uploads/registration/')) return
  const root = path.resolve(process.cwd(), 'public', 'uploads', 'registration')
  const target = path.resolve(process.cwd(), 'public', file.slice(1))
  if (target.startsWith(`${root}${path.sep}`)) await unlink(target).catch(() => undefined)
}

export async function updateRegistrationSettings(data: FormData) {
  const session = await getServerSession(authOptions)
  if (!session?.user) throw new Error('Anda harus login sebagai admin.')

  const requirements = value(data, 'requirements').split(/\r?\n/).map((item) => item.replace(/^\s*\d+[.)]\s*/, '').trim()).filter(Boolean)
  if (!requirements.length) throw new Error('Minimal satu persyaratan wajib diisi.')
  const steps=parseJsonList(data,'steps','Tahapan',(raw,index)=>{const item=raw as Record<string,unknown>,title=String(item.title??'').trim(),description=String(item.description??'').trim();if(!title||!description)throw new Error(`Tahapan ${index+1} belum lengkap.`);return{title,description}})
  const fees=parseJsonList(data,'fees','Biaya',(raw,index)=>{const item=raw as Record<string,unknown>,label=String(item.label??'').trim(),amount=String(item.amount??'').trim();if(!label||!amount)throw new Error(`Biaya ${index+1} belum lengkap.`);return{label,amount}})
  const destination = value(data, 'ctaDestination')
  const ctaDestination = ['form', 'whatsapp', 'brochure'].includes(destination) ? destination : 'form'
  const oldRows = await prisma.$queryRaw<Array<{ brochureFile: string | null; registrationFormFile: string | null }>>`
    SELECT brochureFile, registrationFormFile FROM RegistrationSettings WHERE id = 'main' LIMIT 1
  `
  const old = oldRows[0]
  const newBrochure = await saveDocument(data, 'brochureFile')
  const newForm = await saveDocument(data, 'registrationFormFile')
  const brochureFile = data.get('removeBrochureFile')==='on'?null:newBrochure ?? old?.brochureFile ?? null
  const registrationFormFile = data.get('removeRegistrationFormFile')==='on'?null:newForm ?? old?.registrationFormFile ?? null

  const isOpen = data.get('isOpen') === 'on'
  const showHomeSection = data.get('showHomeSection') === 'on'
  const academicYear = required(data, 'academicYear', 'Tahun ajaran')
  const currentWave = required(data, 'currentWave', 'Gelombang')
  const quota = required(data, 'quota', 'Kuota')
  const promoTitle = required(data, 'promoTitle', 'Judul promosi')
  const promoDescription = required(data, 'promoDescription', 'Deskripsi promosi')
  const ctaLabel = required(data, 'ctaLabel', 'Teks tombol')
  const whatsappNumber = value(data, 'whatsappNumber').replace(/\D/g, '') || null
  const feeNote = value(data, 'feeNote') || null
  const bankName = value(data, 'bankName') || null
  const bankAccount = value(data, 'bankAccount') || null
  const bankHolder = value(data, 'bankHolder') || null

  await prisma.$executeRaw`
    INSERT INTO RegistrationSettings (
      id, isOpen, showHomeSection, academicYear, currentWave, quota, promoTitle, promoDescription,
      ctaLabel, ctaDestination, whatsappNumber, requirements, steps, fees, feeNote,
      bankName, bankAccount, bankHolder, brochureFile, registrationFormFile, createdAt, updatedAt
    ) VALUES (
      'main', ${isOpen}, ${showHomeSection}, ${academicYear}, ${currentWave}, ${quota}, ${promoTitle}, ${promoDescription},
      ${ctaLabel}, ${ctaDestination}, ${whatsappNumber}, ${JSON.stringify(requirements)}, ${JSON.stringify(steps)},
      ${JSON.stringify(fees)}, ${feeNote}, ${bankName}, ${bankAccount}, ${bankHolder}, ${brochureFile},
      ${registrationFormFile}, NOW(3), NOW(3)
    ) ON DUPLICATE KEY UPDATE
      isOpen = VALUES(isOpen), showHomeSection = VALUES(showHomeSection), academicYear = VALUES(academicYear),
      currentWave = VALUES(currentWave), quota = VALUES(quota), promoTitle = VALUES(promoTitle),
      promoDescription = VALUES(promoDescription), ctaLabel = VALUES(ctaLabel), ctaDestination = VALUES(ctaDestination),
      whatsappNumber = VALUES(whatsappNumber), requirements = VALUES(requirements), steps = VALUES(steps), fees = VALUES(fees),
      feeNote = VALUES(feeNote), bankName = VALUES(bankName), bankAccount = VALUES(bankAccount), bankHolder = VALUES(bankHolder),
      brochureFile = VALUES(brochureFile), registrationFormFile = VALUES(registrationFormFile), updatedAt = NOW(3)
  `

  if (newBrochure||data.get('removeBrochureFile')==='on') await removeDocument(old?.brochureFile ?? null)
  if (newForm||data.get('removeRegistrationFormFile')==='on') await removeDocument(old?.registrationFormFile ?? null)
  revalidatePath('/')
  revalidatePath('/pendaftaran')
  revalidatePath('/admin/pendaftaran')
  redirect('/admin/pendaftaran?saved=1')
}
