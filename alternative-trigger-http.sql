-- Alternative trigger using http extension instead of pg_net
-- Run this in Supabase SQL Editor

-- Enable http extension
CREATE EXTENSION IF NOT EXISTS http;

CREATE OR REPLACE FUNCTION send_registration_email()
RETURNS TRIGGER AS $$
DECLARE
  project_ref TEXT := 'pbgbnpqnuyozolmvpjoz';
  service_role_key TEXT := 'zrA4wumcFoMb5A6Vg_m_oB7vCV';
  response http_response;
BEGIN
  -- Call Edge Function using http extension
  SELECT * INTO response
  FROM http((
    'POST',
    'https://' || project_ref || '.supabase.co/functions/v1/send-registration-email',
    ARRAY[
      http_header('Content-Type', 'application/json'),
      http_header('Authorization', 'Bearer ' || service_role_key)
    ],
    'application/json',
    json_build_object('record', row_to_json(NEW))::text
  )::http_request);
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Email trigger error: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_send_registration_email ON thit_registrations;

CREATE TRIGGER trigger_send_registration_email
  AFTER INSERT ON thit_registrations
  FOR EACH ROW
  EXECUTE FUNCTION send_registration_email();
