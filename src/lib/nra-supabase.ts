import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase client for the NRA lead-capture system.
 *
 * Intentionally SCOPED to its own env vars (`NRA_SUPABASE_URL` /
 * `NRA_SUPABASE_SERVICE_ROLE_KEY`) rather than the shared
 * `NEXT_PUBLIC_SUPABASE_*` vars — so this feature can't disturb, and
 * isn't disturbed by, the rest of the site. Server-side only: the
 * service-role key must never reach the browser.
 */
export function getNraSupabase(): SupabaseClient {
  const url = process.env.NRA_SUPABASE_URL;
  const serviceKey = process.env.NRA_SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      'Missing NRA Supabase credentials (NRA_SUPABASE_URL / NRA_SUPABASE_SERVICE_ROLE_KEY)'
    );
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: { Authorization: `Bearer ${serviceKey}` },
    },
  });
}

/** True when the NRA Supabase env vars are present. */
export function nraSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NRA_SUPABASE_URL && process.env.NRA_SUPABASE_SERVICE_ROLE_KEY
  );
}

export const NRA_LEADS_TABLE = 'nra_leads';
