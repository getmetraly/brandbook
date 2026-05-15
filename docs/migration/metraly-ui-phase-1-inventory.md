# Metraly UI — Phase 1 Inventory

**Status:** Complete — Phase 1 first pass.
**Date:** 2026-05-15
**Scope:** `getmetraly/metraly/app/ui/src`
**Related:** `metraly-ui-naming-status-taxonomy.md`, `metraly-ui-stabilization-gap-report.md`

---

## 1. Repository layout

The product UI lives at:

```
getmetraly/metraly/app/ui/src/
```

Not at `getmetraly/metraly/ui/src` as the plan assumes. All references to `metraly/ui/src` in migration docs apply to this path.

---

## 2. Entrypoint inventory

### 2.1 Current entrypoint state

| File | Type | Role | Active? |
|---|---|---|---|
| `src/index.tsx` | TSX | Canonical bootstrap for the product app | Yes |
| `src/App.tsx` | TSX | Main product app — manual state router, full UI | Yes |

### 2.2 Entry point decision
The parallel board-only application was removed on 2026-05-15.

Current model:
- `App.tsx` is the only application entry component.
- `index.tsx` is the only bootstrap.
- `features/board/` was deleted as abandoned migration noise.

### 2.3 Required action

- Keep the app on a single bootstrap path.
- Do not reintroduce alternate application entrypoints without a documented migration reason.

---

## 3. Source directory inventory

### 3.1 `api/`

| File | Role | Migration stance |
|---|---|---|
| `api/client.ts` | HTTP client, session management, `login`, `loadSession` | Keep product-owned. |
| `api/endpoints/dora.js` | DORA metrics endpoint (JavaScript) | Flag: `.js` in a TS codebase. Should migrate to `.ts`. |
| `api/endpoints/dora.ts` | DORA metrics endpoint (TypeScript duplicate) | Investigate which is active. Likely entrypoint duplication at module level. |
| `api/mockApi.ts` | Mock data API | Keep product-owned. |
| `api/types/api.ts` | API response types | Keep. |
| `api/types/widgets.ts` | Widget-specific API types | Keep. |

**Finding:** `api/endpoints/dora.js` and `api/endpoints/dora.ts` are still a module-level duplication pattern and should be cleaned later.

### 3.2 `components/`

#### `components/charts/`

| File | Role | Migration stance |
|---|---|---|
| `AreaChart.tsx` | Area chart renderer | Move to `widgets/` or `lib/charts/`. Keep renderer-only. |
| `BarChart.tsx` | Bar chart renderer | Same. |
| `Gauge.tsx` | Gauge chart | Same. |
| `Heatmap.tsx` | Heatmap chart | Same. |
| `index.js` | Chart barrel (JavaScript) | Convert to `.ts`. |
| `Sparkline.tsx` | Sparkline renderer | Same. |

#### `components/dashboard/`

| File | Role | Migration stance |
|---|---|---|
| `DashboardRenderer.tsx` | Static dashboard render | Replace with `BoardCanvas` + `WidgetShell` stack. |
| `DraggableDashboardRenderer.tsx` | Drag-enabled dashboard | Replace. Drag logic moves to `board/` layer. |
| `widgetRegistry.tsx` | Widget type → renderer map | Move to `widgets/` as `WidgetRegistry`. |

#### `components/layout/`

| File | Role | Migration stance |
|---|---|---|
| `DraggableTweaksPanel.tsx` | Dev-only tweak panel mutating `--cyan` | Keep dev-only; gate behind dev build flag. |
| `Sidebar.tsx` | App sidebar navigation | Migrate to `app/shell/Sidebar.tsx`. Fix naming (see taxonomy doc). |
| `Topbar.tsx` | App topbar with hardcoded quick search | Migrate to `app/shell/HeaderBar.tsx`. Quick search is non-functional (cosmetic placeholder). |

#### `components/shared/`

| File | Role | Migration stance |
|---|---|---|
| `Icon.tsx` | Icon component with 50 SVG paths | Move to `design-system/primitives/` or keep as shared. |

#### `components/ui/`

