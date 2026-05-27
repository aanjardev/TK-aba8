import Link from 'next/link'
import { Mail, Phone, MapPin, Clock, GraduationCap } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-[#00923f] text-white rounded-xl p-2">
                <GraduationCap size={20} />
              </div>
              <div className="flex flex-col">
                <h3 className="text-base font-extrabold text-white tracking-tight leading-none">TK ABA 8 Kepanjen</h3>
                <span className="text-[10px] text-gray-500 mt-0.5 font-semibold uppercase tracking-wider">Aisyiyah Bustanul Athfal</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Mendidik anak menjadi generasi yang cerdas, kreatif, mandiri, dan berakhlak mulia melalui pembelajaran yang menyenangkan.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://facebook.com" 
                className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition duration-200"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a 
                href="https://instagram.com" 
                className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition duration-200"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a 
                href="https://youtube.com" 
                className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition duration-200"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><path d="m10 15 5-3-5-3z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-6">Tautan Cepat</h4>
            <ul className="space-y-3">
              {[
                { name: 'Beranda', href: '/' },
                { name: 'Tentang Sekolah', href: '/tentang' },
                { name: 'Program Unggulan', href: '/program' },
                { name: 'Prestasi Siswa', href: '/prestasi' },
                { name: 'Hubungi Kami', href: '/kontak' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-green-500 transition duration-150 font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information Links */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-6">Informasi</h4>
            <ul className="space-y-3">
              {[
                { name: 'Visi & Misi', href: '/tentang/visi-misi' },
                { name: 'Kurikulum', href: '/kurikulum' },
                { name: 'Kegiatan Siswa', href: '/kegiatan' },
                { name: 'Pendaftaran PPDB', href: '/pendaftaran' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-green-500 transition duration-150 font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-6">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start space-x-3">
                <MapPin size={16} className="mt-1 text-green-500 flex-shrink-0" />
                <span className="leading-relaxed">Jl. Pendidikan No. 123, Kepanjen, Kab. Malang 65163</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-green-500 flex-shrink-0" />
                <span>(0341) 123456 / 0812-3456-7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-green-500 flex-shrink-0" />
                <span>info@tkaba8kepanjen.sch.id</span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock size={16} className="mt-0.5 text-green-500 flex-shrink-0" />
                <span>Senin - Jumat: 07:30 - 16:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-8 mt-8 text-center text-xs text-gray-500 font-medium">
          <p>&copy; {new Date().getFullYear()} TK Aisyiyah Bustanul Athfal 8 Kepanjen. All rights reserved. Mendidik dengan kasih sayang.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer