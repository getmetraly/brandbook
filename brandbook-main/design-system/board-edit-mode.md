# Board Edit Mode

Status: draft

## Goal

Board editing should feel like an engineering workspace, not a generic admin dashboard builder.

The editing layer must communicate:

- layout structure;
- drag state;
- resize affordance;
- drop targets;
- full-width expansion;
- selection state.

Without introducing noisy UI.

---

# Interaction Language

## Selected widget

Selected widgets use:

- cyan outline;
- subtle telemetry glow;
- visible edit toolbar;
- telemetry resize corners.

Avoid:

- thick borders;
- large white handles;
- legacy admin resize boxes.

---

# Resize Handles

Metraly uses telemetry corner handles instead of square resize boxes.

## Why

Square handles:

- feel generic;
- visually heavy;
- break the telemetry language;
- look like old dashboard tooling.

Telemetry corners:

- feel lighter;
- integrate with the cyan signal language;
- resemble engineering tooling;
- reinforce the Metraly identity.

## Recommended Style

```text
selected widget
→ cyan edge
→ telemetry corner handles
→ subtle edge glow
```

Handles should feel like part of the outline system, not floating controls.

---

# Dragging State

Dragging widgets should:

- elevate above the board;
- become slightly transparent;
- use a purple edge glow;
- preserve layout readability.

Avoid aggressive transforms or large rotations.

---

# Drop Zones

Drop targets should be explicit.

Use:

- dashed cyan borders;
- subtle cyan background tint;
- pulse markers;
- visible empty slots.

The user should immediately understand where a widget can land.

---

# Full Width Mode

Full-width widgets should:

- visibly span the grid;
- use a state badge;
- slightly change background treatment.

This prevents layout ambiguity.

---

# Grid Language

The board grid itself should remain subtle.

Recommended:

- low-contrast grid lines;
- soft spacing rhythm;
- no strong visible cells unless dragging.

The grid should guide placement without overwhelming content.

---

# Future Direction

Potential future additions:

- animated telemetry edge pulses;
- hover edge activation;
- snap-preview overlays;
- keyboard resize mode;
- alignment guides;
- layout density presets.

---

# Reference

See:

```text
site/app/components/page.tsx
```

for the current visual prototype.