| File | Role | Overlaps design-system | Migration stance |
|---|---|---|---|
| `AIInsightCard.tsx` | AI insight card | Yes — `AnswerCard` in plan | Replace with `design-system/ai/AnswerCard`. |
| `Badge.tsx` | Status badge with raw hex colors | Yes — `StatusBadge` | Replace. Raw colors must be removed. Non-canonical statuses. |
| `DataTable.tsx` | Untyped `columns: string[]` table | Yes — `DataTable<Row>` | Replace with typed contract. |
| `DORABadge.tsx` | Domain-specific badge | Partial — specialized `StatusBadge` | Evaluate: may fold into `StatusBadge` with DORA variant. |
| `index.js` | UI barrel (JavaScript) | — | Convert to `.ts`. |
| `InlineInsight.tsx` | Inline AI insight | Yes — `AnswerCard` partial | Evaluate fold into `AnswerCard`. |
| `Leaderboard.tsx` | Team leaderboard table | Partial — `DataTable<Row>` | Wrap with typed `DataTable`. |
| `PlaceholderScreen.tsx` | Catch-all placeholder | Yes — `EmptyState` | Replace with `EmptyState`. |
| `SH.tsx` | Unknown — needs inspection | Unknown | Inspect before touching. |
| `StatCard.tsx` | Metric card (no typed API) | Yes — `MetricCard` | Replace with typed `MetricCard` contract. |
| `Widget.tsx` | Thin card wrapper (no title/actions/states) | Yes — `WidgetShell` | Replace. Currently missing all required shell slots. |

### 3.3 `context/`

| File | Role | Migration stance |
|---|---|---|
| `TweaksContext.jsx` | Dev tweaks provider (JSX) | Convert to TSX. Gate behind dev build. |

### 3.4 `features/`

| Feature folder | Screen file | Current name | Canonical name | Migration stance |
|---|---|---|---|---|
| `ai-workspace/` | `AIScreen.tsx` | AI Workspace | AI Workspace | Folder rename complete. Screen rename to `AIWorkspaceScreen.tsx` is still optional follow-up if the repo standardizes screen naming. |
| `dashboard/` | `DashboardScreen.tsx` | Dashboard | Dashboard | Keep. Migrate to `WidgetShell` + `BoardCanvas`. |
| `dashboardEditor/` | `catalog.ts`, `model.ts`, `payload.ts`, `widgetConfig.ts` | Dashboard Editor | Dashboard Editor | Keep. Wire into `BoardToolbar`/`BoardCanvas` local components. |
| `dashboardWizard/` | `DashboardWizardScreen.tsx` | Dashboard Wizard | Dashboard Wizard | Keep name. Wire into `WizardLayout`. |
| `plugins/` | `PluginScreen.tsx` | Plugins | Plugins (top-level) | Folder rename complete. Screen rename to `PluginsScreen.tsx` remains a cleanup item, not a blocker. |
| `metricsExplorer/` | `MetricsScreen.tsx` | Metrics Explorer | Metrics Explorer | Keep. Wire into `DataTable<Row>`, `FilterBar`. |
| `onboarding/` | `WizardScreen.tsx`, `firstRun.js` | Connectors / Onboarding | Connectors (wizard step) | Label/title naming is fixed. Screen rename → `ConnectorWizardScreen.tsx` and `firstRun.js` → `firstRun.ts` remain follow-up cleanup. |

### 3.5 `hooks/`

| File | Role | Migration stance |
|---|---|---|
| `useDashboardOverview.ts` | Dashboard data hook | Keep product-owned. |
| `useDashboardOverview.test.ts` | Tests | Keep. |
| `useDashboard.ts` | Dashboard state hook | Keep product-owned. |
| `useLocalStorage.ts` | LocalStorage helper | Move to `lib/` if stays reusable. |
| `useMetricsData.ts` | Metrics data hook | Keep product-owned. |

### 3.6 `types/`

| File | Role | Migration stance |
|---|---|---|
| `ai.ts` | AI types | Keep product-owned. |
| `api.ts` | API types | Keep. May duplicate `api/types/api.ts` — investigate. |
| `common.ts` | Shared types | Keep. |
| `dashboard.ts` | Dashboard types | Keep. |
| `metrics.ts` | Metrics types | Keep. |
| `plugins.ts` | Plugin types | Keep. |
| `user.ts` | User types | Keep. |
| `widgets.ts` | Widget types | Keep. May duplicate `api/types/widgets.ts` — investigate. |
| `mocks/` | Mock data | Keep for dev/test only. |

### 3.7 `utils/`

| File | Role | Migration stance |
|---|---|---|
| `formatting.js` | Formatting utilities (JavaScript) | Convert to `formatting.ts`. Move to `lib/formatters/`. |
| `seeds.js` | Seed data (JavaScript) | Convert or keep as JS test data. |

### 3.8 `test/`

| File | Role | Migration stance |
|---|---|---|
| `setup.ts` | Vitest setup | Keep. |

---

## 4. Screen inventory

