-- Supabase Table Setup for THIT 2026 Registrations
-- Run this SQL in your Supabase SQL Editor: https://app.supabase.com/project/_/sql

-- Create the registrations table
CREATE TABLE IF NOT EXISTS thit_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  title TEXT,
  phone TEXT,
  consent BOOLEAN NOT NULL DEFAULT false,
  token_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_thit_registrations_email ON thit_registrations(email);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_thit_registrations_created_at ON thit_registrations(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE thit_registrations ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert (for form submissions)
CREATE POLICY "Allow public inserts" ON thit_registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create a policy that allows authenticated users to read (optional - adjust based on your needs)
-- CREATE POLICY "Allow authenticated reads" ON thit_registrations
--   FOR SELECT
--   TO authenticated
--   USING (true);

-- Optional: Create a function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_thit_registrations_updated_at
    BEFORE UPDATE ON thit_registrations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
