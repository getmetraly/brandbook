# Metraly UI/UX Scenario Audit

**Status:** Draft scenario source for future `@metraly/ui` migration into `getmetraly/metraly/ui`.  
**Last updated:** 2026-05-15  
**Related documents:**
- `docs/metraly-ui-to-brandbook-component-plan.md`
- `docs/metraly-ui-to-brandbook-component-map.md`

---

## 1. Purpose

This document captures the product-level UI/UX scenarios that must be clarified before and during the migration from brandbook `packages/ui` into `getmetraly/metraly/ui`.

The goal is not to add public components for every screen. The goal is to define enough product behavior that the migration can use `@metraly/ui` without losing important flows, mobile behavior, or state coverage.

---

## 2. Scenario design rules

1. Every screen must have loading, empty, populated, error, and mobile states.
2. Every destructive or irreversible action must have confirmation or clear undo/recovery.
3. Every screen with data must explain where the data comes from and what stale/no-data means.
4. Every cross-screen flow must define its handoff point.
5. Mobile must be designed as a first-class layout, not a compressed desktop.
6. Components from `@metraly/ui` should be composed; product logic stays in product.

---

## 3. Cross-screen scenario map

```text
Onboarding
  → Connector setup
  → Data validation
  → Dashboard wizard
  → Dashboard overview

Metrics Explorer
  → Select metric
  → Inspect trend/table
  → Save as widget
  → Dashboard editor
  → Dashboard overview

Marketplace
  → Discover integration
  → Connector setup
  → Connector health
  → Metrics Explorer / Dashboard data

AI Assistant
  → Context from dashboard / widget / metric / connector
  → Explanation / suggested action
  → User accepts action manually
```

---

## 4. Dashboard overview

### Primary user goal

Understand current engineering/product health at a glance and identify what needs attention.

### Required states

| State | UX requirement |
|---|---|
| Loading | Skeleton or calm loading state for cards/charts/tables. |
| Empty | Explain that no dashboard/widgets exist and offer Create dashboard / Add widget. |
| Populated | Show widgets with consistent density and clear status. |
| Stale data | Show `StateBadge` and last updated timestamp. |
| Widget error | Contain error inside widget, not full page crash. |
| Permission-limited | Show restricted state without broken layout. |

### Required actions

- Create dashboard.
- Edit dashboard.
- Add widget.
- Open widget details.
- Refresh data.
- Navigate to Metrics Explorer for deeper analysis.

### Brandbook components

- `MetralyShell`
- `MetralyTopbar`
- `MetralySidebar`
- `DashboardGrid`
- `DashboardWidget`
- `MetralyMetricCard`
- chart wrappers
- `MetralyTable`
- `StateBadge`
- `MetralyButton`

### Open UX decisions

- Is "Board" a separate concept or an older name for Dashboard?
- Should dashboard overview have a default global time range?
- Which widgets are allowed before connectors are configured?

---

## 5. Dashboard editor

### Primary user goal

Change the dashboard layout and widget configuration safely.

### Required states

| State | UX requirement |
|---|---|
| View mode | No drag handles unless edit mode is active. |
| Edit mode | Drag, resize, remove, configure, and save controls are visible. |
| Dragging | Drop targets are clear without neon/pulse overload. |
| Resizing | Resize handle and widget boundaries are visible. |
| Unsaved changes | Persistent indicator and Save/Discard actions. |
| Save success | Clear confirmation without disrupting layout. |
| Save error | Error is recoverable; user does not lose changes. |
| Empty editor | Widget library CTA and drop zone. |

### Mobile behavior

- Widget library should open as `MetralyBottomSheet` or `MetralyDrawer`.
- Widget cards should be searchable and grouped.
- Drag/drop may need fallback "Add" actions if touch drag is unreliable.
- Primary action stays visible; secondary actions collapse.

### Brandbook components

