# Metraly UI Pre-Migration Stabilization Checklist

**Status:** Required gate before moving Brandbook/UI components into `getmetraly/metraly/ui`.  
**Last updated:** 2026-05-15  
**Related documents:**
- `docs/metraly-ui-to-brandbook-component-plan.md`
- `docs/metraly-ui-to-brandbook-component-map.md`
- `docs/metraly-ui-ux-scenario-audit.md`
- `docs/metraly-local-ui-layer-architecture.md`

---

## 1. Purpose

Before migrating components into `getmetraly/metraly/ui`, the Brandbook component set must be visually stable, interaction-stable, documented in Storybook, and covered by repeatable checks.

This document defines the gate between planning/local structure work and screen-by-screen product migration.

The migration must not start from components that still have known visual bugs, incomplete responsive behavior, missing states, or weak accessibility semantics.

---

## 2. Placement in the migration plan

This checklist should be treated as a mandatory gate after naming/status freeze and before feature-level migration.

Recommended order:

```text
Phase 1 — Inventory, naming freeze, and status taxonomy
→ Phase 2 — Brandbook component stabilization and Storybook coverage
→ Phase 3 — Local design-system structure and token bridge
→ Phase 4 — Component rename and API contract migration
→ Phase 5+ — Screen-by-screen migration
```

If the existing plan numbering is kept unchanged, this document acts as a `Phase 2 readiness gate` before any component is consumed by `getmetraly/metraly/ui`.

---

## 3. Stabilization priorities

| Priority | Area | Why it matters before migration |
|---:|---|---|
| P0 | Tokens and visual primitives | Prevents raw color drift and inconsistent density in the app. |
| P0 | Card/surface system | Most product screens depend on cards, panels, widgets, and tables. |
| P0 | DataTable and dense data surfaces | Metrics Explorer, connectors, plugins, settings, and dashboards need reliable tables. |
| P0 | WidgetShell and dashboard surfaces | Dashboard migration depends on stable widget chrome and state handling. |
| P0 | AppShell and navigation semantics | Product IA bugs become harder to fix after migration. |
| P0 | Drawer/BottomSheet/Dialog behavior | Mobile shell, widget catalog, connector setup, and details panels depend on overlays. |
| P0 | Tabs vs navigation semantics | Prevents accessibility and mental-model bugs in role/dashboard navigation. |
| P0 | Status taxonomy components | Prevents inconsistent Live/Preview/Planned/Gated/Error/No data states. |
| P1 | Board edit affordances | Needed before dashboard editor migration. |
| P1 | Wizard pattern | Needed before onboarding, connectors, and dashboard wizard migration. |
| P1 | AI evidence surfaces | Needed before AI Workspace appears production-like. |
| P1 | Plugin trust surfaces | Needed before Plugins/Marketplace looks installable. |

---

## 4. Required component-level Storybook additions

### 4.1 Primitives

| Component | Required stories |
|---|---|
| `Button` / `MetralyButton` | all variants, icon-only, loading, disabled, destructive, full-width mobile, wrapped action row. |
| `Input` / `MetralyInput` | label, description, error, disabled, search, left/right icons, long value, mobile full-width. |
| `Select` | closed/open, disabled, error, long option labels, compact filter usage, mobile width. |
| `Tabs` | real tabs with keyboard navigation, overflow case, route-like alternative shown as links. |
| `IconButton` | label/aria-label, selected, disabled, dense toolbar usage. |

### 4.2 Telemetry and status

| Component | Required stories |
|---|---|
| `StatusBadge` | Live, Preview, Designed, Planned, In progress, Gated, Policy defined, Benchmark pending, Coming soon, Error, Delayed, No data. |
| `HealthPill` | connected, syncing, delayed, failed auth, rate-limited, no data, disabled/gated. |
| `TrendBadge` | up/down/flat, positive/negative/neutral, compact and table-cell usage. |
| `PulseMarker` | telemetry heartbeat only, reduced-motion state, forbidden drag-handle example documented as anti-pattern. |

### 4.3 Surfaces

