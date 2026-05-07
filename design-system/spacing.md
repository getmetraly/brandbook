# Spacing and sizing

Proper spacing is critical for readability and visual hierarchy.  Metraly uses a **4 px base grid**, meaning all dimensions derive from multiples of 4.  Consistent spacing ensures that layouts feel balanced, whether on a large dashboard or a small mobile screen.

## Base scale

| Token         | Value | Typical usage                                                  |
|---------------|------|-----------------------------------------------------------------|
| `--space‑0`   | 0    | No spacing, used to collapse margins when necessary.            |
| `--space‑xs`  | 4 px | Tight spacing in icon buttons, between small icons and text.    |
| `--space‑sm`  | 8 px | Default gap between form labels and inputs, item separators.    |
| `--space‑md`  | 16 px | Standard padding inside cards, between sections on a page.      |
| `--space‑lg`  | 24 px | Outer margins on modals, between major panels.                 |
| `--space‑xl`  | 32 px | Large whitespace for hero sections or empty states.             |

Use these tokens for both margins and padding.  Avoid fractional values (e.g. 10 px) that break alignment.  When designing dense data tables or metrics dashboards, you can use `--space‑sm` and `--space‑xs` to fit more information, but never reduce the tap or click target below 48 × 48 px.

## Vertical rhythm

Align text baselines and component edges to the spacing scale.  For example, stack card components with a margin of `--space‑md` and ensure headings have consistent top and bottom margins.  Line height tokens (`--line‑height‑base`, `--line‑height‑heading`) help maintain vertical rhythm across paragraphs.

## Layout grids

Dashboards and complex pages benefit from a responsive grid system.  Use a 12‑column grid with gutters equal to `--space‑md`.  Components can span multiple columns on larger screens and stack on smaller screens.  The grid should adapt gracefully: two‑column layouts become single‑column on screens narrower than 768 px.

## Density adjustments

Metraly includes a **Draggable Tweaks Panel** that allows users to adjust the UI density—compact, default and comfortable.  These settings scale the spacing tokens globally (e.g. compact multiplies the base scale by 0.75, comfortable by 1.25).  Always reference tokens rather than fixed values so density changes propagate consistently.

---

## Current design status

This document should be interpreted together with `brandbook/current-design-state.md` and `AGENTS.md`. The current accepted direction is the phase-13 `/draft` design: dark engineering dashboard UI, cyan telemetry signal, restrained pulse-wave usage, stable interactions, protected `/components` baseline and `/draft` as the active hardening lab.
