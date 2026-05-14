# Metraly UI → Brandbook Component Plan

**Status:** Phase 0 planning complete; Phases 1 through 5 reusable seams are implemented in `packages/ui`.  
**Last updated:** 2026-05-14  
**Author:** Design-system audit — session May 14 2026

**Implementation note:** `getmetraly/metraly/ui` remains a source inventory only. Public `@metraly/ui` styling must be canonical to brandbook tokens, CSS contracts, and Storybook/state-board behavior rather than copied from product-side inline styles.

---

## 1. Source Inventory

### Files inspected in `getmetraly/brandbook`

**Source packages**
- `packages/ui/src/index.ts` — full public API surface
- `packages/ui/src/components/*` — 14 components
- `packages/ui/src/dashboard/*` — 7 dashboard components + types + registry
- `packages/ui/src/charts/*` — 7 chart components + types
- `packages/ui/src/styles/*` — 11 CSS files including `metraly-theme.css`

**Documentation**
- `docs/component-contract.md`
- `docs/responsive-contract.md`
- `docs/storybook-contract.md`
- `docs/design-principles.md`
- `docs/prototype-visual-spec.md`
- `docs/prototype-parity-audit.md`
- `docs/composition-patterns.md`
- `docs/component-design-recipes.md`
- `docs/source-of-truth.md`
- `docs/migration/prototype-source-rebuild.md`

**Storybook scenarios**
- `stories/scenarios/dashboard-editor/DashboardEditorScenario.tsx` — full editor with ScenarioSidebar, ScenarioTopbar, ScenarioWidgetLibrary
- `stories/scenarios/dashboard-editor/DashboardEditorResponsiveScenario.tsx`
- `stories/scenarios/dashboard-editor/DashboardEditorStoryScenario.tsx`
- All root-level `.stories.tsx` files (ChartWrappers, Dashboard, DashboardDropZone, DashboardToolbar, DashboardWidget, FoundationTokens, MetralyCard, MetralyControlStates, MetralyForms, MetralyTable, StateBadge, WidgetPickerCard)

### Files inspected in `getmetraly/metraly/app/ui`

**App entrypoints**
- `ui/src/App.jsx` — full product shell (sidebar + topbar + screens)
- `ui/src/App.tsx` — board/editor flow entry
- `ui/src/index.css` — legacy CSS variables and global resets

**Layout**
- `ui/src/components/layout/Sidebar.tsx`
- `ui/src/components/layout/Topbar.tsx`
- `ui/src/components/layout/DraggableTweaksPanel.tsx`

**Icons and shared**
- `ui/src/components/shared/Icon.tsx` — 50+ SVG path icons

**Dashboard and renderers**
- `ui/src/components/dashboard/DashboardRenderer.tsx`
- `ui/src/components/dashboard/DraggableDashboardRenderer.tsx`
- `ui/src/components/dashboard/widgetRegistry.tsx`
- `ui/src/features/dashboard/DashboardScreen.tsx`

**Dashboard editor**
- `ui/src/features/dashboardEditor/catalog.ts`
- `ui/src/features/dashboardEditor/model.ts`
- `ui/src/features/dashboardEditor/widgetConfig.ts`

**Dashboard wizard**
- `ui/src/features/dashboardWizard/DashboardWizardScreen.tsx`
- `ui/src/features/dashboardWizard/store/wizardStore.ts`
- `ui/src/features/dashboardWizard/components/*`

**Board/editor**
- `ui/src/features/board/ui/BoardScreen.tsx`
- `ui/src/features/board/ui/BoardRenderer.tsx`
- `ui/src/features/board/ui/WidgetRegistry.tsx`
- `ui/src/features/board/boardContext.tsx`

**Metrics Explorer**
- `ui/src/features/metricsExplorer/MetricsScreen.tsx`
- `ui/src/features/metricsExplorer/components/FilterPill.tsx`
- `ui/src/features/metricsExplorer/components/TreeItem.tsx`
- `ui/src/features/metricsExplorer/components/DORAPanel.tsx`
- `ui/src/features/metricsExplorer/components/BreakdownTable.tsx`
- `ui/src/features/metricsExplorer/components/ExportBar.tsx`

**Other screens**
- `ui/src/features/aiAssistant/AIScreen.tsx`
- `ui/src/features/marketplace/PluginScreen.tsx`
- `ui/src/features/onboarding/WizardScreen.tsx`

**UI primitives**
- `ui/src/components/ui/AIInsightCard.tsx`
- `ui/src/components/ui/Badge.tsx`
- `ui/src/components/ui/DataTable.tsx`
- `ui/src/components/ui/DORABadge.tsx`
- `ui/src/components/ui/InlineInsight.tsx`
- `ui/src/components/ui/Leaderboard.tsx`
- `ui/src/components/ui/StatCard.tsx`
- `ui/src/components/ui/Widget.tsx`

**Charts**
- `ui/src/components/charts/AreaChart.tsx`
- `ui/src/components/charts/BarChart.tsx`
- `ui/src/components/charts/Gauge.tsx`
- `ui/src/components/charts/Heatmap.tsx`
- `ui/src/components/charts/Sparkline.tsx`

**Files not inspected**
- `DashboardRenderer.tsx` and `DraggableDashboardRenderer.tsx` — deferred; react-grid-layout integration is product-side logic, not design-system logic
- `BoardScreen.tsx` and `BoardRenderer.tsx` — deferred; board flow will eventually merge with the product shell; primitives covered by existing plan
- Individual chart implementations inside brandbook charts/ — architecture is known from types.ts and chart stories

---

## 2. Existing Design-System Map

### Current `@metraly/ui` public exports

**Components (14)**

| Component | Purpose |
|---|---|
| `MetralyBadge` | Inline text badge, variants: default/cyan/purple/ok/warn/err/ghost |
| `MetralyCard` | Content card shell with density/state props |
| `MetralyCheckbox` | Branded checkbox |
| `MetralyLogo` | Logo mark with wordmark variant |
| `MetralyMetricCard` | Metric display card with value/delta/unit/sparkline |
| `MetralyPanel` | Panel container with padding variants |
| `MetralyRadio` | Branded radio |
| `MetralySelect` | Styled native select or custom dropdown |
| `MetralySwitch` | Toggle switch |
| `MetralyTable` | Data table with stickyHeader, dense, row markers |
| `MetralyTabs` | Tab bar component |
| `MetralyTelemetryLine` | Inline telemetry row (label + value + trend + bar) |
| `StateBadge` | 13-state operational badge (live/stale/error/new/etc.) |
| `ThemeProvider` / `MetralyThemeProvider` | CSS variable theme injection |
| `WidgetPickerCard` | Widget library card with kind/description/selected/disabled/visualState |

