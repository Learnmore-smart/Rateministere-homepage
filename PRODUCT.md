# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Visitors to `rateministere.com` — recruiters, collaborators, followers of Noah's Piano Journey, and friends — arriving to learn who Noah is, see the work, and reach the channel or socials. The site is a personal homepage/portfolio, not a product app.

## Product Purpose

Noah Zixin Zhang's personal homepage. It proves two things at once: he ships real software (LearnX, Overtake.bid, OpenNotes, a ten-entry archive) and he plays in public (a piano channel with 12M+ views). Success is a visitor leaving with a accurate sense of the person — or clicking through to a project or the YouTube channel.

## Positioning

A creative developer's own domain that also mounts satellite projects (`vercel.json` rewrites `/trae-echoes`, `/rateministere`, etc. to other deployed apps). The homepage is the front door to that small empire — experiments included, secrets intact.

## Operating Context

- Next.js 16.2.3 App Router + React 19 + Tailwind 4 (`@theme` in globals.css) + framer-motion + lucide-react. Path alias `@/*` → `src/*`.
- Trilingual UI (en/zh/fr) through `LanguageContext`; the shipped homepage keeps it.
- Iterates through design "studies" on routes; the winning study is promoted to `/`, losers archived on their routes. Confirmed 2026-09-19: the supastack-look revamp replaces `/` directly; Session 026 archives back to `/sequencer`. 2026-09-23: the `/concepts` chooser was removed — studies stay reachable by direct URL, unlinked.
- `/p/*` portrait assets are scraping-deterred: `src/proxy.ts` blocks foreign-referer hotlinks, `ProtectedImage` kills context menu/drag, obscured filenames are intentional (NEVER rename to human-readable).

## Capabilities and Constraints

Confirmed:

- Required content on the homepage: Noah's Piano Journey feature (`youtube.com/@pianowithnoah`, 12M+ views, a 3M+ Short), a `build;` placeholder block, a `[Starterkit]` entry, a redacted secret-project teaser, a distinctive X link (@Learnmore_smart).
- Real assets on hand: `/p/nz-7f3a9d.jpg` + `/p/nz-4e1b8c.jpg` portraits, `/Noah-Piano-Journey.png` channel art, `/LearnX.png` `/Overtake.png` `/OpenNotes.png` project shots, `/Videos-demo/` Für Elise tutorial + LearnX mp4s.
- vercel.json satellite rewrites are untouchable.

## Brand Commitments

- Voice: understated, precise, a little playful; English leads, zh/fr follow.
- Confirmed quotes: "You can give up at any time, so why now?" and the Walter Mitty line "One day, I'll find my negative No.25".
- The secret project stays redacted everywhere — name, year, details.
- 2026-09-19 revamp borrows the supastack kit's visual language (token-driven theme packs) while remaining Noah's own site — not the supastack brand or its four-tile mark.

## Evidence on Hand

- `src/lib/content.ts` is the factual source: profile, piano stats, featured/archive projects, recognition.
- Recognition: four Trae community citations (2025–26).
- No testimonials, press, or commercial claims — never fabricate them.

## Product Principles

- The work and the music lead; chrome recedes.
- Honest placeholders only (`build;`, the redacted secret) — nothing fake-demo.
- Every study archive stays reachable; nothing is deleted to make room.

## Accessibility & Inclusion

Keyboard-usable, `prefers-reduced-motion` respected, readable at 320px, essential content visible without JS where feasible.
