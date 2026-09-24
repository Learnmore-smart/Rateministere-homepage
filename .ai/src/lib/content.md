# src/lib/content.ts

> Last updated: 2026-09-23 | Protection: STANDARD

## Purpose
Single source of truth for the mockup pages (profile, piano channel, portrait paths, socials, featured/archive projects, redacted SECRET, Trae recognitions). English-only — classic site's i18n JSONs are untouched.

## Important Notes
- `PORTRAIT.full`/`PORTRAIT.square` point at `/p/nz-*.jpg` — obscured filenames + `/p/*` proxy protection. Do NOT rename to readable names or move out of `/p/`.
- `SECRET` fields are intentionally `█`-redacted — the user wants an "unknown secret project" teaser, not a real name.
- 2026-09-23: `STARTERKIT` export removed — the starterkit shipped as **supastack** and now leads `FEATURED` (`supastack.dev`). Overtake.bid was archived by the owner and removed from `FEATURED` (kept out of `ARCHIVE` — "hide it"). Order: supastack, learnx, opennotes.
- 2026-09-23: `PIANO.views` is **12,000,000+** ("twelve million" in the blurb) — every surface says 12M/1200万/douze millions; grep `10M|10,000,000|1000万|ten million|dix millions` before trusting an old string. `FEATURED[0]` (supastack) uses `image: "/supastack-OG.png"` (the real OG shot); `/supastack.svg` stays on disk unused.

## Change History
| Date | Change | Author |
|------|--------|--------|
| 2026-09-17 | Created | Devin |
| 2026-09-23 | FEATURED → supastack/learnx/opennotes; dropped overtake + `STARTERKIT` | Devin |
| 2026-09-23 | `PIANO.views` 10M→12M (+ blurb); supastack card image → `/supastack-OG.png` | Devin |
