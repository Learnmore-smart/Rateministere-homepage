# vercel.json

> Last updated: 2026-07-03 | Protection: STANDARD

## Purpose
Routes selected rateministere.com subpaths to external apps through Vercel rewrites.

## What It Does
- Keeps the homepage project as the owner of rateministere.com.
- Proxies `/trae-contest-2026` and nested paths to the Google Cloud Run TRAE contest app.
- Must avoid stale Vercel edge cache for the TRAE app because Cloud Run can redeploy independently from this homepage.

## Public API
| Name | Type | Description |
|------|------|-------------|
| rewrites | Vercel config | Maps public subpaths to external destinations. |
| headers | Vercel config | Controls Vercel behavior for proxied routes. |

## Dependencies
- External: Vercel routing and external-origin rewrites.
- External: Google Cloud Run service `trae-contest-2026-666870202581.asia-east1.run.app`.

## Agent Decisions / Thoughts
- 2026-07-03 Codex: The TRAE route should remain under `rateministere.com/trae-contest-2026`; do not move it to a separate domain unless the user changes the architecture.
- 2026-07-03 Codex: Online response showed `x-vercel-cache=HIT` for the proxied TRAE page. Disable rewrite caching for the whole TRAE subpath so Cloud Run deploys are not hidden by stale Vercel edge responses.
- 2026-07-04 Codex: `/trae-echoes` must proxy to the Trae Echoes deployment root and strip the public prefix for nested assets. The target Vercel app returns 200 at `https://trae-echoes-2026-contest.vercel.app/`, but 404 at `/trae-echoes`; its HTML references `/trae-echoes/assets/...`, so the homepage rewrite must map `/trae-echoes/:path*` to upstream `/:path*`.

## Important Notes / NEVER Change
- Do not remove the `/trae-contest-2026/:path*` rewrite unless the TRAE app is moved off the root domain.
- Keep the destination path prefix `/trae-contest-2026` because the TRAE app has `basePath: "/trae-contest-2026"`.

## Bug Fixes
| Date | Bug | Cause | Fix |
|------|-----|-------|-----|
| 2026-07-03 | TRAE detail pages can show not found until homepage redeploy | Vercel caches external rewrite responses while Cloud Run deploys independently | Add headers disabling Vercel rewrite caching for `/trae-contest-2026` and nested paths. |
| 2026-07-04 | `/trae-echoes` shows Vercel `DEPLOYMENT_NOT_FOUND`/`NOT_FOUND` | Rewrite pointed to stale alias `trae-echoes.vercel.app/trae-echoes`; current deployment lives at `trae-echoes-2026-contest.vercel.app` root and does not serve `/trae-echoes` upstream | Point to the current deployment host and strip the public prefix on upstream nested paths. |

## Change History
| Date | Change | Author |
|------|--------|--------|
| 2026-07-03 | Created documentation for Vercel rewrite cache fix | Codex |
| 2026-07-04 | Documented `/trae-echoes` rewrite root cause and fix plan | Codex |
