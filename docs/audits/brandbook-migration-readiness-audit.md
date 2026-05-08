# Brandbook Migration Readiness Audit

## Executive Summary

Metraly Brandbook is now the strongest canonical design source in the workspace and is ready to anchor the migration program.

### Bottom Line

- The docs portal is grouped by route family instead of a single oversized showcase.
- `@metraly/ui` already covers the most important primitives and dashboard surfaces.
- Dashboard editor flows are test-backed and persistence-aware.
- The preview hardening surface is separated from the protected `/components` baseline.

### What Still Blocks Migration

- Duplicate component families still exist across repositories.
- Shared primitives for app shell, chart wrappers, overlays and marketing blocks are still incomplete.
- Visual regression coverage is still thin compared with the scope of the migration.
- Dependency drift remains the main technical risk, especially around React, Next.js and `react-grid-layout`.
- Documentation drift still exists in older brandbook notes and migration artifacts.

### Recommendation

Treat brandbook as the canonical contract, then migrate the app and website by phase with explicit tests and rollback paths. Do not try to normalize every repo at once.

### Related Execution Docs

- [Migration Executive Summary](../migration/executive-summary.md)
- [Migration Backlog Index](../migration/README.md)
- [Website and Metraly Component Migration Plan](../migration/website-and-metraly-component-migration-plan.md)

## Sources Reviewed

### Brandbook

- `README.md`
- `AGENTS.md`
- `brandbook/current-design-state.md`
- `brandbook/draft-vs-components-conformance.md`
- `brandbook/component-audit.md`
- `framework/README.md`
- `framework/components-inventory.md`
- `framework/layouts-inventory.md`
- `framework/testing-strategy.md`
- `framework/architecture-review.md`
- `framework/adoption-plan.md`
- `design-system/components.md`
- `design-system/board-edit-mode.md`
- `design-system/charts.md`
- `design-system/micro-telemetry-primitives.md`
- `site/app/**`
- `packages/ui/**`
- `site/__tests__/**`
- `stories/**`
- `reports/**`

### Docs Repository

- `../docs/README.md`
- `../docs/STATUS.md`
- `../docs/PROGRESS.md`
- `../docs/status/*.md`
- `../docs/website/*.md`
- `../docs/tech/*.md`
- `../docs/product/*.md`
- `../docs/strategy/*.md`
- `../docs/legal/*.md`

### Metraly App Repository

- `../app/README.md`
- `../app/go.mod`
- `../app/ui/package.json`
- `../app/ui/src/components/**`
- `../app/ui/src/features/**`
- `../app/ui/src/hooks/**`
- `../app/ui/src/types/**`
- `../app/cmd/api/**`

### Website Repository

- `../website/README.md`
- `../website/package.json`
- `../website/app/**`
- `../website/components/**`
- `../website/scripts/**`
- `../website/tests/**`

## Current Brandbook Strengths

- The visual direction is specific and stable: dark engineering console, restrained cyan accent, subtle purple depth, no generic SaaS garnish.
- `site/app/components/previews/` captures the remaining hardening surface while the grouped docs pages act as the canonical public-facing preview layer.
- `@metraly/ui` already contains reusable primitives for cards, tables, badges, forms, metric cards, widget shells and dashboard surfaces.
- Dashboard editor flows are already product-shaped, not placeholder-shaped.
- The docs portal has registry-driven navigation, breadcrumbs, related links and previous/next links.
- Tests cover core forms, widget picker behavior, dashboard components, preview surfaces, overlay states and dashboard edit-mode primitives.

## Current Brandbook Weaknesses

- Several older docs still mention `/draft` or legacy sandbox phrasing, which is now stale relative to the grouped preview pages.
- Chart wrappers are still not fully standardized; the charts page is intentionally marked as draft.
- The app shell layer is not yet represented as a first-class package primitive in `@metraly/ui`.
- Marketing-style page blocks still live in the website repo as ad-hoc primitives instead of clearly canonicalized cross-repo examples.
- Visual regression is still mostly manual or page-level; there is no brandbook-native screenshot baseline gate yet.

## Current Brandbook Gaps

- Missing high-level primitives:
  - `AppShell`
  - `InsightCard`
  - `ThemeProvider`
  - chart base wrappers for line/bar/area/donut
  - unified overlay primitives for tooltip/popover/modal/drawer/command palette
- Missing page-level canonical examples:
  - pricing
  - demo
  - trust/legal
  - blog/content
  - marketing hero variants
