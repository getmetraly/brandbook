# Metraly UI — Next Implementation Plan

**Status:** Ordered backlog for Phase 1 → Phase 2 execution.
**Date:** 2026-05-15
**Related:** `metraly-ui-phase-1-inventory.md`, `metraly-ui-stabilization-gap-report.md`, `metraly-ui-storybook-gap-matrix.md`

---

## Overview

Phase 1 (inventory and naming freeze) is documented. No app screens have been migrated.

### Progress update — 2026-05-15

- `P0-3` completed in `getmetraly/metraly/app/ui`: `typecheck` now passes.
- `P0-1` completed in `getmetraly/metraly/app/ui`: AI Workspace / Plugins / Connectors naming is applied in sidebar, titles, and feature folder paths.
- `P0-4` completed in `getmetraly/metraly/app/ui`: board experiment removed; product app now uses a single `App.tsx` / `index.tsx` bootstrap.
- `P1-8` completed in `getmetraly/metraly/app/ui`: app-side `design-system/` skeleton added with inert compat and token bridge placeholders.
- Regression validation passes in app UI: `npm run test`, `npm run typecheck`, `npm run build`.

This backlog defines what must happen before migration to `getmetraly/metraly/app/ui` can begin.

Items are ordered: P0 → P1 → P2. Within each tier, items are ordered by dependency.

---

## P0 — Required before any migration starts

### P0-1: Apply P0 naming fixes in `metraly/app/ui`

**Status:** Completed on 2026-05-15

**Target repo:** `getmetraly/metraly/app`
**Target files:**
- `ui/src/components/layout/Sidebar.tsx`
- `ui/src/App.tsx`
- `ui/src/features/ai-workspace/AIScreen.tsx` (folder rename)
- `ui/src/features/plugins/PluginScreen.tsx` (folder rename)

**Why it matters:** Deprecated names are used in the live UI. Every day they remain, the naming debt compounds. These are low-risk label-only changes.

**Acceptance criteria:**
- Sidebar label `AI Assistant` → `AI Workspace`
- Sidebar label `Marketplace` → `Plugins`
- Sidebar label `Connect Sources` → `Connectors`
- `App.tsx` titles: `ai: ['AI Workspace', ...]`, `plugins: ['Plugins', ...]`, `wizard: ['Connectors', ...]`
- Folder `features/aiAssistant/` renamed to `features/ai-workspace/` (update all imports)
- Folder `features/marketplace/` renamed to `features/plugins/` (update all imports)
- `npm run test` and `npm run build` pass after changes

**Test/check command:** `npm run test && npm run build`
**Risk level:** Low

---

### P0-2: Fix `Badge.tsx` raw color violations

**Status:** Completed on 2026-05-15

**Target repo:** `getmetraly/metraly/app`
**Target files:**
- `ui/src/components/ui/Badge.tsx`

**Why it matters:** `Badge.tsx` uses hardcoded hex (`#00C853`, `#FF9100`, `#FF1744`) and `rgba()` values. This is the exact design-system drift the migration blocks. It must be cleaned before the component is replaced.

**Acceptance criteria:**
- All raw colors replaced with `var(--success)`, `var(--warning)`, `var(--error)` and their opacity variants
- `rgba()` values replaced with CSS custom property tokens
- Status strings: note the current strings ("On track", "At risk", "Blocked", "Done", "Open") — do not change them yet (changing them breaks existing behavior); document that they will be replaced by `StatusBadge` in Phase 3

**Test/check command:** `grep -n "rgba\|#[0-9a-fA-F]" ui/src/components/ui/Badge.tsx` — returns zero matches after cleanup
**Risk level:** Low

---

### P0-3: Add `typecheck` script to `metraly/app/ui`

**Status:** Completed on 2026-05-15

**Target repo:** `getmetraly/metraly/app`
**Target files:**
- `ui/package.json`

