import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types (you can generate these with Supabase CLI)
export type Database = {
  // Add your database types here
  // Example:
  // public: {
  //   Tables: {
  //     users: {
  //       Row: { id: string; name: string; email: string }
  //       Insert: { id?: string; name: string; email: string }
  //       Update: { id?: string; name?: string; email?: string }
  //     }
  //   }
  // }
}
