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

## Intentional no-pulse divergence

`WidgetPickerCard` does not render `PulseWave`. Selected state uses `border-color: var(--m-cyan-500)` + `box-shadow: var(--m-glow-selected)` + `background: var(--m-cyan-bg)` only.

`DashboardDropZone` remains pulse-free in the production brandbook implementation. Active state uses border + background color change only.

Do not reintroduce `PulseWave` in:
- `WidgetPickerCard` (any state)
- Widget library rows
- `DashboardDropZone` idle/active/default
- Drag handles

See `docs/design-principles.md` for the full rationale.