**Dashboard (7)**

| Component | Purpose |
|---|---|
| `DashboardGrid` | 12-column grid shell |
| `DashboardWidget` | Widget shell with header/state/drag/resize/selection |
| `DashboardToolbar` | Dashboard tabs + search + sync + edit controls |
| `DashboardEmptyState` | Empty dashboard placeholder |
| `DashboardDropZone` | Drop target for widget library |
| `DashboardResizeHandle` | Directional resize affordance overlay |
| `WidgetRegistry` (types + helpers) | Registry types and helpers |

**Shell / overlays**

| Component | Purpose |
|---|---|
| `MetralyShell` | Top-level app shell composition root |
| `MetralySidebar` | Left-rail navigation shell with sections/items |
| `MetralyTopbar` | Page header and action row |
| `MetralyDrawer` | Narrow-width navigation / utility overlay |
| `MetralyBottomSheet` | Mobile utility sheet for widget-library style workflows |

**Charts (7)**

| Component | Purpose |
|---|---|
| `MetralyAreaChart` | Area/line chart (Recharts) |
| `MetralyBarChart` | Bar chart |
| `MetralyChartCard` | Chart wrapper card with header/actions |
| `MetralyChartTooltip` | Shared chart tooltip |
| `MetralyComposedChart` | Multi-type composed chart |
| `MetralyLineChart` | Line-only chart |
| `MetralySparkline` | Inline sparkline |

### CSS / Token Architecture

**Dual-layer token system** (metraly-theme.css):
- Backgrounds: `--m-bg-0` through `--m-bg-4` (oklch, dark)
- Foregrounds: `--m-fg-0` through `--m-fg-4`
- Lines: `--m-line-faint`, `--m-line`, `--m-line-strong`
- Cyan: `--m-cyan-700/500/400/glow/bg`
- Purple: `--m-purple-700/500/400/glow/bg`
- Status: `--m-ok/warn/err` + bg variants
- Spacing: `--m-1` (4px) through `--m-9` (48px)
- Radius: `--m-r-1` (3px) through `--m-r-5` (14px)
- Motion: `--m-ease`, `--m-dur-1/2/3`
- Control height: `--m-control-h: 30px`, row height: `--m-row-h: 32px`
- Typography: `--m-font-ui`, `--m-font-mono`, scaled font sizes `--m-fs-9` through `--m-fs-24`

### Storybook-only scenario code

The `DashboardEditorScenario` already provides:
- `ScenarioSidebar` — left navigation rail with logo, nav items, badges, footer
- `ScenarioTopbar` — breadcrumb + title + date selector + action buttons
- `ScenarioWidgetLibrary` — right rail with search + WidgetPickerCard list
- `ScenarioEditBanner` — edit mode indicator bar
- `ScenarioDashboardGrid` — 12-column grid with 11 widgets

These are **scenario-composition code**, not public exports. They demonstrate the intended product shell assembly using `@metraly/ui` primitives.

---

## 3. Product UI Map

### App Shell (`App.jsx`)

- **Sidebar** — 228px expanded, 64px collapsed; sections: Pinned dashboards, Dashboards, Analytics, Configure, System; density-aware padding; pin/unpin; logo 32×32; status badge; user footer
- **Topbar** — 48/56/64px height (density-driven); title + subtitle; quick search 220px wide; notification bell with dot; horizontal padding 16/24/32px
- **DraggableTweaksPanel** — fixed-position overlay; draggable; accent color, density, sparklines toggle, sidebar collapse toggle; localStorage persistence
- **Auth flow** — login form (max-width 440px, card padding 32px, radius 16px) with logo + status chip + demo credentials + code block + submit + self-host block
- **First-run choice** — choice cards (demo vs. setup), pill badges, radio-style selection, continue button

### Dashboard (`DashboardScreen.tsx`)

Uses `DashboardRenderer` / `DraggableDashboardRenderer` with react-grid-layout:
- Breakpoints: lg 1200, md 996, sm 768
- Cols: lg 12, md 10, sm 6
- rowHeight 100, margin 16px
- Widget edit controls: size toggle, remove icon (13px), top 8px, right 8px
- Unknown widget state, loading state, no-data state, error state

### Dashboard Wizard (`DashboardWizardScreen.tsx`)

3-step wizard: Template → Widgets → Settings with:
- Left rail (400px): step indicator, step content, prev/next nav
- Right panel: live preview grid
- Inline widget sort/size/remove in step 3

### Metrics Explorer (`MetricsScreen.tsx`)

2-column layout:
- Left: Metric tree sidebar (220px) with group expand/collapse, search filter input
- Right: toolbar + scrolling content
  - Toolbar: segmented time-range control, team filter pill, repo filter pill, compare toggle, export bar, chart type selector
  - DORA overview panel (when DORA metric selected)
  - Chart card (radius 14px, padding 18/20px, large value + delta, AreaChart, chart-type toggle)
  - Breakdown card: table/leaderboard toggle, BreakdownTable or Leaderboard
  - Custom formula card: mono code box (cyan text, radius 8px, padding 10/14px), Run button

### AI Assistant (`AIScreen.tsx`)

Chat layout:
- Scrollable message list with assistant + user bubbles
- Typing indicator (3 animated dots)
- Input area: icon + text input + Send button, all in a rounded container
- Suggestion chips below input

### Marketplace (`PluginScreen.tsx`)

Scrollable single column:
- Notification channels panel (2-column grid of integration cards)
- Search bar + category filter buttons
- Plugin card grid (3 columns): icon box (38×38), installed badge, title, description, rating, install/manage button

### Onboarding Wizard (`WizardScreen.tsx`)

Centered fullscreen layout:
- Demo mode banner (purple accent)
- Onboarding checklist panel
- Step indicator with animated connector lines
- Step panels (max-width 680px): source selection grid, auth list with CLI code block, configure form rows, review success state
- Nav: Back / Continue buttons

### Board/Editor Flow (`BoardScreen.tsx`)

React Router based. Integrates with `FakeBoardRepository`. Will eventually merge with product shell. Uses brandbook `@metraly/ui` components (DashboardWidget, DashboardToolbar, etc.)

### Widget Registry

Product widget catalog includes:
- metric-chart, stat-card, health-gauge, dora-overview, heatmap, data-table, leaderboard, sprint-burndown, ai-insight, anomaly-detector, compare-bar-chart, section-header, recent-activity (13 types)

