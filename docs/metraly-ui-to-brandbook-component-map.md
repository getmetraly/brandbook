# Metraly UI → Brandbook Component Map

**Status:** Phase 0 complete.  
**Last updated:** 2026-05-14  
**Companion document:** `docs/metraly-ui-to-brandbook-component-plan.md`

---

## Current `@metraly/ui` Public Exports

### Components

| Export | File | Category |
|---|---|---|
| `MetralyBadge` | `components/MetralyBadge.tsx` | Primitive |
| `MetralyCard` | `components/MetralyCard.tsx` | Primitive |
| `MetralyCheckbox` | `components/MetralyCheckbox.tsx` | Form |
| `MetralyLogo` | `components/MetralyLogo.tsx` | Primitive |
| `MetralyMetricCard` | `components/MetralyMetricCard.tsx` | Data Display |
| `MetralyPanel` | `components/MetralyPanel.tsx` | Primitive |
| `MetralyRadio` | `components/MetralyRadio.tsx` | Form |
| `MetralySelect` | `components/MetralySelect.tsx` | Form |
| `MetralySwitch` | `components/MetralySwitch.tsx` | Form |
| `MetralyTable` | `components/MetralyTable.tsx` | Data Display |
| `MetralyTabs` | `components/MetralyTabs.tsx` | Navigation |
| `MetralyTelemetryLine` | `components/MetralyTelemetryLine.tsx` | Data Display |
| `StateBadge` | `components/StateBadge.tsx` | Primitive |
| `ThemeProvider` / `MetralyThemeProvider` | `components/ThemeProvider.tsx` | System |
| `WidgetPickerCard` | `components/WidgetPickerCard.tsx` | Dashboard |

### Dashboard

| Export | File |
|---|---|
| `DashboardGrid` | `dashboard/DashboardGrid.tsx` |
| `DashboardWidget` | `dashboard/DashboardWidget.tsx` |
| `DashboardToolbar` | `dashboard/DashboardToolbar.tsx` |
| `DashboardEmptyState` | `dashboard/DashboardEmptyState.tsx` |
| `DashboardDropZone` | `dashboard/DashboardDropZone.tsx` |
| `DashboardResizeHandle` | `dashboard/DashboardResizeHandle.tsx` |
| `defaultDashboardWidgetRegistry`, `findDashboardWidgetDefinition`, `createDashboardWidgetInstance` | `dashboard/WidgetRegistry.ts` |
| Types: `DashboardLayoutItem`, `DashboardWidgetDefinition`, `DashboardWidgetInstance`, `DashboardWidgetSize` | `dashboard/types.ts` |

### Charts

| Export | File |
|---|---|
| `MetralyAreaChart` | `charts/MetralyAreaChart.tsx` |
| `MetralyBarChart` | `charts/MetralyBarChart.tsx` |
| `MetralyChartCard` | `charts/MetralyChartCard.tsx` |
| `MetralyChartTooltip` | `charts/MetralyChartTooltip.tsx` |
| `MetralyComposedChart` | `charts/MetralyComposedChart.tsx` |
| `MetralyLineChart` | `charts/MetralyLineChart.tsx` |
| `MetralySparkline` | `charts/MetralySparkline.tsx` |

---

## Product UI Inventory (`getmetraly/metraly/ui`)

### Layout components

| Product component | File | Has brandbook equivalent? |
|---|---|---|
| `Sidebar` | `components/layout/Sidebar.tsx` | ❌ Missing: MetralySidebar |
| `Topbar` | `components/layout/Topbar.tsx` | ❌ Missing: MetralyTopbar |
| `DraggableTweaksPanel` | `components/layout/DraggableTweaksPanel.tsx` | ❌ Product-only (intentional) |

### Shared primitives

| Product component | File | Has brandbook equivalent? |
|---|---|---|
| `Icon` | `components/shared/Icon.tsx` | ❌ Missing: MetralyIcon |

### UI primitives

| Product component | File | Has brandbook equivalent? |
|---|---|---|
| `Badge` | `components/ui/Badge.tsx` | ✅ MetralyBadge |
| `DataTable` | `components/ui/DataTable.tsx` | ✅ MetralyTable |
| `DORABadge` | `components/ui/DORABadge.tsx` | ✅ StateBadge |
| `StatCard` | `components/ui/StatCard.tsx` | ✅ MetralyMetricCard |
| `Widget` | `components/ui/Widget.tsx` | ✅ DashboardWidget |
| `AIInsightCard` | `components/ui/AIInsightCard.tsx` | ❌ Product-only (MetralyCard + recipe) |
| `InlineInsight` | `components/ui/InlineInsight.tsx` | ❌ Product-only (MetralyPanel + recipe) |
| `Leaderboard` | `components/ui/Leaderboard.tsx` | ✅ MetralyTable (dense, ranked) |
| `PlaceholderScreen` | `components/ui/PlaceholderScreen.tsx` | ✅ MetralyPanel (pattern recipe) |
| `SH` | `components/ui/SH.tsx` | Likely DashboardWidget header slot |

### Charts

| Product component | File | Has brandbook equivalent? |
|---|---|---|
| `AreaChart` | `components/charts/AreaChart.tsx` | ✅ MetralyAreaChart |
| `BarChart` | `components/charts/BarChart.tsx` | ✅ MetralyBarChart |
| `Gauge` | `components/charts/Gauge.tsx` | ❌ Not in brandbook yet |
| `Heatmap` | `components/charts/Heatmap.tsx` | ❌ Not in brandbook yet |
| `Sparkline` | `components/charts/Sparkline.tsx` | ✅ MetralySparkline |

### Dashboard

| Product component | File | Has brandbook equivalent? |
|---|---|---|
| `DashboardRenderer` | `components/dashboard/DashboardRenderer.tsx` | ✅ DashboardGrid (adapter pattern) |
| `DraggableDashboardRenderer` | `components/dashboard/DraggableDashboardRenderer.tsx` | ✅ DashboardGrid (adapter pattern) |
| `widgetRegistry` | `components/dashboard/widgetRegistry.tsx` | ✅ WidgetRegistry + types |

### Screens and features

| Product screen | Files | Has brandbook equivalent? |
|---|---|---|
| Dashboard Screen | `features/dashboard/DashboardScreen.tsx` | ✅ Recipe composition (DashboardGrid + DashboardWidget etc.) |
| Dashboard Wizard | `features/dashboardWizard/*` | ❌ Product-only (wizard logic) |
| Board/Editor | `features/board/ui/*` | ✅ Board uses @metraly/ui primitives directly |
| Metrics Explorer | `features/metricsExplorer/MetricsScreen.tsx` | ❌ Missing: MetralyNavigationTree, MetralySegmentedControl |
| FilterPill | `features/metricsExplorer/components/FilterPill.tsx` | ⚠️ MetralySelect (needs labelPrefix) |
| TreeItem | `features/metricsExplorer/components/TreeItem.tsx` | ❌ Missing: MetralyNavigationTree |
| DORAPanel | `features/metricsExplorer/components/DORAPanel.tsx` | ✅ MetralyMetricCard + StateBadge (recipe) |
| BreakdownTable | `features/metricsExplorer/components/BreakdownTable.tsx` | ✅ MetralyTable |
| ExportBar | `features/metricsExplorer/components/ExportBar.tsx` | ❌ MetralyButton + MetralySelect recipe |
| AI Assistant | `features/aiAssistant/AIScreen.tsx` | ❌ Product-only |
| Marketplace | `features/marketplace/PluginScreen.tsx` | ✅ MetralyCard + MetralyButton recipe |
| Onboarding Wizard | `features/onboarding/WizardScreen.tsx` | ❌ Product-only |

---

## Component Gap Matrix

| Category | What exists in brandbook | What is missing | Priority |
|---|---|---|---|
| **Buttons** | Nothing | MetralyButton (all variants) | 🔴 P0 |
| **Text inputs** | Nothing | MetralyInput | 🔴 P0 |
| **Icon system** | Nothing | MetralyIcon (50+ icons) | 🔴 P0 |
| **Segmented control** | Nothing | MetralySegmentedControl | 🟡 P1 |
| **App shell** | Nothing | MetralyShell | 🟡 P1 |
| **Sidebar** | Scenario code only | MetralySidebar (public API) | 🟡 P1 |
| **Topbar** | Scenario code only | MetralyTopbar (public API) | 🟡 P1 |
| **Navigation tree** | Nothing | MetralyNavigationTree | 🟠 P2 |
| **Code block** | Nothing | MetralyCodeBlock | 🟠 P2 |
| **Overlays** | Nothing | Drawer / bottom sheet (deferred) | ⚪ P3 |
| **Gauge chart** | Nothing | MetralyGauge (deferred) | ⚪ P3 |
| **Heatmap chart** | Nothing | MetralyHeatmap (deferred) | ⚪ P3 |

Legend: 🔴 Implement in Phase 1 · 🟡 Phase 2 · 🟠 Phase 4 · ⚪ Deferred

---

## Proposed Minimal Component Taxonomy (Post-Plan)

```
primitives
  ✅ MetralyBadge              — inline badge
  ✅ MetralyCard               — content card shell
  ✅ MetralyPanel              — panel container
  ✅ MetralyMetricCard         — metric value + delta + spark
  ✅ StateBadge                — 13-state operational badge
  ✅ MetralyLogo               — logo mark
  ✅ MetralyTelemetryLine      — telemetry row
  ✅ ThemeProvider             — token injection
  ❌ MetralyButton             — MISSING → implement Phase 1
  ❌ MetralyInput              — MISSING → implement Phase 1
  ❌ MetralyIcon               — MISSING → implement Phase 1
  ❌ MetralyCodeBlock          — MISSING → implement Phase 4

layout / shell
  ✅ DashboardGrid             — 12-col grid (dashboard-specific)
  ❌ MetralyShell              — MISSING → implement Phase 2
  ❌ MetralySidebar            — MISSING → implement Phase 2
  ❌ MetralyTopbar             — MISSING → implement Phase 2

navigation
  ✅ MetralyTabs               — underline tab bar
  ✅ DashboardToolbar          — dashboard tabs + actions
  ❌ MetralySegmentedControl   — MISSING → implement Phase 3
  ❌ MetralyNavigationTree     — MISSING → implement Phase 4

forms / controls
  ✅ MetralyCheckbox
  ✅ MetralyRadio
  ✅ MetralySwitch
  ✅ MetralySelect
  ❌ MetralyButton             — MISSING → implement Phase 1
  ❌ MetralyInput              — MISSING → implement Phase 1

data display
  ✅ MetralyTable
  ✅ MetralyMetricCard
  ✅ MetralyTelemetryLine
  ✅ MetralyBadge
  ✅ StateBadge
  ✅ chart wrappers (Area/Bar/Line/Composed/Sparkline/ChartCard/Tooltip)
  ❌ MetralyNavigationTree     — MISSING → implement Phase 4
  ⚪ MetralyGauge              — Deferred
  ⚪ MetralyHeatmap            — Deferred

dashboard / editor
  ✅ DashboardGrid
  ✅ DashboardWidget
  ✅ DashboardToolbar
  ✅ DashboardEmptyState
  ✅ DashboardDropZone
  ✅ DashboardResizeHandle
  ✅ WidgetPickerCard
  ✅ WidgetRegistry types + helpers
  — all dashboard/editor primitives are complete

icons
  ❌ MetralyIcon               — MISSING → implement Phase 1

overlays
  ⚪ MetralyDrawer             — Deferred (mobile)
  ⚪ MetralyBottomSheet        — Deferred (mobile)
  ⚪ MetralyPopover            — Deferred

recipes / Storybook-only
  ✅ DashboardEditorScenario   — full editor desktop
  ✅ DashboardEditorResponsiveScenario — mobile/tablet
  ❌ AppShellRecipe            — MISSING → Phase 6
  ❌ MetricsExplorerRecipe     — MISSING → Phase 6
  ❌ AuthFormRecipe            — MISSING → Phase 6
  ❌ IntegrationCardRecipe     — MISSING → Phase 6
  ❌ WizardLayoutRecipe        — MISSING → Phase 6

product-only compositions (stay in metraly/ui)
  • DraggableTweaksPanel
  • AIScreen (chat UI)
  • WizardScreen (onboarding)
  • DashboardWizardScreen
  • DashboardRenderer / DraggableDashboardRenderer
  • PluginScreen notification channel config
  • First-run choice screen
```

---

## What to Implement Now

**Phase 1 — Foundation Primitives (can start immediately):**

1. `MetralyButton` — variants: primary, secondary, ghost, danger, dashed; states: default/hover/focus/disabled/loading
2. `MetralyInput` — types: text/search/password/email; states: default/focus/error/disabled; icon slots
3. `MetralyIcon` — 50+ typed SVG icons from metraly/ui Icon.tsx; typed `MetralyIconName`

These three are additive, zero-risk, and prerequisite for all subsequent work.

---

## What to Document as Recipes

The following are **not** public exports. They appear as Storybook recipe stories (Phase 6):

- **AppShellRecipe** — how to assemble MetralyShell + MetralySidebar + MetralyTopbar
- **AuthFormRecipe** — login form using MetralyInput + MetralyButton + MetralyCodeBlock
- **IntegrationCardRecipe** — plugin card using MetralyCard + MetralyButton + MetralyIcon
- **WizardLayoutRecipe** — multi-step wizard layout using MetralyPanel + MetralyButton
- **MetricsExplorerRecipe** — full explorer assembly using MetralyNavigationTree + MetralySegmentedControl
- **AIChatRecipe** — chat layout sketch (product-specific, minimal story)

---

## What NOT to Add to `packages/ui`

These are explicitly **rejected from public API**:

| Component | Reason | Alternative |
|---|---|---|
| `DraggableTweaksPanel` | Developer tool, mutates CSS vars, localStorage-dependent | Keep in metraly/ui |
| `AIScreen` / `MessageBubble` | Product-specific chat UI | MetralyPanel + MetralyBadge + MetralyIcon (recipe) |
| `WizardScreen` | Product-specific multi-screen onboarding flow | Keep in metraly/ui |
| `DashboardWizardScreen` | Product-specific wizard with API integration | Keep in metraly/ui |
| `DashboardRenderer` | react-grid-layout integration (product logic) | DashboardGrid + recipe adapter |
| `MetricsExplorerSidebar` | Too narrow; one product screen | MetralySidebar + MetralyNavigationTree |
| `ProductTopbar` | Duplicate of MetralyTopbar | MetralyTopbar with actions slot |
| `DashboardEditorOnlySidebar` | Already covered by Storybook scenario | ScenarioWidgetLibrary recipe |
| `AIOnlyCard` | Product-specific | MetralyCard composition |
| `MarketplaceOnlyPanel` | Product-specific | MetralyCard + MetralyButton recipe |
| `MetralyNotificationButton` | Too narrow; MetralyButton + badge covers it | MetralyButton + MetralyBadge |
| `MetralyUserBlock` | Product-specific avatar block | Sidebar footer slot |
| `MetralyCommandSearch` | Too narrow; MetralyInput covers it | MetralyInput with iconLeft + kbd slot |
| `MetralyDrawer` | Deferred until mobile product requires it | Deferred |
| `MetralyBottomSheet` | Deferred until mobile product requires it | Deferred |

---

## Token Migration Notes (Legacy → Brandbook)

When migrating metraly/ui to use `@metraly/ui`, replace all legacy CSS variables:

```css
/* Legacy → Brandbook */
--bg           → --m-bg-0
--glass        → --m-bg-1
--glass2       → --m-bg-2
--border       → --m-line
--border2      → --m-line-strong
--border-bright→ --m-line-strong
--cyan         → --m-cyan-500
--purple       → --m-purple-500
--success      → --m-ok
--warning      → --m-warn
--error        → --m-err
--text         → --m-fg-0
--muted        → --m-fg-3
--muted2       → --m-fg-2
--grad         → linear-gradient(135deg, var(--m-cyan-500), var(--m-purple-500))
--font-body    → --m-font-ui
--font-mono    → --m-font-mono
```

Note: `--font-head` (Space Grotesk) is not in brandbook tokens. Either add it to `metraly-theme.css` as `--m-font-head` or reference the font family directly in product code.

---

## Icon Coverage / Missing Icons

Product `Icon.tsx` currently defines these icons (must all appear in `MetralyIconName`):

```
zap, home, bar2, gitPR, xCircle, alertTri, clock, brain, puzzle, settings,
users, bell, search, star, download, check, github, jira, gitlab, linear,
slack, pagerduty, arrowRight, chevronDown, chevronUp, activity, boxes, cpu,
trendingUp, filter, layers, chart, plus, x, database, link, sparkles, rocket,
alertCircle, lock, checkCircle, timer, gitMerge, gitPullRequest, gitCommit,
heart, target, pin, pinFilled, square
```

Storybook scenario (DashboardEditorScenario) uses additional inline-defined icons:
```
grid, metric, lightning, log, refresh, user, check (already above)
```

Total to cover: ~54 icon names.

---

## Responsive Shell Requirements

From `docs/responsive-contract.md` and product code:

| Element | Desktop | Tablet (768px) | Mobile (375px) |
|---|---|---|---|
| MetralySidebar | 228px expanded, 64px collapsed | Overlay drawer | Full-screen drawer |
| MetralyTopbar | 48–64px height, density-driven | Same | Compact; search may hide behind action |
| MetralyShell | `display: flex; overflow: hidden` | Same | `flex-direction: column` |
| DashboardGrid | 12-col, 100px row, 16px gap | 10-col | 6-col |
| DashboardWidget | Compact multi-col | Same | Full-width stacked |
| MetralySegmentedControl | Inline row | Same | May wrap |
| MetralyNavigationTree | 220px fixed left rail | Overlay | Full-screen drawer |
| MetralyTabs / DashboardToolbar | Single row | Horizontal scroll | Horizontal scroll |

---

## Storybook Verification URLs

After Phase 1 implementation:
- `/story/metraly-button--all-variants`
- `/story/metraly-input--types`
- `/story/metraly-icon--gallery`

After Phase 2:
- `/story/metraly-shell--app-shell-recipe`
- `/story/metraly-sidebar--expanded`
- `/story/metraly-sidebar--collapsed`
- `/story/metraly-topbar--density-variants`

After Phase 3:
- `/story/metraly-segmented-control--default`

After Phase 4:
- `/story/metraly-navigation-tree--metric-tree`
- `/story/metraly-code-block--cli-block`

Existing passing scenarios (do not regress):
- `/story/scenarios-dashboard-editor--desktop`
- `/story/scenarios-dashboard-editor--mobile-1`
- `/story/scenarios-dashboard-editor--mobile-2`
- `/story/dashboard-widget--component-state-board`

---

## Migration Path for Future Rewrite of `metraly/ui`

### Step 1: Token bootstrap (no UI changes)
- Add `@metraly/ui` as dependency
- Wrap `App.jsx` in `<ThemeProvider>`
- Replace all `--bg`, `--glass`, `--border`, etc. with `--m-*` equivalents in `index.css`
- Verify: app renders identically

### Step 2: Icon swap (no visual changes)
- Replace `Icon.tsx` import with `MetralyIcon` from `@metraly/ui`
- TypeScript catches any unknown icon names
- Verify: all icons render

### Step 3: Form controls (progressive)
- Replace inline `<input type="checkbox">` with `MetralyCheckbox`
- Replace inline `<input type="radio">` with `MetralyRadio`
- Replace toggle buttons with `MetralySwitch`
- Replace `<select>` with `MetralySelect`

### Step 4: Buttons and inputs (Phase 1 prerequisite)
- Requires Phase 1 to ship first
- Replace all inline-styled `<button>` with `MetralyButton`
- Replace all inline-styled `<input>` with `MetralyInput`
- This is the highest-volume change — 200+ instances

### Step 5: Layout (Phase 2 prerequisite)
- Requires Phase 2 to ship first
- Replace `Sidebar.tsx` with `MetralySidebar`
- Replace `Topbar.tsx` with `MetralyTopbar`
- Wrap in `MetralyShell`
- Remove `DraggableTweaksPanel` from production path (keep for demo only)

### Step 6: Metric displays
- Replace `StatCard` with `MetralyMetricCard`
- Replace `DORABadge` with `StateBadge`
- Replace `Badge` with `MetralyBadge`
- Replace `Leaderboard` with `MetralyTable` (dense, ranked variant)
- Replace `DataTable` with `MetralyTable`

### Step 7: Metrics Explorer (Phase 4 prerequisite)
- Requires `MetralyNavigationTree` and `MetralySegmentedControl`
- Replace `TreeItem` with `MetralyNavigationTree`
- Replace inline time-range controls with `MetralySegmentedControl`
- Replace `FilterPill` with `MetralySelect` (labelPrefix variant)

### Step 8: Product-specific (never migrate to brandbook)
- Keep `DraggableTweaksPanel`, `AIScreen`, `WizardScreen`, `DashboardWizardScreen`, `DashboardRenderer`, `DraggableDashboardRenderer`, and screen-specific product compositions in `metraly/ui`
