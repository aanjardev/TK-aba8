import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { DEFAULT_HOME_HERO } from "../lib/home-hero";
import { DEFAULT_REGISTRATION_SETTINGS } from "../lib/registration-settings";
import { DEFAULT_CURRICULUM } from "../lib/academics";
import { DEFAULT_VISION_MISSION } from "../lib/vision-mission";
import { DEFAULT_SCHOOL_CONTACT } from "../lib/school-contact";
import {
  DEFAULT_PROFILE,
  DEFAULT_HISTORY,
  DEFAULT_FACILITIES,
} from "../lib/school-about";

const prisma = new PrismaClient();

const initialNews = [
  {
    title: "Semarak Peringatan Hari Kemerdekaan di TK ABA 8 Kepanjen",
    slug: "semarak-hari-kemerdekaan-tk-aba-8",
    category: "Kegiatan",
    excerpt:
      "Siswa TK ABA 8 Kepanjen mengikuti beragam permainan dan kegiatan edukatif untuk memeriahkan Hari Kemerdekaan Indonesia.",
    content: `## Belajar mencintai Indonesia sejak dini

TK ABA 8 Kepanjen menyelenggarakan rangkaian kegiatan untuk memperingati Hari Kemerdekaan Republik Indonesia. Seluruh siswa mengikuti acara dengan antusias dan mengenakan pakaian bernuansa merah putih.

Kegiatan dirancang agar menyenangkan sekaligus membantu perkembangan motorik, keberanian, dan kemampuan bekerja sama anak.

### Kegiatan yang dilaksanakan

- Permainan memindahkan bendera
- Lomba keseimbangan sederhana
- Menyanyikan lagu nasional bersama
- Mendengarkan cerita perjuangan pahlawan

Terima kasih kepada para guru dan orang tua yang telah mendukung kegiatan ini. Semoga semangat kebersamaan dan cinta tanah air terus tumbuh dalam diri anak-anak.`,
    image: "/images/hero-sekolah.png",
    imageAlt: "Anak-anak TK ABA 8 bermain bersama di halaman sekolah",
    author: "Tim Humas TK ABA 8",
    isFeatured: true,
    publishedAt: new Date("2026-09-01T08:00:00+07:00"),
  },
  {
    title: "Kegiatan Manasik Haji Melatih Kemandirian dan Nilai Islami",
    slug: "kegiatan-manasik-haji-siswa-tk-aba-8",
    category: "Keislaman",
    excerpt:
      "Anak-anak mengenal rangkaian ibadah haji melalui kegiatan manasik yang interaktif, sederhana, dan sesuai usia mereka.",
    content: `## Mengenal ibadah haji melalui pengalaman langsung

Siswa mengikuti simulasi manasik haji dengan pendampingan para guru. Anak-anak diperkenalkan pada ihram, tawaf, sa'i, wukuf, dan melempar jumrah menggunakan bahasa yang mudah dipahami.

Kegiatan ini tidak hanya mengenalkan rukun Islam, tetapi juga melatih kedisiplinan, kesabaran, dan kebersamaan.

Para siswa terlihat gembira saat mengikuti setiap tahapan. Pembelajaran melalui praktik seperti ini membantu anak mengingat nilai dan pengalaman dengan lebih baik.`,
    image: null,
    imageAlt: null,
    author: "Tim Guru TK ABA 8",
    isFeatured: false,
    publishedAt: new Date("2026-08-25T09:00:00+07:00"),
  },
  {
    title: "Belajar Kreatif melalui Kegiatan Melukis Bersama",
    slug: "belajar-kreatif-melalui-kegiatan-melukis",
    category: "Pembelajaran",
    excerpt:
      "Kegiatan melukis menjadi ruang bagi siswa untuk mengekspresikan imajinasi sekaligus mengenal warna dan bentuk.",
    content: `## Warna, imajinasi, dan rasa percaya diri

Kegiatan melukis bersama dilaksanakan sebagai bagian dari pembelajaran tematik. Anak-anak bebas memilih warna dan menuangkan gagasan mereka pada media gambar yang telah disiapkan.

Guru mendampingi tanpa membatasi kreativitas sehingga setiap karya memiliki cerita dan ciri khas masing-masing.

Melalui kegiatan ini siswa belajar:

- Mengenali dan memadukan warna
- Melatih koordinasi tangan dan mata
- Menyampaikan cerita tentang hasil karya
- Menghargai karya teman

Seluruh hasil lukisan kemudian dipajang di kelas sebagai bentuk apresiasi atas usaha anak-anak.`,
    image: null,
    imageAlt: null,
    author: "Tim Guru TK ABA 8",
    isFeatured: false,
    publishedAt: new Date("2026-08-18T08:30:00+07:00"),
  },
  {
    title: "Pemeriksaan Kesehatan Rutin untuk Siswa TK ABA 8",
    slug: "pemeriksaan-kesehatan-rutin-siswa",
    category: "Kesehatan",
    excerpt:
      "Sekolah melaksanakan pemeriksaan kesehatan rutin sebagai upaya memantau tumbuh kembang dan kesehatan siswa.",
    content: `## Menjaga kesehatan untuk mendukung proses belajar

TK ABA 8 Kepanjen bekerja sama dengan tenaga kesehatan setempat untuk melakukan pemeriksaan rutin kepada seluruh siswa.

Pemeriksaan meliputi pengukuran tinggi dan berat badan, kesehatan gigi, kebersihan kuku, serta pemeriksaan umum sederhana. Hasil pemeriksaan dicatat dan disampaikan kepada orang tua sebagai bahan pemantauan bersama.

Guru juga mengajak anak mempraktikkan cara mencuci tangan dan merawat gigi dengan benar. Kebiasaan hidup bersih diperkenalkan melalui kegiatan yang ringan dan menyenangkan.`,
    image: null,
    imageAlt: null,
    author: "Tim Humas TK ABA 8",
    isFeatured: false,
    publishedAt: new Date("2026-08-11T10:00:00+07:00"),
  },
  {
    title: "Pertemuan Orang Tua dan Guru Awal Tahun Ajaran",
    slug: "pertemuan-orang-tua-dan-guru-awal-tahun",
    category: "Pengumuman",
    excerpt:
      "Pertemuan awal tahun memperkuat komunikasi dan kerja sama antara sekolah dengan orang tua dalam mendampingi perkembangan anak.",
    content: `## Kolaborasi sekolah dan keluarga

Pertemuan orang tua dan guru menjadi langkah awal untuk menyamakan pemahaman mengenai program pembelajaran selama satu tahun ajaran.

Dalam pertemuan ini sekolah menyampaikan jadwal kegiatan, kebiasaan belajar, tata tertib, serta cara pemantauan perkembangan siswa. Orang tua juga memperoleh kesempatan untuk berdiskusi dan menyampaikan pertanyaan kepada wali kelas.

Kami percaya perkembangan anak akan berjalan lebih optimal ketika sekolah dan keluarga membangun komunikasi yang terbuka, hangat, dan konsisten. Terima kasih atas kehadiran serta dukungan seluruh orang tua siswa.`,
    image: null,
    imageAlt: null,
    author: "Kepala TK ABA 8",
    isFeatured: false,
    publishedAt: new Date("2026-08-04T08:00:00+07:00"),
  },
];

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@tkaba8.com" },
    update: {},
    create: {
      email: "admin@tkaba8.com",
      password: hashedPassword,
      name: "Admin Utama",
    },
  });

  console.log("Admin user created/updated:", admin.email);

  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      schoolName: "TK Aisyiyah Bustanul Athfal 8 Kepanjen",
      shortName: "TK ABA 8 Kepanjen",
      longName: "Taman Kanak-kanak ‘Aisyiyah Bustanul Athfal",
    },
  });

  await prisma.staff.createMany({
    data: [
      {
        id: "staff-principal",
        name: "Hj. Siti Aminah, S.Pd.",
        category: "PRINCIPAL",
        position: "Kepala Sekolah TK ABA 8 Kepanjen",
        sortOrder: 1,
      },
      {
        id: "staff-teacher-a",
        name: "Nurmala Sari, S.Pd.I",
        category: "TEACHER",
        position: "Wali Kelas TK A",
        sortOrder: 2,
      },
      {
        id: "staff-teacher-b1",
        name: "Aisyah Putri, S.Psi",
        category: "TEACHER",
        position: "Wali Kelas TK B1",
        sortOrder: 3,
      },
      {
        id: "staff-teacher-assistant",
        name: "Rini Astuti, S.Pd.",
        category: "TEACHER",
        position: "Guru Pendamping",
        sortOrder: 4,
      },
      {
        id: "staff-administration",
        name: "Bapak Supriyadi",
        category: "STAFF",
        position: "Tata Usaha / Administrasi",
        sortOrder: 5,
      },
    ],
    skipDuplicates: true,
  });
  console.log("Data awal guru dan staf tersedia.");

  const hero = DEFAULT_HOME_HERO;
  const stats = JSON.stringify(hero.stats);
  const features = JSON.stringify(hero.features);

  // INSERT IGNORE membuat seed aman dijalankan berulang dan tidak menimpa
  // perubahan konten yang sudah dilakukan admin.
  await prisma.$executeRaw`
    INSERT IGNORE INTO HomeHero (
      id, headlineTop, headlineHighlight, headlineBottom, description,
      primaryLabel, primaryUrl, secondaryLabel, secondaryUrl, backgroundImage,
      stats, features, createdAt, updatedAt
    ) VALUES (
      'main', ${hero.headlineTop}, ${hero.headlineHighlight}, ${hero.headlineBottom}, ${hero.description},
      ${hero.primaryLabel}, ${hero.primaryUrl}, ${hero.secondaryLabel}, ${hero.secondaryUrl}, ${hero.backgroundImage},
      ${stats}, ${features}, NOW(3), NOW(3)
    )
  `;

  console.log("Data awal hero beranda tersedia.");

  const registration = DEFAULT_REGISTRATION_SETTINGS;
  await prisma.$executeRaw`
    INSERT IGNORE INTO RegistrationSettings (
      id, isOpen, showHomeSection, academicYear, currentWave, quota,
      promoTitle, promoDescription, ctaLabel, ctaDestination, whatsappNumber,
      requirements, steps, fees, feeNote, bankName, bankAccount, bankHolder,
      brochureFile, registrationFormFile, createdAt, updatedAt
    ) VALUES (
      'main', ${registration.isOpen}, ${registration.showHomeSection}, ${registration.academicYear},
      ${registration.currentWave}, ${registration.quota}, ${registration.promoTitle}, ${registration.promoDescription},
      ${registration.ctaLabel}, ${registration.ctaDestination}, ${registration.whatsappNumber},
      ${JSON.stringify(registration.requirements)}, ${JSON.stringify(registration.steps)}, ${JSON.stringify(registration.fees)},
      ${registration.feeNote}, ${registration.bankName}, ${registration.bankAccount}, ${registration.bankHolder},
      NULL, NULL, NOW(3), NOW(3)
    )
  `;

  console.log("Data awal informasi PPDB tersedia.");

  const visionMission = DEFAULT_VISION_MISSION;
  await prisma.$executeRaw`INSERT IGNORE INTO VisionMissionSettings (id,pageTitle,introduction,visionTitle,visionDescription,visionPoints,missions,goals,createdAt,updatedAt) VALUES ('main',${visionMission.pageTitle},${visionMission.introduction},${visionMission.visionTitle},${visionMission.visionDescription},${JSON.stringify(visionMission.visionPoints)},${JSON.stringify(visionMission.missions)},${JSON.stringify(visionMission.goals)},NOW(3),NOW(3))`;
  console.log("Data awal visi, misi, dan tujuan tersedia.");

  const contact = DEFAULT_SCHOOL_CONTACT;
  await prisma.$executeRaw`INSERT IGNORE INTO SchoolContact(id,sectionTitle,sectionDescription,address,district,regency,postalCode,phone,whatsapp,email,serviceHours,mapEmbedUrl,mapDirectionsUrl,whatsappDefaultMessage,createdAt,updatedAt) VALUES('main',${contact.sectionTitle},${contact.sectionDescription},${contact.address},${contact.district},${contact.regency},${contact.postalCode},${contact.phone},${contact.whatsapp},${contact.email},${contact.serviceHours},${contact.mapEmbedUrl},${contact.mapDirectionsUrl},${contact.whatsappDefaultMessage},NOW(3),NOW(3))`;
  console.log("Data awal kontak dan lokasi sekolah tersedia.");

  const profile = DEFAULT_PROFILE;
  await prisma.$executeRaw`INSERT IGNORE INTO SchoolProfile(id,pageTitle,introduction,principalName,principalPhoto,welcomeMessage,npsn,accreditation,foundedYear,operationalPermit,permitIssuer,createdAt,updatedAt) VALUES('main',${profile.pageTitle},${profile.introduction},${profile.principalName},NULL,${profile.welcomeMessage},${profile.npsn},${profile.accreditation},${profile.foundedYear},${profile.operationalPermit},${profile.permitIssuer},NOW(3),NOW(3))`;
  const history = DEFAULT_HISTORY;
  await prisma.$executeRaw`INSERT IGNORE INTO SchoolHistory(id,pageTitle,introduction,storyTitle,story,image,milestones,createdAt,updatedAt) VALUES('main',${history.pageTitle},${history.introduction},${history.storyTitle},${history.story},NULL,${JSON.stringify(history.milestones)},NOW(3),NOW(3))`;
  const facilities = DEFAULT_FACILITIES;
  await prisma.$executeRaw`INSERT IGNORE INTO FacilitySettings(id,pageTitle,introduction,facilities,createdAt,updatedAt) VALUES('main',${facilities.pageTitle},${facilities.introduction},${JSON.stringify(facilities.facilities)},NOW(3),NOW(3))`;
  console.log("Data awal profil, sejarah, dan fasilitas tersedia.");

  const curriculum = DEFAULT_CURRICULUM;
  await prisma.$executeRaw`INSERT IGNORE INTO CurriculumSettings (id, title, introduction, approachTitle, approachDescription, image, methods, schedule, createdAt, updatedAt) VALUES ('main', ${curriculum.title}, ${curriculum.introduction}, ${curriculum.approachTitle}, ${curriculum.approachDescription}, NULL, ${JSON.stringify(curriculum.methods)}, ${JSON.stringify(curriculum.schedule)}, NOW(3), NOW(3))`;

  const programs = [
    {
      id: "program-playgroup",
      slug: "playgroup",
      title: "Kelompok Bermain (Playgroup)",
      eyebrow: "Fondasi Tumbuh Kembang",
      description:
        "Program transisi dari lingkungan rumah ke sekolah yang berfokus pada stimulasi motorik, sosial, bahasa, dan kemandirian melalui permainan menyenangkan.",
      age: "3–4 Tahun",
      schedule: "Senin–Kamis, 07:30–10:00",
      capacity: "15 Anak / Kelas",
      ratio: "1 Guru : 7 Anak",
      featured: true,
      order: 1,
      highlights: [
        "Pengenalan rutinitas dan kemandirian dasar",
        "Stimulasi motorik kasar dan halus",
        "Belajar berbagi, mengantre, dan bermain bersama",
        "Pengenalan bahasa dan angka melalui lagu",
      ],
    },
    {
      id: "program-tk-a",
      slug: "tk-a",
      title: "Taman Kanak-Kanak A",
      eyebrow: "Eksplorasi & Kemandirian",
      description:
        "Pembelajaran untuk membangun kemandirian, kemampuan komunikasi, pra-literasi, numerasi awal, kreativitas, dan pembiasaan ibadah.",
      age: "4–5 Tahun",
      schedule: "Senin–Jumat, 07:30–10:30",
      capacity: "20 Anak / Kelas",
      ratio: "1 Guru : 10 Anak",
      featured: true,
      order: 2,
      highlights: [
        "Pembentukan karakter mandiri dan bertanggung jawab",
        "Keaksaraan awal melalui kegiatan bermain",
        "Hafalan doa, surah pendek, dan praktik ibadah",
        "Pengembangan kreativitas melalui seni dan musik",
      ],
    },
    {
      id: "program-tk-b",
      slug: "tk-b",
      title: "Taman Kanak-Kanak B",
      eyebrow: "Kesiapan Memasuki SD",
      description:
        "Program pematangan kesiapan sekolah dasar melalui literasi dasar, logika matematika, kematangan sosial emosional, dan proyek kolaboratif.",
      age: "5–6 Tahun",
      schedule: "Senin–Jumat, 07:30–11:00",
      capacity: "20 Anak / Kelas",
      ratio: "1 Guru : 10 Anak",
      featured: true,
      order: 3,
      highlights: [
        "Kesiapan literasi dan numerasi dasar",
        "Peningkatan percaya diri melalui presentasi kelas",
        "Penyempurnaan praktik ibadah",
        "Proyek kolaborasi dalam kelompok kecil",
      ],
    },
    {
      id: "program-ekstrakurikuler",
      slug: "ekstrakurikuler",
      title: "Kegiatan Ekstrakurikuler",
      eyebrow: "Pengembangan Minat & Bakat",
      description:
        "Wadah eksplorasi minat dan bakat anak melalui kegiatan seni, olahraga, musik, dan keterampilan yang dibimbing secara menyenangkan.",
      age: "TK A & TK B",
      schedule: "Jadwal Menyesuaikan",
      capacity: "Sesuai Peminatan",
      ratio: "Sesuai Kegiatan",
      featured: false,
      order: 4,
      highlights: [
        "Seni tari daerah",
        "Mewarnai dan menggambar",
        "Drumband cilik",
        "Renang dan stimulasi fisik",
      ],
    },
  ];
  for (const program of programs)
    await prisma.$executeRaw`INSERT IGNORE INTO EducationProgram (id, slug, title, eyebrow, description, age, schedule, capacity, teacherRatio, highlights, image, isActive, isFeatured, sortOrder, createdAt, updatedAt) VALUES (${program.id}, ${program.slug}, ${program.title}, ${program.eyebrow}, ${program.description}, ${program.age}, ${program.schedule}, ${program.capacity}, ${program.ratio}, ${JSON.stringify(program.highlights)}, NULL, true, ${program.featured}, ${program.order}, NOW(3), NOW(3))`;
  console.log("Data awal kurikulum dan 4 program pendidikan tersedia.");

  const achievements = [
    {
      id: "achievement-porseni-2026",
      title: "Juara Umum Porseni PAUD Terpadu",
      recipient: "Kontingen TK ABA 8 Kepanjen",
      category: "Prestasi Sekolah",
      level: "Kabupaten",
      year: 2026,
      description:
        "Kontingen sekolah meraih juara umum melalui pencapaian pada cabang seni, ketangkasan, dan hafalan Al-Qur’an.",
      featured: true,
      order: 1,
    },
    {
      id: "achievement-coloring-2026",
      title: "Juara 1 Lomba Mewarnai PAUD",
      recipient: "Aisha Maharani – TK B",
      category: "Prestasi Siswa",
      level: "Kabupaten",
      year: 2026,
      description:
        "Prestasi diraih melalui karya yang menunjukkan kreativitas, keberanian memilih warna, dan ketelitian yang sangat baik.",
      featured: true,
      order: 2,
    },
    {
      id: "achievement-teacher-2025",
      title: "Guru PAUD Inovatif & Berdedikasi",
      recipient: "Ibu Nurmala Sari, S.Pd.AUD",
      category: "Prestasi Guru",
      level: "Kabupaten",
      year: 2025,
      description:
        "Penghargaan atas pengembangan media pembelajaran interaktif berbasis bahan bekas untuk kegiatan sentra alam.",
      featured: true,
      order: 3,
    },
    {
      id: "achievement-friendly-school-2025",
      title: "Sekolah Ramah Anak Terbaik",
      recipient: "TK ABA 8 Kepanjen",
      category: "Prestasi Sekolah",
      level: "Kabupaten",
      year: 2025,
      description:
        "Apresiasi atas komitmen sekolah dalam menciptakan lingkungan belajar yang aman, inklusif, nyaman, dan bebas perundungan.",
      featured: false,
      order: 4,
    },
    {
      id: "achievement-quran-2024",
      title: "Juara Harapan 1 Hafalan Surah Pendek",
      recipient: "Rasyid Akbar – TK B",
      category: "Prestasi Siswa",
      level: "Kecamatan",
      year: 2024,
      description:
        "Ananda Rasyid menunjukkan kefasihan dan keberanian dalam kompetisi hafalan surah pendek tingkat PAUD.",
      featured: false,
      order: 5,
    },
    {
      id: "achievement-dance-2024",
      title: "Juara 1 Lomba Tari Kreasi Daerah",
      recipient: "Tim Tari TK ABA 8",
      category: "Prestasi Siswa",
      level: "Kabupaten",
      year: 2024,
      description:
        "Tim tari menampilkan kreasi nusantara dengan kekompakan, ekspresi, dan kepercayaan diri yang membanggakan.",
      featured: false,
      order: 6,
    },
    {
      id: "achievement-accreditation-2023",
      title: "Akreditasi A (Sangat Baik)",
      recipient: "TK ABA 8 Kepanjen",
      category: "Prestasi Sekolah",
      level: "Nasional",
      year: 2023,
      description:
        "Pengakuan resmi atas mutu kurikulum, layanan peserta didik, fasilitas, dan manajemen sekolah yang konsisten.",
      featured: false,
      order: 7,
    },
  ];
  for (const item of achievements)
    await prisma.$executeRaw`INSERT IGNORE INTO Achievement(id,title,recipient,category,level,year,description,image,imageAlt,isActive,isFeatured,sortOrder,createdAt,updatedAt) VALUES(${item.id},${item.title},${item.recipient},${item.category},${item.level},${item.year},${item.description},NULL,NULL,true,${item.featured},${item.order},NOW(3),NOW(3))`;
  console.log("7 data awal prestasi tersedia.");

  for (const news of initialNews) {
    await prisma.news.upsert({
      where: { slug: news.slug },
      update: {},
      create: {
        ...news,
        status: "PUBLISHED",
      },
    });
  }

  console.log(`${initialNews.length} berita awal tersedia.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
