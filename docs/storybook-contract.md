# Storybook Contract

Storybook is a visual conformance harness for the prototype translation.

## Required coverage

- Foundation / Tokens
- Components / StateBadge
- Components / PulseMarker
- Components / Forms
- Components / WidgetPickerCard
- Components / DashboardWidget
- Components / DashboardToolbar
- Components / DashboardDropZone
- Components / MetralyTable
- Components / Cards
- Components / Charts
- Scenarios / Dashboard Editor
- Scenarios / Component State Board

## Viewport coverage

Responsive stories and scenarios must be inspected at:

- 320px
- 375px
- 390px
- 430px
- 768px
- 1024px
- 1280px
- 1440px
- 1920px

Stories do not need bespoke layouts per breakpoint, but they must collapse safely and avoid body overflow.

## Expectations

- Stories mirror the prototype states, not an ad hoc demo gallery.
- No local visual overrides unless they are layout-only.
- Global CSS should come from `@metraly/ui`.
- Story layout wrappers may use responsive grids, but they must not restyle production primitives.
- Dense boards should use collapsing grids or auto-fit layouts instead of fixed desktop-only columns.

## Required story coverage per component

`StateBadge`: live, ok, new, stale, delayed, disconnected, error, warning, noData, info, purple, disabled, success + CanonicalMatrix story.

`PulseMarker`: live dot, new dot, telemetry wave, static warning, allowed semantic usage matrix.

`DashboardWidget`: default, selected, dragging, resizing, loading, empty, stale, error/disconnected, full-width.

`MetralyTable`: default (with selected row + live/unread markers), loading, empty, dense (PR review board).

## Pulse divergence in stories

Stories for `WidgetPickerCard` must not show `PulseWave` in selected state. Use border/glow only.
Stories for `DashboardDropZone` must not show `PulseWave`. Use color transitions only.
Stories for `DashboardWidget` drag handles must not show `PulseWave`.
