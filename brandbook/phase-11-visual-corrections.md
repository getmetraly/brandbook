# Phase 11 visual correction review

Status: draft page correction pass.

## Scope

This pass updates `/draft` only and keeps `/components` as the unchanged baseline reference.

## Changes

- Restored the hero telemetry mark to a large pulse-wave instead of a straight line.
- Made pulse-wave marks inside round and square indicators visually heavier.
- Reworked Widget Registry Coverage into product-style cards based on the current Metraly widget map: `stat-card`, `metric-chart`, `data-table`, `leaderboard`, `dora-overview`, `heatmap`, `sprint-burndown`, `anomaly-detector`, and `ai-insight`.
- Added dropdown coverage back as a separate menu pattern, while keeping the old `Metric source` select example excluded.
- Refined the Real Dashboard Scenario sidebar with compact navigation, meta labels, a local-preview footer, and better icon rhythm.
- Restored Sprint Burndown ideal line as a visible but calm dashed line.
- Kept dashed drop targets for board editor examples.
- Preserved cursor semantics: static content uses default cursor, buttons/links/menu items use pointer, text inputs use text cursor, disabled states use not-allowed.

## QA checklist

- `/components` was not modified in this phase.
- CSS braces are balanced.
- Dropdown component is visible on `/draft`.
- Hero telemetry line uses pulse-wave markup again.
- Widget registry cards no longer use the previous full-width status-bar layout.
- Sidebar in Real Dashboard Scenario no longer creates a large empty dark panel.
