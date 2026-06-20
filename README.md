# Costa Franca Tours

A bilingual (ES/EN) tourism platform for a Mazatlán-based tour operator. The site showcases curated boat, adventure, and cultural tours with full booking capability via WhatsApp, a travel blog, and an SEO-optimised catalog — all served from Cloudflare's edge.

Developed by Juan Wong.

---

## Note on Usage

This repository contains proprietary code developed for a commercial client. It is publicly viewable for portfolio evaluation only. No license is granted for reuse, modification, or distribution.

---

## Tech Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router, static export via `generateStaticParams`) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 with `@tailwindcss/typography` |
| Deployment | Cloudflare Pages via `@opennextjs/cloudflare` |
| UI Components | Radix UI primitives (`react-dialog`, `react-slot`) with `clsx` and `tailwind-merge` |
| Icons | Lucide React |
| Lightbox | yet-another-react-lightbox |

---

## Project Structure

The application follows the Next.js App Router convention with `@/*` import aliases.

```
src/
├── middleware.ts               # Locale routing — rewrites / → /es, passes /en through
├── app/
│   ├── layout.tsx              # Root layout — metadataBase, icons, globals.css
│   ├── not-found.tsx           # Static bilingual 404
│   ├── sitemap.ts              # Dynamic XML sitemap — all pages in both languages
│   ├── robots.ts               # robots.txt generation
│   ├── manifest.ts             # PWA web manifest
│   ├── globals.css             # Tailwind theme — navy / gold / teal design tokens
│   └── [lang]/                 # Dynamic locale segment ("es" | "en")
│       ├── layout.tsx          # Lang layout — html/body, LangProvider, Navbar, Footer
│       ├── page.tsx            # Homepage — hero video, featured tours, CTA band
│       ├── tours/              # Tour listing + [slug] detail pages
│       ├── catalog/            # Category landing page
│       ├── blog/               # Blog listing + [slug] article pages
│       ├── contact/            # Contact page
│       ├── privacidad/         # Privacy notice
│       └── terminos/           # Terms and conditions
├── components/                 # Shared UI (Navbar, Footer, TourCard, BookingForm,
│                               #   BookingDrawer, HeroVideo, WhatsAppPill, TourCarousel,
│                               #   PageTransition, RevealSection, ShareButton, …)
├── context/
│   └── LangContext.tsx         # Client-side language context — reads initialLang from server
└── lib/
    ├── i18n.ts                 # Bilingual dictionary + getT / useT / withLang helpers
    ├── seo.ts                  # hreflangAlternates helper
    ├── schema.ts               # JSON-LD builders (TouristTrip, FAQPage, Article)
    ├── tours.ts                # Tour data layer — typed Tour interface + filter helpers
    ├── posts.ts                # Blog post data layer — typed BlogPost interface
    └── utils.ts                # safeJsonLd + shared utilities
```

---

## Key Features

**URL-based i18n** — language is determined entirely by the URL. Spanish is served unprefixed (`/tours`), English under `/en` (`/en/tours`). Every page exists as two distinct, crawlable addresses with correct canonical and hreflang tags. The language switcher in the navbar links directly to the alternate URL so search engines can discover and follow both versions.

**Hero video** — adaptive `<video>` serving `.webm` / `.mp4` with poster fallbacks for mobile and desktop.

**Booking flow** — desktop sidebar form + sticky mobile drawer, WhatsApp deep-link with a pre-filled tour / date / pax message.

**Structured data** — TravelAgency JSON-LD in the lang layout; TouristTrip + FAQPage on every tour page; Article on every blog post. All schema URLs resolve to the correct locale.

**PWA** — full icon set (48 → 512 px), `manifest.webmanifest`, and `theme-color`.

**Security headers** — CSP, HSTS, X-Frame-Options, and Permissions-Policy set in `next.config.ts`.

**Performance** — local woff2 fonts preloaded, hero poster images preloaded with `fetchpriority="high"`, Next.js Image with AVIF + WebP output, `minimumCacheTTL` 7 days.

**Dynamic sitemap** — auto-includes all tour slugs and blog post slugs for both languages, with correct `changeFrequency` and `priority` values.

---

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin (e.g. `https://costafrancatours.com`) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number without `+` (e.g. `526691234567`) |
| `NEXT_PUBLIC_R2_HOSTNAME` | Cloudflare R2 public hostname for remote images (optional) |

---

## Development

```bash
npm install
npm run dev          # Next.js dev server (localhost:3000)
                     # Spanish → localhost:3000
                     # English → localhost:3000/en
```

---

## Deployment (Cloudflare Pages)

```bash
npm run pages:build  # Builds via @opennextjs/cloudflare
npm run deploy       # Deploys to Cloudflare Pages with Wrangler
```

The Wrangler project name is `mexico-tours-platform`. The `compatibility_date` is `2026-04-16` with the `nodejs_compat` flag enabled.

---

Juan Wong
juancwxng@gmail.com
