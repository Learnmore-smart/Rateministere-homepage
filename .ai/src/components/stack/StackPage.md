# src/components/stack/StackPage.tsx (+ stack.module.css)

> Last updated: 2026-09-18 (v1) | Protection: STANDARD

## Purpose
`/` homepage — the "Supastack" study (STUDY 04, applied 2026-09-18). A sleek
port of the supastack repo's marketing dialect onto Noah's portfolio content:
obsidian black, hairline borders, amber accent, Inter + Instrument Serif
italic accent line, fixed blur header, once-only scroll reveals.

Replaces the DAW/sequencer homepage, which moved to `/sequencer` (archived,
still wrapped in `LanguageProvider`).

## Structure
- `StackPage` is a client component; `app/page.tsx` is a server wrapper that
  provides `LanguageProvider` + metadata.
- Sections: fixed header (wordmark, anchor nav, lang pills, mailto CTA,
  burger) → `<dialog>` mobile menu → hero (`#hero-title`) → `#piano`
  (stats + Für Elise video card, `autoPlay` unless reduced-motion) →
  `#work` (4 featured cards: LearnX, Overtake, OpenNotes, Starterkit) →
  `#archive` (10-row index from `ARCHIVE`) → `#about` (ProtectedImage
  portrait, fact rows, quote, honors) → secret/`build;` card → `#contact`
  CTA → footer (socials, `/concepts` link, pack picker).
- Content comes from `src/lib/content.ts`; strings from `t.stack.*`
  (en/zh/fr JSON). `ARCHIVE_I18N` maps archive ids → `t.projects` keys,
  same map the sequencer uses.

## Theme packs
- `PACKS` = obsidian (default, amber `#efb779`), graphite (silver),
  midnight (navy/blue), ink (pure white accent).
- Selection → `useState` + `localStorage("stack_pack")`; an effect writes
  `document.documentElement.dataset.stackPack`. Boot effect reads
  localStorage and hydrates state inside `setTimeout` (React compiler lint
  bans synchronous setState in effects — same pattern as LanguageContext).
- Pack overrides live in `stack.module.css` as
  `:global(html[data-stack-pack="…"]) .stack { --accent: …; … }` blocks.
  Every pack must define `--accent-ink` (text color on accent buttons).

## Gotchas (learned the hard way)
- **CSS-module specificity trap**: `.stack a { color: inherit }` is (0,1,1)
  and silently beats single-class rules like `.btnPrimary` (0,1,0) — caused
  white-on-white button text in the ink pack (and wrong colors in all packs).
  Element-level resets inside `.stack` MUST stay wrapped in `:where()`
  (`.stack :where(a)`, `.stack :where(h1,h2)`, …) so class rules win.
- **Reveal contract**: JS sets `data-revealed="false"` then observes;
  `[data-revealed]` alone only adds the transition. Without JS the attribute
  never exists → content never hidden. `:focus-within` also force-reveals.
- **Reduced motion**: global `@media (prefers-reduced-motion: reduce)` kills
  animations/transitions AND forces `[data-revealed="false"]` visible; the
  `reduced` state also disables the piano video autoplay + shows controls.
- Internal links must be `next/link` (lint); DOM mutation must live in
  effects (React compiler lint).

## Change History
| Date | Change | Author |
|------|--------|--------|
| 2026-09-18 | Created; promoted to `/` (sequencer → `/sequencer`) | Devin |
| 2026-09-18 | Fix: `:where()` element resets (btn contrast); `barDip` replaces bounce-named keyframes; drop dead `transition: height` | Devin |
