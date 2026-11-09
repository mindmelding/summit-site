# summit-site

Marketing site for the Summit iPhone app at https://mindmelding.dev/summit, plus the waitlist Worker and the customer docs (`help/`). See README.md for preview and deploy. Deploys only through the "Deploy to Cloudflare" workflow, never from a Mac.

## Learnings

- Self-host fonts in `assets/fonts/` (the same Latin subsets the app bundles), because Google Fonts added a third-party request and cost about ten Lighthouse Performance points.
