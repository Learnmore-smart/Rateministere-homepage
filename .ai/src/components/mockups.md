# Mockup pages — sequencer/ (PROMOTED to `/`) · arcade/ · atlas/ (archive: recital/ · os/)

> Last updated: 2026-09-17 (v3) | Protection: STANDARD

## Purpose
**Current homepage:** `/` renders `src/components/stack/StackPage.tsx` — the light-first editorial surface (theme toggle, toast, i18n). Session 026 sequencer is back at **`/sequencer`** as an archived study. The three-door chooser used to live at **`/concepts`** — **2026-09-23 update:** `/concepts` was deleted entirely (`Chooser.tsx` + `app/concepts/page.tsx` gone, all inbound links removed) — the studies survive only as unlinked, direct-URL archives. Shared facts live in `src/lib/content.ts`.

## Map — studies (unlinked direct-URL routes since `/concepts` removal) + promoted homepage

| Route | Component | Concept | Signature elements |
|-------|-----------|---------|--------------------|
| `/` | `components/stack/StackPage.tsx` | Editorial portfolio — warm-paper light theme + dark toggle, blue accent, i18n EN/中文/FR, toast system | current homepage (see `.ai/src/components/stack/StackPage.md`) |
| `/sequencer` | `components/sequencer/SequencerPage.tsx` | DAW session "session_026", near-black `#0a0a0c`, Silkscreen + JetBrains Mono | ENRICHED v4 (see below) — was the homepage, now archived |
| `/arcade` | `components/arcade/ArcadePage.tsx` | Fighting-game select screen "NOAH FIGHTERS '26", black `#050508`, Silkscreen pixel font, CRT scanlines + flicker + vignette | PRESS START attract mode (any key/click, unlocks audio); 3×2 fighter grid (PIANO JOURNEY main, LearnX, Overtake, OpenNotes, [STARTERKIT] item, ??? LOCKED secret); hover selects w/ blip sfx; preview pane w/ animated stat bars + FIGHT→link; locked tile → deny() buzz + shake + "IDENTITY ENCRYPTED"; STAGE SELECT row = archive; X = flashing "⚠ CHALLENGER APPROACHING — @Learnmore_smart ⚠" hazard banner; `> build;` = looping pixel NOW LOADING bar; keyboard nav (arrows+Enter); pixel-arrow SVG data-uri cursor |
| `/atlas` | `components/atlas/AtlasPage.tsx` + `contours.ts` | Expedition survey sheet | Readability pass applied: microcopy bumped 8–11px→10–13px, contour opacity .35→.24, waypoint labels get paper plates (`bg-[#e9e3d5]/90` chips) so contours stop cutting text, muted text contrast raised /45–/60→/60–/90, `cursor-crosshair` |

## SequencerPage v4 — archived at `/sequencer` (was homepage until the stack redesign), i18n + themes

Nine tracks (`TRACKS` const, order = default layout): `OPERATOR`, `PIANO_JOURNEY`, `WORKS`, `SKETCHES` (all 10 ARCHIVE projects as clips), `KIT` ([STARTERKIT]), `██████` (locked secret — popover shows only "building — it's secret"), `SIGNALS`, `ROUTES` (socials w/ brand icons), `BUILD.LOG`.

