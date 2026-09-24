import { prisma } from '@/lib/prisma'

export type MissionItem = { title: string; description: string }
export type VisionMissionData = {
  pageTitle: string
  introduction: string
  visionTitle: string
  visionDescription: string
  visionPoints: string[]
  missions: MissionItem[]
  goals: string[]
}

export const DEFAULT_VISION_MISSION: VisionMissionData = {
  pageTitle: 'Visi, Misi & Tujuan',
  introduction: 'Arah pendidikan TK Aisyiyah Bustanul Athfal 8 Kepanjen dalam mendampingi setiap anak tumbuh menjadi pribadi yang beriman, mandiri, kreatif, dan siap menghadapi masa depan.',
  visionTitle: 'Cerdas, Kreatif & Berakhlak Mulia',
  visionDescription: 'Terwujudnya generasi muslim yang sehat, cerdas, kreatif, mandiri, percaya diri, serta memiliki akhlak mulia melalui pendidikan anak usia dini yang menyenangkan dan bermakna.',
  visionPoints: ['Beriman dan berakhlak mulia', 'Cerdas, kreatif, dan mandiri', 'Sehat, ceria, dan percaya diri'],
  missions: [
    { title: 'Menanamkan Nilai Islami', description: 'Membiasakan ibadah, doa, adab, dan kecintaan kepada Allah sejak usia dini melalui kegiatan sehari-hari.' },
    { title: 'Mengembangkan Potensi Anak', description: 'Memberikan stimulasi yang tepat untuk aspek nilai agama, kognitif, bahasa, motorik, sosial emosional, dan seni.' },
    { title: 'Menciptakan Belajar Menyenangkan', description: 'Menghadirkan pengalaman belajar aktif melalui bermain, eksplorasi, proyek, dan interaksi yang bermakna.' },
    { title: 'Membangun Kemitraan', description: 'Menjalin kerja sama yang hangat dan terbuka antara sekolah, keluarga, serta masyarakat.' },
  ],
  goals: [
    'Membentuk anak yang terbiasa menjalankan nilai agama dan berperilaku santun.',
    'Mengoptimalkan seluruh aspek perkembangan sesuai tahap usia dan keunikan anak.',
    'Menumbuhkan kemandirian, rasa ingin tahu, kreativitas, serta kepercayaan diri.',
    'Mempersiapkan anak memasuki jenjang pendidikan berikutnya dengan bahagia dan siap belajar.',
  ],
}

type Row = Omit<VisionMissionData, 'visionPoints' | 'missions' | 'goals'> & { visionPoints: unknown; missions: unknown; goals: unknown }
const array = <T>(value: unknown, fallback: T[]) => { try { const parsed = typeof value === 'string' ? JSON.parse(value) : value; return Array.isArray(parsed) ? parsed as T[] : fallback } catch { return fallback } }

export async function getVisionMission(): Promise<VisionMissionData> {
  const rows = await prisma.$queryRaw<Row[]>`SELECT pageTitle,introduction,visionTitle,visionDescription,visionPoints,missions,goals FROM VisionMissionSettings WHERE id='main' LIMIT 1`.catch(() => [])
  const row = rows[0]
  if (!row) return DEFAULT_VISION_MISSION
  return { ...row, visionPoints: array(row.visionPoints, DEFAULT_VISION_MISSION.visionPoints), missions: array(row.missions, DEFAULT_VISION_MISSION.missions), goals: array(row.goals, DEFAULT_VISION_MISSION.goals) }
}
