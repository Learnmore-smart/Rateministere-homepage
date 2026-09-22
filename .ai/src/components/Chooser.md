# src/components/Chooser.tsx (+ app/concepts/page.tsx)

> Last updated: 2026-09-18 (v3) | Protection: STANDARD

## Purpose
`/concepts` is a "three studies" triptych chooser — door 1 is now "Supastack"
(STUDY 04 — SHIPPED, fader-bars preview) linking to `/`; doors 2–3 remain
`/arcade` and `/atlas`. Footer archive row links `/classic`, `/sequencer`
(now the archived DAW homepage, not a redirect), `/recital`, `/os`.

History: lived at `/` until the sequencer won (2026-09-17) and moved here;
when Supastack shipped to `/` (2026-09-18), the sequencer door was replaced
and the sequencer itself archived at `/sequencer`.

## What It Does
- Three full-height panels, each with the mockup's own palette/type/preview glyph (fader bars for Supastack, fighter-tile grid, topo contours).
- Keyboard `1`/`2`/`3` navigates via `useRouter().push`.
- `app/concepts/page.tsx` is a server wrapper exporting metadata; `Chooser` is the client component.

## Agent Decisions / Thoughts
- Mockups are English-only (user decision); `/classic`, `/sequencer`, and `/` keep the EN/中文/FR `LanguageProvider`.
- Supastack door is marked "SHIPPED" — it's the live homepage, not an unchosen option.

## Change History
| Date | Change | Author |
|------|--------|--------|
| 2026-09-17 | Created at `/` | Devin |
| 2026-09-17 | Moved `/` → `/concepts` after sequencer promotion; copy updated ("CURRENT" state) | Devin |
| 2026-09-18 | Sequencer door → "Supastack" (STUDY 04 — SHIPPED); `/sequencer` added to footer archive | Devin |
