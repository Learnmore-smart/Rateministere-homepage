# src/i18n/en.json (+ zh.json, fr.json)

> Last updated: 2026-11-01 | Protection: STANDARD

## Purpose
English source of truth for the custom `LanguageContext` i18n (en/zh/fr —
see `src/components/LanguageContext.tsx`). Used by `/` (StackPage via
`t.stack.*`), `/classic`, and `/sequencer`.

## Structure
- `featured.*` / `recent.*` — `{label, heading, description}` per project id;
  StackPage's `featuredDesc` falls back featured → recent → projects →
  `content.ts` `p.desc`.
- `projects.*` — `{name, description}` per archive id; keyed by the
  `ARCHIVE_I18N` maps in StackPage/SequencerPage (content id → i18n key) and
  by ArchiveSection ids directly.
- `sideProjectItems.*`, `recognitionItems.*`, `seq.*`, `stack.*`.

## Important Notes / NEVER Change
- All three locale files must carry the SAME key set — additions go into
  en + zh + fr together, translated (never copy English into zh/fr).
- `stack.workSub`/`archiveSub` hardcode the featured/archive counts
  ("Six live", "Twelve entries") — update whenever FEATURED/ARCHIVE change.
- `stack.heroLede` enumerates the featured products — keep it in sync with
  `FEATURED` in `content.ts`.

## Change History
| Date | Change | Author |
|------|--------|--------|
| 2026-11-01 | Added `featured.fklearn`, `projects.novapuraai`, `projects.file-guardian`; workSub 5→6, archiveSub 10→12, heroLede +FkLearn (all three locales) | Devin |
