import { createClient } from '@supabase/supabase-js';

// Lazy initialization pattern - only throws if actually used without vars
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// The client is created, but won't be active if keys are missing
// We let it sit quietly until actually needed.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
);

export default supabase;
