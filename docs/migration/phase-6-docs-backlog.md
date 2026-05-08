# Phase 6 Docs Backlog

## Purpose

Turn the documentation phase into concrete backlog items. This phase keeps the brandbook docs portal canonical, navigable and aligned with the grouped preview surface instead of drifting back toward a monolithic showcase.

## Phase Goal

Make the docs portal the clearest reference for the design system, with consistent navigation, clear page hierarchy and page-level examples that stay in sync with the underlying primitives.

## Scope

### In Scope

- Docs shell, top nav, sidebar, breadcrumbs, related links and previous/next links.
- Registry-driven navigation and route grouping.
- Grouped component, pattern and example pages.
- Docs page status labels and legacy notes.
- Docs route render and navigation coverage.

### Out of Scope

- No app dashboard migration.
- No website marketing-page migration beyond docs reference pages.
- No new design primitives unrelated to docs presentation.
- No direct changes to `../app` or `../website`.

## Backlog Items

### 6.1 Keep Navigation Registry-Driven

- Keep `site/app/lib/docs/navigation.ts` as the canonical source for docs navigation.
- Verify that top-level nav, sidebar nav, breadcrumbs, related links and prev/next links all derive from the same registry.
- Keep status labels consistent across nav, route cards and page headers.
- Avoid one-off links that bypass the registry.

### 6.2 Harden The Docs Shell Contract

- Confirm the canonical behavior of `DocsShell`, `DocsTopNav`, `DocsSidebar`, `DocsBreadcrumbs`, `RelatedLinks` and `PrevNextLinks`.
- Verify that the shell continues to support route titles, descriptions, toc items and page-level status.
- Preserve the compact engineering-first layout and avoid turning the docs shell into a generic marketing layout.
- Ensure the docs shell remains readable at desktop and mobile widths.

### 6.3 Keep Grouped Pages Canonical

- Maintain grouped component pages for primitives, forms, data-display, dashboard, navigation, feedback and charts.
- Maintain grouped pattern pages for dashboard layout, widget editor, filters, empty states and loading states.
- Maintain grouped example pages for engineering dashboard and the example scenarios that belong with it.
- Ensure each page has a clear title, description and route-level role.

### 6.4 Complete Missing Or Weak Docs Pages

- Review which grouped pages still feel placeholder-like and should be refined next.
- Promote only the docs pages that are ready to be canonical examples.
- Keep charts marked as an unfinished wrapper surface until the chart contract is stable.
- Ensure page copy clearly distinguishes ready, planned and preview surfaces.

### 6.5 Normalize Page-Level Composition

- Use `DocsSection`, `DocsCardGrid`, `DocsRouteCard`, `ComponentPreview`, `ComponentStateGrid`, `CodeBlock` and `LegacyNotice` consistently.
- Keep page structure DRY across all grouped route families.
- Avoid duplicated page scaffolding when a shared docs block already exists.
- Preserve clear state and code examples for each canonical page.

### 6.6 Preserve Legacy Notes Without Promoting Legacy Patterns

- Keep legacy or cleanup notes visible where they are needed.
- Ensure legacy notes describe migration context, not canonical behavior.
- Remove stale `/draft` or sandbox language from active docs pages.
- Keep the preview hardening surface separated from the docs portal narrative.

### 6.7 Add Docs Route Coverage

- Add or maintain route render tests for the docs portal and grouped docs pages.
- Verify top nav, sidebar nav, breadcrumbs and prev/next links.
- Capture page hierarchy checks so the docs portal does not drift into broken or duplicate routes.
- Add smoke checks for the most important route families.

### 6.8 Keep Docs Status Semantics Stable

- Confirm which pages are `ready`, `draft`, `planned` or `legacy`.
- Keep status labels consistent in the nav, page headers and route cards.
- Make sure status values communicate migration stage rather than visual quality alone.
- Avoid overusing legacy labels once a page is canonical.

## Required Tests

- docs route render tests.
- navigation link tests.
- page hierarchy checks.
- smoke checks for the grouped docs routes.
- responsive checks for docs shell and route pages.

## Deliverables

- Stable docs shell and registry contract.
- Clear route hierarchy for grouped docs pages.
- Docs pages that stay aligned with the canonical design system.
- Coverage for the docs portal’s navigation and page relationships.

## Acceptance Criteria

- The docs portal remains the clearest reference for the design system.
- Navigation is consistent across all grouped sections.
- The docs portal does not collapse back into a monolithic showcase page.
- Status labels and legacy notes remain accurate and easy to interpret.

## Risks

- If the docs shell diverges from the component APIs, the source of truth becomes hard to trust.
- If grouped pages are not kept current, the docs portal can become a second source of drift.
- If status labels are used loosely, the docs will stop clearly communicating migration state.

