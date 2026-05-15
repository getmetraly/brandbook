---
name: migration-phase-status
description: Metraly UI → Brandbook migration overall phase status and task ordering
metadata: 
  node_type: memory
  type: project
  phase: Phase 2 planning + P0 implementation
  date: 2026-05-15
  originSessionId: 4f98bff0-e0b2-44fb-8599-c78cb0301929
---

## Migration Overview

**Goal**: Migrate Metraly UI (`metraly/app/ui`) components to use @metraly/ui (brandbook) design system as upstream.

**Key Constraint**: Brandbook must be stabilized (all components have Storybook stories + responsive variants) BEFORE component migration begins.

**Repos**:
- Brandbook (design system): `/home/zubarev/Projects/metraly/brandbook/` (branch `docs/metraly-ui-ux-migration-plan`)
- App (product): `/home/zubarev/Projects/metraly/app/ui/` (main branch)

## Phase Status

### ✅ Phase 1: Inventory & Taxonomy (COMPLETED)
Created 5 deliverable documents on `docs/metraly-ui-ux-migration-plan` branch, committed at `1f299b1`:
- Phase 1 Inventory: Full component, screen, entrypoint catalog
- Naming & Status Taxonomy: Canonical naming freeze (AI Workspace, Plugins, Connectors) + status taxonomy (Live, Preview, Designed, etc.)
- Stabilization Gap Report: Brandbook components missing or needing work before app migration
- Storybook Gap Matrix: Which components need stories + responsive variants
- Next Implementation Plan: P0/P1/P2 ordered backlog

### 🔄 Phase 2: Stabilization Planning (COMPLETED)
Planning document created. Identified pre-migration blockers:
- Missing Brandbook components: StepRail, ReviewPanel, StickyWizardFooter, and AI/Plugin-specific surfaces
- Existing components need Storybook responsive variants

### 🔄 Phase 2 P0: Foundation Work (IN PROGRESS)

**P0-3 (COMPLETED, 2026-05-15)**: Typecheck script + app type safety
- `WizardScreen.tsx` select-row narrowing bug fixed
- `npm run typecheck` passes with zero errors
- Follow-up validation also confirmed `npm run build`

**P0-1 (COMPLETED, 2026-05-15)**: Naming fixes in app code
- `Sidebar.tsx`: "AI Assistant" → "AI Workspace", "Marketplace" → "Plugins", "Connect Sources" → "Connectors"
- `App.tsx`: titles updated to AI Workspace / Plugins / Connectors
- Feature folders renamed: `aiAssistant` → `ai-workspace`, `marketplace` → `plugins`
- Validation: `npm run test`, `npm run typecheck`, `npm run build` all pass

**P0-4 (COMPLETED, 2026-05-15)**: Remove board experiment and collapse to a single app entrypoint
- Deleted `src/features/board/` and the parallel board-only `App.tsx`/`index.tsx` bootstrap
- Renamed the product app from `App.jsx` → `App.tsx`
- Renamed the product bootstrap from `index.jsx` → `index.tsx`
- Validation: `npm run test`, `npm run typecheck`, `npm run build` all pass

**P0-5 (COMPLETED, 2026-05-15)**: StatusBadge in Brandbook
- Added `packages/ui/src/components/StatusBadge.tsx` as a canonical wrapper over `StateBadge`
- Added `stories/StatusBadge.stories.tsx` covering all 12 frozen statuses
- Validation: `npm run ui:check`, `npm run site:typecheck`, `npm run site:test`, `npm run build-storybook` all pass

**P0-2 (COMPLETED, 2026-05-15)**: Clean raw colors out of app `Badge.tsx`
- Replaced hardcoded hex and `rgba()` values with token-driven `color-mix(...)` usage
- Preserved existing app-facing status strings for compatibility
- Validation: `rg` confirms no raw color literals remain in `src/components/ui/Badge.tsx`
- Validation: `npm run test`, `npm run typecheck`, `npm run build` all pass

