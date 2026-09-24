import Image from "next/image";
import {
  Building2,
  CalendarDays,
  FileCheck,
  GraduationCap,
} from "lucide-react";
import { Eyebrow, Hl } from "@/components/SharedUI";
import { getSchoolProfile } from "@/lib/school-about";
import { getSiteSettings } from "@/lib/site-settings";
export default async function Page() {
  const [d, site] = await Promise.all([getSchoolProfile(), getSiteSettings()]);
  const info = [
    { icon: GraduationCap, label: "Nama sekolah", value: site.schoolName },
    { icon: FileCheck, label: "NPSN", value: d.npsn },
    { icon: Building2, label: "Status lembaga", value: d.accreditation },
    { icon: CalendarDays, label: "Tahun berdiri", value: d.foundedYear },
  ].filter((item) => item.value?.trim());
  return (
    <main>
      <section className="border-b border-emerald-100 bg-[#eef5f1] py-20 text-center">
        <div className="container mx-auto max-w-3xl px-6">
          <Eyebrow>Mengenal Kami</Eyebrow>
          <h1 className="text-4xl font-extrabold text-[#0a1c12] md:text-5xl">
            <Hl>{d.pageTitle}</Hl>
          </h1>
          <p className="mt-5 leading-relaxed text-[#6b8077]">
            {d.introduction}
          </p>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[300px_1fr] lg:items-center">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[220px] overflow-hidden rounded-3xl bg-emerald-100 sm:max-w-[250px] lg:max-w-[300px]">
            {d.principalPhoto ? (
              <Image
                src={d.principalPhoto}
                alt={d.principalName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-emerald-700">
                Foto kepala sekolah
              </div>
            )}
          </div>
          <div className="rounded-3xl bg-[#0b6538] p-7 text-white sm:p-9">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-200">Sambutan Kepala Sekolah</span>
            <h2 className="mt-3 text-3xl font-extrabold text-white">
              {d.principalName}
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-emerald-50">
              {d.welcomeMessage.split(/\n\n+/).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="border-y bg-[#f7f4ea] py-20">
        <div className="container mx-auto max-w-6xl px-6">
          {info.length > 0 && <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {info.map(({ icon: Icon, label, value }) => (
              <article
                key={label}
                className="rounded-2xl border border-amber-100 bg-white p-6"
              >
                <Icon className="mb-5 text-[#00923f]" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {label}
                </span>
                <p className="mt-2 font-bold text-[#0a1c12]">{value}</p>
              </article>
            ))}
          </div>}
          {d.operationalPermit && <div className="mt-6 rounded-2xl bg-[#0b6538] p-6 text-white">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              SK Izin Operasional
            </span>
            <p className="mt-2 font-bold">{d.operationalPermit}</p>
            <p className="mt-1 text-sm text-emerald-100">
              Diterbitkan oleh {d.permitIssuer}
            </p>
          </div>}
        </div>
      </section>
    </main>
  );
}
