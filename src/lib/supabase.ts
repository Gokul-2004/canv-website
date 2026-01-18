import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug logging
console.log('🔍 Supabase Environment Check:', {
  url: supabaseUrl ? `✅ Set (${supabaseUrl.substring(0, 30)}...)` : '❌ Missing',
  key: supabaseAnonKey ? `✅ Set (${supabaseAnonKey.substring(0, 20)}...)` : '❌ Missing',
  allEnvVars: Object.keys(import.meta.env).filter(k => k.startsWith('VITE_')),
});

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables:', {
    url: supabaseUrl,
    key: supabaseAnonKey ? 'Present' : 'Missing',
  });
  // Don't throw error - let it fail gracefully so we can see the issue
}

// Create client only if we have the values
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any; // Will cause error on use, but won't crash on load