**P0-6 / P0-7 / P0-8 / P0-9 (COMPLETED, 2026-05-15)**: Add core Brandbook migration primitives
- Added `TrendBadge`, `MetralySkeleton`, `MetralyFilterBar`, and `MetralyEmptyState`
- Added CSS, Storybook stories, package exports, and site tests for all four primitives
- Validation: `npm run ui:check`, `npm run site:typecheck`, `npm run site:test`, `npm run build-storybook` all pass

**P0-10 / P0-11 / P1-1 / P1-2 / P1-3 / P1-4 (COMPLETED, 2026-05-15)**: Brandbook navigation, board a11y fallback, and wizard stabilization
- Added `MetralyTabs` keyboard/a11y story and test coverage for tab-to-tabpanel wiring
- Added `AppShellRoleContext` scenario story to confirm shell context alignment
- Added `MoveMenu` as the non-drag board movement fallback
- Hardened `DashboardDropZone` with SVG icon contract and optional keyboard-safe action button
- Added `GripHandle.stories.tsx` for `DashboardResizeHandle`
- Added `WizardLayout` as an importable public component, replaced the recipe story, and added site test coverage
- Validation: `npm run ui:check`, `npm run site:typecheck`, `npm run site:test`, `npm run build-storybook` all pass

**P1-5 / BoardCanvas coverage / overlay verification (COMPLETED, 2026-05-15)**: Wizard scenario, board canvas story, and overlay focus contracts
- Added `DashboardWizard.stories.tsx` to cover goal, role template, widget bundle review, create error, and success states
- Added `BoardCanvas.stories.tsx` for populated, empty, and narrow viewport coverage on top of `DashboardGrid`
- Expanded `MetralyDrawer.stories.tsx` and `MetralyBottomSheet.stories.tsx` with focus-restore/body-scroll verification stories
- Added `site/__tests__/shell/MetralyOverlayFocus.test.tsx` to verify focus restore and body scroll lock for both overlays
- Validation: `npm run ui:check`, `npm run site:typecheck`, `npm run site:test`, `npm run build-storybook` all pass

**P1-6 / P1-7 (COMPLETED, 2026-05-15)**: Metric card state matrix and mobile table presentation
- Added `stories/MetralyMetricCard.stories.tsx` with positive delta, negative delta, loading, empty, error, stale, and compact overflow states
- Extended `MetralyTable` with `mobilePresentation?: "table" | "cards" | "stacked"`
- Added mobile cards and mobile stacked stories to `stories/MetralyTable.stories.tsx`
- Added site tests to verify the new table presentation metadata contract
- Validation: `npm run ui:check`, `npm run site:typecheck`, `npm run site:test`, `npm run build-storybook` all pass

**P1-9 / P1-10 (COMPLETED, 2026-05-15)**: App sidebar semantics and PulseMarker primitive
- Replaced sidebar pin/unpin `<span role="button">` affordances with native `<button type="button">` controls in `app/ui/src/components/layout/Sidebar.tsx`
- Added `PulseMarker` to `@metraly/ui` as an explicit semantic pulse primitive with dot and heartbeat-wave variants
- Added `stories/PulseMarker.stories.tsx` and `site/__tests__/PulseMarker.test.tsx`
- Validation: app `npm run test`, `npm run typecheck`, `npm run build` and brandbook `npm run ui:check`, `npm run site:typecheck`, `npm run site:test`, `npm run build-storybook` all pass

**P1-8 (COMPLETED, 2026-05-15)**: Create the app-side `design-system/` skeleton
- Added `app/ui/src/design-system/index.ts` as the local app-facing barrel
- Added `app/ui/src/design-system/compat/brandbook-legacy.ts` as the inert Phase 1 / Phase 2 compat placeholder
- Added token bridge placeholders:
  - `app/ui/src/design-system/tokens/semantic.css`
  - `app/ui/src/design-system/tokens/aliases.css`
  - `app/ui/src/design-system/tokens/status-tokens.css`
- Validation: app `npm run typecheck` and `npm run build` both pass

