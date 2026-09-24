# Plan — Stack homepage polish (user-directed fixes)

Date: 2026-09-23. All user-directed; verified facts noted. No commits/deploys.

## Task 1 — Homepage batch (repo: Rateministere-homepage)

All edits land in `src/components/stack/StackPage.tsx`, `src/components/stack/stack.module.css`, `src/i18n/{en,zh,fr}.json`, `src/lib/content.ts`, `src/app/page.tsx`, plus two archived-study touch-ups.

### 1a. Hero title → exactly 2 lines
Problem: `.heroTitle { max-width: 14ch }` wraps "代码，跑在生产环境。" mid-phrase (4 lines total). Fix: `max-width: none`; wrap `s.heroTitleA` in `<span className={styles.heroLine}>`; `.heroLine` and existing `em` get `display:block; white-space:nowrap`. Font: `clamp(1.7rem, 7.6vw, 4.9rem)` — longest line (zh 10em / fr ~11em) stays under viewport-gutter down to ~320px. Remove `text-wrap: balance` (nowrap supersedes) — keep `letter-spacing`.

### 1b. Quote fix
- `zh.json` `stack.quote1` → `"你什么时候都可以放弃，所以为什么是现在呢？"` (also align `background.quote` to same wording).
- Add `stack.quote1src`: en `"Rich Dad Poor Dad"`, zh `"《富爸爸穷爸爸》"`, fr `"« Père riche, père pauvre »"`. Render inside the `.quote` blockquote as `“{s.quote1}” — {s.quote1src}`? No — keep source on a new line inside blockquote via `<span>` styled mono/muted (match `.quote + p` style: mono 0.7rem uppercase muted).

### 1c. 12M plays (was 10M)
- `content.ts`: `PIANO.views` → `"12,000,000+"`; blurb "ten million" → "twelve million".
- `en.json`: `featured.piano.description` "10 million" → "12 million"; `stack.heroLede` + `stack.pianoBlurb` "ten million" → "twelve million"; `seq.clipLabels.channel` → `"channel — 12M+ views"`.
- `zh.json`: `featured.piano.description` "1000 万" → "1200 万"; `stack.heroLede` "千万播放" → "1200 万播放"; `stack.pianoBlurb` "已逾千万" → "已逾 1200 万"; `seq.clipLabels.channel` → `"频道 — 1200万+ 观看"`.
- `fr.json`: `featured.piano.description` "10 millions" → "12 millions"; `stack.heroLede` + `pianoBlurb` "dix millions" → "douze millions"; `seq.clipLabels.channel` → `"chaîne — 12M+ vues"`.
- `SequencerPage.tsx:49` `channel — 10M+ views` → `12M+`; `FeaturedGrid.tsx:182,314` `10M+ Views` → `12M+ Views`; `ArcadePage.tsx:30` `10,000,000+` → `12,000,000+`; `app/page.tsx` metadata "ten million" → "twelve million".
- `PRODUCT.md` + `.ai/PROJECT_CONTEXT.md` stat mentions → 12M.

### 1d. Piano video → 9:16 portrait
Verified: `Für Elise - Easy piano tutorial (1).mp4` is 720×1280. `.videoFrame video { aspect-ratio: 9 / 16 }`. Constrain frame: `.videoFrame { max-width: 340px; width: 100%; margin-inline: auto; }` so the portrait card doesn't dominate the piano grid. Keep `object-fit: cover`.

