import 'dotenv/config'
import crypto from 'node:crypto'
import express from 'express'
import cors from 'cors'
import { profile, dashboardToday, updateProfile, updateChecklist, getCalendarPayload, getDayDetail } from './data.js'
import { ensureSupabase } from './supabaseClient.js'

const FOODS_TABLE = process.env.SUPABASE_FOODS_TABLE ?? 'healthy_foods'
const FOODS_SORT_COLUMN = process.env.SUPABASE_FOOD_SORT_COLUMN ?? 'name'
const DRINKS_TABLE = process.env.SUPABASE_DRINKS_TABLE ?? 'healthy_drinks'
const DRINKS_SORT_COLUMN = process.env.SUPABASE_DRINK_SORT_COLUMN ?? 'name'
const SPORTS_TABLE = process.env.SUPABASE_SPORTS_TABLE ?? 'healthy_exercises'
const SPORTS_SORT_COLUMN = process.env.SUPABASE_SPORT_SORT_COLUMN ?? 'name'
const MOTIVATIONS_TABLE = process.env.SUPABASE_MOTIVATIONS_TABLE ?? 'student_motivations'
const MOTIVATIONS_SORT_COLUMN = process.env.SUPABASE_MOTIVATION_SORT_COLUMN ?? 'id'

const app = express()
const DEFAULT_PORT = Number(process.env.PORT) || 4100

app.use(cors())
app.use(express.json({ limit: '5mb' }))

const FOOD_CATEGORY_IMAGE = {
  carb: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
  protein_animal: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
  protein_plant: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=800&q=80',
  vegetable: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=800&q=80',
  fruit: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=800&q=80'
}

const FALLBACK_FOOD_IMAGE = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
const DRINK_CATEGORY_IMAGE = {
  drink: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=800&q=80',
  juice: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80',
  smoothie: 'https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=800&q=80',
  tea: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=800&q=80',
  milk: 'https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=800&q=80'
}
const FALLBACK_DRINK_IMAGE = 'https://images.unsplash.com/photo-1459122312224-c53d772ef8b2?auto=format&fit=crop&w=800&q=80'
const SPORT_CATEGORY_IMAGE = {
  cardio: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
  strength: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
  flexibility: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
  mixed: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80'
}
const FALLBACK_SPORT_IMAGE = 'https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=800&q=80'

const formatMacro = (value, unit) => {
  if (value === undefined || value === null) return null
  const numeric = Number(value)
  if (Number.isNaN(numeric)) return null
  return `${numeric}${unit}`
}

const buildNutritionSummary = (record) => {
  if (record.deskripsiSingkat) return record.deskripsiSingkat
  if (record.summary) return record.summary

  const macros = [
    record.calories_kcal ? `${record.calories_kcal} kkal` : null,
    record.protein_g ? `${record.protein_g}g protein` : null,
    record.fiber_g ? `${record.fiber_g}g serat` : null
  ].filter(Boolean)

  if (macros.length) {
    const serving = record.serving_size_g ? `${record.serving_size_g}g` : 'per saji'
    return `Per ${serving}: ${macros.join(' · ')}`
  }

  return record.description ?? 'Belum ada ringkasan nutrisi.'
}

const buildLongDescription = (record) => {
  const base = record.deskripsi ?? record.description ?? 'Belum ada deskripsi detail.'
  const nutritionLines = [
    record.calories_kcal ? `Kalori: ${record.calories_kcal} kkal` : null,
    formatMacro(record.protein_g, 'g protein'),
    formatMacro(record.carbs_g, 'g karbohidrat'),
    formatMacro(record.fat_g, 'g lemak'),
    formatMacro(record.fiber_g, 'g serat'),
    formatMacro(record.sugar_g, 'g gula'),
    record.tags?.length ? `Label: ${record.tags.join(', ')}` : null
  ]
    .filter(Boolean)
    .join(' · ')

  return nutritionLines ? `${base}\n\n${nutritionLines}` : base
}