**P1-11A (COMPLETED, 2026-05-15)**: Introduce shared card surface foundation in Brandbook
- Added `CardShell` as the common layout foundation above `MetralyPanel`
- Reworked `MetralyCard` and `MetralyMetricCard` to compose `CardShell` while preserving semantic APIs
- Reworked `DashboardWidget` to compose `CardShell` while keeping widget-specific drag/resize/remove chrome separate
- Updated migration map/plan/local architecture/component contract docs to reflect the layered surface model
- Validation: static source/CSS checks in sandbox; full Jest requires installed dependencies

## Task Ordering

1. **P1-11**: Extract `StepRail` from `WizardLayout`
2. **P1-12**: Extract `ReviewPanel` and `StickyWizardFooter`
3. **P1-13**: Start app-side compat imports only after the wizard sub-primitives exist

After P0 complete: Move to P1 (component stabilization in Brandbook).

## Key Files

**App structure**:
- `app/ui/src/App.tsx` — Main product app (manual state router, all screens)
- `app/ui/src/index.tsx` — Canonical app bootstrap
- `app/ui/src/components/layout/Sidebar.tsx` — Main sidebar with canonical labels applied
- `app/ui/src/features/onboarding/WizardScreen.tsx` — Settings wizard, typecheck regression fixed

**Brandbook**:
- `packages/ui/src/` — Component library (Phase 6 + 7 responsive stories done)
- Stabilization gate: All Phase 6 recipe components have responsive variants

## Canonical Naming (Frozen)

✅ AI Workspace (not AI Assistant)
✅ Plugins (not Marketplace)  
✅ Connectors (not Connect Sources)

## Canonical Status Taxonomy (Frozen)

Live, Preview, Designed, Planned, In progress, Gated, Policy defined, Benchmark pending, Coming soon, Error, Delayed, No data


## 2026-05-15 — Foundation consolidation pass

Status: Phase 3 foundation refactor completed in brandbook upstream.

Done:

- `FieldShell` introduced and composed by form controls plus filter chips.
- `OverlayShell` introduced and composed by `MetralyDrawer` and `MetralyBottomSheet`.
- `StateBlock` introduced and composed by empty/dashboard/widget states.
- `NavigationItemFrame` introduced for sidebar/tree visual row consistency.
- `useRovingSelection` introduced for tabs/segmented control keyboard/value management.
- `HandlePrimitive` introduced for drag/resize/move/drop affordances.
- Agent rules added in `docs/migration/metraly-ui-foundation-agent-rules.md` and linked from `AGENTS.md`.

Next:

- Use these foundations when migrating `getmetraly/metraly/ui` local `design-system/` adapters.
- Add richer Storybook pages for each foundation if design QA needs visual matrix coverage.
- Continue DataTable and WidgetCatalogCard migration on top of these foundations.

## 2026-05-15 — WizardLayout app rhythm alignment

Updated `WizardLayout` after foundation consolidation so Storybook product scenarios match the current demo app wizard direction more closely:

- default progress placement changed to horizontal top stepper;
- centered content width introduced through `contentWidth`;
- wizard header/body/review are now grouped in one canonical card surface;
- footer actions sit below the card;
- side rail remains available through `progressPlacement="side"` for documentation-only layouts.

Next visual QA targets: DashboardWizard stories, Connector Wizard app parity, mobile stepper overflow, footer safe-area behavior.

## 2026-05-15 — Wizard scenario split correction

Status: Wizard visual alignment refined after comparing mixed Connector Setup Preview and Dashboard Preview screenshots.

Done:

- `Components/WizardLayout/Default` now represents the connector/setup style with top progress and a centered card.
- `Components/WizardLayout/SideRailReference` keeps the rail variant as documentation-only.
- `Scenarios/DashboardWizard/*` now represents the dashboard builder style with a left builder rail and right preview canvas.

Next:

- Validate both stories at 320, 390, 768, 1024 and 1280px.
- When migrating to `getmetraly/metraly/ui`, map connector flows to `WizardLayout` and dashboard creation to a feature-owned `DashboardWizardShell` recipe.


