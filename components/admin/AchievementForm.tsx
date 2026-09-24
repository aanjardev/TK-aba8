import Link from 'next/link'
import { Save } from 'lucide-react'
import type { AchievementData } from '@/lib/achievements'
import ImageUploadPreview from './ImageUploadPreview'
import { SubmitButton } from './FormControls'

const field='w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10'
const Field=({label,children}:{label:string;children:React.ReactNode})=><label className="block space-y-2"><span className="text-sm font-bold text-slate-700">{label}</span>{children}</label>

export default function AchievementForm({action,values}:{action:(d:FormData)=>void|Promise<void>;values?:AchievementData}) {
  return <form action={action} className="mx-auto max-w-5xl space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
    <div className="grid gap-5 md:grid-cols-2"><Field label="Nama prestasi / penghargaan"><input name="title" defaultValue={values?.title} className={field} required/></Field><Field label="Penerima"><input name="recipient" defaultValue={values?.recipient} placeholder="Nama siswa, guru, tim, atau sekolah" className={field} required/></Field></div>
    <div className="grid gap-5 md:grid-cols-3"><Field label="Kategori"><select name="category" defaultValue={values?.category??'Prestasi Siswa'} className={field}><option>Prestasi Siswa</option><option>Prestasi Guru</option><option>Prestasi Sekolah</option></select></Field><Field label="Tingkat"><select name="level" defaultValue={values?.level??'Kecamatan'} className={field}><option>Sekolah</option><option>Kecamatan</option><option>Kabupaten</option><option>Provinsi</option><option>Nasional</option><option>Internasional</option></select></Field><Field label="Tahun diraih"><input name="year" type="number" min="1990" max="2100" defaultValue={values?.year??new Date().getFullYear()} className={field} required/></Field></div>
    <Field label="Deskripsi"><textarea name="description" defaultValue={values?.description} rows={5} className={`${field} resize-y`} required/></Field>
    <div className="grid gap-5 md:grid-cols-2"><Field label="Dokumentasi"><ImageUploadPreview current={values?.image}/></Field><div className="space-y-5"><Field label="Teks alternatif gambar"><input name="imageAlt" defaultValue={values?.imageAlt} placeholder="Deskripsi singkat dokumentasi" className={field}/></Field><Field label="Urutan tampil"><input name="sortOrder" type="number" min="0" defaultValue={values?.sortOrder??0} className={field}/></Field></div></div>
    <div className="flex flex-wrap gap-5 rounded-xl bg-slate-50 p-4"><label className="flex items-center gap-2 text-sm font-semibold"><input name="isActive" type="checkbox" defaultChecked={values?.isActive??true} className="h-4 w-4 accent-emerald-600"/>Tampilkan di halaman prestasi</label><label className="flex items-center gap-2 text-sm font-semibold"><input name="isFeatured" type="checkbox" defaultChecked={values?.isFeatured??false} className="h-4 w-4 accent-emerald-600"/>Tampilkan di beranda</label></div>
    <div className="flex justify-end gap-3 border-t border-slate-100 pt-6"><Link href="/admin/prestasi" className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600">Batal</Link><SubmitButton className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-emerald-950 hover:bg-amber-400"><Save size={18}/>Simpan Prestasi</SubmitButton></div>
  </form>
}
