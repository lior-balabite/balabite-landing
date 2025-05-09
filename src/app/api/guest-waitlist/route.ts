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

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const supabase = getSupabaseClient();
    
    // Check if email already exists in the guest_waitlist table
    const { data: existingEntry } = await supabase
      .from('guest_waitlist')
      .select('*')
      .eq('email', email)
      .maybeSingle();
    
    if (existingEntry) {
      return NextResponse.json(
        { message: "You're already on our waitlist!" }, 
        { status: 200 }
      );
    }
    
    // Insert new entry
    const { error } = await supabase
      .from('guest_waitlist')
      .insert({
        email,
        signed_up_at: new Date().toISOString()
      });
    
    if (error) {
      console.error("Error adding to guest waitlist:", error);
      return NextResponse.json(
        { error: "Failed to join waitlist" }, 
        { status: 500 }
      );
    }
    
    // Return success
    return NextResponse.json(
      { message: "Successfully joined the guest app waitlist!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Guest waitlist error:", error);
    return NextResponse.json(
      { error: "Server error" }, 
      { status: 500 }
    );
  }
} 