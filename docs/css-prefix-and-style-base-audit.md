# CSS Prefix & Style Base Audit

## Summary

The brandbook has two active CSS class naming conventions in play: the legacy `metraly-*` prefix used by the core shell, card, button, badge, chart-wrapper, and dashboard primitives; and a short `m-*` prefix that appeared in Phase 1 implementation-pack components (Gauge, Heatmap, ActivityFeed, InsightCard, StateBoard, WidgetStateMatrix, Source group, Settings group, Dashboard wizard group).

The canonical decision is to use `metraly-*` for all active CSS class names. CSS custom properties (`--m-*`) and keyframe names (`@keyframes m-*`) are **not** renamed — they are the canonical token layer.

---

## Current prefix inventory

### `metraly-*` class usage (pre-migration)

Active in: shell, card, button, badge, charts wrapper, dashboard, wizard, forms, navigation, metric-card, segmented, table, filter-bar, pulse-marker, code-block, etc.

Key files using `metraly-*`:
- `metraly-shell.css`, `metraly-card.css`, `metraly-button.css`, `metraly-badge.css`
- `metraly-dashboard.css`, `metraly-wizard.css`, `metraly-charts.css`
- `metraly-forms.css`, `metraly-table.css`, `metraly-navigation-tree.css`

### `m-*` class usage (Phase 1 components, pre-migration)

Found in:

| CSS file | Root block class | Component |
|---|---|---|
| `metraly-gauge.css` | `.m-gauge` | MetralyGauge |
| `metraly-heatmap.css` | `.m-heatmap` | MetralyHeatmap |
| `metraly-activity-feed.css` | `.m-feed` | ActivityFeed |
| `metraly-insight-card.css` | `.m-insight` | InsightCard |
| `metraly-state-board.css` | `.m-board` | StateBoard |
| `metraly-state-matrix.css` | `.m-statematrix` | WidgetStateMatrix |
| `metraly-source.css` | `.m-token`, `.m-perm`, `.m-backfill`, `.m-conntest`, `.m-sync` | Source primitives |
| `metraly-settings.css` | `.m-settings-section`, `.m-audit-row`, `.m-ai-provider`, `.m-byo` | Settings primitives |
| `metraly-dashboard-wizard.css` | `.m-dwiz`, `.m-a11y-editor` | Dashboard wizard |

Utility classes in `metraly-theme.css`:
- `.m-focusable` — focus-visible helper
- `.m-pulse` — animation class (controlled by `[data-pulse="off"]`)
- `.m-pulse-dot` — animation class (controlled by `[data-pulse="off"]`)

Dead selectors in CSS (no TSX counterpart):
- `.m-connection-test`, `.m-sync-progress` in `metraly-source.css` (TSX uses `.m-conntest`, `.m-sync`)
- `.m-byo-llm` in `metraly-settings.css` (TSX uses `.m-byo`)
- `.m-dashboard-widget-example` in `metraly-gauge.css` and `metraly-heatmap.css` (context selector, no active TSX counterpart)

### Files with mixed prefixes

- `metraly-gauge.css` — uses `metraly-dashboard-widget-content` (already correct) and `.m-gauge`
- `metraly-heatmap.css` — same pattern
- `packages/ui/src/charts/MetralyHeatmap.tsx` — has `className="metraly-chart-tooltip m-heatmap__tooltip"` (mixed in one className)

### Stories using `m-*` classes directly

- `stories/scenarios/dashboard-editor/DashboardEditorScenario.tsx` — `className="m-pulse-dot"` (one usage)

---

## Canonical prefix decision

- **Class prefix: `metraly-*`** (all active CSS class names)
- **Token prefix: `--m-*`** (unchanged — canonical token layer)
- **Keyframe names: `@keyframes m-*`** (unchanged — not a CSS class contract)
- **Entrypoint: `metraly-ui.css`** (unchanged)

---

## Phase 1 m-* classes found

Full class inventory to migrate (prefix-change only, BEM block names preserved):

### Charts
```
.m-gauge → .metraly-gauge (and all .m-gauge__* / .m-gauge--*)
.m-heatmap → .metraly-heatmap (and all .m-heatmap__* / .m-heatmap--*)
```

### Components
```
.m-feed → .metraly-feed (ActivityFeed)
.m-feed-frame → .metraly-feed-frame
.m-insight → .metraly-insight (InsightCard)
.m-insight-frame → .metraly-insight-frame
.m-board → .metraly-board (StateBoard)
.m-board-frame → .metraly-board-frame
.m-statematrix → .metraly-statematrix (WidgetStateMatrix)
```

### Source
```
.m-token → .metraly-token
.m-perm → .metraly-perm
.m-backfill → .metraly-backfill
.m-conntest → .metraly-conntest
.m-sync → .metraly-sync
```

### Settings
```
.m-settings-section → .metraly-settings-section
.m-audit-row → .metraly-audit-row
.m-ai-provider → .metraly-ai-provider
.m-byo → .metraly-byo
```

### Dashboard Wizard
```
.m-dwiz → .metraly-dwiz
.m-a11y-editor → .metraly-a11y-editor
```

### Theme utilities
```
.m-focusable → .metraly-focusable
.m-pulse → .metraly-pulse
.m-pulse-dot → .metraly-pulse-dot
```

---

## Duplicate style patterns

After inspecting the Phase 1 CSS files, the following patterns repeat across multiple component files:

1. **Button/action pattern** — `.m-*__btn` with height:32px, border-radius:6px, focus-visible glow appears in:
   - `metraly-source.css` (token btn, conntest btn, sync btn)
   - `metraly-settings.css` (ai-provider btn)
   - `metraly-insight-card.css` (insight btn)
   
2. **Head/title/desc pattern** — `display:flex; flex-direction:column; gap:2px;` head with title + desc appears in all 9 Phase 1 CSS files (feeds, boards, panels, etc.)

3. **sr-only / visually-hidden pattern** — absolute 1px clip appears in `metraly-source.css` (`.m-token__sr`) and `metraly-theme.css` (`.metraly-visually-hidden`)

4. **surface/card item pattern** — `padding:8-10px; border-radius:6-8px; border:1px solid var(--m-line); background:var(--m-bg-1)` appears in permission items, board items, heatmap cells, etc.

Assessment: patterns 1-4 appear in 3+ places but are component-scoped enough that extraction would not reduce meaningful duplication — the CSS is already small per-file. **No shared primitives will be extracted** at this time per the deduplication rule (extraction must not make component CSS harder to read, and none of these patterns are truly reusable as generic utilities without mixing semantic names).

The `sr-only` pattern IS a candidate — it appears identically in 2 places with a 3rd in theme. After migration I'll evaluate if it warrants a single shared definition.

---

## Migration map

Transformation rules:
- CSS: `.m-` → `.metraly-` (all class selectors; tokens and keyframe names unchanged)
- TSX: `"m-` → `"metraly-`, `` `m- `` → `` `metraly- ``, ` m-` → ` metraly-` (in className strings and template literals only)
- Dead CSS selectors to remove: `.m-connection-test`, `.m-sync-progress` (source.css), `.m-byo-llm` (settings.css)
- Theme: remove dead `[class^="m-"]` attribute selectors (box-sizing rule) — all active classes use `metraly-*` after migration

---

## Risk assessment

- **Public className risk**: Low. These Phase 1 components are in brandbook/packages/ui, not published to npm as a public package. No external consumer contract to break.
- **Visual regression risk**: Low. Pure prefix rename; no CSS values or layout properties change.
- **Storybook risk**: Low. One direct story usage of `m-pulse-dot` will be fixed atomically.
- **Test risk**: Low. Site tests do not assert on Phase 1 m-* class names (confirmed by test review).

---

## Proposed focused patch plan

1. Batch-sed all Phase 1 CSS files: `.m-` → `.metraly-`
2. Batch-sed all Phase 1 TSX files: `"m-` → `"metraly-`, `` `m- `` → `` `metraly- ``, ` m-` → ` metraly-`
3. Edit `metraly-theme.css`: rename `.m-focusable`, `.m-pulse`, `.m-pulse-dot`; remove dead `[class^="m-"]` blocks; update comment
4. Remove dead selectors from `metraly-source.css` and `metraly-settings.css`
5. Fix `stories/scenarios/dashboard-editor/DashboardEditorScenario.tsx`: `m-pulse-dot` → `metraly-pulse-dot`
6. Run validation
