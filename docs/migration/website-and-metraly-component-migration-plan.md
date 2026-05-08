# Website and Metraly Component Migration Plan

## Executive Summary

Metraly Brandbook is now ready to act as the canonical design and implementation reference for both the product app and the public website. The next migration wave should move the ecosystem toward shared primitives without breaking:

- dashboard create/save/load/render flows;
- board edit mode with drag and resize;
- public website routes and claim-safe copy;
- accessibility and responsive behavior;
- current production wording in `../docs`.

The plan below is intentionally phased. It separates what can be migrated safely now from what must remain isolated until the next stability gate passes.

### Execution Companion Docs

- [Migration Executive Summary](./executive-summary.md)
- [Migration Backlog Index](./README.md)
- [Brandbook Migration Readiness Audit](../audits/brandbook-migration-readiness-audit.md)

## Goals

- Make `brandbook` the canonical source of truth for design, component behavior and page-level patterns.
- Reduce duplicated UI logic across the brandbook site, the product app and the website.
- Preserve all current public routes and product flows.
- Move migration risk into small, testable steps.
- Keep public website copy claim-safe while component extraction continues.

## Non-Goals

- No random redesigns.
- No direct edits to `../app` or `../website` in this plan.
- No uncontrolled dependency upgrades.
- No replacement of backend or product behavior during the design-system migration.
- No attempt to force every app screen into the brandbook as a literal page.

## Migration Principles

1. Reuse first, not rewrite first.
2. Preserve behavior before changing visuals.
3. Keep high-risk interactions isolated behind tests.
4. Promote a component only after its states are documented and tested.
5. Use the brandbook as the canonical reference, then adapt repo-by-repo.
6. Avoid hiding missing work behind placeholder abstractions.

## Functional Preservation Rules

- `/components` remains the protected baseline reference page.
- The `/editor` flow must continue to create, add, drag, resize, save and reload dashboards.
- Dashboard IDs must remain stable in the URL or state during persistence flows.
- Website routes must remain stable and claim-safe.
- Forms must preserve labels, checked/selected states and disabled behavior.
- Charts must preserve data representation and not lose empty/loading/error treatment.
- Drag/drop and resize behavior must remain stable and predictable.
- Hover states must not cause layout shift.
- No migration should weaken keyboard or focus behavior.

## Repositories Scope

### Brandbook

Canonical source of truth. This is the only repository that will be changed as part of this task.

### Website

Read-only analysis target. Use it to determine missing page patterns, marketing block gaps and claim-safe wording requirements.

### Metraly App

Read-only analysis target. Use it to determine product-flow gaps, dashboard/board/editor risks and reusable app-shell patterns.

### Docs

Read-only strategic source. Use it to validate claims, product status, route terminology and sequencing constraints.

## Current State Summary

### Brandbook

- Strong docs portal with registry-driven navigation.
- `@metraly/ui` already exports core primitives and dashboard primitives.
- Preview hardening surface is separated from the protected `/components` baseline.
- Core forms, widget picker, dashboard and preview surface tests exist.
- Charts are still marked as draft and need wrapper hardening.

### Website

- Clean public marketing and docs site.
- Strong claim-safe copy and route structure.
- Owns its own shell and marketing primitives instead of consuming shared brandbook primitives.

### Metraly

- Product app is feature-rich and already has dashboard, wizard, board, metrics and AI screens.
- It still uses bespoke UI shells and duplicate component families.
- Dashboard persistence and board editing are the highest-risk flows.

## Migration Dependencies

- React and Next.js alignment across brandbook and website.
- `react-grid-layout` compatibility adapter in brandbook and eventually in the app migration path.
- `@dnd-kit/*` interaction layer for drag and resize accessibility.
- `zustand` selector-friendly state patterns.
- Storybook as the visual documentation gate.
- Playwright for end-to-end editor and route checks.
- Claim policy and status docs from `../docs`.

## Component Groups

### Foundation Components

