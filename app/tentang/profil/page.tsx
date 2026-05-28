import { Hl, Eyebrow, ImagePlaceholder, cardShadow } from '@/components/SharedUI'
import { GraduationCap, MapPin, Building, Flag, Target } from 'lucide-react'

export default function ProfilPage() {
  return (
    <div className="bg-white text-[#4a5c52] font-poppins selection:bg-[#00923f]/10 selection:text-[#00923f] overflow-x-hidden pt-0">
      
      {/* 1. Hero / Header */}
      <section className="relative py-20 bg-[#f4fcf7] overflow-hidden border-b border-green-100">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00923f]/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-100/30 rounded-full blur-3xl pointer-events-none -translate-x-1/3 translate-y-1/3" />
        
        <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
          <Eyebrow>Mengenal Kami</Eyebrow>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0a1c12] tracking-tight mb-6 leading-tight">
            Profil <Hl>Sekolah</Hl>
          </h1>
          <p className="text-[#6b8077] text-base md:text-lg leading-relaxed">
            Membangun generasi cerdas, kreatif, dan berakhlak mulia melalui pendidikan usia dini yang menyenangkan dan berlandaskan nilai-nilai keislaman di TK ABA 8 Kepanjen.
          </p>
        </div>
      </section>

      {/* 2. Sambutan Kepala Sekolah */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className={`bg-white rounded-[2.5rem] p-8 md:p-12 lg:p-16 border-2 border-green-100 ${cardShadow} relative overflow-hidden flex flex-col md:flex-row gap-10 md:gap-16 items-center`}>
              
              {/* Image */}
              <div className="w-full md:w-1/3 flex-shrink-0 relative">
                <div className="absolute inset-0 bg-amber-100 translate-x-3 translate-y-3 rounded-3xl" />
                <div className="relative z-10 bg-white border-2 border-[#e8d9a0] rounded-3xl p-3">
                  <ImagePlaceholder label="Foto Kepala Sekolah" aspect="aspect-[3/4]" className="rounded-2xl" />
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 relative z-10">
                <Target className="text-[#00923f]/10 absolute -top-4 -left-4 w-24 h-24 rotate-12 pointer-events-none" />
                <h2 className="text-2xl font-extrabold text-[#0a1c12] mb-2 relative z-10">Sambutan Kepala Sekolah</h2>
                <h3 className="text-[#00923f] font-bold text-sm uppercase tracking-wider mb-6 relative z-10">Ibu Hj. Siti Aminah, S.Pd.</h3>
                <div className="space-y-4 text-[#6b8077] text-sm leading-relaxed relative z-10">
                  <p>
                    "Assalamu'alaikum Warahmatullahi Wabarakatuh. Puji syukur ke hadirat Allah SWT yang telah memberikan rahmat dan karunia-Nya sehingga TK ABA 8 Kepanjen dapat terus berkontribusi dalam dunia pendidikan anak usia dini."
                  </p>
                  <p>
                    "Kami percaya bahwa usia emas (golden age) adalah masa krusial bagi perkembangan kognitif, emosional, dan spiritual anak. Oleh karena itu, kami berkomitmen untuk menyediakan lingkungan belajar yang aman, inspiratif, dan penuh kasih sayang."
                  </p>
                  <p>
                    "Semoga kehadiran website ini dapat mempererat silaturahmi antara pihak sekolah, orang tua, dan masyarakat luas. Mari bersama kita wujudkan generasi tunas bangsa yang membanggakan."
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. Identitas Sekolah */}
      <section className="py-20 bg-[#fafdfb] border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <Eyebrow>Data Legal & Administrasi</Eyebrow>
            <h2 className="text-3xl font-extrabold text-[#0a1c12] tracking-tight">Identitas <Hl>Lembaga</Hl></h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <GraduationCap size={20} className="stroke-[2.5]" />, label: 'Nama Sekolah', value: 'TK ABA 8 Kepanjen' },
              { icon: <Flag size={20} className="stroke-[2.5]" />, label: 'NPSN', value: '20500123' },
              { icon: <Building size={20} className="stroke-[2.5]" />, label: 'Status', value: 'Swasta / Terakreditasi A' },
              { icon: <MapPin size={20} className="stroke-[2.5]" />, label: 'Tahun Berdiri', value: 'Tahun 2005' },
            ].map((item, idx) => (
              <div key={idx} className={`bg-white rounded-3xl p-6 border-2 border-gray-100 ${cardShadow} flex flex-col items-center text-center`}>
                <div className="w-12 h-12 bg-[#e6f4ec] text-[#00923f] rounded-2xl flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h4 className="text-[#aabdb3] text-xs font-bold uppercase tracking-wider mb-1">{item.label}</h4>
                <p className="text-[#0a1c12] font-bold text-sm">{item.value}</p>
              </div>
            ))}
          </div>

          <div className={`mt-10 bg-white rounded-3xl p-8 border-2 border-gray-100 ${cardShadow} flex flex-col md:flex-row items-center justify-between gap-6`}>
             <div>
                <h3 className="text-lg font-extrabold text-[#0a1c12] mb-1">SK Izin Operasional</h3>
                <p className="text-sm text-[#6b8077]">Nomor: 421.1/123/DIKNAS/2005 dikeluarkan oleh Dinas Pendidikan Kabupaten Malang.</p>
             </div>
             <div className="px-6 py-3 bg-[#e6f4ec] text-[#00923f] font-bold text-sm rounded-full whitespace-nowrap">
                Dokumen Resmi
             </div>
          </div>
        </div>
      </section>

    </div>
  )
}
