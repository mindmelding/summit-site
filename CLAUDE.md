# summit-site

Marketing site, waitlist and customer docs for Summit, the iPhone walking app built around climb goals
(app code: mindmelding/summit). Live at https://mindmelding.dev/summit, with docs at /summit/docs.

- `index.html`: the whole landing page (inline CSS/JS, no build). Served by the `summit-site` Worker (`wrangler.jsonc`, `site/worker.js`).
- `waitlist/`: the `summit-waitlist` Worker and D1 table at /summit/api/waitlist. It sends a server-side `waitlist_signup` event to PostHog (see waitlist/README.md, Tracking).
- `help/`: customer docs, built with docs-kit into `dist-help/` and served by the `summit-docs` Worker.

## Deploy

Only when Sean says so ("deploy the site"). Deploys run from a cloud session with wrangler, never from Sean's Mac
and never through GitHub Actions. The `.github/workflows/` files are kept but not used. The session needs
the env vars `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` and network access to `api.cloudflare.com`.

```sh
npx wrangler@4 deploy                                    # site
(cd waitlist && npx wrangler@4 d1 migrations apply summit-waitlist --remote && npx wrangler@4 deploy)
npx -y github:mindmelding/docs-kit build help --out dist-help && npx wrangler@4 deploy -c help/wrangler.jsonc
```

Preview locally with `python3 -m http.server 8000`.

## How it makes money

It doesn't directly. The site turns visitors into waitlist signups now and App Store installs after launch.
Summit is free at launch, with Summit Pro ($2.99/mo) planned for about Feb 2027.

## Learnings

After each merged PR, the session that drove it adds at most one line here as "Do X, because Y" (Sean's rule,
2026-11-09). Prefer a test, lint or check if one can enforce the lesson. Skip it if nothing was learned. Keep
about 15 lines: drop the oldest or least useful, and delete any line a new one replaces.

- Keep `help`, `dist-help`, `waitlist` and `site` in `.assetsignore`, because the site Worker serves the repo root as static assets.
- Deploy only by running wrangler from a cloud session, because GitHub Actions on Sean's account are blocked for billing and Sean ruled out Actions and the Mac.
