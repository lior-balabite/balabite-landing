import { defineConfig, devices } from '@playwright/test';

// Waitlist tests run the real built app against a local mock of Supabase and
// Resend (tests/waitlist/mock-upstream.mjs). Kept apart from
// playwright.config.ts because the app must be BUILT with these env values
// (NEXT_PUBLIC_* is inlined at build time) and the mock holds global state,
// so the specs run serially. Run: npm run test:waitlist
const PORT = 3107;
const MOCK_PORT = 54399;
const MOCK_URL = `http://127.0.0.1:${MOCK_PORT}`;

const appEnv = {
  NEXT_PUBLIC_SUPABASE_URL: MOCK_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'test-anon-key-not-a-secret',
  SUPABASE_SERVICE_ROLE_KEY: 'test-service-key-not-a-secret',
  RESEND_API_KEY: 'test-resend-key-not-a-secret',
  RESEND_BASE_URL: MOCK_URL,
  ADMIN_EMAIL: 'admin@example.test',
  SLACK_WEBHOOK_URL: '',
};

export default defineConfig({
  testDir: './tests/waitlist',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium-desktop', use: { ...devices['Desktop Chrome'] } }],
  webServer: [
    {
      command: 'node tests/waitlist/mock-upstream.mjs',
      url: `${MOCK_URL}/__health`,
      env: { WAITLIST_MOCK_PORT: String(MOCK_PORT) },
      reuseExistingServer: false,
      timeout: 15_000,
    },
    {
      command: `npm run build && npx next start -p ${PORT}`,
      url: `http://localhost:${PORT}`,
      env: appEnv,
      reuseExistingServer: false,
      timeout: 300_000,
    },
  ],
});