**Why it matters:** There is no TypeScript check in the app. Phase 3 and beyond add typed component contracts — these are unverifiable without a typecheck step.

**Acceptance criteria:**
- `"typecheck": "tsc --noEmit"` added to scripts
- `npm run typecheck` passes with zero errors
- If errors surface from existing code, document them (do not suppress with `@ts-ignore` unless pre-existing)

**Test/check command:** `npm run typecheck`
**Risk level:** Low

---

### P0-4: Clarify entrypoint duplication — decide App.jsx vs App.tsx

**Status:** Completed on 2026-05-15

**Target repo:** `getmetraly/metraly/app`
**Target files:**
- `ui/src/App.tsx`
- `ui/src/index.tsx`

**Why it matters:** Duplicate bootstraps are architectural drift. The app now has one canonical entrypoint and the board-only experiment has been removed as dead code.

**Acceptance criteria:**
- `App.tsx` is the only app component used for production bootstrap
- `index.tsx` is the only bootstrap file
- Old board-only `App.tsx`/`index.tsx` and `features/board/` code are removed
- `npm run test`, `npm run typecheck`, and `npm run build` pass after cleanup

**Test/check command:** `npm run test && npm run typecheck && npm run build`
**Risk level:** Low

---

### P0-5: Add `StatusBadge` + full canonical taxonomy story in Brandbook

**Status:** Completed on 2026-05-15

**Target repo:** `getmetraly/brandbook`
**Target files:**
- `packages/ui/src/components/StatusBadge.tsx`
- `stories/StatusBadge.stories.tsx`
- `packages/ui/src/index.ts`
- `site/__tests__/StatusBadge.test.tsx`

**Why it matters:** The canonical status taxonomy is the foundation of every status-bearing surface. A dedicated `StatusBadge` now gives product-status surfaces a stable API without breaking legacy telemetry `StateBadge` usage.

**Acceptance criteria:**
- Story covers all 12 canonical statuses: Live, Preview, Designed, Planned, In progress, Gated, Policy defined, Benchmark pending, Coming soon, Error, Delayed, No data
- Each status has a visual example and reuses token-based `StateBadge` styling
- No raw colors in component implementation
- `npm run ui:check`, `npm run site:typecheck`, `npm run site:test`, and `npm run build-storybook` pass

**Test/check command:** `npm run ui:check && npm run site:typecheck && npm run site:test && npm run build-storybook`
**Risk level:** Low

---

### P0-6: Add `TrendBadge` component and story

**Status:** Completed on 2026-05-15

**Target repo:** `getmetraly/brandbook`
**Target files:**
- `packages/ui/src/components/TrendBadge.tsx` (new)
- `packages/ui/src/styles/metraly-trend-badge.css` (new)
- `stories/TrendBadge.stories.tsx` (new)
- `packages/ui/src/index.ts` (add export)

**Why it matters:** Metrics Explorer, MetricCard, and DataTable all need trend indicators. Without a canonical `TrendBadge`, feature code will implement its own divergent versions.

**Acceptance criteria:**
- Props: `direction: 'up' | 'down' | 'flat'`, `sentiment: 'positive' | 'negative' | 'neutral'`, `value?: string`, `size?: 'sm' | 'md'`
- Uses semantic tokens only (no raw colors)
- Story covers all direction/sentiment combinations, compact and table-cell usage
- `npm run ui:check` passes

**Test/check command:** `npm run ui:check && npm run build-storybook`
**Risk level:** Low

---

### P0-7: Add `Skeleton` component and story

**Status:** Completed on 2026-05-15

**Target repo:** `getmetraly/brandbook`
**Target files:**
- `packages/ui/src/components/MetralySkeleton.tsx` (new)
- `packages/ui/src/styles/metraly-skeleton.css` (new)
- `stories/MetralySkeleton.stories.tsx` (new)
- `packages/ui/src/index.ts` (add export)

