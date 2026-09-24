import Link from 'next/link'
import { Save } from 'lucide-react'
import ImageUploadPreview from '@/components/admin/ImageUploadPreview'

type NewsValues = {
  title: string; category: string; excerpt: string; content: string; image: string | null
  imageAlt: string | null; author: string | null; isFeatured: boolean; publishedAt: Date | null
}

export default function NewsForm({ action, values }: { action: (data: FormData) => void | Promise<void>; values?: NewsValues }) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
        <form action={action} className="space-y-7">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Judul Berita *</label>
            <input name="title" required minLength={5} defaultValue={values?.title} placeholder="Masukkan judul yang menarik..." className="field" />
            <p className="mt-1.5 text-xs text-slate-500">Alamat URL (slug) dibuat otomatis dari judul.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Kategori</label>
              <select name="category" defaultValue={values?.category ?? 'Berita'} className="field">
                <option>Berita</option><option>Pengumuman</option><option>Kegiatan</option><option>Prestasi</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Tanggal Publikasi</label>
              <input name="publishedAt" type="date" defaultValue={values?.publishedAt?.toISOString().slice(0, 10)} className="field" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Penulis</label>
              <input name="author" defaultValue={values?.author ?? ''} placeholder="Contoh: Humas Sekolah" className="field" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Teks alternatif gambar</label>
              <input name="imageAlt" defaultValue={values?.imageAlt ?? ''} placeholder="Jelaskan isi gambar" className="field" />
            </div>
          </div>
          <div><label className="mb-2 block text-sm font-semibold text-slate-900">Gambar Utama</label><ImageUploadPreview current={values?.image}/></div>
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Ringkasan Singkat *</label>
            <textarea name="excerpt" required minLength={20} rows={3} defaultValue={values?.excerpt} placeholder="Ringkasan yang tampil pada kartu berita..." className="field resize-y" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Konten Markdown *</label>
            <textarea name="content" required minLength={30} rows={15} defaultValue={values?.content} placeholder={'## Subjudul\n\nTulis paragraf berita di sini.\n\n- Poin pertama\n- Poin kedua\n\n**Teks tebal** dan [tautan](https://contoh.id)'} className="field font-mono text-sm resize-y" />
            <p className="mt-2 text-xs text-slate-500">Mendukung judul (#), tebal (**teks**), miring (*teks*), daftar, kutipan, dan tautan.</p>
          </div>
          <label className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 p-4 cursor-pointer">
            <input name="isFeatured" type="checkbox" defaultChecked={values?.isFeatured} className="mt-0.5 h-4 w-4 accent-emerald-600" />
            <span><span className="block text-sm font-semibold text-slate-900">Jadikan berita unggulan</span><span className="text-xs text-slate-600">Berita unggulan diprioritaskan pada highlight beranda.</span></span>
          </label>
          <div className="pt-6 border-t border-slate-200 flex flex-wrap justify-end gap-3">
            <Link href="/admin/berita" className="px-6 py-2.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-xl">Batal</Link>
            <button name="intent" value="draft" className="px-6 py-2.5 text-sm font-medium text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-xl">Simpan sebagai Draf</button>
            <button name="intent" value="publish" className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl"><Save size={18} /> Terbitkan</button>
          </div>
        </form>
      </div>
    </div>
  )
}
