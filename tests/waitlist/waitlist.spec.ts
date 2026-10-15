import { test, expect, type APIRequestContext, type Page } from '@playwright/test';

// POST /api/waitlist must never report success for a signup that was not
// recorded. "Recorded" = the database insert succeeded, or (fallback) the
// admin notification email was ACCEPTED by Resend. A file backup never counts.
// Upstreams are mocked by tests/waitlist/mock-upstream.mjs (see
// playwright.waitlist.config.ts).
const MOCK = 'http://127.0.0.1:54399';

type Mode = { db: 'ok' | 'fail'; resend: 'ok' | 'fail' };
type Call = { method: string; path: string; body: unknown };

async function setMode(request: APIRequestContext, mode: Mode) {
  const res = await request.post(`${MOCK}/__mode`, { data: mode });
  expect(res.ok()).toBe(true);
}

async function upstreamCalls(request: APIRequestContext): Promise<Call[]> {
  return (await request.get(`${MOCK}/__calls`)).json();
}

const signup = {
  restaurantName: 'Test Bistro',
  ownerName: 'Test Owner',
  email: 'owner@example.test',
  phone: '(555) 123-4567',
  restaurantType: 'from-landing',
  location: '1',
  message: 'test',
};

function emailsTo(calls: Call[], to: string) {
  return calls.filter(
    (c) => c.path === '/emails' && JSON.stringify((c.body as { to?: unknown })?.to) === JSON.stringify(to),
  );
}

test.describe('POST /api/waitlist', () => {
  test('database down AND admin email rejected -> 503, no success body, no welcome email', async ({ request }) => {
    await setMode(request, { db: 'fail', resend: 'fail' });
    const res = await request.post('/api/waitlist', { data: signup });
    const body = await res.json();

    expect(res.status()).toBe(503);
    expect(body.success).not.toBe(true);
    expect(typeof body.error).toBe('string');

    // The visitor must not be welcomed onto a list they are not on.
    const calls = await upstreamCalls(request);
    expect(emailsTo(calls, signup.email)).toHaveLength(0);
  });

  test('database insert succeeds -> 200 success, recorded in the database (positive control)', async ({ request }) => {
    await setMode(request, { db: 'ok', resend: 'ok' });
    const res = await request.post('/api/waitlist', { data: signup });
    const body = await res.json();

    expect(res.status()).toBe(200);
    expect(body.success).toBe(true);
    expect(body.storage.database).toBe(true);
    const calls = await upstreamCalls(request);
    expect(calls.some((c) => c.path === '/rest/v1/waitlist' && c.method === 'POST')).toBe(true);
  });

  test('database insert succeeds even when email is down -> 200 success', async ({ request }) => {
    await setMode(request, { db: 'ok', resend: 'fail' });
    const res = await request.post('/api/waitlist', { data: signup });
    expect(res.status()).toBe(200);
    expect((await res.json()).success).toBe(true);
  });

  test('database down but Resend accepts the admin email -> 200, recorded via admin email', async ({ request }) => {
    await setMode(request, { db: 'fail', resend: 'ok' });
    const res = await request.post('/api/waitlist', { data: signup });
    const body = await res.json();

    expect(res.status()).toBe(200);
    expect(body.success).toBe(true);
    expect(body.storage.database).toBe(false);
    expect(body.emails.admin).toBe(true);
    const calls = await upstreamCalls(request);
    expect(emailsTo(calls, 'admin@example.test')).toHaveLength(1);
  });

  test('invalid payload -> 400 (unchanged)', async ({ request }) => {
    await setMode(request, { db: 'ok', resend: 'ok' });
    const res = await request.post('/api/waitlist', { data: { email: 'not-an-email' } });
    expect(res.status()).toBe(400);
  });
});

async function submitFinalCta(page: Page) {
  await page.goto('/');
  const cta = page.locator('#final-cta');
  await cta.scrollIntoViewIfNeeded();
  await cta.getByText("I'm losing money but can't pinpoint where").click();
  await cta.getByRole('button', { name: 'Next' }).click();
  await cta.getByPlaceholder('e.g. Miami Squeeze').fill(signup.restaurantName);
  await cta.getByPlaceholder('e.g. Alex Rodriguez').fill(signup.ownerName);
  await cta.getByPlaceholder('alex@restaurant.com').fill(signup.email);
  await cta.getByPlaceholder('(555) 123-4567').fill('5551234567');
  await cta.getByRole('button', { name: 'Submit' }).click();
  return cta;
}

test.describe('FinalCTA (landing page form)', () => {
  test('signup not recorded -> error toast, no confirmation, form kept', async ({ page, request }) => {
    await setMode(request, { db: 'fail', resend: 'fail' });
    const cta = await submitFinalCta(page);

    await expect(page.getByText('Something went wrong. Please try again.')).toBeVisible();
    await expect(page.getByText("You're on the list!")).toHaveCount(0);
    await expect(cta.getByText(/Got it\. Your AI partner/)).toHaveCount(0);
    // The visitor keeps what they typed and can retry.
    await expect(cta.getByPlaceholder('e.g. Miami Squeeze')).toHaveValue(signup.restaurantName);
  });

  test('signup recorded -> success toast and confirmation (positive control)', async ({ page, request }) => {
    await setMode(request, { db: 'ok', resend: 'ok' });
    const cta = await submitFinalCta(page);

    await expect(page.getByText("You're on the list!")).toBeVisible();
    await expect(cta.getByText(/Got it\. Your AI partner/)).toBeVisible();
  });
});