**Why it matters:** Every loading state across dashboards, tables, and metric cards needs skeleton placeholders. Without `Skeleton`, loading states use spinners or blank space, creating layout jumps.

**Acceptance criteria:**
- Props: `variant: 'text' | 'card' | 'table' | 'widget'`, `lines?: number`, `height?: string`
- Respects `prefers-reduced-motion` (disables animation)
- Story covers: card skeleton, table skeleton, widget skeleton, reduced-motion check
- No raw colors

**Test/check command:** `npm run ui:check && npm run build-storybook`
**Risk level:** Low

---

### P0-8: Add `FilterBar` component and story

**Status:** Completed on 2026-05-15

**Target repo:** `getmetraly/brandbook`
**Target files:**
- `packages/ui/src/components/MetralyFilterBar.tsx` (new)
- `packages/ui/src/styles/metraly-filter-bar.css` (new)
- `stories/MetralyFilterBar.stories.tsx` (new)
- `packages/ui/src/index.ts` (add export)

**Why it matters:** Metrics Explorer, DataTable, and PluginCatalog all need filter controls. Without `FilterBar`, filter UIs diverge across every feature screen.

**Acceptance criteria:**
- Props: `filters: FilterItem[]`, `onReset?: () => void`, `collapsed?: boolean`
- Mobile collapsed behavior
- Story covers: compact, overflow case, reset action, mobile collapsed
- No raw colors

**Test/check command:** `npm run ui:check && npm run build-storybook`
**Risk level:** Low

---

### P0-9: Add `EmptyState` component and story

**Status:** Completed on 2026-05-15

**Target repo:** `getmetraly/brandbook`
**Target files:**
- `packages/ui/src/components/MetralyEmptyState.tsx` (new, wrapping `DashboardEmptyState` or replacing it)
- `stories/MetralyEmptyState.stories.tsx` (new)
- `packages/ui/src/index.ts` (add export)

**Why it matters:** `PlaceholderScreen` in the app uses an empty state pattern with no standard component. Dashboard, Metrics Explorer, Connectors, and Plugin surfaces all need consistent empty states.

**Acceptance criteria:**
- Props: `title: string`, `description?: string`, `action?: React.ReactNode`, `icon?: string`, `variant?: 'default' | 'gated' | 'error' | 'no-results'`
- Story covers: dashboard empty, connector empty, no search results, permission-gated
- No raw colors

**Test/check command:** `npm run ui:check && npm run build-storybook`
**Risk level:** Low

---

### P0-10: Add `Tabs` story with full a11y coverage

**Target repo:** `getmetraly/brandbook`
**Target files:**
- `stories/MetralyTabs.stories.tsx` (new)

**Why it matters:** `MetralyTabs` exists in the codebase but has no story. Tab keyboard semantics (Arrow key navigation, tabpanel association) are entirely unverified. If tabs are used for route navigation in the app, they become a WCAG 2.1 accessibility failure.

**Acceptance criteria:**
- Story shows: real tabs with keyboard navigation (Arrow left/right), tabpanel content update, overflow case
- Story shows: route-navigation alternative using links (not tabs) with explicit comment
- Tab/tabpanel ARIA semantics verified in story
- No story uses tabs for route-level navigation changes

**Test/check command:** `npm run build-storybook` + manual keyboard test
**Risk level:** Low (story only — component change may be needed if semantics are broken)

---

### P0-11: Add `AppShellRoleContext` scenario story

**Target repo:** `getmetraly/brandbook`
**Target files:**
- `stories/MetralyShell.stories.tsx` (extend) or new `stories/AppShellRoleContext.stories.tsx`

**Why it matters:** Shell context mismatch (sidebar says CTO, title says VP Eng) is a P0 bug in the plan. A scenario story that exercises the role context proves the shell cannot show conflicting scopes.