const pickFoodImage = (record) => {
  if (record.gambar) return record.gambar
  if (record.image_url) return record.image_url
  if (record.category && FOOD_CATEGORY_IMAGE[record.category]) {
    return FOOD_CATEGORY_IMAGE[record.category]
  }
  return FALLBACK_FOOD_IMAGE
}

const adaptFoodRecord = (record) => {
  if (!record) return null
  const id = String(record.id ?? record.slug ?? crypto.randomUUID())

  return {
    id,
    nama: record.nama ?? record.name ?? 'Menu tanpa nama',
    deskripsiSingkat: buildNutritionSummary(record),
    deskripsi: buildLongDescription(record),
    gambar: pickFoodImage(record),
    nutrisi: {
      porsiGram: record.serving_size_g ?? null,
      kalori: record.calories_kcal ?? null,
      protein: record.protein_g ?? null,
      karbohidrat: record.carbs_g ?? null,
      lemak: record.fat_g ?? null,
      serat: record.fiber_g ?? null,
      gula: record.sugar_g ?? null,
      sodium: record.sodium_mg ?? null,
      kategori: record.category ?? null,
      tags: record.tags ?? []
    }
  }
}

const buildDrinkSummary = (record) => {
  return record.deskripsiSingkat ?? record.summary ?? record.description ?? 'Minuman sehat pilihan mahasiswa.'
}

const buildDrinkDetail = (record) => {
  const base = record.deskripsi ?? record.description ?? 'Belum ada deskripsi detail.'
  const extra = [
    record.benefit ? `Manfaat: ${record.benefit}` : null,
    record.ingredients ? `Komposisi: ${record.ingredients}` : null,
    record.serving_size_ml ? `Porsi: ${record.serving_size_ml} ml` : null,
    record.calories_kcal ? `Kalori: ${record.calories_kcal} kkal` : null,
    record.sugar_g ? `Gula: ${record.sugar_g}g` : null,
    record.category ? `Kategori: ${record.category}` : null
  ]
    .filter(Boolean)
    .join(' · ')

  return extra ? `${base}

${extra}` : base
}

const pickDrinkImage = (record) => {
  if (record.gambar) return record.gambar
  if (record.image_url) return record.image_url
  if (record.category && DRINK_CATEGORY_IMAGE[record.category]) {
    return DRINK_CATEGORY_IMAGE[record.category]
  }
  return FALLBACK_DRINK_IMAGE
}

const adaptDrinkRecord = (record) => {
  if (!record) return null
  const id = String(record.id ?? record.slug ?? crypto.randomUUID())

  return {
    id,
    nama: record.nama ?? record.name ?? 'Minuman sehat',
    deskripsiSingkat: buildDrinkSummary(record),
    deskripsi: buildDrinkDetail(record),
    gambar: pickDrinkImage(record),
    kategori: record.category ?? null,
    nutrisi: {
      porsiMl: record.serving_size_ml ?? null,
      kalori: record.calories_kcal ?? null,
      gula: record.sugar_g ?? null,
      tags: record.tags ?? []
    }
  }
}

const formatDuration = (value) => {
  if (!value) return null
  return `${value} menit`
}

const buildSportSummary = (record) => {
  if (record.deskripsiSingkat) return record.deskripsiSingkat
  const duration = formatDuration(record.duration_min)
  const intensity = record.intensity ? `Intensitas ${record.intensity}` : null
  return [duration, intensity].filter(Boolean).join(' · ') || 'Latihan singkat untuk mahasiswa.'
}

const buildSportDetail = (record) => {
  const base = record.deskripsi ?? record.description ?? 'Belum ada deskripsi detail.'
  const lines = [
    record.duration_min ? `Durasi: ${record.duration_min} menit` : null,
    record.category ? `Kategori: ${record.category}` : null,
    record.intensity ? `Intensitas: ${record.intensity}` : null,
    record.equipment ? `Peralatan: ${record.equipment}` : null,
    record.benefit ? `Manfaat: ${record.benefit}` : null
  ]
    .filter(Boolean)
    .join(' · ')

  return lines ? `${base}

${lines}` : base
}

