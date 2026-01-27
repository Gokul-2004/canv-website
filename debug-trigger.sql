-- Debug why trigger isn't calling Edge Function
-- Run this in Supabase SQL Editor

-- First, let's test if pg_net is working
SELECT net.http_post(
  url := 'https://httpbin.org/post',
  headers := jsonb_build_object('Content-Type', 'application/json'),
  body := jsonb_build_object('test', 'data')
) AS test_result;

-- Check if the function can be called directly
SELECT send_registration_email() FROM (
  SELECT ROW(
    gen_random_uuid(),
    'Test Name',
    'test@example.com',
    'Test Title',
    '1234567890',
    true,
    NULL,
    NOW(),
    NOW()
  )::thit_registrations AS new
) AS test_row;
