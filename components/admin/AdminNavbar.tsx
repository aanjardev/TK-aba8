"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Menu, Plus } from "lucide-react";

interface AdminNavbarProps {
  toggleSidebar: () => void;
  siteName: string;
}

export default function AdminNavbar({ toggleSidebar,siteName }: AdminNavbarProps) {
  const pathname = usePathname();

  // Helper untuk menentukan judul dan sub judul halaman aktif berdasarkan rute
  const getPageInfo = (path: string) => {
    if (path === "/admin") {
      return { 
        title: "Dashboard Utama", 
        subtitle: `Ringkasan statistik dan aktivitas terbaru ${siteName}`,
        // icon: LayoutDashboard 
      };
    }
    if (path.startsWith("/admin/beranda")) {
      return { 
        title: "Pengaturan Beranda", 
        subtitle: "Kelola konten dan informasi halaman depan website",
        // icon: Home 
      };
    }
    if(path.startsWith('/admin/identitas'))return{title:'Identitas Website',subtitle:`Kelola nama, logo, favicon, dan media sosial ${siteName}`}
    if (path.startsWith("/admin/tentang")) {
      return { 
        title: "Tentang Sekolah", 
        subtitle: "Kelola profil lembaga, sejarah perjalanan, dan fasilitas sekolah",
        // icon: School 
      };
    }
    if (path.startsWith("/admin/visi-misi")) {
      return { title: "Visi & Misi", subtitle: "Kelola arah, misi, tujuan, motto, dan nilai inti sekolah" };
    }
    if (path.startsWith("/admin/kontak")) {
      return { title: "Kontak & Lokasi", subtitle: "Kelola alamat, saluran komunikasi, peta, dan pesan WhatsApp" };
    }
    if (path === "/admin/program/tambah") {
      return { title: "Tambah Program", subtitle: "Tambahkan layanan atau program pendidikan baru" };
    }
    if (path.startsWith("/admin/program/edit/")) {
      return { title: "Edit Program", subtitle: "Perbarui informasi program pendidikan" };
    }
    if (path.startsWith("/admin/program")) {
      return { 
        title: "Program Pendidikan", 
        subtitle: "Kelola jenjang, layanan, dan program unggulan",
        // icon: BookOpen 
      };
    }
    if (path.startsWith("/admin/kurikulum")) {
      return { title: "Pengaturan Kurikulum", subtitle: "Kelola pendekatan belajar dan jadwal harian" };
    }
    if (path === "/admin/prestasi/tambah") {
      return { title: "Tambah Prestasi", subtitle: "Tambahkan pencapaian siswa, guru, atau sekolah" };
    }
    if (path.startsWith("/admin/prestasi/edit/")) {
      return { title: "Edit Prestasi", subtitle: "Perbarui informasi dan dokumentasi prestasi" };
    }
    if (path.startsWith("/admin/prestasi")) {
      return { 
        title: "Manajemen Prestasi", 
        subtitle: "Kelola daftar penghargaan dan prestasi sekolah",
        // icon: Trophy 
      };
    }
    if (path === "/admin/guru/tambah") {
      return { 
        title: "Tambah Data Guru", 
        subtitle: "Formulir pendaftaran pendidik atau tenaga kependidikan baru",
        // icon: Users 
      };
    }
    if (path.startsWith("/admin/guru")) {
      return { 
        title: "Guru & Staf", 
        subtitle: "Kelola daftar profil pendidik dan tenaga kependidikan",
        // icon: Users 
      };
    }
    if (path === "/admin/berita/tambah") {
      return { 
        title: "Tambah Berita Baru", 
        subtitle: "Buat publikasi konten atau pengumuman baru",
        //  icon: Newspaper 
      };
    }
    if (path.startsWith("/admin/berita/edit/")) {
      return {
        title: "Edit Berita",
        subtitle: "Perbarui isi dan pengaturan publikasi berita",
      };
    }
    if (path.startsWith("/admin/berita")) {
      return { 
        title: "Berita & Pengumuman", 
        subtitle: "Kelola artikel, kegiatan, dan pengumuman sekolah",
        // icon: Newspaper 
      };
    }
    if (path.startsWith("/admin/pendaftaran/") && path !== "/admin/pendaftaran") {
      return { 
        title: "Detail Pendaftaran", 
        subtitle: "Verifikasi berkas dan status calon siswa baru",
        // icon: UserPlus 
      };
    }
    if (path.startsWith("/admin/pendaftaran")) {
      return { 
        title: "Info & Alur Pendaftaran", 
        subtitle: "Kelola syarat, alur, dan status pendaftaran siswa baru",
        // icon: UserPlus 
      };
    }
    if (path.startsWith("/admin/akun")) {
      return { 
        title: "Manajemen Akun", 
        subtitle: "Kelola akun administrator pengurus website",
        // icon: UserCheck 
      };
    }
    if (path.startsWith("/admin/profil")) {
      return { 
        title: "Akun Saya", 
        subtitle: "Kelola profil pribadi dan pengaturan keamanan akun",
        // icon: User 
      };
    }
    return { 
      title: "Panel Admin", 
      subtitle: `Sistem Administrasi ${siteName}`,
      // icon: LayoutDashboard 
    };
  };

  const pageInfo = getPageInfo(pathname);
  const pageAction = pathname === "/admin/berita"
    ? { href: "/admin/berita/tambah", label: "Tambah Berita", icon: Plus, primary: true }
    : pathname === "/admin/berita/tambah" || pathname.startsWith("/admin/berita/edit/")
      ? { href: "/admin/berita", label: "Kembali", icon: ArrowLeft, primary: false }
      : pathname === "/admin/guru/tambah"
        ? { href: "/admin/guru", label: "Kembali", icon: ArrowLeft, primary: false }
        : pathname === "/admin/program"
          ? { href: "/admin/program/tambah", label: "Tambah Program", icon: Plus, primary: true }
          : pathname === "/admin/program/tambah" || pathname.startsWith("/admin/program/edit/")
            ? { href: "/admin/program", label: "Kembali", icon: ArrowLeft, primary: false }
            : pathname === "/admin/prestasi"
              ? { href: "/admin/prestasi/tambah", label: "Tambah Prestasi", icon: Plus, primary: true }
              : pathname === "/admin/prestasi/tambah" || pathname.startsWith("/admin/prestasi/edit/")
                ? { href: "/admin/prestasi", label: "Kembali", icon: ArrowLeft, primary: false }
                : null;

  return (
    <header className="h-16 md:h-20 bg-white/95 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 z-30 sticky top-0 shadow-sm transition-all">
      {/* Left section: Mobile Menu Toggle & Title + Subtitle */}
      <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1 mr-2">
        <button
          onClick={toggleSidebar}
          aria-label="Buka menu navigasi"
          className="lg:hidden p-2 -ml-2 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-xl transition-colors shrink-0"
        >
          <Menu size={22} />
        </button>

        {/* Title and Subtitle */}
        <div className="flex flex-col min-w-0">
          <h1 className="text-lg md:text-xl lg:text-2xl font-extrabold text-slate-900 tracking-tight truncate leading-tight">
            {pageInfo.title}
          </h1>
          <p className="text-xs md:text-sm text-slate-500 font-medium truncate mt-0.5 hidden sm:block">
            {pageInfo.subtitle}
          </p>
        </div>
      </div>

      {pageAction && (
        <Link
          href={pageAction.href}
          className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition-colors sm:px-4 ${pageAction.primary ? "bg-amber-500 text-emerald-950 hover:bg-amber-400" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
        >
          <pageAction.icon size={17} />
          <span className="hidden sm:inline">{pageAction.label}</span>
        </Link>
      )}

      {/* Right section: Date (on Dashboard) & Logout
      <div className="flex items-center gap-3 shrink-0">
        {isDashboard && (
          <div className="hidden md:flex items-center gap-2 text-xs lg:text-sm font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200/70 shadow-sm">
            <Calendar size={16} className="text-emerald-600 shrink-0" />
            <span>{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        )}

        <button 
          title="Keluar dari sesi admin"
          className="flex items-center gap-2 text-slate-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 sm:px-4 rounded-xl transition-colors text-sm font-semibold focus:outline-none border border-transparent hover:border-red-100"
        >
          <LogOut size={18} />
          <span className="hidden md:inline">Keluar</span>
        </button>
      </div> */}
    </header>
  );
}
