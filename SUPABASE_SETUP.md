# Supabase Setup Guide

Follow these steps to connect your form to Supabase:

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in your project details:
   - **Name**: `canv-website` (or any name you prefer)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the closest region to your users
4. Click "Create new project" and wait for it to be ready (~2 minutes)

## Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. You'll find:
   - **Project URL** (something like `https://xxxxx.supabase.co`)
   - **anon/public key** (a long string starting with `eyJ...`)

## Step 3: Create the Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the entire contents of `supabase-setup.sql` file
4. Click "Run" (or press Ctrl+Enter)
5. You should see "Success. No rows returned"

## Step 4: Set Up Environment Variables

### For Local Development:

1. Create a `.env` file in the root of your project (same level as `package.json`)
2. Add these lines:
   ```
   VITE_SUPABASE_URL=your_project_url_here
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```
3. Replace `your_project_url_here` and `your_anon_key_here` with your actual values from Step 2

### For Vercel Deployment:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these two variables:
   - `VITE_SUPABASE_URL` = your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
4. Make sure to add them for **Production**, **Preview**, and **Development** environments
5. Redeploy your application

## Step 5: Install Dependencies

Run this command in your project directory:

```bash
npm install @supabase/supabase-js
```

## Step 6: Test the Form

1. Start your development server: `npm run dev`
2. Fill out the form on your website
3. Submit it
4. Check your Supabase dashboard → **Table Editor** → `thit_registrations` to see the submitted data

## Viewing Submissions

To view form submissions:
1. Go to your Supabase dashboard
2. Click **Table Editor** in the sidebar
3. Select the `thit_registrations` table
4. You'll see all submitted form data with timestamps

## Security Notes

- The `anon` key is safe to use in frontend code (it's public)
- Row Level Security (RLS) is enabled - only inserts are allowed for anonymous users
- If you want to view/export data, you'll need to use the Supabase dashboard or create authenticated endpoints

## Troubleshooting

**Error: "Missing Supabase environment variables"**
- Make sure your `.env` file exists and has the correct variable names
- Restart your dev server after creating/updating `.env`

**Error: "relation does not exist"**
- Make sure you ran the SQL script from `supabase-setup.sql` in the SQL Editor

**Form submits but no data appears**
- Check the browser console for errors
- Verify your API keys are correct
- Check Supabase dashboard → Logs for any errors
