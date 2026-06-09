# Costa Franca Tours

A bilingual (ES/EN) tourism platform for a Mazatlán-based tour operator. The site showcases curated boat, adventure, and cultural tours with full booking capability via WhatsApp, a travel blog, and an SEO-optimised catalog — all served from Cloudflare's edge.

Developed by Juan Wong.

## Note on Usage

This repository contains proprietary code developed for a commercial client. It is publicly viewable for portfolio evaluation only. No license is granted for reuse, modification, or distribution.

## Tech Stack

- **Framework:** Next.js 15 (App Router, static export via `generateStaticParams`)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 with `@tailwindcss/typography`
- **Deployment:** Cloudflare Pages via `@opennextjs/cloudflare`
- **UI Components:** Radix UI primitives (`react-dialog`, `react-slot`) with `clsx` and `tailwind-merge`
- **Icons:** Lucide React
- **Lightbox:** `yet-another-react-lightbox`

## Project Structure

The application follows the Next.js App Router convention with `@/*` import aliases.

```
src/
├── app/
│   ├── layout.tsx          # Root layout — global metadata, JSON-LD, fonts, CSP
│   ├── page.tsx            # Homepage — hero video, featured tours, CTA band
│   ├── tours/              # Tour listing + [slug] detail pages
│   ├── catalog/            # Category landing page
│   ├── blog/               # Blog listing + [slug] article pages
│   ├── contact/            # Contact page
│   ├── privacidad/         # Privacy notice
│   ├── terminos/           # Terms and conditions
│   ├── sitemap.ts          # Dynamic XML sitemap (tours + blog posts)
│   ├── robots.ts           # robots.txt generation
│   ├── manifest.ts         # PWA web manifest
│   └── globals.css         # Tailwind theme — navy / gold / teal design tokens
├── components/             # Shared UI (Navbar, Footer, TourCard, BookingForm,
│   │                         BookingDrawer, HeroVideo, WhatsAppPill, TourCarousel,
│   │                         PageTransition, RevealSection, ShareButton, …)
├── context/
│   └── LangContext.tsx     # Client-side language context (ES ↔ EN toggle)
└── lib/
    ├── i18n.ts             # Bilingual dictionary + getT / useT helpers
    ├── tours.ts            # Tour data layer — typed Tour interface + filter helpers
    ├── posts.ts            # Blog post data layer — typed BlogPost interface
    └── utils.ts            # safeJsonLd + shared utilities
```

## Key Features

- **Bilingual architecture** — language persisted in a `cft_lang` cookie; all UI strings resolved server-side via `getT(lang)`, client-side via `useT()`
- **Hero video** — adaptive `<video>` serving `.webm` / `.mp4` with poster fallbacks for mobile and desktop
- **Booking flow** — desktop drawer + sticky mobile panel, WhatsApp deep-link with pre-filled tour/date/pax message
- **Structured data** — `TravelAgency` JSON-LD in the root layout; `Product` (with `Offer`) on every tour page; `Article` on every blog post
- **PWA** — full icon set (48 → 512 px), `manifest.webmanifest`, and `theme-color`
- **Security headers** — CSP, HSTS, X-Frame-Options, and Permissions-Policy in both `next.config.ts` (for Node/Hetzner) and `public/_headers` (Cloudflare Pages)
- **Performance** — local `woff2` fonts preloaded, hero poster images preloaded with `fetchpriority="high"`, Next.js Image with AVIF + WebP output, `minimumCacheTTL` 7 days
- **Dynamic sitemap** — auto-includes all tour slugs and blog post slugs with correct `changeFrequency` and `priority` values

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin (e.g. `https://www.costafrancatours.com`) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number without `+` (e.g. `526691234567`) |

## Development

```bash
npm install
npm run dev          # Next.js dev server (localhost:3000)
```

## Deployment (Cloudflare Pages)

```bash
npm run pages:build  # Builds via @opennextjs/cloudflare
npm run deploy       # Deploys to Cloudflare Pages with Wrangler
```

The Wrangler project name is `mexico-tours-platform`. The `compatibility_date` is `2026-04-16` with the `nodejs_compat` flag enabled. Cloudflare Images binding (`IMAGES`) is active for edge image optimisation.

---

Juan Wong  
juancwxng@gmail.com