**Acceptance criteria:**
- Story shows: one active route, sidebar item highlighted, page title and header aligned
- Story shows: what happens when a gated nav item is shown (visible gated state)
- Story explicitly shows tabs vs links distinction in top area
- No example in the story has sidebar/title/top-tab showing different contexts simultaneously

**Test/check command:** `npm run build-storybook`
**Risk level:** Low

---

## P1 — Required before dashboard/editor migration

### P1-1: Add `MoveMenu` component and story

**Target repo:** `getmetraly/brandbook`
**Target files:**
- `packages/ui/src/dashboard/MoveMenu.tsx` (new)
- `stories/MoveMenu.stories.tsx` (new)
- `packages/ui/src/index.ts` (add export)

**Why it matters:** Without `MoveMenu`, board editing is drag-only and fails WCAG 2.1 SC 2.5.1 (pointer alternatives). This is the single biggest accessibility gap in the migration.

**Acceptance criteria:**
- Props: `onMove: (direction: 'up' | 'down' | 'left' | 'right') => void`, `onCancel: () => void`, disabled directions based on boundary
- Each move button has an accessible label
- Keyboard-navigable (Tab + Enter/Space)
- Story covers: all directions, cancel, disabled boundary states
- No pulse marker used

**Test/check command:** `npm run ui:check && npm run build-storybook`
**Risk level:** Medium — new component with a11y contract

---

### P1-2: Expand `BoardDropZone` story with keyboard states

**Target repo:** `getmetraly/brandbook`
**Target files:**
- `stories/DashboardDropZone.stories.tsx`
- `packages/ui/src/dashboard/DashboardDropZone.tsx` (fix hardcoded `data-pulse="off"` and text "+" if not SVG)

**Status:** Completed on 2026-05-15

**Why it mattered:** `DashboardDropZone` had `data-pulse="off"` hardcoded and used a text "+" character instead of an SVG icon. The keyboard alternative story was missing.

**Acceptance criteria:**
- Story adds keyboard-safe action fallback state
- `+` icon is an SVG/icon component (not a text character)
- Hardcoded `data-pulse` attribute removed from the component contract

**Test/check command:** `npm run build-storybook`
**Risk level:** Low

---

### P1-3: Add `GripHandle` story

**Status:** Completed on 2026-05-15

**Target repo:** `getmetraly/brandbook`
**Target files:**
- `stories/GripHandle.stories.tsx` (new — covers `DashboardResizeHandle`)

**Why it mattered:** `DashboardResizeHandle` existed but had no story. Focus-visible state and keyboard label were not confirmed.

**Acceptance criteria:**
- Story covers visible focus and keyboard label
- No pulse marker used as grip
- Remaining follow-up: manual touch-target verification

**Test/check command:** `npm run build-storybook` + manual keyboard focus test
**Risk level:** Low

---

### P1-4: Add `WizardLayout` component (from recipe)

**Status:** Completed on 2026-05-15

**Target repo:** `getmetraly/brandbook`
**Target files:**
- `packages/ui/src/wizard/WizardLayout.tsx` (new — extracted from recipe)
- `stories/WizardLayout.stories.tsx` (new — replaces recipe story with component story)
- `packages/ui/src/index.ts` (add exports)

**Why it mattered:** Connectors, Dashboard Wizard, and onboarding all need a consistent wizard pattern. Previously only a recipe story existed — there was no importable component.

**Acceptance criteria:**
- `WizardLayout` is importable from `@metraly/ui`
- Recipe story is replaced with a component story
- Story covers middle-step desktop/tablet/mobile layout
- Mobile steps sheet and sticky footer behavior are validated in component tests/builds
- `npm run ui:check` passes

**Test/check command:** `npm run ui:check && npm run build-storybook`
**Risk level:** Medium — dedicated `StepRail` / `ReviewPanel` / `StickyWizardFooter` sub-primitives are still future work

---

### P1-5: Add `DashboardWizard` scenario story

