import { Hl, Eyebrow, ImagePlaceholder, cardShadow, cardShadowHover } from '@/components/SharedUI'
import { BookOpen, MonitorPlay, Palette, Tent, Pill, Trees } from 'lucide-react'

export default function FasilitasPage() {
  const fasilitas = [
    {
      title: 'Ruang Kelas Nyaman & Interaktif',
      desc: 'Kelas ber-AC dengan dekorasi menarik dan pencahayaan yang baik, dilengkapi loker pribadi untuk melatih kemandirian siswa.',
      icon: <BookOpen size={20} className="text-[#00923f]" />,
      aspect: 'aspect-[4/3]'
    },
    {
      title: 'Taman Bermain Outdoor',
      desc: 'Area bermain luar ruangan yang luas, dilengkapi berbagai permainan edukatif seperti perosotan, ayunan, dan jungkat-jungkit dengan alas yang aman.',
      icon: <Trees size={20} className="text-amber-500" />,
      aspect: 'aspect-square'
    },
    {
      title: 'Ruang Sentra Kreativitas',
      desc: 'Area khusus bagi anak untuk mengekspresikan diri melalui melukis, mewarnai, bermain peran, dan merangkai balok.',
      icon: <Palette size={20} className="text-rose-500" />,
      aspect: 'aspect-square'
    },
    {
      title: 'Perpustakaan Mini',
      desc: 'Sudut baca yang menyediakan koleksi buku dongeng, ensiklopedia anak, dan buku agama untuk menumbuhkan minat baca sejak dini.',
      icon: <Tent size={20} className="text-sky-500" />,
      aspect: 'aspect-[4/3]'
    },
    {
      title: 'Unit Kesehatan Sekolah (UKS)',
      desc: 'Ruang kesehatan yang nyaman, dilengkapi kotak P3K lengkap dan staf guru yang dilatih penanganan medis dasar.',
      icon: <Pill size={20} className="text-purple-500" />,
      aspect: 'aspect-[16/9]'
    },
    {
      title: 'Media Audio Visual',
      desc: 'Fasilitas layar proyektor interaktif untuk menayangkan video edukasi, kisah nabi, dan senam ceria secara massal.',
      icon: <MonitorPlay size={20} className="text-[#00923f]" />,
      aspect: 'aspect-video'
    }
  ]

  return (
    <div className="bg-white text-[#4a5c52] font-poppins selection:bg-[#00923f]/10 selection:text-[#00923f] overflow-x-hidden pt-0">
      
      {/* Hero */}
      <section className="relative py-20 bg-[#f4fcf7] overflow-hidden border-b border-green-100">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00923f]/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
          <Eyebrow>Sarana Prasarana</Eyebrow>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0a1c12] tracking-tight mb-6 leading-tight">
            Fasilitas <Hl>Sekolah</Hl>
          </h1>
          <p className="text-[#6b8077] text-base md:text-lg leading-relaxed">
            Menyediakan lingkungan yang aman, bersih, dan menunjang eksplorasi bakat anak dalam belajar sambil bermain.
          </p>
        </div>
      </section>

      {/* Grid Facilities */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 max-w-6xl">
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fasilitas.map((item, idx) => (
              <div key={idx} className={`bg-white rounded-3xl border-2 border-gray-100 hover:border-[#b8d9c6] overflow-hidden flex flex-col ${cardShadow} ${cardShadowHover} transition-all duration-300 group`}>
                <div className="overflow-hidden bg-gray-50 border-b border-gray-100">
                  <ImagePlaceholder 
                    label={`Foto ${item.title}`} 
                    aspect="aspect-[4/3]" 
                    className="border-none rounded-none group-hover:scale-105 transition-transform duration-500 w-full h-full object-cover" 
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-1 relative">
                  {/* Floating Icon */}
                  <div className="absolute -top-7 right-8 w-14 h-14 bg-white rounded-2xl flex items-center justify-center border-2 border-gray-100 shadow-md group-hover:border-[#00923f]/30 group-hover:shadow-lg transition-all duration-300">
                    {item.icon}
                  </div>
                  
                  <h3 className="text-xl font-extrabold text-[#0a1c12] mb-3 mt-2 pr-12 leading-snug group-hover:text-[#00923f] transition-colors line-clamp-2 min-h-[3.5rem]">{item.title}</h3>
                  <p className="text-[#6b8077] text-sm leading-relaxed line-clamp-3">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  )
}
