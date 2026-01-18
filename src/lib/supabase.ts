import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Always create a client to avoid build-time errors
// Runtime will handle missing env vars
export const supabase: SupabaseClient = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Debug logging (only in browser)
if (typeof window !== 'undefined') {
  if (supabaseUrl && supabaseAnonKey) {
    console.log('🔍 Supabase Environment Check:', {
      url: `✅ Set (${supabaseUrl.substring(0, 30)}...)`,
      key: `✅ Set (${supabaseAnonKey.substring(0, 20)}...)`,
    });
  } else {
    console.error('❌ Missing Supabase environment variables:', {
      url: supabaseUrl ? 'Present' : 'Missing',
      key: supabaseAnonKey ? 'Present' : 'Missing',
    });
  }
}
