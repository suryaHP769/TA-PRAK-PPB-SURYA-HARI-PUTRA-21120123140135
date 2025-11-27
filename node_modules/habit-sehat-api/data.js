import { existsSync, readFileSync, writeFileSync } from 'node:fs'

const DATA_FILE = new URL('./data-store.json', import.meta.url)

const loadPersistedData = () => {
  if (!existsSync(DATA_FILE)) {
    return null
  }
  try {
    const parsed = JSON.parse(readFileSync(DATA_FILE, 'utf-8'))
    return parsed
  } catch (error) {
    console.error('Gagal memuat data tersimpan, menggunakan default.', error)
    return null
  }
}

const savePersistedData = (payload) => {
  try {
    writeFileSync(DATA_FILE, JSON.stringify(payload, null, 2), 'utf-8')
  } catch (error) {
    console.error('Gagal menyimpan data', error)
  }
}

const persistState = () => {
  savePersistedData({ calendarHistory, dashboardToday })
}

const persisted = loadPersistedData()

export let profile = {
  id: 1,
  nama: 'Surya Mahendra',
  umur: 21,
  jurusan: 'Teknik Informatika',
  agama: 'Islam',
  bio: 'Mahasiswa aktif yang sedang membangun habit sehat setiap hari.',
  avatar: 'https://i.pravatar.cc/150?img=12'
}

