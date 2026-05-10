# Telemetry Components

Status: preview hardening workspace for residual migration surfaces.

This workspace contains Metraly UI component candidates before they are promoted into grouped docs pages or future `@metraly/ui` package exports.

## Claude Design reference integration

`brandbook-metraly(2).zip` is documented in `claude-design-handoff.md` as a visual reference only. It must not be copied as production architecture.
The handoff file also records the current implementation state and the next actions needed to finish hardening.

The translated implementation now lives in:

- `/components/previews` for the real state board and static dashboard editor scenario;
- `/components/dashboard` for canonical dashboard primitive hardening;
- `/components/charts` for `@metraly/ui/charts` wrapper previews;
- `/patterns/widget-editor` for the dashboard editor composition reference.

The reference ideas adopted from the zip are component state coverage, Engineering Intelligence dashboard editor layout, widget picker density, drop-zone treatment, resize affordance placement and implementation handoff notes.

Do not adopt React CDN loading, Babel-in-browser, global `window` component registration, inline-style-heavy architecture or generic infrastructure-observability examples from the zip.

## Relationship to `/components`

`/components` is the protected baseline. The preview component set is the temporary working surface for hardening and migration.

Use the preview component set to test:

- real dashboard composition;
- component spacing and collision behavior;
- hover/focus/disabled/unread/error states;
- board edit mode and drag-and-drop states;
- widget registry coverage;
- chart wrappers;
- role and product-surface patterns.

Do not modify `/components` while working on preview hardening unless explicitly instructed.

Board-edit frames, overlay helpers, command palette, empty states and drawer previews are now being promoted into grouped canonical pages. Keep the preview component set focused on migration comparison and residual hardening surfaces.

Storybook should mirror the same hardening surface with companion stories for:

- control states;
- overlay primitives;
- dashboard frames;
- widget picker and state badge examples.
- chart wrappers;
- dashboard editor scenario states.

## Current component set

Core controls:

- `TelemetryCheckbox`
- `TelemetryRadio`
- `TelemetrySwitch`
- `TelemetryDropdown`
- `TelemetrySearch`
- `TelemetryTabs`
- `TelemetrySegmentedControl`

Dashboard primitives:

- `WidgetPickerCard`
- `DashboardWidget` preview
- `TelemetryGridItem`
- `TelemetryTableRow`
- `RechartsTelemetryCard`
- `MetralyChartCard`
- `MetralyLineChart`
- `MetralyAreaChart`
- `MetralyBarChart`
- `MetralyComposedChart`
- `MetralySparkline`

Feedback and states:

- `TelemetryStateBadge`
- `TelemetryToast`
- `TelemetryNotificationCenter`
- `TelemetryTimeline`
- `TelemetrySkeleton`
- `TelemetryEmptyState`

Navigation and overlays:

- `TelemetrySidebar`
- `TelemetryTopbar`
- `TelemetryCommandPalette`
- `TelemetryActionMenu`
- `TelemetryContextMenu`
- `TelemetryPopover`
- `TelemetryTooltip`
- `TelemetryModal`
- `TelemetryDragOverlay`

Icon coverage:

- `TelemetryIconGallery`
- role icons from Developer to CEO in the legacy comparison page source.

## Current visual rules

- Use a dark product canvas.
- Use cyan for operational signal and active state.
- Use purple sparingly for secondary depth or drag elevation.
- Keep glow subtle.
- Make selected control circles visually strong enough to read.
- Center pulse-wave inside logo/sidebar marks.
- Do not use pulse-wave before drag handles.
- Use neutral grip dots for drag handles.
- Drop targets use a visible dashed cyan border.
- Default drop targets must not render pulse-wave.
- Hover must not shift layout vertically.
- Focus-visible must be clear.

## Readiness labels

- Ready: production-ready enough for current brandbook usage.
- Visual-ready: visual direction is accepted, implementation still needs hardening.
- Hardening: needs API, accessibility, state or test work.
- Preview-only: scenario/reference only, not a reusable component contract.

The Claude Design dashboard editor composition is Preview-only. Select, Tabs, Table wrappers, DashboardToolbar, DashboardDropZone, DashboardResizeHandle and chart wrappers remain Hardening unless tests, accessibility and API stability support promotion.

## Required state coverage

Each component candidate should be reviewed against:

- default;
- hover;
- focus-visible;
- active/selected;
- disabled;
- loading;
- unread/new;
- delayed/stale/no-data;
- error/disconnected.

## Promotion checklist

Before moving a component from preview hardening to implementation pack:

- API is explicit and stable.
- Colors and spacing are tokenized.
- It works in dashboard cards and narrow containers.
- It has focus and keyboard behavior defined.
- It has at least one real product scenario example.
- It does not rely on decorative pulse spam.
- It is documented in the relevant `.md` files.
