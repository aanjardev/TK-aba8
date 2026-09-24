import NewsForm from '@/components/admin/NewsForm'
import { createNews } from '../actions'

export default function TambahBerita() {
  return <NewsForm action={createNews} />
}