---

## 4. Duplication Analysis

| Product concept | Exists in `packages/ui`? | In scenario only? | In `metraly/ui` only? | Can extend? | Classification |
|---|---|---|---|---|---|
| Button | ❌ Missing entirely | ❌ | ✅ (inline styles everywhere) | N/A — must add | **Primitive** |
| Text input / search input | ❌ Missing | ❌ | ✅ (inline styles) | N/A — must add | **Primitive** |
| Icon system | ❌ Missing | ❌ | ✅ `Icon.tsx` 50+ icons | N/A — must add | **Primitive** |
| Segmented control | ❌ Missing (MetralyTabs is tab-style only) | ❌ | ✅ inline everywhere | Extend MetralyTabs? | **Primitive or Tabs variant** |
| Sidebar / nav rail | Scenario only | ✅ `ScenarioSidebar` | ✅ `Sidebar.tsx` | Extract from scenario | **Pattern → public** |
| Topbar / page header | Scenario only | ✅ `ScenarioTopbar` | ✅ `Topbar.tsx` | Extract from scenario | **Pattern → public** |
| App shell layout | ❌ | ❌ | ✅ `App.jsx` outer div | Thin wrapper | **Layout primitive** |
| Filter pill (dropdown) | ❌ | ❌ | ✅ `FilterPill.tsx` | Could build on MetralySelect | **Primitive or Select variant** |
| Navigation tree | ❌ | ❌ | ✅ `TreeItem.tsx` | New component | **Pattern** |
| Code/command block | ❌ | ❌ | ✅ inline in login + wizard | New component | **Primitive** |
| Status chip ("live instance") | MetralyBadge approx | ❌ | ✅ inline in login/sidebar | Extend MetralyBadge | **Extend existing** |
| Card shell | ✅ `MetralyCard` | — | ✅ inline panels | Already done | Already covered |
| Panel | ✅ `MetralyPanel` | — | ✅ inline panels | Already done | Already covered |
| Badge | ✅ `MetralyBadge`, `StateBadge` | — | ✅ `Badge.tsx` | Already done | Already covered |
| Switch/toggle | ✅ `MetralySwitch` | — | ✅ inline toggles in tweaks | Already done | Already covered |
| Select/dropdown | ✅ `MetralySelect` | — | ✅ inline selects | Already done | Already covered |
| Tabs | ✅ `MetralyTabs` | — | ✅ inline tab-style buttons | Already done | Already covered |
| Table | ✅ `MetralyTable` | — | ✅ `DataTable.tsx` | Already done | Already covered |
| Dashboard grid | ✅ `DashboardGrid` | — | ✅ `DashboardRenderer` | Already done | Already covered |
| Dashboard widget | ✅ `DashboardWidget` | — | ✅ `Widget.tsx` | Already done | Already covered |
| Widget picker card | ✅ `WidgetPickerCard` | — | ✅ wizard picker items | Already done | Already covered |
| Metric card | ✅ `MetralyMetricCard` | — | ✅ `StatCard.tsx` | Already done | Already covered |
| Sparkline | ✅ `MetralySparkline` | — | ✅ `Sparkline.tsx` | Already done | Already covered |
| Area/bar/line chart | ✅ chart wrappers | — | ✅ product charts | Already done | Already covered |
| State badge | ✅ `StateBadge` (13 states) | — | ✅ `DORABadge.tsx` | Already done | Already covered |
| Checkbox/Radio | ✅ `MetralyCheckbox/Radio` | — | — | Already done | Already covered |
| Telemetry line | ✅ `MetralyTelemetryLine` | — | — | Already done | Already covered |
| DashboardToolbar | ✅ | — | ✅ inline toolbar | Already done | Already covered |
| Drop zone | ✅ `DashboardDropZone` | — | ✅ inline | Already done | Already covered |
| Resize handle | ✅ `DashboardResizeHandle` | — | ✅ inline | Already done | Already covered |
| Integration/plugin card | Covered by `MetralyCard` | ❌ | ✅ `PluginScreen` | Use MetralyCard + recipe | **Recipe only** |
| Auth/login form | ❌ | ❌ | ✅ `App.jsx` login | Pattern story | **Recipe only** |
| Wizard step indicator | ❌ | ❌ | ✅ `WizardScreen`, `DashboardWizardScreen` | New primitive or recipe | **Recipe — possibly primitive** |
| AI chat | ❌ | ❌ | ✅ `AIScreen.tsx` | Product-specific | **Product-only** |
| Draggable panel | ❌ | ❌ | ✅ `DraggableTweaksPanel` | Product-specific | **Product-only** |
| Notification channel config | ❌ | ❌ | ✅ `PluginScreen` | Product-specific | **Product-only** |
| First-run choice screen | ❌ | ❌ | ✅ `App.jsx` | Product-specific | **Product-only** |

---

## 5. Minimal Component Taxonomy

### Primitives

**Exists now:**
- MetralyBadge, MetralyCard, MetralyPanel, MetralyMetricCard, MetralyCheckbox, MetralyRadio, MetralySwitch, MetralySelect, MetralyTabs, MetralyTable, MetralyTelemetryLine, StateBadge, MetralyLogo, ThemeProvider, MetralySparkline, chart wrappers

**Missing (critical):**
- `MetralyButton` — no button primitive exists; every button in the product is inline-styled
- `MetralyInput` — no text/search/password input exists; all inputs inline-styled
- `MetralyIcon` — no typed icon system; product uses `Icon.tsx` but brandbook has none

**Missing (important):**
- `MetralySegmentedControl` — time-range selectors and view toggles use raw buttons; MetralyTabs has a different visual contract (underline tab bar) and should stay separate
- `MetralyCodeBlock` — mono code display used in login, wizard auth step, CLI instructions

**Can extend (not new components):**
- Status chip → extend MetralyBadge with `pulse` prop (already partially supported)

### Layout / Shell

**Exists now:** DashboardGrid (dashboard-specific)

**Missing:**
- `MetralyShell` — top-level flex container (height 100%, overflow hidden, width 100%); ultra-thin primitive
- `MetralySidebar` — collapsible nav sidebar; extracted and generalized from ScenarioSidebar
- `MetralyTopbar` — page header; extracted and generalized from ScenarioTopbar

**Can remain recipe only:** Specific sidebar sections, pinned items list, user footer layout — these are slot-based compositions, not separate components

### Navigation

**Exists now:** MetralyTabs (tab-bar navigation), DashboardToolbar (dashboard-level navigation)

**Missing:**
- `MetralyNavigationTree` — expandable tree used in Metrics Explorer sidebar; reusable for any hierarchical nav

