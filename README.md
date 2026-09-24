# Web Profil dan Admin TK

Aplikasi Next.js dengan MySQL/Prisma untuk mengelola seluruh konten dinamis website sekolah. Deployment produksi ditujukan untuk Windows dengan XAMPP, Node.js, dan penyimpanan upload lokal.

## Persiapan produksi

1. Pasang Node.js LTS dan jalankan MySQL dari XAMPP.
2. Salin `.env.example` menjadi `.env`, lalu isi `DATABASE_URL`, URL produksi pada `NEXTAUTH_URL`, dan secret acak minimal 32 karakter pada `NEXTAUTH_SECRET`.
3. Pastikan akun Windows yang menjalankan aplikasi memiliki izin baca/tulis ke `public\uploads`.
4. Jalankan:

```powershell
npm ci
npm run env:check
npx prisma migrate deploy
npm run build
npm run health
npm start
```

Seed hanya untuk instalasi awal dan tidak dijalankan saat startup:

```powershell
npm run db:seed
```

Pasang HTTPS di Apache/reverse proxy dan arahkan trafik ke port aplikasi Node. Nilai `NEXTAUTH_URL` harus sama dengan URL HTTPS publik.

## Start dan restart

Untuk pengelolaan proses, gunakan service manager Windows atau PM2. Perintah aplikasi tetap `npm start`. Saat merilis versi baru: backup, hentikan proses, `npm ci`, `npx prisma migrate deploy`, `npm run build`, lalu mulai ulang dan jalankan `npm run health`.

## Backup

Backup selalu menyimpan dump MySQL dan arsip upload dalam folder bertanggal yang sama:

```powershell
npm run backup
```

Hasil berada di `backups\YYYYMMDD-HHmmss\` dan tidak menimpa backup lama. Salin folder tersebut ke media lain; backup database tanpa upload tidak dianggap lengkap.

## Restore

Hentikan aplikasi terlebih dahulu. Restore bersifat destruktif dan hanya menerima folder di dalam `backups`:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\restore.ps1 `
  -BackupDirectory .\backups\YYYYMMDD-HHmmss `
  -ConfirmRestore
npm run health
```

Mulai ulang aplikasi dan periksa gambar serta data admin. Jangan menjalankan restore saat ada pengelola yang sedang mengubah konten.

## Rollback rilis

1. Hentikan aplikasi dan simpan backup kondisi terkini.
2. Kembalikan kode ke versi rilis sebelumnya.
3. Jika migrasi baru mengubah data secara tidak kompatibel, restore pasangan dump SQL dan upload dari backup pra-rilis.
4. Jalankan `npm ci`, `npx prisma generate`, `npm run build`, `npm run health`, lalu mulai ulang.

Prisma tidak otomatis menurunkan versi skema. Karena itu rollback database dilakukan dari backup, bukan dengan `migrate reset`.

## Pemeriksaan rilis

```powershell
npm run lint
npx tsc --noEmit
npm run build
npx prisma migrate status
npm run health
```

Lanjutkan dengan smoke test halaman publik, login admin, semua menu admin, upload/ganti/hapus gambar, dan penghapusan data dengan tombol batal maupun setuju.
