'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const COOKIE_NAME = 'balabite_investors_auth';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

function getPassword(): string {
  return process.env.INVESTORS_PASSWORD || 'balabite-preseed-2026';
}

export async function authenticate(formData: FormData) {
  const password = formData.get('password')?.toString() || '';
  if (password !== getPassword()) {
    redirect('/pitch?error=1');
  }
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, 'ok', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
  redirect('/pitch');
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value === 'ok';
}