**Can remain recipe only:** Sidebar section label + item list pattern (done via slots/composition of MetralySidebar items)

### Forms / Controls

**Exists now:** MetralyCheckbox, MetralyRadio, MetralySwitch, MetralySelect, MetralyTabs

**Missing:**
- `MetralyButton` — no button exists
- `MetralyInput` — no text/search input exists
- `MetralySegmentedControl` — no segmented/pill selector exists

**Can extend:** MetralyBadge variant for filter chips (just style variant, no new component)

### Data Display

**Exists now:** MetralyTable, MetralyMetricCard, MetralyTelemetryLine, MetralyBadge, StateBadge, WidgetPickerCard, chart wrappers

**Missing:**
- Nothing critical — metric displays, tables, charts are well-covered
- `MetralyNavigationTree` overlaps with data display (hierarchical data)

**Can remain recipe only:** DORA panel, breakdown table view, leaderboard — these compose MetralyTable + MetralyMetricCard

### Dashboard / Editor

**Exists now:** DashboardGrid, DashboardWidget, DashboardToolbar, DashboardEmptyState, DashboardDropZone, DashboardResizeHandle, WidgetPickerCard, WidgetRegistry

**Missing:** Nothing critical. The full editor scenario is already in Storybook. No new public components needed here.

**Can remain recipe only:** Dashboard renderer integration (react-grid-layout adapter), widget body implementations for the 13 widget types, edit-mode banner

### Overlays

**Exists now:** Nothing

**Missing (deferred):** Popover and dropdown panel. `MetralyDrawer` and `MetralyBottomSheet` are now justified and implemented. Remaining overlays stay deferred until recipe pressure proves them necessary.

### Icons

**Exists now:** Nothing in brandbook

**Missing:**
- `MetralyIcon` — typed SVG icon component; must cover the 50+ icons from `Icon.tsx` plus any additional icons used in stories

### Recipes / Storybook-only compositions

Already exist:
- DashboardEditorScenario (full desktop editor)
- DashboardEditorResponsiveScenario (mobile/tablet layouts)

To add as recipes (not public exports):
- App shell assembly recipe (MetralyShell + MetralySidebar + MetralyTopbar)
- Integration/plugin card recipe (MetralyCard composition)
- Auth form recipe (login + first-run)
- Onboarding wizard recipe
- Metrics Explorer layout recipe
- AI chat layout recipe (product-only, minimal story)

### Product-only compositions (stay in metraly/ui)

- `DraggableTweaksPanel` — development/demo tool, not a design-system primitive
- `AIScreen` — product-specific chat feature
- `WizardScreen` (onboarding) — product-specific multi-screen flow
- `DashboardWizardScreen` — product-specific wizard with API integration
- `DashboardRenderer` / `DraggableDashboardRenderer` — react-grid-layout integration
- `PluginScreen` notification channel config — product-specific settings
- First-run choice screen — product-specific onboarding

---

## 6. Proposed Public API

### New: `MetralyButton`

| Field | Value |
|---|---|
| Category | Primitive / Forms |
| Public export | Yes |
| Purpose | Standard interactive button for all product surfaces |
| Why it belongs | No button exists in @metraly/ui; every screen has 10–30 inline-styled buttons |
| Existing component | None |
| Props outline | `variant`, `size`, `loading`, `disabled`, `iconLeft`, `iconRight`, `children`, `as` |
| Variants | `primary` (gradient), `secondary` (cyan outline), `ghost` (transparent), `danger` (err), `dashed` (cyan dashed border, "add" affordance) |
| States | default, hover, focus-visible, disabled, loading (spinner) |
| Accessibility | `aria-disabled`, focus-visible ring (`--m-glow-focus`), no layout shift on hover |
| Responsive | Stays compact; text truncates before button shrinks |
| Storybook coverage | All variants × all states matrix |
| Migration target | Every `<button>` in App.jsx, MetricsScreen, AIScreen, PluginScreen, WizardScreen, DashboardWizardScreen |
| Reason necessary | Fundamental interactive primitive; absence forces all consumers to re-implement hover/focus/disabled/loading state manually with inline styles |

### New: `MetralyInput`

| Field | Value |
|---|---|
| Category | Primitive / Forms |
| Public export | Yes |
| Purpose | Text input, search input, and password input |
| Why it belongs | No input exists in @metraly/ui; every screen has inline-styled inputs |
| Existing component | None (MetralySelect exists for selects) |
| Props outline | `type`, `value`, `onChange`, `placeholder`, `disabled`, `iconLeft`, `iconRight`, `size`, `error` |
| Variants | `default` (text/email/password), `search` (with search icon slot) |
| States | default, focus (cyan ring), error, disabled |
| Accessibility | `<input>` with associated `<label>`; error message via `aria-describedby` |
| Responsive | Full-width inside container; no layout overflow |
| Storybook coverage | Input types, states, icon slots |
| Migration target | Login form email/password, MetricsScreen search filter, PluginScreen search, WizardScreen name/desc fields |
| Reason necessary | Fundamental form primitive; absence forces all consumers to re-implement focus/error state with inline styles |

### New: `MetralyIcon`

| Field | Value |
|---|---|
| Category | Primitive / Icons |
| Public export | Yes |
| Purpose | Typed SVG icon component covering full product icon set |
| Why it belongs | No icon system exists in brandbook; product uses `Icon.tsx` with 50+ hardcoded paths |
| Existing component | None |
| Props outline | `name: MetralyIconName`, `size?: number`, `color?: string`, `style?` |
| Icon sizes | xs:12, sm:14, md:16 (default), lg:20, xl:24 |
| Stroke rules | 1.5px, round cap, round join, currentColor by default |
| Fallback | No fallback circle for typed names; TypeScript type `MetralyIconName` prevents unknowns |
| Accessibility | `aria-hidden="true"` by default; `aria-label` prop for standalone icons |
| Storybook coverage | Icon gallery with all names + size grid |
| Migration target | All `<Icon>` usages in metraly/ui throughout every screen |
| Reason necessary | Typed icon names allow tree-shaking, IDE autocomplete, and elimination of the silent "circle fallback" for unknown icons |

### New: `MetralySegmentedControl`

