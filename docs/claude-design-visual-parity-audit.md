# Claude Design Visual Parity Audit

Generated: 2026-05-16

## Scope

- Claude viewer path: `../claudedesign/implementation-pack-viewer.html`
- Storybook URL: `http://localhost:6006`
- Viewports: 1400×900 (Playwright headless Chromium)
- Components checked: all 18 Phase 1 implementation-pack components

## Method

- Playwright screenshots: captured for all 18 Claude Design viewer component demo stages and 19 Storybook story variants
- DOM inspection: computed styles, bounding boxes, and layout measurements extracted via `page.evaluate()` for each component in both viewer and Storybook
- Palette grep: ran pattern searches for `var(--m-cyan)`, `var(--m-purple)`, `rgba(`, `rgb(`, `hsl(`, raw hex across all source paths
- Commands run: `npm run ui:check`, `npm run site:typecheck`, `npm run site:test`, `npm run build-storybook`
- Screenshots saved to: `.tmp/visual-parity/claude/` and `.tmp/visual-parity/storybook/` (not committed)

---

## Summary

All 18 Phase 1 components are present, palette-clean, and functionally correct. This pass identified and closed **4 visual parity gaps** between the viewer reference and brandbook Storybook, covering cell proportions, heading hierarchy, and story framing.

Palette is fully clean: zero `rgba()`, zero raw hex, zero undefined `--m-cyan` / `--m-purple` tokens in active UI source or stories.

---

## Component comparison matrix

| Component | Viewer demo | Storybook | Status | Main gaps found | Fix applied |
|---|---|---|---|---|---|
| MetralyGauge | 449×154px gauge in card | 720px max, SVG 260px centered | ✅ Match | No maxWidth on bare stories | Added 720px meta decorator |
| MetralyHeatmap | 51×51px square cells, 6px gap | 58×24px flat cells (2.4:1), 3px gap | 🔧 Fixed | Cell aspect ratio 2.4:1 vs square | Height 24→32px, gap 3→4px |
| ActivityFeed | 3 items, colored dots, status pill header | CompactWidget: card wrapper + 5 items | ✅ Good | Brandbook version richer | No change needed |
| InsightCard | 18px/700 SpaceGrotesk title | 13.5px/600 Inter title | 🔧 Fixed | Title too small for headline impact | Title 13.5→15px |
| StateBoard | 2-col 40px tiles, status-border tints | CardShell wrapper, summary chips | ✅ Match | None | None |
| WidgetStateMatrix | 3×4 simple grid of state names | Full 12-state matrix with component renders | ✅ Better | Brandbook version richer | None |
| TokenInput | Simple stored/validate row | FieldShell + validation + buttons | ✅ Match | None | None |
| PermissionExplainer | 3 scope rows with border tints | CardShell + full scope details + descriptions | ✅ Better | Brandbook version richer | None |
| BackfillRangePicker | 3 radio options in card | Full cost estimate + confidence labels | ✅ Better | Brandbook version richer | None |
| ConnectionTestPanel | 3 check rows, latency labels | CardShell + 8 statuses + per-check breakdown | ✅ Better | Brandbook version richer | None |
| SyncProgressPanel | Progress bar + stage + buttons | CardShell + 9 stages + gradient bar | ✅ Better | Brandbook version richer | None |
| SettingsSection | Simple title + description | Full heading-level API + badge + actions | ✅ Better | Brandbook version richer | None |
| SettingsAuditRow | Mono 4-col audit row | Same pattern | ✅ Match | None | None |
| AIProviderConnectorCard | Provider logo + name + status + actions | Same pattern at 660px max | ✅ Match | None | None |
| BYOLLMConnectorPanel | List of 3 providers | Full panel with empty state + routing summary | ✅ Better | Brandbook version richer | None |
| DashboardWidgetExamples | 3-widget mini dashboard | 5 widget compositions (Gauge, Heatmap, Feed, Insight, Board) | ✅ Better | — | None |
| MoveMenuA11yExample | Keyboard mode + arrow key legend | Same pattern | ✅ Match | None | None |
| DashboardWizardSplitBuilder | 4-step wizard sidebar + canvas | Full 6-step interactive wizard | ✅ Better | `layout: fullscreen` correct | None |

