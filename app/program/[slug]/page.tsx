import { notFound } from 'next/navigation'
import { Hl, Eyebrow, ImagePlaceholder, cardShadow, cardShadowHover } from '@/components/SharedUI'
import { Target, Users, Clock, BookOpen, Star, Sparkles, CheckCircle2 } from 'lucide-react'

// Dummy Database for Dynamic Content
const programData: Record<string, any> = {
  'playgroup': {
    title: 'Kelompok Bermain (Playgroup)',
    eyebrow: 'Usia 3-4 Tahun',
    desc: 'Program Playgroup dirancang khusus untuk memfasilitasi transisi anak dari lingkungan rumah ke lingkungan sekolah. Fokus utama kami adalah pengembangan keterampilan sosial, kemandirian dasar, dan stimulasi motorik melalui bermain yang menyenangkan.',
    age: '3 - 4 Tahun',
    time: 'Senin - Kamis (07:30 - 10:00)',
    capacity: '15 Anak / Kelas',
    teacherRatio: '1 Guru : 7 Anak',
    highlights: [
      'Pengenalan rutinitas dan kemandirian (Toilet training dasar).',
      'Stimulasi motorik kasar dan halus (Merangkak, melompat, meremas).',
      'Sosialisasi awal: berbagi mainan, antri, dan bermain bersama.',
      'Pengenalan huruf dan angka melalui nyanyian dan gerakan.',
    ]
  },
  'tk-a': {
    title: 'Taman Kanak-Kanak A (TK A)',
    eyebrow: 'Usia 4-5 Tahun',
    desc: 'Pada jenjang TK A, anak mulai dikenalkan pada konsep pra-calistung (membaca, menulis, berhitung) secara aplikatif melalui metode sentra. Anak dilatih untuk mengomunikasikan ide, memahami emosi, dan memperkuat hafalan surat-surat pendek.',
    age: '4 - 5 Tahun',
    time: 'Senin - Jumat (07:30 - 10:30)',
    capacity: '20 Anak / Kelas',
    teacherRatio: '1 Guru : 10 Anak',
    highlights: [
      'Pembentukan karakter mandiri dan tanggung jawab pribadi.',
      'Pengenalan keaksaraan awal melalui kegiatan bermain.',
      'Hafalan doa harian, surah pendek, dan praktik wudhu/shalat.',
      'Pengembangan kreativitas melalui seni lukis, kriya, dan musik.',
    ]
  },
  'tk-b': {
    title: 'Taman Kanak-Kanak B (TK B)',
    eyebrow: 'Usia 5-6 Tahun',
    desc: 'Jenjang TK B adalah masa persiapan pematangan anak sebelum memasuki Sekolah Dasar (SD). Kurikulum difokuskan pada penguasaan literasi dasar, logika matematika sederhana, dan kematangan emosional sebagai bekal utama.',
    age: '5 - 6 Tahun',
    time: 'Senin - Jumat (07:30 - 11:00)',
    capacity: '20 Anak / Kelas',
    teacherRatio: '1 Guru : 10 Anak',
    highlights: [
      'Kesiapan masuk SD (Membaca kata/kalimat sederhana & Berhitung dasar).',
      'Peningkatan rasa percaya diri melalui presentasi kelas (Show & Tell).',
      'Penyempurnaan praktik ibadah (Shalat berjamaah mandiri).',
      'Proyek kolaborasi: bekerja dalam kelompok kecil untuk menyelesaikan tugas.',
    ]
  },
  'ekstrakurikuler': {
    title: 'Kegiatan Ekstrakurikuler',
    eyebrow: 'Pengembangan Bakat',
    desc: 'Selain kegiatan akademik reguler, kami menyediakan wadah bagi anak untuk mengeksplorasi minat dan bakat khusus mereka melalui kegiatan ekstrakurikuler yang dibimbing oleh tenaga ahli di bidangnya.',
    age: 'TK A & TK B',
    time: 'Jadwal Menyesuaikan (11:00 - 12:00)',
    capacity: 'Sesuai Peminatan',
    teacherRatio: 'Sesuai Ekstrakurikuler',
    highlights: [
      'Seni Tari Daerah: Mengasah kelenturan tubuh dan kecintaan budaya.',
      'Mewarnai & Menggambar: Mengembangkan imajinasi visual dan kombinasi warna.',
      'Drumband Cilik: Melatih kedisiplinan, kekompakan, dan ritme bermusik.',
      'Renang: Stimulasi fisik dan keberanian anak di lingkungan air.',
    ]
  }
}

