-- FreshPlus Database Setup for Supabase
-- Run these SQL commands in your Supabase SQL editor to create the necessary tables

-- 1. Create bookings table for the Book Now form
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  service VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  service_date DATE NOT NULL,
  service_time VARCHAR(50) NOT NULL,
  special_instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create quotes table for the Quote form
CREATE TABLE IF NOT EXISTS quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  postcode VARCHAR(20) NOT NULL,
  phone1 VARCHAR(50) NOT NULL,
  phone2 VARCHAR(50),
  email VARCHAR(255) NOT NULL,
  services TEXT[] NOT NULL,
  preferred_date DATE,
  job_description TEXT,
  terms_accepted BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_service_date ON bookings(service_date);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at);

CREATE INDEX IF NOT EXISTS idx_quotes_email ON quotes(email);
CREATE INDEX IF NOT EXISTS idx_quotes_preferred_date ON quotes(preferred_date);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS policies for bookings table
-- Allow anyone to insert bookings (for form submissions)
CREATE POLICY "Enable insert for all users on bookings" ON bookings
  FOR INSERT 
  WITH CHECK (true);

-- Only allow reading bookings for authenticated users (for admin dashboard)
CREATE POLICY "Enable read for authenticated users only on bookings" ON bookings
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Allow authenticated users to update bookings
CREATE POLICY "Enable update for authenticated users on bookings" ON bookings
  FOR UPDATE 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- 6. Create RLS policies for quotes table
-- Allow anyone to insert quotes (for form submissions)
CREATE POLICY "Enable insert for all users on quotes" ON quotes
  FOR INSERT 
  WITH CHECK (true);

-- Only allow reading quotes for authenticated users (for admin dashboard)
CREATE POLICY "Enable read for authenticated users only on quotes" ON quotes
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Allow authenticated users to update quotes
CREATE POLICY "Enable update for authenticated users on quotes" ON quotes
  FOR UPDATE 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- 7. Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 8. Create triggers to automatically update the updated_at column
CREATE TRIGGER update_bookings_updated_at 
  BEFORE UPDATE ON bookings 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quotes_updated_at 
  BEFORE UPDATE ON quotes 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- 9. Grant necessary permissions (optional, depends on your Supabase setup)
-- These permissions are usually handled automatically by Supabase
-- GRANT USAGE ON SCHEMA public TO anon, authenticated;
-- GRANT SELECT, INSERT ON bookings TO anon;
-- GRANT SELECT, INSERT ON quotes TO anon;
-- GRANT ALL ON bookings TO authenticated;
-- GRANT ALL ON quotes TO authenticated;
