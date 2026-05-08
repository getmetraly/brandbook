# Phase 5 Website Backlog

## Purpose

Turn the website migration phase into concrete backlog items. This phase reduces the website’s local primitive set and aligns public-facing pages with the canonical brandbook system without changing the editorial contract.

## Phase Goal

Make the website visually and structurally closer to brandbook so the public marketing and docs surfaces can reuse shared primitives where it is safe to do so.

## Scope

### In Scope

- Website shell, nav and footer primitives.
- Marketing page blocks such as hero, pricing cards, trust blocks and CTA blocks.
- Docs page layouts and reusable content-page patterns.
- Code block, callout, card, grid and section primitives.
- Claim-safe wording and route stability.

### Out of Scope

- No backend changes.
- No direct changes to `../website`.
- No attempt to force all website styling into brandbook if it would weaken the editorial or marketing requirements.
- No app dashboard or editor migration.

## Backlog Items

### 5.1 Align Website Shell With Brandbook

- Identify which shell pieces on the website should converge with brandbook primitives:
  - `SiteShell`
  - `SiteNav`
  - `SiteFooter`
  - `ThemeToggle`
- Confirm which pieces stay website-specific because of routing or editorial needs.
- Document the boundaries so shell refactors do not break route behavior.

### 5.2 Normalize Marketing Blocks

- Review hero sections, pricing blocks, trust blocks, CTA blocks and feature grids on the main marketing pages.
- Determine which can be expressed with shared `Card`, `Grid`, `Section`, `SectionHeader`, `StatusPill` and `ButtonLink` primitives.
- Preserve the existing tone: calm, claim-safe and editorially clear.
- Avoid importing brandbook styling that makes the website feel too rigid or dashboard-like.

### 5.3 Normalize Docs Page Layouts

- Review the docs layout, docs shell and docs content pages for reusable structure.
- Confirm that code blocks, callouts, prose and note components map cleanly to brandbook equivalents.
- Keep route-specific documentation pages readable on desktop and mobile.
- Preserve the current claims and product-status wording from `../docs`.

### 5.4 Align Core UI Primitives

- Confirm whether website-local primitives should be retained or migrated to brandbook equivalents.
- Review `ButtonLink`, `Card`, `CardLink`, `CardHeader`, `CardText`, `Grid`, `Page`, `Section`, `SectionHeader`, `Stack`, `StatusPill`, `Prose`, `Note` and `Highlight`.
- Decide which primitives become canonical cross-repo contracts and which remain website-local for content reasons.

### 5.5 Preserve Route Stability And Claim Safety

- Keep homepage, pricing, demo, docs, trust, blog, privacy and terms routes stable.
- Verify that claim-safe wording remains aligned with the docs/status system.
- Document any page copy that must not change during the migration.

### 5.6 Add Website Coverage For Shared Surfaces

- Capture tests or visual checks for the marketing hero, pricing cards, docs layout and article shell surfaces.
- Ensure route smoke coverage includes the public pages that represent the brand most directly.
- Add responsive checks for the top-level marketing and docs layouts.

### 5.7 Document Website Migration Boundaries

- Record which website components are safe first-phase migration candidates.
- Record which pages should migrate only after brandbook primitives are stable.
- Keep a clear separation between canonical shared primitives and website-specific editorial composition.

## Required Tests

- website lint and typecheck.
- route smoke tests.
- claim lint coverage.
- page-level visual checks for homepage, pricing, demo and docs sections.
- responsive checks for desktop and mobile widths.

## Deliverables

- Mapped website shell and page primitives.
- Migration boundaries for shared versus website-specific components.
- Route and claim-safety notes for the public pages.
- Test coverage plan for the most visible pages.

## Acceptance Criteria

- Website routes still render and still pass claim checks.
- The website visually matches the shared brand language more closely without changing the message.
- Shared primitives are used where they add consistency without harming the editorial structure.
- Route and content stability are preserved throughout the migration.

## Risks

- Marketing copy can drift into unsupported claims if the source docs are not followed.
- Shared primitives can make marketing pages feel too rigid if not applied carefully.
- Over-shared shell primitives can unintentionally collapse page-specific layout needs.

