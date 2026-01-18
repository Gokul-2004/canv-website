// Use Supabase REST API directly to avoid bundling issues
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

interface SupabaseResponse<T> {
  data: T | null;
  error: { message: string } | null;
}

// Simple Supabase client using REST API
export const supabase = {
  from: (table: string) => ({
    insert: (records: Record<string, unknown>[]) => ({
      select: async (): Promise<SupabaseResponse<Record<string, unknown>[]>> => {
        if (!supabaseUrl || !supabaseAnonKey) {
          return {
            data: null,
            error: { message: 'Missing Supabase environment variables' },
          };
        }

        try {
          const response = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseAnonKey,
              'Authorization': `Bearer ${supabaseAnonKey}`,
              'Prefer': 'return=representation',
            },
            body: JSON.stringify(records),
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error('Supabase REST error:', errorText);
            return {
              data: null,
              error: { message: `HTTP ${response.status}: ${errorText}` },
            };
          }

          const data = await response.json();
          return { data, error: null };
        } catch (err) {
          console.error('Supabase fetch error:', err);
          return {
            data: null,
            error: { message: err instanceof Error ? err.message : 'Unknown error' },
          };
        }
      },
    }),
  }),
};

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
