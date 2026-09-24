import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export type PublicNews = Awaited<ReturnType<typeof getPublishedNews>>[number];

export async function getPublishedNews(limit?: number) {
  try {
    return await prisma.news.findMany({
      where: { status: "PUBLISHED", publishedAt: { lte: new Date() } },
      orderBy: [{ isFeatured: "desc" }, { publishedAt: "desc" }],
      ...(limit ? { take: limit } : {}),
    });
  } catch {
    return [];
  }
}

export async function searchPublishedNews({
  query = "",
  category = "",
  year,
  page = 1,
  pageSize = 10,
}: {
  query?: string;
  category?: string;
  year?: number;
  page?: number;
  pageSize?: number;
}) {
  const safePage = Math.max(1, Math.floor(page) || 1),
    safeSize = Math.min(50, Math.max(1, Math.floor(pageSize) || 10)),
    now = new Date();
  const where: Prisma.NewsWhereInput = {
    status: "PUBLISHED",
    publishedAt: { lte: now },
    ...(query
      ? {
          OR: [
            { title: { contains: query } },
            { excerpt: { contains: query } },
          ],
        }
      : {}),
    ...(category ? { category } : {}),
    ...(year
      ? {
          publishedAt: {
            gte: new Date(`${year}-01-01T00:00:00+07:00`),
            lt: new Date(`${year + 1}-01-01T00:00:00+07:00`),
            lte: now,
          },
        }
      : {}),
  };
  try {
    const total = await prisma.news.count({ where });
    const totalPages = Math.max(1, Math.ceil(total / safeSize));
    const actualPage = Math.min(safePage, totalPages);
    const [items, categories, dates] = await Promise.all([
      prisma.news.findMany({
        where,
        orderBy: [{ isFeatured: "desc" }, { publishedAt: "desc" }],
        skip: (actualPage - 1) * safeSize,
        take: safeSize,
      }),
      prisma.news.findMany({
        where: { status: "PUBLISHED", publishedAt: { lte: now } },
        distinct: ["category"],
        select: { category: true },
        orderBy: { category: "asc" },
      }),
      prisma.news.findMany({
        where: { status: "PUBLISHED", publishedAt: { lte: now } },
        select: { publishedAt: true },
      }),
    ]);
    const years = [
      ...new Set(
        dates.flatMap((x) =>
          x.publishedAt ? [x.publishedAt.getFullYear()] : [],
        ),
      ),
    ].sort((a, b) => b - a);
    return {
      items,
      total,
      totalPages,
      page: actualPage,
      facets: { categories: categories.map((x) => x.category), years },
    };
  } catch {
    return {
      items: [],
      total: 0,
      totalPages: 1,
      page: 1,
      facets: { categories: [], years: [] as number[] },
    };
  }
}

export async function getNewsBySlug(slug: string) {
  try {
    return await prisma.news.findFirst({
      where: { slug, status: "PUBLISHED", publishedAt: { lte: new Date() } },
    });
  } catch {
    return null;
  }
}

export function formatNewsDate(date: Date | null) {
  if (!date) return "Belum diterbitkan";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(date);
}

export function readingTime(content: string) {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200));
}
