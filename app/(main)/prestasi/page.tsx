import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  CalendarDays,
  ImageIcon,
  Medal,
  Star,
  Trophy,
} from "lucide-react";
import { getAchievementFacets, getAchievements } from "@/lib/achievements";
import { getSiteSettings } from "@/lib/site-settings";
export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  return {
    title: "Prestasi",
    description: `Pencapaian siswa, guru, dan ${site.shortName}.`,
  };
}
export default async function AchievementPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; year?: string }>;
}) {
  const q = await searchParams,
    category = typeof q.category === "string" ? q.category : "",
    year = Number(q.year) || undefined;
  const [items, facets] = await Promise.all([
    getAchievements({
      activeOnly: true,
      category: category || undefined,
      year,
    }),
    getAchievementFacets(),
  ]);
  const featured = items.find((x) => x.isFeatured),
    rest = featured ? items.filter((x) => x.id !== featured.id) : items;
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden border-b border-emerald-100 bg-[#f4fcf7] px-6 py-20 text-center">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="container relative mx-auto max-w-3xl">
          <span className="text-xs font-extrabold uppercase tracking-[.2em] text-[#00923f]">
            Jejak Prestasi
          </span>
          <h1 className="mt-4 text-4xl font-extrabold text-[#0a1c12] md:text-5xl">
            Tumbuh, Berani, dan Membanggakan
          </h1>
          <p className="mt-5 leading-relaxed text-[#6b8077]">
            Apresiasi bagi siswa, pendidik, dan sekolah yang terus berkembang
            serta berani menunjukkan potensi terbaiknya.
          </p>
        </div>
      </section>
      <section className="px-6 py-16">
        <div className="container mx-auto max-w-6xl">
          <form className="mb-10 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row">
            <select
              name="category"
              defaultValue={category}
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="">Semua kategori</option>
              {facets.categories.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
            <select
              name="year"
              defaultValue={year || ""}
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="">Semua tahun</option>
              {facets.years.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
            <button className="rounded-xl bg-[#0a1c12] px-6 py-2.5 text-sm font-bold text-white">
              Terapkan
            </button>
            {(category || year) && (
              <Link
                href="/prestasi"
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-center text-sm font-bold text-slate-600"
              >
                Reset
              </Link>
            )}
          </form>
          {featured && (
            <article className="mb-8 grid overflow-hidden rounded-[2rem] bg-[#073d24] text-white shadow-xl lg:grid-cols-2">
              <div className="relative min-h-64 bg-emerald-900">
                {featured.image ? (
                  <Image
                    src={featured.image}
                    alt={featured.imageAlt || featured.title}
                    fill
                    priority
                    sizes="(max-width:1024px) 100vw,50vw"
                    className="object-cover"
                  />
                ) : (
                  <span className="flex h-full items-center justify-center text-emerald-500">
                    <Trophy size={70} />
                  </span>
                )}
              </div>
              <div className="p-8 md:p-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-3 py-1.5 text-[10px] font-extrabold uppercase text-emerald-950">
                  <Star size={13} fill="currentColor" />
                  Prestasi unggulan
                </span>
                <h2 className="mt-5 text-3xl font-extrabold">
                  {featured.title}
                </h2>
                <p className="mt-3 text-sm font-semibold text-emerald-300">
                  {[featured.recipient, featured.level, featured.year].filter(Boolean).join(" - ")}
                </p>
                <p className="mt-5 leading-relaxed text-white/65">
                  {featured.description}
                </p>
              </div>
            </article>
          )}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-video bg-slate-50">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.imageAlt || item.title}
                      fill
                      sizes="(max-width:768px) 100vw,33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center text-slate-200">
                      <ImageIcon size={45} />
                    </span>
                  )}
                  <span className="absolute right-4 top-4 rounded-xl bg-white/95 px-3 py-1.5 text-lg font-extrabold text-amber-500">
                    {item.year}
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#00923f]">
                    {item.category}
                  </span>
                  <h2 className="mt-2 text-lg font-extrabold leading-snug text-[#0a1c12]">
                    {item.title}
                  </h2>
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                    <Medal size={14} />
                    {[item.recipient, item.level].filter(Boolean).join(" - ")}
                  </p>
                  <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-[#6b8077]">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
          {!items.length && (
            <div className="py-20 text-center">
              <Award className="mx-auto text-slate-200" size={52} />
              <p className="mt-4 font-semibold text-slate-500">
                Belum ada prestasi untuk filter ini.
              </p>
            </div>
          )}
          <p className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-400">
            <CalendarDays size={16} />
            {items.length} prestasi ditampilkan
          </p>
        </div>
      </section>
    </main>
  );
}