export const foods = [
  {
    id: 'f1',
    nama: 'Dada Ayam',
    deskripsiSingkat: 'Protein tanpa lemak favorit mahasiswa gym.',
    deskripsi: 'Dada ayam mudah diolah menjadi panggang, rebus, ataupun stir fry rendah minyak sehingga cocok sebagai sumber protein harian.',
    gambar: 'https://images.unsplash.com/photo-1475090169767-40ed8d18f67d'
  },
  {
    id: 'f2',
    nama: 'Brokoli',
    deskripsiSingkat: 'Sayuran hijau kaya vitamin C, kalsium, dan serat.',
    deskripsi: 'Satu mangkuk brokoli kukus membantu memenuhi kebutuhan serat sekaligus antioksidan penting untuk daya tahan tubuh.',
    gambar: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a'
  },
  {
    id: 'f3',
    nama: 'Bayam',
    deskripsiSingkat: 'Sumber zat besi nabati untuk energi belajar.',
    deskripsi: 'Bayam bisa disajikan sebagai sayur bening, smoothies, maupun tumisan singkat sehingga nutrisi tetap terjaga.',
    gambar: 'https://images.unsplash.com/photo-1522184216315-1bfa3bce0670'
  },
  {
    id: 'f4',
    nama: 'Wortel',
    deskripsiSingkat: 'Beta-karoten tinggi untuk kesehatan mata.',
    deskripsi: 'Wortel dapat diparut dalam salad, dijadikan jus, atau dimasak menjadi sup hangat yang menenangkan.',
    gambar: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443'
  },
  {
    id: 'f5',
    nama: 'Kubis',
    deskripsiSingkat: 'Sayuran crunchy dengan kalori sangat rendah.',
    deskripsi: 'Kubis cocok dijadikan lalapan, tumis ringan, atau campuran sup untuk menambah volume makanan tanpa menambah kalori besar.',
    gambar: 'https://images.unsplash.com/photo-1472145246862-b24cf25c4a36'
  },
  {
    id: 'f6',
    nama: 'Tomat',
    deskripsiSingkat: 'Lycopene tinggi untuk kesehatan kulit.',
    deskripsi: 'Tomat segar dapat dimakan langsung, dibuat jus, atau ditumis dengan telur untuk sarapan cepat kaya vitamin.',
    gambar: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6'
  },
  {
    id: 'f7',
    nama: 'Pisang',
    deskripsiSingkat: 'Elektrolit alami pasca olahraga.',
    deskripsi: 'Pisang matang memberi karbohidrat cepat serap dan kalium tinggi untuk mencegah kram otot setelah latihan.',
    gambar: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?ixid=banana'
  },
  {
    id: 'f8',
    nama: 'Apel',
    deskripsiSingkat: 'Snack tinggi serat pektin yang praktis.',
    deskripsi: 'Apel bisa langsung disantap, dijadikan infuse water, atau topping oatmeal agar kenyang lebih lama.',
    gambar: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixid=apple'
  },
  {
    id: 'f9',
    nama: 'Jeruk',
    deskripsiSingkat: 'Vitamin C untuk imun saat musim ujian.',
    deskripsi: 'Jeruk peras segar bisa jadi bekal pagi, sementara kulitnya bisa diseduh sebagai infused water aromatik.',
    gambar: 'https://images.unsplash.com/photo-1497534446932-c925b458314e'
  },
  {
    id: 'f10',
    nama: 'Alpukat',
    deskripsiSingkat: 'Lemak baik menjaga kenyang lebih lama.',
    deskripsi: 'Alpukat cocok dibuat toast, smoothies bowl, atau dijadikan dressing salad pengganti mayo tinggi lemak.',
    gambar: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixid=avocado'
  },
  {
    id: 'f11',
    nama: 'Pepaya',
    deskripsiSingkat: 'Enzim papain bantu pencernaan lancar.',
    deskripsi: 'Pepaya matang manis alami, bisa dicampur jeruk nipis dan chia seed sebagai sarapan ringan penuh serat.',
    gambar: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?ixid=papaya'
  },
  {
    id: 'f12',
    nama: 'Mangga',
    deskripsiSingkat: 'Buah tropis kaya vitamin A & C.',
    deskripsi: 'Mangga cocok dijadikan smoothies, salad, atau topping yogurt untuk memenuhi kebutuhan antioksidan harian.',
    gambar: 'https://images.unsplash.com/photo-1481391032119-d89fee407e44?ixid=mango'
  },
  {
    id: 'f13',
    nama: 'Semangka',
    deskripsiSingkat: 'Hidrasi alami dengan kalori sangat rendah.',
    deskripsi: 'Semangka mengandung likopen dan citrulline yang membantu mengurangi rasa lelah setelah aktivitas berat.',
    gambar: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?ixid=watermelon'
  },
  {
    id: 'f14',
    nama: 'Melon',
    deskripsiSingkat: 'Buah manis lembut kaya elektrolit.',
    deskripsi: 'Melon cocok dikreasikan sebagai sop buah sehat atau dicampur yogurt low fat untuk dessert malam hari.',
    gambar: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixid=melon'
  },
  {
    id: 'f15',
    nama: 'Blueberry',
    deskripsiSingkat: 'Superfood mini tinggi antioksidan.',
    deskripsi: 'Blueberry membantu melawan radikal bebas; campurkan pada overnight oats atau greek yogurt.',
    gambar: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixid=blueberry'
  },
  {
    id: 'f16',
    nama: 'Anggur',
    deskripsiSingkat: 'Mengandung resveratrol untuk kesehatan jantung.',
    deskripsi: 'Anggur merah cocok jadi camilan saat belajar atau dijadikan infused water dingin yang menyegarkan.',
    gambar: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?ixid=grape'
  },
  {
    id: 'f17',
    nama: 'Timun',
    deskripsiSingkat: 'Sayur kaya air untuk detox tubuh.',
    deskripsi: 'Timun bisa disantap sebagai lalapan, dijadikan acar simpel, atau dicampur perasan lemon untuk infused water.',
    gambar: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixid=cucumber'
  },
  {
    id: 'f18',
    nama: 'Selada',
    deskripsiSingkat: 'Basis utama salad rendah kalori.',
    deskripsi: 'Selada romaine renyah cocok dipadukan dengan dada ayam panggang untuk makan siang ala cafe dengan budget hemat.',
    gambar: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?ixid=lettuce'
  },
  {
    id: 'f19',
    nama: 'Buncis',
    deskripsiSingkat: 'Sayur hijau kaya protein nabati.',
    deskripsi: 'Buncis lezat ditumis bawang putih atau direbus singkat sebagai topping mie instan biar lebih bernutrisi.',
    gambar: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=beans'
  },
  {
    id: 'f20',
    nama: 'Kangkung',
    deskripsiSingkat: 'Sayur lokal murah kaya magnesium.',
    deskripsi: 'Kangkung tumis bawang putih atau cah tauco jadi menu praktis untuk menemani nasi hangat di kos.',
    gambar: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c'
  },
  {
    id: 'f21',
    nama: 'Paprika',
    deskripsiSingkat: 'Rasa manis segar dengan vitamin C dua kali jeruk.',
    deskripsi: 'Paprika merah cantik untuk tumisan, salad, atau topping pizza rumahan karena memberi warna sekaligus nutrisi.',
    gambar: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc'
  },
  {
    id: 'f22',
    nama: 'Telur Ayam',
    deskripsiSingkat: 'Sumber protein dan kolin paling ekonomis.',
    deskripsi: 'Telur bisa direbus, diorak arik, atau dibuat omelet sayur sehingga cocok untuk sarapan praktis mahasiswa kos.',
    gambar: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38'
  },
  {
    id: 'f23',
    nama: 'Ikan Salmon',
    deskripsiSingkat: 'Omega-3 tinggi untuk kesehatan otak.',
    deskripsi: 'Salmon panggang dengan lemon dan herba membantu fokus belajar serta menjaga kesehatan jantung.',
    gambar: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836'
  },
  {
    id: 'f24',
    nama: 'Ikan Kembung',
    deskripsiSingkat: 'Alternatif lokal kaya omega-3.',
    deskripsi: 'Ikan kembung bakar atau kuah kuning memberikan protein sehat dengan harga terjangkau dibanding salmon.',
    gambar: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601'
  },
  {
    id: 'f25',
    nama: 'Ikan Tuna',
    deskripsiSingkat: 'Praktis dijadikan salad atau sandwich.',
    deskripsi: 'Tuna kaleng dalam air bisa dicampur yogurt dan timun sebagai isian wrap tinggi protein rendah lemak.',
    gambar: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=tuna'
  },
  {
    id: 'f26',
    nama: 'Daging Sapi',
    deskripsiSingkat: 'Zat besi hewani untuk stamina padat.',
    deskripsi: 'Potongan daging sapi bagian has luar cocok dibuat steak tipis atau tumis lada hitam rendah minyak.',
    gambar: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=beef'
  },
  {
    id: 'f27',
    nama: 'Udang',
    deskripsiSingkat: 'Protein tinggi dengan rasa gurih alami.',
    deskripsi: 'Udang tumis bawang putih atau direbus untuk topping salad memberi selenium dan vitamin B12 penting.',
    gambar: 'https://images.unsplash.com/photo-1529042410759-befb1204b468'
  },
  {
    id: 'f28',
    nama: 'Ikan Nila',
    deskripsiSingkat: 'Sumber protein ringan untuk menu rumahan.',
    deskripsi: 'Nila kukus dengan jahe dan daun bawang jadi menu sehat rendah minyak untuk makan malam di kos.',
    gambar: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixid=tilapia'
  },
  {
    id: 'f29',
    nama: 'Daging Kambing',
    deskripsiSingkat: 'Mengandung zinc tinggi untuk imunitas.',
    deskripsi: 'Daging kambing muda bisa dimasak sop bening atau sate bakar rendah lemak asal dibuang bagian gajihnya.',
    gambar: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=goat'
  }
]

