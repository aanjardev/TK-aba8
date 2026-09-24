import { prisma } from '@/lib/prisma'

export type RegistrationStep = { title: string; description: string }
export type RegistrationFee = { label: string; amount: string }

export type RegistrationSettingsData = {
  isOpen: boolean
  showHomeSection: boolean
  academicYear: string
  currentWave: string
  quota: string
  promoTitle: string
  promoDescription: string
  ctaLabel: string
  ctaDestination: 'form' | 'whatsapp' | 'brochure'
  whatsappNumber: string
  requirements: string[]
  steps: RegistrationStep[]
  fees: RegistrationFee[]
  feeNote: string
  bankName: string
  bankAccount: string
  bankHolder: string
  brochureFile: string
  registrationFormFile: string
}

export const DEFAULT_REGISTRATION_SETTINGS: RegistrationSettingsData = {
  isOpen: true,
  showHomeSection: true,
  academicYear: '2026/2027',
  currentWave: 'Gelombang 1 (Januari – April 2026)',
  quota: 'Tersedia 45 Kursi (KB & TK)',
  promoTitle: 'Penerimaan Peserta Didik Baru Telah Dibuka!',
  promoDescription: 'Mari bergabung bersama keluarga besar TK ABA 8 Kepanjen. Dapatkan lingkungan belajar Islami yang aman, hangat, dan menyenangkan untuk buah hati.',
  ctaLabel: 'Lihat Informasi PPDB',
  ctaDestination: 'form',
  whatsappNumber: '6281234567890',
  requirements: [
    'Mengisi formulir pendaftaran secara online atau offline',
    'Fotokopi Akta Kelahiran calon siswa (2 lembar)',
    'Fotokopi Kartu Keluarga (2 lembar)',
    'Pas foto anak ukuran 3×4 berwarna (4 lembar)',
    'Usia minimal 4 tahun untuk TK A dan 5 tahun untuk TK B per bulan Juli',
    'Fotokopi KTP kedua orang tua atau wali murid',
  ],
  steps: [
    { title: 'Pengisian Formulir', description: 'Orang tua mengisi formulir secara online atau datang langsung ke kantor sekolah.' },
    { title: 'Verifikasi Berkas', description: 'Panitia memeriksa kelengkapan dokumen calon siswa.' },
    { title: 'Wawancara & Observasi', description: 'Sesi ramah tamah dan observasi kesiapan belajar anak bersama guru.' },
    { title: 'Penyelesaian Administrasi', description: 'Konfirmasi penerimaan, pembayaran, dan pengambilan perlengkapan belajar.' },
  ],
  fees: [
    { label: 'Biaya Pendaftaran / Formulir', amount: 'Rp 150.000' },
    { label: 'SPP / Infaq Bulanan', amount: 'Rp 200.000 / Bulan' },
    { label: 'Paket Seragam & Atribut', amount: 'Rp 650.000' },
    { label: 'Infaq Pengembangan Pendidikan', amount: 'Rp 1.000.000 (Dapat diangsur)' },
  ],
  feeNote: 'Tersedia program beasiswa dan keringanan biaya bagi keluarga yatim/piatu dan kurang mampu binaan Lazismu.',
  bankName: 'Bank Syariah Indonesia (BSI)',
  bankAccount: '7123456789',
  bankHolder: 'TK ABA 8 KEPANJEN',
  brochureFile: '',
  registrationFormFile: '',
}

type SettingsRow = Omit<RegistrationSettingsData, 'requirements' | 'steps' | 'fees' | 'ctaDestination'> & {
  requirements: unknown
  steps: unknown
  fees: unknown
  ctaDestination: string
}

const record = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null

function stringArray(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) return fallback
  const result = value.map(String).filter(Boolean)
  return result.length ? result : fallback
}

function steps(value: unknown) {
  if (!Array.isArray(value)) return DEFAULT_REGISTRATION_SETTINGS.steps
  const result = value.filter(record).map((item) => ({ title: String(item.title ?? ''), description: String(item.description ?? '') })).filter((item) => item.title)
  return result.length ? result : DEFAULT_REGISTRATION_SETTINGS.steps
}

function fees(value: unknown) {
  if (!Array.isArray(value)) return DEFAULT_REGISTRATION_SETTINGS.fees
  const result = value.filter(record).map((item) => ({ label: String(item.label ?? ''), amount: String(item.amount ?? '') })).filter((item) => item.label)
  return result.length ? result : DEFAULT_REGISTRATION_SETTINGS.fees
}

export async function getRegistrationSettings(): Promise<RegistrationSettingsData> {
  const rows = await prisma.$queryRaw<SettingsRow[]>`SELECT isOpen, showHomeSection, academicYear, currentWave, quota,
    promoTitle, promoDescription, ctaLabel, ctaDestination, whatsappNumber, requirements, steps, fees,
    feeNote, bankName, bankAccount, bankHolder, brochureFile, registrationFormFile
    FROM RegistrationSettings WHERE id = 'main' LIMIT 1`.catch(() => [])
  const data = rows[0]
  if (!data) return DEFAULT_REGISTRATION_SETTINGS
  return {
    ...data,
    isOpen: Boolean(data.isOpen),
    showHomeSection: Boolean(data.showHomeSection),
    ctaDestination: ['form', 'whatsapp', 'brochure'].includes(data.ctaDestination) ? data.ctaDestination as RegistrationSettingsData['ctaDestination'] : 'form',
    whatsappNumber: data.whatsappNumber || '', feeNote: data.feeNote || '', bankName: data.bankName || '',
    bankAccount: data.bankAccount || '', bankHolder: data.bankHolder || '', brochureFile: data.brochureFile || '',
    registrationFormFile: data.registrationFormFile || '', requirements: stringArray(data.requirements, DEFAULT_REGISTRATION_SETTINGS.requirements),
    steps: steps(data.steps), fees: fees(data.fees),
  }
}

export function registrationCtaHref(settings: RegistrationSettingsData) {
  if (settings.ctaDestination === 'whatsapp' && settings.whatsappNumber) {
    const message = encodeURIComponent(`Halo Admin TK ABA 8, saya ingin bertanya tentang PPDB tahun ajaran ${settings.academicYear}.`)
    return `https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=${message}`
  }
  if (settings.ctaDestination === 'brochure' && settings.brochureFile) return settings.brochureFile
  return '/pendaftaran'
}
