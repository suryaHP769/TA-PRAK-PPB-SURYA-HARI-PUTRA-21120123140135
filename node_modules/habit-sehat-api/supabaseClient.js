import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('[supabase] Variabel lingkungan SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY belum diisi.')
}

export const supabase =
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    : undefined

export const ensureSupabase = () => {
  if (!supabase) {
    throw new Error('Supabase belum dikonfigurasi. Pastikan variable SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY tersedia.')
  }
  return supabase
}