| Screen | Current route key | Current file | Canonical name | Canonical route |
|---|---|---|---|---|
| Dashboard overview | `overview`, `dashboard` | `features/dashboard/DashboardScreen.tsx` | Dashboard | `/` or `/dashboard` |
| CTO Dashboard | `dash-cto` | same DashboardScreen with param | Dashboard (CTO role) | `/dashboard?role=cto` or `/d/cto` |
| VP Engineering | `dash-vp` | same | Dashboard (VP role) | similar |
| Tech Lead | `dash-tl` | same | Dashboard (TL role) | similar |
| DevOps / SRE | `dash-devops` | same | Dashboard (DevOps role) | similar |
| My Dashboard | `dash-ic` | same | Dashboard (personal) | similar |
| New Dashboard | `dash-wizard` | `features/dashboardWizard/DashboardWizardScreen.tsx` | Dashboard Wizard | `/dashboard/new` |
| Metrics Explorer | `metrics` | `features/metricsExplorer/MetricsScreen.tsx` | Metrics Explorer | `/metrics` |
| AI Workspace | `ai` | `features/ai-workspace/AIScreen.tsx` | AI Workspace | `/ai` |
| Plugins | `plugins` | `features/plugins/PluginScreen.tsx` | Plugins | `/plugins` |
| Connectors | `wizard` | `features/onboarding/WizardScreen.tsx` | Connectors | `/connectors` |
| Settings | `settings` | `PlaceholderScreen` (not yet implemented) | Settings | `/settings` |

---

## 5. Component reuse / replacement candidates

| Current component | Replace with | Priority | Risk |
|---|---|---|---|
| `Widget.tsx` | `WidgetShell` | P0 | High — used across dashboard |
| `StatCard.tsx` | `MetricCard` | P0 | High — metric surfaces |
| `Badge.tsx` | `StatusBadge` | P0 | High — raw colors + non-canonical statuses |
| `DataTable.tsx` | `DataTable<Row>` | P0 | High — untyped columns/rows |
| `PlaceholderScreen.tsx` | `EmptyState` | P1 | Low |
| `AIInsightCard.tsx` | `AnswerCard` | P1 | Medium |
| `InlineInsight.tsx` | Fold into `AnswerCard` | P2 | Low |
| `DORABadge.tsx` | `StatusBadge` with domain variant | P2 | Medium |
| `DashboardRenderer.tsx` | `BoardCanvas` + `WidgetShell` | P1 | High |
| `DraggableDashboardRenderer.tsx` | `BoardCanvas` + DnD integration | P1 | High |
| `Sidebar.tsx` | `app/shell/Sidebar.tsx` | P1 | High — naming + a11y |
| `Topbar.tsx` | `app/shell/HeaderBar.tsx` | P1 | Medium |

---

## 6. Missing folders (per plan)

Most of the target directories from the migration plan do not exist yet. The app-side design-system skeleton was added on 2026-05-15.

```
src/app/routing/           — missing
src/app/providers/         — missing
src/app/shell/             — missing
src/design-system/         — present (Phase 2 skeleton only; no component wiring yet)
src/design-system/compat/  — present
src/design-system/tokens/  — present
src/lib/                   — missing
src/widgets/               — missing (widget renderers are in components/charts/)
src/test/visual/           — missing
src/test/interactions/     — missing
src/test/accessibility/    — missing
```

---

## 7. Risk summary

| Area | Risk | Severity |
|---|---|---|
| Manual state router | `App.tsx` uses `active` string state instead of React Router. No back/forward support, no deep links. | High |
| Raw colors in `Badge.tsx` and `App.tsx` | Hardcoded hex and `rgba()` throughout login and first-run UI. Design drift. | High |
| Non-canonical status strings | `Badge.tsx` uses "On track", "At risk", "Blocked" — none are in the canonical taxonomy. | High |
| `WidgetShell` gap | `Widget.tsx` has no title/status/actions/loading/empty/error slots. All widgets miss these states. | High |
| `DataTable` contract gap | Untyped `columns: string[]` + `rows: ReactNode[][]` — no typed generic, no status-row/footer. | High |
| JS files in TS codebase | `dora.js`, `index.js` (charts barrel), `index.js` (ui barrel), `firstRun.js`, `formatting.js`, `seeds.js`, `TweaksContext.jsx` | Medium |
| `types/api.ts` vs `api/types/api.ts` | Likely duplication — needs investigation. | Medium |
| `types/widgets.ts` vs `api/types/widgets.ts` | Same — likely duplication. | Medium |
| Quick search is cosmetic | Topbar shows "Quick search…" with ⌘K shortcut but no implementation. | Medium |
| Settings not implemented | Settings screen is `PlaceholderScreen` only. | Low |