- tokens
- typography
- colors
- spacing
- motion
- accessibility

### Layout Components

- shell
- sidebar
- topbar
- docs shell
- app shell
- marketing shell

### Navigation Components

- site nav
- docs nav
- breadcrumbs
- related links
- previous/next links
- command palette

### Form Components

- checkbox
- radio
- switch
- select
- tabs
- segmented control
- input

### Table Components

- data table
- Metraly table
- leaderboard

### Card Components

- card
- metric card
- insight card
- widget card
- panel

### Dashboard Components

- dashboard grid
- dashboard widget
- dashboard toolbar
- empty state
- drop zone
- resize handle
- widget registry

### Board / Widget Components

- widget shell
- board renderer
- drag overlay
- widget picker
- selected / dragging / drop-target states

### Chart Components

- line
- bar
- area
- donut
- heatmap
- sparkline

### Feedback Components

- toast
- notification center
- timeline
- tooltip
- popover
- modal
- drawer
- context menu
- action menu
- skeleton
- empty state

### Marketing Components

- hero
- pricing cards
- trust blocks
- CTA blocks
- feature grids

### Documentation Components

- docs shell
- docs sidebar
- docs top nav
- docs route cards
- code blocks
- legacy notice

## Missing But Already Implemented Elements

These exist in the app or website already and should be treated as migration targets, not new design inventions:

- `Sidebar`
- `Topbar`
- `DraggableTweaksPanel`
- `DashboardRenderer`
- `DraggableDashboardRenderer`
- `DashboardScreen`
- `BoardScreen`
- `DashboardWizardScreen`
- `PluginScreen`
- `AIScreen`
- `MetricsScreen`
- `ButtonLink`
- `Card`, `CardLink`, `Grid`, `Section`, `SectionHeader`
- `SiteNav`, `SiteShell`
- `AIInsightCard`, `InlineInsight`, `StatCard`
- `Badge`, `DORABadge`, `DataTable`, `Leaderboard`, `PlaceholderScreen`

## Missing But Already Implemented Pages

- website `/pricing`
- website `/demo`
- website `/ai`
- website `/trust`
- website `/blog`
- website `/privacy`
- website `/terms`
- website docs pages for quick start, self-hosting, architecture, claim policy, product status, pricing/license and connectors
- app screens for dashboard, board, wizard, plugin, AI assistant and metrics explorer

## Phase 0 - Baseline Audit And Test Capture

### Goals

- Lock the current visual and behavioral baseline in brandbook.
- Capture the highest-risk flows before any repo migration starts.
- Establish what must not change.

### Tasks

- Capture screenshot baselines for brandbook docs pages, editor flow and dashboard examples.
- Record current website routes and claim-safe copy.
- Record current app flows for dashboard create/save/load/render, board edit mode and shell navigation.
- Freeze the dependency matrix and identify cross-repo version drift.
- Add or expand regression tests for any missing high-risk surface.

### Required Tests

- brandbook unit/component tests
- brandbook build and typecheck
- website lint/typecheck/build smoke checks
- app unit and feature tests

### Acceptance Criteria

- A reviewer can tell which surfaces are current baseline, which are canonical previews and which are still draft or legacy.
- High-risk flows are covered by at least one automated test.

### Risks

- Missing baseline screenshots can hide regressions later.
- Over-capturing low-value surfaces can slow the migration start.

## Phase 1 - Foundation Tokens And Primitives

### Goals

- Solidify the shared visual language.
- Ensure token-driven primitives are the common base for all other work.

### Tasks

- Pin and document the canonical color, spacing, typography and motion tokens.
- Keep `MetralyCard`, `MetralyPanel`, `MetralyLogo`, `MetralyBadge`, `StateBadge`, `MetralyMetricCard` and `WidgetShell` as the baseline primitive set.
- Add missing base primitives only when they are clearly reusable across brandbook, app and website.
- Remove one-off styling from future primitive candidates.

### Required Tests

