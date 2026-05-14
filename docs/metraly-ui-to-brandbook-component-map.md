# Metraly UI → Brandbook Component Map

**Status:** Updated after UI/UX research for future `@metraly/ui` migration into `getmetraly/metraly/ui`.  
**Last updated:** 2026-05-15  
**Companion documents:**
- `docs/metraly-ui-to-brandbook-component-plan.md`
- `docs/metraly-ui-ux-scenario-audit.md`

**Source rule:** `getmetraly/metraly/ui` is a read-only product inventory and future migration target. `@metraly/ui` must use brandbook tokens, component contracts, responsive contracts, Storybook scenarios, and dense engineering-dashboard visual language.

---

## 1. Mapping principle

This map separates four layers:

1. **Public component API** — reusable exports from `packages/ui`.
2. **Recipes** — Storybook-level screen assemblies that demonstrate composition.
3. **Product adapters** — data/state/layout integration that must stay in `getmetraly/metraly/ui`.
4. **Product flows** — business workflows, permissions, API calls, and copy that must stay product-owned.

Do not promote a recipe or product adapter into public `@metraly/ui` API unless it repeats across at least three product areas and has stable props.

---

## 2. Current public exports and migration role

### Foundation / primitives

| Export | Category | Migration role | Decision |
|---|---|---|---|
| `MetralyButton` | Action primitive | Replace product buttons, icon buttons, primary/secondary actions | Keep public |
| `MetralyInput` | Form primitive | Replace search, text, password, labeled fields | Keep public |
| `MetralyIcon`, `metralyIconPaths`, `metralyIconSizeMap` | Icon primitive | Replace product icon registry where names exist | Keep public |
| `MetralyCodeBlock` | Code/data primitive | CLI snippets, formulas, auth/onboarding setup examples | Keep public |
| `MetralyLogo` | Brand primitive | Product shell and brand surfaces | Keep public |
| `ThemeProvider`, `MetralyThemeProvider` | System | Token/theme bootstrap in product app | Keep public |
| `MetralyBadge` | Badge primitive | Inline labels, tags, categories | Keep public |
| `StateBadge` | Operational status | Live/stale/error/delayed/new/no-data states | Keep public |

### Surface / data display

| Export | Category | Migration role | Decision |
|---|---|---|---|
| `MetralyCard` | Surface | Base card composition | Keep public |
| `MetralyPanel` | Surface | Larger panel/workspace surfaces | Keep public |
| `MetralyMetricCard` | Metric display | DORA/stat/KPI cards | Keep public |
| `MetralyTable` | Table | Data tables with internal scroll | Keep public |
| `MetralyTelemetryLine` | Dense telemetry row | Widget rows, activity/metric rows | Keep public |
| Chart wrappers | Charts | Line/bar/area/composed/sparkline/chart card/tooltip | Keep public |

### Forms and navigation

| Export | Category | Migration role | Decision |
|---|---|---|---|
| `MetralyCheckbox` | Form | Selection/bulk/filter states | Keep public |
| `MetralyRadio` | Form | Single-choice controls | Keep public |
| `MetralySwitch` | Form | Toggles/settings | Keep public |
| `MetralySelect` | Form | Compact selectors and filter composition | Keep public |
| `MetralyTabs` | Navigation | Tabbed content | Keep public |
| `MetralySegmentedControl` | Navigation/form selector | Time range/view toggles | Keep public |
| `MetralyNavigationTree` | Navigation tree | Metrics Explorer tree | Keep public |

### Shell / overlays

| Export | Category | Migration role | Decision |
|---|---|---|---|
| `MetralyShell` | Layout seam | Canonical product app shell | Keep public |
| `MetralySidebar` | Navigation shell | Desktop nav | Keep public |
| `MetralySidebarSection` | Navigation subcomponent | Sidebar grouping | Keep public |
| `MetralySidebarItem` | Navigation subcomponent | Sidebar link/button rows | Keep public |
| `MetralyTopbar` | Header seam | Page/shell header | Keep public |
| `MetralyDrawer` | Overlay | Mobile navigation and setup details | Keep public; a11y hardening required |
| `MetralyBottomSheet` | Mobile overlay/tray | Widget library, mobile utility surfaces | Keep public; a11y hardening required |

### Dashboard

| Export | Migration role | Decision |
|---|---|---|
| `DashboardGrid` | Dashboard layout seam | Keep public |
| `DashboardWidget` | Widget shell | Keep public |
| `DashboardToolbar` | Dashboard action row | Keep public |
| `DashboardEmptyState` | Empty board state | Keep public |
| `DashboardDropZone` | Drop target | Keep public |
| `DashboardResizeHandle` | Resize affordance | Keep public |
| `WidgetPickerCard` | Widget library item | Keep public |
| `defaultDashboardWidgetRegistry` and helpers | Story/demo registry and helper contracts | Keep public |
| Dashboard types | Product adapter typing | Keep public |

