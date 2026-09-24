"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  Newspaper, 
  School, 
  Users, 
  UserPlus, 
  Settings,
  X,
  Home,
  BookOpen,
  Trophy,
  PhoneCall,
  LogOut,
  User,
  ChevronUp,
  Target
  ,BadgeInfo
} from "lucide-react";

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user: { name: string; email: string };
  siteName: string;
  siteLogo: string;
}

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Beranda", href: "/admin/beranda", icon: Home },
  { name: "Identitas Website", href: "/admin/identitas", icon: BadgeInfo },
  { name: "Berita", href: "/admin/berita", icon: Newspaper },
  { name: "Tentang Sekolah", href: "/admin/tentang", icon: School },
  { name: "Visi & Misi", href: "/admin/visi-misi", icon: Target },
  { name: "Kontak & Lokasi", href: "/admin/kontak", icon: PhoneCall },
  { name: "Kurikulum", href: "/admin/kurikulum", icon: BookOpen },
  { name: "Program Pendidikan", href: "/admin/program", icon: School },
  { name: "Prestasi", href: "/admin/prestasi", icon: Trophy },
  { name: "Guru & Staf", href: "/admin/guru", icon: Users },
  { name: "Pengaturan PPDB", href: "/admin/pendaftaran", icon: UserPlus },
  { name: "Manajemen Akun", href: "/admin/akun", icon: Users },
];

export default function AdminSidebar({ isOpen, setIsOpen, user, siteName, siteLogo }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-emerald-900 border-r border-emerald-800 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-emerald-800/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-amber-500 text-xl font-black text-emerald-950 shadow-inner">
              {siteLogo ? <Image src={siteLogo} alt={`Logo ${siteName}`} fill sizes="32px" className="object-contain p-0.5" unoptimized={siteLogo.endsWith('.svg')} /> : "T"}
            </div>
            <span className="text-xl font-bold text-white tracking-wide">
              {siteName}
            </span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-emerald-800 rounded-md transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto py-5 px-4 space-y-1 custom-scrollbar">
          <div className="text-xs font-bold text-emerald-300/60 uppercase tracking-wider mb-3 px-2">
            Menu Manajemen Web
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? "bg-amber-500 text-emerald-950 font-bold shadow-md shadow-amber-500/20" 
                    : "text-slate-300 hover:bg-emerald-800/80 hover:text-amber-400 font-medium"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Icon 
                  size={20} 
                  className={`transition-colors ${
                    isActive ? "text-emerald-950" : "text-emerald-400/80 group-hover:text-amber-400"
                  }`} 
                />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer with Dropdown */}
        <div className="p-4 border-t border-emerald-800/60 relative">
          
          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute bottom-[84px] left-4 right-4 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2 z-50">
              <div className="p-2 space-y-1">
                <Link href="/admin/profil" onClick={() => setIsProfileOpen(false)} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors text-left">
                  <User size={16} className="text-emerald-600" />
                  Profil Saya
                </Link>
                <Link href="/admin/profil?tab=pengaturan" onClick={() => setIsProfileOpen(false)} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors text-left">
                  <Settings size={16} className="text-emerald-600" />
                  Pengaturan
                </Link>
                <div className="h-px bg-slate-100 my-1"></div>
                <button onClick={() => signOut({ callbackUrl: '/login' })} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left">
                  <LogOut size={16} />
                  Keluar / Logout
                </button>
              </div>
            </div>
          )}

          {/* Profile Button */}
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-full p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/50 flex items-center gap-3 hover:bg-emerald-800/80 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-emerald-950 font-bold shadow-inner shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user.name}</p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>
            <ChevronUp size={16} className={`text-slate-400 transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
          </button>
          
        </div>
      </aside>
    </>
  );
}
