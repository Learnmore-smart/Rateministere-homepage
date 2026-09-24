# src/app/layout.tsx

> Last updated: 2026-09-23 | Protection: STANDARD

## Purpose
Root layout: `<html>` + `<body>` shell, all `next/font/google` variable
fonts, site metadata (OG/Twitter), and the gtag.js snippet.

## What It Does
- `<html lang="en">` carries every font CSS variable
  (`--font-display`, `--font-body`, `--font-fraunces`, `--font-space`,
  `--font-silk`, `--font-inter`, `--font-instrument`) plus Tailwind
  utilities `h-full antialiased scroll-smooth`.
- `suppressHydrationWarning` on `<html>` — REQUIRED: StackPage's inline
  boot script sets `data-stack-theme` on `<html>` before React hydrates,
  which would otherwise log a hydration-mismatch error in dev.
- `<body className="min-h-full flex flex-col bg-background text-text">`.
- gtag (`G-JTGLVTKPV4`) via `next/script` `afterInteractive` in `<head>`.

## Important Notes
- Do not remove `suppressHydrationWarning` while anything writes to
  `<html>` pre-hydration (theme boot script, theme effect).
- Metadata base is `https://www.rateministere.com`; OG image
  `/OG-image-ratministere-homepage.png` (sic — filename has the typo).

## Change History
| Date | Change | Author |
|------|--------|--------|
| 2026-09-23 | Created mirror; added `suppressHydrationWarning` for the stack theme boot script | Devin |
