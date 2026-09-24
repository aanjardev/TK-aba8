import { notFound } from 'next/navigation'
import NewsForm from '@/components/admin/NewsForm'
import { prisma } from '@/lib/prisma'
import { updateNews } from '../../actions'

export default async function EditBerita({ params }: PageProps<'/admin/berita/edit/[id]'>) {
  const { id } = await params
  const item = await prisma.news.findUnique({ where: { id } })
  if (!item) notFound()
  return <NewsForm action={updateNews.bind(null, id)} values={item} />
}
