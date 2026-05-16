# Claude Design → Brandbook Integration Report

Generated: 2026-05-16

---

## Summary

Full audit of `../claudedesign` against `brandbook/packages/ui`. All 18 Claude Design
implementation-pack components were previously migrated and are present in the brandbook.
This pass focused on palette compliance, Storybook framing, and component behavior verification.

---

## Files changed

**Stories — palette fixes:**
- `stories/Settings/SettingsSection.stories.tsx`
- `stories/Dashboard/DashboardWizardSplitBuilder.stories.tsx`

**Stories — maxWidth framing (decorators added):**
- `stories/Source/ConnectionTestPanel.stories.tsx`
- `stories/Source/SyncProgressPanel.stories.tsx`
- `stories/Source/PermissionExplainer.stories.tsx`
- `stories/Source/TokenInput.stories.tsx`
- `stories/Source/BackfillRangePicker.stories.tsx`
- `stories/Settings/AIProviderConnectorCard.stories.tsx`
- `stories/Settings/BYOLLMConnectorPanel.stories.tsx`
- `stories/Settings/SettingsSection.stories.tsx`
- `stories/Components/ActivityFeed.stories.tsx`
- `stories/Components/InsightCard.stories.tsx`
- `stories/Components/StateBoard.stories.tsx`

**packages/ui/src — palette fixes:**
- `packages/ui/src/styles/metraly-wizard.css`
- `packages/ui/src/styles/metraly-forms.css`
- `packages/ui/src/charts/MetralyBarChart.tsx`
- `packages/ui/src/charts/MetralyAreaChart.tsx`
- `packages/ui/src/charts/MetralyLineChart.tsx`
- `packages/ui/src/charts/MetralyComposedChart.tsx`
- `packages/ui/src/components/AIWorkspaceLayout.tsx`
- `packages/ui/src/styles/metraly-heatmap.css` (redundant fallback cleanup)

**Audit docs:**
- `docs/phase-1-claude-design-integration-audit.md` (created)
- `docs/claude-design-brandbook-integration-report.md` (this file)

---

## Claude Design assets reviewed

| Asset | Notes |
|-------|-------|
| `implementation-pack-viewer.html` | 746-line HTML gallery. Reviewed in full. Visual reference confirmed. |
| `implementation-pack/packages/ui/src/` | 18 TSX components. All already present in brandbook in more developed form. |
| `implementation-pack/site/stories/` | Story files reviewed per group. |
| `ui_kits/metraly_app/` | Product surface kit — composition patterns noted, no additional migration needed. |
| `ui_kits/metraly_website/` | Marketing site kit — out of scope for this pass. |
| `preview/` | Per-token HTML previews. Reference only. |
| `reference/` | Screenshot references. Reference only. |
| `audit/00-06` | Full 6-document audit suite. Read in full; findings incorporated. |
| `colors_and_type.css` | Claude Design original CSS. NOT imported into brandbook. Contains hex colors. |

---

## Components migrated / improved

All 18 components were already present. This pass verified and improved:

| Component | Verification result |
|-----------|---------------------|
| MetralyGauge | ✅ role=meter, threshold ticks, tone arc, state blocks, bare/card, all story variants |
| MetralyHeatmap | ✅ color ramps, tooltips (hover/focus/touch), keyboard nav, showCellValues, legend, mobile |
| ActivityFeed | ✅ maxWidth framing added to stories |
| InsightCard | ✅ maxWidth framing added to stories |
| StateBoard | ✅ maxWidth framing added to stories |
| WidgetStateMatrix | ✅ No changes needed |
| TokenInput | ✅ maxWidth framing added to stories |
| PermissionExplainer | ✅ maxWidth framing added to stories |
| BackfillRangePicker | ✅ maxWidth framing added to stories |
| ConnectionTestPanel | ✅ maxWidth framing added to stories |
| SyncProgressPanel | ✅ maxWidth framing added to stories |
| SettingsSection | ✅ palette fix + maxWidth framing |
| SettingsAuditRow | ✅ No changes needed |
| AIProviderConnectorCard | ✅ maxWidth framing added to stories |
| BYOLLMConnectorPanel | ✅ maxWidth framing added to stories |
| DashboardWidgetExamples | ✅ Verified realistic composition (Gauge/Heatmap/Feed/Insight/Board in DashboardWidget) |
| DashboardWizardSplitBuilder | ✅ palette fix in btn() helper |
| MoveMenuA11yExample | ✅ No changes needed |

---

## Components mapped to existing brandbook components

None needed. All 18 have dedicated implementations.

---

## Components intentionally not migrated

None. All 18 are present.

The following Claude Design patterns were reviewed and determined to be already covered
or explicitly out of scope:
- `colors_and_type.css` — hex palette, replaced by OKLCH brandbook tokens
- `ui_kits/metraly_website/` — marketing site, separate scope
- AI Workspace / Plugins / Connectors Phase 9 components — spec-only, deferred

---

## Palette compliance