export const drinks = [
  {
    id: 'd1',
    nama: 'Air Putih',
    deskripsiSingkat: 'Hidrasi utama yang wajib diminum setiap jam.',
    deskripsi: 'Air putih membantu menjaga fokus, kestabilan suhu tubuh, dan kinerja organ tanpa kalori tambahan.',
    gambar: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?ixid=plain-water'
  },
  {
    id: 'd2',
    nama: 'Air Mineral',
    deskripsiSingkat: 'Mengandung mineral esensial seperti kalsium dan magnesium.',
    deskripsi: 'Botol air mineral praktis dibawa ke kelas agar tubuh tetap terhidrasi selama aktivitas kampus.',
    gambar: 'https://images.unsplash.com/photo-1437419764061-2473afe69fc2'
  },
  {
    id: 'd3',
    nama: 'Air Rebusan Lemon Hangat',
    deskripsiSingkat: 'Perpaduan air hangat dan lemon untuk detox ringan.',
    deskripsi: 'Minuman ini membantu menyegarkan tenggorokan pagi hari sekaligus memberi asupan vitamin C alami.',
    gambar: 'https://images.unsplash.com/photo-1464306076886-da185f6a9d12?ixid=lemon-water'
  },
  {
    id: 'd4',
    nama: 'Air Kelapa Muda',
    deskripsiSingkat: 'Elektrolit alami pengganti minuman isotonik.',
    deskripsi: 'Air kelapa kaya kalium, sodium, dan sedikit gula alami sehingga cocok diminum setelah olahraga.',
    gambar: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40'
  },
  {
    id: 'd5',
    nama: 'Jus Tomat',
    deskripsiSingkat: 'Sumber likopen untuk kesehatan kulit dan jantung.',
    deskripsi: 'Tomat diblender dengan sedikit garam laut menghasilkan rasa gurih segar yang kaya antioksidan.',
    gambar: 'https://images.unsplash.com/photo-1502744577631-978d7eb772b4'
  },
  {
    id: 'd6',
    nama: 'Susu Rendah Lemak',
    deskripsiSingkat: 'Protein hewani dengan kalori lebih ringan.',
    deskripsi: 'Segelas susu rendah lemak cocok diminum sebelum tidur untuk membantu pemulihan otot setelah aktivitas.',
    gambar: 'https://images.unsplash.com/photo-1481391032119-d89fee407e44?ixid=lowfat-milk'
  },
  {
    id: 'd7',
    nama: 'Susu Almond Tanpa Gula',
    deskripsiSingkat: 'Alternatif susu nabati bebas laktosa.',
    deskripsi: 'Susu almond homemade tanpa gula cocok untuk mahasiswa yang ingin mengurangi konsumsi gula harian.',
    gambar: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixid=almond-milk'
  },
  {
    id: 'd8',
    nama: 'Jus Jeruk Segar Tanpa Gula',
    deskripsiSingkat: 'Vitamin C tinggi untuk daya tahan tubuh.',
    deskripsi: 'Jeruk peras tanpa tambahan gula menjaga rasa tetap segar dan membantu penyerapan zat besi.',
    gambar: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?ixid=orange-juice'
  },
  {
    id: 'd9',
    nama: 'Jus Wortel Segar',
    deskripsiSingkat: 'Beta-karoten tinggi bantu kesehatan mata.',
    deskripsi: 'Wortel diblender bersama sedikit apel untuk menciptakan rasa manis alami tanpa gula pasir.',
    gambar: 'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?ixid=carrot-juice'
  },
  {
    id: 'd10',
    nama: 'Teh Hijau Tanpa Gula',
    deskripsiSingkat: 'Katekin alami bantu metabolisme.',
    deskripsi: 'Teh hijau diseduh 2-3 menit agar rasanya tidak pahit, cocok diminum hangat saat belajar malam.',
    gambar: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixid=green-tea'
  },
  {
    id: 'd11',
    nama: 'Wedang Jahe Tanpa Gula',
    deskripsiSingkat: 'Menghangatkan tubuh dan melancarkan pernapasan.',
    deskripsi: 'Jahe direbus dengan sereh dan daun pandan, disajikan tanpa gula agar sensasi hangatnya lebih terasa.',
    gambar: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixid=wedang-jahe'
  }
]

