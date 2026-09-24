# src/components/stack/StackPage.tsx (+ stack.module.css)

> Last updated: 2026-09-23 (v3.2) | Protection: STANDARD

## Purpose
`/` homepage — the "Supastack" study (STUDY 04, applied 2026-09-18), now
re-skinned per user direction: **light and sleek by default** (warm paper,
blue accent), dark obsidian behind a header theme button. Keeps hairline
borders, Inter + Instrument Serif italic accent line, fixed blur header,
once-only scroll reveals.

Replaces the DAW/sequencer homepage, which moved to `/sequencer` (archived,
still wrapped in `LanguageProvider`).

## Structure
- `StackPage` is a client component; `app/page.tsx` is a server wrapper that
  provides `LanguageProvider` + metadata.
- Sections: fixed header (wordmark, anchor nav, **LangMenu dropdown**,
  **theme button**, mailto CTA, burger) → `<dialog>` mobile menu → hero
  (`#hero-title`) →
  `#piano` (stats + Für Elise video card, muted `autoPlay` unless
  reduced-motion, floating sound toggle) →
  `#work` (4 cards: supastack, LearnX, OpenNotes, + a redacted hidden card —
  click → toast) → `#archive` (10-row index from `ARCHIVE`) → `#about`
  (ProtectedImage portrait, fact rows, quote, honors) → secret/`build;` band →
  `#contact` CTA → footer (socials, "Built with supastack"
  with the official 4-tile supastack mark — white TL/BR, gray TR/BL, thin
  `#686868` outlines; canonical geometry, do not restyle).
- Content comes from `src/lib/content.ts`; strings from `t.stack.*`
  (en/zh/fr JSON). `ARCHIVE_I18N` maps archive ids → `t.projects` keys,
  same map the sequencer uses.
- Toasts: `src/components/toast.tsx` exports `useToasts()` + `<ToastStack>`;
  rendered inside `.stack` so it inherits theme tokens; `aria-live="polite"`.

## i18n rendering
- `useLang()` gives `{ lang, setLang }`; the page renders `t = locales[shown]`
  where `shown` state trails `lang` by a 170ms fade. On `lang` change the root
  gets `data-lang-swap` → `.main`/`.desktopNav`/`.menuPanel`/`.footer`
  blur+fade out (0.17s), `shown` swaps at the dimmed midpoint, then the
  attribute clears and the same transition reverses in at 0.22s.
  Reduced-motion swaps instantly. This also masks the initial
  localStorage-restore swap (en→zh/fr on load). The flag is mirrored in
  `langSwapRef` and kept OUT of the effect deps — as a dep, setting it
  would re-run the effect and kill the pending midpoint timer. The
  `lang === shown` branch releases the flag ~60ms after the text mounts,
  which also rescues a cancelled A→B→A swap (flag would otherwise stick
  `true` → page permanently invisible). All timer ids are tracked +
  cleared on cleanup so rapid A→B→C swaps can't strand a stale clear.
  `LanguageContext` also keeps `<html lang>` in sync on switch/restore.
- **`LangMenu`** (module-level component, uses `useLang()` internally):
  `<details>/<summary>` dropdown ported from supastack's
  `i18n/language-switcher`, but items are `<button>`s calling `setLang` — no
  cookie, no navigation. Languages icon + `langLabels[lang]` + rotating
  ChevronDown trigger; `<ul>` popover with `Check` + `aria-current` on the
  active item. Behaviors: outside `pointerdown` closes; Escape closes +
  refocuses summary; ArrowDown on closed summary opens + focuses active item;
  ArrowUp/Down cycle item focus; `onBlur` leaving closes; animated close via
  `data-closing` + 140ms timeout — the finisher is a single tracked ref
  (`closeTimer`). ORDER MATTERS: `requestClose` checks `data-closing`
  BEFORE anything else and never clears the finisher on re-entry — a
  second call (outside-pointerdown → focusout → onBlur) clearing the
  armed finisher deadlocks the popover (`open` + `data-closing` + no
  timer = frozen invisible). Open paths (summary click, ArrowDown)
  clear the timer AND delete `data-closing` so a reopen can't stay
  hidden. `choose()` passes `refocus=true` so picking a language
  returns focus to the summary. Rendered in
  the header (`.langMenuHeader` — `display:none` until 900px, same rule the
  old pills had) and in `.menuFoot` with `data-side="top"` so the popover
  opens upward (`justify-self: start`).

