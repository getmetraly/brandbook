# Metraly UI → Brandbook Component Map

**Status:** Review map updated after shipped seams audit.  
**Last updated:** 2026-05-14  
**Companion document:** `docs/metraly-ui-to-brandbook-component-plan.md`

**Source rule:** `getmetraly/metraly/ui` is a read-only product inventory. `@metraly/ui` must use brandbook tokens, contracts, Storybook/state-board behavior, and dense engineering-dashboard visual language.

---

## 1. Current public exports

### Foundation / primitives

| Export | File | Category | Decision |
|---|---|---|---|
| `MetralyBadge` | `components/MetralyBadge.tsx` | Badge | Keep public |
| `StateBadge` | `components/StateBadge.tsx` | Operational badge | Keep public |
| `MetralyButton` | `components/MetralyButton.tsx` | Form/action primitive | Keep public |
| `MetralyInput` | `components/MetralyInput.tsx` | Form primitive | Keep public |
| `MetralyIcon`, `metralyIconPaths`, `metralyIconSizeMap` | `components/MetralyIcon.tsx` | Icon primitive | Keep public |
| `MetralyCodeBlock` | `components/MetralyCodeBlock.tsx` | Code/data primitive | Keep public |
| `MetralyLogo` | `components/MetralyLogo.tsx` | Brand primitive | Keep public |
| `ThemeProvider`, `MetralyThemeProvider` | `components/ThemeProvider.tsx` | System | Keep public |

### Surface / data display

| Export | File | Category | Decision |
|---|---|---|---|
| `MetralyCard` | `components/MetralyCard.tsx` | Surface | Keep public |
| `MetralyPanel` | `components/MetralyPanel.tsx` | Surface | Keep public |
| `MetralyMetricCard` | `components/MetralyMetricCard.tsx` | Metric display | Keep public |
| `MetralyTable` | `components/MetralyTable.tsx` | Table | Keep public |
| `MetralyTelemetryLine` | `components/MetralyTelemetryLine.tsx` | Dense telemetry row | Keep public |
| `WidgetPickerCard` | `components/WidgetPickerCard.tsx` | Dashboard/widget picker | Keep public |

### Forms and navigation

| Export | File | Category | Decision |
|---|---|---|---|
| `MetralyCheckbox` | `components/MetralyCheckbox.tsx` | Form | Keep public |
| `MetralyRadio` | `components/MetralyRadio.tsx` | Form | Keep public |
| `MetralySwitch` | `components/MetralySwitch.tsx` | Form | Keep public |
| `MetralySelect` | `components/MetralySelect.tsx` | Form | Keep public |
| `MetralyTabs` | `components/MetralyTabs.tsx` | Navigation | Keep public |
| `MetralySegmentedControl` | `components/MetralySegmentedControl.tsx` | Navigation/form selector | Keep public |
| `MetralyNavigationTree` | `components/MetralyNavigationTree.tsx` | Navigation tree | Keep public |

### Shell / overlays

| Export | File | Category | Decision |
|---|---|---|---|
| `MetralyShell` | `shell/MetralyShell.tsx` | Layout seam | Keep public |
| `MetralySidebar` | `shell/MetralySidebar.tsx` | Navigation shell | Keep public |
| `MetralySidebarSection` | `shell/MetralySidebar.tsx` | Navigation subcomponent | Keep public |
| `MetralySidebarItem` | `shell/MetralySidebar.tsx` | Navigation subcomponent | Keep public |
| `MetralyTopbar` | `shell/MetralyTopbar.tsx` | Header seam | Keep public |
| `MetralyDrawer` | `shell/MetralyDrawer.tsx` | Overlay | Keep public; a11y hardening pending |
| `MetralyBottomSheet` | `shell/MetralyBottomSheet.tsx` | Mobile overlay/tray | Keep public; a11y hardening pending |

### Dashboard

| Export | File | Decision |
|---|---|---|
| `DashboardGrid` | `dashboard/DashboardGrid.tsx` | Keep public |
| `DashboardWidget` | `dashboard/DashboardWidget.tsx` | Keep public |
| `DashboardToolbar` | `dashboard/DashboardToolbar.tsx` | Keep public |
| `DashboardEmptyState` | `dashboard/DashboardEmptyState.tsx` | Keep public |
| `DashboardDropZone` | `dashboard/DashboardDropZone.tsx` | Keep public |
| `DashboardResizeHandle` | `dashboard/DashboardResizeHandle.tsx` | Keep public |
| `defaultDashboardWidgetRegistry` | `dashboard/WidgetRegistry.ts` | Keep public |
| `findDashboardWidgetDefinition` | `dashboard/WidgetRegistry.ts` | Keep public |
| `createDashboardWidgetInstance` | `dashboard/WidgetRegistry.ts` | Keep public |
| Dashboard types | `dashboard/types.ts` | Keep public |

### Charts

| Export | File | Decision |
|---|---|---|
| `MetralyAreaChart` | `charts/MetralyAreaChart.tsx` | Keep public |
| `MetralyBarChart` | `charts/MetralyBarChart.tsx` | Keep public |
| `MetralyChartCard` | `charts/MetralyChartCard.tsx` | Keep public |
| `MetralyChartTooltip` | `charts/MetralyChartTooltip.tsx` | Keep public |
| `MetralyComposedChart` | `charts/MetralyComposedChart.tsx` | Keep public |
| `MetralyLineChart` | `charts/MetralyLineChart.tsx` | Keep public |
| `MetralySparkline` | `charts/MetralySparkline.tsx` | Keep public |

---

## 2. Component coverage matrix

| Need | Current coverage | Coverage | Notes |
|---|---|---:|---|
| Action buttons | `MetralyButton` | full | Covers primary, secondary, ghost, neutral, danger, dashed, loading, disabled, icon-only. |
| Text/search/password fields | `MetralyInput` | full | Search icon, label, description, error, icon slots, full-width. |
| Icons | `MetralyIcon` | full / evolving | Typed names cover current Storybook/product-known icon set. Add only when migration finds gaps. |
| Code/CLI/formula blocks | `MetralyCodeBlock` | full | Public because auth, onboarding, and formula examples all reuse it. |
| Inline badges | `MetralyBadge` | full | Actual variants: `primary`, `secondary`, `success`, `warning`, `error`, `info`. |
| Operational status | `StateBadge` | full | Use for live/new/stale/error/delayed/no-data states. |
| Cards/panels | `MetralyCard`, `MetralyPanel` | full | Product cards should compose these rather than create new public wrappers. |
| Metric cards | `MetralyMetricCard` | full | Covers stat cards and DORA summary cards. |
| Tables | `MetralyTable` | full | Keep real table semantics and internal scroll. |
| Basic forms | checkbox/radio/switch/select | full | No new primitive needed. |
| Tab navigation | `MetralyTabs` | full | Underline/tab-bar pattern. |
| Segmented selectors | `MetralySegmentedControl` | full | Keep separate from tabs; pill selector for time/view toggles. |
| Hierarchical navigation | `MetralyNavigationTree` | full for Metrics Explorer | Current group rows expand/collapse; selectable groups deferred. |
| App shell | `MetralyShell` | full | Enforces full-height flex + overflow contract. |
| Sidebar | `MetralySidebar` + sections/items | full | Product specifics remain slots/composition. |
| Topbar | `MetralyTopbar` | full | Keep separate from dashboard toolbar. |
| Mobile nav overlay | `MetralyDrawer` | partial | Visual/semantic coverage done; focus trap/body lock pending. |
| Mobile utility tray | `MetralyBottomSheet` | partial | Visual/semantic coverage done; focus trap/body lock pending. |
| Dashboard grid/widgets | dashboard exports | full | Renderer/adapters remain product-side. |
| Chart cards/wrappers | chart exports | mostly full | Gauge and heatmap deferred. |
| Widget library rows | `WidgetPickerCard` | full | Pulse-free selected state is intentional. |
| Auth form | primitives + recipe | recipe | Do not add public `AuthCard`. |
| Marketplace card | card/button/badge/icon + recipe | recipe | Do not add public `PluginCard`. |
| Wizard stepper | recipe | partial | Keep recipe-only until third reusable flow appears. |
| AI chat | primitives + product code | partial | Chat bubbles and streaming are product-specific. |

