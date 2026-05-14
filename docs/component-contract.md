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

## Responsive rules by component

### MetralyCheckbox / MetralyRadio / MetralySwitch

- Controls must remain readable inside 3/2/1 form grids.
- Label and help copy may wrap.
- Control chrome stays compact and does not scale up for mobile.

### MetralySelect

- Trigger stays full-width inside its container.
- Popover list must remain viewport-safe with internal scrolling when needed.
- Long labels may truncate in the trigger but must not force page overflow.

### MetralyTabs

- Tabs stay in a single row and may horizontal-scroll on narrow widths.
- Active underline remains aligned with the tab label.
- Tabs do not force page-level overflow.

### StateBadge

- Always render as compact `inline-flex`.
- Never stretch to fill parent width.
- Truncation is allowed before layout distortion.

### DashboardResizeHandle

- Resize handles remain outside content rhythm.
- They stay visually compact at every breakpoint.
- Do not replace them with larger mobile-only affordances.

### DashboardDropZone

- Default, active, and rejected states remain pulse-free.
- Copy may wrap on narrow widths.
- The drop zone owns its own compression before any page-level overflow is introduced.

### DashboardToolbar

- Tabs may horizontal-scroll on mobile.
- Search, sync state, and actions wrap into additional rows as needed.
- Buttons stay reachable without clipping.

### MetralyTable

- Keep real `<table>` semantics.
- Use the table frame for horizontal scrolling.
- Keep sticky headers active.
- Footer stays compact and must not widen the table.

### WidgetPickerCard

- Desktop usage assumes a compact right-rail card.
- Mobile usage assumes a full-width dense list item.
- Selected state is border + background + glow only.

### DashboardWidget / WidgetShell

- Desktop usage assumes compact multi-column widgets.
- Mobile usage assumes full-width stacked widgets.
- Header content may wrap by row, but drag grip, title hierarchy, and state badge remain intact.

### MetralyCard / MetralyPanel / MetralyMetricCard

- These shells own visual rhythm and spacing.
- Consumers may change layout around them, not the shell language inside them.
- On narrow widths they should widen or stack before their internals become unreadable.

### Chart wrappers

- Charts render inside responsive containers.
- X-axis tick density reduces on narrow widths.
- Cards may reduce spacing on mobile, but charts must stay clipped to their shell.
- Chart wrappers must not require fixed desktop widths to render correctly.

## Intentional no-pulse divergence

`WidgetPickerCard` does not render `PulseWave`. Selected state uses `border-color: var(--m-cyan-500)` + `box-shadow: var(--m-glow-selected)` + `background: var(--m-cyan-bg)` only.

`DashboardDropZone` remains pulse-free in the production brandbook implementation. Active state uses border + background color change only.

Do not reintroduce `PulseWave` in:
- `WidgetPickerCard` (any state)
- Widget library rows
- `DashboardDropZone` idle/active/default
- Drag handles

See `docs/design-principles.md` for the full rationale.
