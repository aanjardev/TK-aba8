// app/page.tsx
import Link from 'next/link'
import ExpandableCard from '@/components/ExpandableCard'
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
  Check,
  Shield,
  Smile,
  Palette,
  Eye,
  Target,
  Image as ImageIcon,
  ArrowRight,
} from 'lucide-react'

// ─── Shared helpers ──────────────────────────────────────────────────────────

/** Subtle underline-highlight on a span of text */
function Hl({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block text-[#00923f] after:content-[''] after:absolute after:left-0 after:bottom-[3px] after:w-full after:h-2.5 after:bg-[#00923f]/10 after:z-[-1] px-0.5">
      {children}
    </span>
  )
}

/** Section eyebrow label */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-[11px] font-extrabold text-[#00923f] uppercase tracking-widest mb-3">
      <span className="w-4 h-[2px] bg-[#00923f] rounded-full inline-block" />
      {children}
    </p>
  )
}

/** "Lihat Selengkapnya" ghost link — placed near section header */
function SeeMoreLink({ href, label = 'Lihat Selengkapnya' }: { href: string; label?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-[#00923f] hover:text-[#007f36] font-bold text-xs uppercase tracking-wider border border-[#00923f]/30 hover:border-[#00923f] rounded-full px-4 py-2 transition-all duration-200 hover:bg-[#00923f]/5"
    >
      {label}
      <ArrowRight size={13} className="stroke-[2.5]" />
    </Link>
  )
}

/** Card elevation class — strong but elegant */
const cardShadow = 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.07),0_10px_30px_-8px_rgba(0,0,0,0.1)]'
const cardShadowHover = 'hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.1),0_20px_40px_-8px_rgba(0,0,0,0.13)]'