- Missing migration scaffolding:
  - explicit dependency compatibility matrix across brandbook, app and website
  - visual regression matrix
  - accessibility matrix
  - rollback notes per migration phase

## Dependency Audit

### Brandbook Dependencies

| Package | Version | Status | Notes |
|---|---:|---|---|
| `next` | `16.2.6` | Ready | Modern App Router stack; good fit for grouped docs pages and editor flow. |
| `react` / `react-dom` | `19.2.0` | Ready | Aligns with the current brandbook site. |
| `react-grid-layout` | `2.2.3` | Risk | Requires a local compatibility adapter for incomplete TypeScript surfaces. |
| `@dnd-kit/core` / `sortable` / `utilities` | `6.3.1` / `10.0.0` / `3.2.2` | Ready | Good enough for the current editor path, but should be kept aligned if editor complexity grows. |
| `zustand` | `5.0.13` | Ready | Used for dashboard/editor state; selector-friendly pattern is in place. |
| `recharts` | `3.8.1` | Ready | Pinned to the resolved lockfile version so chart-wrapper work has a stable baseline. |
| Storybook | `10.0.8` | Ready | Correct compatibility direction for the current Next.js generation. |
| Jest | `30.2.0` | Ready | Stable enough, though JSX transform warnings still need cleanup later. |

### Metraly Dependencies

| Package | Version | Status | Notes |
|---|---:|---|---|
| Go toolchain | `1.26.1` | Risk | Very new toolchain compared to the frontend repos; acceptable for the backend repo, but treat as a separate compatibility domain. |
| React | `18.3.1` | Risk | App UI still targets React 18, while brandbook and website are on React 19. |
| Vite | `8.0.10` | Ready | Fine for the current app UI stack. |
| `react-grid-layout` | `2.2.3` | Risk | Same runtime family as brandbook, but the app still relies on its own editor implementation. |
| `@dnd-kit/*` | `6.3.1` / `10.0.0` / `3.2.2` | Ready | Good baseline, but should be normalized with the brandbook migration path. |
| `zustand` | `5.0.12` | Ready | Shared state approach is consistent with brandbook. |
| `@types/react-grid-layout` | `1.3.6` | Risk | Version skew may continue to create build friction when editor flows are migrated. |

### Website Dependencies

| Package | Version | Status | Notes |
|---|---:|---|---|
| `next` | `16.2.4` | Ready | Good alignment with brandbook’s docs portal generation model. |
| `react` / `react-dom` | `19.2.5` | Ready | Slightly newer than brandbook, but same major line. |
| `typescript` | `6.0.3` | Ready | Strong typing baseline for docs and marketing code. |
| ESLint | `9.39.1` | Ready | Stable, but version family differs from the app repo. |
| `shiki` / MDX toolchain | `3.12.2` / `@next/mdx` | Ready | Good docs stack, useful as reference for the brandbook docs portal. |

## Dependency Risks

1. `react-grid-layout@2.2.3` is the highest frontend runtime risk because the TypeScript surface is incomplete in the same way the brandbook editor already encountered.
2. React 18 in the product app and React 19 in brandbook/website means migration code should not assume identical runtime behavior for hooks, compiler warnings or peer dependency resolution.
3. Floating `latest` dependencies in brandbook have been pinned. Keep the source-of-truth repo on exact versions so the validated baseline stays reproducible.
4. The website and app repos have different build stacks (`Next 16` vs `Vite`), so migration recommendations must stay component- and contract-focused rather than framework-prescriptive.

## Recommended Dependency Updates

- Keep the pinned brandbook dependencies exact and update them deliberately, one compatibility slice at a time.
- Keep the `react-grid-layout` adapter isolated in the brandbook editor code and mirror the same contract in the app migration plan.
- Avoid forcing React 19 into the app repository until the migration plan for that repo is explicit and tested.
- Keep website and brandbook on the same Next.js major line for docs/marketing convergence.
- Revisit lint/typecheck versions only after the component migration path is stable.

## Component Inventory

### Brandbook Components

- `@metraly/ui` primitives:
  - `MetralyCard`
  - `MetralyMetricCard`
  - `MetralyPanel`
  - `MetralyTable`
  - `MetralyBadge`
  - `StateBadge`
  - `MetralyCheckbox`
  - `MetralyRadio`
  - `MetralySwitch`
  - `MetralySelect`
  - `MetralyTabs`
  - `WidgetShell`
  - `WidgetPickerCard`
  - `MetralyLogo`
  - `MetralyTelemetryLine`
