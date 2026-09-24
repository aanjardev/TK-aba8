import Link from 'next/link'
import { Save } from 'lucide-react'
import type { Staff } from '@prisma/client'
import ImageUploadPreview from '@/components/admin/ImageUploadPreview'

const field = 'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10'

export default function StaffForm({ item, action }: { item?: Staff; action: (data: FormData) => void | Promise<void> }) {
  return <form action={action} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
    <div><h2 className="text-xl font-bold text-slate-900">{item ? 'Edit guru atau staf' : 'Tambah guru atau staf'}</h2><p className="mt-1 text-sm text-slate-500">Data yang diaktifkan akan langsung tampil pada halaman Guru &amp; Staf.</p></div>
    <div className="grid gap-5 md:grid-cols-2">
      <Field label="Nama lengkap dan gelar *"><input name="name" defaultValue={item?.name} className={field} required /></Field>
      <Field label="Kategori *"><select name="category" defaultValue={item?.category ?? 'TEACHER'} className={field}><option value="PRINCIPAL">Kepala sekolah</option><option value="TEACHER">Guru</option><option value="STAFF">Tenaga kependidikan</option></select></Field>
      <Field label="Jabatan *"><input name="position" defaultValue={item?.position} placeholder="Contoh: Wali Kelas A" className={field} required /></Field>
      <Field label="NIP / NUPTK (opsional)"><input name="identityNo" defaultValue={item?.identityNo ?? ''} className={field} /></Field>
      <Field label="Pendidikan terakhir"><input name="education" defaultValue={item?.education ?? ''} className={field} /></Field>
      <Field label="Urutan tampil"><input name="sortOrder" type="number" min="0" defaultValue={item?.sortOrder ?? 0} className={field} /></Field>
      <Field label="Foto"><ImageUploadPreview current={item?.image}/></Field>
    </div>
    <Field label="Teks alternatif foto"><input name="imageAlt" defaultValue={item?.imageAlt ?? ''} placeholder="Contoh: Foto Ibu Siti Aminah" className={field} /></Field>
    <label className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-sm font-semibold"><input name="isActive" type="checkbox" defaultChecked={item?.isActive ?? true} /> Tampilkan pada website publik</label>
    <div className="flex justify-end gap-3 border-t border-slate-100 pt-5"><Link href="/admin/guru" className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-bold text-slate-700">Batal</Link><button className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-emerald-950"><Save size={18} />Simpan Data</button></div>
  </form>
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-800">{label}</span>{children}</label> }
