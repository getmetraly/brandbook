# Metraly UI — Next Implementation Plan

**Status:** Ordered backlog for Phase 1 → Phase 2 execution.
**Date:** 2026-05-15
**Related:** `metraly-ui-phase-1-inventory.md`, `metraly-ui-stabilization-gap-report.md`, `metraly-ui-storybook-gap-matrix.md`

---

## Overview

Phase 1 (inventory and naming freeze) is documented. No app screens have been migrated.

This backlog defines what must happen before migration to `getmetraly/metraly/app/ui` can begin.

Items are ordered: P0 → P1 → P2. Within each tier, items are ordered by dependency.

---

## P0 — Required before any migration starts

### P0-1: Apply P0 naming fixes in `metraly/app/ui`

**Target repo:** `getmetraly/metraly/app`
**Target files:**
- `ui/src/components/layout/Sidebar.tsx`
- `ui/src/App.jsx`
- `ui/src/features/aiAssistant/AIScreen.tsx` (folder rename)
- `ui/src/features/marketplace/PluginScreen.tsx` (folder rename)

**Why it matters:** Deprecated names are used in the live UI. Every day they remain, the naming debt compounds. These are low-risk label-only changes.

**Acceptance criteria:**
- Sidebar label `AI Assistant` → `AI Workspace`
- Sidebar label `Marketplace` → `Plugins`
- Sidebar label `Connect Sources` → `Connectors`
- `App.jsx` titles: `ai: ['AI Workspace', ...]`, `plugins: ['Plugins', ...]`, `wizard: ['Connectors', ...]`
- Folder `features/aiAssistant/` renamed to `features/ai-workspace/` (update all imports)
- Folder `features/marketplace/` renamed to `features/plugins/` (update all imports)
- `npm run test` and `npm run build` pass after changes

**Test/check command:** `npm run test && npm run build`
**Risk level:** Low

---

### P0-2: Fix `Badge.tsx` raw color violations

**Target repo:** `getmetraly/metraly/app`
**Target files:**
- `ui/src/components/ui/Badge.tsx`

**Why it matters:** `Badge.tsx` uses hardcoded hex (`#00C853`, `#FF9100`, `#FF1744`) and `rgba()` values. This is the exact design-system drift the migration blocks. It must be cleaned before the component is replaced.

**Acceptance criteria:**
- All raw colors replaced with `var(--success)`, `var(--warning)`, `var(--error)` and their opacity variants
- `rgba()` values replaced with CSS custom property tokens
- Status strings: note the current strings ("On track", "At risk", "Blocked", "Done", "Open") — do not change them yet (changing them breaks existing behavior); document that they will be replaced by `StatusBadge` in Phase 3

**Test/check command:** `grep -n "rgba\|#[0-9a-fA-F]" ui/src/components/ui/Badge.tsx` — must return zero component-body matches (token definitions are allowed)
**Risk level:** Low

---

### P0-3: Add `typecheck` script to `metraly/app/ui`

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

**Target repo:** `getmetraly/metraly/app`
**Target files:**
- `ui/src/App.jsx`, `ui/src/App.tsx`, `ui/src/index.jsx`, `ui/src/index.tsx`
- `ui/vite.config.*`

**Why it matters:** Two parallel applications exist. Vite's entry resolution determines which one runs. The `App.tsx` Board experiment has a clean `BoardRepository` architecture that may be the intended future for the dashboard editor. Deleting it without understanding could destroy valuable architectural work.

**Acceptance criteria:**
- Check `vite.config.*` for explicit `input` — document which index file is the actual entry
- Document `App.tsx` + `index.tsx` as: (a) active parallel experiment, (b) future migration target for board routing, or (c) abandoned — with evidence
- Do not delete either file until the decision is documented and a passing build confirms the correct entrypoint
- Create `docs/migration/entrypoint-decision.md` with the finding

**Test/check command:** `npm run build` — inspect output bundle to confirm which App bootstraps
**Risk level:** Medium — wrong decision could break the running app

