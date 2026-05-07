# Draft Page Metraly Product Coverage

Status: draft-page hardening note

## Scope

The `/draft` page was rebuilt as a production-like laboratory for Metraly UI components. The `/components` page remains the canonical visual baseline and must not be changed without explicit approval.

## What changed on `/draft`

- Added a larger telemetry pulse line used in the hero, section headers, empty states and drop zones.
- Normalized spacing across cards, grids, tables and overlay examples.
- Improved the widget picker so the icon, title, subtitle, checkbox and state badge align in a stable row.
- Added more chart examples from `/components`, including the Recharts line, bar, composed and area chart gallery.
- Added synthetic heatmap and sprint burndown previews for engineering analytics.
- Added more drag-and-drop examples: widget picker palette, selected widget, dragging widget, drop zone and full-width chart widget.
- Added product-flow examples based on `getmetraly/metraly`: board lifecycle, board screen states, dashboard renderer contract, widget registry coverage, metrics explorer, dashboard editor, onboarding checklist, notification channels, plugin marketplace and AI assistant.
- Kept dropdown / Metric source excluded from `/draft` until the affordance is redesigned.

## Metraly source references used for coverage

- Current UI route: `BoardScreen` is the active route surface in the current React app.
- Board flow: `BoardScreen` loads a board, shows loading/error/not-found states, refreshes data and renders `BoardRenderer`.
- Renderer contract: `BoardRenderer` iterates board layout and resolves widget instances through the widget registry.
- Widget registry: current types represented in the draft page include stat card, metric chart, data table, leaderboard, DORA overview, heatmap, sprint burndown, anomaly detector and AI insight.
- Repository contract: fake/real board repositories cover list, fetch, create, update and layout update operations.
- Product roadmap surfaces represented from README: metrics explorer, dashboard editor, onboarding checklist, notification channels, plugin marketplace and AI assistant.

## Review notes

The page is still a draft lab, not a production component package. The strongest candidates for promotion after API and accessibility hardening are:

1. `WidgetPickerCardDraft`
2. `TelemetryWidgetShellDraft`
3. `TelemetryGridItemDraft`
4. `TelemetryTableRowDraft`
5. `TelemetryStateBadgeDraft`
6. `TelemetryEmptyStateDraft`
7. `TelemetrySkeletonDraft`

The components that still need the most work before promotion are overlays, command palette, modal/drawer focus management, drag overlay semantics and chart accessibility wrappers.

---

## Current design status

This document should be interpreted together with `brandbook/current-design-state.md` and `AGENTS.md`. The current accepted direction is the phase-13 `/draft` design: dark engineering dashboard UI, cyan telemetry signal, restrained pulse-wave usage, stable interactions, protected `/components` baseline and `/draft` as the active hardening lab.