**Status:** Completed on 2026-05-15

**Target repo:** `getmetraly/brandbook`
**Target files:**
- `stories/DashboardWizard.stories.tsx` (new)

**Why it mattered:** The Dashboard Wizard flow (goal → role → widgets → review → create) was entirely missing from Storybook. Before `features/dashboardWizard/DashboardWizardScreen.tsx` can be migrated, the scenario needed verification.

**Acceptance criteria:**
- Story covers choose goal, choose role template, review widget bundle, create error, and success state
- Uses `WizardLayout`
- Gated widgets are shown with disabled state and explanation

**Test/check command:** `npm run build-storybook`
**Risk level:** Low

---

### P1-5b: Add `BoardCanvas` story coverage

**Status:** Completed on 2026-05-15

**Target repo:** `getmetraly/brandbook`
**Target files:**
- `stories/BoardCanvas.stories.tsx` (new)

**Why it mattered:** `DashboardGrid` existed, but the migration contract still lacked a dedicated `BoardCanvas` story proving empty, populated, and narrow viewport behavior.

**Acceptance criteria:**
- Story covers populated canvas
- Story covers empty canvas
- Story covers narrow/mobile viewport

**Test/check command:** `npm run build-storybook`
**Risk level:** Low

---

### P1-5c: Add overlay verification stories and tests

**Status:** Completed on 2026-05-15

**Target repo:** `getmetraly/brandbook`
**Target files:**
- `stories/MetralyDrawer.stories.tsx`
- `stories/MetralyBottomSheet.stories.tsx`
- `site/__tests__/shell/MetralyOverlayFocus.test.tsx`

**Why it mattered:** `Drawer` and `BottomSheet` already implemented focus restore and body scroll lock, but the migration plan had no story/test evidence for those contracts.

**Acceptance criteria:**
- Story shows focus-restore workflow for `Drawer`
- Story shows long-content + focus-restore workflow for `BottomSheet`
- Site tests verify focus returns to the trigger and body scroll lock is removed on close

**Test/check command:** `npm run site:test && npm run build-storybook`
**Risk level:** Low

---

### P1-6: Expand `MetricCard` story with all states

**Status:** Completed on 2026-05-15

**Target repo:** `getmetraly/brandbook`
**Target files:**
- `stories/DashboardWidget.stories.tsx` or new `stories/MetralyMetricCard.stories.tsx`

**Why it mattered:** `MetralyMetricCard` is used on every dashboard. Loading, empty, error, and stale states were missing from stories.

**Acceptance criteria:**
- Story covers loading (with Skeleton), empty, error, stale, positive delta, negative delta, compact mode, and long label/value overflow
- No raw colors were introduced in component or story state rendering

**Test/check command:** `npm run build-storybook`
**Risk level:** Low

---

### P1-6a: Introduce shared `CardShell` foundation

**Status:** Completed on 2026-05-15

**Target repo:** `getmetraly/brandbook`
**Target files:**
- `packages/ui/src/components/CardShell.tsx` (new)
- `packages/ui/src/components/MetralyCard.tsx`
- `packages/ui/src/components/MetralyMetricCard.tsx`
- `packages/ui/src/dashboard/DashboardWidget.tsx`
- `packages/ui/src/styles/metraly-card.css`
- `site/__tests__/surface/CardShell.test.tsx`
- migration/map/architecture docs

**Why it mattered:** `MetralyCard`, `MetralyMetricCard`, and `DashboardWidget` were visually similar but maintained separate shell layouts. This caused repeated footer, overflow, density, badge, and mobile fixes across multiple CSS files.

**Acceptance criteria:**
- `MetralyPanel` remains the low-level surface primitive
- `CardShell` owns header/body/footer/overlay slots and equal-height behavior
- `MetralyCard` composes `CardShell` for generic content
- `MetralyMetricCard` composes `CardShell` for KPI/scalar metrics
- `DashboardWidget` composes `CardShell` while keeping drag/resize/remove widget chrome separate
- Docs and migration maps explicitly describe the layered surface model