| Field | Value |
|---|---|
| Category | Primitive / Forms |
| Public export | Yes |
| Purpose | Pill-style segmented selector for time ranges, view toggles |
| Why it belongs | Used in 3+ screens (MetricsScreen time ranges, DashboardWizard time range, breakdown view toggle); current implementation is pure inline styles |
| Existing component | MetralyTabs exists but has underline-tab visual contract; segmented control is visually different (filled pill on surface background) |
| Props outline | `options: {value, label}[]`, `value`, `onChange`, `size?` |
| Variants | default (cyan on bg-2 surface) |
| States | selected, hover, focus-visible, disabled |
| Accessibility | `role="group"`, each option is `aria-pressed` button |
| Responsive | May overflow-x scroll at narrow widths |
| Storybook coverage | Single story with multiple options + selected state |
| Migration target | MetricsScreen time range, DashboardWizardScreen time range, BreakdownTable view toggle |
| Reason necessary | Distinct visual pattern from MetralyTabs; reused verbatim in 3+ screens |

### New: `MetralyShell`

| Field | Value |
|---|---|
| Category | Layout / Shell |
| Public export | Yes |
| Purpose | Top-level product layout container |
| Why it belongs | Product shell `App.jsx` defines `display:flex, height:100%, overflow:hidden` — this is a universal pattern needed whenever a sidebar + main area are combined |
| Existing component | None |
| Props outline | `children`, `className?` |
| Variants | None — purely a layout container |
| Accessibility | Renders as `<div>` with appropriate landmark roles in children |
| Responsive | Flexbox row on desktop, may stack on mobile (column breakpoint) |
| Storybook coverage | Shell assembly recipe showing Sidebar + main area |
| Migration target | `App.jsx` outer `<div style={{ display: 'flex', height: '100%' }}>` |
| Reason necessary | Ensures body-level overflow contract is enforced consistently without repeating the pattern per-screen |

### New: `MetralySidebar`

| Field | Value |
|---|---|
| Category | Layout / Navigation |
| Public export | Yes |
| Purpose | Collapsible navigation sidebar |
| Why it belongs | Used in both product `App.jsx` (Sidebar.tsx) and Storybook scenario (ScenarioSidebar); generalizing it prevents re-implementing this twice more as the product grows |
| Existing component | ScenarioSidebar in stories/ (scenario-only, not exported) |
| Props outline | `collapsed`, `onCollapse?`, `header`, `footer`, `children` (nav sections via slots) |
| Sub-components | `MetralySidebarSection`, `MetralySidebarItem` |
| Variants | expanded (228px) / collapsed (64px) |
| States | item: default, active (cyan bg + left accent line), hover |
| Accessibility | `<aside>`, `<nav>`, items are `<button>` or `<a>` with `aria-current="page"` |
| Responsive | Collapsed → full screen drawer on mobile (recipe doc) |
| Storybook coverage | Expanded + collapsed states; active item; mobile overlay recipe |
| Migration target | `Sidebar.tsx` in metraly/ui layout components |
| Reason necessary | Both product shell and Storybook scenario implement this pattern; extracting it canonicalizes the visual contract and allows the scenario to import from @metraly/ui |

### New: `MetralyTopbar`

| Field | Value |
|---|---|
| Category | Layout / Navigation |
| Public export | Yes |
| Purpose | Page header bar with title, breadcrumb, and action slots |
| Why it belongs | Used in product `Topbar.tsx` and `ScenarioTopbar`; density-aware height is already in product code |
| Existing component | ScenarioTopbar in stories/ (scenario-only) |
| Props outline | `title`, `subtitle?`, `breadcrumb?`, `actions?` (slot), `density?` |
| Height variants | compact: 48px, comfortable: 56px, spacious: 64px |
| Accessible | `<header>` element |
| Responsive | Actions wrap or overflow to secondary row |
| Storybook coverage | 3 density variants + action slots example |
| Migration target | `Topbar.tsx` in metraly/ui |
| Reason necessary | Product and story scenario duplicate this; consolidating it ensures density token consistency |

### New: `MetralyNavigationTree`

| Field | Value |
|---|---|
| Category | Navigation |
| Public export | Yes |
| Purpose | Hierarchical expandable navigation tree |
| Why it belongs | Used in MetricsScreen metric sidebar (TreeItem groups with children); pattern will recur for any hierarchical data navigation |
| Existing component | None |
| Props outline | `items: TreeNode[]`, `selected`, `onSelect`, `expandedGroups`, `onToggleGroup` |
| Variants | default |
| States | item: default, selected (cyan), hover; group: expanded/collapsed |
| Accessibility | `role="tree"`, `role="treeitem"`, `aria-expanded`, keyboard navigation |
| Responsive | 220px fixed rail on desktop; collapses to overlay on mobile |
| Storybook coverage | DORA/CI/PR/Teams tree example |
| Migration target | `TreeItem.tsx` in MetricsScreen |
| Reason necessary | The tree pattern is generic; implementing it once canonically is better than product-owning it with inline styles |

### New: `MetralyCodeBlock`

| Field | Value |
|---|---|
| Category | Primitive / Data Display |
| Public export | Yes |
| Purpose | Mono-spaced code/CLI display block |
| Why it belongs | Used in login screen (CLI demo), WizardScreen auth step (CLI command + status), DashboardEditorScenario (edit mode banner); recurring pattern |
| Existing component | None |
| Props outline | `children`, `accent?` (cyan/default/ok), `variant?` (inline/block) |
| Variants | `block` (full-width bordered box), `inline` (small inline code span) |
| Accessibility | `<code>` and `<pre>` elements |
| Responsive | Block variant wraps; does not overflow page |
| Storybook coverage | CLI snippet + inline usage examples |
| Migration target | Login screen CLI block, WizardScreen auth CLI, all code snippet usages |
| Reason necessary | Recurring visual pattern; current inline styles use different border/background/font each time |

### Extended: `MetralyBadge` — add `pulse` prop variant

Already exists. Should gain `pulse` option to cover "Live local instance", "All systems nominal" status chips currently inline-styled in login/sidebar.

No new component needed — just a variant addition.

### Rejected from public API

See Section 7.

---

## 7. Rejected Components

### `MetricsExplorerSidebar`

- **Product need:** MetricsScreen needs a 220px left rail with a metric tree
- **Why rejected:** `MetralyNavigationTree` + `MetralySidebar` covers this completely
- **Covered by:** MetralySidebar (shell) + MetralyNavigationTree (tree content) + MetralyInput (search)
- **Stays:** Product-side composition

### `ProductTopbar`

- **Product need:** App topbar with search + bell + title
- **Why rejected:** `MetralyTopbar` with `actions` slot covers it
- **Covered by:** MetralyTopbar with search input slot + bell button slot
- **Stays:** Assembled from primitives in product code

### `DashboardEditorOnlySidebar`

