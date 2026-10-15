import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { saveSubmissionToFile } from './backup';
import { getWelcomeEmailTemplate, getAdminNotificationTemplate } from './templates';

// Initialize Resend with proper error handling
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

// Admin email to receive notifications
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@balabite.ai';

// Slack webhook for real-time notifications (optional)
const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK_URL;

// Data validation schema
const waitlistSchema = z.object({
  restaurantName: z.string().min(1, "Restaurant name is required"),
  ownerName: z.string().min(1, "Owner name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Valid phone number is required"),
  restaurantType: z.string().min(1, "Restaurant type is required"),
  location: z.string().min(1, "Location is required"),
  message: z.string().optional(),
});

// Define the type based on the schema
type WaitlistFormData = z.infer<typeof waitlistSchema>;

// Initialize Supabase client with better error handling
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

// Get anonymous client for public operations
function getAnonClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase credentials in environment variables");
  }
  
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    global: {
      headers: {
        Authorization: `Bearer ${supabaseAnonKey}`,
        apikey: supabaseAnonKey
      }
    }
  });
}

// Send email helper function with error handling
interface EmailOptions {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  cc?: string | string[];
  bcc?: string | string[];
}

// Resend's SDK does not throw on an API failure: it resolves to
// { data: null, error }. A send counts only when Resend returned no error AND
// an email id (i.e. Resend accepted the message and holds it in its log).
async function sendEmail(options: EmailOptions): Promise<{ accepted: boolean; id?: string }> {
  if (!resend) {
    console.error("Resend API key not configured");
    return { accepted: false };
  }

  try {
    const { data, error } = await resend.emails.send(options);
    if (error || !data?.id) {
      console.error(`Resend rejected email to ${options.to}:`, error ?? 'no email id returned');
      return { accepted: false };
    }
    console.log(`Email accepted by Resend for ${options.to}`, data.id);
    return { accepted: true, id: data.id };
  } catch (error) {
    console.error(`Failed to send email to ${options.to}:`, error);
    return { accepted: false };
  }
}

