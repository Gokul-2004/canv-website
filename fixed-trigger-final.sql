-- Fixed trigger that will work
-- Run this in Supabase SQL Editor

CREATE OR REPLACE FUNCTION send_registration_email()
RETURNS TRIGGER AS $$
DECLARE
  project_ref TEXT := 'pbgbnpqnuyozolmvpjoz';
  service_role_key TEXT := 'zrA4wumcFoMb5A6Vg_m_oB7vCV';
  request_id BIGINT;
BEGIN
  -- Call Edge Function - pg_net returns a request ID
  SELECT id INTO request_id
  FROM net.http_post(
    url := 'https://' || project_ref || '.supabase.co/functions/v1/send-registration-email',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || service_role_key
    ),
    body := jsonb_build_object('record', row_to_json(NEW))
  );
  
  -- Request is sent asynchronously - that's fine
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Don't fail the insert if email fails
    RAISE WARNING 'Email trigger error: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
DROP TRIGGER IF EXISTS trigger_send_registration_email ON thit_registrations;

CREATE TRIGGER trigger_send_registration_email
  AFTER INSERT ON thit_registrations
  FOR EACH ROW
  EXECUTE FUNCTION send_registration_email();