| Component | Required stories |
|---|---|
| `Card` | variants, density, tone, header/footer/actions, interactive, selected, error, hover/focus states. |
| `Panel` | default, nested sections, scrollable content, mobile stacked layout. |
| `MetricCard` | loading, empty, error, stale, positive/negative delta, compact, long label/value. |
| `WidgetShell` | loading, empty, error, stale, selected, editMode, with actions, with footer, mobile stacked. |
| `WidgetCatalogCard` | available, installed, gated, coming soon, requiresPro, selected, compact, long text, preview. |
| `DataTable<Row>` | loading, empty, error, status row, summary footer, bulk actions, sticky header if used, mobile cards/stacked mode, horizontal internal scroll. |
| `EmptyState` | dashboard empty, connector empty, no search results, permission-gated empty state. |
| `Skeleton` | card skeleton, table skeleton, widget skeleton, reduced-motion check. |
| `FilterBar` | compact filters, overflowing filters, reset action, mobile collapsed layout. |

### 4.4 Board and dashboard editing

| Component | Required stories |
|---|---|
| `BoardCanvas` | populated layout, empty layout, narrow viewport, internal overflow rules. |
| `BoardToolbar` | view mode, edit mode, unsaved changes, save success, save error, mobile action collapse. |
| `BoardDropZone` | inactive, active insert, active replace, reorder, keyboard target, invalid drop. |
| `GripHandle` / `ResizeHandle` | visible focus, disabled, keyboard label, touch target check. |
| `MoveMenu` | move up/down/left/right, cancel, disabled boundary states. |

### 4.5 Overlays

| Component | Required stories |
|---|---|
| `Dialog` / `Drawer` | open/close, focus trap, focus restore, Escape, scrim close, close button, body scroll lock. |
| `BottomSheet` | mobile widget catalog, mobile filter panel, focus trap, focus restore, body scroll lock, long content scroll. |
| `TraceDrawer` | AI provenance drawer, keyboard close, long trace content. |
| `PluginReviewDrawer` | permissions, signing, version/update/revocation states, gated install. |

### 4.6 Wizards

| Component | Required stories |
|---|---|
| `WizardLayout` | first step, middle step, last step, error step, review step, mobile. |
| `StepRail` | current, completed, invalid, locked/gated steps. |
| `ReviewPanel` | connector review, dashboard review, plugin review. |
| `StickyWizardFooter` | back/next, disabled next, loading submit, mobile safe-area spacing. |

### 4.7 AI and plugins

| Component | Required stories |
|---|---|
| `AIWorkspaceLayout` | no context, selected metric, selected widget, selected dashboard, connector issue. |
| `EvidencePanel` | synthetic data, live data, BYO provider, missing data, stale data. |
| `AnswerCard` | streaming, partial answer, failed answer, uncertainty, suggested action. |
| `PluginCatalog` | live plugin, preview plugin, gated plugin, coming soon, installed, update available. |
| `PermissionBadge` | read-only, write, network, repo/project scope, dangerous permission. |
| `SigningBanner` | signed, unsigned, revoked, unknown publisher. |

---

## 5. Required scenario stories before app migration

| Scenario story | Required states / flows |
|---|---|
| `Scenarios/AppShell` | dashboard route, metrics route, connectors route, plugins route, AI Workspace route, mobile drawer, gated nav item. |
| `Scenarios/AppShellRoleContext` | no sidebar/title/top-tab mismatch, route links vs tabs distinction. |
| `Scenarios/DashboardOverview` | loading, empty, populated, stale data, widget error, permission-limited, mobile stack. |
| `Scenarios/DashboardEditor` | view mode, edit mode, drag state, keyboard move fallback, unsaved changes, save error, mobile widget catalog. |
| `Scenarios/MetricsExplorer` | initial, searching, no results, selected metric, no data, stale data, query error, save as widget. |
| `Scenarios/ConnectorWizard` | auth/token, permission review, dry run, partial errors, failed auth, rate limit, health handoff. |
| `Scenarios/DashboardWizard` | choose goal, choose role, widget bundle, review, create error, generated dashboard. |
| `Scenarios/AIWorkspace` | no context, metric context, dashboard context, evidence panel, failed answer, suggested action. |
| `Scenarios/Plugins` | catalog, gated marketplace, review drawer, permissions, signing, install blocked. |
| `Scenarios/Settings` | account/workspace/settings inventory, table/form/switch states if settings exist in product. |

---

## 6. Automated checks to add or run

### 6.1 Brandbook package checks

Run before the app consumes components:

```bash
npm run ui:check
npm run site:typecheck
npm run site:test
npm run build-storybook
npm run test:e2e
```

If any of these do not exist or are flaky, the stabilization phase must either fix them or document the replacement command.

### 6.2 Storybook smoke checks

Required smoke targets:

