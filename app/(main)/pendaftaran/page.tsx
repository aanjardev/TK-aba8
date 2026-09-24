import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  Download,
  FileText,
  Users,
  XCircle,
} from "lucide-react";
import {
  getRegistrationSettings,
  registrationCtaHref,
} from "@/lib/registration-settings";
import { getSiteSettings } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  return {
    title: "Informasi PPDB",
    description: `Informasi lengkap penerimaan peserta didik baru ${site.shortName}.`,
  };
}

export default async function RegistrationPage() {
  const settings = await getRegistrationSettings();
  const ctaHref = registrationCtaHref(settings);
  const external = ctaHref.startsWith("http");
  return (
    <main className="bg-white text-[#4a5c52]">
      <section className="relative overflow-hidden bg-[#073d24] px-6 py-20 text-white md:py-28">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#00923f]/30 blur-3xl" />
        <div className="container relative mx-auto max-w-5xl text-center">
          <div
            className={`mx-auto mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-extrabold uppercase tracking-wider ${settings.isOpen ? "border-emerald-400/30 bg-emerald-400/15 text-emerald-200" : "border-rose-300/30 bg-rose-400/15 text-rose-200"}`}
          >
            {settings.isOpen ? (
              <CheckCircle2 size={15} />
            ) : (
              <XCircle size={15} />
            )}
            {settings.isOpen ? "Pendaftaran Dibuka" : "Pendaftaran Ditutup"}
          </div>
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">
            {settings.promoTitle}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            {settings.promoDescription}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href={ctaHref === "/pendaftaran" ? "#alur" : ctaHref}
              target={external ? "_blank" : undefined}
              className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-7 py-3.5 text-sm font-bold text-emerald-950 hover:bg-amber-300"
            >
              {settings.ctaLabel}
              <ArrowRight size={17} />
            </Link>
            {settings.brochureFile && (
              <a
                href={settings.brochureFile}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-bold text-white hover:bg-white/15"
              >
                <Download size={17} /> Unduh Brosur
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="border-b border-emerald-100 bg-[#f4fbf7] px-6 py-8">
        <div className="container mx-auto grid max-w-5xl gap-4 sm:grid-cols-3">
          <Info
            icon={CalendarDays}
            label="Tahun Ajaran"
            value={settings.academicYear}
          />
          <Info icon={Users} label="Gelombang" value={settings.currentWave} />
          <Info
            icon={CheckCircle2}
            label="Ketersediaan"
            value={settings.quota}
          />
        </div>
      </section>

      {settings.steps.length>0&&<section id="alur" className="scroll-mt-24 px-6 py-20">
        <div className="container mx-auto max-w-6xl">
          <Heading
            eyebrow="Proses mudah"
            title="Alur Pendaftaran"
            description="Ikuti tahapan berikut untuk menyelesaikan pendaftaran calon siswa."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {settings.steps.map((step, index) => (
              <article
                key={index}
                className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#00923f] font-extrabold text-white">
                  {index + 1}
                </div>
                <h2 className="font-bold text-[#0a1c12]">{step.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#6b8077]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>}

      {(settings.requirements.length>0||settings.fees.length>0||settings.feeNote)&&<section className="bg-[#fffaf0] px-6 py-20">
        <div className="container mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          {settings.requirements.length>0&&<div>
            <Heading
              eyebrow="Dokumen"
              title="Persyaratan Pendaftaran"
              description="Siapkan dokumen berikut agar proses verifikasi berjalan lancar."
              align="left"
            />
            <ul className="mt-8 space-y-3">
              {settings.requirements.map((item, index) => (
                <li
                  key={index}
                  className="flex gap-3 rounded-xl border border-amber-100 bg-white p-4 text-sm leading-relaxed"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>}
          {(settings.fees.length>0||settings.feeNote)&&<div>
            <Heading
              eyebrow="Transparan"
              title="Rincian Biaya"
              description="Rincian dapat berubah sesuai kebijakan sekolah. Hubungi admin untuk konfirmasi terbaru."
              align="left"
            />
            <div className="mt-8 overflow-hidden rounded-2xl border border-amber-100 bg-white">
              {settings.fees.map((fee, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between gap-5 border-b border-amber-100 px-5 py-4 last:border-0"
                >
                  <span className="text-sm text-slate-600">{fee.label}</span>
                  <strong className="text-right text-sm text-[#0a1c12]">
                    {fee.amount}
                  </strong>
                </div>
              ))}
            </div>
            {settings.feeNote && (
              <p className="mt-4 rounded-xl bg-amber-100/60 p-4 text-xs leading-relaxed text-amber-900">
                {settings.feeNote}
              </p>
            )}
          </div>}
        </div>
      </section>}

      <section className="px-6 py-20">
        <div className="container mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {(settings.bankName || settings.bankAccount) && (
            <div className="rounded-3xl bg-[#073d24] p-7 text-white">
              <Banknote size={30} className="text-emerald-300" />
              <h2 className="mt-5 text-xl font-bold">Rekening Resmi Sekolah</h2>
              <p className="mt-4 text-sm text-white/60">{settings.bankName}</p>
              <p className="mt-1 font-mono text-2xl font-extrabold tracking-wider">
                {settings.bankAccount}
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
                a.n. {settings.bankHolder}
              </p>
            </div>
          )}
          <div className="rounded-3xl border border-emerald-100 bg-[#f4fbf7] p-7">
            <Building2 size={30} className="text-[#00923f]" />
            <h2 className="mt-5 text-xl font-bold text-[#0a1c12]">
              Dokumen Unduhan
            </h2>
            <div className="mt-5 space-y-3">
              {settings.brochureFile && (
                <DownloadLink
                  href={settings.brochureFile}
                  icon={Download}
                  label="Unduh Brosur PPDB"
                />
              )}
              {settings.registrationFormFile && (
                <DownloadLink
                  href={settings.registrationFormFile}
                  icon={FileText}
                  label="Unduh Formulir Cetak"
                />
              )}
              {!settings.brochureFile && !settings.registrationFormFile && (
                <p className="text-sm text-slate-500">
                  Dokumen unduhan belum tersedia. Silakan hubungi admin sekolah.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Heading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#00923f]">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-extrabold text-[#0a1c12] md:text-4xl">
        {title}
      </h2>
      <p
        className={`mt-3 text-sm leading-relaxed text-[#6b8077] ${align === "center" ? "mx-auto max-w-xl" : ""}`}
      >
        {description}
      </p>
    </div>
  );
}
function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-white p-5">
      <Icon className="mt-0.5 shrink-0 text-[#00923f]" size={22} />
      <div>
        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </span>
        <strong className="mt-1 block text-sm text-[#0a1c12]">{value}</strong>
      </div>
    </div>
  );
}
function DownloadLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: typeof Download;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      className="flex items-center justify-between rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-bold text-emerald-800 hover:border-emerald-300"
    >
      <span className="flex items-center gap-2">
        <Icon size={17} />
        {label}
      </span>
      <ArrowRight size={16} />
    </a>
  );
}
