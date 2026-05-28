import { Hl, Eyebrow, ImagePlaceholder, cardShadow } from '@/components/SharedUI'
import { History, Award, BookOpen, Users, Building, ChevronDown } from 'lucide-react'

export default function SejarahPage() {
  const timeline = [
    {
      year: '2005',
      title: 'Awal Berdiri',
      desc: 'TK Aisyiyah Bustanul Athfal 8 Kepanjen resmi didirikan atas inisiatif tokoh masyarakat dan pengurus Aisyiyah setempat. Dimulai dengan fasilitas seadanya dan hanya 2 kelas.',
      icon: <History size={20} className="text-[#00923f]" />
    },
    {
      year: '2010',
      title: 'Pembangunan Gedung Baru',
      desc: 'Dengan dukungan wali murid dan donatur, sekolah berhasil membangun gedung baru permanen yang lebih luas, terdiri dari 4 ruang kelas dan 1 ruang guru.',
      icon: <Building size={20} className="text-[#00923f]" />
    },
    {
      year: '2015',
      title: 'Akreditasi A',
      desc: 'Berkat dedikasi seluruh staf pengajar dan peningkatan fasilitas yang signifikan, TK ABA 8 sukses meraih status Akreditasi A dari Badan Akreditasi Nasional PAUD.',
      icon: <Award size={20} className="text-[#00923f]" />
    },
    {
      year: '2018',
      title: 'Kurikulum Berbasis Karakter',
      desc: 'Sekolah mulai mengintegrasikan kurikulum nasional dengan metode pembelajaran sentra berbasis karakter Islami, yang menjadi ciri khas TK ABA 8 hingga saat ini.',
      icon: <BookOpen size={20} className="text-[#00923f]" />
    },
    {
      year: '2023',
      title: 'Sekolah Ramah Anak',
      desc: 'Menerima penghargaan tingkat Kabupaten Malang sebagai Sekolah Ramah Anak Terbaik dengan jumlah siswa aktif mencapai lebih dari 100 anak setiap tahun ajarannya.',
      icon: <Users size={20} className="text-[#00923f]" />
    }
  ]

  return (
    <div className="bg-white text-[#4a5c52] font-poppins selection:bg-[#00923f]/10 selection:text-[#00923f] overflow-x-hidden pt-0">
      
      {/* Hero */}
      <section className="relative py-20 bg-[#f4fcf7] overflow-hidden border-b border-green-100">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00923f]/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
          <Eyebrow>Jejak Langkah Kami</Eyebrow>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0a1c12] tracking-tight mb-6 leading-tight">
            Sejarah <Hl>Perjalanan</Hl>
          </h1>
          <p className="text-[#6b8077] text-base md:text-lg leading-relaxed">
            Menyelusuri dedikasi dan perjuangan TK ABA 8 Kepanjen dari masa ke masa dalam mencetak generasi emas tunas bangsa.
          </p>
        </div>
      </section>

      {/* Intro Image Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className={`bg-white rounded-3xl p-4 border-2 border-gray-100 ${cardShadow} mb-16`}>
            <ImagePlaceholder label="Foto Dokumentasi Tempo Dulu" aspect="aspect-[21/9]" className="rounded-2xl" />
          </div>

          <div className="text-center max-w-3xl mx-auto mb-20">
             <h2 className="text-2xl font-extrabold text-[#0a1c12] mb-4">Lahir dari Kepedulian</h2>
             <p className="text-[#6b8077] leading-relaxed">
               Berawal dari tingginya kebutuhan masyarakat Kepanjen akan pendidikan anak usia dini yang tidak hanya berfokus pada akademik, melainkan juga penanaman akhlak Islami, Aisyiyah cabang Kepanjen mengambil langkah berani untuk mendirikan TK ABA 8. Meski dimulai dengan segala keterbatasan, semangat untuk memberikan pendidikan terbaik tidak pernah surut.
             </p>
          </div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Center line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00923f] via-[#b8d9c6] to-transparent -translate-x-1/2 rounded-full" />

            <div className="space-y-12">
              {timeline.map((item, idx) => {
                const isEven = idx % 2 === 0
                return (
                  <div key={idx} className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''} gap-8 group`}>
                    
                    {/* Node / Point */}
                    <div className="absolute left-[28px] md:left-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full border-4 border-[#00923f] flex items-center justify-center z-10 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <div className="w-3 h-3 bg-amber-400 rounded-full" />
                    </div>

                    {/* Content Box */}
                    <div className={`w-full pl-16 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                      <div className={`bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-100 ${cardShadow} group-hover:border-[#00923f]/30 transition-colors duration-300 relative`}>
                        <div className={`flex items-center gap-3 mb-4 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                          <div className={`w-10 h-10 bg-[#e6f4ec] rounded-xl flex items-center justify-center flex-shrink-0 ${isEven ? 'md:order-2' : ''}`}>
                            {item.icon}
                          </div>
                          <span className={`text-[#00923f] font-extrabold text-2xl tracking-tight ${isEven ? 'md:order-1' : ''}`}>{item.year}</span>
                        </div>
                        <h3 className="text-xl font-extrabold text-[#0a1c12] mb-3">{item.title}</h3>
                        <p className="text-[#6b8077] text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Timeline end cap */}
            {/* <div className="absolute left-[28px] md:left-1/2 bottom-[-40px] -translate-x-1/2 w-10 h-10 bg-[#f4fcf7] rounded-full border-2 border-[#b8d9c6] flex items-center justify-center z-10 text-[#00923f]/50">
              <ChevronDown size={20} />
            </div> */}

          </div>

        </div>
      </section>

    </div>
  )
}
