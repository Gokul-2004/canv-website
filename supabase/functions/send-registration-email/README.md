# Send Registration Email Edge Function

This Supabase Edge Function automatically sends a confirmation email with a token number when someone registers for the book.

## Setup Instructions

### Step 1: Create Resend Account

1. Go to https://resend.com
2. Sign up for a free account (3,000 emails/month free)
3. Verify your email address
4. Go to **API Keys** section
5. Click **"Create API Key"**
6. Name it: `supabase-edge-function`
7. Copy the API key (starts with `re_...`)

### Step 2: Add Domain in Resend (Optional but Recommended)

1. In Resend dashboard, go to **Domains**
2. Click **"Add Domain"**
3. Add your domain (e.g., `certinal.com`)
4. Follow DNS setup instructions
5. Wait for verification (can take a few hours)

**OR** use Resend's default domain for testing:
- Default domain: `onboarding.resend.dev` (for testing only)

### Step 3: Deploy Edge Function to Supabase

1. Install Supabase CLI (if not already installed):
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref YOUR_PROJECT_REF
   ```
   (Find your project ref in Supabase dashboard → Settings → General)

4. Set environment variables:
   ```bash
   supabase secrets set RESEND_API_KEY=re_your_api_key_here
   supabase secrets set RESEND_FROM_EMAIL=noreply@yourdomain.com
   ```
   
   **For testing with default domain:**
   ```bash
   supabase secrets set RESEND_FROM_EMAIL=onboarding@resend.dev
   ```

5. Deploy the function:
   ```bash
   supabase functions deploy send-registration-email
   ```

### Step 4: Create Database Trigger

Run this SQL in Supabase SQL Editor:

```sql
-- Create a function to call the Edge Function
CREATE OR REPLACE FUNCTION send_registration_email()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM
    net.http_post(
      url := 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-registration-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
      ),
      body := jsonb_build_object('record', row_to_json(NEW))
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call function on insert
CREATE TRIGGER trigger_send_registration_email
  AFTER INSERT ON thit_registrations
  FOR EACH ROW
  EXECUTE FUNCTION send_registration_email();
```

**Replace `YOUR_PROJECT_REF` with your actual Supabase project reference ID.**

### Step 5: Update Database Schema

Add token_number column to the table:

```sql
ALTER TABLE thit_registrations 
ADD COLUMN IF NOT EXISTS token_number TEXT;
```

## Testing

1. Submit a test form on your website
2. Check the email inbox
3. Check Supabase → Logs → Edge Functions for any errors

## Troubleshooting

- **Emails not sending**: Check Edge Function logs in Supabase dashboard
- **API key error**: Verify RESEND_API_KEY is set correctly
- **Domain not verified**: Use `onboarding@resend.dev` for testing
- **Trigger not firing**: Check SQL Editor for trigger errors