---

### P0-5: Add `StatusBadge` + full canonical taxonomy story in Brandbook

**Target repo:** `getmetraly/brandbook`
**Target files:**
- `stories/StatusBadge.stories.tsx` (new — replace or extend `StateBadge.stories.tsx`)
- `packages/ui/src/components/StateBadge.tsx` (add canonical status props if missing)

**Why it matters:** The canonical status taxonomy is the foundation of every status-bearing surface. Without a verified `StatusBadge` covering all 12 states, every downstream `HealthPill`, `TrendBadge`, and status indicator is unspecified.

**Acceptance criteria:**
- Story covers all 12 canonical statuses: Live, Preview, Designed, Planned, In progress, Gated, Policy defined, Benchmark pending, Coming soon, Error, Delayed, No data
- Each status has a visual example and the correct token/color usage
- No raw colors in component implementation
- Story builds in Storybook without error

**Test/check command:** `npm run build-storybook`
**Risk level:** Low

---

### P0-6: Add `TrendBadge` component and story

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

**Why it matters:** `DashboardDropZone` has `data-pulse="off"` hardcoded and uses a text "+" character instead of an SVG icon. The keyboard alternative story is missing.

**Acceptance criteria:**
- Story adds: keyboard target state, invalid drop state
- `+` icon is an SVG or icon component (not a text character)
- `data-pulse` attribute behavior is documented (off by default is correct — pulse must not appear on drop zones)

**Test/check command:** `npm run build-storybook`
**Risk level:** Low

---

### P1-3: Add `GripHandle` story

**Target repo:** `getmetraly/brandbook`
**Target files:**
- `stories/GripHandle.stories.tsx` (new — covers `DashboardResizeHandle`)

**Why it matters:** `DashboardResizeHandle` exists but has no story. Focus-visible state and keyboard label are not confirmed.

**Acceptance criteria:**
- Story covers: visible focus, disabled, keyboard label
- Touch target meets minimum 44×44px
- No pulse marker used as grip

**Test/check command:** `npm run build-storybook` + manual keyboard focus test
**Risk level:** Low

---

### P1-4: Add `WizardLayout` component (from recipe)

**Target repo:** `getmetraly/brandbook`
**Target files:**
- `packages/ui/src/wizard/WizardLayout.tsx` (new — extracted from recipe)
- `packages/ui/src/wizard/StepRail.tsx` (new)
- `packages/ui/src/wizard/ReviewPanel.tsx` (new)
- `packages/ui/src/wizard/StickyWizardFooter.tsx` (new)
- `stories/WizardLayout.stories.tsx` (new — replaces recipe story with component story)
- `packages/ui/src/index.ts` (add exports)

**Why it matters:** Connectors, Dashboard Wizard, and onboarding all need a consistent wizard pattern. Currently only a recipe story exists — there is no importable component.

**Acceptance criteria:**
- `WizardLayout` composes `StepRail`, content area, `ReviewPanel`, `StickyWizardFooter`
- Props defined per architecture plan (see `metraly-local-ui-layer-architecture.md` section 6)
- Story covers: first step, middle step, last step, error step, review step, mobile
- `StickyWizardFooter` safe-area tested at 320px
- `npm run ui:check` passes

**Test/check command:** `npm run ui:check && npm run build-storybook`
**Risk level:** Medium — new components with layout contracts

---

### P1-5: Add `DashboardWizard` scenario story

**Target repo:** `getmetraly/brandbook`
**Target files:**
- `stories/DashboardWizard.stories.tsx` (new)

**Why it matters:** The Dashboard Wizard flow (goal → role → widgets → review → create) is entirely missing from Storybook. Before `features/dashboardWizard/DashboardWizardScreen.tsx` can be migrated, the scenario must be verified.

**Acceptance criteria:**
- Story covers: choose goal, choose role template, review widget bundle, create error, success state
- Uses `WizardLayout` (P1-4 must be done first)
- Gated widgets shown with disabled state and reason

