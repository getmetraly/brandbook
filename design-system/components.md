# Component Guidelines

Status: current design direction aligned with the grouped docs portal and grouped preview hardening workspace.

## Component philosophy

Metraly components must feel like engineering tools: calm, precise, dense and readable. They should not feel like generic admin templates or decorative Dribbble UI.

## Canonical primitive set

The reusable base lives in `@metraly/ui`. The current canonical primitive set is intentionally small:

- `ThemeProvider`
- `MetralyCard`
- `MetralyPanel`
- `MetralyBadge`
- `StateBadge`
- `MetralyLogo`
- `MetralyMetricCard`
- `MetralyTable`
- `MetralyTelemetryLine`
- `MetralyCheckbox`
- `MetralyRadio`
- `MetralySwitch`
- `MetralySelect`
- `MetralyTabs`
- `WidgetShell`
- `WidgetPickerCard`
- `DashboardGrid`
- `DashboardWidget`
- `DashboardToolbar`
- `DashboardEmptyState`
- `DashboardDropZone`
- `DashboardResizeHandle`

Rules:

- Prefer the primitive that already expresses the intended state and density.
- Prefer composites only when the page needs a dashboard-specific contract.
- Avoid cloning these patterns locally in app code unless a migration note explains the exception.
- If a future need cannot be expressed with the current base set, treat it as a migration decision rather than an ad hoc local component.

## Baseline vs preview

- `/components` is the protected baseline.
- The preview hardening workspace is where component candidates are hardened against real product scenarios, but it is no longer the canonical component documentation surface.

## Current component language

### Controls

Checkboxes, radio buttons, switches and dropdowns use stronger circular affordances with a readable pulse-wave when selected/active. The circle must be visually clear at dashboard density.

Rules:

- selected states use cyan border and subtle glow;
- disabled states reduce opacity and use `not-allowed` cursor;
- focus-visible must be obvious;
- no vertical movement on hover;
- dropdown is allowed as a menu pattern, separate from the old Metric source select example.

### Widget picker

The widget picker must align icon, title, metadata, selection control and state badge without collisions.

Accepted structure:

```text
icon | title + meta | selected control
state badge
body copy
tags
```

The selected circle should match the visual weight of select/checkbox controls.

### State badges

State badges communicate telemetry state:

- live;
- stale;
- delayed;
- disconnected;
- no data.

They may include a pulse-wave marker, but the marker should remain inside the badge and not become a drag affordance.

### Cards and widgets

Widget cards should use:

- dark card background;
- low-contrast border by default;
- cyan border for selected;
- readable metric value;
- muted body copy;
- no nested collision;
- resize handles outside text rhythm.

### Notifications and timelines

Notification rows should align pulse-wave, title, body and time in a stable grid. The time marker should use a small pulse-wave instead of a dot.

### Navigation

Sidebar and topbar should stay compact. Sidebar logo pulse-wave must be centered inside the mark. Active navigation may use pulse-wave; inactive items may use short labels or simple icons.

## Interaction states

Each component should define these states where relevant:

| State | Requirement |
|---|---|
| Default | calm, low-contrast, readable |
| Hover | border/background only, no vertical jump |
| Focus-visible | clear cyan outline/ring |
| Active/selected | cyan border, subtle glow, readable pulse-wave |
| Disabled | lower opacity, no pointer action |
| Loading | skeleton/pulse without layout shift |
| Unread/new | stronger title and marker |
| Error/disconnected | red semantic border/text, not only color |

## Cursor rules

- Static text/content: default cursor.
- Buttons, links, menu items: pointer.
- Text inputs: text.
- Drag handles: grab/grabbing.
- Resize handles: resize cursors.
- Disabled: not-allowed.

## Promotion criteria

A component can move from preview hardening to implementation when:

- its API is clear;
- token usage is complete;
- responsive behavior is verified;
- focus/keyboard behavior is defined;
- it appears in at least one product-like scenario;
- it has documentation and visual-state examples.

## Export alignment

The `@metraly/ui` package should keep its public export surface aligned with this document. When adding a primitive:

- update the export list in `packages/ui/src/index.ts`;
- document the intended usage here;
- add or update tests that cover the interactive states and accessibility semantics;
- update migration notes if the component changes the rollout order.
