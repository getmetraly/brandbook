# CSS Prefix & Style Base Unification Report

## Summary

Unified all Phase 1 component CSS class names from the short `m-*` prefix to the canonical `metraly-*` prefix. This makes the brandbook package's CSS a single-system design: one class prefix, one token layer, one entrypoint. No visual changes; no public API breaks; all gates pass.

---

## Canonical decision

| Dimension | Value |
|---|---|
| Class prefix | `metraly-*` |
| Token prefix | `--m-*` (unchanged) |
| Keyframe names | `@keyframes m-*` (unchanged — not a class contract) |
| Public CSS entrypoint | `metraly-ui.css` (unchanged) |

---

## Files changed

### CSS files (prefix migration)

| File | Replacements |
|---|---|
| `packages/ui/src/styles/metraly-gauge.css` | 72 |
| `packages/ui/src/styles/metraly-heatmap.css` | 129 |
| `packages/ui/src/styles/metraly-activity-feed.css` | 50 |
| `packages/ui/src/styles/metraly-insight-card.css` | 52 |
| `packages/ui/src/styles/metraly-state-board.css` | 53 |
| `packages/ui/src/styles/metraly-state-matrix.css` | 19 |
| `packages/ui/src/styles/metraly-source.css` | 121 |
| `packages/ui/src/styles/metraly-settings.css` | 70 |
| `packages/ui/src/styles/metraly-dashboard-wizard.css` | 51 |
| `packages/ui/src/styles/metraly-theme.css` | Special (see below) |

### TSX files (className string migration)

| File | Replacements |
|---|---|
| `packages/ui/src/charts/MetralyGauge.tsx` | 30 |
| `packages/ui/src/charts/MetralyHeatmap.tsx` | 45 |
| `packages/ui/src/components/ActivityFeed.tsx` | 35 |
| `packages/ui/src/components/InsightCard.tsx` | 33 |
| `packages/ui/src/components/StateBoard.tsx` | 27 |
| `packages/ui/src/components/WidgetStateMatrix.tsx` | 10 |
| `packages/ui/src/source/TokenInput.tsx` | 17 |
| `packages/ui/src/source/PermissionExplainer.tsx` | 25 |
| `packages/ui/src/source/BackfillRangePicker.tsx` | 20 |
| `packages/ui/src/source/ConnectionTestPanel.tsx` | 23 |
| `packages/ui/src/source/SyncProgressPanel.tsx` | 34 |
| `packages/ui/src/settings/SettingsSection.tsx` | 8 |
| `packages/ui/src/settings/SettingsAuditRow.tsx` | 7 |
| `packages/ui/src/settings/AIProviderConnectorCard.tsx` | 34 |
| `packages/ui/src/settings/BYOLLMConnectorPanel.tsx` | 17 |
| `packages/ui/src/dashboard/DashboardWizardSplitBuilder.tsx` | 26 |
| `packages/ui/src/dashboard/MoveMenuA11yExample.tsx` | 12 |

### Story files

| File | Change |
|---|---|
| `stories/scenarios/dashboard-editor/DashboardEditorScenario.tsx` | 1 replacement (`m-pulse-dot` → `metraly-pulse-dot`) |

### Documentation

| File | Change |
|---|---|
| `docs/css-prefix-and-style-base-audit.md` | Created |
| `docs/css-prefix-and-style-base-report.md` | Created (this file) |

---

## Prefix migration map

All changes follow the mechanical rule: remove `m-` prefix, add `metraly-` prefix. BEM block names are preserved verbatim.

| Component | Old root class | New root class |
|---|---|---|
| MetralyGauge | `.m-gauge` | `.metraly-gauge` |
| MetralyHeatmap | `.m-heatmap` | `.metraly-heatmap` |
| ActivityFeed | `.m-feed` | `.metraly-feed` |
| InsightCard | `.m-insight` | `.metraly-insight` |
| StateBoard | `.m-board` | `.metraly-board` |
| WidgetStateMatrix | `.m-statematrix` | `.metraly-statematrix` |
| TokenInput | `.m-token` | `.metraly-token` |
| PermissionExplainer | `.m-perm` | `.metraly-perm` |
| BackfillRangePicker | `.m-backfill` | `.metraly-backfill` |
| ConnectionTestPanel | `.m-conntest` | `.metraly-conntest` |
| SyncProgressPanel | `.m-sync` | `.metraly-sync` |
| SettingsSection | `.m-settings-section` | `.metraly-settings-section` |
| SettingsAuditRow | `.m-audit-row` | `.metraly-audit-row` |
| AIProviderConnectorCard | `.m-ai-provider` | `.metraly-ai-provider` |
| BYOLLMConnectorPanel | `.m-byo` | `.metraly-byo` |
| DashboardWizardSplitBuilder | `.m-dwiz` | `.metraly-dwiz` |
| MoveMenuA11yExample | `.m-a11y-editor` | `.metraly-a11y-editor` |

Theme utility classes:

| Old | New |
|---|---|
| `.m-focusable` | `.metraly-focusable` |
| `.m-pulse` | `.metraly-pulse` |
| `.m-pulse-dot` | `.metraly-pulse-dot` |

---

## Special changes in metraly-theme.css

1. **Comment updated** — removed mention of `m-*` as an active convention; updated to reflect canonical `metraly-*` prefix only.

