import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, Edit, Plus, Search, Trash2, UserRound } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { deleteStaff } from './actions'
import { ConfirmButton } from '@/components/admin/FormControls'

export default async function AdminGuru({ searchParams }: PageProps<'/admin/guru'>) {
  const query = await searchParams
  const keyword = String(query.q ?? '').trim()
  const items = await prisma.staff.findMany({ where: keyword ? { OR: [{ name: { contains: keyword } }, { position: { contains: keyword } }] } : undefined, orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }] })
  return <div className="space-y-6">
    {query.saved === '1' && <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800"><CheckCircle2 size={18} />Data guru atau staf berhasil disimpan.</div>}
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <form className="relative w-full sm:max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18}/><input name="q" defaultValue={keyword} placeholder="Cari nama atau jabatan..." className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm" /></form>
      <Link href="/admin/guru/tambah" className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-emerald-950"><Plus size={18}/>Tambah Data</Link>
    </div>
    {items.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{items.map(item => <article key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="relative aspect-[4/3] bg-slate-100">{item.image ? <Image src={item.image} alt={item.imageAlt || item.name} fill className="object-cover" sizes="(max-width:768px) 100vw, 25vw"/> : <div className="absolute inset-0 flex items-center justify-center"><UserRound size={54} className="text-slate-300"/></div>}<span className="absolute bottom-3 left-3 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-emerald-950">{item.category === 'PRINCIPAL' ? 'Kepala Sekolah' : item.category === 'TEACHER' ? 'Guru' : 'Staf'}</span></div>
      <div className="p-4"><h2 className="font-bold text-slate-900">{item.name}</h2><p className="mt-1 text-sm text-slate-500">{item.position}</p><p className={`mt-3 text-xs font-bold ${item.isActive ? 'text-emerald-700' : 'text-slate-400'}`}>{item.isActive ? 'Tampil di website' : 'Disembunyikan'}</p><div className="mt-4 flex gap-2 border-t pt-4"><Link href={`/admin/guru/edit/${item.id}`} className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-emerald-50 py-2 text-xs font-bold text-emerald-700"><Edit size={14}/>Edit</Link><form><ConfirmButton formAction={deleteStaff.bind(null,item.id)} message={`Hapus ${item.name}?`} className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600"><Trash2 size={14}/>Hapus</ConfirmButton></form></div></div>
    </article>)}</div> : <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center text-slate-500"><UserRound className="mx-auto mb-3 text-slate-300" size={48}/><p className="font-semibold">Belum ada data guru atau staf.</p></div>}
  </div>
}