export const sports = [
  {
    id: 's1',
    nama: 'Jogging Ringan',
    deskripsiSingkat: '15-30 menit lari santai untuk stamina harian.',
    deskripsi: 'Jogging ringan membantu membakar kalori, memperbaiki mood, dan mudah dilakukan kapan pun hanya dengan sepatu olahraga.',
    tingkat: 'Pemula',
    gambar: 'https://images.unsplash.com/photo-1468645547353-56d325bb57ff'
  },
  {
    id: 's2',
    nama: 'Jalan Cepat',
    deskripsiSingkat: '20-40 menit jalan ritmis ramah sendi.',
    deskripsi: 'Alternatif jogging yang lebih ringan namun tetap baik untuk kesehatan jantung dan pengurang stres, bisa dilakukan di area kampus.',
    tingkat: 'Pemula',
    gambar: 'https://images.unsplash.com/photo-1509223197845-458d87318791'
  },
  {
    id: 's3',
    nama: 'Skipping (Lompat Tali)',
    deskripsiSingkat: '5-15 menit intens membakar kalori tinggi.',
    deskripsi: 'Lompat tali memakai alat murah, melatih koordinasi, meningkatkan daya tahan, dan cocok dilakukan di ruang kecil.',
    tingkat: 'Menengah',
    gambar: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a'
  },
  {
    id: 's4',
    nama: 'Push-Up',
    deskripsiSingkat: '3-10 menit per sesi fokus kekuatan.',
    deskripsi: 'Gerakan push-up melatih dada, bahu, tricep, serta core tanpa alat sehingga ideal untuk kekuatan dasar mahasiswa.',
    tingkat: 'Menengah',
    gambar: 'https://images.unsplash.com/photo-1517964108422-ffb3b55fdc4e'
  },
  {
    id: 's5',
    nama: 'Plank',
    deskripsiSingkat: '30-60 detik × 3 set untuk core.',
    deskripsi: 'Plank membantu memperkuat otot inti dan menjaga postur duduk saat kuliah lama; matras hanya opsional.',
    tingkat: 'Menengah',
    gambar: 'https://images.unsplash.com/photo-1518611012118-696072aa579a'
  },
  {
    id: 's6',
    nama: 'Sit-Up / Crunch',
    deskripsiSingkat: '10-15 menit gerakan perut klasik.',
    deskripsi: 'Sit-up atau crunch memperkuat otot perut dan mendukung kesehatan tulang belakang, cukup bermodal matras tipis.',
    tingkat: 'Pemula',
    gambar: 'https://images.unsplash.com/photo-1521804906057-1df8fdb718b4'
  },
  {
    id: 's7',
    nama: 'Bersepeda',
    deskripsiSingkat: '20-45 menit kardio ramah lutut.',
    deskripsi: 'Bersepeda sore hari menjaga kesehatan kardiovaskular sekaligus jadi aktivitas menyenangkan; bisa pakai sepeda sewa.',
    tingkat: 'Menengah',
    gambar: 'https://images.unsplash.com/photo-1505483531331-406a8cbc94fe'
  },
  {
    id: 's8',
    nama: 'Renang',
    deskripsiSingkat: '20-40 menit latihan full-body.',
    deskripsi: 'Renang melatih paru-paru, seluruh otot utama, dan memberi efek relaksasi tinggi; cukup manfaatkan kolam dekat kampus.',
    tingkat: 'Menengah',
    gambar: 'https://images.unsplash.com/photo-1500390364153-56beb1ee207c'
  },
  {
    id: 's9',
    nama: 'Yoga / Stretching',
    deskripsiSingkat: '10-20 menit peregangan lembut.',
    deskripsi: 'Rangkaian yoga ringan membantu merilekskan tubuh, mengurangi stres, dan memperbaiki fleksibilitas bagi yang sering begadang.',
    tingkat: 'Pemula',
    gambar: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773'
  },
  {
    id: 's10',
    nama: 'Futsal / Basket Ringan',
    deskripsiSingkat: '30-60 menit main bareng teman.',
    deskripsi: 'Gim santai futsal atau basket di lapangan kampus melatih koordinasi, kekuatan kaki, stamina, sekaligus sosial.',
    tingkat: 'Menengah',
    gambar: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d'
  }
]

