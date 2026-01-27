-- SQL to set up email trigger for registrations
-- Run this AFTER deploying the Edge Function

-- Step 1: Add token_number column (if not already added)
ALTER TABLE thit_registrations 
ADD COLUMN IF NOT EXISTS token_number TEXT;

-- Step 2: Enable pg_net extension for HTTP requests
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Step 3: Create function to call Edge Function
-- IMPORTANT: Replace YOUR_PROJECT_REF with your actual Supabase project reference ID
CREATE OR REPLACE FUNCTION send_registration_email()
RETURNS TRIGGER AS $$
DECLARE
  project_ref TEXT := 'pbgbnpqnuyozolmvpjoz'; -- REPLACE WITH YOUR PROJECT REF
  service_role_key TEXT; -- Will be set via Supabase automatically
BEGIN
  -- Get service role key from settings (set via Supabase dashboard)
  service_role_key := current_setting('app.settings.service_role_key', true);
  
  -- If not set, you can hardcode it (less secure but works)
  -- service_role_key := 'YOUR_SERVICE_ROLE_KEY_HERE';
  
  -- Call the Edge Function
  PERFORM
    net.http_post(
      url := 'https://' || project_ref || '.supabase.co/functions/v1/send-registration-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || service_role_key
      ),
      body := jsonb_build_object('record', row_to_json(NEW))
    );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 4: Create trigger
DROP TRIGGER IF EXISTS trigger_send_registration_email ON thit_registrations;

CREATE TRIGGER trigger_send_registration_email
  AFTER INSERT ON thit_registrations
  FOR EACH ROW
  EXECUTE FUNCTION send_registration_email();

-- Note: If pg_net extension doesn't work, use the alternative method in SUPABASE_EMAIL_SETUP.md