**Test/check command:** `npm run site:test -- CardShell` plus full `npm run site:test && npm run build-storybook` when dependencies are installed
**Risk level:** Medium — shared foundation touches core surfaces

---

### P1-7: Add `DataTable` mobile/stacked presentation

**Status:** Completed on 2026-05-15

**Target repo:** `getmetraly/brandbook`
**Target files:**
- `packages/ui/src/components/MetralyTable.tsx` (extend with `mobilePresentation` prop)
- `packages/ui/src/styles/metraly-table.css` (extend)
- `stories/MetralyTable.stories.tsx` (extend)

**Why it mattered:** `DataTable<Row>` needed mobile card/stacked mode for Metrics Explorer and Connectors. Without this, mobile layouts were broken.

**Acceptance criteria:**
- `mobilePresentation?: 'table' | 'cards' | 'stacked'` prop added
- `cards` and `stacked` modes are exposed through CSS-backed narrow-viewport rendering
- Story includes mobile card and stacked modes
- Table keeps its internal frame wrapper and does not require body-level overflow hacks

**Test/check command:** `npm run ui:check && npm run build-storybook`
**Risk level:** Medium — prop/render change to existing component

---

### P1-8: Create `design-system/` folder structure in `metraly/app/ui`

**Status:** Completed on 2026-05-15

**Target repo:** `getmetraly/metraly/app`
**Target files:**
- `ui/src/design-system/tokens/semantic.css` (new — empty bridge file)
- `ui/src/design-system/tokens/aliases.css` (new)
- `ui/src/design-system/tokens/status-tokens.css` (new)
- `ui/src/design-system/compat/brandbook-legacy.ts` (new — empty barrel for now)
- `ui/src/design-system/index.ts` (new — empty barrel for now)

**Why it mattered:** The local design-system structure was required before any component could be imported cleanly. Creating empty but valid barrel files locks in the folder convention without starting migration early.

**Acceptance criteria:**
- Folders exist
- Token CSS files exist as inert bridge placeholders
- `brandbook-legacy.ts` documents intent; the first live `@metraly/ui` import now starts the Phase 3 cutover with `PlaceholderScreenCompat` → `MetralyEmptyState`
- `npm run typecheck` and `npm run build` still pass

**Test/check command:** `npm run typecheck && npm run build`
**Risk level:** Low

---

### P1-11: Extract `StepRail` from `WizardLayout`

**Status:** Completed on 2026-05-15

**Target repo:** `getmetraly/brandbook`
**Target files:**
- `packages/ui/src/wizard/StepRail.tsx` (new)
- `stories/StepRail.stories.tsx` (new — 9 stories)
- `site/__tests__/wizard/StepRail.test.tsx` (new — 14 assertions)
- `packages/ui/src/index.ts` (exports added)

**Acceptance criteria met:**
- `StepRail` is importable from `@metraly/ui`
- Horizontal and vertical orientations with all status states (done/current/next/warning)
- `WizardLayout` composes `StepRail` internally; backward compat type aliases in place
- `aria-current="step"` on current step; no-aria on completed/pending
- Mobile story at 390px
---

### P1-12: Extract `ReviewPanel` and `StickyWizardFooter`

**Status:** Completed on 2026-05-15

**Target repo:** `getmetraly/brandbook`
**Target files:**
- `packages/ui/src/wizard/ReviewPanel.tsx` (new)
- `packages/ui/src/wizard/StickyWizardFooter.tsx` (new)
- `stories/ReviewPanel.stories.tsx` (new — 6 stories)
- `stories/StickyWizardFooter.stories.tsx` (new — 6 stories)
- `site/__tests__/wizard/ReviewPanel.test.tsx` (new)
- `site/__tests__/wizard/StickyWizardFooter.test.tsx` (new)
- `packages/ui/src/index.ts` (exports added)
- `packages/ui/src/styles/metraly-wizard.css` (CSS added for both primitives)

