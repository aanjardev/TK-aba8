import { prisma } from '@/lib/prisma'

export type AchievementData = {
  id: string
  title: string
  recipient: string
  category: string
  level: string
  year: number
  description: string
  image: string
  imageAlt: string
  isActive: boolean
  isFeatured: boolean
  sortOrder: number
}

type AchievementRow = Omit<AchievementData, 'image' | 'imageAlt'> & { image: string | null; imageAlt: string | null }
const parse = (row: AchievementRow): AchievementData => ({ ...row, image: row.image || '', imageAlt: row.imageAlt || '', year: Number(row.year), sortOrder: Number(row.sortOrder), isActive: Boolean(row.isActive), isFeatured: Boolean(row.isFeatured) })

export async function getAchievements(options: { activeOnly?: boolean; featuredOnly?: boolean; limit?: number; category?: string; year?: number } = {}) {
  const active = options.activeOnly ? 1 : null
  const featured = options.featuredOnly ? 1 : null
  const category = options.category || null
  const year = options.year || null
  const limit = options.limit ?? 100
  const rows = await prisma.$queryRaw<AchievementRow[]>`SELECT id,title,recipient,category,level,year,description,image,imageAlt,isActive,isFeatured,sortOrder FROM Achievement WHERE (${active} IS NULL OR isActive=${active}) AND (${featured} IS NULL OR isFeatured=${featured}) AND (${category} IS NULL OR category=${category}) AND (${year} IS NULL OR year=${year}) ORDER BY year DESC, sortOrder ASC, createdAt DESC LIMIT ${limit}`.catch(() => [])
  return rows.map(parse)
}
export async function getAchievementById(id: string) { const rows = await prisma.$queryRaw<AchievementRow[]>`SELECT id,title,recipient,category,level,year,description,image,imageAlt,isActive,isFeatured,sortOrder FROM Achievement WHERE id=${id} LIMIT 1`.catch(() => []); return rows[0] ? parse(rows[0]) : null }
export async function getAchievementFacets() {
  const [categories, years] = await Promise.all([
    prisma.$queryRaw<Array<{category:string}>>`SELECT DISTINCT category FROM Achievement WHERE isActive=true ORDER BY category`,
    prisma.$queryRaw<Array<{year:number}>>`SELECT DISTINCT year FROM Achievement WHERE isActive=true ORDER BY year DESC`,
  ]).catch(() => [[], []] as [Array<{category:string}>,Array<{year:number}>])
  return { categories: categories.map(v=>v.category), years: years.map(v=>Number(v.year)) }
}
