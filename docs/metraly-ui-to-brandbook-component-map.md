# Metraly UI → Brandbook Component Map

**Status:** Reworked from the source-of-truth UI/UX audit. Updated with the upstream CardShell foundation decision so surface components share one layout primitive before app-side rename migration.  
**Last updated:** 2026-05-15  
**Companion documents:**
- `docs/metraly-ui-to-brandbook-component-plan.md`
- `docs/metraly-ui-ux-scenario-audit.md`
- `docs/metraly-local-ui-layer-architecture.md`

---

## 1. Mapping rule

The migration target is not “use brandbook component names everywhere”.

The target is:

```text
brandbook upstream component/spec
→ local metraly/ui design-system component
→ feature-owned product adapter
→ screen flow
```

Brandbook names can be preserved through a temporary compatibility barrel, but local app code should converge on shorter, product-neutral names.

---

## 1.1 Upstream surface foundation decision

Brandbook now treats card-like surfaces as a layered system instead of parallel one-off shells:

```text
MetralyPanel = low-level surface primitive
CardShell / CardFrame = shared card layout foundation
MetralyCard = generic content card on CardShell
MetralyMetricCard = KPI/scalar metric card on CardShell
DashboardWidget / WidgetShell = editable widget chrome on CardShell
DashboardGrid / BoardCanvas = layout layer, not card content
```

Migration implication: the app-side local `Card`, `MetricCard`, and `WidgetShell` should preserve separate semantic APIs, but they should all compose the same `CardFrame` foundation to avoid duplicated header/footer/overflow/mobile fixes.

---

## 2. Required local UI layer

Target location:

```text
getmetraly/metraly/ui/src/design-system/
```

Subdomains:

| Folder | Purpose |
|---|---|
| `tokens/` | Semantic token bridge from brandbook into app. |
| `primitives/` | Button, IconButton, Tabs, Input, Select, Dialog, Tooltip. |
| `telemetry/` | StatusBadge, TrendBadge, PulseMarker, HealthPill. |
| `surfaces/` | CardFrame/CardShell, Card, Panel, MetricCard, WidgetShell, WidgetCatalogCard, DataTable, EmptyState, Skeleton, FilterBar. |
| `board/` | BoardCanvas, BoardDropZone, BoardToolbar, GripHandle, MoveMenu. |
| `wizard/` | WizardLayout, StepRail, ReviewPanel, StickyWizardFooter. |
| `ai/` | AIWorkspaceLayout, EvidencePanel, AnswerCard, TraceDrawer. |
| `plugins/` | PluginCatalog, PluginReviewDrawer, PermissionBadge, SigningBanner. |
| `compat/` | Temporary legacy/brandbook alias exports. |

---

## 3. Mandatory component rename map

| Brandbook/current name | Local canonical name | Category | API action | Compatibility |
|---|---|---|---|---|
| `MetralyButton` | `Button` | primitive | keep behavior, expose local import | compat optional |
| `MetralyInput` | `Input` | primitive | keep label/error/search/icon slots | compat optional |
| `MetralySelect` | `Select` | primitive | keep compact selector role | compat optional |
| `MetralyTabs` | `Tabs` | primitive/navigation | enforce real tab semantics | compat optional |
| `CardShell` / `CardFrame` | `CardFrame` | surface foundation | shared header/body/footer/overlay slots; not a product card | required |
| `MetralyCard` | `Card` | surface | compose `CardFrame`; add `variant`, `density`, `tone`, `header`, `footer`, `actions` | required |
| `MetralyPanel` | `Panel` | surface | preserve panel contract | required |
| `MetralyMetricCard` | `MetricCard` | surface/data | add explicit metric/status slots if missing | required |
| `DashboardWidget` | `WidgetShell` | dashboard/surface | split shell from renderer; add state slots | required |
| `DashboardGrid` | `BoardCanvas` / layout adapter | board | local board surface + product adapter | required |
| `DashboardDropZone` | `BoardDropZone` | board | add keyboard target, drop intent, pointer fallback | required |
| `DashboardToolbar` | `BoardToolbar` | board | add view/edit controls and action slots | required |
| `DashboardResizeHandle` | `GripHandle` / `ResizeHandle` | board | neutral handle, no pulse | required |
| `WidgetPickerCard` | `WidgetCatalogCard` | catalog/widget | add category, compatibility, preview, gated status | required |
| `MetralyTable` | `DataTable<Row>` | data/table | typed columns + status row + summary footer + mobile presentation | required |
| `MetralyBadge` | `Badge` / `StatusBadge` | label/status | split generic label from operational status | required |
| `StateBadge` | `StatusBadge` / `HealthPill` | operational status | consolidate taxonomy | required |
| `MetralyTelemetryLine` | `TelemetryLine` | telemetry | keep as local telemetry primitive | optional |
| `MetralyDrawer` | `Dialog` / `Drawer` | overlay | add focus trap, focus restore, body lock | required |
| `MetralyBottomSheet` | `BottomSheet` | overlay | add focus trap, focus restore, body lock | required |
| `AI Assistant` page | `AIWorkspace` | product surface | rename page-level surface | n/a |
| `Connect Sources` | `Connectors` | product surface | rename route/nav/copy | n/a |
| `Marketplace` | `Plugins` / `Plugin Marketplace` | product surface | rename top-level to Plugins; keep Marketplace gated | n/a |