const pickSportImage = (record) => {
  if (record.gambar) return record.gambar
  if (record.image_url) return record.image_url
  if (record.category && SPORT_CATEGORY_IMAGE[record.category]) {
    return SPORT_CATEGORY_IMAGE[record.category]
  }
  return FALLBACK_SPORT_IMAGE
}

const adaptSportRecord = (record) => {
  if (!record) return null
  const id = String(record.id ?? record.slug ?? crypto.randomUUID())

  return {
    id,
    nama: record.nama ?? record.name ?? 'Latihan sehat',
    deskripsiSingkat: buildSportSummary(record),
    deskripsi: buildSportDetail(record),
    gambar: pickSportImage(record),
    tingkat: record.tingkat ?? record.level ?? record.intensity ?? 'Pemula'
  }
}

const DEFAULT_MOTIVATION_ICON = '✨'
const DEFAULT_MOTIVATION_SOURCE = 'Kurasi Habit Sehat'

const adaptMotivationRecord = (record) => {
  if (!record) return null
  const id = String(record.id ?? record.slug ?? crypto.randomUUID())

  return {
    id,
    judul: record.judul ?? record.title ?? record.name ?? 'Motivasi mahasiswa',
    kategori: record.kategori ?? record.category ?? 'Mindset',
    deskripsi: record.deskripsi ?? record.content ?? record.summary ?? 'Belum ada deskripsi motivasi.',
    kutipan: record.kutipan ?? record.quote ?? record.title ?? 'Tetap semangat hari ini!',
    sumber: record.sumber ?? record.source ?? DEFAULT_MOTIVATION_SOURCE,
    ikon: record.ikon ?? record.icon ?? DEFAULT_MOTIVATION_ICON
  }
}

app.get('/api/profile', (req, res) => {
  return res.json(profile)
})

app.put('/api/profile', (req, res) => {
  const updated = updateProfile(req.body)
  return res.json(updated)
})

app.get('/api/dashboard/today', (req, res) => {
  return res.json(dashboardToday)
})

app.get('/api/dashboard/calendar', (req, res) => {
  const month = Number(req.query.month)
  const year = Number(req.query.year)
  return res.json(getCalendarPayload(year, month))
})

app.post('/api/dashboard/checkin', (req, res) => {
  const updated = updateChecklist(req.body?.tanggal, req.body?.checklist ?? {})
  return res.json(updated)
})

app.get('/api/dashboard/day', (req, res) => {
  const date = req.query.date
  if (!date) {
    return res.status(400).json({ message: 'Parameter date wajib diisi (YYYY-MM-DD)' })
  }
  return res.json(getDayDetail(date))
})

const handleSupabaseError = (res, error) => {
  console.error('[supabase] error', error)
  res.status(500).json({ message: 'Gagal menghubungkan ke database Supabase' })
}

app.get('/api/foods', async (req, res) => {
  try {
    const supabase = ensureSupabase()
    const { data, error } = await supabase
      .from(FOODS_TABLE)
      .select('*')
      .order(FOODS_SORT_COLUMN, { ascending: true })
    if (error) {
      return handleSupabaseError(res, error)
    }
    const adapted = (data ?? []).map(adaptFoodRecord)
    return res.json(adapted)
  } catch (error) {
    return handleSupabaseError(res, error)
  }
})

app.get('/api/foods/:id', async (req, res) => {
  try {
    const supabase = ensureSupabase()
    const { data, error } = await supabase.from(FOODS_TABLE).select('*').eq('id', req.params.id).single()
    if (error) {
      if (error.code === 'PGRST116' || error.message?.includes('JSON object requested, multiple rows returned')) {
        return res.status(404).json({ message: 'Data tidak ditemukan' })
      }
      return handleSupabaseError(res, error)
    }
    if (!data) {
      return res.status(404).json({ message: 'Data tidak ditemukan' })
    }
    return res.json(adaptFoodRecord(data))
  } catch (error) {
    return handleSupabaseError(res, error)
  }
})

