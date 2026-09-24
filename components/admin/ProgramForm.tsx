import Link from 'next/link'
import { Save } from 'lucide-react'
import type { ProgramData } from '@/lib/academics'
import ImageUploadPreview from './ImageUploadPreview'
import { SubmitButton } from './FormControls'

const field = 'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10'
const Field = ({label,hint,children}:{label:string;hint?:string;children:React.ReactNode}) => <label className="block space-y-2"><span className="text-sm font-bold text-slate-700">{label}</span>{children}{hint&&<span className="block text-xs text-slate-500">{hint}</span>}</label>

export default function ProgramForm({action,values}:{action:(data:FormData)=>void|Promise<void>;values?:ProgramData}) {
  return <form action={action} className="mx-auto max-w-5xl space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
    <div className="grid gap-5 md:grid-cols-2"><Field label="Nama program"><input name="title" defaultValue={values?.title} className={field} required/></Field><Field label="Label singkat"><input name="eyebrow" defaultValue={values?.eyebrow} placeholder="Contoh: Usia Emas 4–5 Tahun" className={field} required/></Field></div>
    <Field label="Deskripsi"><textarea name="description" defaultValue={values?.description} rows={5} className={`${field} resize-y`} required/></Field>
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4"><Field label="Kelompok usia"><input name="age" defaultValue={values?.age} className={field} required/></Field><Field label="Jadwal"><input name="schedule" defaultValue={values?.schedule} className={field} required/></Field><Field label="Kapasitas"><input name="capacity" defaultValue={values?.capacity} className={field} required/></Field><Field label="Rasio guru"><input name="teacherRatio" defaultValue={values?.teacherRatio} className={field} required/></Field></div>
    <Field label="Fokus dan target capaian" hint="Satu poin per baris"><textarea name="highlights" defaultValue={values?.highlights.join('\n')} rows={7} className={`${field} resize-y`} required/></Field>
    <div className="grid gap-5 md:grid-cols-2"><Field label="Gambar program"><ImageUploadPreview current={values?.image}/></Field><Field label="Urutan tampil"><input type="number" name="sortOrder" min="0" defaultValue={values?.sortOrder??0} className={field}/></Field></div>
    <div className="flex flex-wrap gap-5 rounded-xl bg-slate-50 p-4"><label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" name="isActive" defaultChecked={values?.isActive??true} className="h-4 w-4 accent-emerald-600"/>Program aktif</label><label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" name="isFeatured" defaultChecked={values?.isFeatured??false} className="h-4 w-4 accent-emerald-600"/>Tampilkan di beranda</label></div>
    <div className="flex justify-end gap-3 border-t border-slate-100 pt-6"><Link href="/admin/program" className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600">Batal</Link><SubmitButton className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-emerald-950 hover:bg-amber-400"><Save size={18}/>Simpan Program</SubmitButton></div>
  </form>
}