---

## 4. API contract map

| Local component | Required contract |
|---|---|
| `CardFrame` | internal/shared surface foundation: header/body/footer/overlay slots, density/tone/state metadata, footer pinned in equal-height grids. |
| `Card` | compose `CardFrame`; `variant`, `density`, `tone`, `header`, `footer`, `actions`, stable hover/focus without layout jump. |
| `MetricCard` | metric label/value/delta/status, loading/empty/error, optional compact mode. |
| `WidgetShell` | title, description, status, actions, footer, loading, empty, error, selected, editMode. |
| `BoardToolbar` | `mode`, `status`, `viewControls`, `editControls`, `primaryActions`, `secondaryActions`. |
| `BoardDropZone` | `active`, `intent`, `keyboardTarget`, `pointerFallbackLabel`. |
| `GripHandle` | neutral grip/resize affordance, keyboard label, no pulse marker. |
| `MoveMenu` | accessible non-drag fallback for move/reorder operations. |
| `DataTable<Row>` | typed rows/columns, `getRowId`, `loadingState`, `emptyState`, `errorState`, `statusRow`, `summaryFooter`, `bulkActions`, `mobilePresentation`. |
| `WidgetCatalogCard` | title, category, compatibility, density, preview, requiresPro, status, add/select action. |
| `StatusBadge` | canonical status taxonomy only; no ad hoc status labels. |
| `TrendBadge` | trend direction/strength with tokenized semantics. |
| `PulseMarker` | telemetry/heartbeat only; never drag handle or decoration. |
| `HealthPill` | connector/widget health state. |
| `Tabs` | real `tablist/tab/tabpanel` semantics when used as tabs. |
| route navigation | link/nav semantics, not tabs. |
| `WizardLayout` | step rail, content, review panel, sticky footer. |
| `EvidencePanel` | source, metric, time range, synthetic/live/provider context. |
| `PluginReviewDrawer` | permissions, signing, publisher, version, revocation/update state. |

---

## 5. Product terminology map

| Current drift | Canonical target | Required action |
|---|---|---|
| `AI Soon`, `AI direction`, `AI Workspace`, `AI Assistant` | `AI Workspace` with assistant capability | Rename page/shell copy; gate incomplete capabilities. |
| `Plugin ecosystem`, `Plugins`, `Marketplace` | `Plugins`; `Plugin Marketplace` gated subset | Top-level nav should be `Plugins` until marketplace is truly live. |
| `Connect Sources`, `Connectors`, `Connector Wizard` | `Connectors` | Use one name across shell, wizard, docs, website. |
| `Dashboard`, `Board`, `Dashboard Editor`, `Dashboard Wizard` | Dashboard + edit mode + creation wizard | Decide whether Board is a distinct model; otherwise merge into Dashboard terminology. |
| role nav in sidebar + active top role tab | one clear scope model | Do not show conflicting role scopes. |
| `Preview`, `Designed`, `Planned`, `In progress`, `Next`, `Then`, `Later`, `Policy defined`, `Benchmark pending` | canonical status taxonomy | Replace vague planning labels with mapped statuses. |

---

## 6. Canonical status mapping

| Canonical status | Replaces / absorbs | Usage |
|---|---|---|
| `Live` | production-ready, active | Available and operational. |
| `Preview` | preview/demo | Visible but not final. |
| `Designed` | designed, design-ready | Design exists; not production-ready. |
| `Planned` | planned, next/then/later | Roadmap item; not operable. |
| `In progress` | in progress | Implementation active. |
| `Gated` | pilot-only, requires access, requires Pro | Access-controlled or trust-gated. |
| `Policy defined` | policy defined | Governance documented; UI may be non-operational. |
| `Benchmark pending` | benchmark pending | AI/claim not validated yet. |
| `Coming soon` | coming soon | Display alias only; must map internally to Planned or Designed. |
| `Error` | failed/error | Recoverable failure state. |
| `Delayed` | stale/delayed | Sync/data freshness warning. |
| `No data` | empty/no data yet | Source connected but no usable data. |

---

