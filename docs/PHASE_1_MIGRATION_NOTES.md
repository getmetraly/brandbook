# Phase 1 — Migration notes

This pack lands as a clean diff against `getmetraly/brandbook`. The integration is mechanical; no destructive changes.

---

## File placement

Copy these files verbatim into the brandbook tree:

```
implementation-pack/packages/ui/src/charts/MetralyGauge.tsx       → packages/ui/src/charts/MetralyGauge.tsx
implementation-pack/packages/ui/src/charts/MetralyHeatmap.tsx     → packages/ui/src/charts/MetralyHeatmap.tsx
implementation-pack/packages/ui/src/charts/index.ts               → MERGE into packages/ui/src/charts/index.ts

implementation-pack/packages/ui/src/components/ActivityFeed.tsx        → packages/ui/src/components/ActivityFeed.tsx
implementation-pack/packages/ui/src/components/InsightCard.tsx         → packages/ui/src/components/InsightCard.tsx
implementation-pack/packages/ui/src/components/StateBoard.tsx          → packages/ui/src/components/StateBoard.tsx
implementation-pack/packages/ui/src/components/WidgetStateMatrix.tsx   → packages/ui/src/components/WidgetStateMatrix.tsx

implementation-pack/packages/ui/src/source/*.tsx                  → packages/ui/src/source/
implementation-pack/packages/ui/src/settings/*.tsx                → packages/ui/src/settings/
implementation-pack/packages/ui/src/dashboard/*.tsx               → packages/ui/src/dashboard/

implementation-pack/packages/ui/src/styles/*.css                  → packages/ui/src/styles/

implementation-pack/packages/ui/src/index.ts                      → MERGE into packages/ui/src/index.ts

implementation-pack/site/stories/**/*.stories.tsx                 → site/stories/<same-subpath>/
```

If the brandbook prefers everything under `components/`, move `source/*` and `settings/*` files there and update imports. The components themselves are folder-agnostic — only `import "../styles/…"` paths and the package index entries need adjusting.

---

## `packages/ui/src/index.ts` — merge plan

The current `packages/ui/src/index.ts` already exports many components. **Do not replace it.** Append the new exports listed in `implementation-pack/packages/ui/src/index.ts`. Cluster them with their siblings:

```ts
// charts/
export * from "./charts";   // already present — Phase 1 adds Gauge / Heatmap

// components/
export { ActivityFeed }     from "./components/ActivityFeed";
export type { ActivityFeedProps, ActivityItem, ActivityKind, ActivitySeverity, ActivityFeedState } from "./components/ActivityFeed";
export { InsightCard }      from "./components/InsightCard";
export type { … }           from "./components/InsightCard";
export { StateBoard }       from "./components/StateBoard";
export type { … }           from "./components/StateBoard";
export { WidgetStateMatrix, WIDGET_STATE_ORDER } from "./components/WidgetStateMatrix";
export type { WidgetStateStatus, WidgetStateMatrixProps } from "./components/WidgetStateMatrix";

// source/ — new folder
export { TokenInput }            from "./source/TokenInput";
export type { … }                from "./source/TokenInput";
// (… repeat for the rest of source/)

// settings/ — new folder
// (… all four)

// dashboard/
export { GaugeWidgetExample, HeatmapWidgetExample, ActivityWidgetExample, InsightWidgetExample, StateBoardWidgetExample } from "./dashboard/DashboardWidgetExamples";
export { MoveMenuA11yExample }   from "./dashboard/MoveMenuA11yExample";
export type { … }                from "./dashboard/MoveMenuA11yExample";
export { DashboardWizardSplitBuilder } from "./dashboard/DashboardWizardSplitBuilder";
export type { … }                from "./dashboard/DashboardWizardSplitBuilder";
```

---

## `packages/ui/src/charts/index.ts` — merge plan

Append:

```ts
export { MetralyGauge }      from "./MetralyGauge";
export type { MetralyGaugeProps, MetralyGaugeState, MetralyGaugeTone, MetralyGaugeVariant, MetralyGaugeThreshold } from "./MetralyGauge";

export { MetralyHeatmap }    from "./MetralyHeatmap";
export type { MetralyHeatmapProps, MetralyHeatmapState, MetralyHeatmapCell, MetralyHeatmapCellStatus } from "./MetralyHeatmap";
```

Do not remove existing chart exports.

---

## CSS bundling

Two options — pick one and apply consistently across the repo:

