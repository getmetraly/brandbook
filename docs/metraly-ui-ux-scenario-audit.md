# Metraly UI/UX Scenario Audit

**Status:** Reworked to follow the source-of-truth report `Metraly UI/UX migration audit from Brandbook into the local application UI layer`.  
**Last updated:** 2026-05-15  
**Related documents:**
- `docs/metraly-ui-to-brandbook-component-plan.md`
- `docs/metraly-ui-to-brandbook-component-map.md`
- `docs/metraly-local-ui-layer-architecture.md`

---

## 1. Purpose

This document captures the product-level scenarios that must drive the local UI layer migration in `getmetraly/metraly/ui`.

Unlike the earlier cautious version, this document assumes that the audit findings are actionable requirements. If the audit recommends adding a local component, renaming a surface, changing API, or restructuring the app UI layer, that item must appear in the plan/map.

---

## 2. Product-level problems to solve

| Priority | Problem | Required scenario response |
|---:|---|---|
| P0 | Shell context mismatch: role title, sidebar active item, and top tabs can indicate different scopes. | AppShell scenario must enforce one active context model. |
| P0 | Duplicate role navigation without clear scope. | Decide whether role controls are route links, tabs, or segmented local filters. |
| P0 | AI naming drift. | Use `AI Workspace`; assistant is a capability inside workspace. |
| P0 | Plugins/Marketplace naming drift. | Use `Plugins`; marketplace is gated subset. |
| P0 | Connect Sources/Connectors drift. | Use `Connectors` everywhere. |
| P0 | Status taxonomy drift. | Use one canonical status set across app/site/docs. |
| P0 | No local adapter layer. | Scenarios must consume `src/design-system/*`, not ad hoc feature components. |
| P0 | DnD/edit-mode accessibility risk. | Dashboard editor must support non-drag move fallback. |
| P1 | Reflow/mobile risk for dense dashboards. | Each scenario has mobile acceptance criteria. |
| P1 | App repo lacks brandbook-level conformance. | Each scenario requires story/visual/a11y targets. |
| P1 | Mixed JS/TS entrypoints. | Migration cleanup must leave one TypeScript runtime path. |

---

## 3. Cross-screen flow map

```text
Onboarding
  → Connectors
  → Data validation
  → Dashboard Wizard
  → Dashboard overview

Metrics Explorer
  → Select metric
  → Inspect chart/table
  → Save as widget
  → Dashboard Editor
  → Dashboard overview

Plugins
  → Plugin review
  → Permissions/signing check
  → Install or gated state
  → Connector/AI/dashboard integration if supported

AI Workspace
  → Context from dashboard / widget / metric / connector
  → Evidence-backed answer
  → Trace/provenance review
  → Explicit user-confirmed action
```

---

## 4. Shared product patterns

| Pattern | Required local components | Applies to |
|---|---|---|
| App shell | `AppShell`, `Sidebar`, `HeaderBar`, `PageHeader`, `FilterBar` | all main screens |
| Wizard | `WizardLayout`, `StepRail`, `ReviewPanel`, `StickyWizardFooter` | onboarding, connectors, dashboard wizard |
| Widget surface | `WidgetShell`, `MetricCard`, `StatusBadge`, `HealthPill` | dashboards, explorer, AI summaries |
| Data surface | `DataTable<Row>`, `SummaryFooter`, `statusRow` | metrics, connectors, plugins, settings |
| Evidence workspace | `EvidencePanel`, `AnswerCard`, `TraceDrawer` | AI, connectors, plugins |
| Review before commit | `ReviewPanel`, `PluginReviewDrawer`, permission/status badges | plugins, connector scopes, destructive edits |
| Accessible board editing | `BoardToolbar`, `BoardDropZone`, `GripHandle`, `MoveMenu` | dashboard editor |

---

## 5. AppShell and role navigation

### Primary user goal

Understand current role/context immediately and navigate without conflicting scope signals.

### Required decisions

- Sidebar active item, page title, and top controls must reference the same scope.
- If role switching changes the current page/dashboard, use navigation links.
- If role switching changes a subview inside the same dashboard, use real `Tabs`.
- If role switching is only a local display filter, use segmented control, not page tabs.

### Required states

