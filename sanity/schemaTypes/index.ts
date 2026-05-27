// sanity/schemaTypes/index.ts
import {defineType, defineField} from 'sanity'

// Schema Hero Section
export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section (Banner Utama)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Utama',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subtitle',
      title: 'Subjudul',
      type: 'string'
    }),
    defineField({
      name: 'buttonText',
      title: 'Teks Tombol',
      type: 'string'
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Gambar Background',
      type: 'image',
      options: {hotspot: true}
    }),
    defineField({
      name: 'isActive',
      title: 'Aktifkan',
      type: 'boolean',
      initialValue: true
    })
  ]
})

// Schema About Section
export const aboutSection = defineType({
  name: 'aboutSection',
  title: 'Tentang Sekolah',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul',
      type: 'string'
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi',
      type: 'text'
    }),
    defineField({
      name: 'vision',
      title: 'Visi',
      type: 'text'
    }),
    defineField({
      name: 'mission',
      title: 'Misi',
      type: 'array',
      of: [{type: 'string'}]
    }),
    defineField({
      name: 'image',
      title: 'Gambar',
      type: 'image'
    })
  ]
})

// Schema News
export const news = defineType({
  name: 'news',
  title: 'Berita & Pengumuman',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {source: 'title'}
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          {title: 'Berita', value: 'news'},
          {title: 'Pengumuman', value: 'announcement'},
          {title: 'Kegiatan', value: 'activity'}
        ]
      }
    }),
    defineField({
      name: 'date',
      title: 'Tanggal',
      type: 'date'
    }),
    defineField({
      name: 'excerpt',
      title: 'Ringkasan',
      type: 'text'
    }),
    defineField({
      name: 'content',
      title: 'Konten',
      type: 'array',
      of: [{type: 'block'}]
    }),
    defineField({
      name: 'image',
      title: 'Gambar Utama',
      type: 'image'
    })
  ]
})

// Export semua schema
export const schemaTypes = [heroSection, aboutSection, news]