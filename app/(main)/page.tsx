// app/page.tsx
import Link from "next/link";
import NewsCard from "@/components/NewsCard";
import Image from "next/image";
import { getPublishedNews, type PublicNews } from "@/lib/news";
import {
  getHomeHero,
  type HomeHeroData,
  type HeroIconName,
} from "@/lib/home-hero";
import {
  getRegistrationSettings,
  registrationCtaHref,
  type RegistrationSettingsData,
} from "@/lib/registration-settings";
import { getPrograms, type ProgramData } from "@/lib/academics";
import { getAchievements, type AchievementData } from "@/lib/achievements";
import { getVisionMission, type VisionMissionData } from "@/lib/vision-mission";
import {
  contactAddress,
  getSchoolContact,
  type SchoolContactData,
} from "@/lib/school-contact";
import { getSiteSettings, type SiteSettingsData } from "@/lib/site-settings";
import WhatsAppContactForm from "@/components/WhatsAppContactForm";
import HorizontalSlider from "@/components/HorizontalSlider";
import { Hl, Eyebrow, SeeMoreLink } from "@/components/SharedUI";
import {
  ChevronRight,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  GraduationCap,
  Award,
  BookOpen,
  Users,
  Shield,
  Smile,
  Palette,
  Eye,
  Target,
  Image as ImageIcon,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

/** Subtle underline-highlight on a span of text */
// ─── Page ────────────────────────────────────────────────────────────────────

export default async function Home() {
  const [
    latestNews,
    hero,
    registration,
    featuredPrograms,
    featuredAchievements,
    visionMission,
    contact,
    site,
  ] = await Promise.all([
    getPublishedNews(3),
    getHomeHero(),
    getRegistrationSettings(),
    getPrograms({ activeOnly: true, featuredOnly: true, limit: 3 }),
    getAchievements({ activeOnly: true, featuredOnly: true, limit: 3 }),
    getVisionMission(),
    getSchoolContact(),
    getSiteSettings(),
  ]);
  return (
    <div className="bg-white text-[#4a5c52] font-poppins selection:bg-[#00923f]/10 selection:text-[#00923f] overflow-x-hidden">
      <HeroSection hero={hero} site={site} />
      <BeritaTerbaru news={latestNews} site={site} />
      {registration.showHomeSection && <InfoPPDB settings={registration} />}
      <ProgramUnggulan programs={featuredPrograms} />
      <VisiMisi data={visionMission} site={site} />
      <PrestasiSection achievements={featuredAchievements} />
      <LokasiKontak contact={contact} />
    </div>
  );
}

function BeritaTerbaru({
  news,
  site,
}: {
  news: PublicNews[];
  site: SiteSettingsData;
}) {
  return (
    <section className="border-b border-[#dce9e2] bg-[#eef5f1] py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <Eyebrow>Kabar Sekolah</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1c12] tracking-tight">
              Berita <Hl>Terbaru</Hl>
            </h2>
            <p className="text-[#6b8077] max-w-lg text-sm mt-3">
              Kegiatan, pengumuman, dan cerita terbaru dari keluarga besar{" "}
              {site.shortName}.
            </p>
          </div>
          <SeeMoreLink href="/berita" label="Semua Berita" />
        </div>
        {news.length > 0 ? (
          <HorizontalSlider label="Berita terbaru">
            {news.map((item, index) => (
              <NewsCard key={item.id} item={item} priority={index < 3} />
            ))}
          </HorizontalSlider>
        ) : (
          <div className="rounded-3xl border-2 border-dashed border-[#b8d9c6] bg-white px-6 py-16 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e6f4ec] text-[#00923f]">
              <ImageIcon size={26} />
            </div>
            <h3 className="text-xl font-extrabold text-[#0a1c12]">
              Kabar terbaru segera hadir
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#6b8077]">
              Berita dan kegiatan terbaru {site.shortName} akan ditampilkan di
              bagian ini setelah diterbitkan oleh admin.
            </p>
            <Link
              href="/berita"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#00923f] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#007f36]"
            >
              Lihat Halaman Berita <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── 1. Hero ─────────────────────────────────────────────────────────────────
const heroIcons: Record<HeroIconName, LucideIcon> = {
  GraduationCap,
  Shield,
  Users,
  BookOpen,
  Award,
  Smile,
  Palette,
  Eye,
  Target,
};

function HeroSection({
  hero,
  site,
}: {
  hero: HomeHeroData;
  site: SiteSettingsData;
}) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* BG placeholder */}
      {/* Hero background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={hero.backgroundImage}
          alt={`Anak-anak bermain di halaman ${site.shortName}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      {/* Directional overlay — left darker for text legibility, right opens up */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(115deg, rgba(4,18,9,0.88) 0%, rgba(4,18,9,0.72) 55%, rgba(4,22,12,0.55) 100%)",
        }}
      />

      {/* Decorative glows */}
      <div className="absolute top-[-100px] right-[-60px] w-[480px] h-[480px] rounded-full bg-[#00923f]/8 z-10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-80px] left-[-40px] w-[360px] h-[360px] rounded-full bg-amber-300/8 z-10 blur-3xl pointer-events-none" />

      <div className="relative z-20 container mx-auto px-6 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* LEFT */}
          <div className="lg:col-span-7">
            {/* <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/85 text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8 border border-white/15">
              <span className="w-2 h-2 rounded-full bg-[#5de08a] animate-pulse flex-shrink-0" />
              Penerimaan Peserta Didik Baru 2025/2026
            </div> */}

            <h1 className="text-4xl md:text-5xl xl:text-[3.5rem] font-extrabold text-white leading-[1.13] tracking-tight mb-6">
              {hero.headlineTop}
              <br />
              <span className="text-[#5de08a]">{hero.headlineHighlight}</span>
              <br />
              <span className="text-white/85">{hero.headlineBottom}</span>
            </h1>

            <p className="text-white/65 text-base md:text-lg font-medium leading-relaxed mb-10 max-w-[500px]">
              {hero.description}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href={hero.primaryUrl}
                className="bg-[#00923f] hover:bg-[#007f36] text-white font-bold px-8 py-4 rounded-full text-sm transition-all duration-200 inline-flex items-center gap-2.5 shadow-lg shadow-[#00923f]/20 hover:shadow-xl hover:shadow-[#00923f]/30"
              >
                <Calendar size={16} className="stroke-[2.5]" />
                {hero.primaryLabel}
              </Link>
              <Link
                href={hero.secondaryUrl}
                className="bg-white/10 hover:bg-white/18 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-full text-sm border border-white/20 transition-all duration-200 inline-flex items-center gap-2"
              >
                {hero.secondaryLabel}
                <ChevronRight size={16} className="stroke-[2.5]" />
              </Link>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center gap-8 mt-12 pt-10 border-t border-white/10">
              {hero.stats.map((s, i) => (
                <div key={i}>
                  <div className="text-[1.75rem] font-extrabold text-white leading-none">
                    {s.value}
                  </div>
                  <div className="text-[10px] font-bold text-white/45 uppercase tracking-wider mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Glassmorphic feature cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {hero.features.map((card, i) => {
              const Icon = heroIcons[card.icon];
              return (
                <div
                  key={i}
                  className="bg-white/10 hover:bg-white/15 backdrop-blur-lg border border-white/20 rounded-2xl p-5 flex items-start gap-4 transition-all duration-300 cursor-default group"
                >
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 text-[#6ff29d] drop-shadow-[0_2px_8px_rgba(111,242,157,0.35)]">
                    <Icon size={30} className="stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1 group-hover:text-[#5de08a] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-white/55 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Mini CTA strip
            <div className="bg-white/8 backdrop-blur-sm border border-white/12 rounded-2xl px-5 py-4 flex items-center justify-between">
              <div className="text-xs text-white/60 font-medium">Tertarik mendaftarkan buah hati?</div>
              <Link href="/kontak" className="text-[#5de08a] font-bold text-xs uppercase tracking-wider hover:underline">
                Hubungi Kami →
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 2. Alur Pendaftaran ──────────────────────────────────────────────────────
function InfoPPDB({ settings }: { settings: RegistrationSettingsData }) {
  const href = registrationCtaHref(settings);
  return (
    <section className="relative overflow-hidden border-b border-[#f0d9a7] bg-[#fff5df] py-16">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
      <div className="container relative mx-auto grid items-center gap-8 px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider ${settings.isOpen ? "border-emerald-200 bg-emerald-100 text-emerald-800" : "border-rose-200 bg-rose-100 text-rose-700"}`}
          >
            <span
              className={`h-2 w-2 rounded-full ${settings.isOpen ? "bg-emerald-500" : "bg-rose-500"}`}
            />
            {settings.isOpen ? "PPDB Dibuka" : "PPDB Ditutup"} ·{" "}
            {settings.academicYear}
          </span>
          <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight text-[#0a1c12] md:text-4xl">
            {settings.promoTitle}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#6b8077]">
            {settings.promoDescription}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              className="inline-flex items-center gap-2 rounded-full bg-[#00923f] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#007f36]"
            >
              {settings.ctaLabel}
              <ChevronRight size={16} />
            </Link>
            <Link
              href="/pendaftaran"
              className="px-4 py-3 text-sm font-bold text-[#00923f] hover:underline"
            >
              Informasi lengkap
            </Link>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {[
            ["Gelombang", settings.currentWave],
            ["Kuota", settings.quota],
            ["Proses", `${settings.steps.length} tahap pendaftaran`],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-amber-100 bg-white p-4 shadow-sm"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                {label}
              </span>
              <strong className="mt-1 block text-sm text-[#0a1c12]">
                {value}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 3. Visi & Misi ───────────────────────────────────────────────────────────
function VisiMisi({
  data,
  site,
}: {
  data: VisionMissionData;
  site: SiteSettingsData;
}) {
  return (
    <section className="border-y border-[#cfe4d7] bg-[#e7f3ec] py-20">
      <div className="container mx-auto px-6">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Arah &amp; Tujuan</Eyebrow>
            <h2 className="text-3xl font-extrabold text-[#0a1c12]">
              Visi &amp; Misi <Hl>{site.shortName}</Hl>
            </h2>
            <p className="mt-3 max-w-xl text-sm text-[#6b8077]">
              {data.introduction}
            </p>
          </div>
          <SeeMoreLink href="/tentang/visi-misi" label="Baca visi dan misi" />
        </div>
        <div className="grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
          <article className="rounded-3xl bg-[#007f36] p-8 text-white">
            <Target size={34} className="mb-6 text-amber-300" />
            <h3 className="text-2xl font-extrabold">{data.visionTitle}</h3>
            <p className="mt-4 text-sm leading-relaxed text-emerald-50/80">
              {data.visionDescription}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {data.visionPoints.map((point) => (
                <span
                  key={point}
                  className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold"
                >
                  {point}
                </span>
              ))}
            </div>
          </article>
          <div className="grid gap-4 sm:grid-cols-2">
            {data.missions.map((mission, index) => (
              <article
                key={index}
                className="rounded-3xl border border-[#cfe4d7] bg-white p-6 shadow-sm"
              >
                <span className="text-sm font-extrabold text-amber-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-extrabold text-[#0a1c12]">
                  {mission.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#6b8077]">
                  {mission.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function ProgramUnggulan({ programs }: { programs: ProgramData[] }) {
  if (!programs.length) return null;
  return (
    <section className="relative overflow-hidden border-b border-gray-200/70 bg-white py-20">
      <div className="absolute -right-20 top-0 h-80 w-80 rounded-full bg-[#00923f]/5 blur-3xl" />
      <div className="container relative mx-auto px-6">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Program Sekolah</Eyebrow>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0a1c12] md:text-4xl">
              Program <Hl>Pendidikan Unggul</Hl>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#6b8077]">
              Pilihan program sesuai tahap perkembangan, kebutuhan belajar, dan
              minat setiap anak.
            </p>
          </div>
          <SeeMoreLink href="/program" label="Semua Program" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <article
              key={program.id}
              className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Link
                href={`/program/${program.slug}`}
                className="relative block aspect-[16/10] overflow-hidden bg-emerald-50"
              >
                {program.image ? (
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    sizes="(max-width:768px) 100vw,33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-emerald-200">
                    <ImageIcon size={42} />
                  </span>
                )}
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#00923f]">
                  {program.age}
                </span>
              </Link>
              <div className="p-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                  {program.eyebrow}
                </span>
                <h3 className="mt-2 text-xl font-extrabold text-[#0a1c12] transition group-hover:text-[#00923f]">
                  {program.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#6b8077]">
                  {program.description}
                </p>
                <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500">
                  <Clock size={15} className="text-[#00923f]" />
                  {program.schedule}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PrestasiSection({
  achievements,
}: {
  achievements: AchievementData[];
}) {
  if (!achievements.length) return null;
  return (
    <section className="relative overflow-hidden border-b border-[#e7d8b8] bg-[#f8f1e4] py-20">
      <div className="absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 rounded-full bg-amber-100/40 blur-3xl" />
      <div className="container relative mx-auto px-6">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Jejak Prestasi</Eyebrow>
            <h2 className="text-3xl font-extrabold text-[#0a1c12] md:text-4xl">
              Prestasi yang <Hl>Membanggakan</Hl>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#6b8077]">
              Apresiasi bagi siswa, guru, dan sekolah yang berani bertumbuh
              serta menunjukkan potensi terbaiknya.
            </p>
          </div>
          <SeeMoreLink href="/prestasi" label="Semua Prestasi" />
        </div>
        <HorizontalSlider label="Prestasi sekolah">
          {achievements.map((item) => (
            <article
              key={item.id}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-amber-50">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.imageAlt || item.title}
                    fill
                    sizes="(max-width:768px) 100vw,33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-amber-300">
                    <Award size={46} />
                  </span>
                )}
                <span className="absolute right-4 top-4 rounded-xl bg-white/95 px-3 py-1.5 text-lg font-extrabold text-amber-500 shadow-sm">
                  {item.year}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#00923f]">
                  {item.category}
                </span>
                <h3 className="mt-3 line-clamp-2 text-lg font-extrabold leading-snug text-[#0a1c12]">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs font-bold text-slate-400">
                  {[item.recipient, item.level].filter(Boolean).join(" - ")}
                </p>
                <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-[#6b8077]">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </HorizontalSlider>
      </div>
    </section>
  );
}
function LokasiKontak({ contact }: { contact: SchoolContactData }) {
  const details = [
    { icon: MapPin, label: "Alamat", value: contactAddress(contact) },
    {
      icon: Phone,
      label: "Telepon & WhatsApp",
      value: `${contact.phone} / ${contact.whatsapp}`,
    },
    { icon: Mail, label: "Email", value: contact.email },
    { icon: Clock, label: "Waktu pelayanan", value: contact.serviceHours },
  ];
  return (
    <section className="relative overflow-hidden bg-[#f4f6f5] py-20">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Kontak & Lokasi</Eyebrow>
            <h2 className="text-3xl font-extrabold text-[#0a1c12]">
              {contact.sectionTitle}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#6b8077]">
              {contact.sectionDescription}
            </p>
          </div>
          <SeeMoreLink href="/kontak" label="Detail kontak" />
        </div>
        <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <div className="rounded-3xl border border-amber-200 bg-[#fff9eb] p-7">
            <h3 className="mb-5 text-xl font-extrabold text-[#0a1c12]">
              Tanya melalui WhatsApp
            </h3>
            <WhatsAppContactForm
              whatsapp={contact.whatsapp}
              defaultMessage={contact.whatsappDefaultMessage}
              compact
            />
          </div>
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
            <iframe
              src={contact.mapEmbedUrl}
              className="h-full min-h-[420px] w-full rounded-2xl border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta lokasi sekolah"
              allowFullScreen
            />
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {details.map(({ icon: Icon, label, value }) => (
            <article
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <Icon size={20} className="mb-3 text-[#00923f]" />
              <h3 className="text-xs font-extrabold uppercase tracking-wide text-[#0a1c12]">
                {label}
              </h3>
              <p className="mt-2 break-words text-xs leading-relaxed text-[#6b8077]">
                {value}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
