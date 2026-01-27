# Complete Email Setup Guide - Step by Step

Follow these steps to set up automatic email sending with token numbers.

## Prerequisites

- Supabase project already set up
- Form submissions working
- Resend account (free tier available)

---

## Part 1: Set Up Resend (5 minutes)

### Step 1.1: Create Resend Account

1. Go to **https://resend.com**
2. Click **"Sign Up"** (or "Get Started")
3. Sign up with your email
4. Verify your email address

### Step 1.2: Get API Key

1. Once logged in, go to **"API Keys"** in the left sidebar
2. Click **"Create API Key"**
3. Name it: `supabase-email-function`
4. Click **"Add"**
5. **Copy the API key** (starts with `re_...`) - you'll need this later!

### Step 1.3: Set Up Email Domain (Choose One)

**Option A: Use Resend's Test Domain (Quick Setup)**
- Use: `onboarding@resend.dev`
- No setup needed, works immediately
- Good for testing

**Option B: Use Your Own Domain (Production)**
1. In Resend dashboard, go to **"Domains"**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `certinal.com`)
4. Follow DNS instructions to verify
5. Wait for verification (can take a few hours)

---

## Part 2: Deploy Supabase Edge Function (10 minutes)

### Step 2.1: Install Supabase CLI

Open your terminal/command prompt and run:

```bash
npm install -g supabase
```

### Step 2.2: Login to Supabase

```bash
supabase login
```

This will open a browser window for authentication.

### Step 2.3: Link Your Project

1. Go to Supabase Dashboard → Settings → General
2. Find your **"Reference ID"** (looks like `pbgbnpqnuyozolmvpjoz`)
3. Run this command (replace with your project ref):

```bash
supabase link --project-ref pbgbnpqnuyozolmvpjoz
```

### Step 2.4: Set Environment Variables

Set your Resend API key:

```bash
supabase secrets set RESEND_API_KEY=re_your_actual_api_key_here
```

Set your from email address:

**For testing (using Resend's domain):**
```bash
supabase secrets set RESEND_FROM_EMAIL=onboarding@resend.dev
```

**For production (using your domain):**
```bash
supabase secrets set RESEND_FROM_EMAIL=noreply@yourdomain.com
```

### Step 2.5: Deploy the Function

Navigate to your project folder and deploy:

```bash
cd "C:\Users\Gokul.Krishnan\OneDrive - Zycus\Desktop\Git-Website"
supabase functions deploy send-registration-email
```

---

## Part 3: Update Database (5 minutes)

### Step 3.1: Add Token Number Column

Go to Supabase → SQL Editor and run:

```sql
-- Add token_number column to store the generated token
ALTER TABLE thit_registrations 
ADD COLUMN IF NOT EXISTS token_number TEXT;
```

### Step 3.2: Create Trigger Function

**IMPORTANT:** Replace `YOUR_PROJECT_REF` with your actual project reference ID (from Step 2.3).

Run this SQL:

```sql
-- Enable http extension for making HTTP requests
CREATE EXTENSION IF NOT EXISTS http;

-- Create function to call Edge Function
CREATE OR REPLACE FUNCTION send_registration_email()
RETURNS TRIGGER AS $$
DECLARE
  project_ref TEXT := 'pbgbnpqnuyozolmvpjoz'; -- REPLACE WITH YOUR PROJECT REF
  service_role_key TEXT := 'YOUR_SERVICE_ROLE_KEY'; -- Get from Supabase Settings → API
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
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS trigger_send_registration_email ON thit_registrations;
CREATE TRIGGER trigger_send_registration_email
  AFTER INSERT ON thit_registrations
  FOR EACH ROW
  EXECUTE FUNCTION send_registration_email();
```

**To get your Service Role Key:**
1. Go to Supabase Dashboard → Settings → API
2. Find **"service_role key"** (NOT the anon key)
3. Copy it and replace `YOUR_SERVICE_ROLE_KEY` in the SQL above

---

## Part 4: Test It!

1. Go to your website: https://canv-website.vercel.app
2. Fill out and submit the form
3. Check the email inbox
4. You should receive an email with a 6-digit token number!

---

## Troubleshooting

### Emails Not Sending?

1. **Check Edge Function Logs:**
   - Supabase Dashboard → Edge Functions → `send-registration-email` → Logs
   - Look for error messages

2. **Check Resend Dashboard:**
   - Go to Resend → Emails
   - See if emails are being sent (even if they fail)

3. **Verify API Key:**
   ```bash
   supabase secrets list
   ```
   Should show `RESEND_API_KEY` and `RESEND_FROM_EMAIL`

4. **Test Edge Function Manually:**
   - Supabase Dashboard → Edge Functions → `send-registration-email` → Invoke
   - Use test payload:
   ```json
   {
     "record": {
       "id": "test-id",
       "name": "Test User",
       "email": "your-email@example.com"
     }
   }
   ```

### Common Issues

- **"Invalid API key"**: Double-check your Resend API key
- **"Domain not verified"**: Use `onboarding@resend.dev` for testing
- **"Trigger not firing"**: Check SQL Editor for syntax errors
- **"Function not found"**: Make sure you deployed the function correctly

---

## What Happens Now?

1. User submits form → Data saved to Supabase
2. Database trigger fires → Calls Edge Function
3. Edge Function generates token → Updates database
4. Edge Function sends email → Via Resend API
5. User receives email → With token number!

---

**Need Help?** Check Supabase Edge Functions documentation: https://supabase.com/docs/guides/functions
