# Design Principles

The prototype is a dense engineering workspace, not a marketing page.

## Non-negotiables

- `--m-bg-0` is the canvas background.
- `--m-bg-1` is sidebar, topbar, and header surface.
- `--m-bg-2` is the primary card and panel surface.
- `--m-bg-3` is raised and hover.
- `--m-bg-4` is active and pressed.
- Cyan is operational signal.
- Purple is secondary depth and accent, used sparingly.
- Glow is functional only for focus, selected, and live or new states where the prototype uses it.
- Hover must not create vertical jumps.
- Drag handles are neutral grip dots only.
- Resize handles only appear on selected or resizing widgets.
- Pulse-wave is semantic, not decorative.

## Responsive philosophy

Responsive behavior preserves the same product personality.

- Collapse layout before changing tone.
- Prefer full-width stacking over over-compressed multi-column cards on narrow screens.
- Allow internal scroll for tabs, tables, and preview stages when content is intrinsically wide.
- Never allow the page body to overflow horizontally.
- Reduce chart tick density and spacing before shrinking typography into illegibility.
- Keep badges, controls, and picker rows compact even when the surrounding layout expands or collapses.

Desktop remains a dense engineering dashboard. Tablet and mobile are the same dashboard with fewer simultaneous columns, not a redesigned experience.

## Pulse-wave rule

Pulse-wave is allowed only where the prototype uses it semantically: logo mark, live/new/status signal, selected control marker, or chart and telemetry accent.

It must not be used as:

- a widget picker icon;
- a generic icon;
- drag affordance;
- repeated sidebar ornament;
- generic decoration.

## Intentional divergence from prototype pulse usage

The prototype's `WidgetPickerCard` renders a `PulseWave` in selected state and its widget library rows can pulse. The production brandbook intentionally removes this:

- `WidgetPickerCard` selected state uses border + background + glow only. No `PulseWave`.
- Widget library rows do not pulse.
- `DashboardDropZone` is pulse-free in idle, hover, and default active states.
- Drag handles never pulse.

**Rationale**: Pulse in picker rows and dropzones at the prototype level was exploratory. The signal is too noisy for a dense engineering workspace where pulse is reserved for live telemetry and status badges.

Allowed semantic pulse usages in production:
- Logo mark
- `live` and `new` StateBadge dot (`m-pulse-dot`)
- Toolbar sync chip
- Chart/telemetry accent where explicitly annotated