- `DashboardToolbar`
- `DashboardGrid`
- `DashboardWidget`
- `DashboardDropZone`
- `DashboardResizeHandle`
- `WidgetPickerCard`
- `MetralyBottomSheet`
- `MetralyDrawer`
- `StateBadge`
- `MetralyButton`
- `MetralyInput`

### Open UX decisions

- Should mobile support drag/reorder or use explicit move controls?
- Should widget configuration open in drawer or inline panel?
- What is the exact unsaved-changes copy?

---

## 6. Metrics Explorer

### Primary user goal

Find a metric, understand its trend, and turn it into a useful dashboard widget.

### Required states

| State | UX requirement |
|---|---|
| Initial | Show useful metric groups and search. |
| Searching | Keep tree/search responsive; show no-results state. |
| Selected metric | Chart/table/details update clearly. |
| Loading data | Chart/table loading does not collapse layout. |
| No data | Explain source and next step. |
| Stale data | Show last successful update. |
| Query error | Offer retry and details. |
| Save as widget | Confirm destination dashboard and widget type. |

### Core flow

```text
Search/select metric
→ Inspect chart/table
→ Adjust time range
→ Apply filter/compare
→ Save as widget
→ Add to dashboard
```

### Brandbook components

- `MetralyNavigationTree`
- `MetralyInput`
- `MetralySegmentedControl`
- `MetralySelect`
- `MetralyMetricCard`
- chart wrappers
- `MetralyTable`
- `StateBadge`
- `MetralyButton`

### Open UX decisions

- Which metric groups are canonical?
- Is compare mode required in first migration?
- What widget types can be created from a metric?
- Does saving create a new widget immediately or open Dashboard Wizard?

---

## 7. Marketplace and connectors

### Product distinction

Marketplace is the catalogue. Connectors are active configured integrations and their health.

### Marketplace states

| State | UX requirement |
|---|---|
| Loading | Card skeletons. |
| Available | Show integration purpose and setup CTA. |
| Installed | Show status and manage CTA. |
| Setup required | Continue setup CTA. |
| Coming soon | Disabled but visible if strategically useful. |
| Error | Retry or view details. |

### Connector health states

| State | UX requirement |
|---|---|
| Connected | Healthy status, last sync, data volume. |
| Syncing | Progress or current step. |
| Delayed | Warning with next retry time. |
| Failed auth | Reconnect CTA. |
| Rate-limited | Explanation and retry window. |
| No data yet | Explain expected delay or setup gap. |

### Brandbook components

- `MetralyCard`
- `MetralyButton`
- `MetralyBadge`
- `StateBadge`
- `MetralyIcon`
- `MetralyCodeBlock`
- `MetralyTable`
- `MetralyDrawer`
- `MetralyBottomSheet`

### Open UX decisions

- Should connector setup be a drawer, page, or wizard?
- Which provider types are first-class?
- How much diagnostic detail is exposed to non-admin users?

---

## 8. Onboarding

### Primary user goal

Reach the first meaningful dashboard as quickly as possible.

### Recommended activation flow

```text
Choose data source
→ Connect source
→ Validate incoming data
→ Pick dashboard template
→ Review dashboard
→ Create first dashboard
```

### Required states

| State | UX requirement |
|---|---|
| First run | Explain value and next step. |
| Source selected | Show setup instructions. |
| Connecting | Show progress and safe waiting state. |
| Validation failed | Explain what failed and how to retry. |
| No data yet | Explain expected delay. |
| Skipped | Let user resume onboarding later. |
| Complete | Route to dashboard overview. |

### Brandbook components

- `MetralyCard`
- `MetralyPanel`
- `MetralyButton`
- `MetralySelect`
- `MetralyInput`
- `MetralyCodeBlock`
- `StateBadge`
- `MetralyTelemetryLine`

### Open UX decisions

- Can users skip connector setup?
- Which dashboard template is default?
- Where does onboarding resume if interrupted?