- **Product need:** Widget library right rail in dashboard editor
- **Why rejected:** `ScenarioWidgetLibrary` is already in Storybook as scenario code. `MetralySidebar` + `WidgetPickerCard` + `MetralyInput` covers the pattern.
- **Covered by:** Existing scenario recipe
- **Stays:** Storybook recipe only

### `AIOnlyCard` / `MessageBubble`

- **Product need:** AIScreen message bubble layout
- **Why rejected:** Highly product-specific; chat UX is not a design-system primitive. `MetralyPanel` + `MetralyBadge` + `MetralyIcon` can compose similar layouts without an `AIOnlyCard` export.
- **Covered by:** Product-side composition
- **Stays:** Product-only

### `PluginCard` / `MarketplaceCard`

- **Product need:** PluginScreen integration card grid
- **Why rejected:** The visual structure is `MetralyCard` + icon box + title + description + action button. No special component needed.
- **Covered by:** MetralyCard + MetralyButton + MetralyBadge + MetralyIcon
- **Stays:** Recipe / product-side composition

### `DraggableTweaksPanel`

- **Product need:** Developer/demo tweaks panel
- **Why rejected:** This is a developer/demo utility, not a design-system component. It mutates CSS variables and manages localStorage — product-specific behavior.
- **Covered by:** Product side
- **Stays:** Product-only

### `WizardStepIndicator`

- **Product need:** Both `WizardScreen` and `DashboardWizardScreen` have multi-step indicators
- **Why rejected (for now):** Appears in only 2 product screens. Can be handled as a recipe story composed from MetralyBadge + connecting line CSS. If a third wizard appears, promote to public.
- **Covered by:** Recipe story in Storybook
- **Stays:** Storybook recipe; revisit in Phase 6

### `MetralyFilterPill`

- **Product need:** MetricsScreen has `FilterPill` (label + dropdown selector)
- **Why rejected (for now):** `MetralySelect` already covers the select dropdown. The "label prefix" wrapper is a one-line CSS composition. Adding a `MetralyFilterPill` risks creating a narrow-purpose wrapper that duplicates MetralySelect.
- **Alternative:** `MetralySelect` with `labelPrefix` prop, or a filter-pill CSS class + slot pattern
- **Decision:** Do not add as separate component. If MetralySelect gains a `labelPrefix` prop, that covers it.
- **Stays:** MetralySelect extension (optional prop) or product-side composition

### `MetralyNotificationButton`

- **Product need:** Topbar notification bell with dot indicator
- **Why rejected:** A `MetralyButton` with `iconLeft` + `MetralyBadge` covers this completely. No dedicated `NotificationButton` needed.
- **Covered by:** MetralyButton + position-absolute MetralyBadge dot
- **Stays:** Product-side composition

### `MetralyUserBlock`

- **Product need:** Sidebar footer user avatar + name + role
- **Why rejected:** This is a product-level composition of an avatar (CSS circle), text, and a settings icon button. Not a broadly reusable design primitive.
- **Covered by:** MetralyTopbar `footer` slot or sidebar slot composition
- **Stays:** Product-side composition

### `MetralyCommandSearch`

- **Product need:** Topbar quick search input with ⌘K shortcut indicator
- **Why rejected:** `MetralyInput` with `iconLeft=search` + trailing keyboard shortcut slot covers this. Adding `CommandSearch` as a standalone component creates a narrow API for one usage.
- **Covered by:** MetralyInput + MetralyBadge (for the ⌘K kbd chip)
- **Stays:** Product-side composition using MetralyInput

### `MetralyDrawer` / `MetralyBottomSheet` / `MetralyPopover`

- **Product need:** Responsive overlay patterns (mobile widget library, navigation drawer)
- **Updated decision:** `MetralyDrawer` and `MetralyBottomSheet` are now justified and implemented. `MetralyDrawer` covers app-navigation and general overlay use. `MetralyBottomSheet` covers widget-library and utility-tray behavior on narrow widths. `MetralyPopover` remains deferred.
- **Covered by:** `MetralyDrawer` public seam, `MetralyBottomSheet` public seam
- **Stays:** Partial defer (`MetralyPopover` only)

---

## 8. Implementation Phases

### Phase 0 — Audit and Plan (current phase)

**Goal:** Understand both codebases, identify gaps, create this document.  
**Files:** This document + `docs/metraly-ui-to-brandbook-component-map.md`  
**Status:** Complete.  
**Acceptance criteria:** Plan reviewed and approved before any component code is written.

---

### Phase 1 — Foundation Primitives

**Goal:** Add `MetralyButton`, `MetralyInput`, `MetralyIcon`. These unlock all other phases because every subsequent component needs buttons, inputs, and icons.

**Components:**
- `packages/ui/src/components/MetralyButton.tsx` + `styles/metraly-button.css`
- `packages/ui/src/components/MetralyInput.tsx` + `styles/metraly-input.css`
- `packages/ui/src/components/MetralyIcon.tsx` (copy + type-restrict the Icon.tsx from metraly/ui)

**Exports to add in `index.ts`:**
- `MetralyButton`, `MetralyButtonProps`, `MetralyButtonVariant`, `MetralyButtonSize`
- `MetralyInput`, `MetralyInputProps`
- `MetralyIcon`, `MetralyIconName`, `MetralyIconProps`

**Stories to add:**
- `stories/MetralyButton.stories.tsx` — all variants + all states matrix
- `stories/MetralyInput.stories.tsx` — text/search/password + states
- `stories/MetralyIcon.stories.tsx` — full icon gallery + size grid

**Tests:** TypeScript type check (`npm run ui:check`), test suite (`npm run site:test`)

**Risks:**
- Button CSS must not conflict with existing component hover/focus styles
- Icon names type must stay in sync with icon paths record

**Rollback:** These are additive; no existing components are modified

**Acceptance criteria:**
- `MetralyButton` passes full state matrix in Storybook
- `MetralyInput` renders correctly with icon slots and error state
- `MetralyIcon` gallery shows all 50+ icons without circle fallback
- TypeScript compilation clean

---

### Phase 2 — App Shell and Navigation

**Goal:** Add `MetralyShell`, `MetralySidebar`, `MetralySidebarSection`, `MetralySidebarItem`, `MetralyTopbar`. These consolidate the Storybook scenario shell code into public API.

**Components:**
- `packages/ui/src/shell/MetralyShell.tsx`
- `packages/ui/src/shell/MetralySidebar.tsx`
- `packages/ui/src/shell/MetralyTopbar.tsx`
- `packages/ui/src/styles/metraly-shell.css`
- `packages/ui/src/styles/metraly-sidebar.css`
- `packages/ui/src/styles/metraly-topbar.css`