| State | Requirement |
|---|---|
| Default dashboard | active route + title + page context aligned. |
| Role switch | one selected role, one changed scope. |
| Gated nav item | status visible, not indistinguishable from live route. |
| Mobile nav | drawer-based nav with focus trap/body lock. |

### Acceptance

- No `CTO` sidebar + `CTO Dashboard` title + `VP Eng` active tab mismatch.
- AI/Plugins/Connectors labels use canonical names.
- Planned/designed surfaces are visibly gated.

---

## 6. Dashboard overview

### Primary user goal

See engineering health at a glance and move into investigation or editing.

### Required components

- `WidgetShell`
- `MetricCard`
- `Card`
- `DataTable<Row>`
- `StatusBadge`
- `HealthPill`
- chart/widget renderers under `widgets/*`
- `EmptyState`

### Required states

| State | Requirement |
|---|---|
| Loading | stable skeletons; no layout jump. |
| Empty | route to Dashboard Wizard or Add widget. |
| Populated | all widgets use `WidgetShell`. |
| Stale | `StatusBadge`/timestamp visible. |
| Widget error | contained inside widget. |
| Permission-limited | visible gated state. |
| Mobile | widgets stack; charts/tables scroll internally. |

### Open decisions

- Is `Board` still a separate product concept?
- Which dashboard is first-run default?
- Which widgets are allowed before connectors are configured?

---

## 7. Dashboard Editor / Board edit mode

### Primary user goal

Safely edit layout and widgets, including without drag-and-drop.

### Required components

- `BoardCanvas`
- `BoardToolbar`
- `BoardDropZone`
- `GripHandle`
- `MoveMenu`
- `WidgetShell`
- `WidgetCatalogCard`
- `BottomSheet` / `Drawer`

### Required states

| State | Requirement |
|---|---|
| View mode | no drag handles. |
| Edit mode | mode visible, controls active. |
| Dragging | clear drop intent. |
| Keyboard move | `MoveMenu` provides non-drag fallback. |
| Resizing | visible handle, keyboard label. |
| Unsaved changes | persistent status + save/discard. |
| Save error | preserve changes and allow retry. |
| Mobile | catalog opens as bottom sheet/drawer; no hover-only controls. |

### Acceptance

- Key edit operations work without dragging.
- Pulse marker is not used as handle.
- Edit/view mode is unmistakable.
- Widget picker follows constrained width/sheet behavior.

---

## 8. Metrics Explorer

### Primary user goal

Find a metric, understand the trend, and save it as a widget.

### Required components

- `Input`
- `Tabs` or route links according to semantics
- `FilterBar`
- `Select`
- `DataTable<Row>`
- `WidgetShell`
- `StatusBadge`
- chart renderers
- `Button`

### Flow

```text
Search/select metric
→ Inspect chart/table
→ Change time range
→ Filter/compare
→ Save as widget
→ Add to dashboard
```

### Required states

| State | Requirement |
|---|---|
| Initial | metric groups/search visible. |
| Searching | no-results state. |
| Selected metric | chart/table/details update. |
| No data | explain source/connector gap. |
| Stale data | last successful update. |
| Query error | retry and details. |
| Save as widget | confirm dashboard/widget type. |

---

## 9. Connector Wizard

### Primary user goal

Connect a data source with clear permissions, dry-run validation, and health handoff.

### Required components

- `WizardLayout`
- `StepRail`
- `ReviewPanel`
- `StickyWizardFooter`
- `DataTable<Row>`
- `StatusBadge`
- `HealthPill`
- `EvidencePanel`
- `CodeBlock` / setup instructions

### Happy path

```text
Choose connector type
→ Auth/token
→ Select scope
→ Review permissions
→ Dry run
→ Review signals/errors
→ Map repos/projects to teams
→ Sync cadence
→ Create connector
→ Connector health
```

### Required states

| State | Requirement |
|---|---|
| Over-broad scope | warning with safer option. |
| Partial dry run | imported/skipped/errors visible. |
| Failed auth | reconnect CTA. |
| Rate limited | retry window. |
| No data yet | expected delay and next check. |
| Mobile | review/details in drawer/sheet if needed. |

---

## 10. Dashboard Wizard

### Primary user goal

Generate a useful dashboard from goal, role, and widget bundle.

### Required components

