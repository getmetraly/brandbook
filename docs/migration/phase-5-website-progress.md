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


## Boundary decision

The first migration step should be documentation and boundary alignment, not direct route rewrites.
Shared primitives should be adopted only where they preserve editorial structure and route behavior.

## Next step

Proceed with 5.1 by documenting the exact website shell boundaries and the safe first-phase migration candidates.