### Wizard parity status

- Connector wizard: split into source, preview connection, configure, and review stories.
- Dashboard wizard: sidebar/header rhythm aligned toward AppShellRoleContext; review bundle has search before category chips; mini-stepper no longer renders stray connector lines.

## 2026-05-15 — Wizard sub-primitives extracted (P1-11, P1-12)

Status: `StepRail`, `ReviewPanel`, and `StickyWizardFooter` extracted from `WizardLayout` into standalone importable primitives.

Done:

- `StepRail` extracted as a public component with `orientation: 'horizontal' | 'vertical'` prop.
  - `WizardLayout` now composes `StepRail` internally; no behavior change.
  - Backward compat: `WizardLayoutStep` / `WizardLayoutStepStatus` re-exported as aliases.
  - Story: `Components/StepRail/*` (9 stories: horizontal mid/first/last/warning/two/mobile + vertical rail/no-footnote/warning)
  - Test: `site/__tests__/wizard/StepRail.test.tsx` (14 assertions)
- `ReviewPanel` introduced as a structured key/value review list for wizard confirmation steps.
  - Accepts title, description, items with icon/label/value/badge, loading skeleton, empty state.
  - Story: `Components/ReviewPanel/*` (6 stories)
  - Test: `site/__tests__/wizard/ReviewPanel.test.tsx` (9 assertions)
- `StickyWizardFooter` introduced as the canonical back/primary/status footer primitive.
  - Sticky by default; static on ≤560px via media query.
  - Story: `Components/StickyWizardFooter/*` (6 stories)
  - Test: `site/__tests__/wizard/StickyWizardFooter.test.tsx` (9 assertions)
- `MetralyTable` gains `error` and `errorText` props for explicit error state rendering.
  - Story: `Components/MetralyTable/Error`
- `WidgetPickerCard` stories expanded with `Gated`, `ComingSoon`, `InProgress`, `LongText`, `NarrowRail`, and `GridLayout` scenarios.
- `site/tsconfig.json` target upgraded from ES2017 → ES2018 (unblocks `s` regex flag in existing tests).
- Two pre-existing test regressions fixed: `MetralyCard` compact density class name + wizard body gap token assertion.
- All 247 site tests pass. `npm run ui:check` and `npm run site:typecheck` pass.

Next:

- Validate all wizard stories at 320, 390, 768, 1024, 1280px.
- Port connector wizard story to use `ReviewPanel` in the review step and `StickyWizardFooter` in the footer slot.
- Continue `WidgetPickerCard` → `WidgetCatalogCard` semantic work (listbox/option ARIA roles).
- Continue `MetralyTable` bulk-actions story and internal-scroll improvements.
- Start P2-2 types deduplication and P2-3 DraggableTweaksPanel gating in app.

## 2026-05-15 — Phase 2 stabilization gate review

Status: Phase 2 stabilization gate reviewed after app Storybook setup, wizard viewport QA, ConnectorWizard split, WidgetCatalogCard alias/test, and AI/Plugin spec creation.

Done:

- App repo now has a local visual harness:
  - `app/ui/.storybook/main.ts`
  - `app/ui/.storybook/preview.ts`
  - `app/ui/src/stories/AppShell.stories.tsx`
  - `app/ui/src/stories/DashboardScreen.stories.tsx`
  - `app/ui/src/stories/MetricsScreen.stories.tsx`
  - `npm run build-storybook` passes in `app/ui`
- Wizard responsive/story split follow-up is closed:
  - `stories/WizardLayout.stories.tsx` now includes Desktop1024 + Desktop1280
  - `stories/DashboardWizard.stories.tsx` now includes Mobile390 + Tablet768 + Desktop1024
  - `stories/ConnectorWizard.stories.tsx` exists as the dedicated connector/setup scenario
- `WidgetCatalogCard` / `WidgetCatalogList` semantic aliases exported from `@metraly/ui`
- `site/__tests__/WidgetCatalogCard.test.tsx` verifies listbox/option ARIA contract
- `docs/migration/ai-plugin-component-spec.md` freezes the deferred Phase 9 AI/Plugins contracts

