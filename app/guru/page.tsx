import { Hl, Eyebrow, ImagePlaceholder, cardShadow, cardShadowHover } from '@/components/SharedUI'
import { GraduationCap, BookOpen, ShieldCheck, HeartHandshake } from 'lucide-react'

export default function GuruPage() {
  const teachers = [
    { name: 'Siti Aminah, S.Pd.', role: 'Wali Kelas TK A', exp: '10 Tahun', desc: 'Sabar dan penuh semangat membimbing anak-anak usia dini mengenal huruf dan angka dengan cara menyenangkan.' },
    { name: 'Nurmala Sari, S.Pd.I', role: 'Wali Kelas TK B1', exp: '8 Tahun', desc: 'Ahli dalam metode bercerita dan penanaman karakter Islami yang melekat pada ingatan anak-anak.' },
    { name: 'Aisyah Putri, S.Psi', role: 'Wali Kelas TK B2', exp: '5 Tahun', desc: 'Fokus pada perkembangan motorik dan psikologis anak agar tumbuh menjadi pribadi yang percaya diri.' },
    { name: 'Rini Astuti, S.Pd.', role: 'Guru Pendamping', exp: '4 Tahun', desc: 'Selalu sigap membantu setiap anak yang membutuhkan perhatian khusus dalam aktivitas harian.' },
  ]

  const staffs = [
    { name: 'Bapak Supriyadi', role: 'Tata Usaha / Administrasi', desc: 'Mengatur segala kebutuhan administrasi pendaftaran dan komunikasi dengan wali murid.' },
    { name: 'Bapak Ahmad', role: 'Keamanan Sekolah', desc: 'Menjaga keamanan lingkungan sekolah dan membantu anak-anak menyeberang saat pulang.' },
    { name: 'Ibu Maimunah', role: 'Petugas Kebersihan', desc: 'Memastikan seluruh ruang kelas, playground, dan toilet selalu dalam keadaan bersih dan wangi.' },
  ]

  return (
    <div className="bg-white text-[#4a5c52] font-poppins selection:bg-[#00923f]/10 selection:text-[#00923f] overflow-x-hidden pt-0">
      
      {/* Hero */}
      <section className="relative py-20 bg-[#f4fcf7] overflow-hidden border-b border-green-100">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00923f]/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
          <Eyebrow>Tenaga Pendidik</Eyebrow>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0a1c12] tracking-tight mb-6 leading-tight">
            Guru &amp; <Hl>Staf</Hl>
          </h1>
          <p className="text-[#6b8077] text-base md:text-lg leading-relaxed">
            Mengenal lebih dekat sosok pahlawan tanpa tanda jasa yang dengan penuh kasih sayang dan dedikasi mendidik putra-putri kita.
          </p>
        </div>
      </section>

      {/* 1. Kepala Sekolah */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#0a1c12] tracking-tight">Kepala <Hl>Sekolah</Hl></h2>
          </div>

          <div className={`bg-gradient-to-br from-[#00923f] to-[#007b34] rounded-[2.5rem] p-8 md:p-12 border-4 border-green-50 ${cardShadow} relative overflow-hidden flex flex-col md:flex-row gap-10 items-center max-w-4xl mx-auto`}>
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <GraduationCap className="absolute -bottom-8 -left-8 w-40 h-40 text-white/5 -rotate-12 pointer-events-none" />

            <div className="w-full md:w-64 flex-shrink-0 relative z-10">
               <div className="bg-white p-2 rounded-3xl shadow-xl rotate-[-2deg]">
                 <ImagePlaceholder label="Foto Kepala Sekolah" aspect="aspect-[3/4]" className="rounded-2xl border-none" />
               </div>
            </div>

            <div className="flex-1 text-center md:text-left relative z-10 text-white">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                Pimpinan Lembaga
              </span>
              <h3 className="text-3xl font-extrabold mb-2">Hj. Siti Aminah, S.Pd.</h3>
              <p className="text-green-100 mb-6 font-medium">Kepala Sekolah TK ABA 8 Kepanjen</p>
              
              <div className="relative">
                <span className="absolute -top-4 -left-6 text-5xl text-white/20 font-serif">"</span>
                <p className="text-green-50 text-sm leading-relaxed italic z-10 relative">
                  Guru yang baik tidak hanya mentransfer ilmu, tetapi juga menyentuh hati. Kami mendidik anak-anak bukan sekadar untuk menjadi pintar, tetapi untuk menjadi generasi yang berakhlak mulia dan tangguh.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Dewan Guru */}
      <section className="py-24 bg-[#fafdfb] border-t border-b border-gray-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="w-16 h-16 bg-[#e6f4ec] text-[#00923f] rounded-2xl flex items-center justify-center mb-6 border border-[#b8d9c6]">
              <BookOpen size={28} className="stroke-[2.5]" />
            </div>
            <h2 className="text-3xl font-extrabold text-[#0a1c12] tracking-tight mb-4">Dewan <Hl>Guru</Hl></h2>
            <p className="text-[#6b8077] max-w-2xl">
              Para pendidik profesional yang berpengalaman dalam membimbing tumbuh kembang anak dengan kesabaran dan kompetensi di bidang Pendidikan Anak Usia Dini.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teachers.map((teacher, idx) => (
              <div key={idx} className={`bg-white rounded-3xl overflow-hidden border-2 border-gray-100 ${cardShadow} ${cardShadowHover} transition-all duration-300 group flex flex-col`}>
                <div className="bg-gray-50 border-b border-gray-100 p-2">
                  <ImagePlaceholder label={`Foto ${teacher.name}`} aspect="aspect-square" className="rounded-2xl border-none bg-white shadow-sm" />
                </div>
                <div className="p-6 flex flex-col flex-1 text-center items-center">
                  <h3 className="text-lg font-extrabold text-[#0a1c12] mb-1 line-clamp-1">{teacher.name}</h3>
                  <span className="text-[#00923f] text-xs font-bold uppercase tracking-wider mb-4 bg-[#e6f4ec] px-3 py-1 rounded-full">
                    {teacher.role}
                  </span>
                  <p className="text-[#6b8077] text-xs leading-relaxed line-clamp-3 mb-4 flex-1">
                    "{teacher.desc}"
                  </p>
                  <div className="w-full pt-4 border-t border-gray-100 text-left text-[11px] font-bold text-[#aabdb3] flex justify-between items-center">
                    <span>Pengalaman</span>
                    <span className="text-[#0a1c12]">{teacher.exp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Staf & Karyawan */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 max-w-5xl">
           <div className="flex flex-col items-center text-center mb-16">
            <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mb-6 border border-amber-200">
              <ShieldCheck size={28} className="stroke-[2.5]" />
            </div>
            <h2 className="text-3xl font-extrabold text-[#0a1c12] tracking-tight mb-4">Staf &amp; <Hl>Kependidikan</Hl></h2>
            <p className="text-[#6b8077] max-w-2xl">
              Tim solid di balik layar yang senantiasa memastikan operasional sekolah berjalan lancar, aman, dan nyaman bagi seluruh civitas akademika.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {staffs.map((staff, idx) => (
              <div key={idx} className={`bg-white rounded-3xl p-6 border-2 border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-5 text-center md:text-left ${cardShadow} ${cardShadowHover} transition-all duration-300`}>
                <div className="w-20 h-20 flex-shrink-0">
                   <ImagePlaceholder label="Foto" aspect="aspect-square" className="rounded-full border-none shadow-md" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#0a1c12] mb-1">{staff.name}</h3>
                  <span className="text-amber-600 text-[10px] font-bold uppercase tracking-wider block mb-3">
                    {staff.role}
                  </span>
                  <p className="text-[#6b8077] text-xs leading-relaxed">
                    {staff.desc}
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
