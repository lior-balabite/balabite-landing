'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getNraSupabase, nraSupabaseConfigured, NRA_LEADS_TABLE } from '@/lib/nra-supabase';

/**
 * Auth + mutations for the owner-facing NRA lead list.
 *
 * Deliberately lightweight — a passcode-gated, httpOnly-cookie session, the
 * same shape as the /pitch deck gate. Full auth is overkill for a 4-day show,
 * but because this view exposes prospect PII the gate FAILS CLOSED: if
 * NRA_ADMIN_PASSCODE is unset, nobody gets in.
 */

const COOKIE_NAME = 'balabite_nra_admin';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // one week — covers the whole show

function configuredPasscode(): string | null {
  const pass = process.env.NRA_ADMIN_PASSCODE;
  return pass && pass.length >= 6 ? pass : null;
}

export async function authenticate(formData: FormData) {
  const passcode = formData.get('passcode')?.toString() ?? '';
  const expected = configuredPasscode();

  if (!expected || passcode !== expected) {
    redirect('/admin/nra?error=1');
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, 'ok', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: COOKIE_MAX_AGE,
    path: '/admin/nra',
  });
  redirect('/admin/nra');
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value === 'ok';
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete({ name: COOKIE_NAME, path: '/admin/nra' });
  redirect('/admin/nra');
}

/** Persist Lior's triage note for a lead. Verifies the session first. */
export async function updateNote(
  id: string,
  note: string
): Promise<{ ok: boolean; error?: string }> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: 'Not authorized' };
  }
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return { ok: false, error: 'Bad lead id' };
  }
  if (!nraSupabaseConfigured()) {
    return { ok: false, error: 'Storage not configured' };
  }

  const trimmed = note.slice(0, 2000);
  try {
    const supabase = getNraSupabase();
    const { error } = await supabase
      .from(NRA_LEADS_TABLE)
      .update({ note: trimmed || null })
      .eq('id', id);
    if (error) {
      console.error('[admin/nra] updateNote error:', error);
      return { ok: false, error: 'Could not save' };
    }
    return { ok: true };
  } catch (err) {
    console.error('[admin/nra] updateNote threw:', err);
    return { ok: false, error: 'Could not save' };
  }
}
