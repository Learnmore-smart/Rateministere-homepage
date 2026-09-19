# src/components/ProtectedImage.tsx

> Last updated: 2026-09-17 | Protection: STANDARD

## Purpose
Client-side deterrence wrapper for personal photos — pairs with `src/proxy.ts` (server side).

## What It Does
- Wrapper `div` intercepts `contextmenu`/`dragstart`/`copy`/`cut`; inner `<img>` is `pointer-events-none` + `aria-hidden` (wrapper carries `role="img"` + label); transparent shield layer catches pointer events; corner watermark via `mix-blend-difference`.
- Plain `<img>` not `next/image` — deliberate: the optimizer endpoint would be an alternate public URL and adds nothing here. ESLint `no-img-element` disabled inline.

## Public API
| Prop | Type | Notes |
|------|------|-------|
| src, alt | string | alt goes on the wrapper's aria-label |
| className | string | sizes the wrapper (must give h/aspect) |
| imgClassName | string | e.g. `object-top` |
| watermark | string | `""` disables |
| shield | bool | default true |

## Important Notes / NEVER Change
- Keep the shield `pointer-events` layer — without it, right-click hits the img.
- Watermark text must stay non-identifying-adjacent? No — it IS the attribution. Keep it subtle (white/45, blend-difference).

## Change History
| Date | Change | Author |
|------|--------|--------|
| 2026-09-17 | Created | Devin |