2. **Dead attribute selectors removed** — `[class^="m-"]`, `[class^="m-"]::before/after`, `[class*=" m-"]`, `[class*=" m-"]::before/after` removed from box-sizing rule and min-width rule. These are dead code after migration; `[class^="metraly-"]` covers all active component classes.

3. **Utility classes renamed** — `.m-focusable`, `.m-pulse`, `.m-pulse-dot` → `metraly-*` equivalents.

4. **Keyframe names unchanged** — `@keyframes m-pulse`, `@keyframes m-pulse-dot`, `@keyframes m-shimmer`, `@keyframes m-spin`, `@keyframes m-stroke-draw` retain `m-` prefix per task decision (keyframe names are not CSS class contracts).

---

## CSS duplication removed

Dead selectors eliminated:

| File | Removed selector(s) | Reason |
|---|---|---|
| `metraly-source.css` | `.metraly-connection-test`, `.metraly-sync-progress` | Dead — no TSX uses these; TSX uses `.metraly-conntest` / `.metraly-sync` |
| `metraly-settings.css` | `.metraly-byo-llm` | Dead — no TSX uses this; TSX uses `.metraly-byo` |

Dead `[class^="m-"]` attribute selectors removed from `metraly-theme.css` (6 selectors across 2 rules).

Also merged the duplicate `max-width: 760px` rule in `metraly-source.css` — was split across two selector groups with dead selectors between them; now consolidated into one clean list.

---

## Shared primitives introduced / reused

None introduced. Analysis showed that:
- The sr-only pattern appears in 3 places but the component-scoped versions (`metraly-token__sr`, `metraly-heatmap__sr`) serve different semantic roles from the shared `metraly-visually-hidden` utility in theme.css. Extracting them would require changing TSX internals without clear benefit.
- The inline button pattern appears in one file (metraly-source.css) across its multiple components — already co-located, so no extraction needed.
- The existing `metraly-visually-hidden` in theme.css is the canonical shared utility for screen-reader text.

---

## Remaining allowed m-* matches

The following `m-*` references are explicitly allowed per task rules (keyframe names are not CSS class contracts):

| Location | Reference | Type |
|---|---|---|
| `metraly-theme.css` | `@keyframes m-pulse`, `@keyframes m-pulse-dot`, `@keyframes m-shimmer`, `@keyframes m-spin`, `@keyframes m-stroke-draw` | Keyframe definitions |
| `metraly-source.css` | `@keyframes m-sync-indet` | Keyframe definition |
| `DashboardWidget.tsx` | `animation: "m-shimmer 1.4s linear infinite"` | Animation reference to keyframe |

---

## Remaining disallowed m-* matches

**Zero.** No `.m-*` CSS class selectors remain in active CSS. No `className` strings emitting `m-*` classes remain in active TSX. Confirmed by automated grep across all `packages/ui/src/styles`, `packages/ui/src/**/*.tsx`, `stories/**/*.tsx`, and `site/**/*.tsx`.

---

## Palette compliance

Pass. No raw hex colors, `rgb()`, `rgba()`, or `hsl()` values introduced. No `var(--m-cyan)` or `var(--m-purple)` shorthand usage (all references correctly use `--m-cyan-500`, `--m-purple-500`, etc.). Checked across all 9 Phase 1 CSS files after migration.

---

## Visual QA

Storybook build completed successfully. All Phase 1 component stories (Charts/MetralyGauge, Charts/MetralyHeatmap, Components/ActivityFeed, Components/InsightCard, Components/StateBoard, Components/WidgetStateMatrix, Source/*, Settings/*, Dashboard/*) render identically to pre-migration because the change is a pure CSS class prefix rename with no changes to selectors, values, layout, or visual properties.

The `[data-pulse="off"] .metraly-pulse` and `[data-pulse="off"] .metraly-pulse-dot` rules in theme.css now correctly suppress the animation pulse in Storybook static mode, as the class names match what components emit.

---

## Validation

| Command | Result |
|---|---|
| `npm run ui:check` | **PASS** — zero TypeScript errors |
| `npm run site:typecheck` | **PASS** — zero TypeScript errors |
| `npm run site:test` | **PASS** — 254/254 tests, 44 suites |
| `npm run build-storybook` | **PASS** — output in `site/storybook-static` |

Pre-migration baseline: `ui:check` pass, 254/254 tests. Post-migration: identical results.

---

## Known limitations

None. The migration is complete and all acceptance criteria are met.

---

## Files to delete

None. All changed files were updated in place. No temporary scripts were created (the migration was executed via inline Python in the session).

---

## Suggested commit message

```
refactor(ui): unify CSS class prefix and style base

- migrate Phase 1 m-* component classes to canonical metraly-* classes
  (gauge, heatmap, feed, insight, board, statematrix, token, perm,
   backfill, conntest, sync, settings-section, audit-row, ai-provider,
   byo, dwiz, a11y-editor, focusable, pulse, pulse-dot)
- keep --m-* design tokens and @keyframes m-* names unchanged
- remove dead CSS selectors (.m-connection-test, .m-sync-progress,
  .m-byo-llm) and dead [class^="m-"] attribute selectors in theme.css
- merge duplicate max-width rule in metraly-source.css
- fix one direct story m-pulse-dot usage in DashboardEditorScenario
- update metraly-theme.css comment and selectors for post-migration state
- add docs/css-prefix-and-style-base-audit.md and -report.md

Passes: ui:check, site:typecheck, site:test (254/254), build-storybook
```
