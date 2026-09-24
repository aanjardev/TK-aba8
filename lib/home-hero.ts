import { prisma } from '@/lib/prisma'

export const HERO_ICON_NAMES = [
  'GraduationCap', 'Shield', 'Users', 'BookOpen', 'Award', 'Smile', 'Palette', 'Eye', 'Target',
] as const

export type HeroIconName = (typeof HERO_ICON_NAMES)[number]
export type HeroStat = { value: string; label: string }
export type HeroFeature = { icon: HeroIconName; title: string; description: string }

export type HomeHeroData = {
  headlineTop: string
  headlineHighlight: string
  headlineBottom: string
  description: string
  primaryLabel: string
  primaryUrl: string
  secondaryLabel: string
  secondaryUrl: string
  backgroundImage: string
  stats: HeroStat[]
  features: HeroFeature[]
}

export const DEFAULT_HOME_HERO: HomeHeroData = {
  headlineTop: 'Tempat Terbaik',
  headlineHighlight: 'Tumbuh & Belajar',
  headlineBottom: 'Si Kecil Bersinar',
  description: 'TK Aisyiyah Bustanul Athfal 8 Kepanjen mendidik anak usia dini dengan pendekatan penuh kasih, kurikulum islami terpadu, dan lingkungan belajar yang aman & menyenangkan.',
  primaryLabel: 'Daftar PPDB Online',
  primaryUrl: '/pendaftaran',
  secondaryLabel: 'Profil Sekolah',
  secondaryUrl: '/tentang/profil',
  backgroundImage: '/images/hero-sekolah.png',
  stats: [
    { value: '200+', label: 'Siswa Aktif' },
    { value: '15+', label: 'Pendidik PAUD' },
    { value: '20+', label: 'Tahun Berdiri' },
    { value: '50+', label: 'Penghargaan' },
  ],
  features: [
    { icon: 'GraduationCap', title: 'Kurikulum Islami Terpadu', description: 'Modul belajar aktif berbasis permainan yang menyenangkan, kreatif, dan berkarakter islami.' },
    { icon: 'Shield', title: 'Lingkungan Aman & Nyaman', description: 'Fasilitas bersih, sirkulasi udara baik, dan area bermain yang selalu terpantau.' },
    { icon: 'Users', title: 'Guru Penyayang & Profesional', description: 'Tenaga pendidik bersertifikat PAUD dengan pendampingan hangat, sabar, dan tulus.' },
  ],
}

type HomeHeroRow = Omit<HomeHeroData, 'backgroundImage' | 'stats' | 'features'> & {
  backgroundImage: string | null
  stats: unknown
  features: unknown
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function parseStats(value: unknown): HeroStat[] {
  if (!Array.isArray(value)) return DEFAULT_HOME_HERO.stats
  const stats = value.filter(isRecord).map((item) => ({ value: String(item.value ?? ''), label: String(item.label ?? '') }))
  return stats.length ? stats : DEFAULT_HOME_HERO.stats
}

function parseFeatures(value: unknown): HeroFeature[] {
  if (!Array.isArray(value)) return DEFAULT_HOME_HERO.features
  const features = value.filter(isRecord).map((item) => ({
    icon: HERO_ICON_NAMES.includes(item.icon as HeroIconName) ? item.icon as HeroIconName : 'GraduationCap',
    title: String(item.title ?? ''),
    description: String(item.description ?? ''),
  }))
  return features.length ? features : DEFAULT_HOME_HERO.features
}

export async function getHomeHero(): Promise<HomeHeroData> {
  const rows = await prisma.$queryRaw<HomeHeroRow[]>`
    SELECT headlineTop, headlineHighlight, headlineBottom, description,
      primaryLabel, primaryUrl, secondaryLabel, secondaryUrl,
      backgroundImage, stats, features
    FROM HomeHero WHERE id = 'main' LIMIT 1
  `.catch(() => [])
  const hero = rows[0]
  if (!hero) return DEFAULT_HOME_HERO
  return {
    headlineTop: hero.headlineTop,
    headlineHighlight: hero.headlineHighlight,
    headlineBottom: hero.headlineBottom,
    description: hero.description,
    primaryLabel: hero.primaryLabel,
    primaryUrl: hero.primaryUrl,
    secondaryLabel: hero.secondaryLabel,
    secondaryUrl: hero.secondaryUrl,
    backgroundImage: hero.backgroundImage || DEFAULT_HOME_HERO.backgroundImage,
    stats: parseStats(hero.stats),
    features: parseFeatures(hero.features),
  }
}
