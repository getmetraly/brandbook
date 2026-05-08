# Phase 3 Surface Backlog

## Purpose

Turn the cards, tables, badges, empty states and widget-shell migration phase into concrete backlog items. This phase covers the surfaces that carry the majority of engineering data and state semantics across the product.

## Phase Goal

Unify the high-density data surfaces so the same card, table, badge and empty-state language can be reused in brandbook, the website and the product app without layout drift.

## Scope

### In Scope

- Card, metric card and panel surfaces.
- Table rendering and row-state behavior.
- State badges and telemetry freshness labels.
- Dashboard empty states and widget shell chrome.
- State semantics for loading, empty, no-data, delayed and disconnected conditions.

### Out of Scope

- No dashboard grid/editor refactor beyond the shell surfaces they consume.
- No chart wrapper implementation work.
- No marketing site redesign.
- No direct changes to `../app` or `../website`.

## Backlog Items

### 3.1 Stabilize Card Language

- Confirm the canonical card variants in `@metraly/ui`.
- Decide how `selected`, `error`, `loading` and `empty` states should be expressed on cards.
- Verify card body, footer and skeleton behavior remain predictable in dense dashboard layouts.
- Document when a page should use a card versus a panel or widget shell.

### 3.2 Stabilize Metric And Panel Surfaces

- Confirm how `MetralyMetricCard` and `MetralyPanel` should be used in relation to cards.
- Verify metric emphasis, icon alignment and footer behavior.
- Preserve the dark technical surface and avoid generic marketing card styling.
- Ensure the metric card still reads clearly at small widths.

### 3.3 Harden Table Rendering

- Confirm the display-first table contract for `MetralyTable`.
- Verify loading, empty and selected-row behavior.
- Make row key behavior explicit and stable.
- Document when richer sorting/filtering/pagination wrappers should sit above the base table instead of inside it.

### 3.4 Formalize State Badge Semantics

- Confirm the canonical state set for `StateBadge`.
- Document when to use `live`, `stale`, `delayed`, `disconnected` and `noData`.
- Verify accessibility labels and semantic status behavior.
- Keep the pulse marker contained and non-decorative.

### 3.5 Harden Dashboard Empty State

- Confirm the canonical empty dashboard surface and its default copy.
- Verify action placement, alignment and copy density.
- Preserve the subtle pulse marker while keeping the surface calm and legible.
- Document how empty dashboard state differs from generic card empty state.

### 3.6 Harden Widget Shell Chrome

- Confirm the `WidgetShell` API and its selected, dragging, resizable and full-width states.
- Verify title, subtitle, badge and drag handle alignment.
- Ensure the drag handle remains neutral and does not inherit pulse decoration.
- Document how widget shell chrome differs from the content inside the widget.

### 3.7 Normalize Data Density And Row State

- Make selected row semantics explicit for tables and dashboard list surfaces.
- Capture how loading skeletons and empty states should behave in dense layouts.
- Document any row-state patterns that should be promoted to a reusable wrapper later.

### 3.8 Align Docs And Example Pages

- Keep `/components/data-display`, `/components/dashboard`, `/patterns/empty-states` and `/patterns/dashboard-layout` synchronized with the canonical surfaces.
- Ensure docs pages use the same state vocabulary as the package exports.
- Remove duplicated one-off styling from page examples once the shared surfaces are stable.

## Required Tests

- card render and state tests.
- table render and row-state tests.
- state badge semantics and accessible label tests.
- empty-state action and copy tests.
- widget-shell selection, dragging and resize-state tests.
- typecheck and build verification for `site` and `packages/ui`.

## Deliverables

- Stable card, table, badge and empty-state behavior.
- Explicit widget-shell chrome contract.
- Clear state semantics for telemetry surfaces.
- Documentation updates for the relevant grouped pages.

## Acceptance Criteria

- Card and table surfaces can be reused in both app and website without layout drift.
- State semantics are clear and stable.
- Dashboard empty states and widget shells have explicit, accessible behavior.
- The pulse marker remains semantic rather than decorative.

## Risks

- Too many card variants can reintroduce duplication.
- Table interactions can grow beyond the display-first primitive if not constrained.
- If state badges become purely visual, accessibility and meaning will degrade.
- Empty-state copy can diverge across pages if the canonical wording is not documented.

