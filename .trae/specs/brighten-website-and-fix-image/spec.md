# Brighten Website and Fix Image Spec

## Why
The current website uses a dark, terminal-inspired aesthetic which feels too dark and heavy. Additionally, the YouTube channel image in the featured section is broken (`/ytb.png` does not exist). The goal is to fix the image path and completely redesign the site to be bright, airy, and visually striking, following high-quality frontend design principles.

## What Changes
- Fix the YouTube image source from `/ytb.png` to `/Noah-Piano-Journey.png`.
- Change the color palette in `globals.css` from dark mode to a light, premium, editorial theme.
- Update `layout.tsx` to use an elegant serif/sans-serif pairing (e.g., Inter and Playfair Display) instead of a purely monospace terminal font.
- Redesign `page.tsx` to remove terminal UI borders and elements, utilizing a cardless layout with rigorous spacing, beautiful typography, and clean hierarchy.
- Refactor the Hero section to feature a clean, bright composition instead of a terminal window.
- Ensure the overall aesthetic feels deliberate, premium, and current.

## Impact
- Affected specs: UI/UX redesign, Image path correction
- Affected code: `src/app/page.tsx`, `src/app/globals.css`, `src/app/layout.tsx`

## ADDED Requirements
### Requirement: Light Theme Design
The system SHALL use a light, premium color palette with a clean background and strong contrast for text, abandoning the previous dark terminal look.

### Requirement: Broken Image Fix
The system SHALL load the correct image for the YouTube channel.

## MODIFIED Requirements
### Requirement: Typography
The typography SHALL shift from `JetBrains Mono` to a premium combination of typefaces suitable for a clean, editorial portfolio.

## REMOVED Requirements
### Requirement: Terminal Aesthetic
**Reason**: The user requested to redesign the full website because it is too dark. The terminal aesthetic inherently relies on dark themes and heavy borders.
**Migration**: Replace terminal windows and code-like structures with cardless, organic, whitespace-heavy layouts.