---

## 3. Product UI coverage matrix

| Product UI area | Current brandbook coverage | Missing piece | Public component needed? | Recipe needed? | Migration readiness |
|---|---|---|---:|---:|---:|
| App shell | `MetralyShell`, `MetralySidebar`, `MetralyTopbar`, `MetralyDrawer` | Overlay focus management | no | yes | 8/10 |
| Dashboard | `DashboardGrid`, `DashboardWidget`, `DashboardToolbar`, `DashboardDropZone`, `DashboardResizeHandle`, `WidgetPickerCard` | Product grid adapter only | no | yes | 9/10 |
| Dashboard editor | Dashboard seams + shell + bottom sheet | Manual viewport verification | no | yes | 8/10 |
| Metrics Explorer | `MetralyNavigationTree`, `MetralySegmentedControl`, `MetralyInput`, `MetralySelect`, chart wrappers, table | Gauge/heatmap wrappers deferred; filter pill composition | no now | yes | 8/10 |
| Auth/login | `MetralyInput`, `MetralyButton`, `MetralyCodeBlock`, badges, cards/panels | Flow logic/product copy | no | yes | 8/10 |
| Onboarding wizard | buttons/inputs/code/cards/badges + wizard recipe | Full stateful wizard logic | no | yes | 7/10 |
| Marketplace/integrations | card/button/badge/icon recipes | Installed/loading/error recipe variants | no | yes | 8/10 |
| AI Assistant | panel/card/input/button/icon/code pieces | Chat bubbles, streaming state, suggestion logic | no | optional | 6/10 |
| Dev tweaks panel | none intentionally | Product/demo state utility | no | no | n/a |

---

## 4. Storybook coverage matrix

| Story group | Coverage | Current role | Needed follow-up |
|---|---|---|---|
| `Components/MetralyButton` | enough | Variant/state reference | Manual viewport + keyboard smoke. |
| `Components/MetralyInput` | enough | Field/search/error reference | Manual error/focus smoke. |
| `Components/MetralyIcon` | enough | Icon inventory | Add icons only when product migration finds missing names. |
| `Components/MetralyCodeBlock` | enough | CLI/code display | Confirm wrapping at 320px. |
| `Components/MetralySegmentedControl` | enough | Time/view toggle | Confirm internal horizontal scroll at 320px. |
| `Components/MetralyNavigationTree` | enough | Metric tree | Confirm arrow key behavior and truncation. |
| `Components/MetralyDrawer` | enough visually | Overlay seam | Add focus-management tests/stories after Phase 1a. |
| `Components/MetralyBottomSheet` | enough visually | Mobile tray seam | Add focus-management tests/stories after Phase 1a. |
| `Patterns/MetralyShell` | strong | App shell recipe | Verify mobile drawer and topbar wrapping. |
| `Patterns/MetricsExplorerRecipe` | strong | Explorer migration recipe | Add empty/loading/error recipe states later. |
| `Patterns/AuthFormRecipe` | enough | Auth migration recipe | Keep recipe-only; no public `AuthCard`. |
| `Patterns/IntegrationCardRecipe` | enough | Marketplace recipe | Add installed/error/loading examples later. |
| `Patterns/WizardLayoutRecipe` | enough | Wizard recipe | Keep stepper recipe-only. |
| `Scenarios/DashboardEditor` | critical | Visual benchmark | Run at 320, 375, 390, 430, 768, 1024, 1280, 1440px. |
| `Scenarios/ComponentStateBoard` | critical | State benchmark | Ensure existing states do not regress. |

---

## 5. Token / visual conformance notes

### Passes