---

## 3. Product screen coverage matrix

| Product area | Brandbook coverage | Product-owned pieces | Missing UX documentation | Migration readiness |
|---|---|---|---|---:|
| App shell | `MetralyShell`, sidebar, topbar, drawer | user/workspace state, route selection, permissions | action priority and mobile nav behavior | 8/10 |
| Dashboard overview | cards, metric cards, chart wrappers, table, badges, dashboard widgets | widget data fetching, dashboard persistence | empty/loading/stale/error widget states | 8/10 |
| Board | same as Dashboard | decision whether Board is distinct | naming/IA decision | 5/10 until IA resolved |
| Dashboard editor | dashboard seams, `WidgetPickerCard`, drawer/sheet | drag/drop adapter, save/update logic | mobile widget-library behavior, unsaved changes | 8/10 |
| Dashboard wizard | primitives + wizard recipe | wizard state machine, templates, creation API | source/template/review/error scenarios | 7/10 |
| Metrics Explorer | nav tree, segmented control, inputs/select, charts, tables | metrics API, query/filter state | save-as-widget path, no-results/errors | 8/10 |
| Marketplace | card/button/badge/icon recipes | install/setup API, permissions | installed/error/loading/coming-soon variants | 7/10 |
| Connectors | primitives + table/card/status badges | connector setup, OAuth/API keys, sync status | active connection health states | 5/10 until documented |
| AI Assistant | panel/card/input/button/code/badge composition | chat state, streaming, context, suggestions | contextual modes and trust states | 6/10 |
| Onboarding | primitives + wizard recipe | first-run state, connection validation | activation path and recovery states | 7/10 |
| Settings | primitives, cards, tables, switches | workspace/account settings | scenario inventory needed | 5/10 |

---

## 4. Scenario-to-component mapping

### 4.1 App shell

| UI need | Use from brandbook | Do not add |
|---|---|---|
| Desktop navigation | `MetralySidebar`, `MetralySidebarSection`, `MetralySidebarItem` | `ProductSidebar` |
| Page header | `MetralyTopbar` | `ProductTopbar` |
| Mobile navigation | `MetralyDrawer` | separate nav modal |
| Mobile utility tray | `MetralyBottomSheet` | per-screen custom sheet |
| Workspace/user footer | sidebar slot composition | `MetralyUserBlock` for now |
| Command/search entry | `MetralyInput` + optional kbd/badge composition | `MetralyCommandSearch` for now |

### 4.2 Dashboard overview

| UI need | Use from brandbook | Product-owned |
|---|---|---|
| Dashboard layout | `DashboardGrid` | grid persistence/data adapter |
| Widget chrome | `DashboardWidget` | widget-specific renderer |
| KPI cards | `MetralyMetricCard` | metric value computation |
| Chart widgets | chart wrappers + `MetralyChartCard` | data transforms |
| Table widgets | `MetralyTable` | row actions/data |
| Widget status | `StateBadge` | status semantics from API |
| Empty board | `DashboardEmptyState` | CTA routing/copy |

### 4.3 Dashboard editor

| UI need | Use from brandbook | Product-owned |
|---|---|---|
| Edit toolbar | `DashboardToolbar`, `MetralyButton`, `StateBadge` | save/discard logic |
| Drag layout | `DashboardGrid`, `DashboardWidget` | `react-grid-layout` adapter |
| Drop target | `DashboardDropZone` | drag event wiring |
| Resize control | `DashboardResizeHandle` | layout mutation |
| Widget library item | `WidgetPickerCard` | widget catalog data |
| Mobile library | `MetralyBottomSheet` | open/close/search state |
| Unsaved changes | `StateBadge`, `MetralyButton` | dirty-state detection |

### 4.4 Metrics Explorer

| UI need | Use from brandbook | Product-owned |
|---|---|---|
| Metric tree | `MetralyNavigationTree` | metric taxonomy/data |
| Search | `MetralyInput` | search query behavior |
| Time/view toggle | `MetralySegmentedControl` | selected range/query |
| Filter selector | `MetralySelect` | filter values |
| Current metric summary | `MetralyMetricCard`, `StateBadge` | metric semantics |
| Trend charts | chart wrappers | query/data transform |
| Raw data | `MetralyTable` | pagination/export |
| Save as widget | `MetralyButton` + dashboard adapter | widget creation |

### 4.5 Marketplace and connectors

