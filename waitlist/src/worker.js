// POST an email, get it on the Summit beta list.
// Accepts a normal form post or JSON: { email, company }.
// "company" is a hidden honeypot field; bots fill it in, people don't.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function cors(request, env) {
  const origin = request.headers.get('Origin') || '';
  const allowed = (env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim());
  return allowed.includes(origin)
    ? { 'Access-Control-Allow-Origin': origin, 'Vary': 'Origin' }
    : {};
}

function reply(status, body, headers) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}

async function readFields(request) {
  const type = request.headers.get('Content-Type') || '';
  if (type.includes('application/json')) return await request.json();
  const form = await request.formData();
  return Object.fromEntries(form);
}

export default {
  async fetch(request, env) {
    const headers = cors(request, env);

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: { ...headers, 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type' },
      });
    }
    if (request.method !== 'POST') return reply(405, { ok: false, error: 'method' }, headers);

    let fields;
    try {
      fields = await readFields(request);
    } catch {
      return reply(400, { ok: false, error: 'body' }, headers);
    }

    // Honeypot filled in: pretend it worked so the bot moves on.
    if (fields.company) return reply(200, { ok: true }, headers);

    const email = String(fields.email || '').trim().toLowerCase();
    if (email.length > 254 || !EMAIL.test(email)) {
      return reply(400, { ok: false, error: 'email' }, headers);
    }

    // Signing up twice is fine; the first date is kept.
    await env.DB.prepare('INSERT OR IGNORE INTO signups (email, source) VALUES (?, ?)')
      .bind(email, String(fields.source || 'site').slice(0, 40))
      .run();

    return reply(200, { ok: true }, headers);
  },
};
