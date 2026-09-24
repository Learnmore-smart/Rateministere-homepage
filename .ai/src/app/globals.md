# src/app/globals.css

> Last updated: 2026-09-23 | Protection: STANDARD

## Purpose
Global stylesheet: Tailwind 4 `@theme` tokens, base element styles,
scrollbar/selection/focus, plus page-specific globals that can't live in
CSS Modules (they target `html`/`body` or pseudo-elements).

## Key Blocks
- `@theme inline` — `--color-*` and `--font-*` tokens (accent `#0b5fff`).
- `html { scrollbar-gutter: stable }` — no layout jump on scroll lock.
- `html, body { overscroll-behavior: none }` — kills rubber-banding.
- `html[data-stack-theme="dark"], … body { background: #000 }` — dark
  field behind the stack homepage so overscroll/VT snapshots never flash
  light. Keys off `<html>` attribute, NOT `.stack` (CSS Modules hashes
  the class; `:has()` would also work but this is simpler).
- `::view-transition-old/new(root)` — root pseudo-element setup for
  StackPage's circular theme-spread reveal: default crossfade killed
  (`animation: none; mix-blend-mode: normal`), new snapshot stacked above
  old (`z-index: 2147483646` vs `1`) so its clip-path circle covers the
  page. Without this block the reveal doesn't render.
- `.lang-dropdown*` — header dropdown open/close animation (legacy pages).
- `#background-stage` / `body.showcase-open` — z-axis recede (legacy).
- `body.custom-cursor` rules under `(hover: hover) and (pointer: fine)`.
- `.seq` / `.seq.light` — sequencer route theme tokens.

## Change History
| Date | Change | Author |
|------|--------|--------|
| 2026-09-23 | Created mirror; added `::view-transition-*` root block for the stack theme spread | Devin |
