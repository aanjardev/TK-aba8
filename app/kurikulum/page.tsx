import { Hl, Eyebrow, ImagePlaceholder, cardShadow, cardShadowHover } from '@/components/SharedUI'
import { BookOpen, BrainCircuit, HeartHandshake, Smile, CheckCircle2, Clock } from 'lucide-react'

export default function KurikulumPage() {
  return (
    <div className="bg-white text-[#4a5c52] font-poppins selection:bg-[#00923f]/10 selection:text-[#00923f] overflow-x-hidden pt-0">
      
      {/* Hero */}
      <section className="relative py-20 bg-[#f4fcf7] overflow-hidden border-b border-green-100">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00923f]/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
          <Eyebrow>Sistem Pembelajaran</Eyebrow>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0a1c12] tracking-tight mb-6 leading-tight">
            Kurikulum <Hl>TK ABA 8</Hl>
          </h1>
          <p className="text-[#6b8077] text-base md:text-lg leading-relaxed">
            Menerapkan kurikulum merdeka terintegrasi dengan nilai-nilai keislaman dan metode sentra untuk mengoptimalkan potensi emas anak sejak dini.
          </p>
        </div>
      </section>

      {/* Metode Pembelajaran */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
             <h2 className="text-3xl font-extrabold text-[#0a1c12] mb-4">Pendekatan Belajar</h2>
             <p className="text-[#6b8077] leading-relaxed">
               Kami memadukan pendekatan saintifik dengan nilai-nilai agama Islam, memberikan ruang bagi anak untuk berekspresi, berimajinasi, dan menemukan pengetahuannya sendiri melalui pengalaman bermain yang bermakna.
             </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center mb-24">
            {/* Left Image */}
            <div className={`bg-white p-4 rounded-[2.5rem] border-2 border-[#e8d9a0] ${cardShadow} rotate-[-1deg]`}>
               <ImagePlaceholder label="Foto Aktivitas Belajar Sentra" aspect="aspect-[4/3]" className="rounded-3xl border-none" />
            </div>

            {/* Right Text */}
            <div className="space-y-8 pl-0 lg:pl-8">
              {[
                {
                  title: 'Metode Sentra (Beyond Centers and Circle Time)',
                  desc: 'Pembelajaran berpusat pada anak melalui berbagai sentra (Sentra Balok, Sentra Bahan Alam, Sentra Peran, Sentra Imtaq, dll) yang merangsang seluruh kecerdasan jamak.',
                  icon: <BrainCircuit size={24} className="text-[#00923f]" />
                },
                {
                  title: 'Pembiasaan Karakter Islami',
                  desc: 'Penerapan adab sehari-hari, hafalan surah pendek, hadits pilihan, dan doa sehari-hari yang dibiasakan sejak dini dengan metode yang menyenangkan.',
                  icon: <HeartHandshake size={24} className="text-amber-500" />
                },
                {
                  title: 'Belajar Seraya Bermain',
                  desc: 'Bermain adalah dunia anak. Kami mengemas materi pembelajaran akademik dasar (pra-calistung) dalam bentuk permainan yang tidak membebani memori anak.',
                  icon: <Smile size={24} className="text-rose-500" />
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-[#e6f4ec] group-hover:bg-[#00923f] flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    {/* Icon cloned to change color on hover in a real scenario, but using CSS is easier here */}
                    <div className="group-hover:text-white transition-colors duration-300">
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-[#0a1c12] mb-2">{item.title}</h3>
                    <p className="text-[#6b8077] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Program Kegiatan (Jadwal) */}
      <section className="py-24 bg-[#fafdfb] border-t border-gray-100">
         <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-16">
              <Eyebrow>Rutinitas Kami</Eyebrow>
              <h2 className="text-3xl font-extrabold text-[#0a1c12] tracking-tight">Jadwal Harian <Hl>Siswa</Hl></h2>
            </div>

            <div className={`bg-white rounded-[2.5rem] p-8 md:p-12 border-2 border-green-100 ${cardShadow} relative overflow-hidden`}>
              <div className="absolute top-0 left-0 w-full h-2 bg-[#00923f] opacity-80" />
              
              <div className="space-y-6">
                {[
                  { time: '07:15 - 07:30', activity: 'Penyambutan & Jurnal Pagi', desc: 'Guru menyambut anak di gerbang, anak menaruh tas secara mandiri dan mengisi waktu dengan menggambar bebas.' },
                  { time: '07:30 - 08:00', activity: 'Ikrar, Senam & Motorik Kasar', desc: 'Berbaris di halaman, membaca ikrar, senam pagi bersama untuk melatih motorik kasar.' },
                  { time: '08:00 - 08:30', activity: 'Circle Time & Pembiasaan Agama', desc: 'Duduk melingkar, berdoa, murojaah surah/doa pendek, dan pilar karakter pagi.' },
                  { time: '08:30 - 09:30', activity: 'Kegiatan Inti di Sentra', desc: 'Bermain dan belajar sesuai dengan sentra yang dijadwalkan hari itu dengan pendampingan guru.' },
                  { time: '09:30 - 10:00', activity: 'Makan Bersama & Istirahat', desc: 'Cuci tangan, doa sebelum makan, berbagi bekal, dan bermain bebas di halaman luar.' },
                  { time: '10:00 - 10:30', activity: 'Recalling & Persiapan Pulang', desc: 'Mengingat kembali kegiatan hari ini, pesan moral, doa penutup, dan bersiap pulang.' },
                ].map((schedule, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row gap-4 md:gap-8 items-start border-b border-gray-50 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2 text-[#00923f] font-extrabold bg-[#e6f4ec] px-4 py-2 rounded-xl flex-shrink-0">
                      <Clock size={16} />
                      <span>{schedule.time}</span>
                    </div>
                    <div className="pt-1">
                      <h4 className="text-base font-extrabold text-[#0a1c12] mb-1">{schedule.activity}</h4>
                      <p className="text-sm text-[#6b8077] leading-relaxed">{schedule.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
         </div>
      </section>

    </div>
  )
}
