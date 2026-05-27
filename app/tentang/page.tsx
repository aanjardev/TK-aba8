// app/tentang/page.tsx
export default function TentangPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Tentang TK ABA 8</h1>
      <div className="max-w-3xl mx-auto">
        <p className="text-lg mb-6">
          TK ABA 8 adalah lembaga pendidikan anak usia dini yang berkomitmen memberikan pendidikan terbaik 
          bagi anak-anak usia 2-6 tahun.
        </p>
        <h2 className="text-2xl font-bold mb-4">Visi</h2>
        <p className="mb-6">Menjadi lembaga pendidikan anak usia dini yang unggul dalam membentuk generasi 
        yang cerdas, kreatif, dan berakhlak mulia.</p>
        <h2 className="text-2xl font-bold mb-4">Misi</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Menyediakan lingkungan belajar yang aman, nyaman, dan menyenangkan</li>
          <li>Mengembangkan potensi anak secara optimal melalui pembelajaran yang aktif dan kreatif</li>
          <li>Menanamkan nilai-nilai moral dan agama sejak dini</li>
        </ul>
      </div>
    </div>
  )
}