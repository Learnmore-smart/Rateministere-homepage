# vercel-rewrites.test.mjs

> Last updated: 2026-07-04 | Protection: STANDARD

## Purpose
Checks that important external Vercel rewrites point to the expected live upstream paths.

## What It Does
- Parses `vercel.json` as JSON.
- Verifies `/trae-echoes` proxies to the current Trae Echoes deployment root.
- Verifies `/trae-echoes/:path*` strips the public path prefix before forwarding nested assets upstream.

## Public API
| Name | Type | Description |
|------|------|-------------|
| `node test/vercel-rewrites.test.mjs` | command | Runs the rewrite regression checks. |

## Dependencies
- Internal: `../vercel.json` for rewrite configuration.
- External: Node.js built-in `node:test`, `node:assert/strict`, `node:fs`, and `node:path`.

## Agent Decisions / Thoughts
- 2026-07-04 Codex: A local config test is enough for this bug because the failure is a deterministic rewrite target mismatch, not UI behavior.

## Important Notes / NEVER Change
- Keep assertions focused on public-to-upstream path mapping, not the full rewrite list order.

## Bug Fixes
| Date | Bug | Cause | Fix |
|------|-----|-------|-----|
| 2026-07-04 | Missing regression coverage for `/trae-echoes` rewrite target | No test checked whether upstream paths matched the live deployment shape | Add a focused Node test for the route and nested asset rewrite. |

## Change History
| Date | Change | Author |
|------|--------|--------|
| 2026-07-04 | Created test documentation before adding rewrite test | Codex |