**Acceptance criteria met:**
- Both primitives are importable from `@metraly/ui`
- `ReviewPanel`: connector, dashboard, loading, empty, long-text, and no-header stories
- `StickyWizardFooter`: middle-step, first-step, submitting, status-slot, mobile, and composed stories
- Footer is sticky above the viewport floor with safe-area inset; static on ≤560px

### P1-9: Fix `pin` button semantics in `Sidebar.tsx`

**Status:** Completed on 2026-05-15

**Target repo:** `getmetraly/metraly/app`
**Target files:**
- `ui/src/components/layout/Sidebar.tsx`

**Why it mattered:** Pin/unpin affordances used `<span role="button" tabIndex={0}>`, which is a known a11y anti-pattern. They needed to be native `<button>` elements.

**Acceptance criteria:**
- `<span role="button">` → `<button type="button">` for all pin/unpin controls
- Native button click semantics now own activation
- Visual appearance remains unchanged

**Test/check command:** `npm run test && npm run typecheck && npm run build`
**Risk level:** Low

---

### P1-10: Promote `PulseMarker` into a public semantic primitive

**Status:** Completed on 2026-05-15

**Target repo:** `getmetraly/brandbook`
**Target files:**
- `packages/ui/src/components/PulseMarker.tsx`
- `packages/ui/src/styles/metraly-pulse-marker.css`
- `stories/PulseMarker.stories.tsx`
- `site/__tests__/PulseMarker.test.tsx`

**Why it mattered:** Pulse usage was already present in the system, but it remained implicit and scattered. A named primitive was needed to keep pulse semantic-only and to document allowed usage.

**Acceptance criteria:**
- `PulseMarker` exists as a public component
- Dot and heartbeat-wave variants exist
- Story documents allowed semantic usage and static mode
- Reduced-motion safety inherits from theme-level motion controls

**Test/check command:** `npm run ui:check && npm run site:test && npm run build-storybook`
**Risk level:** Low

---

## P2 — Improvements that can happen later

### P2-1: Resolve JS file duplication in app

**Target repo:** `getmetraly/metraly/app`
**Files:** `api/endpoints/dora.js` + `dora.ts`, `components/charts/index.js`, `components/ui/index.js`, `features/onboarding/firstRun.js`, `utils/formatting.js`, `utils/seeds.js`, `context/TweaksContext.jsx`

**Why:** Mixed `.js`/`.jsx` in a TypeScript codebase creates type-safety gaps and import resolution ambiguity.
**Acceptance criteria:** All JS/JSX files converted to TS/TSX or moved to `test/`/`scripts/` if they are non-production. One file per module, no `.js`/`.ts` duplicates for the same module.
**Risk level:** Medium — review import side-effects before converting

---

### P2-2: Investigate types duplication

**Target repo:** `getmetraly/metraly/app`
**Files:** `types/api.ts` vs `api/types/api.ts`, `types/widgets.ts` vs `api/types/widgets.ts`

**Why:** Two type sets for the same domain increases the chance of divergence.
**Acceptance criteria:** One canonical type location; the other re-exports or is deleted.
**Risk level:** Low

---

### P2-3: Remove `DraggableTweaksPanel` from production bundle

**Target repo:** `getmetraly/metraly/app`
**Files:** `components/layout/DraggableTweaksPanel.tsx`, `App.tsx`

**Why:** The tweaks panel mutates `--cyan` at runtime, which is a design-system drift tool. It should be gated behind `import.meta.env.DEV` or removed entirely from production builds.
**Acceptance criteria:** `DraggableTweaksPanel` does not appear in the production Vite bundle. Feature flag or build-time gate added.
**Risk level:** Low

---

