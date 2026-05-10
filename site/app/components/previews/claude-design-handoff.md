# Claude Design Visual Reference Handoff

Status: Preview-only reference.

`brandbook-metraly(2).zip` is a multi-file visual prototype used to validate the final Claude Design direction for Metraly preview hardening. It is not production implementation code.

## Artifact Summary

The zip contains standalone prototype files such as:

- `Metraly Brandbook.html`;
- `app.jsx`;
- `state-board.jsx`;
- `dashboard-editor.jsx`;
- `widgets.jsx`;
- `form-controls.jsx`;
- `design-canvas.jsx`;
- `docs.jsx`;
- `tokens.css`;
- `tweaks-panel.jsx`;
- image upload assets.

These files demonstrate component state coverage, an Engineering Intelligence dashboard editor layout, widget picker density, drop-zone treatment, resize affordances and implementation handoff notes.

## Selected Ideas To Adopt

- A real component state board that shows default, hover, focus-visible, selected, disabled, loading, empty, stale, delayed, disconnected, unread/new, dragging, drop-target and resizing states.
- Dashboard editor composition with sidebar, centered Metraly mark, active navigation, topbar, toolbar, widget picker, metric cards, chart widget, table widget, selected widget, dragging widget, drop zone, resize handles, empty state and disconnected widget.
- Engineering Intelligence examples: PR review latency, review queue, cycle time, lead time, deployment frequency, change failure rate, MTTR, CI failure rate, flaky builds, blocked work, flow efficiency, WIP and DORA overview.
- Tweak-control concepts only as future hardening notes when they fit the brandbook site. The production preview route should not adopt the floating browser-prototype host protocol.
- Implementation handoff notes that explicitly separate visual reference from reusable component contracts.

## What Must Not Be Copied

- React CDN loading.
- Babel-in-browser compilation.
- Global `window` component registration.
- Inline-style-heavy architecture.
- Browser-only prototype host protocols.
- Generic infrastructure-observability examples such as RPS, p99 latency as the main concept, api-gateway, auth-service, DB queries/sec, logs/traces as primary examples, CPU saturation and edge nodes.
- Pulse-wave drag handles.
- Pulse-wave markers in default drop zones.

## Migration Targets

- Component state board: implemented as a real preview route at `/components/previews` using `@metraly/ui`.
- Dashboard editor scenario: implemented as a static hardening preview in `/components/previews` and referenced from `/patterns/widget-editor`.
- Chart wrappers: implemented under `@metraly/ui/charts` and consumed from `/components/charts` and `/examples/engineering-dashboard`.
- DnD states: represented as static selected, dragging, drop-target and resize previews while preserving compatibility with `@dnd-kit/*` and `react-grid-layout`.
- Tweak controls: not adopted in this patch. Future work may translate the useful density/glow switches into brandbook settings if they are implemented as normal React components.

## Current State

The current brandbook implementation now includes:

- a dedicated `/components/previews` route for the Claude Design-derived state board and dashboard editor preview;
- preview hardening updates for dashboard primitives, drop zones, resize handles, toolbar state, tables and widget shells;
- `@metraly/ui/charts` wrappers for Recharts-based line, area, bar, composed and sparkline patterns;
- Storybook coverage for chart wrappers, preview hardening scenarios and updated dashboard widget states;
- supporting docs that keep the Claude Design artifact labeled as visual reference only.

The implementation remains intentionally static in the preview surface where full drag-and-drop behavior would add risk. The selected, dragging, drop-target and resize states are shown as hardening previews instead of being promoted as reusable production contracts.

At the last recorded verification point in `docs/fix-plan-progress.md`, typechecking, unit tests and production build passed. Storybook build coverage should remain part of every follow-up component hardening PR.

## Next Steps

1. Keep the Claude Design artifact as a reference only and continue work through the component promotion lifecycle.
2. Use `docs/migration/component-status.md` to track component maturity.
3. Use `docs/migration/visual-checkpoints.md` to record visual review routes and viewport checks.
4. Promote low-risk primitives first: `StateBadge`, `MetralyCard`, `MetralyPanel`, `MetralyMetricCard` and `MetralyTable` as display-only primitive.
5. Keep `Select`, `Tabs`, full dashboard editor composition, real DnD behavior and complex chart wrappers in Hardening or Preview-only until API, accessibility and downstream adoption are verified.
6. Pilot components in `website` and `metraly` only after they reach Release Candidate status.

## Readiness Labels

- Ready: production-ready enough for current brandbook usage.
- Visual-ready: visual direction is accepted, implementation still needs hardening.
- Hardening: needs API, accessibility, state or test work.
- Preview-only: scenario/reference only, not a reusable component contract.

Do not mark Select, Tabs, Table wrappers, DashboardToolbar, DashboardDropZone, DashboardResizeHandle, the full dashboard editor composition, native/prototype DnD flows or chart wrappers as fully Ready unless tests, accessibility coverage and API stability support promotion.
