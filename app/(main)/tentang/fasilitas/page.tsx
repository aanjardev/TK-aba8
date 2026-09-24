import Image from "next/image";
import {
  BookOpen,
  Building2,
  HeartPulse,
  Library,
  MonitorPlay,
  Palette,
  Trees,
  type LucideIcon,
} from "lucide-react";
import { Eyebrow, Hl } from "@/components/SharedUI";
import { getFacilities } from "@/lib/school-about";
const icons: Record<string, LucideIcon> = {
  BookOpen,
  Trees,
  Palette,
  Library,
  HeartPulse,
  MonitorPlay,
  Building2,
};
export default async function Page() {
  const d = await getFacilities(),
    items = d.facilities.filter((x) => x.isActive);
  return (
    <main>
      <section className="border-b border-emerald-100 bg-[#e7f3ec] py-20 text-center">
        <div className="container mx-auto max-w-3xl px-6">
          <Eyebrow>Sarana Prasarana</Eyebrow>
          <h1 className="text-4xl font-extrabold text-[#0a1c12] md:text-5xl">
            <Hl>{d.pageTitle}</Hl>
          </h1>
          <p className="mt-5 leading-relaxed text-[#6b8077]">
            {d.introduction}
          </p>
        </div>
      </section>
      {items.length>0&&<section className="py-20">
        <div className="container mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((x, i) => {
            const Icon = icons[x.icon] || Building2;
            return (
              <article
                key={i}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="relative aspect-[16/10] bg-slate-100">
                  {x.image ? (
                    <Image
                      src={x.image}
                      alt={x.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon size={44} className="text-emerald-200" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <Icon size={23} className="mb-4 text-[#00923f]" />
                  <h2 className="text-lg font-extrabold text-[#0a1c12]">
                    {x.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#6b8077]">
                    {x.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>}
    </main>
  );
}
