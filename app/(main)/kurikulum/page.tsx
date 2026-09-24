import type { Metadata } from "next";
import Image from "next/image";
import {
  BookOpen,
  BrainCircuit,
  Clock,
  HeartHandshake,
  ImageIcon,
  Palette,
  Smile,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { getCurriculum } from "@/lib/academics";
import { getSiteSettings } from "@/lib/site-settings";
export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  return {
    title: "Kurikulum",
    description: `Pendekatan pembelajaran dan jadwal harian ${site.shortName}.`,
  };
}
const icons: Record<string, LucideIcon> = {
  BookOpen,
  BrainCircuit,
  HeartHandshake,
  Smile,
  Sparkles,
  Palette,
};
export default async function CurriculumPage() {
  const data = await getCurriculum();
  return (
    <main className="bg-white text-[#4a5c52]">
      <section className="relative overflow-hidden border-b border-emerald-100 bg-[#f4fcf7] px-6 py-20 text-center">
        <div className="container mx-auto max-w-3xl">
          <span className="text-xs font-extrabold uppercase tracking-[.2em] text-[#00923f]">
            Sistem Pembelajaran
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-[#0a1c12] md:text-5xl">
            {data.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[#6b8077] md:text-lg">
            {data.introduction}
          </p>
        </div>
      </section>
      <section className="px-6 py-20">
        <div className="container mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-emerald-100 bg-emerald-50">
            {data.image ? (
              <Image
                src={data.image}
                alt={data.approachTitle}
                fill
                sizes="(max-width:1024px) 100vw,50vw"
                className="object-cover"
              />
            ) : (
              <span className="flex h-full items-center justify-center text-emerald-200">
                <ImageIcon size={52} />
              </span>
            )}
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Pendekatan kami
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-[#0a1c12]">
              {data.approachTitle}
            </h2>
            <p className="mt-4 leading-relaxed text-[#6b8077]">
              {data.approachDescription}
            </p>
            <div className="mt-8 space-y-5">
              {data.methods.map((m, i) => {
                const Icon = icons[m.icon] || BookOpen;
                return (
                  <article key={i} className="flex gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#00923f]">
                      <Icon size={24} />
                    </span>
                    <div>
                      <h3 className="font-bold text-[#0a1c12]">{m.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#6b8077]">
                        {m.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {data.schedule.length>0&&<section className="border-t border-slate-100 bg-[#fafdfb] px-6 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center">
            <span className="text-xs font-extrabold uppercase tracking-[.2em] text-[#00923f]">
              Rutinitas siswa
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-[#0a1c12]">
              Jadwal Harian
            </h2>
          </div>
          <div className="mt-10 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">
            {data.schedule.map((s, i) => (
              <article
                key={i}
                className="grid gap-3 border-b border-emerald-50 p-5 last:border-0 md:grid-cols-[180px_1fr]"
              >
                <span className="flex items-center gap-2 font-bold text-[#00923f]">
                  <Clock size={16} />
                  {s.time}
                </span>
                <div>
                  <h3 className="font-bold text-[#0a1c12]">{s.activity}</h3>
                  <p className="mt-1 text-sm text-[#6b8077]">{s.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>}
    </main>
  );
}
