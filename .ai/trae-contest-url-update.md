# Trae Contest URL Update

## Request
Add the GitHub URL for the Trae Contest ranking card in the featured demos.

## Current location
- `src/components/FeaturedGrid.tsx`
- `src/i18n/en.json` contains the Trae Contest copy

## Local hypothesis
- The featured card currently points to the live site for both the iframe preview source and the outbound link.
- The new GitHub repo URL should probably replace the outbound action, and may also replace the displayed preview URL if the embedded preview is no longer meant to be the live demo.

## Pending clarification
- Decide whether the GitHub URL should update only the button/link or both the link and the iframe preview target.