- New inspected CSS uses `--m-*` tokens, not legacy product tokens.
- Shell background hierarchy follows the contract:
  - canvas: `--m-bg-0`
  - chrome/sidebar/topbar: `--m-bg-1`
  - cards/controls: `--m-bg-2`
  - hover: `--m-bg-3`
- Controls use compact heights and tokenized radii.
- Focus-visible states use tokenized focus glow.
- Selected states use cyan background/border and do not resize components.
- Navigation and control rows are dense and consistent with dashboard surfaces.
- Storybook preview imports package CSS from `@metraly/ui/styles/*` instead of local restyling.

### Notes / minor issues

- `MetralyButton` CSS has a duplicated `white-space: nowrap`; harmless, can be cleaned opportunistically.
- `MetralyDrawer` and `MetralyBottomSheet` are visually aligned but not yet fully modal-accessible.
- `MetralyBadge` docs in older sections used outdated variant names. Current implementation uses `primary`, `secondary`, `success`, `warning`, `error`, `info`.
- Some recipe stories use inline layout styles. This is acceptable if they are layout-only and do not restyle package primitives.

### Required local grep before final sign-off

```bash
rg "--(bg|glass|glass2|border|border2|cyan|purple|success|warning|error|text|muted|muted2)" packages/ui/src
rg "PulseWave|pulse" packages/ui/src stories
```

Expected:

- No legacy product token usage inside `packages/ui/src`.
- Pulse appears only in allowed semantic status/logo/chart/telemetry places.

---

## 6. API changes

### Recommended now

No public API change is recommended in this pass.

### Deferred possible API changes

| Possible change | Component | Trigger required before implementation | Current decision |
|---|---|---|---|
| `as` / polymorphic link support | `MetralyButton` | Product migration needs button-styled links frequently | defer |
| `size` prop | `MetralyInput` | Multiple product input heights appear during migration | defer |
| `labelPrefix` or filter mode | `MetralySelect` | Metrics Explorer filter pill cannot be cleanly composed | defer |
| selectable groups | `MetralyNavigationTree` | Future tree navigation needs group selection independent from expansion | defer |
| focus trap / restore / body lock | `MetralyDrawer`, `MetralyBottomSheet` | Public overlay production readiness | implement next |
| `MetralyGauge` | charts | Product dashboard migration requires canonical gauge wrapper | defer |
| `MetralyHeatmap` | charts | Product dashboard migration requires canonical heatmap wrapper | defer |

---

## 7. Rejected / deferred components

### Rejected from public API

| Component | Reason | Alternative |
|---|---|---|
| `DraggableTweaksPanel` | Demo/developer utility with state/localStorage behavior | Product-only |
| `AIOnlyCard` / `MessageBubble` | Product-specific chat UI | Product composition using panel/card/badge/icon/input/button |
| `WizardStepIndicator` | Reused in too few flows today | Recipe-only; revisit after third flow |
| `MetricsExplorerSidebar` | Too screen-specific | `MetralySidebar` + `MetralyNavigationTree` + `MetralyInput` |
| `PluginCard` / `MarketplaceCard` | Card composition is enough | `MetralyCard` + `MetralyButton` + `MetralyBadge` + `MetralyIcon` |
| `ProductTopbar` | Duplicates page header seam | `MetralyTopbar` with action slots |
| `MetralyNotificationButton` | Too narrow | `MetralyButton` + badge/dot composition |
| `MetralyUserBlock` | Product-specific sidebar footer | Sidebar footer slot |
| `MetralyCommandSearch` | Too narrow | `MetralyInput` + trailing kbd/badge composition |
| Product dashboard renderer | Data/layout integration, not UI primitive | Product adapter using `DashboardGrid`/`DashboardWidget` |

### Deferred, not rejected

| Component | Why deferred | Revisit when |
|---|---|---|
| `MetralyPopover` | Drawer/sheet cover current overlay needs | Repeated anchored overlay/picker pattern appears |
| `MetralyGauge` | Product has gauge, but migration can initially keep product chart | Gauge must be canonicalized across screens |
| `MetralyHeatmap` | Product has heatmap, but migration can initially keep product chart | Heatmap appears in multiple brandbook/product stories |