## Header
- **Always frosted** — `.header` carries `background: color-mix(--page 55%)`
  + `backdrop-filter: blur(14px)` unconditionally (latent bug fix: if the JS
  `scrolled` flag ever missed, dark nav text sat unreadably over dark cards).
  `.headerScrolled` only deepens it (78% page, `border-bottom-color`, blur
  16px). The `@supports not (backdrop-filter)` fallback now applies to
  `.header` (not just `.headerScrolled`) → opaque `var(--section)`.

## Theme
- Two themes: **light (default)** — paper `#fafaf8`, blue `#1d4ed8` —
  and **dark** — the original obsidian `#000`, soft blue `#8fb4ff`.
- Selection → `useState` + `localStorage("stack_theme")`; an effect writes
  `document.documentElement.dataset.stackTheme`. Boot effect hydrates state
  inside `setTimeout` (React compiler lint bans synchronous setState in
  effects — same pattern as LanguageContext). Legacy `stack_pack` (all packs
  were dark) migrates to `dark`.
- **Switch animation**: `transitionTo(apply, origin)` wraps the flip in
  `document.startViewTransition` and animates a `clip-path` circle on
  `::view-transition-new(root)` spreading from the click point (520ms).
  `apply` sets `dataset.stackTheme` + `setTheme` synchronously so the new
  snapshot sees the new theme. Falls back to instant switch on
  reduced-motion, no origin, or no View Transitions support. Root
  pseudo-element CSS (kill default crossfade, z-order new over old) lives
  in `globals.css`. Keyboard/synthetic clicks (0,0 coords) spread from the
  button's bounding-rect center.
- Dark overrides live in `stack.module.css` as
  `:global(html[data-stack-theme="dark"]) .stack { … }`. `color-scheme`
  tracks the theme (`light` / `dark`). `html[data-stack-theme="dark"]`
  background in globals.css matches the theme so overscroll never flashes
  the wrong color (`overscroll-behavior: none` on html/body kills the
  elastic anyway).
- The inline boot script mutates `<html data-stack-theme>` before React
  hydrates → `<html suppressHydrationWarning>` in `layout.tsx` suppresses
  the dev-only hydration-mismatch warning (standard mechanism).

## Gotchas (learned the hard way)
- **CSS-module specificity trap**: `.stack a { color: inherit }` is (0,1,1)
  and silently beats single-class rules like `.btnPrimary` (0,1,0) — caused
  white-on-white button text in the ink pack (and wrong colors in all packs).
  Element-level resets inside `.stack` MUST stay wrapped in `:where()`
  (`.stack :where(a)`, `.stack :where(h1,h2)`, …) so class rules win.
- **Second specificity trap (mobile CTA)**: `.headerCta { display:none }`
  (0,1,0) is defined BEFORE `.btn { display:inline-flex }` (0,1,0) — later
  wins, so the "say hello" CTA never hid on mobile and squashed the header.
  Both `.headerCta` rules are written `.headerEnd .headerCta` (0,2,0) to
  beat `.btn`. `.brand` also has `white-space: nowrap` so the wordmark
  can't wrap at ≤900px.
- **Reveal contract**: JS sets `data-revealed="false"` then observes;
  `[data-revealed]` alone only adds the transition. Without JS the attribute
  never exists → content never hidden. `:focus-within` also force-reveals.
  On intersect, `data-revealed="true"` is set, then a `transitionend`
  listener deletes the attribute + clears the inline `transitionDelay`
  after the reveal — otherwise `.stack [data-revealed]` (0,2,0) keeps
  clobbering each element's own transition forever (`.card` hover ran at
  700ms + delayed; `.xLine` color snapped). The handler must check
  `e.target === el` (bubbled descendant transitionends — `.cardImg img`,
  link arrows — would fire it early; `once:true` was wrong for this) and
  removes itself manually; a 900ms idempotent fallback covers the
  no-transition paths (`:focus-within` force-reveal, reduced-motion,
  `transitioncancel`) where `transitionend` never fires.
- **Reduced motion**: global `@media (prefers-reduced-motion: reduce)` kills
  animations/transitions AND forces `[data-revealed="false"]` visible; the
  `reduced` state also disables the piano video autoplay + shows controls.
- Internal links must be `next/link` (lint); DOM mutation must live in
  effects (React compiler lint).
