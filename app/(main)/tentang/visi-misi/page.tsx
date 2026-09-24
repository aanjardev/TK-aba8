import { Check, Target } from 'lucide-react'
import { Eyebrow, Hl, cardShadow } from '@/components/SharedUI'
import { getVisionMission } from '@/lib/vision-mission'

export default async function VisiMisiPage() {
  const data = await getVisionMission()
  return <main className="overflow-hidden bg-white text-[#4a5c52]">
    <section className="relative border-b border-emerald-100 bg-[#f2faf6] py-20">
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#00923f]/10 blur-3xl"/>
      <div className="container relative mx-auto max-w-4xl px-6 text-center"><Eyebrow>Arah Pendidikan Sekolah</Eyebrow><h1 className="text-4xl font-extrabold tracking-tight text-[#0a1c12] md:text-5xl">{data.pageTitle.includes('&') ? data.pageTitle : <Hl>{data.pageTitle}</Hl>}</h1><p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[#6b8077] md:text-lg">{data.introduction}</p></div>
    </section>

    <section className="py-20"><div className="container mx-auto px-6">
      <div className={`mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-emerald-100 bg-white lg:grid-cols-[.9fr_1.1fr] ${cardShadow}`}>
        <div className="relative flex flex-col justify-center bg-[#007f36] p-8 text-white md:p-12"><div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10"/><Target size={38} className="relative mb-6 text-amber-300"/><span className="relative text-xs font-extrabold uppercase tracking-[.18em] text-emerald-200">Visi Sekolah</span><h2 className="relative mt-3 text-3xl font-extrabold leading-tight">{data.visionTitle}</h2><p className="relative mt-5 text-sm leading-relaxed text-emerald-50/85">{data.visionDescription}</p></div>
        {data.visionPoints.length>0&&<div className="p-8 md:p-12"><h3 className="text-xl font-extrabold text-[#0a1c12]">Fokus yang ingin kami wujudkan</h3><div className="mt-6 space-y-4">{data.visionPoints.map((point, index) => <div key={index} className="flex items-start gap-4 rounded-2xl border border-emerald-100 bg-[#f7fcf9] p-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-[#00923f]">{index + 1}</span><p className="pt-1 text-sm font-semibold leading-relaxed text-[#4a5c52]">{point}</p></div>)}</div></div>}
      </div>

      {data.missions.length>0&&<div className="mx-auto mt-20 max-w-6xl"><div className="mb-10 text-center"><Eyebrow>Langkah Nyata</Eyebrow><h2 className="text-3xl font-extrabold text-[#0a1c12]">Misi <Hl>Pendidikan Kami</Hl></h2></div><div className="grid gap-5 md:grid-cols-2">{data.missions.map((mission, index) => <article key={index} className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm"><div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 font-extrabold text-amber-700">0{index + 1}</div><h3 className="text-lg font-extrabold text-[#0a1c12]">{mission.title}</h3><p className="mt-3 text-sm leading-relaxed text-[#6b8077]">{mission.description}</p></article>)}</div></div>}
    </div></section>

    {data.goals.length>0&&<section className="border-y border-emerald-100 bg-[#f7fcf9] py-20"><div className="container mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[.85fr_1.15fr] lg:items-center"><div><Eyebrow>Hasil yang Diharapkan</Eyebrow><h2 className="text-3xl font-extrabold text-[#0a1c12]">Tujuan <Hl>Sekolah</Hl></h2><p className="mt-4 text-sm leading-relaxed text-[#6b8077]">Setiap program dan kegiatan belajar diarahkan pada capaian perkembangan berikut.</p></div><div className="space-y-3">{data.goals.map((goal, index) => <div key={index} className="flex gap-4 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm"><Check className="mt-0.5 shrink-0 text-[#00923f]" size={20}/><p className="text-sm font-semibold leading-relaxed text-[#4a5c52]">{goal}</p></div>)}</div></div></section>}

  </main>
}
