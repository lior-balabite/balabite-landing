// Test-only stand-in for the two upstreams POST /api/waitlist talks to:
//   - Supabase PostgREST (NEXT_PUBLIC_SUPABASE_URL points here)
//   - Resend           (RESEND_BASE_URL points here)
// Tests switch behaviour with POST /__mode and read what the route sent with
// GET /__calls. Nothing here talks to a real service.
import http from 'node:http';

const PORT = Number(process.env.WAITLIST_MOCK_PORT || 54399);

let mode = { db: 'ok', resend: 'ok' };
let calls = [];

function readBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => resolve(body));
  });
}

function send(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
  const raw = await readBody(req);

  if (url.pathname === '/__health') return send(res, 200, { ok: true });
  if (url.pathname === '/__mode' && req.method === 'POST') {
    mode = { ...mode, ...JSON.parse(raw || '{}') };
    calls = [];
    return send(res, 200, mode);
  }
  if (url.pathname === '/__calls') return send(res, 200, calls);

  let parsed = null;
  try {
    parsed = raw ? JSON.parse(raw) : null;
  } catch {
    parsed = raw;
  }
  calls.push({ method: req.method, path: url.pathname, body: parsed });

  // Supabase: table insert
  if (url.pathname === '/rest/v1/waitlist' && req.method === 'POST') {
    if (mode.db === 'ok') return send(res, 201, [{ id: 'db-row-1' }]);
    return send(res, 503, { code: 'PGRST000', message: 'mock: database unavailable' });
  }
  // Supabase: rpc the route calls on the service-role fallback
  if (url.pathname.startsWith('/rest/v1/rpc/')) {
    return send(res, 404, { code: 'PGRST202', message: 'mock: function not found' });
  }
  // Resend: send email
  if (url.pathname === '/emails' && req.method === 'POST') {
    if (mode.resend === 'ok') return send(res, 200, { id: `mock-email-${calls.length}` });
    return send(res, 403, { statusCode: 403, name: 'validation_error', message: 'mock: domain not verified' });
  }

  return send(res, 404, { message: `mock: no handler for ${req.method} ${url.pathname}` });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`waitlist mock upstream on ${PORT}`);
});