Gate decision:

- Phase 3 compat-import migration is now unblocked.
- Remaining non-blocking risks:
  - no app-level visual regression automation yet;
  - no app-level accessibility automation yet;
  - raw-color cleanup remains in product feature screens (`App.tsx`, `PluginScreen.tsx`);
  - AI/Plugins component implementation remains deferred to Phase 9.

Next:

- Install `@metraly/ui` into `app/ui` and start replacing compat exports with real imports.
- Keep Phase 9 AI/Plugins surfaces out of the first compat-import wave.

## 2026-05-15 — Phase 3 kickoff: first live compat import

Status: Started in `getmetraly/metraly/app/ui` after the stabilization gate passed.

Done:

- `@metraly/ui` is installed in `app/ui` as a local file dependency.
- `recharts` was added in `app/ui` to satisfy the brandbook package peer contract.
- `app/ui/src/design-system/compat/brandbook-legacy.ts` now routes `PlaceholderScreenCompat` to the real `MetralyEmptyState` export from `@metraly/ui`.
- `app/ui/src/App.tsx` now consumes the compat barrel instead of importing `components/ui/PlaceholderScreen` directly.
- `app/ui/src/index.tsx` and `app/ui/.storybook/preview.ts` now load `@metraly/ui` theme + empty-state styles so the first imported primitive renders correctly in both the app and app Storybook.

Next:

- Continue swapping low-risk compat aliases to real `@metraly/ui` exports.
- Keep Phase 9 AI/Plugins surfaces out of the early compat-import wave.
## 2026-05-15 — Phase 3 compat adapters + app automation

Status: Active. The first screen-facing compat adapters now render through `@metraly/ui`, and app-side verification is no longer limited to typecheck + unit tests.

Done:

- `StatusBadgeCompat` now routes to real upstream badge primitives (`StatusBadge` / `StateBadge`) with a legacy-status adapter for `On track`, `At risk`, `Blocked`, `Done`, and `Open`.
- `DORABadgeCompat` now routes through upstream `StateBadge`.
- `DataTableCompat` now routes through upstream `MetralyTable`.
- `widgetRegistry.tsx`, `BreakdownTable.tsx`, and `DORAPanel.tsx` now consume the compat barrel instead of local `components/ui` imports.
- `Compat/Surfaces` Storybook coverage exists in `app/ui/src/stories/CompatSurfaces.stories.tsx`.
- `npm run test:a11y` now runs `jest-axe` smoke tests over compat adapters and a screen consumer.
- `npm run test:visual` now runs Playwright screenshot regression over the app Storybook compat story at desktop + mobile viewports.

Remaining risks:

- raw-color cleanup still remains in product feature screens (`App.tsx`, `PluginScreen.tsx`, charts, and metrics panels);
- AI/Plugins component implementation remains deferred to Phase 9;
- visual/a11y coverage should expand as more real screens migrate onto the compat barrel.

## 2026-05-15 — Phase 3 compat continuation + P2-1/P2-2/P2-3 resolution

Status: Phase 3 extended; P2-1, P2-2, P2-3 closed.

Done:

- **StatCardCompat → MetralyMetricCard** (Phase 3 compat):
  - `brandbook-legacy.ts` now exports a real `StatCardCompat` function that wraps `MetralyMetricCard` from `@metraly/ui`.
  - Prop mapping: `label`→`title`, `sub`→`description`, `color`→`variant` (LegacyColorKey→MetralyMetricCardVariant), trend→`TrendBadge` in `footer`.
  - `widgetRegistry.tsx` now imports `StatCardCompat as StatCard` and `Leaderboard` from the compat barrel instead of local `components/ui/`.
  - `MetricsScreen.tsx` now imports `Leaderboard` from the compat barrel instead of local `components/ui/`.
  - `StatCard.tsx` is no longer imported anywhere outside its own file; production bundle no longer includes it.