| UI need | Use from brandbook | Product-owned |
|---|---|---|
| Integration card | `MetralyCard`, `MetralyIcon`, badges, buttons | install/setup behavior |
| Installed/setup/error states | `StateBadge`, `MetralyBadge` | connector status mapping |
| Setup instructions | `MetralyCodeBlock`, inputs, buttons | provider-specific steps |
| Connector health table | `MetralyTable`, `StateBadge` | sync diagnostics |
| Retry/reconnect actions | `MetralyButton` | API calls |
| Mobile setup details | `MetralyDrawer` or `MetralyBottomSheet` | step state |

### 4.6 Onboarding and dashboard wizard

| UI need | Use from brandbook | Product-owned |
|---|---|---|
| Step container | `MetralyCard`/`MetralyPanel` recipe | wizard state machine |
| Step navigation | `MetralyButton`, recipe stepper | route/step validation |
| Source selection | `MetralySelect`, cards, badges | provider list |
| Setup code/API key examples | `MetralyCodeBlock`, `MetralyInput` | secret handling |
| Validation status | `StateBadge`, `MetralyTelemetryLine` | validation polling |
| Template selection | `MetralyCard`, `MetralyRadio`/cards | template schema |
| Review/create | `MetralyButton`, `MetralyTable`/cards | creation API |

### 4.7 AI Assistant

| UI need | Use from brandbook | Product-owned |
|---|---|---|
| Assistant panel | `MetralyPanel`/`MetralyCard` | assistant route/state |
| Prompt input | `MetralyInput`, `MetralyButton` | submit/stream logic |
| Context chip | `MetralyBadge`, `StateBadge` | selected entity context |
| Suggested actions | `MetralyButton`, `MetralyIcon` | action execution |
| Code/query snippets | `MetralyCodeBlock` | generated content handling |
| Streaming messages | product component | chat bubble/streaming UI |

---

## 5. Component coverage matrix

| Need | Current coverage | Coverage | Notes |
|---|---|---:|---|
| Action buttons | `MetralyButton` | full | Do not add polymorphic API until product migration proves need. |
| Text/search/password fields | `MetralyInput` | full | Label/description/error/icon slots are enough. |
| Icons | `MetralyIcon` | full / evolving | Add typed icon paths only when migration finds gaps. |
| Code/CLI/formula blocks | `MetralyCodeBlock` | full | Needed for setup/onboarding/auth/query examples. |
| Inline badges | `MetralyBadge` | full | Variants: `primary`, `secondary`, `success`, `warning`, `error`, `info`. |
| Operational status | `StateBadge` | full | Use for live/stale/error/delayed/no-data/new states. |
| Cards/panels | `MetralyCard`, `MetralyPanel` | full | Compose product cards from these. |
| Metric cards | `MetralyMetricCard` | full | DORA/KPI/dashboard stats. |
| Tables | `MetralyTable` | full | Must scroll internally, never force body overflow. |
| Basic forms | checkbox/radio/switch/select | full | No new primitive needed. |
| Tab navigation | `MetralyTabs` | full | Separate from segmented control. |
| Segmented selectors | `MetralySegmentedControl` | full | Time/view toggles. |
| Hierarchical navigation | `MetralyNavigationTree` | full for Metrics Explorer | Group selection remains deferred. |
| App shell | `MetralyShell` | full | Canonical shell container. |
| Sidebar | `MetralySidebar` | full | Product specifics stay slots. |
| Topbar | `MetralyTopbar` | full | Action priority still needs recipe documentation. |
| Mobile nav overlay | `MetralyDrawer` | partial | Focus trap/body lock required before production migration. |
| Mobile utility tray | `MetralyBottomSheet` | partial | Same a11y gap as drawer. |
| Dashboard grid/widgets | dashboard exports | full | Product adapter remains outside package. |
| Chart cards/wrappers | chart exports | mostly full | Gauge/heatmap deferred. |
| Widget library rows | `WidgetPickerCard` | full | Mobile sheet scenario still needs verification. |
| Auth form | primitives + recipe | recipe | Do not add public `AuthCard`. |
| Marketplace card | card/button/badge/icon + recipe | recipe | Do not add public `PluginCard`. |
| Wizard stepper | recipe | partial | Keep recipe-only until more reuse evidence. |
| AI chat | primitives + product code | partial | Chat bubbles/streaming are product-specific. |

---

## 6. Gaps that require documentation, not new components

| Gap | Why not a component yet | Documentation target |
|---|---|---|
| Dashboard vs Board naming | IA/product decision, not UI primitive | plan + scenario audit |
| Dashboard wizard | stateful creation flow | wizard recipe + scenario audit |
| Connector health | product semantics/API statuses | scenario audit |
| AI Assistant context | product logic/trust model | scenario audit |
| Marketplace installed/error states | recipe variants enough | IntegrationCard recipe |
| Widget library mobile behavior | existing bottom sheet + cards enough | DashboardEditor scenario |
| Topbar action priority | layout recipe decision | shell recipe |
| Save metric as widget | cross-screen workflow | MetricsExplorer recipe |