**v4 changes (user-requested):**
- **Clip drag**: every clip draggable horizontally in its lane (pointer capture + threshold in `TrackRow.clipDown/Move/Up`); live `clipPos[clipId]` % state; drop snaps to bar grid. In-memory only — refresh resets. Locked track can't drag.
- **No click-to-stamp** — lane clicks do nothing now (user rejected idea-stamping).
- **ClipPopover** replaces the bottom inspector drawer (user disliked it): positioned at **lane level** (sibling of clips, not inside clip wrapper) — `left` clamped to lane bounds via `max(4px, min(calc(center% - 150px), calc(100% - 304px)))`, `below` for rows 0–2 else `above`. Compact `ClipDetail` per id + customizer footer: 8-color swatches + **8 pitch presets (-12…+12)** + **4 waveforms (sine/tri/sqr/saw)** — cached to `localStorage.seq_clip_style = {clipId:{c,s,w}}`. Close: outside pointerdown (not `[data-pop]`/`[data-clip]`), Esc, or re-click same clip.
- **Clip collision**: `bounds()` in TrackRow computes free interval between lane neighbors; drag + snap clamped inside → clips can't overlap.
- **Popover transform bug (fixed)**: framer-motion owns `transform` on motion elements — a static `transform: translateX` in `style` gets overwritten. Fix = outer plain `div` for positioning + inner `motion.div` for the enter animation.
- **Labels localized**: `t.seq.trackNames`/`t.seq.clipLabels` (+ `t.projects` names for archive clips) drive all visible track/clip names; proper nouns (noah_zixin_zhang, github…) stay latin. Language is auto-detect only (LanguageProvider localStorage+browser locale) — no switcher button on `/`.
- **i18n**: `app/page.tsx` wraps in `LanguageProvider`; all UI strings in `t.seq.*` (34 keys, en/zh/fr), clip content reuses `t.projects`/`t.featured`/`t.recent`/`t.background`/`t.recognitionItems` via `ARCHIVE_I18N`/`REC_I18N` key maps. Lang cycles via transport button (EN→中文→FR).
- **Light mode**: `.seq` / `.seq.light` CSS-var tokens in globals.css (`--s-bg/panel/head/lift/line/line2/grid/ink/ink2/dim/faint`); all hardcoded zinc/hex classes converted to `bg-(--s-*)`/`text-(--s-*)`/`border-(--s-*)`. Persisted `localStorage.seq_theme`; transport Sun/Moon toggle.
- **Brand icons**: `src/components/icons/brands.tsx` — X + Bilibili + RedNote custom SVGs, Github/Youtube/Instagram/Mail from lucide; `BrandIcon name=` API; used in ROUTES clip labels (`ROUTE_ICONS` map), popovers, transport `SEND·X`.

## Other concepts still routed (ex-`/concepts` doors, now unlinked)

| Route | Component | Concept | Signature elements |
|-------|-----------|---------|--------------------|
| `/arcade` | `components/arcade/ArcadePage.tsx` | Fighting-game select screen "NOAH FIGHTERS '26", black `#050508`, Silkscreen pixel font, CRT scanlines + flicker + vignette | PRESS START attract mode (any key/click, unlocks audio); 3×2 fighter grid (PIANO JOURNEY main, LearnX, Overtake, OpenNotes, [STARTERKIT] item, ??? LOCKED secret); hover selects w/ blip sfx; preview pane w/ animated stat bars + FIGHT→link; locked tile → deny() buzz + shake + "IDENTITY ENCRYPTED"; STAGE SELECT row = archive; X = flashing "⚠ CHALLENGER APPROACHING — @Learnmore_smart ⚠" hazard banner; `> build;` = looping pixel NOW LOADING bar; keyboard nav (arrows+Enter); pixel-arrow SVG data-uri cursor |
| `/atlas` | `components/atlas/AtlasPage.tsx` + `contours.ts` | Expedition survey sheet (KEPT from round 1 — user "kinda likes" it) | Same as before + readability pass: microcopy bumped 8–11px→10–13px, contour opacity .35→.24, waypoint labels get paper plates (`bg-[#e9e3d5]/90` chips) so contours stop cutting text, muted text contrast raised /45–/60→/60–/90, `cursor-crosshair` |

## Map — archived (still routed, unlinked)

| Route | Component | Concept |
|-------|-----------|---------|
| `/recital` | `components/recital/RecitalPage.tsx` | Concert programme (see git history/previous version of this doc for details) |
| `/os` | `components/os/OSPage.tsx` + `Window.tsx` + `apps.tsx` | NOAH.OS desktop |

