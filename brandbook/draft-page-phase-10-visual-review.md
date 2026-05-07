# Draft Page Phase 10 Visual Review

Status: corrected draft page pass.

## Scope

This pass corrects screenshot-reported issues on `/draft` while keeping `/components` unchanged as the baseline reference.

## Corrections

- Restored the hero telemetry line to a calm, thin line instead of an oversized pulse graphic.
- Kept larger pulse-wave marks inside circular indicators, where the pulse has a meaningful selected/live-state role.
- Restored sprint burndown ideal line as a visible but subtle dashed line.
- Reworked the widget registry coverage section to reflect the current `getmetraly/metraly` widget registry types: `stat-card`, `metric-chart`, `data-table`, `leaderboard`, `dora-overview`, `heatmap`, `sprint-burndown`, `anomaly-detector`, and `ai-insight`.
- Restored drop zones to dashed borders, with stronger visibility and calmer background.
- Reworked notification and timeline rows with larger pulse marks, aligned title/body/meta copy, and gradient titles.
- Updated role icons, especially DevOps, to use simpler line geometry that better matches the Metraly icon language.
- Added explicit cursor rules: static content uses the default cursor, buttons and clickable cards use pointer, text inputs use text, and disabled states use not-allowed.
- Kept the problematic select/dropdown example out of `/draft`.

## QA checklist

- `/components` page remains unchanged.
- CSS brace balance is valid.
- `/draft` no longer contains the excluded metric-source/dropdown example.
- Drop targets are dashed and readable.
- Sprint burndown has visible actual and ideal lines.
- Widget picker text, icon, status, and selection control no longer overlap.
- Notifications and timeline items align to a consistent two-column grid.
- Role cards have unique but simple line icons.

## Remaining recommendations

1. Move role icon paths into a small `TelemetryRoleIconDraft` registry.
2. Split `/draft` into readiness bands: stable candidates, UX review, accessibility review, and experimental.
3. Add a real Storybook or Playwright visual snapshots for hover, focus, disabled, unread, warning, error, loading, and active states.
4. Replace static drag-and-drop examples with actual dnd-kit behavior once the design language is approved.
5. Add a visual regression threshold specifically for overlap checks around widget picker cards, notification rows, and board-edit cards.

---

## Current design status

This document should be interpreted together with `brandbook/current-design-state.md` and `AGENTS.md`. The current accepted direction is the phase-13 `/draft` design: dark engineering dashboard UI, cyan telemetry signal, restrained pulse-wave usage, stable interactions, protected `/components` baseline and `/draft` as the active hardening lab.
