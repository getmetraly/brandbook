# Phase 4 Dashboard Backlog

## Purpose

Turn the dashboard and board migration phase into concrete backlog items. This phase covers the highest-risk product surfaces in the ecosystem: dashboard creation, widget composition, drag and resize editing, persistence and reload behavior.

## Phase Goal

Make the dashboard and board component contract stable enough that the product app can migrate to shared primitives without losing widget identity, layout persistence or editor behavior.

## Scope

### In Scope

- Dashboard grid, widget shell and toolbar contract.
- Widget registry and widget picker behavior.
- Dashboard canvas editing, drag, resize and selection states.
- Persistence and reload behavior for dashboard data.
- Board edit-mode states and empty dashboard states.
- Playwright coverage for the editor lifecycle.

### Out of Scope

- No chart implementation work beyond what the dashboard widgets require.
- No marketing site migration.
- No unrelated shell refactors outside dashboard/board/widget surfaces.
- No direct changes to `../app`.

## Backlog Items

### 4.1 Freeze the Dashboard Contract

- Confirm the canonical dashboard primitives in `@metraly/ui`:
  - `DashboardGrid`
  - `DashboardWidget`
  - `DashboardToolbar`
  - `DashboardEmptyState`
  - `DashboardDropZone`
  - `DashboardResizeHandle`
  - `WidgetRegistry`
- Document the intended role of each primitive and which one owns presentation versus state.
- Define which properties are required for downstream migration and which remain internal.
- Treat `WidgetRegistry` as the canonical source for widget catalog metadata and default layout, not as a presentation surface.
- Treat dashboard persistence, URL synchronization and mutation sequencing as app-layer orchestration, not primitive responsibilities.

### Canonical contract snapshot

- `DashboardGrid` renders widgets against supplied layout data and remains display-first.
- `DashboardWidget` owns widget shell chrome, state badge, select/remove/drag affordances and content framing.
- `DashboardToolbar` owns dashboard-level controls such as tabs, search, sync state and editor actions.
- `DashboardEmptyState` owns first-run board messaging and call to action placement.
- `DashboardDropZone` owns DnD feedback only and should stay pulse-free by default.
- `DashboardResizeHandle` owns resize affordance geometry and accessibility labeling.
- `WidgetRegistry` owns widget catalog definitions, default layouts and instance creation helpers.
- `dashboardRepository` and related app services own create, save, load, delete and snapshot behavior.

### 4.2 Stabilize Widget Registry And Picker

- Confirm the canonical widget catalog entries and their default layouts:
  - `stat-card` to `Stat Card`, live, `4x2` default layout
  - `metric-chart` to `Metric Chart`, live, `5x3` default layout
  - `data-table` to `Data Table`, delayed, `6x3` default layout
- Verify widget picker selection, tags, state badges and disabled behavior in the editor picker surface.
- Document how widget definitions map to editor instances and how `DashboardWidgetPicker` forwards registry entries to `WidgetPickerCard`.
- Make sure registry lookup and widget instance creation remain deterministic for title, description, state, stateLabel, layout and settings overrides.

### 4.3 Harden Dashboard Canvas Editing

- Confirm the `react-grid-layout` adapter in the brandbook editor remains isolated.
- Verify the runtime prop contract for draggable handle, resize handles, compact type and collision behavior.
- Preserve selected, dragging, drop-target and full-width states.
- Ensure layout updates convert mutable runtime layout data into stable dashboard layout snapshots.

### 4.4 Preserve Dashboard Editor Lifecycle

- Validate dashboard creation from URL or local persistence.
- Preserve dashboard id in the URL during create, load, save and reset flows.
- Verify add-widget, remove-widget, select-widget, resize-widget and save-widget behaviors.
- Keep loading, saving and error states visible and understandable.

### 4.5 Harden Dashboard Widget Rendering

- Confirm the widget renderer maps registry types to the correct body surfaces.
- Preserve state badge semantics inside widget surfaces.
- Ensure table, metric and stat widget bodies stay readable inside narrow grid widths.
- Keep selected state and remove action behavior accessible.

### 4.6 Stabilize Persistence Layer

- Confirm dashboard persistence methods are isolated from presentation code.
- Verify create, fetch, save, delete, upsert-widget, remove-widget and update-layout operations.
- Document local persistence key shape and the expected reload behavior.
- Add regression tests for round-tripping widget identity and layout state.

### 4.7 Define Board Edit-Mode States

- Capture selected, dragging, resize, drop-target and empty-state variations.
- Document the visual treatment for grid shells, resize handles and widget chrome.
- Ensure board edit mode never loses keyboard focus or visual clarity when interaction states change.

### 4.8 Align Dashboard Pages With Canonical Surfaces

- Keep `/components/dashboard`, `/patterns/dashboard-layout`, `/patterns/widget-editor` and `/examples/engineering-dashboard` synchronized with the dashboard primitives.
- Ensure the docs pages point to the canonical dashboard contract rather than duplicating it.
- Remove any remaining preview-only language from dashboard docs once the shared contract is stable.

## Required Tests

- dashboard repository persistence tests.
- dashboard widget picker tests.
- dashboard canvas and widget renderer tests.
- dashboard editor lifecycle tests.
- board edit-mode tests.
- Playwright coverage for create, add, drag, resize, save and reload.
- typecheck and build verification for `site` and `packages/ui`.

## Deliverables

- Stable dashboard primitive contract.
- Stable widget registry and picker behavior.
- Stable editor lifecycle and persistence behavior.
- Explicit board-edit state documentation.
- Regression tests for the product flow that matters most.

## Acceptance Criteria

- A dashboard can be created, saved, restored and reloaded without losing layout or widget identity.
- Drag, resize and selection affordances remain visible, readable and accessible.
- Widget registry entries map to the expected preview and product behavior.
- Persistence logic remains separate from presentation logic.
- The dashboard editor is covered by automated tests at both component and Playwright levels.

## Risks

- `react-grid-layout` typing and runtime compatibility can break the editor flow.
- State persistence bugs can silently corrupt board layouts.
- Widget registry drift can make the picker and renderer disagree about the same widget type.
- Over-coupling presentation to persistence makes later migration harder.
