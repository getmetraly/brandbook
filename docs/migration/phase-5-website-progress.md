# Phase 5 Website Progress

## Purpose

Track the website migration phase as concrete boundary work before any downstream code changes.
This phase reduces the website’s local primitive set and aligns public-facing pages with the canonical brandbook system without changing the editorial contract.

## Current state

The website shell has been mapped against the current website implementation:

- `SiteShell` is the top-level composition wrapper for nav, main content and optional footer.
- `SiteNav` is route-aware and owns the main navigation, mobile menu, CTA and theme toggle entry point.
- `SiteFooter` owns the route directory, legal links and brand/legal copy.
- `ThemeToggle` is client-side theme state and should stay isolated from content primitives.

Reusable cross-surface primitives already in use on the website include:

- `ButtonLink`
- `Card`, `CardLink`, `CardHeader`, `CardText`
- `Grid`
- `Page`, `Section`, `SectionHeader`, `Stack`
- `StatusPill`, `Prose`, `Note`, `Highlight`
- `Icon`

Website-specific composition remains necessary for:

- route-aware nav and footer content;
- docs shell and article shell structure;
- marketing copy, claim-safe wording and page-specific hero composition;
- theme persistence and client-only toggle behavior.
## Marketing block mapping

The website already uses shared primitives for most public-facing marketing and docs blocks:

- homepage hero, feature grid, role cards, AI block and roadmap cards;
- pricing plan cards and CTA rows;
- trust page cards, notes and centered prose;
- docs landing cards, callouts and hero CTA pairs;
- blog archive cards and article metadata blocks.

The local CSS layer still owns the page-specific glow, spacing, card density and route-specific composition around those primitives.

## Docs layout mapping

The website docs routes already combine shared primitives with route-specific wrappers:

- docs landing page: `SiteShell`, `Page`, `SectionHeader`, `Grid`, `CardLink`, `CardHeader`, `CardText`, `ButtonLink`.
- docs route layout: `SiteShell showFooter={false}` plus the route-local docs content wrapper.
- blog article page: `SiteShell`, `ContentPage`, `Section`, `Stack`, `SectionHeader`, `StatusPill`, `Prose` and the article TOC.
- legal pages: `SiteShell`, `ContentPage`, `Prose`, `Note`, `Highlight`.

These routes should stay website-owned because they encode route behavior, content hierarchy and public claim policy.

Shared primitives are acceptable here when they keep the docs readable on desktop and mobile without changing the editorial contract.
## Primitive ownership split

Cross-repo shared primitives can absorb the website’s presentation layer without absorbing its route or content contracts.

Shared candidates:

- `ButtonLink`
- `Card`, `CardLink`, `CardHeader`, `CardText`
- `Grid`
- `Page`
- `Section`
- `SectionHeader`
- `Stack`
- `StatusPill`
- `Prose`
- `Note`
- `Highlight`
- `Icon`

Website-local wrappers that should stay in `../website`:

- `SiteShell`
- `SiteNav`
- `SiteFooter`
- `ThemeToggle`
- `ContentPage`
- `ReadingProgress`
- `ArticleToc`

This split keeps editorial composition, route navigation and theme persistence owned by the website while allowing the shared primitives to cover layout, cards and prose.
## Route stability and claim safety

The website migration must keep the current public routes stable:

- `/`
- `/ai`
- `/pricing`
- `/docs`
- `/demo`
- `/trust`
- `/blog`
- `/privacy`
- `/terms`

Claim-safe copy should continue to follow the public docs/status vocabulary:

- real UI and synthetic data are safe;
- dashboard editing is in progress;
- connectors are next;
- AI direction is designed / evolving;
- pricing pages remain preview anchors until license activation exists.

Any future migration work should preserve these routes and the current wording unless the status docs change first.
## Coverage baseline

Current website coverage already includes:

- Playwright route smoke tests in `website/tests/e2e/routes.spec.ts` for `/`, `/pricing`, `/docs`, `/demo`, `/ai`, `/trust`, `/privacy`, `/terms` and `/demo-app`.
- the `smoke:routes` script in `website/scripts/smoke-routes.mjs`, which verifies the same route set at the HTTP layer.

Coverage gaps to address next:

- page-level visual checks for homepage, pricing, demo and docs sections;
- responsive checks for the top-level marketing and docs layouts;
- claim-lint and docs-status checks tied to the public wording.

The next phase step should tighten these checks without moving route composition out of the website repo.
## Migration boundary matrix

Safe first-phase candidates:

- shared primitives already used by the website: `ButtonLink`, `Card`, `CardLink`, `CardHeader`, `CardText`, `Grid`, `Page`, `Section`, `SectionHeader`, `Stack`, `StatusPill`, `Prose`, `Note`, `Highlight`, `Icon`;
- marketing blocks that already map cleanly to those primitives: homepage hero, feature grid, role cards, AI block, roadmap cards, pricing cards, docs landing cards, trust notes, and blog archive cards;
- docs content framing that stays editorially stable while using shared layout primitives: docs landing, legal pages, and article metadata shells.

Pages and wrappers that should wait until shared primitives are stable:

- `SiteShell`, `SiteNav`, `SiteFooter`, `ThemeToggle`;
- `ContentPage`, `ReadingProgress`, `ArticleToc`;
- route-level hero and shell composition for `/`, `/docs`, `/blog`, `/privacy`, `/terms`.

This keeps the website’s editorial and route contracts intact while lowering the primitive count in the public marketing surface first.







## Boundary decision

The first migration step should be documentation and boundary alignment, not direct route rewrites.
Shared primitives should be adopted only where they preserve editorial structure and route behavior.

## Next step

Proceed with 5.7 by documenting which pages should wait for shared primitives to stabilize and which shared surfaces are safe to migrate first.