| Check | Before | After |
|-------|--------|-------|
| `var(--m-cyan)` undefined token | 6 occurrences in 2 story files | **0** |
| `var(--m-purple)` undefined token | 0 | 0 |
| `rgba()` in active UI source | 11 occurrences in 7 files | **0** |
| `rgb()` in active UI source | 0 | 0 |
| Raw hex in active UI CSS/TSX | 0 | 0 |
| Redundant `var(X, var(X))` fallbacks | 9 in metraly-heatmap.css | **0** |

**Token mapping applied:**
- `var(--m-cyan)` → `var(--m-cyan-500)`
- `rgba(255,255,255,0.08)` (chart grid) → `var(--m-line)`
- `rgba(0,229,204,0.42)` (active bar) → `color-mix(in srgb, var(--m-cyan-500) 42%, transparent)`
- `rgba(0,0,0,0.22)` (wizard shadow) → `color-mix(in srgb, black 22%, transparent)`
- `rgba(0,0,0,0.5)` (select shadow) → `color-mix(in srgb, black 50%, transparent)`
- `rgba(255,255,255,0.05)` (AIWorkspaceLayout button fallback) → `var(--m-bg-1)`

**Remaining allowed matches (non-source):**
- `site/app/foundations/colors/page.tsx` — hex strings are JSX display data for a color reference page, not CSS styling
- `site/.next/dev/` — generated build artifacts, not sources

---

## Storybook stories added/updated

