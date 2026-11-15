# src/app/page.tsx

> Last updated: 2026-11-01 | Protection: STANDARD

## Purpose
Route entry for `/` — a thin server wrapper that renders `StackPage` inside
`LanguageProvider` and exports the page-level `metadata` (title +
description; OG/Twitter images live in `layout.tsx`).

## Important Notes
- The meta `description` enumerates the featured products — keep it in sync
  with `FEATURED` in `src/lib/content.ts`.

## Change History
| Date | Change | Author |
|------|--------|--------|
| 2026-11-01 | Meta description: added FkLearn to the product list | Devin |


## 2026-11-13 Update
- Updated page `description` metadata to include Cairn alongside LearnX and SpinShare.

## 2026-11-15 Update
- Renders `RollPage` (was `StackPage`, now at `app/stack/page.tsx`). Metadata description names BLADE and "fourteen million views". Revert = swap the import back.
