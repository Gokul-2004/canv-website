-- Simpler trigger that logs errors
-- Run this in Supabase SQL Editor

CREATE OR REPLACE FUNCTION send_registration_email()
RETURNS TRIGGER AS $$
DECLARE
  project_ref TEXT := 'pbgbnpqnuyozolmvpjoz';
  service_role_key TEXT := 'zrA4wumcFoMb5A6Vg_m_oB7vCV';
  response_status INT;
  response_body TEXT;
BEGIN
  -- Try to call the Edge Function
  SELECT status, content INTO response_status, response_body
  FROM net.http_post(
    url := 'https://' || project_ref || '.supabase.co/functions/v1/send-registration-email',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || service_role_key
    ),
    body := jsonb_build_object('record', row_to_json(NEW))
  );
  
  -- Log the response (you can check this in database logs)
  RAISE NOTICE 'Edge Function called. Status: %, Response: %', response_status, response_body;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log any errors
    RAISE WARNING 'Error calling Edge Function: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
DROP TRIGGER IF EXISTS trigger_send_registration_email ON thit_registrations;

CREATE TRIGGER trigger_send_registration_email
  AFTER INSERT ON thit_registrations
  FOR EACH ROW
  EXECUTE FUNCTION send_registration_email();