export async function POST(request: Request) {
  let databaseSuccess = false;
  let fileBackupSuccess = false;
  let emailResults = {
    welcome: false,
    admin: false
  };
  
  try {
    const rawData = await request.json();
    
    // Validate data
    const result = waitlistSchema.safeParse(rawData);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.format() },
        { status: 400 }
      );
    }

    const data = result.data as WaitlistFormData;
    let submissionId = "local-" + Date.now();
    
    // ALWAYS save to the file-based backup first as a reliable fallback
    const fileResult = await saveSubmissionToFile(data);
    fileBackupSuccess = fileResult.success;
    console.log("File backup result:", fileBackupSuccess ? "SUCCESS" : "FAILED");
    
    // DATABASE MODE - Set to true since Supabase permissions are fixed
    const USE_DATABASE = true;
    
    if (USE_DATABASE) {
      // Try the database insertion using anon key first (based on error logs)
      try {
        console.log("Attempting with ANON key first (more likely to work with RLS)...");
        const anonSupabase = getAnonClient();
        
        const { data: anonInsertData, error: anonError } = await anonSupabase
          .from('waitlist')
          .insert([
            {
              restaurant_name: data.restaurantName,
              owner_name: data.ownerName,
              email: data.email,
              phone: data.phone,
              restaurant_type: data.restaurantType,
              location: data.location,
              message: data.message || '',
              status: 'new',
            },
          ])
          .select();
          
        if (anonError) {
          console.error("ANON key insertion failed:", anonError);
          
          // Fall back to service role if anon fails
          console.log("Falling back to service role key...");
          const supabase = getSupabaseClient();
          
          // First check if the table exists and create it if needed
          const { error: schemaError } = await supabase.rpc('check_and_create_waitlist_table', {});
          
          if (schemaError) {
            console.log("Schema check/creation failed:", schemaError);
          }
          
          // Attempt to insert using service role
          const { data: insertData, error: dbError } = await supabase
            .from('waitlist')
            .insert([
              {
                restaurant_name: data.restaurantName,
                owner_name: data.ownerName,
                email: data.email,
                phone: data.phone,
                restaurant_type: data.restaurantType,
                location: data.location,
                message: data.message || '',
                status: 'new',
              },
            ])
            .select();
            
          if (dbError) {
            console.error("Service role insertion also failed:", dbError);
            databaseSuccess = false;
          } else {
            console.log("Service role insertion successful");
            databaseSuccess = true;
            submissionId = insertData?.[0]?.id || submissionId;
          }
        } else {
          console.log("ANON key insertion successful");
          databaseSuccess = true;
          submissionId = anonInsertData?.[0]?.id || submissionId;
        }
      } catch (dbError) {
        console.error("All database insertion attempts failed:", dbError);
        databaseSuccess = false;
      }
    } else {
      // File-only mode - Skip database operations entirely
      console.log("Running in file-only mode - skipping database operations");
      databaseSuccess = false;
    }
    
    // Notify the admin first. When the database write failed, an admin email
    // that Resend ACCEPTED (awaited, no error, an email id) is the only other
    // place this signup exists, so it is the only fallback that counts as
    // "recorded". The file backup does not count: on Vercel the deployment
    // filesystem is read-only/ephemeral, so a write there is not durable.
    const adminEmailResult = await sendEmail({
      from: 'BalaBite Waitlist <notifications@waitlist.balabite.ai>',
      to: ADMIN_EMAIL,
      subject: `New Waitlist Signup: ${data.restaurantName}`,
      html: getAdminNotificationTemplate(data, submissionId),
    });
    emailResults.admin = adminEmailResult.accepted;

    const recordedVia: 'database' | 'admin_email' | null = databaseSuccess
      ? 'database'
      : emailResults.admin
        ? 'admin_email'
        : null;

    // Only welcome someone onto a list they are actually on.
    if (recordedVia) {
      const welcomeEmailResult = await sendEmail({
        from: 'BalaBite AI <hello@waitlist.balabite.ai>',
        to: data.email,
        subject: 'WELCOME TO THE FUTURE OF DINING',
        html: getWelcomeEmailTemplate(data),
      });
      emailResults.welcome = welcomeEmailResult.accepted;
    }

    // Send Slack notification if webhook is configured (also on failure, so a
    // person sees an unrecorded signup)
    if (SLACK_WEBHOOK) {
      try {
        await fetch(SLACK_WEBHOOK, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: `${recordedVia ? '🎉 *New Waitlist Signup*' : '🚨 *Waitlist signup NOT RECORDED (visitor was shown an error)*'}\n*Restaurant:* ${data.restaurantName}\n*Owner:* ${data.ownerName}\n*Location:* ${data.location}\n*Type:* ${data.restaurantType}\n*Email:* ${data.email}\n*Phone:* ${data.phone}\n*Storage:* ${databaseSuccess ? 'Database ✅' : 'Database ❌'} | ${fileBackupSuccess ? 'File Backup ✅' : 'File Backup ❌'} | *Emails:* ${emailResults.welcome ? 'Welcome ✅' : 'Welcome ❌'} | ${emailResults.admin ? 'Admin ✅' : 'Admin ❌'}`,
          }),
        });
      } catch (slackError) {
        console.error("Slack notification failed:", slackError);
      }
    }

    if (!recordedVia) {
      console.error('Waitlist signup was not recorded: database insert failed and the admin email was not accepted');
      return NextResponse.json(
        {
          success: false,
          error: 'We could not save your signup right now. Please try again later or email hello@balabite.ai.',
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist',
      recordedVia,
      storage: {
        database: databaseSuccess,
        fileBackup: fileBackupSuccess
      },
      emails: emailResults,
      id: submissionId
    });
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
}