---

## 7. Deferred public APIs

| Possible API | Trigger before implementation | Current decision |
|---|---|---|
| `MetralyPopover` | Repeated anchored overlay/picker pattern | defer |
| `MetralyGauge` | Gauge appears in multiple migrated screens | defer |
| `MetralyHeatmap` | Heatmap appears in multiple migrated screens | defer |
| `MetralyFilterPill` | `MetralySelect` composition cannot support filters cleanly | defer |
| `WizardStepIndicator` | Third reusable wizard flow appears | recipe-only |
| `PluginCard` / `MarketplaceCard` | Three repeated integration card surfaces with stable props | recipe-only |
| `MessageBubble` / chat components | Assistant UI becomes generic and stable | product-only |
| `ProductDashboardRenderer` | never | product adapter only |

---

## 8. Rejected public components

| Component | Reason | Alternative |
|---|---|---|
| `DraggableTweaksPanel` | Demo/developer utility | Product-only |
| `AIOnlyCard` | Product-specific assistant surface | Panel/card composition |
| `MetricsExplorerSidebar` | Too screen-specific | Sidebar + navigation tree + input |
| `ProductTopbar` | Duplicates `MetralyTopbar` | Topbar slots |
| `MetralyNotificationButton` | Too narrow | Button + badge/dot composition |
| `MetralyUserBlock` | Product-specific sidebar footer | Sidebar footer slot |
| `MetralyCommandSearch` | Too narrow today | Input + kbd/badge composition |
| Product dashboard renderer | Data/layout integration | Product adapter |

---

## 9. Storybook coverage and required additions

| Story group | Current role | Required follow-up |
|---|---|---|
| `Scenarios/DashboardEditor` | Key migration benchmark | Add/verify mobile widget-library sheet behavior and unsaved state. |
| `Scenarios/ComponentStateBoard` | Regression benchmark | Keep as required smoke test. |
| `Patterns/MetralyShell` | App shell recipe | Add action priority/mobile nav notes after overlay hardening. |
| `Patterns/MetricsExplorerRecipe` | Explorer migration recipe | Add loading/empty/error/no-results and save-as-widget states. |
| `Patterns/IntegrationCardRecipe` | Marketplace recipe | Add installed/loading/error/setup-required/coming-soon states. |
| `Patterns/AuthFormRecipe` | Auth composition | Keep recipe-only. |
| `Patterns/WizardLayoutRecipe` | Wizard composition | Expand with onboarding/dashboard-wizard examples; keep recipe-only. |
| `Components/MetralyDrawer` | Overlay seam | Add focus trap/restore/body-lock tests/stories. |
| `Components/MetralyBottomSheet` | Mobile utility seam | Add focus trap/restore/body-lock tests/stories. |

---

## 10. Migration readiness score

| Area | Score | Blocking issue | Next action |
|---|---:|---|---|
| Foundation primitives | 9/10 | Product icon gaps unknown | Start migration with typed gap list |
| Shell/navigation | 8/10 | Overlay a11y and action priority | Phase 1a/1b |
| Dashboard overview | 8/10 | State documentation | Phase 2 |
| Dashboard editor | 8/10 | Mobile widget library verification | Phase 2 |
| Metrics Explorer | 8/10 | Save-as-widget and error states | Phase 3 |
| Marketplace | 7/10 | More state variants | Phase 4 |
| Connectors | 5/10 | Scenario not documented enough | Phase 4 |
| Onboarding | 7/10 | Activation flow needs details | Phase 5 |
| Dashboard wizard | 7/10 | Product state machine details | Phase 5 |
| AI Assistant | 6/10 | Context/streaming/trust states | Phase 6 |
| Settings | 5/10 | Inventory needed | Future audit |

---

## 11. Verification matrix

Run:

```bash
npm run ui:check
npm run site:typecheck
npm run site:test
npm run build-storybook
npm run test:e2e
```

Manual viewport matrix:

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

Required checks:
- no body-level horizontal overflow;
- internal scroll for tables/charts;
- focus-visible state on all controls;
- drawer/sheet keyboard behavior;
- topbar wrapping/action priority;
- sidebar collapsed/drawer behavior;
- dashboard editor widget-library behavior;
- chart/table clipping;
- selected/disabled/loading/error states;
- idle surfaces remain pulse/glow-free.

---

## 12. Current conclusion

`@metraly/ui` is ready as a migration foundation, but the migration will fail if product scenarios remain ambiguous.

Do not add more public components now.

Next work should be:

```text
1. Harden overlay accessibility.
2. Verify shell/mobile behavior.
3. Expand scenario recipes for Dashboard Editor, Metrics Explorer, Integrations/Connectors, Onboarding/Wizard, and AI Assistant.
4. Only then begin product migration into getmetraly/metraly/ui.
```