- **P2-1 (JS file duplication)**: Verified closed — no `.js`/`.jsx` files remain in `src/`. All modules are `.ts`/`.tsx`. Concern was pre-emptive; prior sessions already converted all files.
- **P2-2 (Types duplication)**: Verified closed — `types/api.ts` and `types/widgets.ts` are the single canonical locations; `api/types/` does not exist. `api/client.ts` imports FROM `types/api.ts` with no duplication.
- **P2-3 (DraggableTweaksPanel production bundle)** (COMPLETED):
  - `DraggableTweaksPanel` rendering was already gated with `{import.meta.env.DEV && <DraggableTweaksPanel />}`.
  - `TweaksProvider` now also gated: `return import.meta.env.DEV ? <TweaksProvider>{shell}</TweaksProvider> : shell`.
  - Production bundle (`npm run build`) verified: neither `DraggableTweaksPanel` nor `TweaksProvider` appear in `dist/assets/*.js`.
- **DashboardScreen.tsx raw colors** (partial cleanup):
  - All `rgba(0,229,255,...)` occurrences replaced with `color-mix(in srgb, var(--cyan) X%, transparent)`.
  - All `rgba(255,82,82,...)` occurrences replaced with `color-mix(in srgb, var(--error) X%, transparent)`.
  - `#FF8A8A` replaced with `var(--error)`.
  - Remaining raw colors in other feature screens (`PluginScreen.tsx`, `MetricsScreen.tsx`, `DashboardWizardScreen.tsx`, `AIScreen.tsx`) are tracked as non-blocking — they need full screen-level migration, not spot fixes.
- Validation: `npm run typecheck` passes (0 errors), `npm run build` passes, `npm run test` passes (28/28).

Next:

- Continue Phase 3: migrate `Widget.tsx` → `DashboardWidget` from `@metraly/ui` via compat barrel.
- Raw color cleanup in remaining feature screens (`PluginScreen.tsx`, `MetricsScreen.tsx`, `DashboardWizardScreen.tsx`).
- **P2-4 (AI/Plugins/Trust components)**: Deferred to Phase 9 — tracked in `docs/migration/ai-plugin-component-spec.md`.
- Add `@metraly/ui` `TrendBadge` import to `brandbook-legacy.ts` test coverage.

## 2026-05-15 — Phase 3: WidgetCompat + raw color sweep

Status: Phase 3 extended; raw color sweep completed across all major feature screens.

Done:

- **WidgetCompat → DashboardWidget** (Phase 3 compat):
  - `brandbook-legacy.ts`: replaced dead `export { Widget as WidgetCompat }` with a real `WidgetCompat` function that forwards to `DashboardWidget` from `@metraly/ui`.
  - Accepts full `DashboardWidgetProps` subset: `id, title, subtitle, state, selected, dragging, resizing, resizable, loading, fullWidth, children, footer, stateTitle, stateDescription, stateAction, className, onSelect, onRemove, onDragStart`.
  - Local `Widget.tsx` (which depended on `TweaksContext`) is no longer imported by anything; production bundle excludes it.
- **Raw color sweep** — all 4 target files now use CSS token vars:
  - `DraggableDashboardRenderer.tsx`: `rgba(0,229,255,...)` → `color-mix(in srgb, var(--cyan) N%, transparent)`.
  - `PluginScreen.tsx`: filter buttons, installed badge, install button — all cleaned.
  - `MetricsScreen.tsx`: timeRange/compareMode/chartType controls, delta indicators, formula box, breakdown buttons — all cleaned.
  - `DashboardWizardScreen.tsx`: step dots, category filters, time range, widget size toggles, save button, error color — all cleaned.
  - Preserved: white overlays `rgba(255,255,255,A)`, app bg `rgba(11,15,25,A)`, pure black shadows, third-party brand colors in data arrays, `#0B0F19` icon contrast.
- Validation: `npm run typecheck` (0 errors), `npm run build` (406 KB bundle, 0 errors), `npm run test` (28/28 passed).

Remaining raw color work:

- `AIScreen.tsx` — inline `linear-gradient(rgba(...))` values.
- `WizardScreen.tsx` — onboarding wizard inline styles.
- `BreakdownTable.tsx` — delta color indicators.
- Charts (`AreaChart.tsx`, `BarChart.tsx`, etc.) — recharts stroke/fill colors (low priority; chart colors are data-driven).

Next:

- Migrate `DashboardRenderer.tsx` / `DraggableDashboardRenderer.tsx` grid shell to use `DashboardGrid` from `@metraly/ui`.
- Clean remaining raw colors in `AIScreen.tsx` and `WizardScreen.tsx`.
- Phase 4: `SidebarCompat` / `TopbarCompat` → upstream `MetralySidebar` / `MetralyTopbar` (requires design QA).

## 2026-05-15 — Tasks 1+2+3: final raw color sweep + DashboardGrid compat + TrendBadge tests

Status: All three tracks complete.

Done:

- **Raw color sweep — final batch**:
  - `AIScreen.tsx`: 2× gradient strings + 2× purple border + 1× hover handler → `color-mix()`.
  - `WizardScreen.tsx`: 14 occurrences across StepIndicator, SourceSelectionStep, AuthenticateStep, ReviewStep, OnboardingChecklist, and main WizardScreen render — cyan (6), purple (4), success (4) → `color-mix()`.
  - `BreakdownTable.tsx`: `#00C853` → `var(--success)`, `#FF9100` → `var(--warning)` in delta indicator.
  - Preserved: `rgba(255,255,255,...)` white overlays, `rgba(0,0,0,...)` black, `rgba(11,15,25,...)` app bg, `${src.color}` connector brand template literals.
- **DashboardGrid compat swap** (Phase 3 complete):
  - `src/index.tsx`: added `import '@metraly/ui/styles/metraly-dashboard.css'` to cover `metraly-dashboard-grid` CSS classes.
  - `brandbook-legacy.ts`: exports `DashboardGrid` and `DashboardGridProps` direct from `@metraly/ui`.
  - `DashboardRendererCompat` implemented: maps `dashboard.widgets` → `DashboardGrid` via `instanceId → id` bridge; uses local `widgetRegistry` for widget lookup; type-safe via `DashboardGridWidget = DashboardWidgetInstance & { id: string }` + concrete cast `ConcreteDashboardGrid`.
  - `DraggableDashboardRenderer` still re-exported (no brandbook drag equivalent yet — Phase 4).
  - Local `DashboardRenderer.tsx` is now superseded by `DashboardRendererCompat` in the compat barrel.
- **TrendBadge test coverage** (2 new tests in `brandbook-legacy.test.tsx`):
  - `StatCardCompat` with `trend`/`trendDir="up"` — verifies TrendBadge value visible + a11y.
  - `StatCardCompat` without trend — verifies title renders + a11y.
  - Total tests: 30/30 (was 28/28).
- Validation: `npm run typecheck` (0 errors), `npm run build` (0 errors), `npm run test` (30/30).

Remaining raw color work:

- Charts (`AreaChart.tsx`, `BarChart.tsx`, etc.) — recharts stroke/fill colors (low priority; chart colors are data-driven, not semantic).

Next:

- Phase 4: `SidebarCompat`/`TopbarCompat` → `MetralySidebar`/`MetralyTopbar` (requires design QA).
- Wire `DashboardScreen.tsx` to use `DashboardRendererCompat` instead of local `DashboardRenderer`.
- P2-4 (Phase 9): implement AI/Plugins/Trust components in Brandbook.

## 2026-05-15 — Phase 3 cutover, Phase 4 complete, P2-4 / Phase 9 complete

Status: All three tracks complete. Typecheck 0 errors both repos. 30/30 tests.

### Track 1 — DashboardScreen cutover
- `DashboardScreen.tsx`: import changed from local `DashboardRenderer` → `DashboardRendererCompat as DashboardRenderer` from `../../design-system`.
- Local `DashboardRenderer.tsx` is now unused by all product screens (Phase 3 cutover complete).

