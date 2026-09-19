# src/proxy.ts

> Last updated: 2026-09-17 | Protection: CRITICAL (user privacy)

## Purpose
Hotlink deterrent for Noah's personal photos under `/p/*`.

## What It Does
- Next 16 convention: `proxy` named export (the old `middleware.ts` is renamed `proxy.ts` in v16).
- Matcher: `/p/:path*` only.
- 403 when `sec-fetch-site: cross-site`, or when `referer` exists and its host ≠ request host.
- Allows: same-origin fetches and direct navigation (no referer).
- Companion headers in `next.config.ts`: `Cross-Origin-Resource-Policy: same-origin`, `nosniff`, `Referrer-Policy: strict-origin` on the same paths.

## Important Notes / NEVER Change
- This is deterrence, not DRM — anything renderable in a browser can be captured. Do not "strengthen" it by blocking empty referers (breaks direct links/privacy browsers).
- Keep matcher synced with the asset folder (`public/p/`). Renaming the folder requires updating both.

## Change History
| Date | Change | Author |
|------|--------|--------|
| 2026-09-17 | Created for photo anti-scraping stack | Devin |
