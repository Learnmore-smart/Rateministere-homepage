# Dev Webpage Redesign Spec

## Why
The user wants the personal portfolio to feel more like a "dev's webpage", incorporating a sleek developer aesthetic with a blue and pastel blue color palette. Additionally, the user specifically requested to display "Learnmore_smart" at the top of the page while keeping "Noah Zhang" at the bottom left.

## What Changes
- **Aesthetic Overhaul**: Transition the UI to a "dev's webpage" style (e.g., terminal/editor-inspired, clean minimal developer layout, prominent use of monospace fonts).
- **Color Palette**: Implement a blue and pastel blue color scheme.
- **Top Header/Hero**: Change the primary name at the top to "Learnmore_smart".
- **Footer**: Ensure "Noah Zhang" is displayed at the bottom left.
- **Typography & Layout**: Use developer-friendly fonts (e.g., JetBrains Mono) and structured, data-driven layouts for projects and skills.

## Impact
- Affected specs: UI/UX layout, typography, color palette, copywriting.
- Affected code: `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/globals.css`.

## ADDED Requirements
### Requirement: Developer Aesthetic
The system SHALL present the portfolio with a distinctive developer-focused aesthetic using pastel blue accents.

#### Scenario: Viewing the hero section
- **WHEN** a user visits the site
- **THEN** they see "Learnmore_smart" prominently at the top, styled with a dev-inspired design (e.g., terminal window, code-like presentation).

## MODIFIED Requirements
### Requirement: Footer Branding
The system SHALL display the correct personal branding in the footer.

#### Scenario: Viewing the footer
- **WHEN** a user scrolls to the bottom of the page
- **THEN** they see "Noah Zhang" located at the bottom left.
