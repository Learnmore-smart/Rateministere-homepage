# src/components/Chooser.tsx (+ app/concepts/page.tsx)

> Last updated: 2026-09-17 (v2) | Protection: STANDARD

## Purpose
`/concepts` is a "three studies" triptych chooser for the 2026-09 homepage revamp — links to `/` (the chosen sequencer, labeled "CURRENT"), `/arcade`, `/atlas`, and `/classic` (previous homepage, preserved verbatim). Round-1 studies `/recital` + `/os` remain routed and are linked as "archive" in the footer.

It used to live at `/`; when the user picked the sequencer design (2026-09-17), `/` was promoted to `SequencerPage` and this chooser moved to `/concepts`. `/sequencer` is now a redirect to `/`.

## What It Does
- Three full-height panels, each with the mockup's own palette/type/preview glyph (piano-roll clips + playhead, fighter-tile grid, topo contours).
- Keyboard `1`/`2`/`3` navigates via `useRouter().push`.
- `app/concepts/page.tsx` is a server wrapper exporting metadata; `Chooser` is the client component.

## Agent Decisions / Thoughts
- Mockups are English-only (user decision); `/classic` keeps the EN/中文/FR `LanguageProvider`.
- Sequencer door is marked as the applied study — copy updated so it's no longer presented as an unchosen option.

## Change History
| Date | Change | Author |
|------|--------|--------|
| 2026-09-17 | Created at `/` | Devin |
| 2026-09-17 | Moved `/` → `/concepts` after sequencer promotion; copy updated ("CURRENT" state) | Devin |
