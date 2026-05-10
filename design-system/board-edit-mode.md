# Board Edit Mode

Status: active design direction.

Board editing is a core Metraly surface. It must feel like an engineering workspace, not a generic dashboard builder.

Canonical board-edit previews now live in `/patterns/widget-editor`, `/components/dashboard` and `/components/feedback`. Keep `/legacy-sandbox` as a legacy comparison surface only.

The Claude Design visual reference is integrated as a static hardening scenario in `/components/previews` and referenced from `/patterns/widget-editor`. The zip remains a reference artifact, not a source for production drag-and-drop implementation.

The editor add flow should stay thin: choose a widget type, call `dashboardRepository.createWidget`, persist the instance, then reload and continue editing the same widget record. Registry-backed defaults belong in the shared widget registry, not in the editor component.

## Current rules

- Selected widgets use a cyan border, subtle glow and visible resize affordances.
- Dragging widgets use elevation and optional purple depth, without aggressive rotation.
- Drop targets use a visible dashed cyan border and subtle tint.
- Default drop targets do not render pulse-wave.
- Drag handles use neutral grip dots, never pulse-wave.
- Pulse-wave can appear in state badges or drop-zone decoration, not as the handle.
- Resize handles must sit outside content rhythm and must not overlap text.
- Full-width widgets should visibly span the grid and show a state badge.

## Required states

Board edit examples should show:

- idle widget;
- selected widget;
- dragging widget;
- dashed drop target;
- full-width widget;
- horizontal resize;
- vertical resize;
- corner resize;
- invalid/unavailable drop target in future iterations.

Static previews may show these states first when full drag/drop behavior is risky. Production flows must remain compatible with existing editor abstractions instead of introducing a fragile custom drag/drop system.

## DnD compatibility

Design must remain compatible with:

- `@dnd-kit/core`;
- `@dnd-kit/sortable`;
- `@dnd-kit/utilities`;
- `react-grid-layout`.

Do not design states that require layout jumps or fragile DOM overlays.

The current hardening preview uses static states for selected, dragging, drop-target, rejected drop and resize handles. Native/prototype DnD flows are not Ready until API, keyboard, persistence and regression coverage are in place.

## Acceptance criteria

- The user can visually identify where a widget can land.
- The selected widget remains readable.
- Resize handles do not collide with title, metric, body copy or badges.
- Drag handles are neutral and cursor-aware.
- Drop zone is visible enough but not visually louder than content.
