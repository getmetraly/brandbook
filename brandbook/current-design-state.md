# Current Design State

Status: near production-ready visual direction.

This document freezes the current Metraly brandbook design so future agents and contributors can reproduce it consistently.

## Source of truth

- `/components` is the protected baseline reference page.
- The preview hardening surface is represented by the grouped docs pages under `site/app/components`, `site/app/patterns`, `site/app/examples`, `site/app/foundations` and `site/app/editor`.
- The preview component set remains represented by `site/app/components/previews/` plus `site/app/components/previews/previews.css`.
- `/components/previews` now contains the Claude Design reference integration state board and static Engineering Dashboard Editor scenario.
- `AGENTS.md` defines repository operating rules for future AI/code agents.

## Visual identity

Metraly is a self-hosted engineering intelligence product. The UI should feel precise, calm, technical and trustworthy.

The current design is not a marketing-first landing aesthetic. It is closer to an observability console for engineering leaders:

- dark product canvas;
- dense but readable dashboard cards;
- calm typography;
- cyan telemetry signal;
- purple secondary depth;
- subtle shadows and borders;
- stable interaction states;
- restrained motion.

## Color direction

Primary colors:

| Role | Token / value | Usage |
|---|---|---|
| Base canvas | `#0b0f14` / `--bg-base` | App background |
| Surface | `#111722` / `--bg-surface` | Panels and page sections |
| Card | `#151d28` / `--bg-card` | Widgets and component cards |
| Primary signal | `#00e5cc` / `--cyan` | Active state, focus, telemetry wave |
| Secondary depth | `#a855f7` / `--purple` | Gradient depth and secondary highlights |
| Success | `#22c55e` | Healthy state |
| Warning | `#f59e0b` | Delayed / warning state |
| Error | `#ef4444` | Disconnected / destructive state |

Usage rules:

- Cyan should communicate operational signal, not decoration.
- Purple should be used sparingly for depth, drag elevation or chart contrast.
- Borders must remain low-contrast unless the element is active, selected or focused.
- Glow must be subtle.

## Theme contract

The current theme contract is CSS-variable based and is applied through the shared Metraly theme wrapper.

Canonical variables:

- `--metraly-bg-base`
- `--metraly-bg-surface`
- `--metraly-bg-card`
- `--metraly-bg-card-hover`
- `--metraly-border`
- `--metraly-border-bright`
- `--metraly-text-primary`
- `--metraly-text-secondary`
- `--metraly-text-muted`
- `--metraly-cyan`
- `--metraly-purple`
- `--metraly-green`
- `--metraly-warning`
- `--metraly-error`
- `--metraly-info`
- `--metraly-font-ui`
- `--metraly-font-display`
- `--metraly-font-mono`
- `--metraly-radius-sm`
- `--metraly-radius-md`
- `--metraly-radius-lg`
- `--metraly-radius-xl`
- `--metraly-radius-pill`
- `--metraly-shadow-panel`
- `--metraly-glow-cyan`
- `--metraly-glow-purple`
- `--metraly-motion-fast`
- `--metraly-motion-base`
- `--metraly-motion-slow`
- `--metraly-ease-out`

Rules:

- Dark is the default theme for brandbook and product surfaces.
- Light mode stays available as a supported token set, but it is not the primary visual direction.
- Theme switching should only change token values, not component APIs.
- The `ThemeProvider` wrapper sets the `data-theme` contract and the shared `.metraly-theme` class.

## Typography

Current direction:

- UI/body: Inter or system UI fallback.
- Display/headings: Space Grotesk / Geist-like technical display feel.
- Code/metric internals: JetBrains Mono-style mono where useful.

Current tuning:

- Hero copy is calmer and smaller than early drafts.
- Dashboard card headings should feel strong but not oversized.
- Widget registry typography should remain close to the baseline, not inflated.
- Secondary text should be muted and readable, usually `--text-secondary`.

## Pulse-wave system

The pulse wave is the strongest brand primitive.

Current accepted usage:

- logo mark;
- hero telemetry line;
- selected checkbox / radio indicator;
- widget picker icon and selected state;
- live/status badge pulse;
- notification and timeline markers;
- sidebar active icon;
- empty state divider;
- chart accent or telemetry divider.

Rules:

- Pulse-wave can be larger inside contained circular/square marks.
- Pulse-wave should be centered inside the sidebar logo mark.
- Pulse-wave in checkbox/radio/select circles should be bold enough to read at small sizes.
- Do not use pulse-wave as a drag handle.
- Do not place pulse-wave before `Drag to move` text.
- Avoid noisy repeated pulse decorations.

## Docs portal structure

The current site structure uses grouped docs pages instead of one oversized showcase page. The main route groups are:

- `/foundations`
- `/components/primitives`
- `/components/forms`
- `/components/data-display`
- `/components/dashboard`
- `/components/charts`
- `/patterns/dashboard-layout`
- `/patterns/widget-editor`
- `/examples/engineering-dashboard`
- `/editor`

## Preview hardening structure

The preview component set complements the grouped docs pages and still covers the product-scenario review surfaces:

1. Core controls and dashboard widgets.
2. Charts, widgets and drag-and-drop.
3. Metraly product pages and states.

Companion Storybook stories in `stories/` should mirror the same state vocabulary and keep the interaction and surface contracts easy to scan.

It includes:

- checkbox, radio, switch, dropdown, search, tabs and segmented control;
- widget picker, widget shell, grid item and table row;
- state badges, toast, notification center, timeline, empty state and skeleton;
- sidebar, topbar, dashboard toolbar and real dashboard scenario;
- Recharts gallery, heatmap, sprint burndown and widget registry coverage;
- role icon examples from Developer to CEO;
- board edit mode and drag-and-drop states.

The final Claude Design zip is treated as a visual reference only. Production-aligned translation lives in `site/app/components/previews/claude-design-handoff.md`, `/components/previews`, `/patterns/widget-editor` and `@metraly/ui/charts`.

## Core primitive set

The canonical reusable base currently lives in `@metraly/ui`. These components are the stable starting point for both the brandbook site and downstream migrations:

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
- `WidgetPickerCard`
- `DashboardGrid`
- `DashboardWidget`
- `DashboardToolbar`
- `DashboardEmptyState`
- `DashboardDropZone`
- `DashboardResizeHandle`

Chart wrappers are exposed from `@metraly/ui/charts` for preview hardening:

- `MetralyChartCard`
- `MetralyLineChart`
- `MetralyAreaChart`
- `MetralyBarChart`
- `MetralyComposedChart`
- `MetralySparkline`
- `MetralyChartTooltip`

Usage rules:

- Prefer these primitives over ad hoc local reimplementations when the visual and behavioral contract matches.
- Use composites like `WidgetPickerCard` and `DashboardWidget` only when the page needs dashboard-specific density or interaction state.
- Keep page-specific embellishments outside the primitive layer so the base API stays stable.
- If a new primitive is needed, document the need in migration notes before expanding the export surface.

Board flow contract:

- `dashboardRepository.createWidget` is the canonical widget constructor for the editor flow.
- It resolves registry-backed defaults for known widget types and accepts partial layout overrides.
- The editor should remain orchestration-only: select a widget type, create the instance through the repository, persist, reload and re-enter edit mode with the same instance.

## Table surfaces

`MetralyTable` is the canonical display-first table primitive.

Current contract:

- loading renders skeleton rows and should not shift layout;
- empty data uses calm explicit copy rather than a noisy empty shell;
- `selectedRowKeys` marks rows as selected without moving interaction state into the primitive;
- `rowKey` should stay stable when row identity matters;
- sorting, filtering and pagination belong in wrappers above the primitive.

## Widget registry coverage

The preview hardening workspace should reflect the product widget map:

- `stat-card`
- `metric-chart`
- `data-table`
- `leaderboard`
- `dora-overview`
- `heatmap`
- `sprint-burndown`
- `anomaly-detector`
- `ai-insight`

The registry section should be readable first, decorative second. Use table-like scanning, clear labels and modest typography.

## Real dashboard scenario

The real dashboard scenario should show how primitives work together:

- sidebar with centered logo pulse-wave;
- clear active navigation;
- topbar with title and actions;
- toolbar with search, tabs, live sync and add-widget button;
- metric cards;
- chart panel;
- repository health table.
- widget picker panel;
- selected, dragging, drop-target, resize, empty and disconnected states.

The toolbar must not collide. Use responsive wrapping or grid fallback.

Default drop zones must use dashed cyan borders and subtle tint without pulse-wave. Drag handles must remain neutral grip dots.

## Interaction states

Every component candidate should have or document:

- default;
- hover;
- focus-visible;
- selected/active;
- disabled;
- loading;
- unread/new;
- delayed/stale/no-data;
- error/disconnected.

Cursor rules:

- static content: `default`;
- buttons, links, menus: `pointer`;
- text inputs: `text`;
- disabled: `not-allowed`;
- drag handles: `grab` / `grabbing`;
- resize handles: appropriate resize cursor.

## Overlay primitives

The preview hardening workspace still carries the canonical overlay comparison surfaces while the reusable package-level contract is being formalized.

Current contract:

- tooltip is passive and informational;
- popover is compact and contextual;
- modal is blocking and explicit about destructive or irreversible actions;
- drawer is used for side-panel editing or configuration;
- command palette is input-first and should read like a search/action surface.

Accessibility rules:

- modal and drawer shells should expose a clear accessible name;
- tooltip should remain lightweight and non-modal;
- popover should stay compact and should not imitate a full-screen dialog;
- focus behavior should be predictable and should not steal focus unexpectedly on hover;
- overlay shells should keep pulse-wave usage semantic, not decorative.

## Production readiness criteria

A component is ready to move out of the preview hardening workspace when it has:

- stable visual states;
- keyboard/focus behavior defined;
- no layout collisions in dashboard scenarios;
- tokenized colors and spacing;
- responsive behavior;
- clear API and prop names;
- accessibility notes;
- usage examples;
- no hidden dependency on preview-only CSS.