---

## 9. Dashboard wizard

### Primary user goal

Create a useful dashboard without manually building every widget.

### Required steps

1. Select purpose/template.
2. Select data source or metric group.
3. Choose widgets.
4. Review layout.
5. Create dashboard.

### Required states

| State | UX requirement |
|---|---|
| Template selection | Clear difference between templates. |
| Missing source | Route user to connector setup. |
| Widget selection | Show selected count and preview. |
| Review | Show dashboard name, widgets, source, time range. |
| Create error | Keep state and allow retry. |
| Success | Route to dashboard editor or overview. |

### Component stance

Keep wizard stepper and state machine recipe/product-owned. Do not add public `WizardStepIndicator` yet.

---

## 10. AI Assistant

### Primary user goal

Get contextual help interpreting metrics, incidents, and dashboard changes.

### Required context modes

| Context mode | UX requirement |
|---|---|
| No context | Show safe suggestions and ask user to select data. |
| Selected metric | Show metric name, time range, and source. |
| Selected widget | Show widget context and dashboard name. |
| Selected dashboard | Assistant can summarize board-level changes. |
| Connector issue | Assistant can explain setup/sync problem. |
| Onboarding | Assistant can explain next step. |

### Required states

| State | UX requirement |
|---|---|
| Empty | Suggested prompts. |
| Thinking/streaming | Non-jarring loading state. |
| Partial answer | User can continue or retry. |
| Error | Retry and preserve prompt. |
| Suggested action | Action is explicit and user-confirmed. |
| Unsupported request | Safe explanation and alternative. |

### Brandbook components

- `MetralyPanel`
- `MetralyCard`
- `MetralyInput`
- `MetralyButton`
- `MetralyBadge`
- `StateBadge`
- `MetralyCodeBlock`
- `MetralyTelemetryLine`

### Product-owned

- Chat bubbles.
- Streaming implementation.
- Tool/action execution.
- Prompt suggestions.
- Context binding.

---

## 11. Settings and account/workspace flows

### Current status

Settings were not deeply defined in the component map. Before migration, inventory whether `getmetraly/metraly/ui` has:

- workspace settings;
- account/profile settings;
- API keys;
- team/members;
- billing/plan;
- notification preferences;
- connector settings.

### Likely brandbook coverage

- `MetralyTabs`
- `MetralyCard`
- `MetralyPanel`
- `MetralyInput`
- `MetralySwitch`
- `MetralySelect`
- `MetralyTable`
- `MetralyButton`
- `StateBadge`

### Open UX decisions

- Which settings are MVP?
- Which settings require admin permissions?
- Which settings belong under Connectors instead of global Settings?

---

## 12. Mobile scenario checklist

For every scenario, verify:

- primary action remains reachable;
- secondary actions do not overflow topbar;
- tables and charts scroll internally;
- drawer/sheet traps focus;
- bottom sheet has clear title and close action;
- no hidden hover-only affordances;
- touch target sizes are usable;
- no body-level horizontal overflow;
- state badges remain readable.

Required widths:

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

---

## 13. Migration backlog from this audit

| Priority | Item | Target |
|---:|---|---|
| P0 | Harden drawer/sheet focus trap, focus restore, body lock | `packages/ui` |
| P0 | Resolve Dashboard vs Board naming | docs/product IA |
| P0 | Define mobile widget library behavior | Dashboard Editor scenario |
| P1 | Add Metrics Explorer save-as-widget recipe | Storybook/docs |
| P1 | Add Marketplace installed/error/loading states | Storybook/docs |
| P1 | Add Connector health scenario | docs + recipe |
| P1 | Add Onboarding activation path | docs + recipe |
| P2 | Add AI Assistant contextual modes | docs + optional recipe |
| P2 | Inventory Settings flows | future audit |
| P2 | Revisit Gauge/Heatmap after product migration evidence | `packages/ui` only if needed |
