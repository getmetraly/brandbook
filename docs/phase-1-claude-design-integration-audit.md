# Phase 1 Claude Design Integration Audit

Generated: 2026-05-16. Working directory: `brandbook/`.

---

## Claude Design sources reviewed

| Source | Status | Notes |
|--------|--------|-------|
| `implementation-pack-viewer.html` | Reviewed | Full 746-line HTML gallery. Uses its own hex/rgba palette approximating brandbook tokens. Used as visual reference only. |
| `implementation-pack/packages/ui/src/` | Reviewed | 18 TSX components + styles. State before compatibility pass was applied. |
| `implementation-pack/site/stories/` | Reviewed | Story files per component group (Charts/Components/Dashboard/Settings/Source). |
| `implementation-pack/docs/` | Reviewed | Phase 1 component matrix, validation, migration notes, widget state matrix. |
| `ui_kits/metraly_app/` | Directory exists | Product app surface previews (AppShell, Dashboard, AI, Plugins, Wizard, icons). |
| `ui_kits/metraly_website/` | Directory exists | Marketing site kit. |
| `preview/` | Reviewed | Per-token/category HTML previews (colors-*, components-*, type-*). |
| `reference/` | Directory exists | brandbook/, metraly/, website/ sub-dirs. |
| `audit/` | Reviewed fully | 6 audit documents + README. Comprehensive gap analysis vs brandbook/metraly/website. |
| `colors_and_type.css` | Reviewed | Claude Design original CSS — uses hex colors, not brandbook OKLCH tokens. NOT imported anywhere in brandbook. |

---

## Component inventory from Claude Design

18 TSX components in implementation-pack. Grouped by Storybook category:

### Charts (2)
- `MetralyGauge` — semicircle/compact/inline dial with role=meter, threshold bands, tone-aware arc
- `MetralyHeatmap` — dense telemetry matrix with color ramp, tooltips, keyboard nav

### Components (4)
- `ActivityFeed` — grouped event log with status dots, meta, timestamps
- `InsightCard` — AI-generated insight with evidence/confidence/impact metadata
- `StateBoard` — status tile grid with summary chips
- `WidgetStateMatrix` — compact state badge grid for dashboard widgets

### Source (5)
- `TokenInput` — secret-safe token field with validation states
- `PermissionExplainer` — scope grant status grid with metrics unlocked summary
- `BackfillRangePicker` — 7d/30d/90d/custom range selector with cost estimate
- `ConnectionTestPanel` — per-check connection test rows with status and latency
- `SyncProgressPanel` — sync lifecycle display with progress bar and stage indicators

### Settings (4)
- `SettingsSection` — title/description/badge/actions/body settings card
- `SettingsAuditRow` — mono audit log table row
- `AIProviderConnectorCard` — AI provider connection card (OpenAI, Anthropic, local, custom)
- `BYOLLMConnectorPanel` — full provider list panel with add/edit affordances

### Dashboard (3)
- `DashboardWidgetExamples` — composed dashboard widget examples (Gauge, Heatmap, Feed, Insight, Board)
- `DashboardWizardSplitBuilder` — split-builder wizard (left rail + right canvas)
- `MoveMenuA11yExample` — keyboard-accessible widget move fallback

---

## Current brandbook implementation status

All 18 components are present in `packages/ui/src/`. They were migrated during a compatibility pass
that fixed StatusBadge API, StateBlock API, FieldShell API, and MetralyHeatmap useRovingSelection API.

A CSS entrypoint `packages/ui/src/styles/metraly-ui.css` exists and aggregates all stylesheets.
Storybook (`site/.storybook/preview.ts`) imports it correctly.

---

## Already migrated / present

All 18 components. Stories exist for all of them in `stories/`.

---

## Partially migrated

| Component | Issue |
|-----------|-------|
| `MetralyHeatmap` | Component has full tooltip/colorScale API. CSS confirmed. Stories are comprehensive. No gaps found. |
| `MetralyGauge` | Component + CSS confirmed. Stories include card composition examples. |
| Source/Settings stories | No `parameters.layout` width constraints — stories may stretch on wide viewports. |

---

## Missing from brandbook

None. All 18 Claude Design components are present.

---

## Palette compliance findings

### `var(--m-cyan)` — undefined short token (ACTIVE UI VIOLATION)

Used in 2 story files. Token `--m-cyan` is not defined in `metraly-theme.css`. Must map to `--m-cyan-500`.

| File | Line | Pattern |
|------|------|---------|
| `stories/Settings/SettingsSection.stories.tsx` | 79–81 | `border: "1px solid color-mix(in oklch, var(--m-cyan) 50%, transparent)"`, `background: "color-mix(in oklch, var(--m-cyan) 18%, transparent)"`, `color: "var(--m-cyan)"` |
| `stories/Dashboard/DashboardWizardSplitBuilder.stories.tsx` | 83 | `"color-mix(in oklch, var(--m-cyan) 14%, var(--m-bg-2))"` |
| `stories/Dashboard/DashboardWizardSplitBuilder.stories.tsx` | 196–198 | `btn()` function: same pattern ×3 |

### `var(--m-purple)` — no violations found

### Raw hex — active UI violations