// Reusable Image Placeholder Component
function ImagePlaceholder({
  label,
  aspect = 'aspect-video',
  className = '',
}: {
  label: string
  aspect?: string
  className?: string
}) {
  return (
    <div className={`bg-[#f0f7f3] border border-dashed border-[#b8d9c6] rounded-2xl flex flex-col items-center justify-center p-6 text-center select-none ${aspect} ${className}`}>
      <div className="w-12 h-12 rounded-xl bg-white border border-[#d0e8da] flex items-center justify-center text-[#00923f] mb-3 shadow-sm">
        <ImageIcon size={20} className="opacity-70" />
      </div>
      <span className="text-sm font-semibold text-[#4a7060] leading-tight">{label}</span>
      <span className="text-xs text-[#8aaa97] mt-1 font-medium">Image Placeholder</span>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function Home() {
  return (
    <div className="bg-white text-[#4a5c52] font-poppins selection:bg-[#00923f]/10 selection:text-[#00923f] overflow-x-hidden">
      <HeroSection />
      <InfoPPDB />
      <VisiMisi />
      <ProgramUnggulan />
      <PrestasiSection />
      <KeunggulanSekolah />
      <LokasiKontak />
    </div>
  )
}

// ─── 1. Hero ─────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* BG placeholder */}
      <div className="absolute inset-0 z-0 bg-[#b8cec5] flex items-center justify-center select-none">
        <div className="text-center flex flex-col items-center">
          <ImageIcon size={52} className="opacity-15 mb-2 text-[#00923f]" />
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00923f]/30">Hero Background Photo · 1920 × 1080 px</span>
        </div>
      </div>

      {/* Directional overlay — left darker for text legibility, right opens up */}
      <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(115deg, rgba(4,18,9,0.88) 0%, rgba(4,18,9,0.72) 55%, rgba(4,22,12,0.55) 100%)' }} />

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
              Tempat Terbaik<br />
              <span className="text-[#5de08a]">Tumbuh &amp; Belajar</span><br />
              <span className="text-white/85">Si Kecil Bersinar</span>
            </h1>

            <p className="text-white/65 text-base md:text-lg font-medium leading-relaxed mb-10 max-w-[500px]">
              TK Aisyiyah Bustanul Athfal 8 Kepanjen mendidik anak usia dini dengan pendekatan penuh kasih, kurikulum islami terpadu, dan lingkungan belajar yang aman &amp; menyenangkan.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/pendaftaran"
                className="bg-[#00923f] hover:bg-[#007f36] text-white font-bold px-8 py-4 rounded-full text-sm transition-all duration-200 inline-flex items-center gap-2.5 shadow-lg shadow-[#00923f]/20 hover:shadow-xl hover:shadow-[#00923f]/30"
              >
                <Calendar size={16} className="stroke-[2.5]" />
                Daftar PPDB Online
              </Link>
              <Link
                href="/tentang/profil"
                className="bg-white/10 hover:bg-white/18 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-full text-sm border border-white/20 transition-all duration-200 inline-flex items-center gap-2"
              >
                Profil Sekolah
                <ChevronRight size={16} className="stroke-[2.5]" />
              </Link>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center gap-8 mt-12 pt-10 border-t border-white/10">
              {[
                { num: '200+', label: 'Siswa Aktif' },
                { num: '15+', label: 'Pendidik PAUD' },
                { num: '20+', label: 'Tahun Berdiri' },
                { num: '50+', label: 'Penghargaan' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-[1.75rem] font-extrabold text-white leading-none">{s.num}</div>
                  <div className="text-[10px] font-bold text-white/45 uppercase tracking-wider mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Glassmorphic feature cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {[
              {
                icon: <GraduationCap size={20} className="stroke-[2.5]" />,
                iconBg: 'bg-[#d4eddf] text-[#00923f]',
                title: 'Kurikulum Islami Terpadu',
                desc: 'Modul belajar aktif berbasis permainan yang menyenangkan, kreatif, dan berkarakter islami.',
              },
              {
                icon: <Shield size={20} className="stroke-[2.5]" />,
                iconBg: 'bg-amber-100 text-amber-700',
                title: 'Lingkungan Aman & Nyaman',
                desc: 'Fasilitas bersih, sirkulasi udara baik, dan area bermain yang selalu terpantau.',
              },
              {
                icon: <Users size={20} className="stroke-[2.5]" />,
                iconBg: 'bg-rose-100 text-rose-700',
                title: 'Guru Penyayang & Profesional',
                desc: 'Tenaga pendidik bersertifikat PAUD dengan pendampingan hangat, sabar, dan tulus.',
              },
            ].map((card, i) => (
              <div key={i} className="bg-white/10 hover:bg-white/15 backdrop-blur-lg border border-white/20 rounded-2xl p-5 flex items-start gap-4 transition-all duration-300 cursor-default group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${card.iconBg}`}>
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1 group-hover:text-[#5de08a] transition-colors">{card.title}</h3>
                  <p className="text-xs text-white/55 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}

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
  )
}

// ─── 2. Alur Pendaftaran ──────────────────────────────────────────────────────
function InfoPPDB() {
  const steps = [
    {
      num: '01',
      title: 'Mengisi Formulir Pendaftaran',
      desc: 'Orang tua mengisi formulir pendaftaran secara online atau langsung datang ke sekolah.',
      color: 'bg-[#e6f4ec] text-[#00923f] border-[#a8d8bc]',
    },
    {
      num: '02',
      title: 'Melengkapi Berkas Persyaratan',
      desc: 'Menyerahkan dokumen yang diperlukan: akta kelahiran, KK, dan pas foto anak.',
      color: 'bg-amber-50 text-amber-700 border-amber-300',
    },
    {
      num: '03',
      title: 'Wawancara & Orientasi Kelas',
      desc: 'Calon siswa dan orang tua diundang untuk sesi perkenalan lingkungan sekolah.',
      color: 'bg-sky-50 text-sky-700 border-sky-300',
    },
    {
      num: '04',
      title: 'Konfirmasi & Pembayaran',
      desc: 'Setelah dinyatakan diterima, orang tua menyelesaikan proses administrasi pendaftaran.',
      color: 'bg-rose-50 text-rose-700 border-rose-300',
    },
  ]

  return (
    <section className="py-24 bg-[#fffdf0] border-b border-amber-200/50 relative overflow-hidden">
      {/* Subtle decorative blob */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left: Brochure image */}
          <div className="lg:col-span-5">
            <ExpandableCard>
              <ImagePlaceholder
                label="Foto Alur Pendaftaran / Brosur PPDB Sekolah"
                aspect="flex-1 w-full h-full border-none"
                className="rounded-2xl"
              />
            </ExpandableCard>
          </div>

          {/* Right: 4-step list */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center bg-amber-100 text-amber-800 text-xs font-bold px-3.5 py-1.5 rounded-full mb-3 border border-amber-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2" />
                  PENDAFTARAN MURID BARU
                </div>
                <h2 className="text-3xl font-extrabold text-[#0a1c12] leading-tight tracking-tight">
                  Alur Pendaftaran<br />
                  <Hl>TK ABA 8 Kepanjen</Hl>
                </h2>
              </div>
              <SeeMoreLink href="/pendaftaran" label="Info PPDB" />
            </div>

            <p className="text-[#6b8077] text-sm leading-relaxed mb-10 max-w-lg">
              Proses pendaftaran siswa baru TK Aisyiyah Bustanul Athfal 8 Kepanjen dirancang sesederhana mungkin agar memudahkan setiap orang tua murid.
            </p>

            <div className="space-y-4">
              {steps.map((step) => (
                <div key={step.num} className={`bg-white border-2 border-gray-100 hover:border-[#b8d9c6] rounded-2xl p-5 flex items-start gap-5 transition-all duration-200 ${cardShadow} ${cardShadowHover}`}>
                  <div className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center flex-shrink-0 font-extrabold text-sm font-mono ${step.color}`}>
                    {step.num}
                  </div>
                  <div className="flex-1 pt-0.5">
                    <h4 className="text-sm font-bold text-[#0a1c12] mb-1">{step.title}</h4>
                    <p className="text-[#6b8077] text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/pendaftaran"
                className="inline-flex items-center bg-[#00923f] hover:bg-[#007f36] text-white font-bold px-8 py-4 rounded-full transition-colors text-sm shadow-lg shadow-[#00923f]/15 hover:shadow-[#00923f]/25 ring-offset-2 hover:ring-2 hover:ring-[#00923f]"
              >
                Daftar Sekarang
                <ChevronRight size={16} className="ml-1 stroke-[2.5]" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── 3. Visi & Misi ───────────────────────────────────────────────────────────
function VisiMisi() {
  return (
    <section className="py-24 bg-[#f2faf6] border-b border-green-200/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00923f]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container mx-auto px-6">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <Eyebrow>Arah &amp; Tujuan</Eyebrow>
            <h2 className="text-3xl font-extrabold text-[#0a1c12] tracking-tight leading-tight">
              Visi &amp; Misi<br />
              <Hl>TK ABA 8 Kepanjen</Hl>
            </h2>
            <p className="text-[#6b8077] text-sm leading-relaxed mt-3 max-w-md">
              Arah pendidikan dan cita-cita besar yang kami emban bersama dalam mendidik generasi penerus bangsa.
            </p>
          </div>
          <SeeMoreLink href="/tentang/profil" />
        </div>

        {/* Single Unified Card */}
        <div className={`bg-white rounded-[2.5rem] border-2 border-green-100/60 ${cardShadow} transition-all duration-500 overflow-hidden relative group`}>


          <div className="grid lg:grid-cols-12 relative z-10">
            {/* LEFT: VISI */}
            <div className="lg:col-span-5 p-8 lg:p-12 lg:pr-10 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-100 relative">
              <span className="text-[10px] font-extrabold text-[#00923f]/60 uppercase tracking-widest block mb-4">Visi Utama Sekolah</span>
              <h3 className="text-3xl font-extrabold text-[#0a1c12] mb-5 leading-tight">
                Cerdas, Kreatif &amp; Berakhlak Mulia
              </h3>
              <p className="text-[#6b8077] text-sm leading-relaxed mb-8">
                Menjadi lembaga PAUD unggulan di Kepanjen yang melahirkan tunas bangsa cerdas secara akademis, mandiri dalam bersikap, dan berbudi pekerti mulia berdasarkan nilai-nilai keislaman dan kebangsaan.
              </p>
              
              <ul className="space-y-3">
                {[
                  'Unggul prestasi akademik & non-akademik',
                  'Berkarakter islami sejak usia dini',
                  'Sekolah percontohan di Kab. Malang',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00923f] flex-shrink-0 mt-1.5" />
                    <span className="text-[#6b8077] text-xs font-bold leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT: MISI */}
            <div className="lg:col-span-7 p-8 lg:p-12 lg:pl-14 flex flex-col justify-center bg-[#fafdfb] relative overflow-hidden">
               {/* Decorative subtle pattern or shape */}
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#00923f]/5 rounded-full blur-3xl pointer-events-none" />

              <span className="text-[10px] font-extrabold text-[#00923f]/60 uppercase tracking-widest block mb-4 relative z-10">Misi Pendidikan Kami</span>
              <h3 className="text-2xl font-extrabold text-[#0a1c12] mb-10 leading-snug relative z-10">4 Pilar Strategis Pembelajaran</h3>

              <div className="grid sm:grid-cols-2 gap-8 relative z-10">
                {[
                  { title: 'Aktif & Gembira', desc: 'Menerapkan simulasi permainan kreatif yang menyenangkan bagi anak usia dini.' },
                  { title: 'Karakter Islami', desc: 'Membiasakan adab sopan santun, doa harian, dan nilai kejujuran sejak dini.' },
                  { title: 'Kualitas Pendidik', desc: 'Meningkatkan kompetensi guru melalui pelatihan dan pengembangan metode mengajar.' },
                  { title: 'Sinergi Wali Murid', desc: 'Membangun komunikasi aktif antara sekolah dan keluarga demi tumbuh kembang anak.' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="w-10 h-10 bg-white text-[#00923f] rounded-xl flex items-center justify-center flex-shrink-0 border border-[#b8d9c6] shadow-sm">
                      <span className="font-extrabold font-mono text-sm opacity-70">0{i + 1}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-[#0a1c12] mb-2 leading-snug">{item.title}</h4>
                      <p className="text-[#6b8077] text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

// ─── 4. Program Unggulan ──────────────────────────────────────────────────────
function ProgramUnggulan() {
  const programs = [
    {
      title: 'Playgroup (Kelompok Bermain)',
      age: 'Usia 2–3 Tahun',
      time: '08:00–10:30',
      lessons: '5 Area Bermain',
      desc: 'Menekankan pada stimulasi sensori motorik anak, pengenalan lingkungan sosialisasi awal di luar rumah, serta pembentukan emosional yang ceria dan mandiri.',
      placeholder: 'Foto Kegiatan Bermain Kelompok Bermain',
      badgeColor: 'bg-rose-50 text-rose-700 border-2 border-rose-200',
      isReverse: false,
    },
    {
      title: 'TK A (Kelompok Belajar A)',
      age: 'Usia 4–5 Tahun',
      time: '07:30–11:00',
      lessons: '8 Area Belajar',
      desc: 'Mulai mengenalkan konsep logika matematika sederhana, calistung dasar non-tekanan, kemandirian memakai pakaian & merapikan mainan, serta pembiasaan karakter sopan.',
      placeholder: 'Foto Pembelajaran TK A',
      badgeColor: 'bg-sky-50 text-sky-700 border-2 border-sky-200',
      isReverse: true,
    },
    {
      title: 'TK B (Kelompok Belajar B)',
      age: 'Usia 5–6 Tahun',
      time: '07:30–11:30',
      lessons: '10 Area Kesiapan',
      desc: 'Pemantapan kognitif menyeluruh untuk menyongsong sekolah dasar, pelatihan membaca cerita pendek, dasar menulis kalimat, serta penanaman adab shalat harian.',
      placeholder: 'Foto Siswa TK B Belajar',
      badgeColor: 'bg-[#e6f4ec] text-[#00923f] border-2 border-[#b8d9c6]',
      isReverse: false,
    },
  ]

  return (
    <section className="py-24 bg-white border-b border-gray-200/70 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00923f]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container mx-auto px-6">
        {/* Section header with Lihat Selengkapnya */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <Eyebrow>Program Sekolah</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1c12] tracking-tight">
              Program <Hl>Pendidikan Unggul</Hl>
            </h2>
            <p className="text-[#6b8077] max-w-md text-sm font-medium mt-3">
              Pembagian jenjang kelas dengan pendampingan psikologis terarah sesuai usia anak.
            </p>
          </div>
          <SeeMoreLink href="/program" />
        </div>

        <div className="space-y-6 max-w-5xl mx-auto">
          {programs.map((prog, index) => (
            <div
              key={index}
              className={`bg-white border-2 border-gray-100 hover:border-[#b8d9c6] rounded-3xl p-6 md:p-8 ${cardShadow} ${cardShadowHover} transition-all duration-300 flex flex-col ${prog.isReverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-center group`}
            >
              {/* Image */}
              <div className="w-full lg:w-[340px]  flex-shrink-0 overflow-hidden rounded-2xl">
                <ImagePlaceholder
                  label={prog.placeholder}
                  aspect="aspect-video lg:aspect-[4/3]"
                  className="rounded-2xl border-none"
                />
              </div>

              {/* Content */}
              <div className="flex-1 text-left flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${prog.badgeColor}`}>{prog.age}</span>
                    <div className="text-amber-400 text-xs font-bold tracking-tight">★★★★★</div>
                  </div>
                  <h3 className="text-lg md:text-xl font-extrabold text-[#0a1c12] mb-3 group-hover:text-[#00923f] transition-colors leading-snug">
                    {prog.title}
                  </h3>
                  <p className="text-[#6b8077] text-sm leading-relaxed mb-6">{prog.desc}</p>
                </div>
                <div>
                  <div className="h-px bg-gray-100 mb-4" />
                  <div className="flex justify-between items-center text-xs font-bold text-[#8aaa97]">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-[#00923f]" />
                      <span>{prog.time} WIB</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen size={14} className="text-[#00923f]" />
                      <span>{prog.lessons}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 5. Prestasi ──────────────────────────────────────────────────────────────
function PrestasiSection() {
  const achievements = [
    {
      title: 'Sekolah Ramah Anak Terbaik',
      student: 'TK ABA 8 Kepanjen',
      year: '2023',
      level: 'Tingkat Kab. Malang',
      desc: 'Penghargaan atas komitmen sekolah dalam menciptakan lingkungan belajar yang aman, nyaman, dan bebas dari perundungan.',
      placeholder: 'Foto Kepala Sekolah Menerima Penghargaan',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-2 border-emerald-200',
      featured: true,
      category: 'Prestasi Lembaga',
      icon: <Award size={14} className="text-[#00923f] mr-2 stroke-[2.5]" />
    },
    {
      title: 'Guru PAUD Inovatif & Berdedikasi',
      student: 'Ibu Siti Aminah, S.Pd',
      year: '2023',
      level: 'Tingkat Kota Kepanjen',
      desc: 'Meraih penghargaan pendidik inovatif atas metode belajar kreatif berbasis permainan tradisional interaktif.',
      placeholder: 'Foto Ibu Guru Mengajar',
      badgeColor: 'bg-purple-50 text-purple-700 border-2 border-purple-200',
      featured: false,
    },
    {
      title: 'Juara 1 Lomba Mewarnai PAUD',
      student: 'Aisha Maharani (TK B)',
      year: '2023',
      level: 'Tingkat Kabupaten',
      desc: 'Menyabet Juara 1 dengan menampilkan kreativitas luar biasa dalam menuangkan warna dan imajinasi.',
      placeholder: 'Foto Aisha Menunjukkan Trofi',
      badgeColor: 'bg-rose-50 text-rose-700 border-2 border-rose-200',
      featured: false,
    },
  ]

  const featured = achievements.find(a => a.featured)!
  const rest = achievements.filter(a => !a.featured)

  return (
    <section className="py-24 bg-[#faf9f2] border-b border-amber-200/50 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container mx-auto px-6">
        {/* Section header with Lihat Selengkapnya */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <Eyebrow>Apresiasi Bakat</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1c12] tracking-tight">
              Prestasi <Hl>Siswa Terpilih</Hl>
            </h2>
            <p className="text-[#6b8077] text-sm font-medium mt-3 max-w-md">
              Apresiasi terhadap langkah berani anak didik dalam menampilkan bakat, minat, dan rasa percaya dirinya.
            </p>
          </div>
          <SeeMoreLink href="/prestasi" />
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-stretch">

          {/* Left: Featured large card */}
          <div className="lg:col-span-5 flex">
            <div className={`bg-white rounded-3xl overflow-hidden border-2 border-amber-200 ${cardShadow} ${cardShadowHover} transition-all duration-300 h-full flex flex-col`}>
              <ImagePlaceholder
                label={featured.placeholder}
                aspect="flex-1 min-h-[200px]"
                className="rounded-none border-none border-b border-amber-100"
              />
              <div className="p-7 flex flex-col">
                <span className={`text-xs font-bold px-3 py-1 rounded-full w-fit mb-4 ${featured.badgeColor}`}>
                  {featured.level}
                </span>
                <h3 className="text-lg font-extrabold text-[#0a1c12] mb-2 leading-snug">{featured.title}</h3>
                <div className="text-xs text-[#aabdb3] font-bold mb-3">
                  Penerima: <span className="text-[#0a1c12]">{featured.student}</span> &bull; Tahun Ajaran {featured.year}
                </div>
                <p className="text-[#6b8077] text-sm leading-relaxed">{featured.desc}</p>
              </div>
            </div>
          </div>

          {/* Right: 3 stacked cards — fills the space evenly */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {rest.map((item, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-3xl border-2 border-gray-100 hover:border-[#b8d9c6] p-6 flex flex-col sm:flex-row items-stretch gap-5 ${cardShadow} ${cardShadowHover} transition-all duration-300 flex-1`}
              >
                <div className="w-full sm:w-36 flex-shrink-0 overflow-hidden rounded-2xl flex flex-col">
                  <ImagePlaceholder
                    label={item.placeholder}
                    aspect="flex-1 min-h-[140px]"
                    className="rounded-2xl border-none"
                  />
                </div>
                <div className="flex-1 text-left flex flex-col justify-center">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full inline-block mb-2 w-fit ${item.badgeColor}`}>
                    {item.level}
                  </span>
                  <h4 className="text-base font-extrabold text-[#0a1c12] mb-1.5 leading-snug">{item.title}</h4>
                  <div className="text-[11px] text-[#aabdb3] font-bold mb-2">
                    Penerima: <span className="text-[#4a5c52]">{item.student}</span> &bull; {item.year}
                  </div>
                  <p className="text-[#6b8077] text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── 6. Keunggulan Sekolah ────────────────────────────────────────────────────
function KeunggulanSekolah() {
  const advantages = [
    {
      title: 'Guru Pengajar Loving & Telaten',
      desc: 'Didampingi secara sabar oleh guru-guru penyayang anak yang bersertifikasi khusus di bidang PAUD.',
      icon: <Users size={24} className="stroke-[2.5]" />,
      iconBg: 'bg-[#e6f4ec] text-[#00923f]',
      accent: 'hover:border-[#00923f]',
    },
    {
      title: 'Kurikulum Terintegrasi Islami',
      desc: 'Menyeimbangkan materi kemampuan dasar akademik, stimulasi seni motorik, serta pondasi akhlak dasar harian.',
      icon: <BookOpen size={24} className="stroke-[2.5]" />,
      iconBg: 'bg-amber-50 text-amber-600',
      accent: 'hover:border-amber-400',
    },
    {
      title: 'Lingkungan Aman Ramah Anak',
      desc: 'Didukung ruang kelas bersih, sirkulasi udara baik, serta area luar bermain aman terpantau.',
      icon: <Shield size={24} className="stroke-[2.5]" />,
      iconBg: 'bg-rose-50 text-rose-600',
      accent: 'hover:border-rose-400',
    },
    {
      title: 'Eksplorasi Luar Kelas Rutin',
      desc: 'Mengenalkan kecerdasan naturalis anak lewat berkebun harian, mengamati alam, dan kunjungan edukatif.',
      icon: <Smile size={24} className="stroke-[2.5]" />,
      iconBg: 'bg-sky-50 text-sky-600',
      accent: 'hover:border-sky-400',
    },
    {
      title: 'Menu Nutrisi Gizi Terpantau',
      desc: 'Program asupan makanan sehat bersama terjadwal demi menunjang kebiasaan pola makan sehat bergizi.',
      icon: <Check size={24} className="stroke-[2.5]" />,
      iconBg: 'bg-teal-50 text-teal-600',
      accent: 'hover:border-teal-400',
    },
    {
      title: 'Sanggar Kreativitas Variatif',
      desc: 'Menampung minat bakat seni sejak dini melalui tari tradisi, alat musik, mewarnai, serta baca Quran.',
      icon: <Palette size={24} className="stroke-[2.5]" />,
      iconBg: 'bg-purple-50 text-purple-600',
      accent: 'hover:border-purple-400',
    },
  ]

  return (
    <section className="py-24 bg-[#f4faf6] border-b border-green-200/50 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#00923f]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container mx-auto px-6">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <Eyebrow>Keunggulan Sekolah</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1c12] tracking-tight">
              Kenapa Memilih <Hl>TK ABA 8 Kepanjen?</Hl>
            </h2>
            <p className="text-[#6b8077] max-w-md text-sm font-medium mt-3">
              Komitmen kami dalam melayani tumbuh kembang anak didik secara holistik dan bermakna.
            </p>
          </div>
          <SeeMoreLink href="/tentang/keunggulan" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {advantages.map((item, index) => (
            <div
              key={index}
              className={`bg-white p-7 rounded-3xl border-2 border-gray-100 ${item.accent} ${cardShadow} ${cardShadowHover} transition-all duration-300 flex items-start gap-5 group`}
            >
              <div className={`w-14 h-14 ${item.iconBg} rounded-2xl flex items-center justify-center flex-shrink-0 border border-white shadow-sm group-hover:scale-105 transition-transform duration-200`}>
                {item.icon}
              </div>
              <div>
                <h3 className="font-extrabold text-[#0a1c12] text-sm mb-2 leading-snug">{item.title}</h3>
                <p className="text-[#6b8077] text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 7. Lokasi & Kontak ───────────────────────────────────────────────────────
function LokasiKontak() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#00923f]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-6xl mx-auto mb-10">

          {/* Left: Contact form */}
          <div className="lg:col-span-5">
            <div className={`bg-[#fffef5] border-2 border-amber-200 rounded-3xl p-8 ${cardShadow}`}>
              <Eyebrow>Hubungi Konsultasi</Eyebrow>
              <h3 className="text-2xl font-extrabold text-[#0a1c12] mb-6">Kirim Pertanyaan</h3>

              <form className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#6b8077] mb-1.5 uppercase tracking-wide">Nama Lengkap Orang Tua</label>
                  <input
                    type="text"
                    placeholder="Contoh: Budi Santoso"
                    className="w-full bg-white border-2 border-gray-200 focus:border-[#00923f] focus:outline-none rounded-xl px-4 py-3 text-sm text-[#0a1c12] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#6b8077] mb-1.5 uppercase tracking-wide">Nomor WhatsApp Aktif</label>
                  <input
                    type="tel"
                    placeholder="Contoh: 08123456789"
                    className="w-full bg-white border-2 border-gray-200 focus:border-[#00923f] focus:outline-none rounded-xl px-4 py-3 text-sm text-[#0a1c12] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#6b8077] mb-1.5 uppercase tracking-wide">Isi Pesan / Pertanyaan</label>
                  <textarea
                    rows={4}
                    placeholder="Tuliskan pertanyaan Anda mengenai pendaftaran atau kurikulum belajar..."
                    className="w-full bg-white border-2 border-gray-200 focus:border-[#00923f] focus:outline-none rounded-xl px-4 py-3 text-sm text-[#0a1c12] resize-none transition-colors"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#00923f] hover:bg-[#007f36] text-white font-bold py-4 px-6 rounded-full transition-colors text-sm uppercase tracking-wider shadow-lg shadow-[#00923f]/15 mt-2"
                >
                  Kirim Pertanyaan
                </button>
              </form>
            </div>
          </div>

          {/* Right: Map + details */}
          <div className="lg:col-span-7">
            <Eyebrow>Peta Petunjuk Sekolah</Eyebrow>
            <div className="flex items-end justify-between gap-4 mb-6">
              <h2 className="text-3xl font-extrabold text-[#0a1c12] tracking-tight">
                Kunjungi <Hl> Kami</Hl>
              </h2>
              <SeeMoreLink href="/kontak" label="Info Kontak" />
            </div>

            <div className={`bg-white border-2 border-gray-200 rounded-3xl p-4 ${cardShadow} overflow-hidden`}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.2832066811946!2d110.369315!3d-7.797068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5796c2b0b5e7%3A0x8b5a5b5b5b5b5b5b!2sYogyakarta!5e0!3m2!1sen!2sid!4v1699999999999!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Alamat TK Aisyiyah Bustanul Athfal 8 Kepanjen"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {[
            { icon: <MapPin size={18} className="stroke-[2.5]" />, label: 'Alamat Lengkap', value: 'Jl. Pendidikan No. 123, Kepanjen, Kab. Malang' },
            { icon: <Phone size={18} className="stroke-[2.5]" />, label: 'Telepon & WA', value: '(0341) 123456 / 0812-3456-7890' },
            { icon: <Mail size={18} className="stroke-[2.5]" />, label: 'Email', value: 'info@tkaba8kepanjen.sch.id' },
            { icon: <Clock size={18} className="stroke-[2.5]" />, label: 'Waktu Pelayanan', value: 'Senin – Jumat (07:30 – 16:00 WIB)' },
          ].map((d, i) => (
            <div key={i} className={`bg-white border-2 border-gray-100 rounded-2xl p-4 flex items-start gap-3 ${cardShadow}`}>
              <div className="w-9 h-9 bg-[#e6f4ec] rounded-xl flex items-center justify-center flex-shrink-0 text-[#00923f]">
                {d.icon}
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#0a1c12]">{d.label}</h4>
                <p className="text-[#6b8077] text-xs leading-relaxed mt-0.5">{d.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}