import { Hl, Eyebrow, ImagePlaceholder, cardShadow, cardShadowHover } from '@/components/SharedUI'
import { Trophy, Medal, Star, Award, GraduationCap, School } from 'lucide-react'

export default function PrestasiPage() {
  const prestasiList = [
    {
      title: 'Juara 1 Lomba Tari Kreasi Daerah',
      category: 'Prestasi Siswa',
      level: 'Tingkat Kabupaten',
      year: '2023',
      desc: 'Tim tari TK ABA 8 berhasil memukau juri dengan tarian kreasi nusantara, menyisihkan lebih dari 50 peserta lainnya se-Kabupaten Malang.',
      icon: <Star className="text-amber-500" />,
      bgIcon: 'bg-amber-50',
      borderIcon: 'border-amber-200'
    },
    {
      title: 'Sekolah Ramah Anak Terbaik',
      category: 'Prestasi Sekolah',
      level: 'Tingkat Provinsi',
      year: '2023',
      desc: 'Penghargaan diberikan atas dedikasi sekolah dalam menyediakan lingkungan belajar yang aman, inklusif, dan bebas dari perundungan.',
      icon: <School className="text-[#00923f]" />,
      bgIcon: 'bg-[#e6f4ec]',
      borderIcon: 'border-[#b8d9c6]'
    },
    {
      title: 'Juara Harapan 1 Hafalan Surah Pendek',
      category: 'Prestasi Siswa',
      level: 'Tingkat Kecamatan',
      year: '2024',
      desc: 'Ananda Rasyid dari kelas TK B membuktikan kefasihannya dalam melafalkan surah-surah pendek pada ajang kompetisi PAI anak usia dini.',
      icon: <Star className="text-amber-500" />,
      bgIcon: 'bg-amber-50',
      borderIcon: 'border-amber-200'
    },
    {
      title: 'Guru Berprestasi Inovasi Pembelajaran',
      category: 'Prestasi Guru',
      level: 'Tingkat Kabupaten',
      year: '2024',
      desc: 'Ibu Nurmala Sari mendapatkan penghargaan atas pengembangan media pembelajaran interaktif berbasis barang bekas untuk sentra alam.',
      icon: <GraduationCap className="text-rose-500" />,
      bgIcon: 'bg-rose-50',
      borderIcon: 'border-rose-200'
    },
    {
      title: 'Juara 2 Lomba Mewarnai Ibu & Anak',
      category: 'Prestasi Siswa',
      level: 'Tingkat Kota/Kabupaten',
      year: '2022',
      desc: 'Kolaborasi apik antara siswa dan wali murid yang menghasilkan karya visual menakjubkan pada peringatan Hari Ibu.',
      icon: <Star className="text-amber-500" />,
      bgIcon: 'bg-amber-50',
      borderIcon: 'border-amber-200'
    },
    {
      title: 'Akreditasi A (Sangat Baik)',
      category: 'Prestasi Sekolah',
      level: 'Nasional (BAN PAUD)',
      year: '2021',
      desc: 'Pengakuan resmi atas standar mutu kurikulum, fasilitas, dan manajemen pendidikan yang diterapkan secara konsisten di TK ABA 8.',
      icon: <School className="text-[#00923f]" />,
      bgIcon: 'bg-[#e6f4ec]',
      borderIcon: 'border-[#b8d9c6]'
    },
    {
      title: 'Juara Umum Porseni PAUD Terpadu',
      category: 'Prestasi Sekolah',
      level: 'Tingkat Kabupaten',
      year: '2024',
      desc: 'Kontingen TK ABA 8 sukses merebut piala bergilir juara umum berkat keberhasilan menjuarai berbagai cabang lomba, mulai dari ketangkasan, seni lukis, hingga hafalan Al-Quran.',
      icon: <Trophy className="text-[#00923f]" />,
      bgIcon: 'bg-[#e6f4ec]',
      borderIcon: 'border-[#b8d9c6]'
    }
  ].sort((a, b) => parseInt(b.year) - parseInt(a.year))

  return (
    <div className="bg-white text-[#4a5c52] font-poppins selection:bg-[#00923f]/10 selection:text-[#00923f] overflow-x-hidden pt-0">
      
      {/* Hero */}
      <section className="relative py-20 bg-[#f4fcf7] overflow-hidden border-b border-green-100">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00923f]/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
          <Eyebrow>Jejak Prestasi</Eyebrow>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0a1c12] tracking-tight mb-6 leading-tight">
            Galeri <Hl>Penghargaan</Hl>
          </h1>
          <p className="text-[#6b8077] text-base md:text-lg leading-relaxed">
            Menjadi bukti komitmen kami dalam membina potensi siswa, kompetensi guru, serta standar kualitas sekolah untuk memberikan yang terbaik.
          </p>
        </div>
      </section>

      {/* Grid Prestasi */}
      <section className="py-24 bg-[#fafdfb] border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-[#0a1c12] tracking-tight mb-4">Daftar <Hl>Prestasi</Hl></h2>
            <p className="text-[#6b8077] max-w-2xl mx-auto">
              Tidak hanya berfokus pada siswa, kami juga mengapresiasi dan mendorong tenaga pendidik serta manajemen sekolah untuk terus berprestasi.
            </p>
          </div> */}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {prestasiList.map((item, idx) => (
              <div key={idx} className={`bg-white rounded-3xl border-2 border-gray-100 flex flex-col overflow-hidden ${cardShadow} ${cardShadowHover} transition-all duration-300 group`}>
                <div className="overflow-hidden bg-gray-50 border-b border-gray-100 shrink-0">
                  <ImagePlaceholder 
                    label="Dokumentasi" 
                    aspect="aspect-video" 
                    className="border-none rounded-none group-hover:scale-105 transition-transform duration-500 w-full h-full object-cover" 
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0 ${item.bgIcon} ${item.borderIcon}`}>
                      {item.icon}
                    </div>
                    <span className="text-2xl font-extrabold text-gray-200 group-hover:text-amber-200 transition-colors shrink-0">
                      {item.year}
                    </span>
                  </div>
                
                <span className={`inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full w-fit mb-3 ${
                    item.category === 'Prestasi Siswa' ? 'bg-amber-50 text-amber-600' :
                    item.category === 'Prestasi Guru' ? 'bg-rose-50 text-rose-600' :
                    'bg-[#e6f4ec] text-[#00923f]'
                  }`}>
                  {item.category}
                </span>

                <h3 className="text-lg font-extrabold text-[#0a1c12] mb-2 leading-snug line-clamp-2">{item.title}</h3>
                <p className="text-xs font-bold text-[#aabdb3] mb-4 uppercase tracking-wider">{item.level}</p>
                <p className="text-[#6b8077] text-sm leading-relaxed flex-1 line-clamp-4">
                  {item.desc}
                </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  )
}
