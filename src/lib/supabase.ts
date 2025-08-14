import { createClient } from '@supabase/supabase-js'

// Fallback to hardcoded values if environment variables are not set
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://iuxuavlyjjityhjjdgdc.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1eHVhdmx5amppdHloampkZ2RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4MTc1ODMsImV4cCI6MjA3MDM5MzU4M30.HuA509aN8j0Kax0cpxDZOrsDyTYVSMr3C3p-fxOEffs'

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
          status: string
          admin_notes: string | null
          assigned_to: string | null
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
          status?: string
          admin_notes?: string | null
          assigned_to?: string | null
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
          status?: string
          admin_notes?: string | null
          assigned_to?: string | null
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
          status: string
          admin_notes: string | null
          quote_amount: number | null
          assigned_to: string | null
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
          status?: string
          admin_notes?: string | null
          quote_amount?: number | null
          assigned_to?: string | null
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
          status?: string
          admin_notes?: string | null
          quote_amount?: number | null
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      admin_users: {
        Row: {
          id: string
          email: string
          password_hash: string
          full_name: string
          role: string
          is_active: boolean
          last_login: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          full_name: string
          role?: string
          is_active?: boolean
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string
          full_name?: string
          role?: string
          is_active?: boolean
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          subject: string | null
          message: string
          status: string
          admin_notes: string | null
          replied_by: string | null
          reply_sent_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          subject?: string | null
          message: string
          status?: string
          admin_notes?: string | null
          replied_by?: string | null
          reply_sent_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          subject?: string | null
          message?: string
          status?: string
          admin_notes?: string | null
          replied_by?: string | null
          reply_sent_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
