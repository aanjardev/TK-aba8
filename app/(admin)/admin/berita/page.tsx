import Link from 'next/link'
import Image from 'next/image'
import { AlertTriangle, Edit2, Eye, ImageIcon, Search, Trash2 } from 'lucide-react'
import type { News, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { formatNewsDate } from '@/lib/news'
import { deleteNews } from './actions'
import { ConfirmButton } from '@/components/admin/FormControls'

export default async function AdminBerita({ searchParams }: PageProps<'/admin/berita'>) {
  const params = await searchParams
  const queryValue = params.q
  const query = typeof queryValue === 'string' ? queryValue.trim() : ''
  const status = params.status === 'PUBLISHED' || params.status === 'DRAFT' ? params.status : ''
  const category = typeof params.category === 'string' ? params.category.trim() : ''
  const sort = ['newest', 'oldest', 'title-asc', 'title-desc'].includes(String(params.sort)) ? String(params.sort) : 'newest'
  const orderBy: Prisma.NewsOrderByWithRelationInput = sort === 'oldest'
    ? { updatedAt: 'asc' }
    : sort === 'title-asc'
      ? { title: 'asc' }
      : sort === 'title-desc'
        ? { title: 'desc' }
        : { updatedAt: 'desc' }
  let news: News[] = []
  let categories: string[] = []
  let databaseUnavailable = false

  try {
    const [newsData, categoryData] = await Promise.all([
      prisma.news.findMany({
        where: {
          ...(query ? { title: { contains: query } } : {}),
          ...(status ? { status } : {}),
          ...(category ? { category } : {}),
        },
        orderBy,
      }),
      prisma.news.findMany({ select: { category: true }, distinct: ['category'], orderBy: { category: 'asc' } }),
    ])
    news = newsData
    categories = categoryData.map((item) => item.category)
  } catch {
    databaseUnavailable = true
  }
  return (
    <div className="space-y-6">
      {databaseUnavailable && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-amber-950">
          <AlertTriangle className="mt-0.5 shrink-0 text-amber-600" size={21} />
          <div>
            <h2 className="font-bold">Database belum terhubung</h2>
            <p className="mt-1 text-sm leading-relaxed text-amber-800">
              Nyalakan MySQL melalui XAMPP, lalu muat ulang halaman ini. Jika ini pertama kali menjalankan fitur berita, jalankan <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs">npx prisma migrate deploy</code> setelah MySQL aktif.
            </p>
          </div>
        </div>
      )}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <form className="grid gap-3 border-b border-slate-200 p-4 md:p-6 lg:grid-cols-[minmax(220px,1fr)_180px_180px_190px_auto]">
          <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input name="q" defaultValue={query} placeholder="Cari judul berita..." className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-emerald-500" /></div>
          <select name="status" defaultValue={status} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-500"><option value="">Semua status</option><option value="PUBLISHED">Terbit</option><option value="DRAFT">Draf</option></select>
          <select name="category" defaultValue={category} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-500"><option value="">Semua kategori</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select>
          <select name="sort" defaultValue={sort} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-500"><option value="newest">Terakhir diperbarui</option><option value="oldest">Paling lama</option><option value="title-asc">Judul A–Z</option><option value="title-desc">Judul Z–A</option></select>
          <div className="flex gap-2"><button className="flex-1 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">Terapkan</button>{(query || status || category || sort !== 'newest') && <Link href="/admin/berita" className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Reset</Link>}</div>
        </form>
        {news.length === 0 ? (
          <div className="py-20 px-6 text-center"><p className="font-semibold text-slate-700">{databaseUnavailable ? 'Data belum dapat dimuat.' : query ? 'Berita tidak ditemukan.' : 'Belum ada berita.'}</p><p className="text-sm text-slate-500 mt-1">{databaseUnavailable ? 'Pastikan layanan MySQL XAMPP sedang berjalan.' : 'Mulai dengan menambahkan berita pertama sekolah.'}</p></div>
        ) : (
          <div className="overflow-x-auto"><table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200"><tr><th className="py-4 pl-6 pr-2 text-center">No.</th><th className="px-3 py-4">Preview</th><th className="py-4 px-4">Judul</th><th className="py-4 px-4">Kategori</th><th className="py-4 px-4">Tanggal</th><th className="py-4 px-4">Status</th><th className="py-4 px-6 text-right">Aksi</th></tr></thead>
            <tbody className="divide-y divide-slate-100">{news.map((item, index) => (
              <tr key={item.id} className="hover:bg-slate-50/80">
                <td className="py-4 pl-6 pr-2 text-center font-mono text-xs text-slate-400">{index + 1}</td>
                <td className="px-3 py-3"><div className="relative h-14 w-20 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">{item.image ? <Image src={item.image} alt={item.imageAlt || item.title} fill sizes="80px" className="object-cover" /> : <div className="flex h-full w-full items-center justify-center text-slate-300"><ImageIcon size={22} /></div>}</div></td>
                <td className="py-4 px-4"><p className="font-semibold text-slate-900 max-w-md min-w-52">{item.title}</p>{item.isFeatured && <span className="text-[10px] font-bold uppercase text-amber-700">Unggulan</span>}</td>
                <td className="py-4 px-4"><span className="px-2.5 py-1 rounded-full text-xs bg-slate-100">{item.category}</span></td>
                <td className="py-4 px-4 whitespace-nowrap">{formatNewsDate(item.publishedAt)}</td>
                <td className="py-4 px-4"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${item.status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{item.status === 'PUBLISHED' ? 'Terbit' : 'Draf'}</span></td>
                <td className="py-4 px-6"><div className="flex justify-end gap-1">{item.status === 'PUBLISHED' && <Link href={`/berita/${item.slug}`} target="_blank" className="p-2 text-slate-400 hover:text-emerald-600" title="Lihat"><Eye size={16} /></Link>}<Link href={`/admin/berita/edit/${item.id}`} className="p-2 text-slate-400 hover:text-blue-600" title="Edit"><Edit2 size={16} /></Link><form><ConfirmButton formAction={deleteNews.bind(null,item.id)} message={`Hapus berita “${item.title}”?`} className="p-2 text-slate-400 hover:text-red-600"><Trash2 size={16}/></ConfirmButton></form></div></td>
              </tr>
            ))}</tbody>
          </table></div>
        )}
        <div className="p-4 border-t border-slate-200 text-sm text-slate-500">{news.length} berita ditampilkan</div>
      </div>
    </div>
  )
}