---

## 8. Migration readiness score per product area

| Area | Score | Blocking issues | Next action |
|---|---:|---|---|
| App shell | 8/10 | Overlay focus management | Phase 1a overlay a11y hardening |
| Dashboard | 9/10 | Manual viewport verification | Run dashboard editor + component state board smoke tests |
| Dashboard editor | 8/10 | Mobile widget library/bottom sheet sign-off | Manual viewport checks and recipe polish |
| Metrics Explorer | 8/10 | Gauge/heatmap deferred, filter pill composition | Keep recipe; defer new components |
| Auth/login | 8/10 | Recipe verification | Keep recipe-only |
| Onboarding | 7/10 | Wizard flow remains product-specific | Keep primitives inside product flow |
| Marketplace | 8/10 | More recipe states | Add installed/loading/error recipe variants later |
| AI Assistant | 6/10 | Product-specific chat UI | Keep chat surface product-side |

---

## 9. Migration path summary

### Step 1 — token bootstrap

- Add `@metraly/ui` and wrap the app in `ThemeProvider`.
- Replace legacy tokens with `--m-*` equivalents.
- Do not change screen structure yet.

### Step 2 — icon swap

- Replace product `Icon` with `MetralyIcon`.
- Add missing typed icon paths only when TypeScript or visual review catches them.

### Step 3 — controls and form primitives

- Replace inline buttons with `MetralyButton`.
- Replace text/search/password fields with `MetralyInput`.
- Replace checkbox/radio/switch/select patterns with package components.
- Replace time/view toggle groups with `MetralySegmentedControl`.

### Step 4 — app shell

- Replace product sidebar/topbar structure with `MetralyShell`, `MetralySidebar`, `MetralyTopbar`.
- Use `MetralyDrawer` for mobile app navigation after focus management is complete.

### Step 5 — dashboards and data

- Replace dashboard shells with dashboard package seams.
- Keep `react-grid-layout` adapter in product.
- Replace stat cards, tables, badges, and chart cards with package components.

### Step 6 — metrics explorer

- Replace metric tree with `MetralyNavigationTree`.
- Replace time-range selectors with `MetralySegmentedControl`.
- Compose filters using `MetralySelect` or defer a small extension only if needed.

### Step 7 — product-only flows

Keep product-owned:

- AI Assistant chat flow
- Onboarding state machine
- Dashboard wizard state machine
- Marketplace notification setup logic
- Dev tweaks panel

Use package primitives inside those flows, but do not migrate them into `packages/ui`.

---

## 10. Verification matrix

Run:

```bash
npm run ui:check
npm run site:typecheck
npm run site:test
npm run build-storybook
npm run test:e2e
```

Manual stories:

```text
/scenarios-dashboard-editor--default
/scenarios-component-state-board--default
/components-*
/patterns-*
/story/metraly-button--all-variants
/story/metraly-input--types
/story/metraly-icon--gallery
/story/metraly-shell--expanded
/story/metraly-shell--mobile
/story/metraly-segmented-control--default
/story/metraly-navigation-tree--metric-tree
/story/metraly-code-block--cli-block
/story/metraly-drawer--default
/story/metraly-bottom-sheet--default
```

Viewport matrix:

```text
320px
375px
390px
430px
768px
1024px
1280px
1440px
```

Record:

- body-level horizontal overflow
- internal scroll vs page scroll
- selected/focus/hover states
- disabled/loading/error states
- drawer/sheet keyboard behavior
- topbar wrapping
- sidebar collapsed and drawer behavior
- dashboard editor mobile widget-library behavior
- chart/table clipping

---

## 11. Current conclusion

The current `@metraly/ui` public API is sufficiently minimal and useful for future `getmetraly/metraly/ui` migration.

Do not add more public components now.

The next justified work is:

```text
1. Run verification locally.
2. Harden MetralyDrawer and MetralyBottomSheet focus/body-scroll behavior.
3. Polish recipes only after viewport findings prove a real UX issue.
```
