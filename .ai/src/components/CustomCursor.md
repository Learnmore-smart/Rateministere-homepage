# CustomCursor

> Last updated: 2026-07-03 | Protection: STANDARD

## Purpose

Custom browser cursor for fine-pointer devices on the homepage.

## What It Does

- Tracks pointer coordinates with Framer Motion motion values.
- Hides the native cursor on fine-pointer devices through global CSS.
- Switches visual cursor modes for normal links/buttons and richer preview actions.
- Renders through a document-body portal so it stays above the page.

## Public API

| Name | Type | Description |
|------|------|-------------|
| `CustomCursor` | React client component | Installs and renders the site cursor. |

## Props / Parameters

This component has no props.

## Dependencies

- **Internal:** `src/app/page.tsx` renders the cursor once for the homepage.
- **External:** `framer-motion` handles pointer-follow springs and visual transitions.
- **External:** `react-dom` supplies `createPortal`.

## Agent Decisions / Thoughts

- **2026-07-03 Codex:** Hover mode should not animate border thickness. Use a constant visual stroke via shadow/inset styling so the ring grows smoothly without a border-width pop.
- **2026-07-03 Codex:** Hover mode should use a clipped full-surface background instead of a separately visible border/ring. This keeps the soft blue hover color without a stroke that can appear detached during spring movement.
- **2026-07-03 Codex:** Keep the cursor visible on any fine-pointer viewport. The component already suppresses itself on touch devices, so a Tailwind `hidden md:flex` class can create a missing-cursor bug on narrow desktop windows.
- **2026-07-03 Codex:** Removed the mount-state effect pattern from this component because the React hooks linter rejects synchronous `setState` inside effects.
- **2026-07-03 Codex:** Circle cursor modes should avoid outer shadows as well as borders; any outside visual halo can look like a detached outline when the cursor is moving quickly.

## Important Notes / NEVER Change

- Keep `"use client"` because this component uses `window`, pointer events, state, and portals.
- Keep the custom cursor disabled on touch/coarse-pointer devices.
- Do not make the cursor intercept pointer events.

## Bug Fixes

| Date | Bug | Cause | Fix |
|------|-----|-------|-----|
| 2026-07-03 | Hover cursor suddenly becomes blue inside and border appears wider | A single cursor element changed hover `backgroundColor` to blue tint and `borderWidth` from `0` to `2` | Removed animated border width and moved cursor color into a clipped internal surface layer. |
| 2026-07-03 | Hover ring appears stuck beside the blue dot before disappearing | The hover stroke is still a visible ring layer, so during size/position spring movement it can read as a detached border | Replace hover stroke with a clipped full-surface background layer and keep the dot centered over it. |

## Change History

| Date | Change | Author |
|------|--------|--------|
| 2026-07-03 | Created documentation and planned hover cursor smoothing fix | Codex |
| 2026-07-03 | Implemented transparent hover ring, inset stroke, center dot, and scoped lint cleanup | Codex |
| 2026-07-03 | Planned clipped-background cursor refinement to remove detached hover ring | Codex |
| 2026-07-03 | Implemented clipped full-surface hover background and removed hover stroke | Codex |
| 2026-07-03 | Removed circle-mode outer shadow to avoid stray outline artifacts | Codex |
