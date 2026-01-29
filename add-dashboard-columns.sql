-- ============================================
-- COMPLETE SUPABASE DATABASE SETUP FOR DASHBOARD
-- ============================================
-- This script will:
-- 1. Update the thit_registrations table structure
-- 2. Add the three new columns needed for the dashboard
-- 3. Set up proper defaults and constraints
-- ============================================

-- First, let's make sure the company column exists (it might have been removed)
-- If it exists, this will do nothing. If it doesn't, it will add it.
ALTER TABLE thit_registrations
ADD COLUMN IF NOT EXISTS company TEXT;

-- Add book_collected column (boolean, default false)
-- This tracks whether the book has been collected at the booth
ALTER TABLE thit_registrations
ADD COLUMN IF NOT EXISTS book_collected BOOLEAN DEFAULT false;

-- Add correct_email_id column (for storing corrected email addresses)
-- This allows dashboard users to record the correct email if the original was wrong
ALTER TABLE thit_registrations
ADD COLUMN IF NOT EXISTS correct_email_id TEXT;

-- Add comments to document what each column is for
COMMENT ON COLUMN thit_registrations.company IS 'Company name (editable from dashboard)';
COMMENT ON COLUMN thit_registrations.book_collected IS 'Whether the book has been collected at the booth (Yes/No)';
COMMENT ON COLUMN thit_registrations.correct_email_id IS 'Corrected email address if the original email was incorrect';

-- ============================================
-- VERIFICATION QUERY (Optional)
-- ============================================
-- Run this to verify all columns exist:
-- SELECT column_name, data_type, is_nullable
-- FROM information_schema.columns
-- WHERE table_name = 'thit_registrations'
-- ORDER BY ordinal_position;
