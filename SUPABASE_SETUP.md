# Supabase Setup Instructions

## Environment Variables

To properly configure Supabase for this project, you need to set up environment variables.

### Option 1: Create .env file (Recommended)

Create a `.env` file in the root directory with the following content:

```env
VITE_SUPABASE_URL=https://iuxuavlyjjityhjjdgdc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1eHVhdmx5amppdHloampkZ2RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4MTc1ODMsImV4cCI6MjA3MDM5MzU4M30.HuA509aN8j0Kax0cpxDZOrsDyTYVSMr3C3p-fxOEffs
```

### Option 2: Fallback (Currently Active)

The application currently includes fallback values in `src/lib/supabase.ts`, so it should work even without environment variables.

## Database Tables

The following tables have been created in your Supabase database:

### bookings
- Stores data from the "Book Now" form
- Fields: name, email, phone, service, address, service_date, service_time, special_instructions

### quotes  
- Stores data from the "Quote" form
- Fields: name, address, city, postcode, phone1, phone2, email, services[], preferred_date, job_description, terms_accepted

## Security

- Row Level Security (RLS) is **DISABLED** on both tables for unrestricted form submissions
- All users (anonymous and authenticated) can insert, read, and update data
- This allows the quote and booking forms to work without authentication requirements

## Troubleshooting

If forms are not working:

1. Check browser console for detailed error messages
2. Verify Supabase connection in Network tab
3. Ensure .env file exists and contains correct values
4. Check that your Supabase project is active

## Testing

To test the connection:
1. Fill out either the Quote or Book Now form
2. Check browser console for any error messages
3. Verify data appears in your Supabase dashboard
