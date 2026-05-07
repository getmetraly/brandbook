# Micro Telemetry Primitives

Status: draft

## Goal

Micro telemetry primitives are small interactive accents that make Metraly controls feel like part of one engineering operating system.

They should:

- communicate interaction state;
- reinforce telemetry language;
- remain subtle;
- avoid decorative overload.

---

# Primitive Set

## Select indicator

Telemetry pulse + chevron.

Used for:

- select inputs;
- filter dropdowns;
- board presets.

---

## Accordion indicator

Tiny pulse waveform before expansion chevron.

Used for:

- collapsible panels;
- side navigation groups;
- expandable cards.

---

## Live badge

Animated micro pulse.

Used for:

- realtime dashboards;
- streaming metrics;
- active incidents.

---

## Sync state

Minimal telemetry wave.

States:

- syncing;
- delayed;
- disconnected.

---

## Drag indicator

Telemetry corner highlights and edge activation.

Used during:

- widget dragging;
- resizing;
- board edit mode.

---

## Telemetry divider

Horizontal pulse separator.

Used for:

- section separation;
- dashboard rhythm;
- observability visual identity.

---

# Rules

- primitives must stay small;
- avoid strong animation;
- no decorative spam;
- cyan remains operational signal color;
- use glow sparingly.

---

# Reference

See:

```text
site/app/components
```

for current visual explorations.
