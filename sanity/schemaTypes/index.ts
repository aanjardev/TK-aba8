import {defineType, defineField} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Beranda (Home Page)',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', title: 'Judul Utama', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Subjudul', type: 'text' }),
    defineField({ name: 'ctaText', title: 'Teks Tombol Pendaftaran', type: 'string' }),
    defineField({ name: 'whatsappNumber', title: 'Nomor WhatsApp Admin', type: 'string' }),
    defineField({ name: 'whatsappMessage', title: 'Pesan Otomatis WA', type: 'text' }),
    defineField({ name: 'heroImage', title: 'Gambar Latar (Hero)', type: 'image', options: { hotspot: true } }),
  ]
})

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Tentang Sekolah',
  type: 'document',
  fields: [
    defineField({ name: 'profileTitle', title: 'Judul Profil', type: 'string' }),
    defineField({ name: 'profileDescription', title: 'Deskripsi Profil', type: 'text' }),
    defineField({ name: 'profileImage', title: 'Gambar Utama Profil', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'history', title: 'Sejarah Sekolah', type: 'text' }),
    defineField({ name: 'vision', title: 'Visi Sekolah', type: 'text' }),
    defineField({ name: 'missions', title: 'Misi Sekolah', type: 'array', of: [{type: 'string'}] }),
  ]
})

export const facility = defineType({
  name: 'facility',
  title: 'Fasilitas Sekolah',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nama Fasilitas', type: 'string' }),
    defineField({ name: 'description', title: 'Deskripsi Fasilitas', type: 'text' }),
    defineField({ name: 'image', title: 'Foto Fasilitas', type: 'image', options: { hotspot: true } }),
  ]
})

export const program = defineType({
  name: 'program',
  title: 'Program Belajar & Ekstrakurikuler',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Nama Program', type: 'string' }),
    defineField({ name: 'category', title: 'Kategori', type: 'string', options: { list: ['playgroup', 'tka', 'tkb', 'ekskul'] } }),
    defineField({ name: 'ageTarget', title: 'Target Usia', type: 'string' }),
    defineField({ name: 'time', title: 'Waktu Belajar', type: 'string' }),
    defineField({ name: 'description', title: 'Penjelasan Program', type: 'text' }),
    defineField({ name: 'materials', title: 'Materi Pembelajaran', type: 'array', of: [{type: 'string'}] }),
    defineField({ name: 'image', title: 'Gambar Pendukung', type: 'image', options: { hotspot: true } }),
  ]
})

export const teacher = defineType({
  name: 'teacher',
  title: 'Guru & Staf',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nama Lengkap', type: 'string' }),
    defineField({ name: 'nip', title: 'NIP / NUPTK', type: 'string' }),
    defineField({ name: 'role', title: 'Jabatan', type: 'string' }),
    defineField({ name: 'message', title: 'Kata Sambutan', type: 'text' }),
    defineField({ name: 'image', title: 'Pas Foto', type: 'image', options: { hotspot: true } }),
  ]
})

export const achievement = defineType({
  name: 'achievement',
  title: 'Prestasi',
  type: 'document',
  fields: [
    defineField({ name: 'studentName', title: 'Nama Siswa', type: 'string' }),
    defineField({ name: 'title', title: 'Nama Penghargaan / Lomba', type: 'string' }),
    defineField({ name: 'level', title: 'Tingkat', type: 'string', options: { list: ['Sekolah', 'Kecamatan', 'Kabupaten/Kota', 'Provinsi', 'Nasional'] } }),
    defineField({ name: 'year', title: 'Tahun', type: 'string' }),
    defineField({ name: 'image', title: 'Foto Prestasi', type: 'image', options: { hotspot: true } }),
  ]
})

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Informasi Kontak',
  type: 'document',
  fields: [
    defineField({ name: 'email', title: 'Email Sekolah', type: 'string' }),
    defineField({ name: 'phone', title: 'Telepon Alternatif', type: 'string' }),
    defineField({ name: 'address', title: 'Alamat Lengkap', type: 'text' }),
    defineField({ name: 'mapsIframe', title: 'Link Iframe Google Maps', type: 'text' }),
    defineField({ name: 'instagramUrl', title: 'Link Instagram', type: 'url' }),
    defineField({ name: 'facebookUrl', title: 'Link Facebook', type: 'url' }),
  ]
})

export const news = defineType({
  name: 'news',
  title: 'Berita & Pengumuman',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Judul', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'} }),
    defineField({ name: 'category', title: 'Kategori', type: 'string', options: { list: ['Berita', 'Pengumuman', 'Kegiatan'] } }),
    defineField({ name: 'date', title: 'Tanggal', type: 'date' }),
    defineField({ name: 'excerpt', title: 'Ringkasan', type: 'text' }),
    defineField({ name: 'content', title: 'Konten', type: 'array', of: [{type: 'block'}] }),
    defineField({ name: 'image', title: 'Gambar Utama', type: 'image', options: { hotspot: true } }),
  ]
})

export const schemaTypes = [homePage, aboutPage, facility, program, teacher, achievement, contactPage, news]