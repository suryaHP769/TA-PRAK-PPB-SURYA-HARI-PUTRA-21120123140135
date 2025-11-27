export type ChecklistKey = 'makan' | 'minum' | 'olahraga' | 'ibadah'

export interface ChecklistStatus {
  makan: boolean
  minum: boolean
  olahraga: boolean
  ibadah: boolean
}

export interface DashboardToday {
  tanggal: string
  nama: string
  streak: number
  habitSelesai: number
  totalHabit: number
  checklist: ChecklistStatus
  rekomendasi: string
}

export interface CalendarItem {
  tanggal: string
  status: 'hijau' | 'kuning' | 'merah'
  habitSelesai: number
}

export interface CalendarResponse {
  bulan: string
  data: CalendarItem[]
}

export interface DayChecklist {
  tanggal: string
  checklist: ChecklistStatus
  habitSelesai: number
  totalHabit: number
}

export interface Profile {
  id: number
  nama: string
  umur?: number
  jurusan?: string
  agama?: string
  bio?: string
  avatar?: string
}

export interface CatalogItem {
  id: string
  nama: string
  deskripsiSingkat: string
  deskripsi: string
  gambar: string
}

export interface SportItem extends CatalogItem {
  tingkat: string
}

export interface MotivationItem {
  id: string
  judul: string
  kategori: string
  deskripsi: string
  kutipan: string
  sumber: string
  ikon: string
}

export type ResourceType = 'foods' | 'drinks' | 'sports'