export const motivations = [
  {
    id: 'm1',
    judul: 'Mulai lebih penting daripada sempurna',
    kategori: 'Mindset',
    deskripsi: 'Kesempurnaan lahir dari proses. Tanpa langkah pertama, tidak akan ada langkah berikutnya.',
    kutipan: 'Mulai lebih penting daripada sempurna.',
    sumber: 'Catatan Habit Mahasiswa',
    ikon: '🚀'
  },
  {
    id: 'm2',
    judul: 'Konsistensi kalahkan kejeniusaan malas',
    kategori: 'Kebiasaan',
    deskripsi: 'Belajar sebentar namun konsisten jauh lebih kuat ketimbang belajar maraton tapi jarang.',
    kutipan: 'Konsisten menang dari jenius yang malas.',
    sumber: 'Rangkaian Motivasi Kampus',
    ikon: '📚'
  },
  {
    id: 'm3',
    judul: 'Lelah hari ini, panen besok',
    kategori: 'Ketahanan',
    deskripsi: 'Tugas dan praktikum melelahkan, namun semuanya sedang menyiapkan hidupmu yang lebih ringan esok hari.',
    kutipan: 'Hari ini capek, besok terbayar.',
    sumber: 'Mentor Akademik',
    ikon: '💪'
  },
  {
    id: 'm4',
    judul: 'Lambat tidak apa, asal terus',
    kategori: 'Motivasi',
    deskripsi: 'Tidak harus lulus tercepat; yang penting tetap bergerak dan tidak berhenti.',
    kutipan: 'Tidak harus cepat, yang penting tetap bergerak.',
    sumber: 'Journal Habit Tracker',
    ikon: '🐢'
  },
  {
    id: 'm5',
    judul: 'Gagal berarti kamu mencoba',
    kategori: 'Growth',
    deskripsi: 'Setiap kegagalan menandakan kamu sedang menguji batas kemampuanmu dan siap belajar lebih cerdas.',
    kutipan: 'Kegagalan bukan tanda menyerah, tapi tanda kamu sedang mencoba.',
    sumber: 'Forum Bimbingan Belajar',
    ikon: '🧠'
  },
  {
    id: 'm6',
    judul: 'Rutinitas kecil hasilkan prestasi besar',
    kategori: 'Daily Habit',
    deskripsi: 'Nilai A, skripsi selesai, tubuh sehat—semua bersumber dari kebiasaan kecil yang diulang setiap hari.',
    kutipan: 'Hasil besar berawal dari rutinitas kecil.',
    sumber: 'Agenda Produktif 2025',
    ikon: '🔁'
  },
  {
    id: 'm7',
    judul: 'Jaga fokus, abaikan gangguan',
    kategori: 'Fokus',
    deskripsi: 'Distraksi kampus banyak, tapi tujuan jangka panjangmu jauh lebih berharga dari sekadar notifikasi.',
    kutipan: 'Fokus pada tujuan, bukan pada gangguan.',
    sumber: 'Catatan Belajar Malam',
    ikon: '🎯'
  },
  {
    id: 'm8',
    judul: 'Tantangan hari ini bentuk versi kuatmu',
    kategori: 'Character Building',
    deskripsi: 'Deadline dan dosen killer ibarat gym mental. Tanpa beban, karakter tidak terbentuk.',
    kutipan: 'Tantangan hari ini membangun versi kuat dirimu di masa depan.',
    sumber: 'Pelatihan Softskill Kampus',
    ikon: '🏋️'
  },
  {
    id: 'm9',
    judul: 'Berani mulai meski belum hebat',
    kategori: 'Mindset',
    deskripsi: 'Tidak ada mahasiswa hebat sejak awal. Kemampuan lahir dari keberanian memulai dan membiasakan.',
    kutipan: 'Kamu tidak harus hebat untuk mulai, tapi harus mulai untuk jadi hebat.',
    sumber: 'Seminar Freshman 2025',
    ikon: '✨'
  },
  {
    id: 'm10',
    judul: 'Waktu tidak menunggu',
    kategori: 'Time Management',
    deskripsi: 'Waktu terus berjalan. Jika kamu bekerja dengan konsisten, hasil akan menyusul dengan sendirinya.',
    kutipan: 'Waktu tidak menunggu, tapi hasil akan mengikuti.',
    sumber: 'Planner Akademik',
    ikon: '⏳'
  },
  {
    id: 'm11',
    judul: 'Belajar adalah hak istimewa',
    kategori: 'Syukur',
    deskripsi: 'Tidak semua orang bisa kuliah. Belajarlah dengan rasa syukur karena kesempatan ini langka.',
    kutipan: 'Belajar adalah hak istimewa, bukan beban.',
    sumber: 'Program Beasiswa Kampus',
    ikon: '🎓'
  },
  {
    id: 'm12',
    judul: 'Kerjakan yang bisa kamu kerjakan',
    kategori: 'Action',
    deskripsi: 'Jangan menunggu kondisi ideal. Mulai dari apa yang kamu punya, di tempat kamu berada.',
    kutipan: 'Lakukan yang kamu bisa, dengan apa yang kamu punya, dari tempat kamu berada.',
    sumber: 'Catatan Tutor',
    ikon: '🛠️'
  },
  {
    id: 'm13',
    judul: 'Kekuatan terlihat saat tetap jalan',
    kategori: 'Resiliensi',
    deskripsi: 'Mahasiswa kuat bukan yang tanpa masalah, tapi yang tetap melangkah meski beban penuh.',
    kutipan: 'Mahasiswa kuat bukan tanpa masalah, tapi tetap berjalan meski banyak masalah.',
    sumber: 'Support Group Kampus',
    ikon: '🛡️'
  },
  {
    id: 'm14',
    judul: 'Jam belajar hari ini selamatkanmu besok',
    kategori: 'Persiapan',
    deskripsi: 'Belajar sedikit setiap hari lebih baik daripada panik menjelang deadline.',
    kutipan: 'Satu jam belajar hari ini menyelamatkan tiga jam panik besok.',
    sumber: 'Catatan Ujian Tengah Semester',
    ikon: '⌛'
  },
  {
    id: 'm15',
    judul: 'Progresmu tidak perlu dibandingkan',
    kategori: 'Mental Health',
    deskripsi: 'Setiap orang punya timeline berbeda. Fokus pada perkembanganmu sendiri agar mental tetap sehat.',
    kutipan: 'Jangan bandingkan progresmu dengan orang lain.',
    sumber: 'Konselor Kampus',
    ikon: '🤝'
  },
  {
    id: 'm16',
    judul: 'Kebiasaan menentukan masa depan',
    kategori: 'Habit',
    deskripsi: 'Mimpi butuh kebiasaan yang mendukung. Rutinitas lah yang mengubah angan menjadi nyata.',
    kutipan: 'Masa depanmu ditentukan oleh kebiasaanmu, bukan mimpimu.',
    sumber: 'Workshop Produktivitas',
    ikon: '🧭'
  },
  {
    id: 'm17',
    judul: 'Disiplin adalah self-love',
    kategori: 'Self-care',
    deskripsi: 'Menjaga jadwal belajar, tidur, dan makan sehat adalah bentuk cinta kepada diri sendiri.',
    kutipan: 'Disiplin adalah bentuk cinta pada diri sendiri.',
    sumber: 'Wellness Center',
    ikon: '💗'
  },
  {
    id: 'm18',
    judul: 'Sedikit berani hari ini, lebih hebat besok',
    kategori: 'Courage',
    deskripsi: 'Coba presentasi, daftar magang, ikut lomba. Keberanian kecil membuka banyak pintu.',
    kutipan: 'Sedikit lebih berani hari ini, sedikit lebih hebat besok.',
    sumber: 'Program Pengembangan Karier',
    ikon: '🦁'
  },
  {
    id: 'm19',
    judul: 'Tantang diri agar berubah',
    kategori: 'Growth',
    deskripsi: 'Zona nyaman membuatmu diam. Pertumbuhan hadir saat kamu menghadapi hal baru yang menantang.',
    kutipan: 'Jika kamu tidak menantang dirimu, kamu tidak akan berubah.',
    sumber: 'Bootcamp Skill Kampus',
    ikon: '⚡'
  },
  {
    id: 'm20',
    judul: 'Selalu ada jalan bagi yang gigih',
    kategori: 'Ketahanan',
    deskripsi: 'Keberhasilan sering datang setelah berkali-kali bangkit. Jangan menyerah sebelum mencoba semua cara.',
    kutipan: 'Jangan menyerah sebelum mencoba semua jalan.',
    sumber: 'Komunitas Belajar Mandiri',
    ikon: '🗺️'
  }
]

