import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, UserRound } from 'lucide-react'
import { notFound } from 'next/navigation'
import MarkdownContent from '@/components/MarkdownContent'
import { formatNewsDate, getNewsBySlug, readingTime } from '@/lib/news'
import { getSiteSettings } from '@/lib/site-settings'

export async function generateMetadata({ params }: PageProps<'/berita/[slug]'>): Promise<Metadata> {
  const [item,site] = await Promise.all([getNewsBySlug((await params).slug),getSiteSettings()])
  if (!item) return { title: 'Berita tidak ditemukan' }
  return { title: item.title, description: item.excerpt, openGraph: { title: `${item.title} | ${site.shortName}`, description: item.excerpt, images: item.image ? [item.image] : [] } }
}

export default async function DetailBerita({ params }: PageProps<'/berita/[slug]'>) {
  const item = await getNewsBySlug((await params).slug)
  if (!item) notFound()
  return (
    <article className="bg-white min-h-screen">
      <header className="bg-[#f2faf6] border-b border-green-100"><div className="container mx-auto px-6 py-14 max-w-4xl"><Link href="/berita" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00923f] mb-8"><ArrowLeft size={15} /> Semua berita</Link><span className="block w-fit bg-[#dff3e7] text-[#007f36] text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full">{item.category}</span><h1 className="text-3xl md:text-5xl font-extrabold text-[#0a1c12] leading-tight mt-5">{item.title}</h1><p className="text-[#6b8077] text-lg leading-relaxed mt-5">{item.excerpt}</p><div className="flex flex-wrap gap-5 mt-7 text-xs text-[#6b8077]"><span className="flex items-center gap-2"><Calendar size={15} />{formatNewsDate(item.publishedAt)}</span><span className="flex items-center gap-2"><Clock size={15} />{readingTime(item.content)} menit baca</span>{item.author && <span className="flex items-center gap-2"><UserRound size={15} />{item.author}</span>}</div></div></header>
      <div className="container mx-auto px-6 max-w-4xl py-12">
        {item.image && <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-gray-100 mb-12"><Image src={item.image} alt={item.imageAlt || item.title} fill priority sizes="(max-width: 896px) 100vw, 896px" className="object-cover" /></div>}
        <MarkdownContent content={item.content} />
      </div>
    </article>
  )
}
