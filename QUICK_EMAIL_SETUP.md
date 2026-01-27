# Quick Email Setup Guide

## You Have: ✅
- Resend API Key: `re_UQwe5V52_4Ufa3rZWnTPpnZnboimCrdD7`
- Supabase project set up

## What to Do Next:

### Step 1: Add Token Column to Database (2 minutes)

Go to Supabase → SQL Editor and run:

```sql
ALTER TABLE thit_registrations 
ADD COLUMN IF NOT EXISTS token_number TEXT;
```

### Step 2: Create Edge Function via Dashboard (5 minutes)

1. Go to Supabase Dashboard → **Edge Functions**
2. Click **"Create a new function"**
3. Name: `send-registration-email`
4. Copy ALL code from `supabase/functions/send-registration-email/index.ts`
5. Paste into the editor
6. Click **"Deploy"**

### Step 3: Set Secrets (2 minutes)

In the Edge Function page:
1. Click **"Settings"** tab
2. Under **"Secrets"**, add:
   - **Key**: `RESEND_API_KEY`
   - **Value**: `re_UQwe5V52_4Ufa3rZWnTPpnZnboimCrdD7`
   - Click **"Add"**
   
   - **Key**: `RESEND_FROM_EMAIL`
   - **Value**: `onboarding@resend.dev`
   - Click **"Add"**

### Step 4: Create Database Trigger (5 minutes)

Go to Supabase → SQL Editor and run this:

**IMPORTANT:** Replace `pbgbnpqnuyozolmvpjoz` with YOUR actual project reference ID!

```sql
-- Enable pg_net extension
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Get your Service Role Key from: Settings → API → service_role key
-- Replace YOUR_SERVICE_ROLE_KEY below

CREATE OR REPLACE FUNCTION send_registration_email()
RETURNS TRIGGER AS $$
DECLARE
  project_ref TEXT := 'pbgbnpqnuyozolmvpjoz'; -- YOUR PROJECT REF
  service_role_key TEXT := 'YOUR_SERVICE_ROLE_KEY'; -- Get from Settings → API
BEGIN
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

-- Create trigger
DROP TRIGGER IF EXISTS trigger_send_registration_email ON thit_registrations;

CREATE TRIGGER trigger_send_registration_email
  AFTER INSERT ON thit_registrations
  FOR EACH ROW
  EXECUTE FUNCTION send_registration_email();
```

**To get your Service Role Key:**
1. Supabase Dashboard → Settings → API
2. Find **"service_role"** key (the secret one, NOT anon key)
3. Copy it
4. Replace `YOUR_SERVICE_ROLE_KEY` in the SQL above

### Step 5: Test It! 🎉

1. Go to your website: https://canv-website.vercel.app
2. Fill out and submit the form
3. Check your email inbox!
4. You should receive an email with a 6-digit token number

## Troubleshooting

**If emails don't send:**
1. Check Edge Functions → Logs for errors
2. Verify secrets are set correctly
3. Check Resend dashboard → Emails to see if emails are being sent

**If trigger doesn't fire:**
1. Check SQL Editor for syntax errors
2. Verify Service Role Key is correct
3. Check Edge Function URL matches your project ref

---

**That's it!** Once you complete these steps, every form submission will automatically send an email with a token number! 🚀