const CHECKLIST_KEYS = ['makan', 'minum', 'olahraga', 'ibadah']
const completionCycle = [4, 3, 2, 1, 0]
let calendarHistory = persisted?.calendarHistory ?? {}

const createEmptyChecklist = () => CHECKLIST_KEYS.reduce((acc, key) => ({ ...acc, [key]: false }), {})

const createChecklistFromCount = (count) => {
  const checklist = createEmptyChecklist()
  CHECKLIST_KEYS.forEach((key, index) => {
    checklist[key] = index < count
  })
  return checklist
}

const countCompletion = (checklist) => CHECKLIST_KEYS.filter((key) => Boolean(checklist[key])).length

export let dashboardToday = {
  tanggal: '2025-11-22',
  nama: profile.nama,
  streak: 4,
  habitSelesai: 3,
  totalHabit: CHECKLIST_KEYS.length,
  checklist: {
    makan: true,
    minum: true,
    olahraga: false,
    ibadah: true
  },
  rekomendasi: 'Coba tambah sesi peregangan 5 menit sebelum tidur malam ini.'
}

if (persisted?.dashboardToday) {
  dashboardToday = { ...dashboardToday, ...persisted.dashboardToday }
}

const mapStatusFromCompleted = (count) => {
  if (count >= CHECKLIST_KEYS.length) return 'hijau'
  if (count <= 0) return 'merah'
  return 'kuning'
}

