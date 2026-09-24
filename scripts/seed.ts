import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import path from 'path';

// Muat variabel dari .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Harus ada untuk operasi WRITE
  useCdn: false,
});

async function seed() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ ERROR: SANITY_API_TOKEN belum diset di .env.local!');
    console.log('Silakan buat token di https://manage.sanity.io dengan akses Editor/Write.');
    process.exit(1);
  }

  console.log('⏳ Memulai seeding data ke Sanity...');

  try {
    // 1. Seed Home Page (Beranda)
    await client.createOrReplace({
      _id: 'homePageSingleton',
      _type: 'homePage',
      heroTitle: 'Membangun Generasi Cerdas & Berakhlak Mulia',
      heroSubtitle: 'TK ABA 8 Kepanjen hadir memberikan lingkungan belajar Islami yang menyenangkan untuk mengoptimalkan tumbuh kembang anak usia dini.',
      ctaText: 'Daftar Sekarang',
      whatsappNumber: '6281234567890',
      whatsappMessage: 'Halo Admin TK ABA 8, saya ingin bertanya mengenai informasi pendaftaran siswa baru.',
    });
    console.log('✅ Beranda tersimpan.');

    // 2. Seed About Page (Tentang)
    await client.createOrReplace({
      _id: 'aboutPageSingleton',
      _type: 'aboutPage',
      profileTitle: 'Mengenal Lebih Dekat TK ABA 8 Kepanjen',
      profileDescription: 'TK ABA 8 Kepanjen adalah lembaga pendidikan anak usia dini yang berdedikasi untuk menciptakan lingkungan belajar yang Islami, menyenangkan, dan mendukung perkembangan holistik anak.',
      history: 'Didirikan pada tahun 1990, TK ABA 8 Kepanjen telah menjadi pionir pendidikan anak usia dini di wilayah ini...',
      vision: 'Mewujudkan generasi anak usia dini yang cerdas, ceria, mandiri, dan berakhlak mulia berdasarkan nilai-nilai Islam.',
      missions: [
        'Menyelenggarakan pendidikan yang menyenangkan melalui pendekatan bermain sambil belajar.',
        'Menanamkan aqidah dan akhlak mulia sejak dini.',
        'Membangun kemandirian anak dalam kehidupan sehari-hari.'
      ],
    });
    console.log('✅ Tentang Sekolah tersimpan.');

    // 3. Seed Contact Page
    await client.createOrReplace({
      _id: 'contactPageSingleton',
      _type: 'contactPage',
      email: 'info@tkaba8kepanjen.sch.id',
      phone: '0341-1234567',
      address: 'Jl. Panji No.100, Penarukan, Kec. Kepanjen, Kabupaten Malang, Jawa Timur 65163',
      mapsIframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.598695029094!2d112.5693006!3d-8.1403487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e789fb713ed0a55%3A0xc3910540d9904ab7!2sTK%20Aisyiyah%20Bustanul%20Athfal%208%20Kepanjen!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
      instagramUrl: 'https://instagram.com/tkaba8kepanjen',
      facebookUrl: 'https://facebook.com/tkaba8kepanjen'
    });
    console.log('✅ Informasi Kontak tersimpan.');

    // 4. Seed Teacher
    await client.create({
      _type: 'teacher',
      name: 'Siti Aminah, S.Pd',
      nip: '198001012005012001',
      role: 'Kepala Sekolah',
      message: 'Selamat datang di TK ABA 8 Kepanjen.'
    });
    console.log('✅ Data Guru tersimpan.');

    // 5. Seed Program
    await client.create({
      _type: 'program',
      title: 'Playgroup (Kelompok Bermain)',
      category: 'playgroup',
      ageTarget: '3 - 4 Tahun',
      time: 'Senin - Kamis (07.30 - 10.00 WIB)',
      description: 'Program Kelompok Bermain ditujukan untuk anak usia 3-4 tahun...',
      materials: ['Pengenalan Huruf Hijaiyah', 'Doa Pendek', 'Motorik Kasar']
    });
    console.log('✅ Program Belajar tersimpan.');

    console.log('🎉 Seeding Selesai!');
  } catch (error) {
    console.error('❌ Gagal melakukan seeding:', error);
  }
}

seed();