- component state coverage for default, selected, loading, empty, error and disabled cases
- visual checks for spacing and alignment
- accessibility checks for keyboard and focus

### Acceptance Criteria

- Tokens and primitives are stable enough to be reused across repos without copy-pasting CSS.
- Primitive APIs are documented and consistent.

### Risks

- Premature abstraction can create awkward APIs.
- Pushing marketing-specific styles into base primitives can dilute the engineering visual language.

## Phase 2 - Core Form And Interaction Components

### Goals

- Finish the core controls needed by dashboards, docs filters and settings flows.

### Tasks

- Harden checkbox, radio, switch, select, tabs and segmented-control patterns.
- Introduce or formalize overlay primitives for tooltip, popover, modal, drawer and command palette.
- Keep keyboard and focus behavior explicit in docs and tests.
- Preserve the no-jump hover rule.

### Required Tests

- RTL/unit tests for role, label, selected/checked state and disabled behavior
- keyboard interaction tests for tab, dialog and switch controls
- focus-visible checks

### Acceptance Criteria

- Controls are ready for product migration without local UI overrides.
- Overlay behavior is predictable and accessible.

### Risks

- Incomplete keyboard support will create migration friction in the app.
- Overlay APIs may need refinement after real usage.

## Phase 3 - Cards, Tables, Badges, Empty States

### Goals

- Unify the surfaces that show most of the engineering data.

### Tasks

- Promote a single card language for metric, insight and widget surfaces.
- Keep `MetralyTable` display-first and wrap richer table interactions above it.
- Formalize `EmptyState`, `Skeleton`, `StateBadge` and `Leaderboard` patterns.
- Make loading, empty, no-data, delayed and disconnected states explicit.

### Required Tests

- table render snapshots and row-state checks
- empty-state action coverage
- state-badge semantics and accessible labels

### Acceptance Criteria

- Card and table surfaces can be reused in both app and website without layout drift.
- State semantics are clear and stable.

### Risks

- Too many card variants can reintroduce duplication.
- Table interactions can grow beyond the display-first primitive if not constrained.

## Phase 4 - Dashboard And Board Components For Metraly

### Goals

- Make the dashboard editor, board view and widget registry fully migration-ready.

### Tasks

- Keep `DashboardGrid`, `DashboardWidget`, `DashboardToolbar`, `DashboardEmptyState`, `DashboardDropZone`, `DashboardResizeHandle` and `WidgetRegistry` as the shared contract.
- Keep the dashboard repository/persistence logic separate from presentation.
- Validate URL-id persistence, widget add/remove, drag, resize and reload behavior.
- Preserve the current selected/dragging/drop-target/full-width states.

### Required Tests

- repository persistence tests
- dashboard component tests
- board edit-mode tests
- Playwright coverage for create, add, drag, resize, save, reload

### Acceptance Criteria

- A dashboard can be created, saved and restored without losing layout or widget identity.
- Drag/resize affordances remain visible, readable and accessible.

### Risks

- `react-grid-layout` typing and runtime compatibility can break the editor flow.
- State persistence bugs can silently corrupt board layouts.

## Phase 5 - Website Page Components And Marketing Blocks

### Goals

- Reduce the website’s local primitive set and align it with the brandbook system.

### Tasks

- Migrate the website toward shared `Card`, `Grid`, `Section`, `SectionHeader`, `StatusPill` and shell primitives where feasible.
- Preserve current route structure and claim-safe copy.
- Treat hero, pricing, demo and trust as canonical marketing examples.
- Keep public wording conservative until status docs allow stronger claims.

### Required Tests

- website lint and typecheck
- route smoke tests
- claim lint coverage
- page-level visual checks for hero, pricing and docs sections

### Acceptance Criteria

- Website routes still render and still pass claim checks.
- The website visually matches the shared brand language more closely without changing the message.

### Risks

- Marketing copy can drift into unsupported claims if the source docs are not followed.
- Shared primitives can make marketing pages feel too rigid if not applied carefully.

