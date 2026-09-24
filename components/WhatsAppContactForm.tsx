'use client'
import { useState } from 'react'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppContactForm({ whatsapp, defaultMessage, compact=false }: { whatsapp:string; defaultMessage:string; compact?:boolean }) {
  const [name,setName]=useState(''); const [phone,setPhone]=useState(''); const [message,setMessage]=useState('')
  function submit(event:React.FormEvent){event.preventDefault();const text=`${defaultMessage}\n\nNama: ${name}\nNomor WhatsApp: ${phone}\nPertanyaan: ${message}`;const href=`https://wa.me/${whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent(text)}`;window.open(href,'_blank','noopener,noreferrer')}
  const input='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#0a1c12] outline-none transition focus:border-[#00923f] focus:ring-4 focus:ring-[#00923f]/10'
  return <form onSubmit={submit} className="space-y-4"><Field label="Nama lengkap orang tua"><input value={name} onChange={e=>setName(e.target.value)} className={input} placeholder="Contoh: Budi Santoso" required/></Field><Field label="Nomor WhatsApp aktif"><input value={phone} onChange={e=>setPhone(e.target.value)} className={input} type="tel" inputMode="tel" placeholder="Contoh: 08123456789" required/></Field><Field label="Isi pesan / pertanyaan"><textarea value={message} onChange={e=>setMessage(e.target.value)} className={`${input} resize-y`} rows={compact?4:5} placeholder="Tuliskan pertanyaan Anda..." required/></Field><button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#128c5e] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#0d744d]"><MessageCircle size={18}/>Lanjutkan ke WhatsApp</button><p className="text-center text-[11px] leading-relaxed text-slate-500">Pesan akan dibuka di WhatsApp dan baru terkirim setelah Anda menekan tombol kirim.</p></form>
}
function Field({label,children}:{label:string;children:React.ReactNode}){return <label className="block"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#60736a]">{label}</span>{children}</label>}