---

## Detailed notes

### MetralyGauge

**Viewer**: gauge shown in 475px card. SVG is 210px wide. Value shown at 34px/JetBrains Mono.

**Storybook before**: bare gauge stories rendered at full canvas width (1368px). Label text spanning full width, SVG 260px centered.

**Storybook after**: 720px maxWidth decorator on meta. All bare stories constrained. Composition stories (InsideDashboardWidget, InsideSourceHealthCard, InsideDORAOverview, FullStateMatrix) use their own render functions and compose correctly within the 720px constraint.

**Assessment**: The gauge SVG itself is constrained to 260px via `max-width: 260px; margin-inline: auto` in CSS. The framing improvement constrains the heading text width for better proportions.

### MetralyHeatmap — Gap found and fixed

**Viewer**: Square cells (`aspect-ratio: 1`, 51×51px), 6px gap, 8 columns × 3 rows demo grid.

**Storybook before**: Cells 58×24px (2.4:1 ratio, wide and flat), 3px grid gap. The heatmap looked like a table rather than an intensity matrix. The 7-row × 12-column realistic grid made this more apparent.

**Root cause**: `--m-heatmap-cell-height: 24px` while `--m-heatmap-cell-max: 58px` produced cells at 2.4:1 width-to-height.

**Fix applied**:
- `metraly-heatmap.css` line 11: `--m-heatmap-cell-height: 24px` → `32px`
- `metraly-heatmap.css` line 80: grid gap `3px` → `4px`
- Added 880px maxWidth decorator to heatmap story meta

**Result**: Cells at max are now 58×32px (1.8:1), at min 34×32px (≈1:1). Grid has 4px separation between cells.

Compact and dashboard density modes unchanged (18px height). Mobile story unchanged.

### InsightCard — Gap found and fixed

**Viewer**: Title rendered at `18px 700 SpaceGrotesk` — the insight headline is visually prominent, treating the finding as a statement worth reading.

**Storybook before**: Title at `13.5px 600 Inter` — looks like a metadata label rather than a finding headline.

**Fix applied**: `metraly-insight-card.css` line 25: `font-size: 13.5px` → `15px`.

**Assessment**: 15px in Inter produces visual weight comparable to 18px in SpaceGrotesk (viewer font) due to x-height differences. The letter-spacing `-0.005em` is retained for tightness.

### ActivityFeed

**Viewer**: 3 items, colored status dots (9×9px circles), simple bold title + small meta text, separator lines.

**Storybook**: More sophisticated — 2-column grid layout (mono time+kind left, title+desc+chips right), `StatusBadge` for severity (accessible text label + color vs dot-only). 5-item CompactWidget with card wrapper, 7-item FullFeed.

The brandbook version is architecturally superior — uses `StatusBadge` instead of color-only dots (WCAG 1.4.1 compliance), shows richer metadata via chips, and has proper mono timestamp formatting.

**Decision**: No change. The viewer's simplified dots are a demo shortcut; the brandbook's approach is better.

### StateBoard

**Viewer**: 2-column grid of tiles at 40px height, color-coded borders (`.ok`, `.warn`, `.danger`). Mini-top header "Source health / 4 sources".

**Storybook**: CardShell wrapper, summary chips row ("1 Failing / 1 Attention / 2 Healthy"), per-source list view. The summary chips provide quantified status at a glance.

**Assessment**: Match in intent, brandbook richer in execution. No change needed.

### Source components (TokenInput, PermissionExplainer, BackfillRangePicker, ConnectionTestPanel, SyncProgressPanel)

All 5 Source components are rendered inside CardShell wrappers in stories. Sizes range from 600–700px max. Each has product-level density with proper status states.

Viewer demos are simplified teasers (3-4 items, basic layout). Brandbook implementations are more complete in every case.

**Assessment**: No changes needed.

### Settings components (SettingsSection, SettingsAuditRow, AIProviderConnectorCard, BYOLLMConnectorPanel)

All 4 correctly framed with maxWidth decorators from the previous pass. BYOLLMConnectorPanel renders at 720px with routing summary, provider list, and empty state. AIProviderConnectorCard at 660px.