- `@metraly/ui` dashboard primitives:
  - `DashboardGrid`
  - `DashboardWidget`
  - `DashboardToolbar`
  - `DashboardEmptyState`
  - `DashboardDropZone`
  - `DashboardResizeHandle`
  - `WidgetRegistry`
- Brandbook site shells and docs helpers:
  - `DocsShell`
  - `DocsBlocks`
  - grouped docs pages under `site/app/components`, `site/app/foundations`, `site/app/patterns`, `site/app/examples`, `site/app/editor`
- Preview hardening surfaces in `site/app/components/previews/`

### Metraly Components

- Layout and shell:
  - `Sidebar`
  - `Topbar`
  - `DraggableTweaksPanel`
- Core UI:
  - `AIInsightCard`
  - `InlineInsight`
  - `StatCard`
  - `Badge`
  - `DORABadge`
  - `DataTable`
  - `PlaceholderScreen`
  - `Leaderboard`
  - `Widget`
- Dashboard and board:
  - `DashboardRenderer`
  - `DraggableDashboardRenderer`
  - `WidgetRegistry`
  - `BoardRenderer`
  - `BoardScreen`
  - `DashboardScreen`
  - `DashboardWizardScreen`
  - `PluginScreen`
  - `AIScreen`
  - `MetricsScreen`

### Website Components

- Shell and navigation:
  - `SiteShell`
  - `SiteNav`
  - `SiteFooter`
  - `ThemeToggle`
- Marketing primitives:
  - `ButtonLink`
  - `Card`
  - `CardLink`
  - `CardHeader`
  - `CardText`
  - `Grid`
  - `Page`
  - `Section`
  - `SectionHeader`
  - `Stack`
  - `StatusPill`
  - `Callout`
  - `Skeleton`
  - `SkeletonCard`
  - `Prose`
  - `Note`
  - `Highlight`

## Page Inventory

### Brandbook Pages

- `/`
- `/components`
- `/components/primitives`
- `/components/forms`
- `/components/data-display`
- `/components/dashboard`
- `/components/navigation`
- `/components/feedback`
- `/components/charts`
- `/foundations/*`
- `/patterns/*`
- `/examples/*`
- `/editor`
- `/docs`

### Metraly Pages / Screens

- Dashboard screen
- Board screen
- Dashboard wizard screen
- Plugin screen
- AI assistant screen
- Metrics explorer screen
- Board editor flow

### Website Pages

- `/`
- `/pricing`
- `/demo`
- `/ai`
- `/trust`
- `/blog`
- `/docs`
- `/docs/quick-start`
- `/docs/self-hosting`
- `/docs/demo`
- `/docs/architecture`
- `/docs/connectors`
- `/docs/product-status`
- `/docs/pricing-license`
- `/docs/claim-policy`
- `/privacy`
- `/terms`

### Pages Missing From Brandbook But Implemented Elsewhere

- Website marketing pages:
  - pricing
  - demo
  - AI
  - trust
  - blog
  - privacy
  - terms
- Website docs-style public pages:
  - quick start
  - self-hosting
  - product status
  - claim policy
  - connectors
  - pricing/license
- Metraly product screens:
  - dashboard
  - board
  - wizard
  - plugin
  - AI assistant
  - metrics explorer

These pages are not all meant to be copied into brandbook as literal pages. They are important as canonical examples and migration references.

## Element Inventory

### Elements Available In Brandbook

- grouped docs shell with top nav, sidebar, breadcrumbs, related links and prev/next links
- form controls with accessible roles and states
- table, metric card and state badge primitives
- dashboard grid, widget shell, widget picker, toolbar and empty state
- overlay previews for toast, modal, drawer, tooltip, popover, menus and command surfaces
- editor flow with local persistence

### Elements Available In Metraly

- app shell and navigation
- dashboards and board renderer
- wizard and plugin configuration screens
- AI assistant screen
- metrics explorer
- DORA/insight cards
- data tables and placeholder screens
- draggable tweaks panel

### Elements Available In Website

- marketing hero blocks
- pricing cards and license callouts
- docs content layout
- trust / claim-safe copy blocks
- demo sandbox call-to-action blocks
- blog article shells
- card/grid/section primitives

### Elements Missing From Brandbook But Implemented Elsewhere