- **Brand-mark hover vs `barUp` fill**: `barUp` (entrance) animates
  `transform` with `fill: both`, which holds `scaleY(1)` on the rects
  forever — a hover `transform` transition would lose to the animation
  fill and never apply. The hover "rise" (bars grow upward, staggered,
  middle accent highest at 1.24) therefore uses the independent `scale`
  property (`scale: 1 1.14` etc.), which composes with the held
  `transform` and still respects `transform-box: fill-box` /
  `transform-origin: bottom`. Stagger via `transition-delay` on the
  hover rules (in only — un-hover drops the delay so bars fall together).
- Hero has no kicker/banner (user found it ugly — removed 2026-09-23);
  the section opens straight on `.heroTitle` (`margin-top: 26px` kept as
  top air). Location info lives in `.heroMeta` under the CTAs.
- **Hero is exactly 2 lines**: `.heroLine` (span around heroTitleA) and
  `.heroTitle em` are `display:block; white-space:nowrap` — phrases must
  never wrap mid-line (zh was wrapping to 4 lines at `max-width:14ch`).
  `max-width:none`, `font-size: clamp(1.5rem, 7.6vw, 4.9rem)`, no
  `text-wrap`. If a title string gets longer, re-check 320px overflow.
- **Piano video is 9:16 portrait** (mp4 is 720×1280): `.videoFrame video`
  `aspect-ratio: 9/16`, frame capped `max-width:340px; margin-inline:auto`
  so it doesn't tower over the copy column.
- **Piano sound toggle**: the `<video>` stays `muted` in JSX so autoplay
  always works; a floating `.soundToggle` circle (absolute top-right
  inside `.videoFrame`, which is `position:relative`) flips
  `video.current.muted` in an effect off `soundOn` state. `aria-label` +
  `title` use the stable `pianoSound` key; `aria-pressed` carries state;
  VolumeX ↔ Volume2 icons.
- **`.btn` "key press" hover** (replaced a rejected sheen sweep — do NOT
  bring back a shimmer/gradient sweep): hover presses the button *down*
  `translateY(1px)` while `::after` — a 2px `currentColor` underline at
  the inner bottom edge (`left/right:16px; bottom:7px`,
  `var(--accent)` on `.btnSecondary`) — scales in from the left;
  `:active` bottoms out at `translateY(2px) scale(.97)`. No lift, no
  glow: `.btnPrimary:hover` only darkens to `--accent-hover`,
  `.btnSecondary:hover` only `--hover-fill` + `--border-strong`. Hover
  rules live inside `@media (hover:hover)` (no sticky hover on touch);
  `::after` is `display:none` under reduced-motion.
- `blockquote.quote` contains `.quoteSrc` (quote1 attribution, mono/muted
  block line — `font-style:normal` because the blockquote is italic serif).
  `stack.quote1src` exists in all three JSONs (Rich Dad Poor Dad).
  The old `.quote + p` mono rule was deleted 2026-09-23 — it also matched
  `.quoteSmall` (the quote2 line) and stomped its serif/italic styling;
  do not re-add an adjacent-sibling rule there.

## Change History
| Date | Change | Author |
|------|--------|--------|
| 2026-09-18 | Created; promoted to `/` (sequencer → `/sequencer`) | Devin |
| 2026-09-18 | Fix: `:where()` element resets (btn contrast); `barDip` replaces bounce-named keyframes; drop dead `transition: height` | Devin |
| 2026-09-23 | v3: light-first reskin follow-ups — blue accent replaces bronze/amber; mobile header fix (`.headerEnd .headerCta` specificity + `.brand` nowrap); circular view-transition theme spread; official supastack mark in footer credit | Devin |
| 2026-09-23 | v3.1: `/concepts` removed (Chooser + route deleted; mobile-menu link, footer credit segment, `nav.concepts` keys dropped). Hero kicker removed (JSX + CSS + `heroKicker` i18n keys). Brand hover `barDip` → staggered `scale` rise (fill-mode conflict, see Gotchas) | Devin |
| 2026-09-23 | v3.2: lang pills → `LangMenu` `<details>` dropdown (ported supastack switcher, `<button>` items, `setLang` only; header + `side="top"` mobile-menu instances); language-swap crossfade (`shown` state + `data-lang-swap`); always-frosted header; hero locked to 2 nowrap lines; piano video 9:16 portrait (340px cap) + floating mute/unmute toggle (stable `pianoSound` label + `aria-pressed`); `.btn` key-press hover + `@media(hover)` hovers; `quote1src` attribution inside the blockquote; 12M views everywhere | Devin |
