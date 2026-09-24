import { prisma } from '@/lib/prisma'

export const STAFF_CATEGORIES = ['PRINCIPAL', 'TEACHER', 'STAFF'] as const
export type StaffCategoryValue = (typeof STAFF_CATEGORIES)[number]

export function getPublicStaff() {
  return prisma.staff.findMany({
    where: { isActive: true },
    orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }, { name: 'asc' }],
  })
}