## 7. Surface migration map

### App shell

| Current surface | Target |
|---|---|
| App shell with conflicting role nav/title/tabs | `AppShell` + `Sidebar` + `HeaderBar` + `PageHeader` with one active scope model. |
| Sidebar route items | canonical routes: Dashboard, Metrics Explorer, Connectors, Plugins, AI Workspace, Settings. |
| Top role tabs | either real tabs for subviews or route links; no pseudo-tabs. |
| `Connect Sources` nav | `Connectors`. |
| `Marketplace` nav | `Plugins` or gated `Plugin Marketplace`. |
| `AI Assistant` nav | `AI Workspace`. |

### Dashboard overview

| Current / inferred | Target |
|---|---|
| KPI/metric cards | `MetricCard` composed from `CardFrame`; when placed on dashboards it sits inside `WidgetShell` or a widget renderer owned by the product. |
| dashboard widget wrappers | `WidgetShell` composed from `CardFrame` + renderer from `widgets/*`; widget-specific drag/resize chrome remains outside generic cards. |
| status chips | `StatusBadge` / `HealthPill`. |
| charts | local chart/widget renderer inside `WidgetShell`; keep brandbook chart language. |
| tables | `DataTable<Row>`. |
| empty dashboard | `EmptyState` with Dashboard Wizard CTA. |

### Dashboard editor / board edit mode

| Current / inferred | Target |
|---|---|
| dashboard editor canvas | `BoardCanvas`. |
| drop areas | `BoardDropZone`. |
| edit toolbar | `BoardToolbar`. |
| drag/resize affordance | `GripHandle` / `ResizeHandle`. |
| non-drag fallback | `MoveMenu`. |
| widget picker | `WidgetCatalogCard` + catalog rail/sheet. |
| mobile catalog | `BottomSheet` / `Drawer` with search/category/selection. |

### Metrics Explorer

| Current / inferred | Target |
|---|---|
| metric tree/search | `Tabs`/nav as appropriate, `Input`, metric taxonomy component if needed. |
| metric table | `DataTable<Row>` with status row and summary footer. |
| filters | `FilterBar`, `Select`, `StatusBadge`. |
| trend/result widgets | `WidgetShell` + chart renderer. |
| save as widget | product adapter creates widget and routes to Dashboard Editor. |

### Connectors

| Current / inferred | Target |
|---|---|
| Connect Sources / Connector Wizard | `Connectors` route + `WizardLayout`. |
| provider setup | source card + permission review. |
| dry run | `ReviewPanel` + `DataTable<Row>` for signals/errors. |
| health | `HealthPill`, `StatusBadge`, `DataTable<Row>`. |
| reconnect/retry | explicit actions with recoverable errors. |

### Dashboard Wizard

| Current / inferred | Target |
|---|---|
| `+ New Dashboard` | opens `Dashboard Wizard`. |
| template selection | `WizardLayout` + role/goal cards. |
| widget bundle | `WidgetCatalogCard` selection. |
| preview layout | `ReviewPanel`. |
| create | generated dashboard, then overview or editor. |

### AI Workspace

| Current / inferred | Target |
|---|---|
| AI Assistant / AI Workspace drift | single `AI Workspace` route. |
| chat-only interface | `AIWorkspaceLayout` + `EvidencePanel` + `AnswerCard` + `TraceDrawer`. |
| synthetic/live ambiguity | visible source/provider/status badge. |
| suggested action | explicit user-confirmed action. |

### Plugins

| Current / inferred | Target |
|---|---|
| Marketplace/Plugins drift | `Plugins` top-level; `Plugin Marketplace` gated subset. |
| plugin cards | `PluginCatalog`. |
| install flow | `PluginReviewDrawer` before commit. |
| permission/signing state | `PermissionBadge`, `SigningBanner`. |
| update/revocation state | visible in review drawer. |

---

## 8. Deprecated / removed patterns

| Pattern | Reason | Replacement |
|---|---|---|
| pulse marker as drag handle | violates brandbook/a11y intent | `GripHandle` / `MoveMenu`. |
| pseudo-tabs for route navigation | accessibility/mental model risk | links/nav items. |
| duplicate role navigation in sidebar and top tabs | context conflict | one scope model. |
| ad hoc status strings | trust/comprehension risk | canonical status taxonomy. |
| full-width widget picker card blocks | violates brandbook width contract | `WidgetCatalogCard` in constrained rail/sheet. |
| feature-level raw colors | design drift | semantic token bridge. |
| one-off wizard layouts | inconsistent setup UX | `WizardLayout`. |
| install-before-review plugin UX | trust risk | `PluginReviewDrawer`. |
| chat-only AI surface | trust/evidence gap | AI Workspace with evidence panel. |
| mixed `.jsx`/`.tsx` entrypoints | migration smell | one TypeScript runtime path. |