**Framing added (maxWidth decorator) to 11 story files:**
- All Source/* stories: 560–700px constraints
- All Settings/* stories: 660–720px constraints
- Components/ActivityFeed, InsightCard, StateBoard: 660–720px constraints

**Pattern:** `decorators: [(Story) => React.createElement("div", { style: { maxWidth: N } }, React.createElement(Story))]`

Stories retain `layout: "padded"` for viewport padding on top of the width constraint.

---

## Visual QA notes

- **MetralyHeatmap**: color-driven intensity via CSS opacity on `::before` pseudo-element. Values hidden by default (`showCellValues = false`). Tooltip fires on hover, focus, and touch. Keyboard nav via `useRovingSelection`. Ramps verified: cyan, purple, success, warning, danger, cyan-purple-diverging, semantic.
- **MetralyGauge**: value/legend/description do not overlap (separate DOM sections with proper flex layout). bare=true by default (transparent background). Card stories use DashboardWidget wrapper. role=meter with aria-valuenow/min/max.
- **DashboardWidgetExamples**: GaugeWidgetExample, HeatmapWidgetExample, ActivityWidgetExample, InsightWidgetExample, StateBoardWidgetExample all compose their content inside DashboardWidget shell. Realistic product composition.
- **Source stories**: components now constrained to realistic panel widths. ConnectionTestPanel/SyncProgressPanel/PermissionExplainer/TokenInput/BackfillRangePicker all render within 560–700px bounds.
- **Settings stories**: AIProviderConnectorCard/BYOLLMConnectorPanel/SettingsSection within 660–720px.

---

## Validation

| Command | Result |
|---------|--------|
| `npm run ui:check` | ✅ PASS — zero TypeScript errors |
| `npm run site:typecheck` | ✅ PASS — zero TypeScript errors |
| `npm run site:test` | ✅ PASS — 44 suites, 254 tests, 0 failures |
| `npm run build-storybook` | ✅ PASS — no compile errors, output in `site/storybook-static/` |

Asset size warnings in build-storybook are pre-existing (large recharts/react-grid-layout bundles)
and are not regressions from this change.

---

## Known limitations

1. **JSX transform warning** in Jest: `Your app (or one of its dependencies) is using an outdated JSX transform`. Pre-existing, unrelated to this pass. Affects `WidgetPickerCard.tsx` (inline JSX SVG path without import). Does not cause test failures.
2. **Light theme** not verified by any story. Token contract exists; visual verification deferred.
3. **AI Workspace / Plugins Phase 9** components are spec-only. No implementation in this pass.
4. **Storybook asset size**: recharts + react-grid-layout produce large bundles. Pre-existing — not a regression.

---

## Files to delete

None.

---

## Suggested commit message

```
fix(ui): align Claude Design components with brandbook palette and framing

- Replace var(--m-cyan) → var(--m-cyan-500) in SettingsSection and
  DashboardWizardSplitBuilder stories (6 occurrences)
- Replace rgba() with brandbook tokens in 4 chart components:
  CartesianGrid stroke → var(--m-line)
  activeBar stroke → color-mix(in srgb, var(--m-cyan-500) 42%, transparent)
- Replace rgba() box-shadows in metraly-wizard.css and metraly-forms.css
  with color-mix(in srgb, black N%, transparent)
- Remove rgba fallback from AIWorkspaceLayout.tsx inline style
- Clean up redundant var(--m-X, var(--m-X)) self-fallbacks in metraly-heatmap.css
- Add maxWidth decorators (560–720px) to 11 Source/Settings/Components story metas
  so panels render at product-like widths instead of stretching full canvas
- Verify MetralyHeatmap: color ramps, tooltips, keyboard nav confirmed working
- Verify MetralyGauge: role=meter, threshold ticks, card composition confirmed
- All 44 test suites pass; build-storybook produces no compile errors
```

---

## Update — 2026-05-16 (Post-integration QA pass)

### What was audited

Full component-by-component QA against `../claudedesign/implementation-pack-viewer.html` and all 18 story files.
Checked: palette compliance, story coverage per component, widget-shell composition coverage, behavioral implementation.

### Findings

**Palette compliance:** Clean. No violations found after previous pass.
- `var(--m-cyan)` undefined token: 0 occurrences (all fixed).
- `rgba()` / `rgb()` / `hsl()` / `hsla()`: 0 occurrences in active UI source.
- Raw hex in component CSS/TSX: 0 occurrences. The `#4912` in `ActivityFeed.stories.tsx` is a PR identifier string in fixture data, not a CSS color.
- `color-mix(in oklch, ...)` in `DashboardWizardSplitBuilder.stories.tsx` lines 83, 196–197: inconsistent with `color-mix(in srgb, ...)` used elsewhere. Fixed (see below).

**Story coverage:**
- All 18 components have Storybook stories. State matrices (via `WidgetStateMatrix`) confirm all 12 canonical states are covered for chart and component primitives.
- `MetralyGauge`: 15 stories including 3 widget-shell compositions (InsideDashboardWidget, InsideSourceHealthCard, InsideDORAOverview). No gaps.
- `MetralyHeatmap`: Comprehensive coverage — color ramps, tooltips, keyboard nav, showCellValues, legend, mobile. No gaps.
- `ActivityFeed`, `InsightCard`, `StateBoard`: Had state coverage and FullStateMatrix but were missing widget-shell composition stories. **Gap found and fixed** (see below).
- All Source, Settings, and Components stories have proper `maxWidth` framing confirmed.

**DashboardWidgetExamples composition gap:**
The Storybook build emitted `/* unused harmony exports ActivityWidgetExample, InsightWidgetExample, StateBoardWidgetExample */`.
`GaugeWidgetExample` and `HeatmapWidgetExample` were used in their respective chart stories.
`ActivityWidgetExample`, `InsightWidgetExample`, `StateBoardWidgetExample` were exported from the package and implemented correctly but NOT referenced in any story.
The viewer shows `DashboardWidgetExamples` with "widget shells, recipes, dashboard" covering all 5 types. This was a real gap.

### Changes made

**Stories — new widget-shell composition stories (3 files):**
- `stories/Components/ActivityFeed.stories.tsx`: Added `ActivityWidgetExample` import and `InsideWidget` story (400px shell, 5 feed items, onDrilldown callback).
- `stories/Components/InsightCard.stories.tsx`: Added `InsightWidgetExample` import and `InsideWidget` story (420px shell, AI-grounded insight with evidence items).
- `stories/Components/StateBoard.stories.tsx`: Added `StateBoardWidgetExample` import and `InsideWidget` story (380px shell, 5-source health list view).

**Stories — color-mix consistency fix:**
- `stories/Dashboard/DashboardWizardSplitBuilder.stories.tsx` lines 83, 196–197: `color-mix(in oklch, ...)` → `color-mix(in srgb, ...)` for consistency with rest of codebase.

### Components verified unchanged

All other 15 components left unchanged — implementation and stories confirmed correct:
`WidgetStateMatrix`, `TokenInput`, `PermissionExplainer`, `BackfillRangePicker`, `ConnectionTestPanel`, `SyncProgressPanel`, `SettingsSection`, `SettingsAuditRow`, `AIProviderConnectorCard`, `BYOLLMConnectorPanel`, `MoveMenuA11yExample`, `DashboardWidgetExamples` (the container story for Gauge and Heatmap compositions was already present), `DashboardWizardSplitBuilder` (color-mix fix only).

### Validation

| Command | Result |
|---------|--------|
| `npm run ui:check` | ✅ PASS — zero TypeScript errors |
| `npm run site:typecheck` | ✅ PASS — zero TypeScript errors |
| `npm run site:test` | ✅ PASS — 44 suites, 254 tests, 0 failures |
| `npm run build-storybook` | ✅ PASS — no compile errors; `ActivityWidgetExample`, `InsightWidgetExample`, `StateBoardWidgetExample` are now referenced (no more "unused harmony exports" warning) |

### Suggested commit message for this pass

```
fix(ui): close widget composition story gaps from Claude Design QA pass

- Add InsideWidget story to ActivityFeed: uses ActivityWidgetExample in
  a 400px DashboardWidget shell with 5 feed items and drilldown callback
- Add InsideWidget story to InsightCard: uses InsightWidgetExample with
  a realistic AI-grounded delivery bottleneck insight in a 420px shell
- Add InsideWidget story to StateBoard: uses StateBoardWidgetExample
  with 5-source health data in a 380px list-variant shell
- Fix color-mix(in oklch) → color-mix(in srgb) in DashboardWizardSplitBuilder
  story btn() helper (lines 83, 196-197) for consistency with other CSS
- All 44 test suites pass; build-storybook emits no "unused exports" warning
  for the three newly-exercised DashboardWidgetExamples recipe components
```
