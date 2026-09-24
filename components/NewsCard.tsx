import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar, Image as ImageIcon } from 'lucide-react'
import type { PublicNews } from '@/lib/news'
import { formatNewsDate } from '@/lib/news'

export default function NewsCard({ item, priority = false }: { item: PublicNews; priority?: boolean }) {
  return (
    <article className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <Link href={`/berita/${item.slug}`} className="block relative aspect-[16/10] bg-[#eaf5ef] overflow-hidden">
        {item.image ? <Image src={item.image} alt={item.imageAlt || item.title} fill priority={priority} sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" /> : <span className="absolute inset-0 flex items-center justify-center text-[#00923f]/30"><ImageIcon size={42} /></span>}
        <span className="absolute left-4 top-4 bg-white/95 text-[#007f36] text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full">{item.category}</span>
      </Link>
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3"><Calendar size={13} />{formatNewsDate(item.publishedAt)}</div>
        <h3 className="text-lg font-extrabold text-[#0a1c12] leading-snug group-hover:text-[#00923f] transition-colors"><Link href={`/berita/${item.slug}`}>{item.title}</Link></h3>
        <p className="text-sm text-[#6b8077] leading-relaxed mt-3 line-clamp-3">{item.excerpt}</p>
        <Link href={`/berita/${item.slug}`} className="inline-flex items-center gap-1.5 mt-5 text-xs font-bold uppercase tracking-wider text-[#00923f]">Baca berita <ArrowRight size={14} /></Link>
      </div>
    </article>
  )
}
