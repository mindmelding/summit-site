# Summit marketing site

One static page (`index.html`) with no build step, styled to match the other mindmelding product sites (DM Sans, pill buttons, pastel cards). CSS and JS are inline; images are in `assets/`; only DM Sans and DM Mono load from Google Fonts. Pushing to `main` deploys it with GitHub Pages (`.github/workflows/pages.yml`).

## Preview

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```

## Before launch

- **Waitlist:** replace `FORMSPREE_ID` in the form's `action` with the id from formspree.io. Until then the form tells people sign-ups open soon.
- **App Store:** once the app has an id, uncomment the `apple-itunes-app` meta tag in `<head>` and point the hero button at the App Store.
- **Links:** Guide, Support and Privacy point at the docs on mindmelding.dev/summit/docs. App Store Connect needs the privacy and support URLs.