## Phase 6 - Documentation Pages And Layouts

### Goals

- Keep the docs portal canonical and easy to navigate.

### Tasks

- Preserve the registry-driven docs shell and docs route registry.
- Continue route grouping instead of reintroducing a monolithic showcase page.
- Add or refine representative docs pages for components, patterns and examples.
- Keep `RelatedLinks`, breadcrumbs and prev/next links consistent.

### Required Tests

- docs route render tests
- navigation link tests
- page hierarchy checks

### Acceptance Criteria

- The docs portal remains the clearest reference for the design system.
- Navigation is consistent across all grouped sections.

### Risks

- If the docs shell diverges from the component APIs, the source of truth becomes hard to trust.

## Phase 7 - Visual Regression And Accessibility Hardening

### Goals

- Reduce the chance of subtle regressions before migration expands.

### Tasks

- Add Storybook visual regression to the canonical brandbook component sets.
- Add accessibility checks for the grouped docs pages and critical surfaces.
- Add reduced-motion checks for the most animated surfaces.
- Capture screenshots for the most important component families and route families.

### Required Tests

- Storybook build
- visual snapshot comparisons
- axe-style accessibility checks
- responsive screenshots on desktop and mobile widths

### Acceptance Criteria

- A component cannot be promoted without a visual and accessibility pass.
- Brandbook becomes a stable regression gate for downstream migrations.

### Risks

- Visual tooling can be noisy if the baseline is not pinned first.

## Phase 8 - Dependency Updates And Compatibility Pass

### Goals

- Reduce toolchain drift and stabilize the shared contract.

### Tasks

- Pin brandbook dependencies that are currently floating.
- Keep the `react-grid-layout` adapter isolated and documented.
- Review React/Next compatibility across brandbook and website.
- Keep the app migration path separate because it still targets React 18 and Vite.

### Required Tests

- typecheck
- build
- package-level regression suite

### Acceptance Criteria

- Known compatibility risk areas are documented and bounded.
- No migration phase depends on an unreviewed dependency upgrade.

### Risks

- Forcing version alignment too early can destabilize the app repo.

## Phase 9 - Final Cleanup And Deprecation

### Goals

- Remove duplicate or stale pathways after migration is complete.

### Tasks

- Deprecate remaining duplicate local component families in the app.
- Remove or rewrite stale `/draft` / legacy language in older docs.
- Remove preview-only duplicates once canonical pages and package exports are stable.
- Update migration notes and status docs to reflect the final shape.

### Required Tests

- final regression suite across brandbook, website and app
- route smoke checks
- a11y spot checks

### Acceptance Criteria

- The migration stops accumulating duplicate component families.
- The canonical source of truth remains clean and up to date.

### Risks

- Removing legacy variants too early can break un-migrated screens.

## Website Migration Plan

### Pages

- homepage
- pricing
- demo
- AI
- trust
- blog
- docs
- privacy
- terms

### Components

- site shell
- site nav
- footer
- hero blocks
- feature cards
- pricing cards
- docs layout
- trust / claim-safe blocks

### Tests

- claims lint
- typecheck
- build
- route smoke
- e2e smoke for navigation and docs pages

### Risks

- Claims drift if the page copy is updated outside the status/claims docs.
- Marketing-specific layouts may resist overly generic primitives.

### Acceptance Criteria

- Public routes keep working.
- Public wording stays consistent with the docs and claims policy.
- Marketing sections reuse shared primitives where that does not weaken the page.

## Metraly Migration Plan

### Pages / Screens

- dashboard screen
- board screen
- dashboard wizard
- plugin screen
- AI assistant
- metrics explorer
- dashboard editor

### Components

- sidebar
- topbar
- draggable tweaks panel
- dashboard renderer
- draggable dashboard renderer
- widget registry
- stat and insight cards
- data tables
- placeholder screens

### Dashboard Flow

- create dashboard
- add widget
- select widget
- drag widget
- resize widget
- save widget state
- reload by dashboard id
- verify layout persistence

