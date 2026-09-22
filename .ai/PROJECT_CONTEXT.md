# PROJECT CONTEXT — rateministere-homepage

> Last updated: 2026-09-18 | Protection: STANDARD

## Architecture

- Next.js **16.2.3** (App Router, Turbopack default) + React 19.2 + Tailwind CSS 4 (`@theme` tokens in `src/app/globals.css`) + framer-motion + lucide-react.
- Path alias `@/*` → `src/*`.
- `vercel.json` proxies subpaths (`/trae-echoes`, `/rateministere`, etc.) to other deployed apps — the homepage owns `rateministere.com` and mounts satellite projects under it. See `.ai/vercel.md`.
- i18n: custom `LanguageContext` (en/zh/fr JSON in `src/i18n/`) — used by `/classic`, `/sequencer`, AND `/` (stack homepage wraps in `LanguageProvider`; UI strings in `t.stack.*`). Other mockup routes remain English-only.
- Fonts: `next/font/google` Inter (sans) + Instrument Serif (accent italic) in `layout.tsx`.

## Route map (post-2026-09-18 — Supastack APPLIED)

| Route | What |
|-------|------|
| `/` | **Homepage = StackPage** (supastack dialect, 4 switchable packs — see `.ai/src/components/stack/StackPage.md`) |
| `/concepts` | Mockup chooser ("three doors" — Supastack door marked SHIPPED) |
| `/classic` | Previous homepage (moved verbatim from old `app/page.tsx`) |
| `/sequencer` | Archived DAW homepage (SequencerPage, still multilingual) |
| `/arcade` | Mockup — fighting-game select screen, CRT, locked challenger = secret |
| `/atlas` | Mockup — expedition topo-map field notes (round-1 survivor, readability pass) |
| `/recital` | Round-1 archive — concert-programme editorial (off chooser) |
| `/os` | Round-1 archive — NOAH.OS desktop (off chooser) |

## Current Work

- 2026-09-18: Revamp v2 complete — user asked for a sleek redesign "using the supastack repo"; `/` is now `StackPage`, a token-driven port of supastack's Obsidian marketing dialect. Four packs (obsidian/graphite/midnight/ink) switchable in the footer, persisted to `localStorage("stack_pack")` — **user still needs to pick one**; once chosen, the picker can be removed and the pack locked.
- Verified: lint + build green, impeccable detector clean, browser-checked EN/ZH/FR, all 4 packs, mobile menu, 320px no-overflow, focus rings, reduced-motion/no-JS fallbacks. `globals.css` body got a dark background so overscroll doesn't flash light.
- 2026-09-17: (superseded) DAW sequencer homepage — now archived at `/sequencer`.
- Required content per mockup: Noah's Piano Journey YouTube feature (`youtube.com/@pianowithnoah`, 10M+ views), a `build;` placeholder block, a `[Starterkit]` project entry, a redacted "secret project" teaser, a distinctive X (@Learnmore_smart) link.
- Photos `public/p/nz-7f3a9d.jpg` (768×1024) + `public/p/nz-4e1b8c.jpg` (1024×1024) are paragliding portraits — user wants scraping deterrence: `src/proxy.ts` blocks foreign-referer hotlinks on `/p/*`, `ProtectedImage` component kills context menu/drag, headers add nosniff. Obscured filenames intentional — do not rename to anything human-readable.

## NEVER Change

- `vercel.json` rewrites for satellite apps (see `.ai/vercel.md` for past cache bug).
- The `/p/*` asset paths — components and `proxy.ts` matcher depend on them.
- Do not expose the portrait images at guessable URLs (e.g. `/noah.jpg`).

## Environment

- Windows, bash via Git Bash. `npm run dev` / `npm run build` / `npm run lint` (= `eslint`). Port 3000 is squatted by an old process (PID 53012) → dev lands on **3001**.
- **Windows `nul` trap**: `curl -o nul` or `2>nul` in Git Bash writes a real file named `nul` (NT-level, invisible to `ls`) that crashes Turbopack's project scan — delete with `rm -f '//?/abs/path/nul'`. Use `/dev/null` instead. After panic-level errors: kill server, `rm -rf .next`, restart (in-memory task cache keeps errors).
- Next 16 gotchas: `middleware.ts` → `proxy.ts`; `next/image` `qualities` defaults to `[75]`; request APIs (`params`, `cookies`, etc.) are async-only; parallel routes need `default.tsx`.
