import Link from 'next/link'
import { Mail, Phone, MapPin, Clock, GraduationCap } from 'lucide-react'
import Image from 'next/image'
import type { SiteSettingsData } from '@/lib/site-settings'
import type { SchoolContactData } from '@/lib/school-contact'
import { contactAddress } from '@/lib/school-contact'

const Footer = ({site,contact,description}:{site:SiteSettingsData;contact:SchoolContactData;description:string}) => {
  return (
    <footer className="bg-slate-900 text-gray-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4 xl:gap-8 mb-12">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden bg-[#00923f] text-white rounded-xl">
                {site.logo?<Image src={site.logo} alt={`Logo ${site.shortName}`} fill sizes="40px" className="object-contain p-1"/>:<GraduationCap size={20} />}
              </div>
              <div className="flex flex-col">
                <h3 className="text-base font-extrabold text-white tracking-tight leading-none">{site.shortName}</h3>
                <span className="text-[10px] text-gray-500 mt-0.5 font-semibold tracking-wide">{site.longName}</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              {description}
            </p>
            <div className="flex space-x-3">
              {site.facebook&&<a 
                href={site.facebook} 
                className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition duration-200"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>}
              {site.instagram&&<a 
                href={site.instagram} 
                className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition duration-200"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>}
              {site.youtube&&<a 
                href={site.youtube} 
                className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition duration-200"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><path d="m10 15 5-3-5-3z"/></svg>
              </a>}
            </div>
          </div>

          {/* Tentang Kami */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-6">Tentang Kami</h4>
            <ul className="space-y-3">
              {[
                { name: 'Profil Sekolah', href: '/tentang/profil' },
                { name: 'Visi & Misi', href: '/tentang/visi-misi' },
                { name: 'Sejarah Perjalanan', href: '/tentang/sejarah' },
                { name: 'Fasilitas Belajar', href: '/tentang/fasilitas' },
                { name: 'Guru & Staf', href: '/guru' },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-green-500 transition duration-150 font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Program & Info */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-6">Program & Info</h4>
            <ul className="space-y-3">
              {[
                { name: 'Kelompok Bermain', href: '/program/playgroup' },
                { name: 'Taman Kanak-Kanak A', href: '/program/tk-a' },
                { name: 'Taman Kanak-Kanak B', href: '/program/tk-b' },
                { name: 'Prestasi', href: '/prestasi' },
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
                <span className="leading-relaxed">{contactAddress(contact)}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-green-500 flex-shrink-0" />
                <span>{contact.phone} / {contact.whatsapp}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-green-500 flex-shrink-0" />
                <span>{contact.email}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock size={16} className="mt-0.5 text-green-500 flex-shrink-0" />
                <span>{contact.serviceHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-8 mt-8 text-center text-xs text-gray-500 font-medium">
          <p>&copy; {new Date().getFullYear()} {site.schoolName}.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
