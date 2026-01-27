-- Check if pg_net extension is enabled
-- Run this first

SELECT * FROM pg_extension WHERE extname = 'pg_net';

-- If it returns nothing, enable it:
-- CREATE EXTENSION IF NOT EXISTS pg_net;
