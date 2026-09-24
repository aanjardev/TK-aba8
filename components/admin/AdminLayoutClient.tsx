"use client";

import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayoutClient({ children, user, siteName, siteLogo }: { children: React.ReactNode; user: { name: string; email: string };siteName:string;siteLogo:string }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div onSubmitCapture={event=>{const button=(event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement|null;if(button&&!button.dataset.confirmed&&button.className.includes('red-')&&!window.confirm('Hapus data ini? Tindakan ini tidak dapat dibatalkan.'))event.preventDefault()}} className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      {/* Sidebar Component */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} user={user} siteName={siteName} siteLogo={siteLogo} />

      {/* Main Content Wrapper */}
      <div className="flex flex-col flex-1 w-full overflow-hidden transition-all duration-300">
        {/* Navbar Component */}
        <AdminNavbar siteName={siteName} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-5 lg:p-6 bg-slate-50 relative">
          <div className="w-full mx-auto relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