### P2-4: Add AI/Plugins/Trust components to Brandbook

**Target repo:** `getmetraly/brandbook`
**Components:** `AIWorkspaceLayout`, `EvidencePanel`, `AnswerCard`, `TraceDrawer`, `PluginCatalog`, `PluginReviewDrawer`, `PermissionBadge`, `SigningBanner`

**Why:** Required before Phase 9 (AI Workspace and Plugins migration).
**Acceptance criteria:** All components exist, have stories, and pass visual review.
**Risk level:** High (new complex components) — defer to Phase 9 preparation

---

### P2-5: Configure app-level Storybook or visual harness

**Target repo:** `getmetraly/metraly/app`
**Files:** Storybook config, `package.json` scripts

**Why:** App-level visual regression and component documentation do not exist.
**Acceptance criteria:** `npm run storybook` and `npm run build-storybook` work; at minimum `AppShell`, `DashboardScreen`, `MetricsScreen` have stories.
**Risk level:** Medium

---

## Execution order summary

```
P0-3  typecheck script              — completed
P0-1  P0 naming fixes               — completed
P0-4  Entrypoint decision           — completed
P0-5  StatusBadge story             — completed
P0-2  Badge.tsx raw colors          — completed
P0-6  TrendBadge component+story   — completed
P0-7  Skeleton component+story     — completed
P0-8  FilterBar component+story    — completed
P0-9  EmptyState component+story   — completed
P0-10 Tabs story + a11y            — 2 hr (brandbook)
P0-11 AppShellRoleContext story    — 2 hr (brandbook)
P1-8  design-system/ structure     — 1 hr (app)
P1-9  Sidebar pin semantics        — 30 min (app)
P1-1  MoveMenu component+story     — 4 hr (brandbook)
P1-2  BoardDropZone expand         — 1 hr (brandbook)
P1-3  GripHandle story             — 1 hr (brandbook)
P1-4  WizardLayout component       — 6 hr (brandbook)
P1-6  MetricCard states            — 2 hr (brandbook)
P1-7  DataTable mobile             — 3 hr (brandbook)
P1-5  DashboardWizard scenario     — 2 hr (brandbook)
```

After P0 and P1 are complete, re-evaluate the stabilization checklist gate before starting Phase 3 (component rename and API contract migration in the app).


## Brandbook foundation dependency — 2026-05-15

Before migrating additional app screens, agents must account for the new brandbook foundation layer:

- use `CardShell` for generic cards, metric cards, and widget shells;
- use `FieldShell` for local form control wrappers and filter chips;
- use `OverlayShell` for mobile navigation, review drawers, trace drawers, and bottom sheets;
- use `StateBlock` for empty/error/gated/loading states;
- use `NavigationItemFrame` for route nav and tree-row visual consistency;
- use `useRovingSelection` for tabs/segmented selectors;
- use `HandlePrimitive` for drag/resize/move/drop controls.

This should be reflected in the app `design-system/compat` layer so legacy names map to canonical names without duplicating layout code.

## WizardLayout follow-up — 2026-05-15

After foundation iterations 1–6, the next app-alignment change is the wizard shell:

1. Validate `Scenarios/DashboardWizard/*` with the default top stepper at 390, 768, 1024, 1280 and 1440px.
2. Port the same contract to Connector Wizard / onboarding stories.
3. Keep `progressPlacement="side"` only for primitive documentation.
4. Do not introduce one-off sidebar wizard shells in product scenarios.
5. When migrating into `getmetraly/metraly/ui`, map this foundation to local `WizardLayout`, `StepRail`, `ReviewPanel`, and `StickyWizardFooter` without changing the visual rhythm.


### Wizard implementation note

Keep connector setup and dashboard builder as separate migration tracks. Connector setup should be migrated as a product flow using `WizardLayout`; dashboard builder should be migrated as an AppShell recipe with its own left rail and preview canvas.