const ensureDateRecord = (dateKey, defaultCount = 0) => {
  if (!calendarHistory[dateKey]) {
    calendarHistory[dateKey] = {
      checklist: createChecklistFromCount(defaultCount)
    }
  }
  return calendarHistory[dateKey]
}

const ensureCalendarHistory = (year, month) => {
  const safeMonth = Math.min(Math.max(month, 1), 12)
  const daysInMonth = new Date(year, safeMonth, 0).getDate()
  Array.from({ length: daysInMonth }, (_, idx) => {
    const day = idx + 1
    const key = `${year}-${String(safeMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    ensureDateRecord(key, completionCycle[idx % completionCycle.length])
  })
}

const todayDate = new Date(dashboardToday.tanggal)
ensureCalendarHistory(todayDate.getFullYear(), todayDate.getMonth() + 1)
calendarHistory[dashboardToday.tanggal] = {
  checklist: { ...dashboardToday.checklist }
}
persistState()

const hydrateDay = (dateKey) => {
  const record = ensureDateRecord(dateKey)
  const habitSelesai = countCompletion(record.checklist)
  return {
    tanggal: dateKey,
    checklist: record.checklist,
    habitSelesai,
    totalHabit: CHECKLIST_KEYS.length
  }
}

const monthNames = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
]

export const generateCalendarStatus = (year, month) => {
  ensureCalendarHistory(year, month)
  const safeMonth = Math.min(Math.max(month, 1), 12)
  const daysInMonth = new Date(year, safeMonth, 0).getDate()

  return Array.from({ length: daysInMonth }, (_, idx) => {
    const day = idx + 1
    const key = `${year}-${String(safeMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const detail = hydrateDay(key)
    return {
      tanggal: key,
      status: mapStatusFromCompleted(detail.habitSelesai),
      habitSelesai: detail.habitSelesai
    }
  })
}

export const getCalendarPayload = (year, month) => {
  const safeYear = Number.isNaN(year) ? new Date().getFullYear() : year
  const safeMonth = Number.isNaN(month) ? new Date().getMonth() + 1 : month
  return {
    bulan: `${monthNames[safeMonth - 1]} ${safeYear}`,
    data: generateCalendarStatus(safeYear, safeMonth)
  }
}

export const updateProfile = (payload) => {
  profile = { ...profile, ...payload }
  dashboardToday = { ...dashboardToday, nama: profile.nama }
  persistState()
  return profile
}

export const getDayDetail = (dateKey) => {
  return hydrateDay(dateKey)
}

export const updateChecklist = (tanggal, payload) => {
  const targetDate = tanggal ?? dashboardToday.tanggal
  const record = ensureDateRecord(targetDate)
  record.checklist = { ...record.checklist, ...payload }
  const detail = hydrateDay(targetDate)

  if (targetDate === dashboardToday.tanggal) {
    dashboardToday = {
      ...dashboardToday,
      checklist: { ...detail.checklist },
      habitSelesai: detail.habitSelesai,
      streak: detail.habitSelesai === dashboardToday.totalHabit ? dashboardToday.streak + 1 : dashboardToday.streak
    }
  }

  persistState()

  return detail
}