### Option A (current): each TSX imports its CSS at the top

Already wired in this pack. Works with any bundler. Style ordering is per-import; if you want guaranteed order, use Option B.

### Option B: roll all new styles into a single entry

Create `packages/ui/src/styles/index.css` (or amend if it exists) that imports each Phase 1 stylesheet:

```css
/* packages/ui/src/styles/index.css */
@import "./metraly-gauge.css";
@import "./metraly-heatmap.css";
@import "./metraly-activity-feed.css";
@import "./metraly-insight-card.css";
@import "./metraly-state-board.css";
@import "./metraly-state-matrix.css";
@import "./metraly-source.css";
@import "./metraly-settings.css";
@import "./metraly-dashboard-wizard.css";
```

If Option B is taken, remove the per-component `import "../styles/…"` lines from each TSX. Do not mix: either every component imports its own, or none does.

---

## Storybook placement

Copy `implementation-pack/site/stories/<subpath>/*.stories.tsx` into the brandbook's `site/stories/` tree at the matching subpath.

Story `title` strings used:

```
Charts/MetralyGauge
Charts/MetralyHeatmap
Components/ActivityFeed
Components/InsightCard
Components/StateBoard
Components/WidgetStateMatrix
Source/TokenInput
Source/PermissionExplainer
Source/BackfillRangePicker
Source/ConnectionTestPanel
Source/SyncProgressPanel
Settings/SettingsSection
Settings/AIProviderConnectorCard
Settings/BYOLLMConnectorPanel
Dashboard/DashboardWizardSplitBuilder
Dashboard/MoveMenuA11yExample
```

If the brandbook organises stories differently (e.g. `Foundations / Primitives / Surfaces / …`), rename the `title:` field in each story file. The component source files do not need to change.

---

## App migration notes for `getmetraly/metraly/ui`

These primitives are intended to be consumed downstream. Migration order (from `06-migration-roadmap.md`):

1. **Charts** — `MetralyGauge`, `MetralyHeatmap` land first. Update `widgetRegistry.tsx` to point `kpi-card` and new `heatmap` widget kinds at `GaugeWidgetExample` / `HeatmapWidgetExample`.
2. **ActivityFeed** — replace `RecentActivity` and similar inline lists. Compat alias in `design-system/compat/brandbook-legacy.ts → ActivityFeed`.
3. **InsightCard** — replace `AIInsightCard` and `InlineInsight` consumers that should not be AI Workspace surfaces.
4. **StateBoard** — replace `Leaderboard` if it was being misused for status; otherwise leave Leaderboard untouched.
5. **Source primitives** — connector wizard rewrite picks these up in Phase 2. No app changes in Phase 1.
6. **Settings** — new `features/settings/` folder hosts `BYOLLMConnectorPanel`. AI Workspace's existing provider settings move under this surface. Old in-app provider modal is deleted.
7. **Dashboard** — `MoveMenuA11yExample` is the reference; the real `DashboardEditor` wires `MoveMenu` next to existing `HandlePrimitive`. `DashboardWizardSplitBuilder` becomes the host of the new "Build a dashboard" route.

---

## Primitives vs widget wrappers

| Component | Primitive | Wrap in `DashboardWidget`? |
|---|---|---|
| `MetralyGauge` | ✅ first-class chart primitive | ✅ optional wrapper via `GaugeWidgetExample` |
| `MetralyHeatmap` | ✅ first-class chart primitive | ✅ optional wrapper via `HeatmapWidgetExample` |
| `ActivityFeed` | ✅ surface | ✅ optional wrapper via `ActivityWidgetExample` (mode="widget", frame=false) |
| `InsightCard` | ✅ surface | ✅ optional wrapper via `InsightWidgetExample` |
| `StateBoard` | ✅ surface | ✅ optional wrapper via `StateBoardWidgetExample` |
| `WidgetStateMatrix` | doc helper | ❌ not for dashboards |
| `TokenInput` | ✅ form primitive | ❌ |
| `PermissionExplainer` | ✅ surface | ❌ |
| `BackfillRangePicker` | ✅ form primitive | ❌ |
| `ConnectionTestPanel` | ✅ surface | wrappable but rarely useful |
| `SyncProgressPanel` | ✅ surface | wrappable; widget version is appropriate |
| `SettingsSection` | ✅ layout | ❌ |
| `SettingsAuditRow` | ✅ row | ❌ |
| `AIProviderConnectorCard` | ✅ surface | ❌ |
| `BYOLLMConnectorPanel` | ✅ panel | ❌ |
| `DashboardWizardSplitBuilder` | ✅ layout | ❌ |
| `MoveMenuA11yExample` | scenario | ❌ |

