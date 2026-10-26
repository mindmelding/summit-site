# Summit marketing site

One static page (`index.html`) with no build step, styled in the app's 1.1 "Switchbacks" look: white ground, ink text, orange/sky/gold tints and fills, chunky pressable buttons with a solid bottom edge, Rubik for text and Barlow Condensed ExtraBold Italic for headlines and numbers, plus a small decorative switchbacks trail in the hero. The tokens match `Summit/Shared/Theme.swift` and `docs/switchbacks.md` in mindmelding/summit (bright orange/sky/gold are fills only; text uses the darker AA shades). CSS and JS are inline; images are in `assets/` (the screenshots still show the 1.0 look). The fonts are self-hosted from `assets/fonts/`: the same Latin subsets the app bundles, as WOFF2, so the page makes no third-party requests. It is served at https://mindmelding.dev/summit/ by a Cloudflare Worker (`wrangler.jsonc`, `site/worker.js`). Deploy from GitHub with the **Deploy to Cloudflare** workflow (Actions tab, Run workflow, pick `site`, `waitlist`, `both`, `docs` or `all`); it needs the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets. `npx wrangler@4 deploy` from the repo root still works as a fallback. (`.github/workflows/pages.yml` can also publish to GitHub Pages, if Actions is turned on.)

The customer docs now live in `help/` here and deploy with the same workflow (target `docs`).

## Preview

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```

## Before launch

- **Waitlist:** the form posts to the `summit-waitlist` Worker in [`waitlist/`](waitlist/README.md), which saves emails to Cloudflare D1. It needs a one-time setup and deploy before sign-ups work.
- **App Store:** once the app has an id, uncomment the `apple-itunes-app` meta tag in `<head>` and point the hero button at the App Store.
- **Links:** Guide, Support and Privacy point at the docs on mindmelding.dev/summit/docs. App Store Connect needs the privacy and support URLs.