- app shell and marketing shell
- explicit `InsightCard` family
- generic `Button` primitive with first-class documentation outside `ButtonLink`
- `AppShell`, `WizardScreen`, `PluginScreen`
- chart wrapper base
- blog/article shells
- pricing/license CTA blocks
- trust/claim-safe content blocks

## Component-By-Component Audit

| Family | Status | Source | Brandbook compliance | Layout quality | Accessibility | Test coverage | Production readiness | Migration readiness | Key issues | Recommended action |
|---|---|---|---|---|---|---|---|---|---|---|
| Form controls | Ready | Brandbook + app | Strong | Good | Good | Good | High | High | Keep tokenized behavior consistent across repos. | Migrate app controls to `@metraly/ui` wrappers and keep docs as reference. |
| State badges | Ready | Brandbook + app | Strong | Good | Good | Good | High | High | Two concepts exist: brand/category badges and telemetry state badges. | Keep both concepts but name them explicitly. |
| Metric cards | Ready | Brandbook + app | Strong | Good | Good | Medium | High | High | App still has `StatCard`/`InlineInsight`/`AIInsightCard` overlap. | Unify into `InsightCard`-style contract in future phases. |
| Tables | Ready | Brandbook + app | Strong | Good | Medium | Good | High | High | App tables are still more opinionated than the package primitive. | Keep package table display-only and layer interactions above it. |
| Dashboard widgets | Ready | Brandbook + app | Strong | Good | Good | Good | High | High | Package and app still have duplicate widget shell ideas. | Standardize around `WidgetShell` + `DashboardWidget`. |
| Dashboard editor / board edit mode | Needs refinement | Brandbook + app | Strong | Good | Medium | Good | Medium | High | Drag/resize behavior is still the main risk surface. | Keep `react-grid-layout` adapter isolated and expand Playwright coverage. |
| Overlays and feedback | Needs refinement | Brandbook + app | Strong | Good | Medium | Medium | Medium | High | Modal, drawer, command palette, tooltip and popover still need stricter API contracts. | Promote one overlay primitive at a time and test keyboard flows. |
| Navigation shells | Needs refinement | Brandbook + website + app | Strong | Good | Good | Medium | Medium | The app and website each have their own shell patterns. | Create `AppShell` and migrate gradually. |
| Charts | Missing / draft | Brandbook + app | Partial | Good | Medium | Low | Medium | Medium | No shared chart base yet. | Build `MetralyChart` base and wrapper families next. |
| Marketing blocks | Missing | Website | Partial | Good | Medium | Low | Medium | Medium | Hero, pricing and trust blocks are local to the website. | Extract reusable marketing primitives after the core system stabilizes. |
| Docs layout | Ready | Brandbook + website | Strong | Good | Good | Medium | High | High | Brandbook docs shell is better than the older ad-hoc docs patterns. | Use the brandbook docs shell as the canonical docs layout reference. |

## Missing Components

- `InsightCard`
- `AppShell`
- `MetralyChart` base wrappers
- a first-class `Button` primitive in `@metraly/ui`
- a first-class `Input` primitive in `@metraly/ui`
- `Tooltip`, `Popover`, `Modal`, `Drawer`, `CommandPalette` as package exports
- `EmptyState` and `Skeleton` package primitives with stable variants
- `WizardScreen`
- `PluginScreen`
- `MarketingHero` / `PricingCard` / `TrustBlock` as canonical examples

## Missing Page-Level Patterns

- pricing
- demo sandbox
- public trust / privacy / terms
- blog article shell
- app shell with full navigation and action bar
- wizard setup flow
- plugin configuration flow
- AI assistant conversation flow

## Missing Element Groups

- generalized marketing CTA blocks
- article TOC / reading-progress / content shell
- reusable hero layouts
- reusable pricing cards
- reusable trust blocks
- reusable app shell layouts

## Components To Unify

- `StatCard`, `InlineInsight`, `AIInsightCard` → `InsightCard`
- `Badge`, `DORABadge`, `StateBadge` → a unified badge family with explicit semantic variants
- `DashboardRenderer`, `DraggableDashboardRenderer`, `DashboardGrid` → a clean render/edit split with shared registry semantics
- `PlaceholderScreen`, `DashboardEmptyState`, `TelemetryEmptyState` → a family of empty-state primitives
- `Sidebar`, `Topbar`, `SiteNav`, docs shell navigation → a shell/navigation system with reusable slots
- `Widget`, `WidgetShell`, `DashboardWidget`, `WidgetPickerCard` → a single dashboard composition vocabulary

