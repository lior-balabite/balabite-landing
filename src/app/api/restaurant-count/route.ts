import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase credentials in environment variables");
  }
  
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    global: {
      headers: {
        Authorization: `Bearer ${supabaseServiceKey}`
      }
    }
  });
}

export async function GET() {
  try {
    const supabase = getSupabaseClient();
    
    // Get count from the waitlist table
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error("Error fetching restaurant count:", error);
      // Return a fallback count if there's an error
      return NextResponse.json({ count: 120 });
    }
    
    // Add base count (120) to the actual count
    const totalCount = (count || 0) + 120;
    
    return NextResponse.json({ count: totalCount });
  } catch (error) {
    console.error("Restaurant count error:", error);
    // Return a fallback count if there's an error
    return NextResponse.json({ count: 120 });
  }
} 