**Design constraint:** `ScenarioSidebar` and `ScenarioTopbar` in stories/ must be refactored to use the new public components after Phase 2 ships.

**Stories to add / update:**
- `stories/MetralyShell.stories.tsx` — shell + sidebar + topbar assembly recipe
- Update `DashboardEditorScenario.tsx` to use `MetralySidebar` + `MetralyTopbar`

**Risks:**
- ScenarioSidebar has scenario-specific behavior (pin/unpin, badges, emoji pins). The public `MetralySidebar` must be generalized via slots/children, not hard-coding product features.
- Density-aware height in MetralyTopbar must use CSS data-attribute (`data-density`) from ThemeProvider, not product-side state.

**Rollback:** Additive; scenario code keeps working during migration

**Acceptance criteria:**
- DashboardEditorScenario desktop renders identically after refactor
- No emoji pins in production sidebar (pin affordance is product-side)
- MetralySidebar passes collapsed/expanded story states

---

### Phase 3 — Dashboard and Editor Reusable Patterns

**Goal:** Add `MetralySegmentedControl`. Verify existing dashboard components are complete.

**Rationale:** Phase 1 and 2 unlock the primitives that dashboards need. The dashboard package is already strong; this phase closes the segmented control gap.

**Components:**
- `packages/ui/src/components/MetralySegmentedControl.tsx` + `styles/metraly-segmented.css`

**Stories to add:**
- `stories/MetralySegmentedControl.stories.tsx`

**Also in this phase:**
- Verify `DashboardDropZone` + `DashboardResizeHandle` are in package exports (known gap from obs #136)
- Add any missing exports from `index.ts`

**Risks:** MetralyTabs CSS may visually overlap if not scoped correctly

**Acceptance criteria:**
- Segmented control selected state matches MetricsScreen time-range appearance
- DashboardDropZone + DashboardResizeHandle correctly exported

**Status:** Implemented. `MetralySegmentedControl` is now shipped with public API and Storybook coverage.

---

### Phase 4 — Metrics Explorer Patterns

**Goal:** Add `MetralyNavigationTree`, extend `MetralySelect` only if recipe pressure proves it is needed, and add `MetralyCodeBlock`.

**Components:**
- `packages/ui/src/components/MetralyNavigationTree.tsx` + `styles/metraly-navigation-tree.css`
- `packages/ui/src/components/MetralyCodeBlock.tsx` + `styles/metraly-code-block.css`
- Extend `MetralySelect` with optional `labelPrefix` prop

**Stories to add:**
- `stories/MetralyNavigationTree.stories.tsx` — metric tree example
- `stories/MetralyCodeBlock.stories.tsx` — CLI block + inline examples

**Storybook recipe to add:**
- Metrics Explorer layout recipe showing the full screen assembly

**Risks:** Tree keyboard navigation is complex (ARIA tree role); must pass axe accessibility check

**Acceptance criteria:**
- MetralyNavigationTree keyboard-navigable with arrow keys
- MetralyCodeBlock renders mono font with correct token colors
- MetralySelect with labelPrefix matches FilterPill appearance

**Status:** Mostly implemented. `MetralyNavigationTree` and `MetralyCodeBlock` are shipped with Storybook coverage; `MetralySelect` remains unchanged until a concrete recipe demonstrates that `labelPrefix` deserves public API.

---

### Phase 5 — Icon System Completion

**Goal:** Ensure `MetralyIcon` covers all product icons. Add any missing icons found during Phase 1–4 integration.

**Work:**
- Audit icon usages in metraly/ui against MetralyIconName type
- Add missing paths to MetralyIcon
- Update icon gallery story

**Risks:** Low — additive only

---

### Phase 6 — Storybook Recipes and Docs

**Goal:** Add recipe stories for product screen patterns and prove the overlay seams in real assemblies.

**Stories to add:**
- App shell recipe (MetralyShell + MetralySidebar + MetralyTopbar + main area)
- Auth/login form recipe (MetralyPanel + MetralyInput + MetralyButton + MetralyCodeBlock)
- Integration/plugin card recipe (MetralyCard + MetralyButton + MetralyIcon)
- Onboarding wizard step recipe (step indicator pattern)
- Metrics Explorer recipe (NavTree + SegmentedControl + FilterPill + ChartCard)
- Mobile shell recipe (app-navigation drawer pattern)
- Metrics explorer narrow recipe (utility-switcher overlay pattern)

**Overlay decision notes:**
- `MetralyShell` mobile keeps a stronger app-navigation drawer pattern.
- `MetricsExplorerRecipe` tablet/mobile should prefer a lighter utility-switcher pattern for fast metric switching.
- `MetralyBottomSheet` is now available for widget-library and tray-like narrow flows.

**Status:** Partially implemented. App shell, auth form, metrics explorer, integration card, and wizard layout recipes now exist in Storybook, including desktop/tablet/mobile variants for shell, explorer, and wizard flows. `MetralyDrawer` and `MetralyBottomSheet` are both implemented. Remaining Phase 6 work is recipe polish plus migration-guide documentation that proves these seams against product adoption.

---

### Phase 7 — Verification and Migration Notes

**Goal:** Full verification suite, produce migration guide for metraly/ui.

**Checks:**
```bash
npm run ui:check
npm run site:typecheck
npm run site:test
npm run build-storybook
npm run test:e2e
```

**Manual Storybook smoke checks:**
- Dashboard editor desktop
- Dashboard editor mobile1/mobile2
- Component state board
- App shell recipe (desktop + mobile)
- Metrics Explorer recipe
- Button/Input/Icon stories

**Deliverable:** `docs/metraly-ui-to-brandbook-migration-guide.md` with per-screen migration steps

---

## 9. Migration Plan for `getmetraly/metraly/ui`

> Do NOT modify metraly/ui in the brandbook task. This section is guidance for the future migration task.

### Token migration first

Before migrating any component, replace legacy CSS variables with brandbook tokens. The mapping:

| Legacy token | Brandbook token |
|---|---|
| `--bg` | `--m-bg-0` |
| `--glass` | `--m-bg-1` |
| `--glass2` | `--m-bg-2` |
| `--border` | `--m-line` |
| `--border2` | `--m-line-strong` |
| `--border-bright` | `--m-line-strong` |
| `--cyan` | `--m-cyan-500` |
| `--purple` | `--m-purple-500` |
| `--success` | `--m-ok` |
| `--warning` | `--m-warn` |
| `--error` | `--m-err` |
| `--text` | `--m-fg-0` |
| `--muted` | `--m-fg-3` |
| `--muted2` | `--m-fg-2` |
| `--grad` | `linear-gradient(135deg, var(--m-cyan-500), var(--m-purple-500))` |
| `--font-head` | Use Space Grotesk directly; brandbook uses Inter for `--m-font-ui` |
| `--font-body` | `--m-font-ui` |
| `--font-mono` | `--m-font-mono` |
| `--sidebar-w` | 228px (hardcoded) → `MetralySidebar` default |

Add `ThemeProvider` from `@metraly/ui` to `App.jsx` and `index.css` — this injects all `--m-*` variables.

### Migration order

**Replace first (lowest risk, highest gain):**
1. Add `ThemeProvider` wrapper — unlocks all `--m-*` tokens
2. Replace `Icon` with `MetralyIcon` — pure import swap
3. Replace inline toggle switches with `MetralySwitch`
4. Replace inline checkboxes with `MetralyCheckbox`
5. Replace `<select>` elements with `MetralySelect`
6. Replace time-range segmented controls with `MetralySegmentedControl`

**Replace second (medium complexity):**
7. Replace inline `<button>` elements with `MetralyButton` (start with secondary/ghost)
8. Replace inline `<input>` elements with `MetralyInput`
9. Replace `<Sidebar>` with `MetralySidebar` (once Phase 2 ships)
10. Replace `<Topbar>` with `MetralyTopbar`

**Replace third (requires careful state handling):**
11. Replace `StatCard` with `MetralyMetricCard`
12. Replace `DataTable` with `MetralyTable`
13. Replace `Badge` with `MetralyBadge`
14. Replace metric tree `TreeItem` with `MetralyNavigationTree`

**Defer (product-specific, no brandbook equivalent planned):**
- `DraggableTweaksPanel` — keep in metraly/ui
- `AIScreen` message bubbles — keep in metraly/ui
- `WizardScreen` multi-step flow — keep in metraly/ui
- `DashboardWizardScreen` — keep in metraly/ui
- `DashboardRenderer` / `DraggableDashboardRenderer` — keep in metraly/ui (react-grid-layout integration)
- `PluginScreen` notification channel config — keep in metraly/ui
- First-run choice screen — keep in metraly/ui

### Screen-by-screen migration order

1. **Login screen** — use MetralyInput + MetralyButton + MetralyCodeBlock + MetralyBadge (status chip)
2. **Sidebar** — replace with MetralySidebar (remove emoji pins, implement as product-side items)
3. **Topbar** — replace with MetralyTopbar
4. **Dashboard screen** — widget states already compatible; migrate inline toolbar buttons
5. **Metrics Explorer** — use MetralyNavigationTree + MetralySegmentedControl + MetralyInput (search)
6. **Marketplace** — use MetralyCard + MetralyButton + MetralyIcon for plugin cards
7. **AI Assistant** — minimal migration; keep bubble layout in product
8. **Onboarding wizard** — keep in product; use MetralyButton + MetralyInput + MetralyCodeBlock for inner primitives

---

## 10. Approval Checkpoint

### Recommended minimal component set

**Implemented reusable set:**
- `MetralyButton` — canonical compact action primitive
- `MetralyInput` — canonical text/search/password field
- `MetralyIcon` — typed icon system
- `MetralyShell` — layout container
- `MetralySidebar` — collapsible nav rail
- `MetralyTopbar` — page header
- `MetralySegmentedControl` — compact range and view selector
- `MetralyNavigationTree` — dense hierarchical navigation/data tree
- `MetralyCodeBlock` — mono code and command surface

**Next minimal work:**
- Metrics Explorer recipe coverage
- Auth/onboarding recipe coverage
- Marketplace/integration recipe coverage

### Implementation phases (summary)

| Phase | Goal | Key deliverable |
|---|---|---|
| 0 | Audit + plan | This document |
| 1 | Foundation primitives | MetralyButton, MetralyInput, MetralyIcon |
| 2 | App shell + navigation | MetralyShell, MetralySidebar, MetralyTopbar |
| 3 | Dashboard reusable patterns | MetralySegmentedControl, export fixes |
| 4 | Explorer patterns | MetralyNavigationTree, MetralyCodeBlock |
| 5 | Icon completion | Full icon coverage |
| 6 | Recipes and docs | Recipe stories, migration guide |
| 7 | Verification | Full test suite, smoke checks |

### Highest-risk decisions

1. **MetralySidebar generalization**: ScenarioSidebar has product-specific features (emoji pins, badge counts, localStorage). The public API must use slots/children. This requires careful design to avoid recreating a product-specific component.

2. **MetralyButton interaction with existing components**: Some components (DashboardToolbar, DashboardWidget edit controls) render their own button-like elements. Phase 1 must not break these.

3. **MetralyTopbar vs. DashboardToolbar**: These are two different components — Topbar is the page-level header, DashboardToolbar is a dashboard-specific sub-header. They must stay separate and not be merged.

4. **Tree keyboard navigation**: MetralyNavigationTree requires full ARIA tree keyboard support. This is the most complex accessibility implementation in the plan.

5. **Icon type exhaustiveness**: Adding `MetralyIconName` as a string union type means every new icon requires a code change. Consider whether a string type with a documented set is better than an exhaustive union.

### Components rejected from public API

`DraggableTweaksPanel`, `AIOnlyCard`, `MessageBubble`, `WizardStepIndicator`, `MetricsExplorerSidebar`, `PluginCard`, `MarketplaceOnlyPanel`, `DashboardEditorOnlySidebar`, `ProductTopbar`, `MetralyNotificationButton`, `MetralyUserBlock`, `MetralyCommandSearch`.

### Current overlay decisions to preserve

1. `MetralyShell` mobile is intentionally different from narrow utility switchers because it represents app-level navigation.
2. `MetricsExplorerRecipe` tablet/mobile uses a quicker utility-switcher overlay, optimized for find-and-switch behavior instead of full workspace navigation.
3. `MetralyBottomSheet` should be preferred for widget-library, tray, and picker-like mobile flows.
4. `MetralyDrawer` should remain available for full navigation overlays and for utility overlays that still need a drawer-like shell.

### What should be implemented first

**The next work should begin at Phase 6.** The highest-value minimal step is proving the new seams in Storybook recipes:
- `MetricsExplorerRecipe`
- `AuthFormRecipe`
- `IntegrationCardRecipe`

That keeps `packages/ui` lean while validating that the current public API is sufficient for the future product rewrite.
