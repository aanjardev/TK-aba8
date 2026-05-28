import { Hl, Eyebrow, cardShadow } from '@/components/SharedUI'
import { Target, Check, Heart, Lightbulb } from 'lucide-react'

export default function VisiMisiPage() {
  return (
    <div className="bg-white text-[#4a5c52] font-poppins selection:bg-[#00923f]/10 selection:text-[#00923f] overflow-x-hidden pt-0">
      
      {/* Hero */}
      <section className="relative py-20 bg-[#f4fcf7] overflow-hidden border-b border-green-100">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00923f]/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
          <Eyebrow>Arah & Tujuan Kami</Eyebrow>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0a1c12] tracking-tight mb-6 leading-tight">
            Visi, Misi & <Hl>Tujuan</Hl>
          </h1>
          <p className="text-[#6b8077] text-base md:text-lg leading-relaxed">
            Menjadi pelita pendidikan usia dini yang menginspirasi, dengan pedoman nilai Islam dan wawasan kebangsaan yang utuh.
          </p>
        </div>
      </section>

      {/* Visi & Misi Main Content */}
      <section className="py-24 relative overflow-hidden">
        <div className="relative container mx-auto px-6">
          
          <div className={`bg-white rounded-[2.5rem] border-2 border-green-100/60 ${cardShadow} transition-all duration-500 overflow-hidden relative group max-w-6xl mx-auto`}>
            {/* Subtle hover accent on top border */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#00923f] to-[#b8d9c6] opacity-80" />

            <div className="grid lg:grid-cols-12 relative z-10">
              {/* LEFT: VISI */}
              <div className="lg:col-span-5 p-8 md:p-12 lg:pr-10 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-100 relative">
                <div className="w-14 h-14 bg-[#e6f4ec] text-[#00923f] rounded-2xl flex items-center justify-center mb-8 border border-[#b8d9c6]">
                  <Target size={26} className="stroke-[2.5]" />
                </div>
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
              <div className="lg:col-span-7 p-8 md:p-12 lg:pl-14 flex flex-col justify-center bg-[#fafdfb] relative overflow-hidden">
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

          {/* Semboyan / Nilai Inti */}
          <div className="mt-16 grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <div className={`bg-[#00923f] rounded-3xl p-8 md:p-10 text-white relative overflow-hidden ${cardShadow}`}>
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <Heart size={32} className="mb-6 opacity-80 stroke-[2]" />
              <h3 className="text-2xl font-extrabold mb-3">Motto Kami</h3>
              <p className="text-[#e6f4ec] text-sm leading-relaxed">
                "Bermain sambil belajar, belajar seraya bermain dengan penuh kasih sayang dan kesabaran."
              </p>
            </div>
            
            <div className={`bg-[#fffef5] border-2 border-amber-200 rounded-3xl p-8 md:p-10 relative overflow-hidden ${cardShadow}`}>
              <Lightbulb size={32} className="mb-6 text-amber-500 stroke-[2]" />
              <h3 className="text-2xl font-extrabold text-[#0a1c12] mb-3">Nilai Inti (Core Values)</h3>
              <ul className="text-[#6b8077] text-sm leading-relaxed space-y-2 font-semibold">
                <li className="flex items-center gap-2"><Check size={16} className="text-amber-500" /> Religius & Bermoral</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-amber-500" /> Mandiri & Tanggung Jawab</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-amber-500" /> Kreatif & Inovatif</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-amber-500" /> Disiplin & Sopan Santun</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

    </div>
  )
}
