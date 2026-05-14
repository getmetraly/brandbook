# Metraly Local UI Layer Architecture

**Status:** Required architecture document for migration from brandbook into `getmetraly/metraly/ui`.  
**Last updated:** 2026-05-15  
**Source:** `Metraly UI/UX migration audit from Brandbook into the local application UI layer`

---

## 1. Goal

Create a local UI layer inside `getmetraly/metraly/ui` that consumes brandbook as the upstream design authority while giving the product app stable local names, adapters, feature bindings, and migration safety.

This prevents two failure modes:

1. copying brandbook CSS/components ad hoc into product features;
2. forking the design system without a clear compatibility and cleanup path.

---

## 2. Target architecture

```text
ui/src/
  app/
    routing/
    providers/
    shell/
      AppShell.tsx
      Sidebar.tsx
      HeaderBar.tsx
      PageHeader.tsx

  design-system/
    tokens/
      semantic.css
      aliases.css
      status-tokens.css
    primitives/
      Button/
      IconButton/
      Tabs/
      Input/
      Select/
      Dialog/
      Tooltip/
    telemetry/
      StatusBadge/
      TrendBadge/
      PulseMarker/
      HealthPill/
    surfaces/
      Card/
      Panel/
      MetricCard/
      WidgetShell/
      WidgetCatalogCard/
      DataTable/
      EmptyState/
      Skeleton/
      FilterBar/
    board/
      BoardCanvas/
      BoardDropZone/
      BoardToolbar/
      GripHandle/
      MoveMenu/
    wizard/
      WizardLayout/
      StepRail/
      ReviewPanel/
      StickyWizardFooter/
    ai/
      AIWorkspaceLayout/
      EvidencePanel/
      AnswerCard/
      TraceDrawer/
    plugins/
      PluginCatalog/
      PluginReviewDrawer/
      PermissionBadge/
      SigningBanner/
    compat/
      brandbook-legacy.ts
    index.ts

  features/
    dashboards/
    dashboard-editor/
    metrics-explorer/
    connectors/
    plugins/
    ai-workspace/
    setup/
    notifications/

  widgets/
    metric-card/
    sparkline-widget/
    heatmap-widget/
    risk-list-widget/
    bar-chart-widget/

  lib/
    formatters/
    a11y/
    analytics/
    feature-gates/

  test/
    visual/
    interactions/
    accessibility/
```

---

## 3. Ownership model

| Layer | Owns | Must not own |
|---|---|---|
| `app/` | routing, providers, app shell assembly | reusable component internals |
| `design-system/` | reusable local UI contracts and adapters | product API calls, permissions, business flows |
| `features/` | screens, workflows, API/data state, permissions, copy | raw component styling or token definitions |
| `widgets/` | widget-specific rendering | widget chrome/state frame |
| `lib/a11y` | shared keyboard/focus utilities | feature-specific UI |
| `test/` | visual/interaction/a11y conformance | production code |

---

## 4. Token bridge

Required files:

```text
design-system/tokens/semantic.css
design-system/tokens/aliases.css
design-system/tokens/status-tokens.css
```

Rules:

- brandbook remains upstream for visual semantics;
- app feature code must not use raw colors;
- cyan is operational primary;
- purple is secondary accent;
- pulse-wave is brand/telemetry/status primitive only;
- hover/focus states cannot cause layout jumps;
- focus-visible state must be tokenized and visible.

---

## 5. Compatibility barrel

Required temporary file:

```ts
// design-system/compat/brandbook-legacy.ts
export { Card as MetralyCard } from "../surfaces/Card";
export { MetricCard as MetralyMetricCard } from "../surfaces/MetricCard";
export { WidgetShell as DashboardWidget } from "../surfaces/WidgetShell";
export { DataTable as MetralyTable } from "../surfaces/DataTable";
export { BoardDropZone as DashboardDropZone } from "../board/BoardDropZone";
export { BoardToolbar as DashboardToolbar } from "../board/BoardToolbar";
export { WidgetCatalogCard as WidgetPickerCard } from "../surfaces/WidgetCatalogCard";
export { StatusBadge as StateBadge } from "../telemetry/StatusBadge";
```

Rules:

- compat exists only for migration;
- no new feature code may import legacy names;
- final cleanup removes all compat imports.

---

## 6. Local public barrel

Required file:

```ts
// design-system/index.ts
export * from "./primitives/Button";
export * from "./primitives/IconButton";
export * from "./primitives/Tabs";
export * from "./primitives/Input";
export * from "./primitives/Select";
export * from "./primitives/Dialog";
export * from "./telemetry/StatusBadge";
export * from "./telemetry/TrendBadge";
export * from "./telemetry/PulseMarker";
export * from "./telemetry/HealthPill";
export * from "./surfaces/Card";
export * from "./surfaces/Panel";
export * from "./surfaces/MetricCard";
export * from "./surfaces/WidgetShell";
export * from "./surfaces/WidgetCatalogCard";
export * from "./surfaces/DataTable";
export * from "./surfaces/EmptyState";
export * from "./surfaces/Skeleton";
export * from "./surfaces/FilterBar";
export * from "./board/BoardCanvas";
export * from "./board/BoardDropZone";
export * from "./board/BoardToolbar";
export * from "./board/GripHandle";
export * from "./board/MoveMenu";
export * from "./wizard/WizardLayout";
export * from "./wizard/StepRail";
export * from "./wizard/ReviewPanel";
export * from "./wizard/StickyWizardFooter";
export * from "./ai/AIWorkspaceLayout";
export * from "./ai/EvidencePanel";
export * from "./ai/AnswerCard";
export * from "./ai/TraceDrawer";
export * from "./plugins/PluginCatalog";
export * from "./plugins/PluginReviewDrawer";
export * from "./plugins/PermissionBadge";
export * from "./plugins/SigningBanner";
```

---

## 7. Migration dependency order

```text
tokens
→ primitives
→ telemetry/status
→ surfaces
→ board
→ wizard
→ ai/plugins
→ app shell
→ feature screens
→ cleanup
```

Do not migrate feature screens before the local barrel and compat layer exist.

---

## 8. App-level tests and scripts to add

The app UI should gain conformance similar to brandbook.

Required script intent:

```json
{
  "typecheck": "tsc --noEmit",
  "storybook": "storybook dev",
  "build-storybook": "storybook build",
  "test:a11y": "playwright or axe-based interaction checks",
  "test:visual": "visual regression for app stories"
}
```

Exact command names can follow existing repo conventions, but the capability must exist.

---

## 9. Cleanup requirements

Final migration is not complete until:

- `App.jsx` vs `App.tsx` duplication is resolved;
- `index.jsx` vs `index.tsx` duplication is resolved;
- feature code imports canonical local names;
- compat imports are removed;
- status strings are canonical;
- raw colors are removed from feature code;
- Storybook/visual/a11y checks pass for migrated screens;
- README/package dependency drift is corrected.
