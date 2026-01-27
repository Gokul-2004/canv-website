# Supabase Update: Make Title Field Optional

## What You Need to Do in Supabase

Since the `title` field is already created as `NOT NULL` in your database, you need to update it to allow NULL values.

### Step 1: Open SQL Editor

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Click **"SQL Editor"** in the left sidebar
4. Click **"New query"** button

### Step 2: Run This SQL Command

Copy and paste this SQL command into the SQL Editor:

```sql
-- Make title field optional (allow NULL)
ALTER TABLE thit_registrations 
ALTER COLUMN title DROP NOT NULL;
```

### Step 3: Execute

1. Click **"Run"** button (or press `Ctrl+Enter`)
2. You should see: ✅ **"Success. No rows returned"**

### Step 4: Verify

1. Go to **"Table Editor"** → **"thit_registrations"**
2. Click on the **"title"** column header
3. You should see that it no longer has the "Required" constraint

## That's It!

After running this SQL command, your form will work correctly with the title field being optional. The database will now accept NULL values for the title field.
