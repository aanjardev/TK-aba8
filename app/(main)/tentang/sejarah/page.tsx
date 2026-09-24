import Image from "next/image";
import { Eyebrow, Hl } from "@/components/SharedUI";
import { getSchoolHistory } from "@/lib/school-about";
export default async function Page() {
  const d = await getSchoolHistory();
  return (
    <main>
      <section className="border-b border-amber-200 bg-[#fff5df] py-20 text-center">
        <div className="container mx-auto max-w-3xl px-6">
          <Eyebrow>Jejak Langkah Kami</Eyebrow>
          <h1 className="text-4xl font-extrabold text-[#0a1c12] md:text-5xl">
            <Hl>{d.pageTitle}</Hl>
          </h1>
          <p className="mt-5 leading-relaxed text-[#6b8077]">
            {d.introduction}
          </p>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-slate-100">
              {d.image ? (
                <Image
                  src={d.image}
                  alt="Dokumentasi sejarah sekolah"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-400">
                  Foto dokumentasi sekolah
                </div>
              )}
            </div>
            <div>
              <Eyebrow>Awal Perjalanan</Eyebrow>
              <h2 className="text-3xl font-extrabold text-[#0a1c12]">
                {d.storyTitle}
              </h2>
              <p className="mt-5 text-sm leading-7 text-[#596c63]">{d.story}</p>
            </div>
          </div>
          {d.milestones.length>0&&<div className="mt-20">
            <div className="mb-8">
              <Eyebrow>Perjalanan dari Masa ke Masa</Eyebrow>
              <h2 className="text-3xl font-extrabold text-[#0a1c12]">
                Tonggak <Hl>Sejarah</Hl>
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {d.milestones.map((m, i) => (
                <article
                  key={i}
                  className="rounded-3xl border border-emerald-100 bg-[#f4faf6] p-6"
                >
                  <span className="text-3xl font-black text-[#00923f]">
                    {m.year}
                  </span>
                  <h3 className="mt-4 text-lg font-extrabold text-[#0a1c12]">
                    {m.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#6b8077]">
                    {m.description}
                  </p>
                </article>
              ))}
            </div>
          </div>}
        </div>
      </section>
    </main>
  );
}