---

## Naming conflicts / things to watch

- `InsightCard` is intentionally not named `AIInsightCard`. The AI source mode is one of several; non-AI insights are first-class.
- `BYOLLMConnectorPanel` is the canonical home for BYO LLM. There must be NO duplicate provider settings surface elsewhere — kill any local copies during integration.
- `WidgetStateMatrix` is a docs helper. Do not ship in product bundles unless explicitly imported.
- `MoveMenuA11yExample` is a scenario, not the production editor. The real `DashboardEditor` wires the same primitives; the example is the reference contract.

---

## Plugin Marketplace rule (reminder)

`Plugins` remains the top-level surface in the product. `Plugin Marketplace` is hidden when the workspace is ineligible. No "Coming soon" disabled tab. AI-type plugins surface in `BYOLLMConnectorPanel.pluginContributedProviders`, not in a separate AI marketplace tab.

---

## Compatibility pass applied in this replacement archive

This archive has already been adjusted against the current `getmetraly/brandbook` `packages/ui` API. Do not re-apply the original Claude Design implementation-pack without these adapters.

### API adapters already applied

| Area | Original implementation-pack assumption | Current brandbook API | Applied fix |
|---|---|---|---|
| `StatusBadge` | Lowercase statuses such as `live`, `warning`, `error`, `neutral`; children used as label text. | Canonical product statuses such as `Live`, `Delayed`, `Error`, `No data`, `Preview`, `Gated`; text via `label`. | All `StatusBadge` calls use canonical statuses and `label`; operational states that feed widgets are mapped separately. |
| `StateBlock` | `tone`, `compact`, and object actions `{ label, onClick }`. | `variant`, `density`, and `action: ReactNode`. | All `StateBlock` calls now use `variant`, `density`, and JSX button actions. |
| `FieldShell` | `helper`, `errorText`, `required` on `FieldShell`. | `description`/`hint`, `error`; `required` belongs on native controls only. | `TokenInput` and `BackfillRangePicker` use `description`/`error`; `required` stays on the textarea. |
| `MetralyHeatmap` | Grid-specific roving API: `rowCount`, `colCount`, `getCellProps`, `gridProps`, `setActiveIndex`. | Existing one-dimensional `useRovingSelection({ items, defaultValue, mode, onValueChange })`. | Heatmap cells are flattened to stable index values and wired through `getItemProps`, `selectValue`, and local index activation. |
| `DashboardWidgetExamples` | `DashboardWidget` accepted the 12-state widget status and props like `onDrilldown`, `compact`. | `DashboardWidget` accepts `StateBadgeState`, `footer`, `fullWidth`, and existing shell props. | Added `mapWidgetStateToBadgeState`; drilldown is rendered as footer action; no unsupported widget props remain. |
| `MoveMenuA11yExample` | `MoveMenu` accepted `canMove*` and `onMove*`; `HandlePrimitive` accepted `ariaLabel`. | `MoveMenu` accepts `onMove`, `onCancel`, `disabledDirections`; `HandlePrimitive` accepts `kind`, `label`, `focusable`, `as`. | Example now uses the current primitive contracts and keeps neutral grip dots instead of a pulse glyph. |
| CSS imports | New TSX files import CSS side-effect modules. | Current `packages/ui` has no CSS module declaration. | Added `packages/ui/src/css.d.ts` with `declare module "*.css";`. |
| Storybook CSS | New styles were not imported by the existing Storybook preview contract. | `site/.storybook/preview.ts` must import every package CSS surface used by stories. | Added all Phase 1 CSS imports to `preview.ts`. |
| Story placement | Implementation-pack used `site/stories/**` relative imports. | Current Storybook config reads top-level `stories/**/*.stories.@(ts|tsx|mdx)`. | Phase 1 stories are placed under top-level `stories/**`, and relative imports were adjusted. |

### Validation executed after compatibility pass

```bash
npm --prefix packages/ui run typecheck
npm run ui:check
npm run site:typecheck
npm run site:test
```

Result: package typecheck, root UI check, site typecheck, and Jest tests pass. Jest emits the existing React outdated JSX transform warning from current components; it is not introduced by Phase 1 and does not fail tests.
