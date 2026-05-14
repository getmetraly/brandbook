# Metraly UI → Brandbook Component Map

**Status:** Phase 5 overlay seams complete (`MetralyButton`, `MetralyInput`, `MetralyIcon`, `MetralyShell`, `MetralySidebar`, `MetralyTopbar`, `MetralySegmentedControl`, `MetralyNavigationTree`, `MetralyCodeBlock`, `MetralyDrawer`, `MetralyBottomSheet` shipped).  
**Last updated:** 2026-05-14  
**Companion document:** `docs/metraly-ui-to-brandbook-component-plan.md`

**Styling source rule:** `getmetraly/metraly/ui` is used only as a product inventory and composition reference. All new public `@metraly/ui` elements must derive palette, spacing, typography, radius, motion, and state treatment from brandbook tokens and contracts.

---

## Current `@metraly/ui` Public Exports

### Components

| Export | File | Category |
|---|---|---|
| `MetralyBadge` | `components/MetralyBadge.tsx` | Primitive |
| `MetralyButton` | `components/MetralyButton.tsx` | Form |
| `MetralyCard` | `components/MetralyCard.tsx` | Primitive |
| `MetralyCheckbox` | `components/MetralyCheckbox.tsx` | Form |
| `MetralyCodeBlock` | `components/MetralyCodeBlock.tsx` | Primitive |
| `MetralyIcon` | `components/MetralyIcon.tsx` | Primitive |
| `MetralyInput` | `components/MetralyInput.tsx` | Form |
| `MetralyLogo` | `components/MetralyLogo.tsx` | Primitive |
| `MetralyMetricCard` | `components/MetralyMetricCard.tsx` | Data Display |
| `MetralyNavigationTree` | `components/MetralyNavigationTree.tsx` | Navigation |
| `MetralyPanel` | `components/MetralyPanel.tsx` | Primitive |
| `MetralyRadio` | `components/MetralyRadio.tsx` | Form |
| `MetralySegmentedControl` | `components/MetralySegmentedControl.tsx` | Navigation |
| `MetralySelect` | `components/MetralySelect.tsx` | Form |
| `MetralySwitch` | `components/MetralySwitch.tsx` | Form |
| `MetralyTable` | `components/MetralyTable.tsx` | Data Display |
| `MetralyTabs` | `components/MetralyTabs.tsx` | Navigation |
| `MetralyTelemetryLine` | `components/MetralyTelemetryLine.tsx` | Data Display |
| `StateBadge` | `components/StateBadge.tsx` | Primitive |
| `ThemeProvider` / `MetralyThemeProvider` | `components/ThemeProvider.tsx` | System |
| `WidgetPickerCard` | `components/WidgetPickerCard.tsx` | Dashboard |

### Shell

| Export | File |
|---|---|
| `MetralyShell` | `shell/MetralyShell.tsx` |
| `MetralySidebar`, `MetralySidebarSection`, `MetralySidebarItem` | `shell/MetralySidebar.tsx` |
| `MetralyTopbar` | `shell/MetralyTopbar.tsx` |
| `MetralyDrawer` | `shell/MetralyDrawer.tsx` |
| `MetralyBottomSheet` | `shell/MetralyBottomSheet.tsx` |

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
| `Sidebar` | `components/layout/Sidebar.tsx` | ✅ MetralySidebar + slots |
| `Topbar` | `components/layout/Topbar.tsx` | ✅ MetralyTopbar |
| `DraggableTweaksPanel` | `components/layout/DraggableTweaksPanel.tsx` | ❌ Product-only (intentional) |

### Shared primitives

| Product component | File | Has brandbook equivalent? |
|---|---|---|
| `Icon` | `components/shared/Icon.tsx` | ✅ MetralyIcon |

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
| Metrics Explorer | `features/metricsExplorer/MetricsScreen.tsx` | ✅ Core seams shipped; full screen remains a recipe |
| FilterPill | `features/metricsExplorer/components/FilterPill.tsx` | ⚠️ MetralySelect composition or future small extension |
| TreeItem | `features/metricsExplorer/components/TreeItem.tsx` | ✅ MetralyNavigationTree |
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
| **Buttons** | `MetralyButton` | No critical gap | ✅ Done |
| **Text inputs** | `MetralyInput` | No critical gap | ✅ Done |
| **Icon system** | `MetralyIcon` + typed names | Expand only when a real product icon is missing | ✅ Done |
| **Segmented control** | `MetralySegmentedControl` | Recipe adoption only | ✅ Done |
| **App shell** | `MetralyShell` | Main-area recipe coverage only | ✅ Done |
| **Sidebar** | `MetralySidebar`, `MetralySidebarSection`, `MetralySidebarItem` | Mobile overlay recipe only | ✅ Done |
| **Topbar** | `MetralyTopbar` | Search / notification recipes only | ✅ Done |
| **Navigation tree** | `MetralyNavigationTree` | Metrics Explorer recipe adoption only | ✅ Done |
| **Code block** | `MetralyCodeBlock` | Auth/onboarding recipe adoption only | ✅ Done |
| **Overlays** | `MetralyDrawer`, `MetralyBottomSheet` | Popover still deferred | ✅ Done |
| **Gauge chart** | Nothing | MetralyGauge (deferred) | ⚪ P3 |
| **Heatmap chart** | Nothing | MetralyHeatmap (deferred) | ⚪ P3 |

