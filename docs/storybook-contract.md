# Storybook Contract

Storybook is a visual conformance harness for the prototype translation.

## Required coverage

- Foundation / Tokens
- Components / StateBadge
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

## Expectations

- Stories mirror the prototype states, not an ad hoc demo gallery.
- No local visual overrides unless they are layout-only.
- Global CSS should come from `@metraly/ui`.

## Required story coverage per component

`StateBadge`: live, ok, new, stale, delayed, disconnected, error, warning, noData, info, purple, disabled, success + CanonicalMatrix story.

`DashboardWidget`: default, selected, dragging, resizing, loading, empty, stale, error/disconnected, full-width.

`MetralyTable`: default (with selected row + live/unread markers), loading, empty, dense (PR review board).

## Pulse divergence in stories

Stories for `WidgetPickerCard` must not show `PulseWave` in selected state. Use border/glow only.
Stories for `DashboardDropZone` must not show `PulseWave`. Use color transitions only.
Stories for `DashboardWidget` drag handles must not show `PulseWave`.
