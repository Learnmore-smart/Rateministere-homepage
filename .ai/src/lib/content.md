# src/lib/content.ts

> Last updated: 2026-09-17 | Protection: STANDARD

## Purpose
Single source of truth for the mockup pages (profile, piano channel, portrait paths, socials, featured/archive projects, `[Starterkit]`, redacted SECRET, Trae recognitions). English-only — classic site's i18n JSONs are untouched.

## Important Notes
- `PORTRAIT.full`/`PORTRAIT.square` point at `/p/nz-*.jpg` — obscured filenames + `/p/*` proxy protection. Do NOT rename to readable names or move out of `/p/`.
- `SECRET` fields are intentionally `█`-redacted — the user wants an "unknown secret project" teaser, not a real name.
- `STARTERKIT.name` is literally `"[Starterkit]"` (brackets included) per user request.

## Change History
| Date | Change | Author |
|------|--------|--------|
| 2026-09-17 | Created | Devin |
