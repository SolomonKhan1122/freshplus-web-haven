import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for FreshPlus application
export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          service: string
          address: string
          service_date: string
          service_time: string
          special_instructions: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          service: string
          address: string
          service_date: string
          service_time: string
          special_instructions?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          service?: string
          address?: string
          service_date?: string
          service_time?: string
          special_instructions?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      quotes: {
        Row: {
          id: string
          name: string
          address: string
          city: string
          postcode: string
          phone1: string
          phone2: string | null
          email: string
          services: string[]
          preferred_date: string | null
          job_description: string | null
          terms_accepted: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          address: string
          city: string
          postcode: string
          phone1: string
          phone2?: string | null
          email: string
          services: string[]
          preferred_date?: string | null
          job_description?: string | null
          terms_accepted: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string
          city?: string
          postcode?: string
          phone1?: string
          phone2?: string | null
          email?: string
          services?: string[]
          preferred_date?: string | null
          job_description?: string | null
          terms_accepted?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
