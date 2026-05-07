# Draft Telemetry Components

Status: active hardening lab / near production-ready visual direction.

This workspace contains Metraly UI component candidates before they are promoted into a reusable implementation pack or future `@metraly/ui` package.

## Relationship to `/components`

`/components` is the protected baseline. `/draft` is the working surface.

Use `/draft` to test:

- real dashboard composition;
- component spacing and collision behavior;
- hover/focus/disabled/unread/error states;
- board edit mode and drag-and-drop states;
- widget registry coverage;
- chart wrappers;
- role and product-surface patterns.

Do not modify `/components` while working on `/draft` unless explicitly instructed.

## Current component set

Core controls:

- `TelemetryCheckboxDraft`
- `TelemetryRadioDraft`
- `TelemetrySwitchDraft`
- `TelemetryDropdownDraft`
- `TelemetrySearchDraft`
- `TelemetryTabsDraft`
- `TelemetrySegmentedControlDraft`

Dashboard primitives:

- `WidgetPickerCardDraft`
- `TelemetryWidgetShellDraft`
- `TelemetryGridItemDraft`
- `TelemetryTableRowDraft`
- `RechartsTelemetryCardDraft`

Feedback and states:

- `TelemetryStateBadgeDraft`
- `TelemetryToastDraft`
- `TelemetryNotificationCenterDraft`
- `TelemetryTimelineDraft`
- `TelemetrySkeletonDraft`
- `TelemetryEmptyStateDraft`

Navigation and overlays:

- `TelemetrySidebarDraft`
- `TelemetryTopbarDraft`
- `TelemetryCommandPaletteDraft`
- `TelemetryActionMenuDraft`
- `TelemetryContextMenuDraft`
- `TelemetryPopoverDraft`
- `TelemetryTooltipDraft`
- `TelemetryModalDraft`
- `TelemetryDragOverlayDraft`

Icon coverage:

- `TelemetryIconGalleryDraft`
- role icons from Developer to CEO in `/draft/page.tsx`.

## Current visual rules

- Use a dark product canvas.
- Use cyan for operational signal and active state.
- Use purple sparingly for secondary depth or drag elevation.
- Keep glow subtle.
- Make selected control circles visually strong enough to read.
- Center pulse-wave inside logo/sidebar marks.
- Do not use pulse-wave before drag handles.
- Use neutral grip dots for drag handles.
- Drop targets use a visible dashed cyan border.
- Hover must not shift layout vertically.
- Focus-visible must be clear.

## Required state coverage

Each component candidate should be reviewed against:

- default;
- hover;
- focus-visible;
- active/selected;
- disabled;
- loading;
- unread/new;
- delayed/stale/no-data;
- error/disconnected.

## Promotion checklist

Before moving a component from draft to implementation pack:

- API is explicit and stable.
- Colors and spacing are tokenized.
- It works in dashboard cards and narrow containers.
- It has focus and keyboard behavior defined.
- It has at least one real product scenario example.
- It does not rely on decorative pulse spam.
- It is documented in the relevant `.md` files.