## Components To Deprecate

- ad-hoc app-local dashboard shells once the package layer is fully adopted
- duplicated local badge variants after a single semantic badge family exists
- stale draft-only preview blocks that have already been promoted to grouped pages
- any docs or examples that still present `/draft` as the canonical current lab

## Spacing / Alignment Issues

- App and website still rely on different spacing vocabularies and component shells.
- Several marketing cards and hero layouts use one-off paddings instead of a shared spacing rhythm.
- Dashboard widgets need continued review for grid gaps, selected-state chrome and resize affordance spacing.

## Accessibility Issues

- `react-grid-layout` based flows need stronger keyboard affordances and SR announcements.
- Some app screens still rely on raw buttons/inputs with inline styling and weak semantic grouping.
- Overlay surfaces should be validated for focus return, escape handling and correct dialog/menu roles.

## Responsive Issues

- Website marketing pages are responsive but do not yet reuse the brandbook’s canonical shell components.
- App dashboard / wizard / plugin screens still use custom responsive logic and inline styles.
- Brandbook docs pages need more explicit mobile screenshot coverage before they can be used as the visual contract.

## Visual Consistency Issues

- `brandbook/current-design-state.md` and some older docs still refer to `/draft`, while the current site uses grouped preview pages.
- Charts remain a draft layer.
- The website has a more polished marketing surface than the app UI in some places, but it is built from separate primitives.

## Testing Gaps

- No Storybook visual regression gate is enforced yet.
- No brandbook Playwright suite is covering the `/editor` lifecycle end to end.
- Website has route smoke and a11y scripts, but not a shared component regression matrix with the brandbook.
- App UI has feature/unit tests, but no canonical design-system story coverage.

## Website Findings

- The website is claim-safe and editorially strong.
- Its page architecture is good, but it still relies on local marketing primitives instead of shared brandbook exports.
- The docs pages already express the right tone for public trust, pricing, quick start and product status.
- The website should remain conservative about product claims until the status docs explicitly allow stronger wording.

## Metraly Findings

- The app is the most migration-sensitive repository because it combines backend state, local dashboard persistence and bespoke UI shells.
- Dashboard create/save/load/render is the most critical flow to preserve.
- `DashboardScreen`, `DashboardWizardScreen`, `PluginScreen` and `AIScreen` represent important page-level patterns not yet canonicalized in the brandbook.
- The app should migrate incrementally to shared primitives without rewriting the backend-backed flow.

## Migration Risk Matrix

| Risk | Surface | Likelihood | Impact | Mitigation |
|---|---|---:|---:|---|
| Incomplete `react-grid-layout` typing | Dashboard editor | High | High | Keep the local adapter isolated and test the full editor lifecycle. |
| React version drift | App vs brandbook vs website | Medium | Medium | Migrate by contract, not by wholesale framework alignment. |
| Visual regressions in marketing pages | Website shell/cards/heroes | Medium | Medium | Use shared primitives gradually and snapshot the page shell before each migration slice. |
| Accessibility regressions | Overlays, widgets, dropdowns | Medium | High | Add role/keyboard/focus tests before each promotion. |
| Component duplication | Cards, badges, shells, tables | High | Medium | Promote shared primitives and remove duplicate local variants over time. |

## Prioritized Migration Plan Summary

1. Lock the source-of-truth primitives: forms, cards, badges, tables, widget shells, empty states.
2. Promote chart wrappers and overlay primitives.
3. Finish dashboard editor hardening and add Playwright coverage.
4. Extract app shell and marketing shell primitives.
5. Migrate the website to shared primitives where the copy and layout are stable.
6. Remove duplicate local component families and deprecate stale preview-only implementations.

## Acceptance Criteria

- Brandbook remains the canonical design source for both product and website migrations.
- The dashboard editor flow is preserved end to end.
- Shared primitives cover the majority of card, form, table, widget and overlay patterns.
- The docs portal stays navigable and current.
- No product or website migration is attempted without regression tests.
- Public claims remain aligned with the docs/status system.

## Open Questions

- Should marketing primitives be promoted into `@metraly/ui` now or after app/dashboard hardening?
- Should brandbook add a canonical `AppShell` page example before app migration starts?
- Should `recharts` be pinned immediately in brandbook, or only as part of the chart-wrapper phase?
- Which repo owns the first full Storybook visual regression gate?
- How aggressive should deprecation be for local app-local shells once `@metraly/ui` grows further?
