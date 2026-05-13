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

## Pulse-wave rule

Pulse-wave is allowed only where the prototype uses it semantically: logo mark, live/new/status signal, selected control marker, or chart and telemetry accent.

It must not be used as:

- a widget picker icon;
- a generic icon;
- drag affordance;
- repeated sidebar ornament;
- generic decoration.
