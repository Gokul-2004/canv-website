-- ============================================
-- FIX SUPABASE PERMISSIONS FOR DASHBOARD
-- ============================================
-- This script enables UPDATE permissions for the dashboard
-- ============================================

-- Enable Row Level Security (RLS) if not already enabled
ALTER TABLE thit_registrations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Enable read access for all users" ON thit_registrations;
DROP POLICY IF EXISTS "Enable insert access for all users" ON thit_registrations;
DROP POLICY IF EXISTS "Enable update access for all users" ON thit_registrations;

-- Create policy to allow SELECT (read) for everyone
CREATE POLICY "Enable read access for all users"
ON thit_registrations FOR SELECT
USING (true);

-- Create policy to allow INSERT (create) for everyone
CREATE POLICY "Enable insert access for all users"
ON thit_registrations FOR INSERT
WITH CHECK (true);

-- Create policy to allow UPDATE (edit) for everyone
-- This is what enables the Save button to work
CREATE POLICY "Enable update access for all users"
ON thit_registrations FOR UPDATE
USING (true)
WITH CHECK (true);

-- ============================================
-- VERIFICATION
-- ============================================
-- Run this to check if policies are active:
-- SELECT * FROM pg_policies WHERE tablename = 'thit_registrations';