Legend: ✅ Implemented · ⚪ Deferred

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
  ✅ MetralyButton             — shipped
  ✅ MetralyInput              — shipped
  ✅ MetralyIcon               — shipped
  ✅ MetralyCodeBlock          — shipped

layout / shell
  ✅ DashboardGrid             — 12-col grid (dashboard-specific)
  ✅ MetralyShell              — shipped
  ✅ MetralySidebar            — shipped
  ✅ MetralyTopbar             — shipped

navigation
  ✅ MetralyTabs               — underline tab bar
  ✅ DashboardToolbar          — dashboard tabs + actions
  ✅ MetralySegmentedControl   — shipped
  ✅ MetralyNavigationTree     — shipped

forms / controls
  ✅ MetralyCheckbox
  ✅ MetralyRadio
  ✅ MetralySwitch
  ✅ MetralySelect
  ✅ MetralyButton
  ✅ MetralyInput
  ✅ MetralySegmentedControl

data display
  ✅ MetralyTable
  ✅ MetralyMetricCard
  ✅ MetralyTelemetryLine
  ✅ MetralyBadge
  ✅ StateBadge
  ✅ chart wrappers (Area/Bar/Line/Composed/Sparkline/ChartCard/Tooltip)
  ✅ MetralyNavigationTree     — shipped
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
  ✅ MetralyIcon               — shipped

overlays
  ✅ MetralyDrawer             — shipped
  ✅ MetralyBottomSheet        — shipped
  ⚪ MetralyPopover            — Deferred

recipes / Storybook-only
  ✅ DashboardEditorScenario   — full editor desktop
  ✅ DashboardEditorResponsiveScenario — mobile/tablet
  ✅ AppShellRecipe            — `stories/MetralyShell.stories.tsx`
  ✅ MetricsExplorerRecipe     — `stories/MetricsExplorerRecipe.stories.tsx`
  ✅ AuthFormRecipe            — `stories/AuthFormRecipe.stories.tsx`
  ✅ IntegrationCardRecipe     — `stories/IntegrationCardRecipe.stories.tsx`
  ✅ WizardLayoutRecipe        — `stories/WizardLayoutRecipe.stories.tsx`

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

**Next minimal phase: responsive and migration follow-up**

1. Migration-guide expansion for screen-by-screen `metraly/ui` replacement sequencing.
2. Responsive polish pass for dashboard editor and explorer mobile layouts now that overlay seams are available.
3. Optional chart-shell recipe refinement if `MetralyChartCard` needs a denser explorer example.

Shell, foundation, explorer seams, overlay seams, and the first recipe layer are now in place. Desktop, tablet, and narrow-width recipe variants now have canonical drawer/sheet options available; remaining work is recipe adoption and migration guidance rather than new primitive invention.

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
| `MetralyDrawer` | Now justified by shell + metrics mobile navigation | Implemented |
| `MetralyBottomSheet` | Justified by widget-library style mobile workflows | Implemented |

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

Current scenario and shell stories use `MetralyIcon` names directly instead of private inline icon sets.

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

Current recipe proof state:
- `MetralyShell.stories.tsx` has desktop, tablet, and mobile variants.
- `MetricsExplorerRecipe.stories.tsx` has desktop, tablet, and mobile variants.
- `WizardLayoutRecipe.stories.tsx` has desktop, tablet, and mobile variants.
- `MetralyShell` mobile intentionally uses an app-navigation drawer pattern.
- `MetricsExplorerRecipe` tablet/mobile now uses a lighter utility-switcher overlay pattern for quick metric changes.
- `MetralyBottomSheet` is now formalized for widget-library and similar utility-panel flows.

### Current Overlay Decisions

- `MetralyShell` mobile is app-level navigation. It should keep a stronger drawer/full-app-navigation presentation and should not be visually collapsed into the same quick-switcher pattern used for narrow utility tasks.
- `MetricsExplorerRecipe` tablet/mobile uses a compact utility-switcher overlay. The goal is fast metric search and context switching, not full workspace navigation.
- `MetralyBottomSheet` is the preferred narrow utility-panel pattern when the content feels closer to widget-library, picker, or tray behavior than to navigation.
- `MetralyDrawer` remains valid for shell navigation and for utility overlays, but narrow stories may locally present it as a sheet-like popup when the interaction is “find and switch” rather than “navigate the whole app”.

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