// Generate Static Params so Next.js pre-builds these URLs
export async function generateStaticParams() {
  return Object.keys(programData).map((slug) => ({
    slug: slug,
  }))
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const data = programData[resolvedParams.slug]

  if (!data) {
    notFound()
  }

  return (
    <div className="bg-white text-[#4a5c52] font-poppins selection:bg-[#00923f]/10 selection:text-[#00923f] overflow-x-hidden pt-0">
      
      {/* Hero Section */}
      <section className="relative py-20 bg-[#f4fcf7] overflow-hidden border-b border-green-100">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00923f]/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />
        
        <div className="container mx-auto px-6 relative z-10 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 text-center md:text-left">
              <Eyebrow>{data.eyebrow}</Eyebrow>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#0a1c12] tracking-tight mb-6 leading-tight">
                {data.title.split(' ').map((word: string, i: number, arr: string[]) => {
                  // Highlight the last word or content in parentheses
                  if (i === arr.length - 1 || word.includes('(')) {
                    return <span key={i}> <Hl>{word}</Hl></span>
                  }
                  return ' ' + word
                })}
              </h1>
              <p className="text-[#6b8077] text-base md:text-lg leading-relaxed mb-8">
                {data.desc}
              </p>
              <div className="inline-flex gap-4">
                 <button className="bg-[#00923f] hover:bg-[#007b34] text-white px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider transition-colors shadow-lg shadow-[#00923f]/20">
                    Daftar Sekarang
                 </button>
              </div>
            </div>

            <div className="w-full md:w-5/12 flex-shrink-0">
               <div className={`bg-white border-2 border-[#e8d9a0] p-3 rounded-3xl ${cardShadow} rotate-2 hover:rotate-0 transition-transform duration-500`}>
                  <ImagePlaceholder label={`Kegiatan ${data.title}`} aspect="aspect-[4/3]" className="rounded-2xl border-none" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 -mt-32 relative z-20">
            {[
              { icon: <Users size={20} />, label: 'Kelompok Usia', value: data.age, color: 'text-sky-500', bg: 'bg-sky-50', border: 'border-sky-100' },
              { icon: <Clock size={20} />, label: 'Waktu Belajar', value: data.time, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100' },
              { icon: <Target size={20} />, label: 'Kapasitas', value: data.capacity, color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-100' },
              { icon: <BookOpen size={20} />, label: 'Rasio Kelas', value: data.teacherRatio, color: 'text-[#00923f]', bg: 'bg-[#e6f4ec]', border: 'border-[#b8d9c6]' },
            ].map((stat, idx) => (
              <div key={idx} className={`bg-white rounded-3xl p-6 border-2 border-gray-100 ${cardShadow} flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300`}>
                <div className={`w-12 h-12 ${stat.bg} ${stat.color} border ${stat.border} rounded-2xl flex items-center justify-center mb-4`}>
                  {stat.icon}
                </div>
                <h4 className="text-[#aabdb3] text-[11px] font-bold uppercase tracking-wider mb-1">{stat.label}</h4>
                <p className="text-[#0a1c12] font-bold text-sm">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Fokus Pembelajaran */}
          <div className="mt-24 max-w-4xl mx-auto">
             <div className="flex flex-col md:flex-row items-center gap-12">
               
               {/* Left Decorative Image */}
               <div className="w-full md:w-1/2 relative">
                 <div className="absolute inset-0 bg-[#00923f]/5 rounded-full blur-3xl scale-150 -z-10" />
                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-4 pt-8">
                     <ImagePlaceholder label="Fokus 1" aspect="aspect-square" className="rounded-3xl border-2 border-white shadow-xl" />
                     <ImagePlaceholder label="Fokus 2" aspect="aspect-[4/3]" className="rounded-3xl border-2 border-white shadow-xl" />
                   </div>
                   <div className="space-y-4">
                     <ImagePlaceholder label="Fokus 3" aspect="aspect-[4/3]" className="rounded-3xl border-2 border-white shadow-xl" />
                     <ImagePlaceholder label="Fokus 4" aspect="aspect-square" className="rounded-3xl border-2 border-white shadow-xl" />
                   </div>
                 </div>
               </div>

               {/* Right List */}
               <div className="w-full md:w-1/2">
                 <div className="mb-8">
                    <h2 className="text-3xl font-extrabold text-[#0a1c12] mb-4 leading-tight">
                      Fokus &amp; <Hl>Target</Hl> Capaian
                    </h2>
                    <p className="text-[#6b8077] text-sm leading-relaxed">
                      Lulusan dan peserta didik pada jenjang ini ditargetkan untuk memiliki kompetensi dan kematangan pada aspek-aspek berikut:
                    </p>
                 </div>

                 <ul className="space-y-6">
                   {data.highlights.map((point: string, idx: number) => (
                     <li key={idx} className="flex gap-4">
                        <div className="w-8 h-8 bg-[#e6f4ec] text-[#00923f] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#b8d9c6]">
                          <CheckCircle2 size={16} className="stroke-[2.5]" />
                        </div>
                        <p className="text-[#4a5c52] text-sm font-medium leading-relaxed pt-1">
                          {point}
                        </p>
                     </li>
                   ))}
                 </ul>
               </div>

             </div>
          </div>
        </div>
      </section>

      {/* CTA Footer specifically for Programs */}
      <section className="py-20 bg-[#fafdfb] border-t border-gray-100 mt-10">
        <div className="container mx-auto px-6 max-w-4xl text-center">
           <Sparkles className="w-12 h-12 text-amber-400 mx-auto mb-6" />
           <h2 className="text-3xl font-extrabold text-[#0a1c12] mb-4">Tertarik Mendaftarkan Putra-Putri Anda?</h2>
           <p className="text-[#6b8077] mb-8 max-w-2xl mx-auto">
             Kunjungi sekolah kami untuk melihat langsung proses pembelajaran atau hubungi tata usaha kami untuk informasi ketersediaan kuota pendaftaran.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button className="bg-[#0a1c12] hover:bg-black text-white px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider transition-colors shadow-lg shadow-black/10">
                Hubungi Admin
             </button>
             <button className="bg-white hover:bg-gray-50 border-2 border-gray-200 text-[#0a1c12] px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider transition-colors">
                Lihat Alur PPDB
             </button>
           </div>
        </div>
      </section>

    </div>
  )
}
