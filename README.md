# Pipecorn V1

Popcorn-themed Next.js landing page — Pipecorn UX/UI × ProntoGTM content.

Live preview: run locally (see below). Production deploy TBD.

---

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript 5**
- **Tailwind v4** (PostCSS plugin) — used alongside hand-written brand CSS in `app/globals.css`
- **react-simple-maps + d3-geo** — interactive Worldwide Coverage map
- Custom pixel-art assets + Mickey "Hang Loose" cursors

---

## Getting started

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

---

## Project structure

```
app/
├── layout.tsx              # Root layout (announcement + Nav + content + Footer)
├── page.tsx                # Homepage (Hero → Treadmill → Pillars → Testimonials → Coverage → FAQ → Compliance → FinalCTA)
├── globals.css             # All brand styles (CSS vars, button utilities, section styles, animations)
└── components/
    ├── Announcement.tsx
    ├── Nav.tsx             # Logo + Product (mega menu) / Pricing / Resources (dropdown) / Login / Book a demo
    ├── Hero.tsx            # Rotating headline, popcorn bucket sticker, CTA pair
    ├── LogosWall.tsx       # 16 customer logos with hover case-study popups
    ├── logos-data.ts       # Data for the logo wall
    ├── Treadmill.tsx       # Empty bucket → full bucket conveyor animation (IntersectionObserver-triggered)
    ├── Pillars.tsx         # 4-step product timeline (Sourcing / Enrichment / Signals / Delivery)
    ├── Testimonials.tsx    # Wall of 15 (3 hero cards + 12 LinkedIn-style cards)
    ├── Coverage.tsx        # Wraps CoverageMap with section title + intro
    ├── CoverageMap.tsx     # Real world geography (react-simple-maps), 50 countries, industry chart
    ├── FAQ.tsx             # 6-Q accordion (single-open behaviour)
    ├── Compliance.tsx      # SOC 2 / GDPR / CCPA cards
    ├── FinalCTA.tsx        # Dark "Ready to win your market?" panel
    └── Footer.tsx          # 5-column dark footer
public/
└── assets/                 # Pixel art (popcorn bucket, treadmill, telephone), Mickey cursors
```

---

## Brand tokens

Defined as CSS custom properties in `app/globals.css`:

```
--butter:     #FFD600
--cream:      #FFF8E7
--dark:       #251E00
--mid:        #5C4D00
--soft:       #8C7A50
--red:        #D42B2B
--red-dark:   #A01E1E
--red-light:  #E84848
```

Fonts: **Outfit** (display, 900 weight headlines) + **Space Grotesk** (UI/body) from Google Fonts.

---

## Conventions

- **One CSS file**: All component styles live in `app/globals.css`. Sections are commented blocks. Keep it that way unless we move to CSS modules deliberately.
- **Client vs Server Components**: `'use client'` only where state/effects are required (Nav, Treadmill, Pillars reveal, FAQ accordion, CoverageMap). Everything else stays Server.
- **Images**: pixel-art assets in `/public/assets/`, referenced as `/assets/...` (absolute path) so Next/Turbopack doesn't try to resolve them as modules from CSS.
- **External photos**: Unsplash URLs for testimonial portraits — replace with real customer photos before going live.

---

## Status

V1 homepage only — multi-page routes (`/pricing`, `/case-studies`, `/blog`, `/free-tools`, `/integrations`, `/live-data`, `/track-job-changes`, `/waterfall-enrichment`) are linked in the nav but not yet built.
