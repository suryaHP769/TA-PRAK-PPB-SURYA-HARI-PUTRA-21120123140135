# Informasi Habit Mahasiswa Sehat (Frontend)

Aplikasi PWA berbasis React + TypeScript + Vite untuk membantu mahasiswa menjaga kebiasaan sehat. Seluruh UI menggunakan Bahasa Indonesia dan memuat enam halaman utama: Beranda, Profil, Makanan Sehat, Minuman Sehat, Olahraga Sehat, dan Motivasi.

## Fitur
- Dashboard habit lengkap (streak, checklist, rekomendasi, kalender progres bulanan).
- Profil pengguna beserta mode edit yang sinkron dengan API.
- Katalog makanan, minuman, olahraga (list + detail) menggunakan data dari API lokal.
- Katalog motivasi harian berupa deskripsi singkat dan quotes penyemangat.
- Bottom navigation bar dengan ikon untuk berpindah halaman.
- PWA siap dipasang (manifest, ikon 192/512, service worker cache sederhana).

## Teknologi
- React 19 + TypeScript + Vite 7
- React Router 7
- Context API + custom hooks untuk data profil/dashboard
- Service worker kustom + Web App Manifest

## Menjalankan Proyek
### 1. Backend/API
```powershell
cd "d:\05. FILE TUGAS SURYA\season 5 FULL CALL ACTION\4. prak PPB\Informasi Habit sehat mahasiswa\api"
npm install   # jalankan sekali
npm run dev   # http://localhost:4100/api
```

### 2. Frontend
```powershell
cd "d:\05. FILE TUGAS SURYA\season 5 FULL CALL ACTION\4. prak PPB\Informasi Habit sehat mahasiswa\frontend"
npm install   # jalankan sekali
npm run dev   # http://localhost:5173 (pastikan API aktif)
```

### 3. Build produksi
```powershell
npm run build
npm run preview
```

## Pengaturan Penting
- Base URL API diset di `src/api/client.ts` (default `http://localhost:4100/api`) dan bisa diubah lewat env `VITE_API_URL`.
- Manifest PWA: `public/manifest.webmanifest`.
- Service worker: `public/sw.js`, diregistrasi melalui `src/pwa/register-sw.ts`.
- Style global berada di `src/styles/global.css` dan komponen di `src/styles/components.css`.

## Struktur Singkat
```
src/
  api/          # helper fetch
  components/   # AppLayout, BottomNavigation, FeedbackStates
  context/      # AppDataProvider
  hooks/        # useFetch
  pages/        # Dashboard, Profil, katalog + ibadah
  pwa/          # register service worker
  styles/       # global + komponen
```

## Checklist Tugas Kuliah
- [x] 6 halaman utama sesuai brief + detail list (makanan, minuman, olahraga, motivasi).
- [x] Bottom navigation dan UI Bahasa Indonesia.
- [x] API Node/Express buatan sendiri (folder `../api`).
- [x] PWA (manifest + service worker) sehingga bisa Add to Home Screen.
- [x] Responsif mobile-first.

Silakan sesuaikan konten dan copywriting untuk kebutuhan presentasi atau laporan akhir.
