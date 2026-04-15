# Brighten Website and Fix Images Spec

## Why
The current website uses a dark, terminal-inspired aesthetic which feels too dark and heavy. Additionally, both the LearnX and YouTube channel images in the featured section are broken due to path and filename mismatches (`/learnx.png` vs `/LearnX.png`, and `/ytb.png` vs `/Noah-Piano-Journey.png`). The goal is to fix the image paths (handling case sensitivity and correct filenames) and completely redesign the site to be bright, airy, and visually striking, following high-quality frontend design principles. 

## What Changes
- Fix the LearnX image source to exactly match the file name `/LearnX.png`.
- Fix the YouTube image source to match the file name `/Noah-Piano-Journey.png`.
- Ensure standard `<img>` tags are used with relative paths to avoid domain restrictions.
- Change the color palette in `globals.css` from dark mode to a light, premium, editorial theme.
- Update `layout.tsx` to use an elegant serif/sans-serif pairing instead of a purely monospace terminal font.
- Redesign `page.tsx` to remove terminal UI borders and elements, utilizing a cardless layout with rigorous spacing, beautiful typography, and clean hierarchy.
- Refactor the Hero section to feature a clean, bright composition instead of a terminal window.
- Ensure the overall aesthetic feels deliberate, premium, and current.

## Impact
- Affected specs: UI/UX redesign, Image path correction
- Affected code: `src/app/page.tsx`, `src/app/globals.css`, `src/app/layout.tsx`

## ADDED Requirements
### Requirement: Light Theme Design
The system SHALL use a light, premium color palette with a clean background and strong contrast for text, abandoning the previous dark terminal look.

### Requirement: Broken Images Fix
The system SHALL load the correct images for both LearnX and the YouTube channel by matching the exact casing and filenames present in the `public` directory.

## MODIFIED Requirements
### Requirement: Typography
The typography SHALL shift from `JetBrains Mono` to a premium combination of typefaces suitable for a clean, editorial portfolio.

## REMOVED Requirements
### Requirement: Terminal Aesthetic
**Reason**: The user requested to redesign the full website because it is too dark. The terminal aesthetic inherently relies on dark themes and heavy borders.
**Migration**: Replace terminal windows and code-like structures with cardless, organic, whitespace-heavy layouts.
