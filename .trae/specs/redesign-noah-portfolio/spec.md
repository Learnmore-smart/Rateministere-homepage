# Redesign Noah Portfolio Spec

## Why
The current website is positioned as an "index system" with a brutalist aesthetic (red, black, grid lines). The user, Noah Zhang, wants the website to reflect his personal identity as a software developer, creator of LearnX, and content creator, utilizing a more approachable pastel blue color palette.

## What Changes
- Replace the "RateMinistere" index system branding with Noah Zhang's personal branding.
- Change the color scheme to use pastel blue as the primary color.
- Update typography to be elegant and personal (2 typefaces max).
- Add new sections for About Me (Montreal, QC, Marianopolis College).
- Feature LearnX and Noah's Piano Journey with image placeholders.
- Maintain the current list of projects in a clean, cardless layout.
- Include a technical skills section and background/languages.
- Update footer and navigation to feature social links (LinkedIn, YouTube, X, Instagram, Email).
- **BREAKING**: Removes the "RateMinistere" identity and the brutalist red/black theme.

## Impact
- Affected specs: UI/UX layout, typography, color palette, copywriting.
- Affected code: `src/app/page.tsx`, `src/app/globals.css`.

## ADDED Requirements
### Requirement: Personal Portfolio Design
The system SHALL present Noah Zhang's personal portfolio.

#### Scenario: Viewing the hero section
- **WHEN** a user visits the site
- **THEN** they see Noah Zhang's name, his roles (Software Developer, Creator of LearnX, Content Creator), and a clear CTA.

#### Scenario: Viewing featured ventures
- **WHEN** a user scrolls past the hero
- **THEN** they see dedicated sections for LearnX and Noah's Piano Journey with accompanying images/videos.

## MODIFIED Requirements
### Requirement: Project Directory
The system SHALL display the existing list of projects.

#### Scenario: Browsing projects
- **WHEN** a user views the projects section
- **THEN** they see the list of 10 existing projects formatted cleanly without traditional cards, matching the new aesthetic.

## REMOVED Requirements
### Requirement: Index System Branding
**Reason**: The user explicitly requested the site not to be an "index system".
**Migration**: Replace all references to "RateMinistere", "Central Namespace", and "Index System" with personal portfolio content.