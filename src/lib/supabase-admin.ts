import { createClient } from '@supabase/supabase-js';

// Create a Supabase client with the service role key for admin operations
// This should ONLY be used in server-side code (API routes)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Only create the admin client if server-side and the service key exists
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export { supabaseAdmin }; 