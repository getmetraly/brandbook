# Draft Page Visual Fixes

Status: phase 07 local update

## Scope

This update only changes the `/draft` hardening surface and the draft component CSS. The `/components` page remains the visual baseline and is not edited.

## Changes

- Increased the visual size of telemetry pulse waves across draft controls, state badges, table sparklines, widget picker icons, drop zones and section dividers.
- Increased checkbox/radio control size so the selection affordance is easier to read in dense dashboard cards.
- Reworked widget picker alignment so icon, title, metadata, checkbox and state badge sit in a stable row and do not collide with the description or tags.
- Added a dedicated height resize affordance for board edit mode and drag-and-drop examples.
- Added a refined board edit mode example that shows selected, dragging, drop target, width resize, height resize and full-width states.
- Reworked the real dashboard scenario toolbar into a tighter grid so search, segmented control, live sync and action button do not spread awkwardly.
- Changed the real dashboard scenario content layout so the repository table has the full available width.
- Reduced table row column widths and removed the large minimum width so repository rows fit inside the card without horizontal overflow.

## Acceptance checks

- `/components` remains unchanged.
- Dropdown / Metric source examples remain excluded from `/draft`.
- Pulse indicators are larger and more legible.
- Checkbox and radio controls are larger.
- Drag handles remain neutral grip dots; pulse indicators are not used as drag handles.
- Board resize affordances include horizontal, vertical and corner handles.
- Repository table rows fit inside the card.

---

## Current design status

This document should be interpreted together with `brandbook/current-design-state.md` and `AGENTS.md`. The current accepted direction is the phase-13 `/draft` design: dark engineering dashboard UI, cyan telemetry signal, restrained pulse-wave usage, stable interactions, protected `/components` baseline and `/draft` as the active hardening lab.
