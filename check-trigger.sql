-- Check if trigger exists and verify setup
-- Run this in Supabase SQL Editor

-- Check if trigger exists
SELECT 
  trigger_name, 
  event_manipulation, 
  event_object_table,
  action_statement,
  action_timing
FROM information_schema.triggers 
WHERE event_object_table = 'thit_registrations';

-- Check if function exists
SELECT 
  routine_name, 
  routine_type
FROM information_schema.routines 
WHERE routine_name = 'send_registration_email';

-- Check if pg_net extension is enabled
SELECT * FROM pg_extension WHERE extname = 'pg_net';
