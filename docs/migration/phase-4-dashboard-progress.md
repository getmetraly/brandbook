# Phase 4 Dashboard Progress

Status: active phase 4 progress log.  
Branch: `phase-4-dashboard-hardening-claude`  
Latest known head: `6ceb88c`  

## Goal

Harden the dashboard and board migration surfaces so the product app can migrate to shared primitives without losing widget identity, layout persistence or editor behavior.

## Current phase scope

- Dashboard grid, widget shell and toolbar contract.
- Widget registry and widget picker behavior.
- Dashboard canvas editing, drag, resize and selection states.
- Persistence and reload behavior for dashboard data.
- Board edit-mode states and empty dashboard states.
- Playwright coverage for the editor lifecycle.

## Completed in this phase

### 4.1 Freeze the Dashboard Contract

The dashboard contract was documented in:

- `docs/migration/phase-4-dashboard-backlog.md`
- `brandbook/current-design-state.md`
- `docs/migration/component-status.md`
- `site/app/components/previews/README.md`

The canonical roles now read as:

- `DashboardGrid` is display-first and renders widgets against supplied layout data.
- `DashboardWidget` owns widget shell chrome, state badge, select/remove/drag affordances and content framing.
- `DashboardToolbar` owns dashboard-level controls such as tabs, search, sync state and editor actions.
- `DashboardEmptyState` owns first-run board messaging and call to action placement.
- `DashboardDropZone` owns DnD feedback only and stays pulse-free by default.
- `DashboardResizeHandle` owns resize affordance geometry and accessibility labeling.
- `WidgetRegistry` owns widget catalog definitions, default layouts and instance creation helpers.
- `dashboardRepository` and related app services own create, save, load, delete and snapshot behavior.

### 4.2 Stabilize Widget Registry And Picker

A registry and picker contract test was added:

- `site/__tests__/dashboard/DashboardWidgetPicker.test.tsx`

The test now covers:

- deterministic registry order;
- registry default layouts for `stat-card`, `metric-chart` and `data-table`;
- instance creation from registry defaults with explicit overrides;
- `DashboardWidgetPicker` selection, state badges, tags and disabled behavior.

The current canonical registry entries are:

- `stat-card` → `Stat Card`, live, `4x2` default layout;
- `metric-chart` → `Metric Chart`, live, `5x3` default layout;
- `data-table` → `Data Table`, delayed, `6x3` default layout.

### 4.3 Harden Dashboard Canvas Editing

The canvas adapter now exposes `isDashboardWidgetFullWidth` and forwards `fullWidth` from layout state into `DashboardWidget`.

- `site/app/components/dashboard/DashboardCanvas.tsx`
- `site/__tests__/dashboard/DashboardCanvas.test.tsx`

### 4.4 Preserve Dashboard Editor Lifecycle

A lifecycle test now covers create → add → reload and URL-backed load/reset flows without mocks.

- `site/__tests__/dashboard/DashboardEditor.test.tsx`

### 4.5 Harden Dashboard Widget Rendering

An app-level canvas test now verifies that registry entries map to the correct widget bodies and selected-state shell framing.

- `site/__tests__/dashboard/DashboardCanvasRendering.test.tsx`
 
### 4.6 Stabilize Persistence Layer

The persistence layer now has explicit regression coverage for localStorage key shape, destructive mutations and layout round-trips.

- `site/__tests__/dashboard/DashboardPersistence.test.ts`

The persistence contract now covers:

- `dashboardStorageKey` prefixing with `metraly-dashboard:`;
- index maintenance across create and delete;
- widget identity round-trips through save and fetch;
- layout updates preserving widget position state on reload.

### 4.7 Define Board Edit-Mode States

The static board-edit preview now anchors the selected, dragging, full-width, drop-target and resize state matrix in:

- `site/__tests__/preview/ClaudeDesignStateBoard.test.tsx`

The board-edit contract now covers:

- selected widget chrome;
- dragging widget chrome;
- active and rejected drop targets;
- full-width widget framing;
- horizontal, vertical and corner resize handles.
### 4.8 Align Dashboard Pages With Canonical Surfaces

The dashboard docs pages now point to the canonical dashboard contract in:

`site/app/components/dashboard/page.tsx`
`site/app/patterns/dashboard-layout/page.tsx`
`site/app/patterns/widget-editor/page.tsx`
`site/app/examples/engineering-dashboard/page.tsx`

The dashboard docs now describe canonical primitives first and remove preview-only migration language from the dashboard pages.

## Validation already run

- `npm --prefix site test -- --runTestsByPath __tests__/dashboard/DashboardCanvasRendering.test.tsx __tests__/dashboard/DashboardEditor.test.tsx __tests__/dashboard/DashboardWidgetPicker.test.tsx __tests__/dashboard/DashboardEditMode.test.tsx __tests__/dashboard/DashboardCanvas.test.tsx __tests__/dashboard/DashboardPersistence.test.ts __tests__/preview/ClaudeDesignStateBoard.test.tsx`
- `npm --prefix site run typecheck`

All targeted dashboard suites passed.

## Current state

The dashboard contract and registry/picker contract are now anchored in docs and tests.
Canvas, editor lifecycle, widget rendering and persistence coverage now exists for the current hardening step.
The board edit-mode state matrix is now anchored in static preview coverage.
The dashboard docs pages are now synchronized with canonical surfaces.
The `react-grid-layout` adapter contract is now anchored in a focused component test.
Playwright coverage now exercises add/remove and save/reload editor flows.

## Open work

- None.

## Files touched in this phase

- `docs/migration/phase-4-dashboard-backlog.md`
- `site/__tests__/dashboard/DashboardPersistence.test.ts`
- `docs/migration/phase-4-dashboard-progress.md`
- `brandbook/current-design-state.md`
- `docs/migration/component-status.md`
- `design-system/board-edit-mode.md`
- `site/app/components/previews/README.md`
- `site/app/components/dashboard/page.tsx`
- `site/app/components/dashboard/DashboardCanvas.tsx`
- `site/app/patterns/widget-editor/page.tsx`
- `site/__tests__/dashboard/DashboardCanvas.test.tsx`
- `site/__tests__/dashboard/DashboardCanvasRendering.test.tsx`
- `site/__tests__/dashboard/DashboardEditor.test.tsx`
- `site/__tests__/dashboard/DashboardWidgetPicker.test.tsx`
- `site/__tests__/dashboard/DashboardEditMode.test.tsx`
- `site/__tests__/preview/ClaudeDesignStateBoard.test.tsx`
- `site/__tests__/dashboard/DashboardCanvasRglContract.test.tsx`
- `e2e/dashboard-editor.spec.ts`