---

## 9. Compatibility map

Temporary compat exports are required:

```ts
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

- compat is for migration only;
- new feature code imports canonical names;
- cleanup phase removes compat usage.

---

## 10. Required app-level conformance targets

| Target | Required checks |
|---|---|
| AppShell | no conflicting context; predictable focus order; mobile nav. |
| Tabs/navigation | real tabs or real links; no hybrid. |
| Dashboard | all widgets use `WidgetShell`; loading/empty/error/stale states. |
| Dashboard Editor | non-drag fallback, visible edit mode, keyboard/focus checks. |
| DataTable | typed columns, status row, summary footer, internal scroll. |
| Widget Catalog | constrained width, search/category, gated state. |
| Connector Wizard | permission review, dry run, partial errors, health handoff. |
| Dashboard Wizard | goal + role + widgets + review + generated dashboard. |
| AI Workspace | evidence panel, source/provider/status context. |
| Plugins | review drawer, permissions, signing, revocation/update state. |


## 11. Foundation consolidation map — 2026-05-15

Brandbook now contains a reusable foundation layer for surfaces, controls, overlays, state placeholders, navigation rows, roving selection, and board handles.

| Existing/current component family | New shared foundation | Migration intent |
|---|---|---|
| `MetralyCard`, `MetralyMetricCard`, `DashboardWidget` | `CardShell` | Shared card/widget frame, semantic components remain separate. |
| `MetralyInput`, `MetralySelect`, `MetralyCheckbox`, `MetralyRadio`, `MetralySwitch`, filter chips | `FieldShell` | Shared label/helper/error/id/state layout while preserving native/ARIA semantics. |
| `MetralyDrawer`, `MetralyBottomSheet`, future plugin/AI drawers | `OverlayShell` | Shared dialog/scrim/focus/body-lock behavior; placements remain separate UX components. |
| `MetralyEmptyState`, `DashboardEmptyState`, widget empty/error states | `StateBlock` | Unified empty/error/gated/loading copy rhythm. |
| `MetralySidebarItem`, `MetralyNavigationTree` | `NavigationItemFrame` | Shared visual nav row only; keep link/tree roles separate. |
| `MetralyTabs`, `MetralySegmentedControl` | `useRovingSelection` | Shared roving keyboard/value management; keep tab/radio semantics separate. |
| `DashboardResizeHandle`, widget drag handle, `MoveMenu`, drop line | `HandlePrimitive` | Shared board affordance style/focus contract; no pulse-as-drag-handle. |

The downstream `getmetraly/metraly/ui` local layer should mirror these foundations in `design-system/primitives`, `design-system/surfaces`, `design-system/board`, and `design-system/telemetry` rather than copying one-off page-level layouts.

## 12. Wizard shell alignment update — 2026-05-15

`WizardLayout` now acts as the upstream proof for app-like wizard composition:

| Surface | Foundation | Rule |
|---|---|---|
| Dashboard Wizard | `WizardLayout` default top progress | Goal, role, widget bundle and review flows should use a horizontal stepper over a centered card. |
| Connector Wizard | `WizardLayout` default top progress | Align with demo app flow: progress first, focused setup card, footer actions below. |
| Rail documentation | `WizardLayout progressPlacement="side"` | Side rail is a documentation/dense variant, not the default product layout. |

Migration target: app-side `WizardLayout`, `StepRail`, `ReviewPanel` and `StickyWizardFooter` should preserve the same slot model while using local canonical names.

## 13. Dashboard Wizard vs Connector Wizard layout split — 2026-05-15

| Flow | Brandbook proof | Downstream app migration target |
|---|---|---|
| Connector Wizard / setup | `WizardLayout` default top progress | `WizardLayout` + source cards + review/command states. |
| Dashboard Wizard | `Scenarios/DashboardWizard` split builder recipe | `DashboardWizardShell` or feature-owned recipe: left template/widget/settings builder, right dashboard preview canvas. |
| Dense rail docs | `WizardLayout progressPlacement="side"` | Documentation-only or narrow component docs; not the default product experience. |

This keeps the common wizard primitive aligned with connector/setup flows while allowing the dashboard builder to match the current app UI where the preview canvas is visible throughout the flow.


### Wizard parity update

- `WizardLayout` maps to the connector setup flow from `getmetraly/metraly/ui`: top stepper, centered card, source tiles, preview connection, configure settings, and review state.
- `DashboardWizard` maps to the dashboard builder flow: AppShell-like sidebar/topbar plus left builder rail and right preview canvas.
- Dashboard builder should reuse the AppShell navigation rhythm rather than inventing a new sidebar size or typography.
