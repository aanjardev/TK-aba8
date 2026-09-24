'use client'

import { useState } from 'react'

export type AdminSectionTab = { id: string; label: string; description?: string; content: React.ReactNode; action?: React.ReactNode }

export default function AdminSectionTabs({ tabs, initialTab }: { tabs: AdminSectionTab[]; initialTab?: string }) {
  const [active, setActive] = useState(tabs.some(tab => tab.id === initialTab) ? initialTab! : tabs[0]?.id)
  const selected = tabs.find(tab => tab.id === active) ?? tabs[0]
  if (!selected) return null
  return <div className="space-y-5">
    <div className="sticky top-0 z-20 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-sm backdrop-blur">
      <div className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:thin]"><div className="flex min-w-max gap-1">{tabs.map(tab => <button key={tab.id} type="button" onClick={() => setActive(tab.id)} className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${active === tab.id ? 'bg-emerald-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>{tab.label}</button>)}</div></div>
      {selected.action && <div className="shrink-0">{selected.action}</div>}
    </div>
    {selected.description && <p className="px-1 text-sm text-slate-500">{selected.description}</p>}
    <div key={selected.id} className="animate-in fade-in slide-in-from-bottom-1 duration-200">{selected.content}</div>
  </div>
}