None in packages/ui/src or stories. `site/app/foundations/colors/page.tsx` has hex strings in JSX as documentation display data (not CSS); classified as **allowed documentation**.

`.next/dev/` files are build artifacts; **not source files**, ignored.

### `rgba()` in packages/ui/src — ACTIVE UI VIOLATIONS

| File | Line | Usage | Classification |
|------|------|-------|----------------|
| `packages/ui/src/styles/metraly-wizard.css` | 42 | `box-shadow: 0 20px 60px rgba(0, 0, 0, 0.22)` | Shadow — fix with `color-mix` |
| `packages/ui/src/styles/metraly-forms.css` | 274 | `box-shadow: 0 12px 32px -8px rgba(0,0,0,0.5)` | Shadow — fix with `color-mix` |
| `packages/ui/src/charts/MetralyBarChart.tsx` | 62 | `activeBar={{ stroke: "rgba(0,229,204,0.42)" }}` | Cyan at 42% — fix with `color-mix` |
| `packages/ui/src/charts/MetralyBarChart.tsx` | 71, 80 | `CartesianGrid stroke="rgba(255,255,255,0.08)"` | Grid line — fix with `var(--m-line)` |
| `packages/ui/src/charts/MetralyAreaChart.tsx` | 93, 103 | Same grid line pattern | Fix with `var(--m-line)` |
| `packages/ui/src/charts/MetralyLineChart.tsx` | 57, 78 | Same grid line pattern | Fix with `var(--m-line)` |
| `packages/ui/src/charts/MetralyComposedChart.tsx` | 110, 135, 145 | `activeBar` + grid lines | Fix |
| `packages/ui/src/components/AIWorkspaceLayout.tsx` | 108 | `rgba(255,255,255,0.05)` as fallback in inline style | Fix with `var(--m-bg-2)` |

### `rgb()`, `hsl()`, `hsla()` — no violations found

---

## Storybook framing issues

Story files do not set `parameters.layout: "centered"` or `parameters: { layout }` overrides
individually. The global default is `layout: "padded"` which adds padding on all sides.
Components are therefore rendered without an explicit `maxWidth` on wide viewports.

Specific issues observed:

| Story group | Issue |
|-------------|-------|
| `Source/TokenInput` | No explicit `maxWidth` wrapper — input row may be very wide on desktop. |
| `Source/ConnectionTestPanel` | No `maxWidth` — check panel may stretch full canvas width. |
| `Source/SyncProgressPanel` | No `maxWidth` — progress panel may stretch. |
| `Source/PermissionExplainer` | No `maxWidth` — scope grid may be very wide. |
| `Source/BackfillRangePicker` | No `maxWidth` — may be raw controls without surface framing. |
| `Settings/SettingsSection` | No `maxWidth` — section header may stretch. |
| `Settings/AIProviderConnectorCard` | No `maxWidth` — card may stretch. |
| `Settings/BYOLLMConnectorPanel` | No `maxWidth` — panel may stretch. |
| `Components/ActivityFeed` | No `maxWidth` — feed may stretch. |
| `Components/InsightCard` | No `maxWidth` — card may stretch. |
| `Components/StateBoard` | No `maxWidth` — board may stretch. |

Fix: add `parameters: { layout: "centered" }` or a story-level `maxWidth` decorator per meta.

---

## Components requiring TSX changes

| Component | Change needed |
|-----------|---------------|
| `MetralyBarChart` | Replace `rgba()` in `activeBar` and `CartesianGrid stroke` |
| `MetralyAreaChart` | Replace `rgba()` in `CartesianGrid stroke` |
| `MetralyLineChart` | Replace `rgba()` in `CartesianGrid stroke` |
| `MetralyComposedChart` | Replace `rgba()` in `activeBar` and `CartesianGrid stroke` |
| `AIWorkspaceLayout` | Replace `rgba(255,255,255,0.05)` fallback |

---

## Components requiring CSS-only polish

| File | Change needed |
|------|---------------|
| `metraly-wizard.css` | Replace `rgba(0, 0, 0, 0.22)` box-shadow |
| `metraly-forms.css` | Replace `rgba(0,0,0,0.5)` box-shadow |

---

## Components requiring stories-only improvements

All `Source/`, `Settings/`, `Components/` story groups need `maxWidth` framing.
Specific `var(--m-cyan)` fixes in `SettingsSection` and `DashboardWizardSplitBuilder` stories.

---

## Components intentionally not migrated

None. All 18 components are present.

Claude Design's own palette tokens (`--m-bg-0:#090D10` hex assignments from the viewer HTML)
are intentionally NOT adopted. Brandbook OKLCH tokens are canonical.

---

## Recommended focused patches

1. **P0-A**: Fix `var(--m-cyan)` → `var(--m-cyan-500)` in 2 story files (6 occurrences).
2. **P0-B**: Fix `rgba()` in 4 chart components and `AIWorkspaceLayout`.
3. **P0-C**: Fix `rgba()` shadows in `metraly-wizard.css` and `metraly-forms.css`.
4. **P1-A**: Add `maxWidth` framing to Source, Settings, Components story metas.
5. **P1-B**: Verify Gauge and Heatmap story framing — both already have card composition stories.
6. **P2**: Heatmap and Gauge confirmed to have tooltips, color ramps, and card composition stories. No behavior gaps found.
