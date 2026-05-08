# Board Edit Mode

Status: active design direction.

Board editing is a core Metraly surface. It must feel like an engineering workspace, not a generic dashboard builder.

Canonical board-edit previews now live in `/patterns/widget-editor`, `/components/dashboard` and `/components/feedback`. Keep `/legacy-sandbox` as a legacy comparison surface only.

## Current rules

- Selected widgets use a cyan border, subtle glow and visible resize affordances.
- Dragging widgets use elevation and optional purple depth, without aggressive rotation.
- Drop targets use a visible dashed cyan border and subtle tint.
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

## DnD compatibility

Design must remain compatible with:

- `@dnd-kit/core`;
- `@dnd-kit/sortable`;
- `@dnd-kit/utilities`;
- `react-grid-layout`.

Do not design states that require layout jumps or fragile DOM overlays.

## Acceptance criteria

- The user can visually identify where a widget can land.
- The selected widget remains readable.
- Resize handles do not collide with title, metric, body copy or badges.
- Drag handles are neutral and cursor-aware.
- Drop zone is visible enough but not visually louder than content.