```text
Components/Button
Components/Input
Components/Select
Components/Tabs
Components/StatusBadge
Components/HealthPill
Components/Card
Components/MetricCard
Components/WidgetShell
Components/WidgetCatalogCard
Components/DataTable
Components/Dialog
Components/Drawer
Components/BottomSheet
Components/BoardToolbar
Components/BoardDropZone
Components/MoveMenu
Components/WizardLayout
Components/AIWorkspaceLayout
Components/PluginReviewDrawer
Scenarios/AppShell
Scenarios/DashboardOverview
Scenarios/DashboardEditor
Scenarios/MetricsExplorer
Scenarios/ConnectorWizard
Scenarios/DashboardWizard
Scenarios/AIWorkspace
Scenarios/Plugins
```

### 6.3 Visual regression checks

Required viewport matrix:

```text
320px
375px
390px
430px
768px
1024px
1280px
1440px
```

Record for each critical story:

- body-level horizontal overflow;
- clipped text/icons/actions;
- table/chart internal scroll behavior;
- topbar wrapping;
- overlay sizing and scroll behavior;
- stable hover/focus/selected states without layout shift;
- disabled/gated state visibility;
- dark background hierarchy and token usage;
- no decorative glow/pulse on idle surfaces.

### 6.4 Accessibility checks

Minimum checks:

- keyboard tab order for all interactive stories;
- focus-visible state on every control;
- Escape close for dialogs/drawers/sheets;
- focus trap and focus restore for dialogs/drawers/sheets;
- real tab semantics only for real tabbed interfaces;
- route navigation uses links, not pseudo-tabs;
- board editing works without drag;
- `MoveMenu` exposes accessible labels;
- `DataTable<Row>` preserves table semantics when shown as table;
- mobile card/stacked table alternative is announced sensibly.

### 6.5 Token and CSS drift checks

Run grep/lint-style checks before migration:

```bash
rg "#[0-9a-fA-F]{3,8}" packages/ui src stories
rg "rgba?\(" packages/ui src stories
rg "--(bg|glass|glass2|border|border2|cyan|purple|success|warning|error|text|muted|muted2)" packages/ui src stories
rg "PulseWave|pulse" packages/ui src stories
```

Expected result:

- raw colors are either absent or limited to token definitions;
- legacy product tokens do not appear inside component implementations;
- pulse usage is limited to brand/telemetry/status semantics;
- no pulse usage appears in drag handles, generic decoration, hover-only affordances, or idle cards.

### 6.6 App repo readiness checks

Before screen migration starts in `getmetraly/metraly/ui`, add or confirm:

```json
{
  "typecheck": "tsc --noEmit",
  "build": "app build command",
  "storybook": "app storybook command or preview harness",
  "build-storybook": "app storybook build command or equivalent",
  "test:a11y": "playwright or axe-based checks",
  "test:visual": "visual regression checks"
}
```

Exact command names can follow the app repo conventions, but equivalent capabilities must exist.

---

## 7. Manual QA checklist

Before migration begins, manually review:

| Area | Must pass |
|---|---|
| Brandbook component gallery | no obvious visual regressions in primitives/surfaces/status components. |
| Dashboard editor story | works at 320–1440px and has no body overflow. |
| Mobile widget catalog | searchable, scrollable, focus-safe bottom sheet/drawer. |
| DataTable story | long columns/values do not break shell layout. |
| Drawer/BottomSheet | focus trap, focus restore, body lock, Escape, scrim close. |
| Tabs/navigation | tabs are not used for route navigation. |
| Status badges | taxonomy labels are consistent and readable. |
| AI/Plugins gated states | planned/gated surfaces do not look fully launched. |
| Pulse usage | pulse appears only where semantically justified. |

---

## 8. Definition of ready for migration

The component set is ready to migrate into `getmetraly/metraly/ui` only when:

1. P0 component stories exist and pass visual review.
2. P0 scenario stories exist and pass responsive review.
3. Drawer/BottomSheet/Dialog focus behavior is production-safe.
4. `DataTable<Row>` is validated for mobile and dense data usage.
5. `WidgetShell` is validated across loading, empty, error, stale, selected, and edit states.
6. Board editing has a non-drag fallback.
7. Canonical status taxonomy is represented in `StatusBadge`/`HealthPill` stories.
8. AppShell stories prove route/nav/title context alignment.
9. Token/CSS drift checks are clean or documented with approved exceptions.
10. App repo has typecheck, visual, and accessibility check strategy ready.

If any P0 item fails, product migration should not begin. Fix the Brandbook component/story first, then consume it in the app.