**Test/check command:** `npm run build-storybook`
**Risk level:** Low (depends on P1-4)

---

### P1-6: Expand `MetricCard` story with all states

**Target repo:** `getmetraly/brandbook`
**Target files:**
- `stories/DashboardWidget.stories.tsx` or new `stories/MetralyMetricCard.stories.tsx`

**Why it matters:** `MetralyMetricCard` is used on every dashboard. Loading, empty, error, and stale states are missing from stories.

**Acceptance criteria:**
- Story covers: loading (with Skeleton), empty, error, stale (with timestamp), positive delta, negative delta, compact mode, long label/value overflow
- No raw colors in component

**Test/check command:** `npm run build-storybook`
**Risk level:** Low

---

### P1-7: Add `DataTable` mobile/stacked presentation

**Target repo:** `getmetraly/brandbook`
**Target files:**
- `packages/ui/src/components/MetralyTable.tsx` (extend with `mobilePresentation` prop)
- `packages/ui/src/styles/metraly-table.css` (extend)
- `stories/MetralyTable.stories.tsx` (extend)

**Why it matters:** `DataTable<Row>` must support mobile card/stacked mode for Metrics Explorer and Connectors. Without this, mobile layouts are broken.

**Acceptance criteria:**
- `mobilePresentation?: 'table' | 'cards' | 'stacked'` prop added
- `cards` mode: each row renders as a card at narrow viewports
- Story includes mobile card mode at 375px viewport
- Table region scrolls internally — no body-level horizontal overflow

**Test/check command:** `npm run ui:check && npm run build-storybook`
**Risk level:** Medium — prop/render change to existing component

---

### P1-8: Create `design-system/` folder structure in `metraly/app/ui`

**Target repo:** `getmetraly/metraly/app`
**Target files:**
- `ui/src/design-system/tokens/semantic.css` (new — empty bridge file)
- `ui/src/design-system/tokens/aliases.css` (new)
- `ui/src/design-system/tokens/status-tokens.css` (new)
- `ui/src/design-system/compat/brandbook-legacy.ts` (new — empty barrel for now)
- `ui/src/design-system/index.ts` (new — empty barrel for now)

**Why it matters:** The local design-system structure is required before any component can be imported cleanly. Creating empty but valid barrel files locks in the folder convention.

**Acceptance criteria:**
- Folders exist
- Token CSS files import from `@metraly/ui` or reference `--m-*` tokens correctly
- `brandbook-legacy.ts` has comments describing intent but no imports yet (imports will come in Phase 3)
- `npm run typecheck` and `npm run build` still pass

**Test/check command:** `npm run typecheck && npm run build`
**Risk level:** Low

---

### P1-9: Fix `pin` button semantics in `Sidebar.tsx`

**Target repo:** `getmetraly/metraly/app`
**Target files:**
- `ui/src/components/layout/Sidebar.tsx`

**Why it matters:** Pin/unpin affordances use `<span role="button" tabIndex={0}>` which is a known a11y anti-pattern. They should be `<button>` elements.

**Acceptance criteria:**
- `<span role="button">` → `<button type="button">` for all pin/unpin controls
- `onClick` and `onKeyDown` handlers replaced with native `button` click semantics
- Visual appearance unchanged

**Test/check command:** `npm run test && npm run build`
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
**Files:** `components/layout/DraggableTweaksPanel.tsx`, `App.jsx`

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
P0-3  typecheck script              — 30 min
P0-1  P0 naming fixes              — 1 hr
P0-2  Badge.tsx raw colors         — 1 hr
P0-4  Entrypoint decision          — 2 hr (investigation)
P0-5  StatusBadge story            — 2 hr (brandbook)
P0-6  TrendBadge component+story   — 3 hr (brandbook)
P0-7  Skeleton component+story     — 2 hr (brandbook)
P0-8  FilterBar component+story    — 3 hr (brandbook)
P0-9  EmptyState component+story   — 2 hr (brandbook)
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
