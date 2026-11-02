# src/components/Footer.tsx

> Last updated: 2026-11-01 | Protection: STANDARD

## Purpose
Footer for the `/classic` homepage — socials, capabilities chips, mailto CTA,
quotes, copyright. (StackPage `/` renders its own footer inside
`stack.module.css`, not this component.)

## What It Does
- i18n via `useLang()` — `t.footer.*`, `t.background.quote/walterMitty`.
- "Featured on" badge row (twelve.tools / findly.tools / startupfa.me
  remote badge `<img>`s) above the border-t CTA row — merged in from the
  `chore/footer-dir-badges` branch 2026-11-01.

## Change History
| Date | Change | Author |
|------|--------|--------|
| 2026-11-01 | Merged directory-badge row from `chore/footer-dir-badges` (conflict resolved by keeping master's file + re-inserting the badge block before the border-t row) | Devin |
