# src/components/roll/ — RollPage.tsx, roll.module.css, frames.ts, LangMenu.tsx, useShownLang.ts, themeSpread.ts

> Last updated: 2026-11-15 | Protection: STANDARD

## Purpose
`/` homepage — "The Roll". The body of work as one roll of film on a
light table: a contact sheet of 24 frames at the top (the whole roll at
a glance, and the page's table of contents), the selects enlarged as
prints, the archive as an index, and frame No. 25 cut out of the strip —
the redacted secret project. Comes from the user's own Walter Mitty line
("One day, I'll find my negative No.25"). StackPage lives on at `/stack`.

## Open Threads / Resume Context
- **Status:** ready_for_next — built and verified locally 2026-11-15,
  waiting for the user's verdict. NOT committed, pushed or deployed.
- **If rejected:** point `src/app/page.tsx` back at `StackPage`;
  `components/stack/` is untouched. Content updates (BLADE, 14M / 4.5M
  stats) are independent of the design and should stay.
- **If approved:** offer `DESIGN.md` (none exists yet), then commit.
- **Flagged to user, undecided:** `novapuraai.com` refuses connections
  and its Vercel mirror says the service is archived — the archive row
  still links the dead domain.

## Structure (page order = frame order)
| Section | Frames | Form |
|---------|--------|------|
| Hero sheet | 01–24 | film strips, 8-up (4-up <900px), each frame links to `#f-<id>` |
| `#piano` | 01 channel, 02 Für Elise | horizontal film stub + vertical "reel" with the autoplaying video |
| `#work` | 03–12 | prints (white paper, slight tilt); films are click-to-play facades |
| `#archive` | 13–24 | index rows with mini frames; open-source rows get a `.gh` repo mark |
| `#about` | — | portrait print (`ProtectedImage`), facts, quote, recognition |
| tail | 24 · 25 · 26–29 | strip with No. 25 cut out (button → toast), 26 = `build;`, 27–29 unexposed |
| `#contact`, footer | — | type on the table |

- `frames.ts` builds `ROLL` from `FEATURED` + `ARCHIVE` (content.ts).
  Strings: `t.roll.*` (new) + `t.stack.*` (shared with StackPage).
- Theme: `localStorage("roll_theme")` → `<html data-roll-theme>`; dark =
  "lights off". Language: `LanguageContext`, crossfade via `useShownLang`.

## Important Notes / NEVER Change
- **The roll must hold exactly 24 frames** — that is the only reason the
  secret is "No. 25". Selects = 2 piano frames + every FEATURED product
  + each film; ARCHIVE fills the rest and overflow drops into the
  "earlier rolls" list (`EARLIER`). Adding a FEATURED product pushes one
  archive entry off the sheet automatically; never raise `ROLL_LENGTH`.
- **New frame = new asset.** `public/roll/thumb/<id>.webp` (480×252) and,
  for selects, `public/roll/print/<id>.webp` (≤1400 wide), then add the
  id to `THUMBS` / `PRINTS` in frames.ts. Without them the frame falls
  back to the project's own `image`. Recipe: ffmpeg
  `crop='min(iw,ih*1200/630)':'min(ih,iw*630/1200)',scale=480:252`,
  `-c:v libwebp -q:v 80`. Archive thumbs are 1200×630 screenshots of the
  live sites; `blade-OG.png` was authored from BLADE's logo + README.
- Images are plain `<img>` on purpose (no `next/image`): static files,
  no optimizer quota.
- The portrait stays behind `ProtectedImage` + `/p/*`.
- `--dev` is registered with `@property` in **globals.css**, not the
  module. Without it the develop wash snaps instead of sweeping.

## Gotchas (learned the hard way)
- **Film geometry is container-relative.** `.cell` is a size container;
  `--p` (pitch) = `100cqw / 8` = 35mm's eight perforations per frame,
  and band / rebate / holes derive from it. The vars are set on
  `.cell > *` because an element cannot read its own `cqw`.
- **Leaders** (`--ll` / `--lr`) extend the `.film` layer in whole frame
  widths so perforations stay in phase. They are set per column count —
  change the grid columns and the `nth-child` rules together.
- Perforations are a 3-layer mask (`mask-composite: exclude`): holes
  top, holes bottom, solid. The page shows through, so they follow the
  theme for free.
- **Develop states** live on `.pic[data-dev]` and are set only by JS
  (`wait` → `run` → `done`); markup never hides a picture, so no-JS and
  reduced motion get finished frames. The sheet's wave is pure CSS and
  `data-hold` only delays it while images download.
- The dev server once served a stale `globals.css` chunk after an edit
  (new rules missing until restart). If a globals change does not show:
  kill the server, `rm -rf .next/dev`, restart.
- `.rowName .tri` needs `display: inline-block` — Tailwind's reset makes
  every `svg` a block, which drops the arrow under a wrapped name.
- `.headerEnd .headerCta` / `.headerEnd .menuBtn` carry the extra class
  for specificity over `.btn` / `.iconBtn` (same trap as StackPage).
- **Repo marks never nest inside the row link.** `.gh` is a *sibling* of
  `.row` (absolute, right edge; `li` is `position: relative`, `.row`
  reserves `padding-right`) because an `<a>` inside an `<a>` is invalid.
  Same trick on StackPage (`.archiveItem` + `.archiveGh`). In print
  captions the mark goes *inside* `.link` only when `url === github`
  (`.ghMark`); otherwise a `.capGh` sibling is rendered.
- **Fresh dots are opt-in.** `FRESH` in `frames.ts` is an empty set —
  add a product id when something new ships. `anyFresh` gates the sheet
  legend's "New" key so an empty set leaves no orphan legend.
- Shell commands on this machine truncate near 8,000 characters — write
  large files with the file tool, not a heredoc.

## Agent Decisions / Thoughts
- **2026-11-15 Devin:** Film for what is on the roll (sheet, reel, tail),
  paper for what was enlarged (selects, portrait). Tried in thought:
  perforated strips for the selects too — at print size the bands eat
  140px per row and bury the screenshots.
- **2026-11-15 Devin:** One family, Archivo, split by width (125% titles,
  100% text, 70–75% edge print). Amber film + grease-pencil red on a
  cool white table; red is reserved for marks, numbers and hover.
- **2026-11-15 Devin:** Only BLADE was approved for the page. SupaStat,
  the retail monorepo, the notary sites and the wave renderer stay off
  until the user says otherwise.

## Change History
| Date | Change | Author |
|------|--------|--------|
| 2026-11-15 | Created; promoted to `/` locally (StackPage → `/stack`) | Devin |
| 2026-11-15 | `ARCHIVE` reordered: `rate` (RateMinistere voting platform) moved to the end → frame No. 01, `msu` at No. 02, all 12 stay on the sheet. Favicon mark center bar blue → orange `#e08b33` (film amber) in `favicon.svg` + regenerated `src/app/favicon.ico` | Devin |
| 2026-11-16 | "New" dots removed (`FRESH` emptied, legend gated on `anyFresh`); open-source rows get a GitHub mark — every `ARCHIVE` entry now carries `github`, `.gh` sibling link opens the repo in a new tab, print captions use `.ghMark`/`.capGh`, label `stack.ghLabel`; tail extended 3 → 6 cells (27–29 unexposed) at ORIGINAL frame size — `.tail` is `width: 200%; max-width: 1800px` so cells stay `min(300px, wrap/3)` and the strip runs off the right edge (never subdivide the strip narrower — the user rejected that); `.roll ::selection` grease → film amber | Devin |
