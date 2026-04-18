# tobvision.de

TobVision landing page. Astro 6 + Tailwind 4, static output, deployed via Netlify.

## Stack

- Astro 6 (static, islands, i18n)
- Tailwind 4 (Vite plugin, design tokens in `src/styles/global.css`)
- Self-hosted woff2 fonts (Work Sans + DM Sans, Latin-Extended subset)
- Wistia lazy-load facade (GDPR-compliant, consent via play-click)
- TidyCal inline embed on `/buchen/` (no popup)
- Cloudflare Web Analytics (optional, env-gated)

## Develop

```bash
npm install
npm run dev    # http://localhost:4321
npm run build  # outputs to dist/
npm run preview
```

## Environment variables

`PUBLIC_CLOUDFLARE_BEACON_TOKEN` (optional) — Cloudflare Web Analytics beacon token. Set in Netlify dashboard under Site settings → Build & deploy → Environment. Without it, the analytics tag is silently omitted; site ships fine.

## Structure

```
src/
  assets/          Optimized images (Astro Image)
  components/      Section + UI components
    sections/      S1-S9 section components + Wistia facade
  content/         i18n content dictionaries (de.ts, en.ts)
  i18n/            Locale helpers
  layouts/         BaseLayout (meta, hreflang, JSON-LD)
  pages/           Routes (de/*, en/*, root redirect)
  styles/          global.css with @theme design tokens
public/
  fonts/           Self-hosted woff2 (preloaded)
  _redirects       Netlify routing + 404 fallback
  og-image.png     1200x630 LinkedIn/Twitter share image
  favicon.{svg,ico}
scripts/
  generate-og-image.mjs   Regenerate OG image from SVG
```

## Deployment

Push to `main` → Netlify auto-deploys. Build command `npm run build`, publish directory `dist/`. See `netlify.toml` for build config, headers, caching.

DNS (manual, one-time): A record `@` → Netlify load balancer, CNAME `www` → `*.netlify.app`.

## Content updates

All copy lives in `src/content/de.ts` (German) and `src/content/en.ts` (English placeholder until V1.1). Do not paraphrase — voice is locked per `character-voice.md` audit.

## V1.1 roadmap

Replace `src/content/en.ts` placeholder with full English translation. No component changes required — components already locale-aware.
