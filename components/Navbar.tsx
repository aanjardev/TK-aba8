'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, GraduationCap } from 'lucide-react'

interface SubMenuItem {
  name: string
  href: string
}

interface MenuItem {
  name: string
  href?: string
  submenu?: SubMenuItem[]
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const menuItems: Record<string, MenuItem> = {
    utama: { name: 'Beranda', href: '/' },
    tentang: {
      name: 'Tentang Sekolah',
      submenu: [
        { name: 'Profil', href: '/tentang/profil' },
        { name: 'Visi & Misi', href: '/tentang/visi-misi' },
        { name: 'Kurikulum', href: '/kurikulum' },
        { name: 'Sejarah', href: '/tentang/sejarah' },
        { name: 'Fasilitas', href: '/tentang/fasilitas' },
      ]
    },
    guru: { name: 'Guru & Staf', href: '/guru' },
    program: {
      name: 'Program',
      submenu: [
        { name: 'Playgroup', href: '/program/playgroup' },
        { name: 'TK A', href: '/program/tk-a' },
        { name: 'TK B', href: '/program/tk-b' },
        { name: 'Ekstrakurikuler', href: '/program/ekstrakurikuler' },
      ]
    },
    prestasi: { name: 'Prestasi', href: '/prestasi' },
    kontak: { name: 'Hubungi Kami', href: '/kontak' },
    pendaftaran: { name: 'Pendaftaran', href: '/pendaftaran' },
  }

  return (
    <nav className="bg-white border-b border-gray-100 fixed w-full top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-[#e6f4ec] text-[#00923f] rounded-xl p-2.5 transition-colors group-hover:bg-[#00923f]/15">
              <GraduationCap size={24} className="stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold text-[#00923f] tracking-tight leading-none font-poppins">TK ABA 8 Kepanjen</span>
              <span className="text-[10px] text-gray-400 mt-1 font-semibold uppercase tracking-wider">Aisyiyah Bustanul Athfal</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            {Object.entries(menuItems).map(([key, item]) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => setOpenDropdown(key)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.submenu ? (
                  <>
                    <button className="flex items-center space-x-1 px-4 py-2.5 text-sm font-bold text-gray-600 hover:text-[#00923f] rounded-lg transition duration-200">
                      <span>{item.name}</span>
                      <ChevronDown size={14} className="opacity-70 stroke-[2.5]" />
                    </button>
                    {openDropdown === key && (
                      <div className="absolute top-full left-0 pt-1 z-50">
                        <div className="w-48 bg-white border border-gray-100 rounded-xl shadow-md py-2">
                          {item.submenu.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className="block px-4 py-2 text-xs font-bold text-gray-600 hover:bg-[#e6f4ec] hover:text-[#00923f] transition duration-150"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href || '#'}
                    className={`px-4 py-2.5 text-sm font-bold rounded-lg transition duration-200 ${
                      key === 'pendaftaran'
                        ? 'bg-[#00923f] text-white hover:bg-[#007b34] px-6 py-3 rounded-full shadow-sm ml-2 uppercase text-xs tracking-wider ring-offset-2 hover:ring-2 hover:ring-[#00923f]'
                        : 'text-gray-600 hover:text-[#00923f]'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-500 rounded-xl hover:bg-gray-50 transition"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 max-h-[80vh] overflow-y-auto">
            {Object.entries(menuItems).map(([key, item]) => (
              <div key={key} className="py-1">
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === key ? null : key)}
                      className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-bold text-gray-600 hover:text-[#00923f] transition"
                    >
                      <span>{item.name}</span>
                      <ChevronDown size={14} className={`transform transition duration-200 ${openDropdown === key ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === key && (
                      <div className="pl-6 border-l-2 border-[#e6f4ec] ml-4 my-1 space-y-1">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="block px-4 py-2 text-xs font-bold text-gray-500 hover:text-[#00923f] transition"
                            onClick={() => setIsOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href || '#'}
                    className={`block px-4 py-2.5 text-sm font-bold ${
                      key === 'pendaftaran'
                        ? 'bg-[#00923f] text-white rounded-full mx-4 my-2 text-center shadow-sm hover:bg-[#007b34] transition uppercase text-xs tracking-wider py-3'
                        : 'text-gray-600 hover:text-[#00923f] transition'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar