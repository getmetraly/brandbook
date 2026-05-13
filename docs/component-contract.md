# Component Contract

`packages/ui` is the production translation of the prototype primitives.

## Token contract

- New component CSS should use `--m-*` tokens first.
- `--metraly-*` may exist only as compatibility aliases.
- No component should depend on the old preview-hardening CSS layer.

## Component surface

The rebuilt primitive surface includes:

- `StateBadge`
- `MetralyBadge`
- `MetralyCard`
- `MetralyPanel`
- `MetralyMetricCard`
- `MetralyTable`
- `MetralyCheckbox`
- `MetralyRadio`
- `MetralySwitch`
- `MetralySelect`
- `MetralyTabs`
- `WidgetPickerCard`
- `DashboardWidget`
- `DashboardToolbar`
- `DashboardDropZone`
- `DashboardResizeHandle`
- chart wrappers from `@metraly/ui/charts`

## State rules

- Default, hover, focus-visible, selected, disabled, loading, empty, new/unread, stale/delayed, error/disconnected, dragging, and resizing states must match the prototype density and tone.
- Widget picker rows stay compact.
- Default drop zones stay pulse-free.
- Drag affordance is always grip dots.
- Resize handles appear only in the correct states.
