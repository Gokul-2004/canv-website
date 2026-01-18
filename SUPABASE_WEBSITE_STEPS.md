# Supabase Website Setup - Follow These Steps

## Step 1: Create Supabase Account & Project

1. Go to **https://supabase.com**
2. Click **"Start your project"** or **"Sign in"** if you already have an account
3. Click **"New Project"** button
4. Fill in the details:
   - **Name**: `canv-website` (or any name you like)
   - **Database Password**: Create a strong password (⚠️ **SAVE THIS** - you'll need it!)
   - **Region**: Choose closest to your users (e.g., "Southeast Asia (Singapore)" for India)
5. Click **"Create new project"**
6. ⏳ Wait 2-3 minutes for the project to be ready

---

## Step 2: Get Your API Keys

1. Once your project is ready, in the left sidebar, click **"Settings"** (gear icon)
2. Click **"API"** in the settings menu
3. You'll see two important values:
   - **Project URL**: Something like `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public key**: A long string starting with `eyJ...` (under "Project API keys" section)
4. **Copy both values** - you'll need them in Step 4

---

## Step 3: Create the Database Table

1. In the left sidebar, click **"SQL Editor"**
2. Click **"New query"** button (top right)
3. Open the file `supabase-setup.sql` from your project folder
4. **Copy ALL the SQL code** from that file
5. **Paste it** into the SQL Editor in Supabase
6. Click **"Run"** button (or press `Ctrl+Enter`)
7. You should see: ✅ **"Success. No rows returned"**

**That's it!** Your table is now created and ready to receive form submissions.

---

## Step 4: Add Environment Variables to Vercel

1. Go to **https://vercel.com** and log in
2. Find your project **"canv-website"** in the dashboard
3. Click on the project
4. Go to **"Settings"** tab
5. Click **"Environment Variables"** in the left menu
6. Add these **TWO** variables:

   **Variable 1:**
   - **Key**: `VITE_SUPABASE_URL`
   - **Value**: Paste your Project URL from Step 2
   - **Environments**: Check ✅ Production, ✅ Preview, ✅ Development

   **Variable 2:**
   - **Key**: `VITE_SUPABASE_ANON_KEY`
   - **Value**: Paste your anon public key from Step 2
   - **Environments**: Check ✅ Production, ✅ Preview, ✅ Development

7. Click **"Save"** for each variable
8. Go to **"Deployments"** tab and click **"Redeploy"** on the latest deployment

---

## Step 5: Test It!

1. Visit your website: **https://canv-website.vercel.app**
2. Scroll to the form section
3. Fill out the form and submit
4. Go back to Supabase dashboard
5. Click **"Table Editor"** in the left sidebar
6. Click on **"thit_registrations"** table
7. You should see your form submission! 🎉

---

## Viewing Form Submissions

To see all form submissions anytime:
1. Go to Supabase dashboard
2. Click **"Table Editor"** → **"thit_registrations"**
3. All submissions will be listed with timestamps

---

## Troubleshooting

**If form doesn't submit:**
- Check browser console (F12) for errors
- Verify environment variables are set correctly in Vercel
- Make sure you ran the SQL script in Step 3

**If you see "Missing Supabase environment variables":**
- Double-check the variable names in Vercel (must be exactly `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`)
- Make sure you redeployed after adding variables

---

**That's all you need to do on Supabase website!** 🚀
