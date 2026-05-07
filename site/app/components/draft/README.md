# Draft telemetry components

Status: draft

This workspace contains experimental Metraly UI primitives before they are promoted into the reusable implementation pack.

Rules:
- every exported component name ends with `Draft`;
- every visible example is marked as draft;
- pulse-line is semantic, not decorative;
- select controls use a pulse-line indicator instead of a chevron;
- drag handles use neutral grip dots, never pulse indicators;
- hover/focus states must not move layout;
- component APIs should stay friendly to dnd-kit, react-grid-layout, Zustand and Recharts wrappers.

Initial draft set:
- TelemetryCheckboxDraft
- TelemetryRadioDraft
- TelemetrySelectDraft
- TelemetrySwitchDraft
- TelemetryTabsDraft
- WidgetPickerCardDraft
- TelemetryStateBadgeDraft
- TelemetryToastDraft
