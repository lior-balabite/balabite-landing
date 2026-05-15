'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// ————————————————————————————————————————————————————————————
// Soft access gate for the booth surfaces (/booth-tv, /demo).
// These show product/demo content that isn't meant to be openly public
// or crawlable. Two ways through:
//   1. ?key=<BOOTH_ACCESS_KEY> in the URL — for the kiosk TV: bookmark
//      the URL with the key and it never has to be re-entered.
//   2. the passphrase form — sets a 30-day cookie, for Lior's laptop.
// Not Fort Knox — a deliberate soft gate that keeps the surfaces out of
// public/crawler reach without making the booth painful to run.
// ————————————————————————————————————————————————————————————

const COOKIE_NAME = 'balabite_booth_auth';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function boothKey(): string {
  return process.env.BOOTH_ACCESS_KEY || 'balabite-nra-2026';
}

export async function authenticateBooth(formData: FormData) {
  const key = formData.get('key')?.toString().trim() ?? '';
  const next = formData.get('next')?.toString() || '/demo';
  if (key !== boothKey()) {
    redirect(`${next}?error=1`);
  }
  const store = await cookies();
  store.set(COOKIE_NAME, 'ok', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
  redirect(next);
}

export async function isBoothAuthed(urlKey?: string): Promise<boolean> {
  if (urlKey && urlKey === boothKey()) return true;
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === 'ok';
}