### Track 2 — Phase 4: SidebarCompat / TopbarCompat → brandbook
- **`src/design-system/compat/SidebarCompat.tsx`** (new): full adapter using `MetralySidebar` + `MetralySidebarSection` + `MetralySidebarItem`. Keeps all app business logic: localStorage pinning, density-aware (from `useTweaks`), collapsed state, sections/items map, accent "New Dashboard" item, "NEW" badge on AI Workspace. No raw colors.
- **`src/design-system/compat/TopbarCompat.tsx`** (new): wraps `MetralyTopbar` with density from `useTweaks`. Search box and notification bell in `actions` slot.
- **`brandbook-legacy.ts`**: old `export { Sidebar as SidebarCompat }` and `export { Topbar as TopbarCompat }` re-exports replaced with `export { SidebarCompat } from "./SidebarCompat"` and `export { TopbarCompat } from "./TopbarCompat"`.
- **`src/index.tsx`**: added 13 missing brandbook CSS imports (`metraly-shell.css`, `metraly-card.css`, `metraly-metric-card.css`, `metraly-trend-badge.css`, `metraly-button.css`, `metraly-input.css`, `metraly-forms.css`, `metraly-wizard.css`, `metraly-widget-picker.css`, `metraly-pulse-marker.css`, `metraly-badge.css`, `metraly-skeleton.css`, `metraly-widget-shell.css`).
- **Pending design QA**: `App.tsx` still imports from `./components/layout/Sidebar` and `./components/layout/Topbar` directly. Switching it to the compat barrel requires visual sign-off.

### Track 3 — P2-4 / Phase 9: AI/Plugin components in brandbook

**8 new components in `packages/ui/src/components/`**:
- `PermissionBadge` — maps `read-only/write/admin` level to `StateBadge` ok/warning/error.
- `SigningBanner` — `CardShell` surface with tone+icon per `verified/unverified/community` status.
- `AnswerCard` — `CardShell` wrapping AI reply text, optional evidence chips (label+value+TrendBadge), "Show reasoning" link, loading state via 3× `PulseMarker`.
- `EvidencePanel` — `CardShell` with metric citation grid; empty state via `StateBlock`.
- `TraceDrawer` — `MetralyDrawer` (right, min(480px,100vw)) wrapping `StepRail orientation="vertical"`; maps `pending→next`, `running→current`, `done→done`, `error→warning`.
- `AIWorkspaceLayout` — full-height flex column chat UI: messages area (user bubbles + `AnswerCard` for assistant), sticky input bar with `MetralyInput` + `MetralyButton` + sparkles indicator, quick-prompt chips, disclaimer. Respects `prefers-reduced-motion`.
- `PluginCatalog` — search (`MetralyInput`) + category filter buttons + responsive grid of `CardShell` plugin cards with `StateBadge` (installed/preview) + Install/Review/Manage CTAs via `MetralyButton`. Empty state via `StateBlock variant="no-results"`.
- `PluginReviewDrawer` — `MetralyDrawer` (right, min(440px,100vw)) with plugin summary, `PermissionBadge` (max-risk), `SigningBanner`, `ReviewPanel` of permission rows, `StickyWizardFooter` with Cancel+Install.

All exported from `packages/ui/src/index.ts` and re-exported from `brandbook-legacy.ts`.

Build: 408.56 kB JS / 96.12 kB CSS (gzip: 119.19 kB / 15.20 kB). CSS growth due to all 18 brandbook stylesheets now loaded.

### Remaining migration work
- **App.tsx shell wiring**: switch `import { Sidebar }` → `import { SidebarCompat }` (design QA required).
- **Phase 5**: `DashboardScreen` and `ConnectorScreen` local screen logic → brandbook patterns (after design QA).
- **Local dead code**: `src/components/layout/Sidebar.tsx`, `src/components/layout/Topbar.tsx`, `src/components/dashboard/DashboardRenderer.tsx`, `src/components/ui/StatCard.tsx`, `src/components/ui/Leaderboard.tsx` — safe to delete after App.tsx wiring and Phase 5.