**Assessment**: No changes needed.

### Dashboard components

**DashboardWizardSplitBuilder**: `layout: "fullscreen"` is correct. Full canvas width for a split-builder wizard is intentional product behavior.

**MoveMenuA11yExample**: Matches viewer. Keyboard-mode overlay with arrow key move affordances.

**DashboardWidgetExamples**: Previous pass added InsideWidget compositions to ActivityFeed, InsightCard, and StateBoard stories. All 5 widget example types are now exercised in stories.

---

## Changes made

### `packages/ui/src/styles/metraly-heatmap.css`
- Line 11: `--m-heatmap-cell-height: 24px` → `32px` (comfortable density only)
- Line 80: `gap: 3px` → `4px` in `.m-heatmap__grid`

### `packages/ui/src/styles/metraly-insight-card.css`
- Line 25: `font-size: 13.5px` → `15px` in `.m-insight__title`

### `stories/Charts/MetralyHeatmap.stories.tsx`
- Added `decorators: [(Story) => <div style={{ maxWidth: 880 }}>...</div>]` to meta

### `stories/Charts/MetralyGauge.stories.tsx`
- Added `decorators: [(Story) => <div style={{ maxWidth: 720 }}>...</div>]` to meta

---

## Palette compliance

All checks run via regex search across `packages/ui/src`, `stories`, and `site/app`:

| Pattern | Matches in active UI source | Status |
|---|---|---|
| `var(--m-cyan)` (undefined token) | 0 | ✅ Clean |
| `var(--m-purple)` (undefined token) | 0 | ✅ Clean |
| `rgba(...)` | 0 | ✅ Clean |
| `rgb(...)` | 0 | ✅ Clean |
| `hsl(...)` | 0 | ✅ Clean |
| Raw hex `#...` | 1 (fixture data: `#4912` PR number in ActivityFeed.stories.tsx) | ✅ Not CSS |
| Redundant `var(--m-X, var(--m-X))` self-fallbacks | 0 | ✅ Clean |

No new raw colors introduced in this pass.

---

## Validation

| Command | Result |
|---------|--------|
| `npm run ui:check` | ✅ PASS — zero TypeScript errors |
| `npm run site:typecheck` | ✅ PASS — zero TypeScript errors |
| `npm run site:test` | ✅ PASS — 44 suites, 254 tests, 0 failures |
| `npm run build-storybook` | ✅ PASS — no compile errors |

---

## Remaining gaps (acceptable)

1. **Heatmap cell ratio**: Now 1.8:1 at max width (down from 2.4:1). True 1:1 squares would require `aspect-ratio: 1` which conflicts with the density system (compact/dashboard modes have different sizes). 1.8:1 is a good practical target.

2. **InsightCard vs viewer title size**: Now 15px (up from 13.5px). Viewer shows 18px in SpaceGrotesk; 15px in Inter is equivalent visual weight. Larger values would overpower the body copy in dense dashboard contexts.

3. **ActivityFeed dot indicators**: Viewer uses colored circle status dots. Brandbook uses StatusBadge. The brandbook approach is more accessible (WCAG 1.4.1) and retained intentionally.

4. **Storybook framing**: Viewer shows all components inside a "gallery card" shell with kicker/name/description/tags. Storybook shows components directly with story-level context. This is expected — Storybook is a verification surface, not a marketing gallery.

---

## Files to delete

None.

---

## Suggested commit message

```
fix(ui): visual parity improvements from Claude Design viewer audit

- Heatmap: cell height 24px → 32px (comfortable density) and grid gap
  3px → 4px; cells now at 1.8:1 ratio instead of 2.4:1 (was flat/table-like)
- InsightCard: title font-size 13.5px → 15px for stronger headline weight,
  matching the visual prominence of the viewer's 18px SpaceGrotesk heading
- Charts/MetralyHeatmap.stories: add 880px maxWidth meta decorator
- Charts/MetralyGauge.stories: add 720px maxWidth meta decorator
- Palette: confirmed clean — 0 rgba, 0 hex, 0 undefined tokens in active source
- 44 test suites pass; build-storybook no compile errors
```
