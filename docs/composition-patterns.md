# Composition Patterns

These patterns codify how new brandbook surfaces should be assembled from the existing production primitives.

## 1. Shell first, content second

Use the structural component that already owns the visual rhythm before adding custom content.

- `MetralyCard` for general informational surfaces
- `MetralyPanel` for sectioned dense content
- `MetralyMetricCard` for KPI summaries
- `DashboardWidget` for board-mounted content
- `MetralyChartCard` for chart framing

Do not recreate border, radius, hover, or selected treatments in page-local CSS when an existing shell already owns them.

## 2. State is semantic, not decorative

Use the primitive that already encodes the intended state language.

- `StateBadge` for telemetry or lifecycle state
- `DashboardDropZone` for placement affordances
- `DashboardResizeHandle` for resize affordances
- `WidgetPickerCard` selected state for picker intent

Do not invent new alert chips, drag affordances, or pulse treatments for adjacent surfaces.

## 3. Dense layout, narrow responsibility

Prefer small composition wrappers that arrange existing primitives over feature-heavy monoliths.

- Page sections own layout.
- Primitives own tokens, interaction states, and motion.
- Scenario components compose primitives into realistic flows.

If a page needs a new layout rule, add it in the page or docs shell. If a primitive needs new behavior across consumers, change the primitive once.

## 4. Full-width collapse on narrow screens

When a dense board collapses, widen the item rather than shrinking it into illegibility.

- Form boards: 3 → 2 → 1 columns
- Dashboard boards: multi-column desktop → full-width mobile stack
- Widget rails: fixed desktop rail → stacked full-width list
- Chart galleries: auto-fit cards before any content redesign

Responsive behavior should preserve hierarchy, not invent a second design language.

## 5. Internal scroll beats page overflow

Use internal scroll when the content is intrinsically wide.

- `MetralyTabs` may scroll within their row
- `MetralyTable` scrolls within `.metraly-table-frame`
- Preview stages may scroll internally for demo content

Do not let these surfaces force the page body to overflow horizontally.

## 6. Reuse realistic scenario composition

Prefer scenarios that mirror product usage over isolated ornamental demos.

- Forms page shows control groupings used in filters and widget settings
- Dashboard page shows toolbar, grid, picker, drop zones, and widget shells together
- Widget editor pattern and `/editor` route reflect the same lifecycle
- State boards show canonical state coverage, not ad hoc permutations

## 7. No preview-only rescue layers

Do not solve composition problems by reviving deleted preview-hardening or prototype-conformance layers.

Allowed:
- production CSS in `packages/ui`
- page-local layout CSS in `site`
- Storybook/story layout wrappers

Not allowed:
- legacy preview token overrides
- compatibility layers that restyle production primitives after render
- PulseWave reintroduction in picker rows, drop zones, or drag handles