### 1e. supastack card → real OG image
`content.ts` FEATURED[0].image: `/supastack.svg` → `/supastack-OG.png` (already copied to `public/`). Keep svg file (footer mark is inline SVG anyway — check no other use of `/supastack.svg` first; if unused elsewhere it's fine to leave the file).

### 1f. Header always legible
Latent bug (screenshot showed transparent header over dark cards): `.header` transparent until JS adds `headerScrolled`. Make frost unconditional:
- `.header` gets `background: color-mix(in srgb, var(--page) 55%, transparent); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid transparent; transition: background-color .3s var(--ease), border-color .3s var(--ease)`.
- `.headerScrolled` keeps 78% bg + `border-bottom-color: var(--border)`.
- `@supports not (backdrop-filter)` fallback: `.header { background: var(--section) }`.

### 1g. Button hover → "key press" (NEW — user rejected the sheen sweep)
Buttons on this site behave like piano keys: hover = finger on the key (presses *down* 1px, accent underline sweeps in at the inner bottom edge); active = bottomed out. No shine/shimmer overlays.
- `.btn` gets `position: relative` and `transition: transform 160ms var(--ease), background-color 220ms var(--ease), border-color 220ms var(--ease), box-shadow 220ms var(--ease)`.
- `.btn::after { content:""; position:absolute; left:16px; right:16px; bottom:7px; height:2px; border-radius:2px; background: currentColor; transform: scaleX(0); transform-origin: left; transition: transform 280ms var(--ease); pointer-events:none; }`; `.btnSecondary::after { background: var(--accent) }` for the accent cue on the quiet button.
- `.btn:hover { transform: translateY(1px) }` (down, not up — key dip). `.btn:hover::after { transform: scaleX(1) }`. `.btn:active { transform: translateY(2px) scale(.97) }`.
- `.btnPrimary:hover` keeps `background: var(--accent-hover)` (no lift, no glow). `.btnSecondary:hover` → `background: var(--hover-fill); border-color: var(--border-strong)`.
- Keep the `.btnArrow` nudge. Reduced-motion block already kills transitions.

### 1h. Language pills → dropdown (supastack pattern)
Port `supastack/apps/web/src/i18n/language-switcher.tsx` structure, adapted to `LanguageContext` (buttons calling `setLang`, not links):
- `<details>` + `<summary>` trigger: `Languages` icon + `langLabels[lang]` + `ChevronDown` (rotates when open).
- `<ul>` popover: one `<button>` per `langOrder`, `Check` icon on active (`aria-current` semantics → use `aria-pressed` or `aria-checked`+`role=menuitemradio`; keep simple: `aria-current="true"` on the active item is fine for a nav-ish menu, but prefer `role="menu"`/`menuitemradio` with `aria-checked`).
- Behaviors (copy supastack): outside `pointerdown` closes; `Escape` closes + refocuses summary; `ArrowDown` on closed summary opens + focuses current item; `ArrowUp/Down` cycles items; `onBlur` leaving the details closes; close animation = `data-closing` attr + 140ms timeout before `open=false` (skipped under reduced-motion).
- CSS mirrors supastack `language-switcher.module.css` renamed into stack module (`langMenu`, `langTrigger`, `langChevron`, `langPop`, `langItem`, `langCheck`) with stack tokens; `data-side="top"` variant for the mobile-menu instance (popover opens upward).
- Replace `.langs` group in header AND in `.menuFoot`; delete `.langs*` CSS.

### 1i. Smooth language swap
- In `StackPage`: `const { lang, setLang } = useLang();` + `const [shown, setShown] = useState<Lang>(lang)` + `const [langSwap, setLangSwap] = useState(false)`; `const t = locales[shown]` (import `locales`).
- Effect: on `lang !== shown`, if reduced → `setShown(lang)`; else `setLangSwap(true)` → after 170ms `setShown(lang)` then double-rAF `setLangSwap(false)`. Cleanup timer.
- `data-lang-swap={langSwap || undefined}` on `.stack` root; CSS: `.stack[data-lang-swap] .main, .stack[data-lang-swap] .desktopNav, .stack[data-lang-swap] .menuPanel { opacity:0; filter:blur(6px); transform:translateY(4px) }` with matching `transition` on those elements (`opacity .17s var(--ease), filter .17s var(--ease), transform .17s var(--ease)`).
- `setLang` still called immediately (persist); the visual dict follows via `shown`.

### 1j. Sound toggle on the Für Elise video
Video is `muted autoPlay loop` — user wants a button to open/close sound.
- `const [soundOn, setSoundOn] = useState(false)`; `useEffect` syncs `video.current.muted = !soundOn` (user-gesture unmute is allowed; element starts muted for autoplay policy).
- Floating circular icon button overlaid top-right inside `.videoFrame` (absolute; `.videoFrame` needs `position:relative`): lucide `VolumeX` (muted state) / `Volume2` (unmuted), `aria-label` + `title` + `aria-pressed={soundOn}`.
- i18n keys `stack.pianoSoundOn`/`stack.pianoSoundOff`: en "Sound on"/"Mute", zh "开声音"/"静音", fr "Activer le son"/"Couper le son" (label describes the action — aria-label = the *target* action: muted → "Sound on"/"开声音"/"Activer le son").
- Style: 40px circle, `color-mix(in srgb, var(--page) 60%, transparent)` bg + `backdrop-filter: blur(10px)`, 1px `--border`, text color; hover → accent border + lift; respects reduced-motion.

### 1k. .ai mirrors
Update `.ai/src/components/stack/StackPage.md` (new dropdown, fade, header frost, hero nowrap, 9:16 video + sound toggle, key-press hover, quote1src), `.ai/src/lib/content.md` (12M + OG image), `.ai/PROJECT_CONTEXT.md` Current Work.

## Task 2 — supastack + starterkit (different repos, sequential)

### 2a. supastack header frost + button hover replacement (same latent bug / same rejected shimmer)
`D:\Noah\文档\Coding\supastack\apps\web\src\marketing\marketing.module.css`:
- Header: `.header` gets permanent `background: color-mix(in srgb, var(--page) 55%, transparent); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid transparent; transition: background .3s var(--ease), border-color .3s var(--ease)`. `.headerScrolled` → only bumps bg to 78% + `border-bottom-color: var(--border)`. `@supports not backdrop-filter` fallback stays opaque `--section` for both states.
- Buttons: REMOVE the `.home .btn::after` shimmer/sheen rules (the ::after block, the `@media (hover:hover) .home .btn:hover::after` sweep; keep/redo hover shadows). Replace with the same key-press treatment as the homepage, adapted to `.home .btn` tokens: `.home .btn { position: relative }` (it already has overflow:hidden/isolation — can drop if unused), `.home .btn::after` becomes the underline (`left:16px; right:16px; bottom:7px; height:2px; background: var(--accent-ink) on primary / var(--accent) on secondary — or currentColor`), hover → `transform: translateY(1px)` + underline `scaleX(1)`, `:active` → `translateY(2px) scale(.97)`. Keep `.btn > span` nudge. Update supastack `.ai/` doc for the marketing css if one exists.

### 2b. starterkit changelog (required by global rule after supastack change)
- `D:\Noah\文档\Coding\starterkit\apps\web\src\marketing\changelog-entries.ts`: new entry, today's date `2026-09-23` (unique), points like "Site header is always frosted — brand and nav stay legible over dark hero media and mid-scroll content".
- Add `"2026-09-23": { title, points }` overlay (same number of points) in every non-English locale under `apps/web/src/i18n/site-content/` (de es fr it ja ko nl pt ru tr zh) — real translations.
- Update `starterkit/.ai/PROJECT_CONTEXT.md` Current Work + `starterkit/.ai/apps/web/src/marketing/changelog-entries.md` Change History.
- Run `pnpm vitest run src/i18n/site-content/completeness.test.ts src/i18n/site-content/translation.test.ts` in `starterkit/apps/web`.

## Verify
- `npm run lint` + `npm run build` (homepage); `pnpm check:local`-lite (lint/typecheck the touched file) in supastack.
- Browser check on localhost:3000 — hero 2 lines, dropdown, fade, sheen hover, portrait video, scrolled header.
- `impeccable detect --json` on the stack files.