app.get('/api/drinks', async (req, res) => {
  try {
    const supabase = ensureSupabase()
    const { data, error } = await supabase
      .from(DRINKS_TABLE)
      .select('*')
      .order(DRINKS_SORT_COLUMN, { ascending: true })
    if (error) {
      return handleSupabaseError(res, error)
    }
    return res.json((data ?? []).map(adaptDrinkRecord))
  } catch (error) {
    return handleSupabaseError(res, error)
  }
})

app.get('/api/drinks/:id', async (req, res) => {
  try {
    const supabase = ensureSupabase()
    const { data, error } = await supabase.from(DRINKS_TABLE).select('*').eq('id', req.params.id).single()
    if (error) {
      if (error.code === 'PGRST116' || error.message?.includes('JSON object requested, multiple rows returned')) {
        return res.status(404).json({ message: 'Data tidak ditemukan' })
      }
      return handleSupabaseError(res, error)
    }
    if (!data) {
      return res.status(404).json({ message: 'Data tidak ditemukan' })
    }
    return res.json(adaptDrinkRecord(data))
  } catch (error) {
    return handleSupabaseError(res, error)
  }
})

app.get('/api/sports', async (req, res) => {
  try {
    const supabase = ensureSupabase()
    const { data, error } = await supabase
      .from(SPORTS_TABLE)
      .select('*')
      .order(SPORTS_SORT_COLUMN, { ascending: true })

    if (error) {
      return handleSupabaseError(res, error)
    }
    return res.json((data ?? []).map(adaptSportRecord))
  } catch (error) {
    return handleSupabaseError(res, error)
  }
})

app.get('/api/sports/:id', async (req, res) => {
  try {
    const supabase = ensureSupabase()
    const { data, error } = await supabase.from(SPORTS_TABLE).select('*').eq('id', req.params.id).single()
    if (error) {
      if (error.code === 'PGRST116' || error.message?.includes('JSON object requested, multiple rows returned')) {
        return res.status(404).json({ message: 'Data tidak ditemukan' })
      }
      return handleSupabaseError(res, error)
    }
    if (!data) {
      return res.status(404).json({ message: 'Data tidak ditemukan' })
    }
    return res.json(adaptSportRecord(data))
  } catch (error) {
    return handleSupabaseError(res, error)
  }
})

app.get('/api/motivations', async (req, res) => {
  try {
    const supabase = ensureSupabase()
    const { data, error } = await supabase
      .from(MOTIVATIONS_TABLE)
      .select('*')
      .order(MOTIVATIONS_SORT_COLUMN, { ascending: true })

    if (error) {
      return handleSupabaseError(res, error)
    }

    return res.json((data ?? []).map(adaptMotivationRecord))
  } catch (error) {
    return handleSupabaseError(res, error)
  }
})

app.get('/api/motivations/:id', async (req, res) => {
  try {
    const supabase = ensureSupabase()
    const { data, error } = await supabase.from(MOTIVATIONS_TABLE).select('*').eq('id', req.params.id).single()
    if (error) {
      if (error.code === 'PGRST116' || error.message?.includes('JSON object requested, multiple rows returned')) {
        return res.status(404).json({ message: 'Data tidak ditemukan' })
      }
      return handleSupabaseError(res, error)
    }

    if (!data) {
      return res.status(404).json({ message: 'Data tidak ditemukan' })
    }

    return res.json(adaptMotivationRecord(data))
  } catch (error) {
    return handleSupabaseError(res, error)
  }
})

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint tidak ditemukan' })
})

const server = app.listen(DEFAULT_PORT, () => {
  console.log(`Habit Sehat API berjalan di http://localhost:${DEFAULT_PORT}`)
})

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(
      `Port ${DEFAULT_PORT} sedang dipakai. Tutup proses lain atau jalankan kembali dengan variabel lingkungan PORT=xxxx.`
    )
    process.exit(1)
  }
  throw error
})
