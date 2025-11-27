# Rencana Implementasi "Informasi Habit Mahasiswa Sehat"

## Tumpukan Teknologi
- **Frontend**: React + TypeScript + Vite, React Router, CSS Modules sederhana.
- **PWA**: Manifest kustom, service worker manual untuk cache aset statis + fallback offline sederhana.
- **Backend/API**: Node.js + Express dengan data dummy in-memory agar mudah disesuaikan nanti.

## Struktur Folder
```
/.github
/api              -> server Express
/frontend         -> aplikasi React PWA
  src/
    api/         -> helper fetch
    components/  -> BottomNav, Layout, Card, Calendar, dsb
    pages/       -> Beranda, Profil, Makanan, Minuman, Olahraga, Ibadah, Detail generik
    data/        -> tipe TypeScript
    hooks/       -> useFetch/useProfileForm
    assets/      -> ikon lokal
    styles/      -> util gaya
  public/
    manifest.webmanifest
    sw.js
```

## Routing Frontend
- `/` → Beranda/Dashboard
- `/profil` → Profil
- `/makanan` → List makanan, detail `/makanan/:id`
- `/minuman` → List minuman, detail `/minuman/:id`
- `/olahraga` → List olahraga, detail `/olahraga/:id`
- `/ibadah` → Katalog agama (opsional detail `/ibadah/:id`)

## Komponen Inti
- `AppLayout` → header singkat + konten + BottomNavigation.
- `BottomNavigation` → ikon + label, highlight tab aktif.
- `HabitSummaryCard`, `ChecklistTable`, `CalendarHeatmap`, `RecommendationCard`.
- `CatalogGrid` → reusable untuk makanan/minuman/olahraga/ibadah.
- `DetailSheet` → info detail dari list.
- `ProfileForm` → edit profil (modal atau inline section toggle edit mode).

## State & API Integrasi
- `useApi` helper memusatkan base URL (`http://localhost:4000`).
- Context ringan `AppDataContext` men-cache profile & dashboard agar tidak fetch berulang.
- Data list detail fetch on demand; optimisasi via simple cache map di hook.
- Untuk katalog makanan, minuman, olahraga, dan motivasi, backend sekarang menarik data dari Supabase (`healthy_foods`, `healthy_drinks`, `healthy_exercises`, `student_motivations`) sehingga `.env` perlu memuat `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, dan nama tabel opsional bila berbeda.

## API Endpoint (Express)
- `GET /api/profile`
- `PUT /api/profile`
- `GET /api/dashboard/today`
- `GET /api/dashboard/calendar`
- `POST /api/dashboard/checkin`
- `GET /api/foods` + `/:id` (Supabase `healthy_foods`)
- `GET /api/drinks` + `/:id` (Supabase `healthy_drinks`)
- `GET /api/sports` + `/:id` (Supabase `healthy_exercises`)
- `GET /api/motivations` + `/:id` (Supabase `student_motivations`)
- `GET /api/worships` + `/:id`

Profil, dashboard, dan ibadah masih dummy lokal; katalog makanan/minuman/olahraga/motivasi sudah bersumber dari Supabase.

## PWA Strategi
- Manifest dengan ikon placeholder.
- Service worker sederhana cache assets (`app-shell`) + data fallback.
- Prompt instalasi native (browser) dibiarkan default; hanya perlu file agar Add to Home Screen aktif.

## Langkah Implementasi
1. Siapkan server Express dengan data dummy (module terpisah `api`).
2. Tambah manifest + service worker ke Vite; register di frontend.
3. Implementasi layout + navigasi + routing.
4. Bangun halaman dan detail sesuai kebutuhan, gunakan Bahasa Indonesia.
5. Sambungkan ke API + tambahkan state/context.
6. Uji lint/build + perbarui README dan instruksi repo.
