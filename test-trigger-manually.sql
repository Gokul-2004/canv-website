-- Test the trigger manually by inserting a test record
-- Run this in Supabase SQL Editor

-- Insert a test record (this should trigger the email)
INSERT INTO thit_registrations (name, email, title, phone, consent)
VALUES (
  'Test User',
  'gokul.krishnan.ng@gmail.com',
  'Test Title',
  '1234567890',
  true
);

-- Check if the record was inserted and has a token_number
SELECT id, name, email, token_number, created_at 
FROM thit_registrations 
ORDER BY created_at DESC 
LIMIT 1;
