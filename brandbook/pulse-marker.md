# Pulse Marker

Status: reference primitive

## Purpose

The pulse marker is a reusable telemetry-shaped visual primitive used for:

- paragraph intros;
- section separators;
- dashboard dividers;
- inline telemetry accents;
- list markers for engineering metrics.

The shape is intentionally angular and graph-like to reinforce the Metraly observability aesthetic.

## Canonical clip-path

```css
:root {
  --metraly-pulse-marker-path: polygon(
    0 52%,
    20% 52%,
    26% 25%,
    36% 82%,
    47% 8%,
    58% 52%,
    100% 52%,
    100% 66%,
    52% 66%,
    47% 48%,
    37% 100%,
    27% 55%,
    23% 66%,
    0 66%
  );
}
```

## Utility class

```css
.metraly-pulse-marker {
  display: inline-block;
  width: 28px;
  height: 12px;
  background: var(--metraly-cyan);
  clip-path: var(--metraly-pulse-marker-path);
}
```

## Notes

- Avoid excessive animation.
- Do not rotate randomly.
- Prefer cyan for default usage.
- Can be rendered via SVG for higher fidelity.
- Hover interactions must not shift layout.

---

## Current design status

This document should be interpreted together with `brandbook/current-design-state.md` and `AGENTS.md`. The current accepted direction is the grouped preview hardening design: dark engineering dashboard UI, cyan telemetry signal, restrained pulse-wave usage, stable interactions, protected `/components` baseline and grouped preview pages as the canonical surface.
