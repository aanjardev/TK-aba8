import { prisma } from '@/lib/prisma'

export type CurriculumMethod = { title: string; description: string; icon: string }
export type DailySchedule = { time: string; activity: string; description: string }
export type CurriculumData = { title: string; introduction: string; approachTitle: string; approachDescription: string; image: string; methods: CurriculumMethod[]; schedule: DailySchedule[] }
export type ProgramData = { id: string; slug: string; title: string; eyebrow: string; description: string; age: string; schedule: string; capacity: string; teacherRatio: string; highlights: string[]; image: string; isActive: boolean; isFeatured: boolean; sortOrder: number }

export const CURRICULUM_ICONS = ['BrainCircuit', 'HeartHandshake', 'Smile', 'BookOpen', 'Sparkles', 'Palette'] as const
export const DEFAULT_CURRICULUM: CurriculumData = {
  title: 'Kurikulum TK ABA 8',
  introduction: 'Menerapkan Kurikulum Merdeka yang terintegrasi dengan nilai-nilai keislaman dan pembelajaran berbasis bermain untuk mengoptimalkan potensi anak sejak dini.',
  approachTitle: 'Pendekatan Belajar yang Berpusat pada Anak',
  approachDescription: 'Kami memadukan pendekatan saintifik, metode sentra, dan pembiasaan nilai Islam. Anak memperoleh ruang untuk berekspresi, berimajinasi, serta menemukan pengetahuan melalui pengalaman bermain yang bermakna.',
  image: '',
  methods: [
    { title: 'Metode Sentra', description: 'Pembelajaran melalui sentra balok, bahan alam, peran, imtaq, dan kegiatan lain yang merangsang kecerdasan majemuk.', icon: 'BrainCircuit' },
    { title: 'Pembiasaan Karakter Islami', description: 'Adab sehari-hari, hafalan surah pendek, hadis pilihan, doa harian, serta praktik ibadah sederhana.', icon: 'HeartHandshake' },
    { title: 'Belajar Seraya Bermain', description: 'Materi literasi, numerasi, motorik, bahasa, dan sosial emosional dikemas dalam permainan yang tidak membebani anak.', icon: 'Smile' },
  ],
  schedule: [
    { time: '07:15 – 07:30', activity: 'Penyambutan & Jurnal Pagi', description: 'Guru menyambut anak dan mendampingi rutinitas mandiri sebelum kelas.' },
    { time: '07:30 – 08:00', activity: 'Ikrar, Senam & Motorik', description: 'Ikrar bersama, senam pagi, dan aktivitas motorik kasar.' },
    { time: '08:00 – 08:30', activity: 'Circle Time & Pembiasaan Agama', description: 'Berdoa, murojaah, dan penguatan karakter Islami.' },
    { time: '08:30 – 09:30', activity: 'Kegiatan Inti di Sentra', description: 'Bermain dan belajar sesuai sentra yang dijadwalkan.' },
    { time: '09:30 – 10:00', activity: 'Makan & Istirahat', description: 'Pembiasaan hidup bersih, makan bersama, dan bermain bebas.' },
    { time: '10:00 – 10:30', activity: 'Refleksi & Persiapan Pulang', description: 'Mengulas kegiatan, pesan moral, dan doa penutup.' },
  ],
}

type CurriculumRow = Omit<CurriculumData, 'methods' | 'schedule' | 'image'> & { methods: unknown; schedule: unknown; image: string | null }
type ProgramRow = Omit<ProgramData, 'highlights' | 'image'> & { highlights: unknown; image: string | null }
const obj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null
const parseMethods = (v: unknown) => Array.isArray(v) ? v.filter(obj).map(x => ({ title: String(x.title || ''), description: String(x.description || ''), icon: String(x.icon || 'BookOpen') })).filter(x => x.title) : DEFAULT_CURRICULUM.methods
const parseSchedule = (v: unknown) => Array.isArray(v) ? v.filter(obj).map(x => ({ time: String(x.time || ''), activity: String(x.activity || ''), description: String(x.description || '') })).filter(x => x.activity) : DEFAULT_CURRICULUM.schedule
const parseProgram = (row: ProgramRow): ProgramData => ({ ...row, image: row.image || '', isActive: Boolean(row.isActive), isFeatured: Boolean(row.isFeatured), highlights: Array.isArray(row.highlights) ? row.highlights.map(String).filter(Boolean) : [] })

export async function getCurriculum(): Promise<CurriculumData> {
  const rows = await prisma.$queryRaw<CurriculumRow[]>`SELECT title, introduction, approachTitle, approachDescription, image, methods, schedule FROM CurriculumSettings WHERE id = 'main' LIMIT 1`.catch(() => [])
  const row = rows[0]
  return row ? { ...row, image: row.image || '', methods: parseMethods(row.methods), schedule: parseSchedule(row.schedule) } : DEFAULT_CURRICULUM
}
export async function getPrograms(options: { activeOnly?: boolean; featuredOnly?: boolean; limit?: number } = {}): Promise<ProgramData[]> {
  const active = options.activeOnly ? 1 : null
  const featured = options.featuredOnly ? 1 : null
  const limit = options.limit ?? 100
  const rows = await prisma.$queryRaw<ProgramRow[]>`SELECT id, slug, title, eyebrow, description, age, schedule, capacity, teacherRatio, highlights, image, isActive, isFeatured, sortOrder FROM EducationProgram WHERE (${active} IS NULL OR isActive = ${active}) AND (${featured} IS NULL OR isFeatured = ${featured}) ORDER BY sortOrder ASC, createdAt ASC LIMIT ${limit}`.catch(() => [])
  return rows.map(parseProgram)
}
export async function getProgramBySlug(slug: string) { const rows = await prisma.$queryRaw<ProgramRow[]>`SELECT id, slug, title, eyebrow, description, age, schedule, capacity, teacherRatio, highlights, image, isActive, isFeatured, sortOrder FROM EducationProgram WHERE slug = ${slug} AND isActive = true LIMIT 1`.catch(() => []); return rows[0] ? parseProgram(rows[0]) : null }
export async function getProgramById(id: string) { const rows = await prisma.$queryRaw<ProgramRow[]>`SELECT id, slug, title, eyebrow, description, age, schedule, capacity, teacherRatio, highlights, image, isActive, isFeatured, sortOrder FROM EducationProgram WHERE id = ${id} LIMIT 1`.catch(() => []); return rows[0] ? parseProgram(rows[0]) : null }