### Board Flow

- board load
- board render
- board edit mode
- board persistence
- board empty/loading/error states

### Widget Flow

- widget picker
- widget shell
- widget registry lookup
- widget body rendering
- widget remove action

### Tests

- repository tests
- component tests
- feature tests
- Playwright flow coverage
- keyboard and accessibility coverage for edit mode

### Risks

- The current product app is more stateful than the brandbook site, so migration bugs are more likely to hide in persistence and editor flows.
- React 18 app code and React 19 brandbook code must stay contract-compatible while migration is gradual.

### Acceptance Criteria

- Existing dashboard and board flows remain intact.
- New shared primitives can replace local shells without breaking the product.
- Editor state, widget state and layout state remain stable across reloads.

## Test Matrix

| Surface | Unit / Component | Visual | Playwright / E2E | Accessibility | Build / Typecheck |
|---|---|---|---|---|---|
| Brandbook docs portal | Yes | Yes, after Storybook gate | Optional | Yes | Yes |
| Brandbook editor flow | Yes | Yes | Yes | Yes | Yes |
| Website marketing pages | Limited | Yes | Yes, for route smoke | Yes | Yes |
| Metraly dashboard / board / wizard | Yes | Targeted | Yes | Yes | Yes |

## Visual Regression Matrix

- `/components`
- `/components/forms`
- `/components/data-display`
- `/components/dashboard`
- `/components/navigation`
- `/components/feedback`
- `/components/charts`
- `/patterns/widget-editor`
- `/patterns/dashboard-layout`
- `/examples/engineering-dashboard`
- website homepage
- website pricing
- website demo
- website docs
- app dashboard screen
- app board screen
- app dashboard wizard screen

## Accessibility Matrix

- keyboard navigation for every interactive control
- focus-visible on buttons, tabs, menus, links and editors
- semantic roles for dialogs, switches, tabs, tables and option lists
- aria labels for widget picker, dashboard widgets and overlay shells
- reduced-motion behavior for the most animated elements
- drag and resize affordances with readable labels and no pulse-before-drag conflict

## Dependency Update Matrix

| Dependency | Brandbook | Website | Metraly | Recommended Action |
|---|---|---|---|---|
| React | 19.x | 19.x | 18.x | Keep brandbook/website aligned; migrate the app on its own schedule. |
| Next.js | 16.x | 16.x | n/a | Keep brandbook and website on the same major line. |
| `react-grid-layout` | 2.2.3 | n/a | 2.2.3 | Keep a local adapter and isolate type gaps. |
| `@dnd-kit/*` | 6/10/3 | n/a | 6/10/3 | Keep versions aligned where editor flows depend on them. |
| `recharts` | floating | n/a | app-local charting | Pin in brandbook before chart wrapper migration. |

## Rollout Strategy

1. Establish the brandbook component contract as the source of truth.
2. Migrate the app’s lowest-risk shared primitives first.
3. Migrate the dashboard/editor flows second, with Playwright coverage.
4. Migrate website pages using the shared primitives without changing the editorial contract.
5. Remove duplicates only after the replacement path is proven.

## Rollback Strategy

- Keep current local implementations until the shared equivalent is proven by tests.
- Use feature flags or component-level adapter wrappers where available.
- If a migration fails, revert the consuming surface first, not the source-of-truth primitive.
- Preserve route shape and data persistence while visual work is rolled back.

## Final Acceptance Checklist

- [ ] Brandbook docs and component references are current.
- [ ] Dashboard editor create/save/load/render flow is covered.
- [ ] Website routes still render and remain claim-safe.
- [ ] Core shared primitives are documented and tested.
- [ ] Visual regression coverage exists for canonical surfaces.
- [ ] Accessibility coverage exists for interactive and overlay surfaces.
- [ ] Dependency risks are documented and bounded.
- [ ] Duplicate component families have a clear deprecation path.
- [ ] Migration phases have owners, tests and rollback notes.
