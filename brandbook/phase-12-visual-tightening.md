# Phase 12 Visual Tightening

Status: draft-page correction pass

This pass keeps `/components` unchanged and only tightens `/draft` after screenshot review.

## Changes

- Restored the hero telemetry mark as a pulse-wave shape instead of a straight line.
- Increased pulse-wave visual weight inside circular, square and state indicators.
- Increased the checkbox/radio outer ring weight for better visibility.
- Reworked the real dashboard toolbar layout so search, tabs, live sync and primary action do not collide.
- Reworked the sidebar to clarify inactive items with short labels and active items with a pulse marker.
- Rebuilt widget registry coverage as a readable registry table using the current `getmetraly/metraly` widget map.
- Preserved the dropdown example on `/draft`.

## Visual QA

- Static cards keep default cursor.
- Buttons, tabs, dropdown trigger and menu items use pointer cursor.
- Text inputs use text cursor.
- Disabled examples use not-allowed cursor.
- `/components` remains the baseline and was not modified.

---

## Current design status

This document should be interpreted together with `brandbook/current-design-state.md` and `AGENTS.md`. The current accepted direction is the phase-13 `/draft` design: dark engineering dashboard UI, cyan telemetry signal, restrained pulse-wave usage, stable interactions, protected `/components` baseline and `/draft` as the active hardening lab.
