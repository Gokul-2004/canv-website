import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create client only if we have both values
let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  // Debug logging (only in browser, not during build)
  if (typeof window !== 'undefined') {
    console.log('🔍 Supabase Environment Check:', {
      url: `✅ Set (${supabaseUrl.substring(0, 30)}...)`,
      key: `✅ Set (${supabaseAnonKey.substring(0, 20)}...)`,
    });
  }
} else {
  if (typeof window !== 'undefined') {
    console.error('❌ Missing Supabase environment variables:', {
      url: supabaseUrl ? 'Present' : 'Missing',
      key: supabaseAnonKey ? 'Present' : 'Missing',
    });
  }
}

export { supabase };
