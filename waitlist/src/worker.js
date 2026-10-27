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

// Count the signup in PostHog. Never sends the email, IP or user agent;
// distinct_id is a random UUID, so this counts signups and identifies no one.
async function capture(env, { source, newSignup, isTest }) {
  try {
    await fetch(`${env.POSTHOG_HOST || 'https://us.i.posthog.com'}/i/v0/e/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: env.POSTHOG_KEY,
        event: 'waitlist_signup',
        distinct_id: crypto.randomUUID(),
        properties: { source, new_signup: newSignup, is_test: isTest, $process_person_profile: false, $lib: 'summit-waitlist-worker' },
      }),
    });
  } catch {
    // Tracking must never break a signup.
  }
}

async function readFields(request) {
  const type = request.headers.get('Content-Type') || '';
  if (type.includes('application/json')) return await request.json();
  const form = await request.formData();
  return Object.fromEntries(form);
}

export default {
  async fetch(request, env, ctx) {
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
    const source = String(fields.source || 'site').slice(0, 40);
    const result = await env.DB.prepare('INSERT OR IGNORE INTO signups (email, source) VALUES (?, ?)')
      .bind(email, source)
      .run();

    if (env.POSTHOG_KEY) {
      const isTest = env.IS_TEST === 'true' || request.headers.get('Origin') !== 'https://mindmelding.dev';
      ctx.waitUntil(capture(env, { source, newSignup: (result?.meta?.changes ?? 0) > 0, isTest }));
    }

    return reply(200, { ok: true }, headers);
  },
};
