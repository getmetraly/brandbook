# Phase 4 Dashboard Continuation Prompt

Use this prompt to continue the Metraly Brandbook phase 4 dashboard hardening work from the current branch.

## Prompt

You are working in the `getmetraly/brandbook` repository.

Your role is a senior frontend engineer and migration agent for the Metraly dashboard surface.

Metraly is an engineering intelligence platform. The brandbook is the visual source of truth and hardening workspace for reusable UI components that may later be adopted by:

- `getmetraly/website`;
- `getmetraly/metraly`.

Do not treat the brandbook as a finished production component library. Treat it as a source of truth where dashboard candidates move through the lifecycle:

```text
Preview-only
→ Visual-ready
→ Hardening
→ Release Candidate
→ Adopted
→ Deprecated
```

## Current repository state

Phase 4 is in progress on:

```text
phase-4-dashboard-hardening-claude
```

Latest known head:

```text
6ceb88c
```

Already completed in this phase:

- 4.1 Freeze the Dashboard Contract;
- 4.2 Stabilize Widget Registry And Picker.

The current phase files are:

- `docs/migration/phase-4-dashboard-backlog.md`
- `docs/migration/phase-4-dashboard-progress.md`

## Required reading before coding

Read these files first:

```text
docs/migration/phase-4-dashboard-backlog.md
docs/migration/phase-4-dashboard-progress.md
docs/migration/component-status.md
brandbook/current-design-state.md
site/app/components/previews/README.md
AGENTS.md
```

Then inspect the dashboard implementation and tests:

```text
packages/ui/src/dashboard/WidgetRegistry.ts
packages/ui/src/dashboard/DashboardGrid.tsx
packages/ui/src/dashboard/DashboardWidget.tsx
packages/ui/src/dashboard/DashboardToolbar.tsx
packages/ui/src/dashboard/DashboardDropZone.tsx
packages/ui/src/dashboard/DashboardResizeHandle.tsx
packages/ui/src/dashboard/DashboardEmptyState.tsx
site/app/components/dashboard/DashboardWidgetPicker.tsx
site/app/components/dashboard/DashboardCanvas.tsx
site/app/components/dashboard/DashboardEditor.tsx
site/app/lib/dashboard/dashboard.repository.ts
site/app/lib/dashboard/dashboard.fake-api.ts
site/app/lib/dashboard/dashboard.persistence.ts
site/__tests__/dashboard/DashboardWidgetPicker.test.tsx
site/__tests__/dashboard/DashboardEditMode.test.tsx
site/__tests__/dashboard/DashboardCanvas.test.tsx
site/__tests__/dashboard/DashboardLifecycle.test.ts
```

## Current phase contract

The canonical dashboard roles are:

- `DashboardGrid` is display-first and renders widgets against supplied layout data;
- `DashboardWidget` owns widget shell chrome, state badge, select/remove/drag affordances and content framing;
- `DashboardToolbar` owns dashboard-level controls such as tabs, search, sync state and editor actions;
- `DashboardEmptyState` owns first-run board messaging and call to action placement;
- `DashboardDropZone` owns DnD feedback only and stays pulse-free by default;
- `DashboardResizeHandle` owns resize affordance geometry and accessibility labeling;
- `WidgetRegistry` owns widget catalog definitions, default layouts and instance creation helpers;
- `dashboardRepository` and related app services own create, save, load, delete and snapshot behavior.

The canonical registry entries are:

- `stat-card` → `Stat Card`, live, `4x2` default layout;
- `metric-chart` → `Metric Chart`, live, `5x3` default layout;
- `data-table` → `Data Table`, delayed, `6x3` default layout.

## Next task: 4.3 Harden Dashboard Canvas Editing

Focus on the editor canvas and not on unrelated dashboard polish.

Required outcomes:

- confirm the `react-grid-layout` adapter in the brandbook editor remains isolated;
- verify the runtime prop contract for draggable handle, resize handles, compact type and collision behavior;
- preserve selected, dragging, drop-target and full-width states;
- ensure layout updates convert mutable runtime layout data into stable dashboard layout snapshots;
- keep the dashboard editor behavior aligned with the shared dashboard primitive contract.

## Constraints

- Do not change `../app` directly as part of this brandbook phase.
- Do not widen scope into charts, website migration or unrelated shell refactors.
- Keep dashboard persistence, URL synchronization and mutation sequencing in the app layer.
- Keep docs in English.
- Keep `test-results/` ignored.

## Verification expectations

Before returning a patch:

- run the dashboard unit test set that covers registry, picker, edit-mode and canvas behavior;
- keep `brandbook/current-design-state.md` and `docs/migration/component-status.md` aligned if a visible contract changes;
- avoid introducing new preview-only geometry overrides unless they are required to preserve the canonical dashboard contract.

## Practical next step

Start with the canvas adapter and edit-state propagation:

1. Read the canvas implementation.
2. Confirm layout conversion and resize handle wiring.
3. Inspect any failing or missing tests.
4. Patch only the minimum surface required to stabilize the contract.

