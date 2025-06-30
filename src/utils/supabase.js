import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create client only if credentials exist
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Log warning if credentials missing
if (!supabase) {
  console.warn('Supabase credentials not found. Please create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
}