## Agent Decisions / Thoughts
- `lib/synth.ts`: lazy AudioContext singleton — must be created inside a user gesture (gate click / keypress) or autoplay policy kills it. `pluck`/`blip`/`deny` helpers shared by both new mockups.
- Sequencer playhead + clip glow use direct DOM mutation (refs registry + `dataset.live`) inside `useAnimationFrame` — no re-render per frame. Solo/mute decisions also read via refs inside the frame loop.
- State→ref mirrors (`monitorRef`, `mutedRef`, `soloRef`) sync in `useEffect`, NOT during render (eslint `react-hooks/refs`).
- Clip drag: pointer capture on the clip button; `drag.current` ref tracks `{x0, at0, at1, moved}` — `at1` (live pos) must live in the ref, NOT read from `clipPos` prop at pointerup (prop is stale within one event burst — caused a snap-back bug). Drop snaps `round(at/BAR)*BAR`; click-vs-drag split by 0.6% movement threshold + `suppressClick` ref.
- `Reorder.Group` wraps the `ol` of tracks (`axis="y"`, `values=order`, `onReorder=setOrder`) — order state is `TRACKS.map(id)` array; refresh = default.
- Playhead left position: `useMotionTemplate` (NOT `useMotionValue` tagged-template — that API doesn't exist).
- Waveform bar heights must be `Math.round`ed — raw `Math.sin` precision differs SSR vs client → hydration mismatch.
- `cursor: url(data-svg)` on arcade works but needs width/height attrs in the SVG.
- **Windows `nul` trap**: `curl -o nul` / `2>nul` in Git Bash creates a REAL NT-level file named `nul` — invisible to `ls`/Explorer, crashes Turbopack's project scan (os error 1). Delete via `rm -f '//?/abs/path/nul'` (MSYS NT-path prefix). Use `curl -o /dev/null` and `2>/dev/null` in bash, never `nul`.
- Turbopack caches task failures in-memory — after fixing a panic-level issue, kill server + `rm -rf .next` + restart.
- Photos everywhere go through `ProtectedImage` (`/p/nz-*.jpg`); `width`/`height` props don't exist — size via `className`.

## Open Threads
- Sequencer = homepage (v4: drag clips, popover customizer, i18n, light mode). `/concepts` chooser deleted 2026-09-23 — arcade/atlas/sequencer/recital/os remain routed as unlinked direct-URL archives; deletion is permanent if user wants cleanup.
- Remaining gaps: mobile lanes cramped (150px label gutter fixed so playhead math stays right); reduced-motion variants not implemented for playhead/meters; clip positions + track order are intentionally NOT persisted (user spec) — only clip color/pitch + theme are cached.

## Change History
| Date | Change | Author |
|------|--------|--------|
| 2026-09-17 | Created recital/os/atlas mockups | Devin |
| 2026-09-17 | Round 2: added /sequencer + /arcade, atlas readability pass, chooser updated to new trio (recital/os archived) | Devin |
| 2026-09-17 | Sequencer PROMOTED to `/`; chooser → `/concepts`; `/sequencer` → redirect. SequencerPage v3: 9 tracks (all 10 archive projects, bio, recognitions, socials, email), click-to-stamp clips, Reorder drag, solo buttons, meters, inspector drawer | Devin |
| 2026-09-17 | v4 per user feedback: clip drag replaces click-to-stamp; bottom inspector → anchored ClipPopover w/ cached color+pitch pickers; i18n (LanguageProvider + t.seq, en/zh/fr); light mode (.seq.light vars + seq_theme); brand icons (icons/brands.tsx); secret clip = "building — it's secret" only | Devin |
| 2026-09-17 | v4.1: clip collision bounds (no overlap); popover moved to lane level + transform fix (page overflow bug); +4 pitches & waveform picker (sine/tri/sqr/saw cached as style.w); lang button removed (auto-detect only); track/clip labels localized via t.seq.trackNames/clipLabels + t.projects names; PIANO handle → @pianowithnoah | Devin |
| 2026-09-23 | `/concepts` chooser deleted (Chooser.tsx + route + `.ai` mirror removed); all study routes stay live but unlinked | Devin |
