# src/components/ArchiveSection.tsx

> Last updated: 2026-11-01 | Protection: STANDARD

## Purpose
Archive section of the `/classic` homepage — a live-preview carousel (iframe
behind a click-to-interact facade) over all *web* projects, plus a numbered
archive list and a smaller "side projects" list.

## What It Does
- `projects: ProjectMeta[]` — the archive entries. `path` is either an internal
  route (`/wechat-read-stats`), an external site, or a GitHub URL.
- `webProjects = projects.filter(!github)` — drives the carousel + indicator
  dots. Clicking a github-only row opens the repo instead of the carousel.
- `sideProjects` — separate shorter list rendered below the archive.
- Names/descriptions come from `t.projects[id]` / `t.sideProjectItems[id]`
  (en/zh/fr JSONs) — a missing i18n key renders empty strings.

## Important Notes / NEVER Change
- Entries with a `github.com` path show only the GitHub icon; website entries
  get Globe + GitHub (when `github` set) icons.
- `activePt` falls back to `{name:"", description:""}` — always add the
  `t.projects` key for every new `projects` id.
- This list is independent from `src/lib/content.ts` `ARCHIVE` (the mockups'/
  StackPage list) — keep both in sync when adding archive projects.

## Change History
| Date | Change | Author |
|------|--------|--------|
| 2026-11-01 | RateMinistere year corrected 2026→2025; added `novapuraai` (novapuraai.com + github router repo) and `file-guardian` (github-only) after opennotes | Devin |
