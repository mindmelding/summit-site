# Summit waitlist

A Cloudflare Worker at `mindmelding.dev/summit/api/waitlist` that saves beta sign-ups to a D1 database. The site's form posts here. It stores the email, the date and where it came from, and nothing else (no IP addresses).

## One-time setup

From this folder, signed in to Cloudflare (`npx wrangler login`):

```bash
npx wrangler d1 create summit-waitlist          # copy the database_id it prints into wrangler.jsonc
npx wrangler d1 migrations apply summit-waitlist --remote
npx wrangler deploy
```

D1 and Workers both fit in Cloudflare's free plan at this size.

## See who signed up

```bash
npx wrangler d1 execute summit-waitlist --remote --command "SELECT email, created_at FROM signups ORDER BY created_at"
```

Add `--json > signups.json` to export them, for example to invite people to TestFlight.

## Try it locally

```bash
npx wrangler d1 migrations apply summit-waitlist --local
npx wrangler dev
curl -i -X POST -d email=you@example.com http://localhost:8787/
```