- `WizardLayout`
- `StepRail`
- `ReviewPanel`
- `StickyWizardFooter`
- `WidgetCatalogCard`
- `MetricCard`
- `StatusBadge`

### Flow

```text
Choose goal
→ Choose role template
→ Review recommended widget bundle
→ Customize widgets
→ Preview layout
→ Generate dashboard
→ Open dashboard overview or editor
```

### Required states

| State | Requirement |
|---|---|
| No connectors | explain synthetic/limited mode or route to Connectors. |
| Gated widgets | disabled with explicit reason. |
| Conflicting role/goal | explain best-fit template, no silent override. |
| Create error | preserve wizard state and retry. |
| Success | route to generated dashboard. |

---

## 11. AI Workspace

### Primary user goal

Get evidence-backed explanations and suggested actions without black-box UI.

### Required naming

Use `AI Workspace` as route/surface name. `AI Assistant` is a capability inside the workspace.

### Required components

- `AIWorkspaceLayout`
- `EvidencePanel`
- `AnswerCard`
- `TraceDrawer`
- `StatusBadge`
- `CodeBlock`
- `Button`

### Required context modes

| Context | Requirement |
|---|---|
| No context | suggestions + ask user to select data. |
| Selected metric | metric, time range, source visible. |
| Selected widget | widget and dashboard visible. |
| Selected dashboard | board-level summary. |
| Connector issue | setup/sync context visible. |
| Synthetic/live/BYO | source/provider state visible. |

### Required states

- empty prompts;
- thinking/streaming;
- partial answer;
- failed answer;
- uncertainty;
- suggested action;
- unsupported request.

### Acceptance

- Every answer can show “Data used” / “Why this answer”.
- Suggested actions are user-confirmed.
- Benchmark/policy status is visible where relevant.

---

## 12. Plugins

### Primary user goal

Review plugin risk, permissions, signing, and publisher before install.

### Required naming

Use `Plugins` as top-level. Use `Plugin Marketplace` only as gated subset when marketplace requirements are met.

### Required components

- `PluginCatalog`
- `PluginReviewDrawer`
- `PermissionBadge`
- `SigningBanner`
- `StatusBadge`
- `DataTable<Row>`

### Required review fields

- publisher;
- signed/unsigned;
- requested permissions;
- network/data access;
- compatible runtime tier;
- version/update history;
- revocation status;
- install eligibility.

### Acceptance

- Install CTA becomes primary only after review.
- Gated/coming-soon plugins are not presented as live.
- Permissions are visible before commit.

---

## 13. Settings and account/workspace flows

### Required inventory

Before migration, inventory:

- workspace settings;
- account/profile settings;
- API keys;
- teams/members;
- billing/plan;
- notification preferences;
- connector settings.

### Likely components

- `Tabs`
- `Card`
- `Panel`
- `Input`
- `Select`
- `DataTable<Row>`
- `Button`
- `StatusBadge`
- `HealthPill`

---

## 14. Mobile checklist

Required for every scenario:

- primary action reachable;
- secondary actions do not overflow topbar;
- table/chart regions scroll internally;
- drawer/sheet traps focus and locks body scroll;
- no hover-only affordances;
- target sizes and spacing are usable;
- state badges readable;
- no body-level horizontal overflow.

Widths:

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

## 15. Migration backlog

| Priority | Item | Target |
|---:|---|---|
| P0 | Naming/status taxonomy freeze | app/docs/site |
| P0 | Local design-system structure | `metraly/ui/src/design-system` |
| P0 | Compatibility barrel | `design-system/compat` |
| P0 | AppShell context cleanup | `app/shell` |
| P0 | Component rename/API migration | `design-system/*` |
| P0 | Board edit accessibility fallback | `design-system/board` |
| P1 | DataTable migration | `design-system/surfaces/DataTable` |
| P1 | Unified wizard pattern | `design-system/wizard` |
| P1 | Connector Wizard health/review states | `features/connectors` |
| P1 | AI Workspace evidence UI | `design-system/ai` + feature |
| P1 | Plugin review/gating UI | `design-system/plugins` + feature |
| P1 | App-level Storybook/visual/a11y harness | `test/*` |
| P2 | Clean mixed JS/TS entrypoints | app root |
| P2 | Remove compat imports | final cleanup |
