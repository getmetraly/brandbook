# Metraly UI — Storybook Gap Matrix

**Status:** Phase 2 gate input — all P0 stories required before app migration.
**Date:** 2026-05-15
**Scope:** `getmetraly/brandbook/stories/`
**Related:** `metraly-ui-stabilization-gap-report.md`, `metraly-ui-pre-migration-stabilization-checklist.md`

---

## Legend

- **Exists**: Story file found in `stories/` directory.
- **Partial**: Story exists but is a recipe or covers only a subset of required states.
- **Missing**: No story file found.
- **Priority**: P0 = required before any migration / P1 = required before dashboard-editor migration / P2 = required before AI/Plugins migration.

---

## 1. Component stories

### Primitives

| Story target | Current story file | Status | Required states missing | Priority | Notes |
|---|---|---|---|---|---|
| `Components/Button` | `MetralyButton.stories.tsx` | **Exists** | Destructive variant, full-width mobile, wrapped action row | P0 | Add 3 missing states |
| `Components/Input` | `MetralyInput.stories.tsx` | **Exists** | Long value, combined icons, mobile full-width | P0 | Add 3 missing states |
| `Components/Select` | `MetralyForms.stories.tsx` (combined) | **Partial** | Open state, error, long options, compact filter, mobile | P0 | Needs dedicated story with all states |
| `Components/Tabs` | None | **Missing** | All — keyboard nav, Arrow keys, overflow, route-link alternative | **P0** | High a11y risk |
| `Components/IconButton` | None | **Missing** | label/aria-label, selected, disabled, dense toolbar | P0 | Used in toolbar rows |
| `Components/Checkbox` | In `MetralyForms.stories.tsx` | **Partial** | Indeterminate state, error | P1 | |
| `Components/Switch` | In `MetralyForms.stories.tsx` | **Partial** | Loading, description | P1 | |

### Telemetry and status

| Story target | Current story file | Status | Required states missing | Priority | Notes |
|---|---|---|---|---|---|
| `Components/StatusBadge` | `StateBadge.stories.tsx` (old name) | **Partial** | Full canonical taxonomy: Live, Preview, Designed, Planned, In progress, Gated, Policy defined, Benchmark pending, Coming soon, Error, Delayed, No data | **P0** | Must rename to StatusBadge; must cover all 12 canonical states |
| `Components/HealthPill` | `StateBadge.stories.tsx` (mixed) | **Partial** | Connector-specific states: failed auth, rate-limited, syncing, delayed, disabled/gated | **P0** | Needs dedicated HealthPill story |
| `Components/TrendBadge` | **Missing** | **Missing** | up/down/flat, positive/negative/neutral, compact, table-cell usage | **P0** | Component does not exist in brandbook |
| `Components/PulseMarker` | `PulseMarker.stories.tsx` | **Partial** | broader product integrations | **P0** | Semantic pulse primitive now exists |

### Surfaces

| Story target | Current story file | Status | Required states missing | Priority | Notes |
|---|---|---|---|---|---|
| `Foundation/CardShell` | covered by `CardShell.test.tsx`; direct story optional | **Implemented** | Direct visual story optional; public stories remain semantic card components | P0 | Shared surface foundation for Card/MetricCard/WidgetShell |
| `Components/Card` | `MetralyCard.stories.tsx` | **Exists** | tone variants, interactive-selected, error tone, hover/focus without layout jump | P0 | Composes CardShell; add missing states |
| `Components/Panel` | None found | **Missing** | default, nested sections, scrollable, mobile stacked | P0 | `MetralyPanel` exists but no story |
| `Components/MetricCard` | `MetralyMetricCard.stories.tsx` | **Partial** | richer dashboard recipes | **P0** | Composes CardShell; canonical state matrix now covered |
| `Components/WidgetShell` | `DashboardWidget.stories.tsx` | **Partial** | editMode, gated, stale, with footer, mobile stacked | **P0** | Composes CardShell; widget chrome remains separate |
| `Components/WidgetCatalogCard` | `WidgetPickerCard.stories.tsx` | **Partial** | gated, coming-soon, requiresPro, long text, preview pane | **P0** | Full-width layout risk confirmed |
| `Components/DataTable` | `MetralyTable.stories.tsx` | **Partial** | error, bulk actions, richer internal-scroll scenarios | **P0** | mobile cards/stacked now covered |
| `Components/EmptyState` | None found | **Missing** | dashboard empty, connector empty, no results, permission-gated | **P0** | `DashboardEmptyState` in code but no story |
| `Components/Skeleton` | None found | **Missing** | card skeleton, table skeleton, widget skeleton, reduced-motion | **P0** | Component does not exist |
| `Components/FilterBar` | None found | **Missing** | compact, overflow, reset, mobile collapsed | **P0** | Component does not exist |

### Board / Dashboard editing

| Story target | Current story file | Status | Required states missing | Priority | Notes |
|---|---|---|---|---|---|
| `Components/BoardCanvas` | `BoardCanvas.stories.tsx` | **Partial** | drag/edit states, full-width widget mix | P1 | Base populated/empty/narrow coverage exists |
| `Components/BoardToolbar` | `DashboardToolbar.stories.tsx` | **Partial** | unsaved changes, save success/error, mobile action collapse | P1 | |
| `Components/BoardDropZone` | `DashboardDropZone.stories.tsx` | **Partial** | product-level keyboard placement flow | P1 | SVG icon + action fallback now covered |
| `Components/GripHandle` | `GripHandle.stories.tsx` | **Partial** | disabled, touch target | P1 | `DashboardResizeHandle` now storied |
| `Components/MoveMenu` | `MoveMenu.stories.tsx` | **Partial** | boundary states | **P1** | Primitive exists; editor integration still pending |

### Overlays

| Story target | Current story file | Status | Required states missing | Priority | Notes |
|---|---|---|---|---|---|
| `Components/Drawer` | `MetralyDrawer.stories.tsx` | **Partial** | stacked workflow variants | P0 | Focus restore and body scroll lock are now covered by story + site test |
| `Components/BottomSheet` | `MetralyBottomSheet.stories.tsx` | **Partial** | widget catalog variations beyond demo content | P0 | Long content and focus restore are now covered by story + site test |
| `Components/TraceDrawer` | None found | **Missing** | AI provenance drawer, keyboard close, long trace | P2 | AI component — later phase |
| `Components/PluginReviewDrawer` | None found | **Missing** | permissions, signing, version/update/revocation, gated install | P2 | Plugins phase |

### Wizards

| Story target | Current story file | Status | Required states missing | Priority | Notes |
|---|---|---|---|---|---|
| `Components/WizardLayout` | `WizardLayout.stories.tsx` | **Partial** | first/last/error step variants | P1 | Public component exists; dedicated sub-primitives still not extracted |
| `Components/StepRail` | None found | **Missing** | current, completed, invalid, locked/gated | P1 | Component does not exist |
| `Components/ReviewPanel` | None found | **Missing** | connector review, dashboard review, plugin review | P1 | Component does not exist |
| `Components/StickyWizardFooter` | None found | **Missing** | disabled next, loading submit, mobile safe-area | P1 | Component does not exist |

### AI and plugins

| Story target | Current story file | Status | Required states missing | Priority | Notes |
|---|---|---|---|---|---|
| `Components/AIWorkspaceLayout` | None found | **Missing** | all context modes | P2 | Component does not exist |
| `Components/EvidencePanel` | None found | **Missing** | synthetic, live, BYO, missing, stale | P2 | Component does not exist |
| `Components/AnswerCard` | None found | **Missing** | streaming, partial, failed, uncertainty, suggested action | P2 | Component does not exist |
| `Components/PluginCatalog` | None found | **Missing** | live, preview, gated, coming-soon, installed, update | P2 | Component does not exist |
| `Components/PermissionBadge` | None found | **Missing** | read-only, write, network, dangerous | P2 | Component does not exist |
| `Components/SigningBanner` | None found | **Missing** | signed, unsigned, revoked, unknown | P2 | Component does not exist |

---

## 2. Scenario stories

| Scenario story | Current file | Status | Required states missing | Priority |
|---|---|---|---|---|
| `Scenarios/AppShell` | `MetralyShell.stories.tsx` | **Partial** | All primary routes, mobile drawer, gated nav item | **P0** |
| `Scenarios/AppShellRoleContext` | `AppShellRoleContext.stories.tsx` | **Partial** | more route permutations | **P0** |
| `Scenarios/DashboardOverview` | `Dashboard.stories.tsx` | **Partial** | loading, empty, stale data, widget error, permission-limited, mobile stack | **P0** |
| `Scenarios/DashboardEditor` | `Dashboard.stories.tsx` (partial) | **Partial** | keyboard move fallback, unsaved changes, save error, mobile widget catalog | P1 |
| `Scenarios/MetricsExplorer` | `MetricsExplorerRecipe.stories.tsx` | **Partial** | no results, stale data, query error, save as widget | P1 |
| `Scenarios/ConnectorWizard` | `AuthFormRecipe.stories.tsx` (partial) | **Partial** | permission review, dry run, partial errors, failed auth, rate limit, health handoff | P1 |
| `Scenarios/DashboardWizard` | `DashboardWizard.stories.tsx` | **Partial** | no-connectors state, policy approval variants beyond one blocked case | P1 |
| `Scenarios/AIWorkspace` | None found | **Missing** | all context modes, evidence panel, failed answer, suggested action | P2 |
| `Scenarios/Plugins` | None found | **Missing** | catalog, gated marketplace, review drawer, permissions, signing, install blocked | P2 |
| `Scenarios/Settings` | None found | **Missing** | account/workspace/settings, table/form/switch states | P2 |

---

## 3. Existing stories not in the plan (to evaluate)

| Story file | Content | Keep / Rename / Delete |
|---|---|---|
| `FoundationTokens.stories.tsx` | Token reference — visual token gallery | Keep — useful reference |
| `MetralyCodeBlock.stories.tsx` | Code block component | Keep |
| `MetralyControlStates.stories.tsx` | Component state board | Keep — expand with new components |
| `MetralyForms.stories.tsx` | Form controls combined | Keep — extract Select into dedicated story |
| `MetralyNavigationTree.stories.tsx` | Navigation tree | Keep |
| `MetralySegmentedControl.stories.tsx` | Segmented control | Keep — document as alternative to pseudo-tabs |
| `ChartWrappers.stories.tsx` | Chart wrapper components | Keep |
| `IntegrationCardRecipe.stories.tsx` | Integration card recipe | Keep — relates to Connectors |
| `NewComponentStateBoard.stories.tsx` | State board for new components | Keep — extend |
| `StateBadge.stories.tsx` | StateBadge / HealthPill | Rename → `StatusBadge.stories.tsx`; extend with canonical taxonomy |

---

## 4. Viewport coverage

Required viewports per the responsive gate. Not verified in this pass — manual or Storybook viewport check needed:

| Width | Critical stories to check |
|---|---|
| 320px | DashboardEditor, WidgetShell, DataTable, BottomSheet, WizardLayout, BoardToolbar |
| 375px | AppShell, DashboardOverview, MetricsExplorer |
| 390px | Same |
| 430px | Same + FilterBar |
| 768px | AppShell, DashboardEditor, MetricsExplorer, ConnectorWizard |
| 1024px | All |
| 1280px | All |
| 1440px | All |

---

## 5. Priority summary

### P0 — Required before any component is consumed in the app

New or updated stories needed:
- `Components/Tabs` — new, full a11y coverage
- `Components/IconButton` — new
- `Components/StatusBadge` — rename + expand to full canonical taxonomy
- `Components/HealthPill` — dedicated story
- `Components/TrendBadge` — component + story
- `Components/PulseMarker` — integrate into product-facing semantic recipes
- `Components/Panel` — new
- `Components/MetricCard` — expand missing states
- `Components/WidgetShell` — expand missing states
- `Components/WidgetCatalogCard` — expand missing states
- `Components/DataTable` — expand missing states including mobile
- `Components/EmptyState` — component + story
- `Components/Skeleton` — component + story
- `Components/FilterBar` — component + story
- `Components/Drawer` — expand focus/restore states
- `Components/BottomSheet` — expand mobile scroll states
- `Scenarios/AppShell` — expand to full route coverage
- `Scenarios/AppShellRoleContext` — new
- `Scenarios/DashboardOverview` — expand missing states

### P1 — Required before dashboard/editor migration

- `Components/BoardCanvas` — new
- `Components/BoardToolbar` — expand missing states
- `Components/BoardDropZone` — expand keyboard states
- `Components/GripHandle` — new
- `Components/MoveMenu` — component + story
- `Components/WizardLayout` — extract from recipe into component + story
- `Components/StepRail` — component + story
- `Components/ReviewPanel` — component + story
- `Components/StickyWizardFooter` — component + story
- `Components/Select` — dedicated story with all states
- `Scenarios/DashboardEditor` — expand to keyboard move + mobile
- `Scenarios/MetricsExplorer` — expand missing states
- `Scenarios/ConnectorWizard` — expand review + error states
- `Scenarios/DashboardWizard` — new

### P2 — Required before AI/Plugins migration

- All AI components (`AIWorkspaceLayout`, `EvidencePanel`, `AnswerCard`, `TraceDrawer`)
- All Plugin components (`PluginCatalog`, `PluginReviewDrawer`, `PermissionBadge`, `SigningBanner`)
- `Scenarios/AIWorkspace` — new
- `Scenarios/Plugins` — new
- `Scenarios/Settings` — new


## Storybook foundation coverage update — 2026-05-15

Storybook coverage should now verify not only semantic components, but also the shared foundations behind them:

| Foundation | Stories/checks that must remain covered |
|---|---|
| `FieldShell` | input/select/checkbox/radio/switch/filter bar label, helper, error, loading, disabled, mobile alignment |
| `OverlayShell` | drawer, bottom sheet, mobile sidebar, Escape close, focus trap, body lock |
| `StateBlock` | empty, error, gated, no-results, loading inside cards/widgets/tables |
| `NavigationItemFrame` | sidebar collapsed/expanded, tree rows, meta overflow, selected/accent state |
| `useRovingSelection` | tabs and segmented control keyboard behavior |
| `HandlePrimitive` | drag handle, resize handles, move menu, drop zone active/rejected states |

Any future visual bugfix that touches one semantic component must check whether the fix belongs in the foundation instead.

## WizardLayout visual rhythm update — 2026-05-15

| Storybook surface | Previous risk | Updated direction | QA notes |
|---|---|---|---|
| `Scenarios/DashboardWizard/*` | Side rail made product flows feel unlike the demo app wizard. | Default `WizardLayout` now uses a horizontal top stepper and centered wizard card. | Verify desktop, tablet and mobile widths; check step labels, card width, footer placement. |
| `WizardLayout` primitive stories | Rail and product flow were visually conflated. | `progressPlacement="side"` remains available for rail documentation only. | Add explicit side-rail story if needed. |
| Connector/onboarding wizard scenarios | Could fork local shells. | Use the same top-stepper composition and card/body/footer slot contract. | No one-off wizard shell CSS in future stories. |

## Dashboard/Connector wizard split update — 2026-05-15

| Storybook surface | Required visual target | QA checklist |
|---|---|---|
| `Components/WizardLayout/Default` | Connector Setup Preview style: top progress, centered card, source tiles, footer actions | Compare with `/demo-app#/wizard` select-sources flow; no side rail by default. |
| `Components/WizardLayout/SideRailReference` | Documentation-only rail example | Ensure it is clearly not the default product wizard. |
| `Scenarios/DashboardWizard/*` | Dashboard Preview style: left builder panel and right dashboard preview | Compare with `/demo-app#/dash-wizard`; verify Template, Widgets, Settings stages. |


### Wizard Storybook gap update

- `Components/WizardLayout`: now expected to expose source selection, preview connection, configure, and review stories.
- `Scenarios/DashboardWizard`: now expected to use AppShellRoleContext-like sidebar/header rhythm and include widget search in the review bundle step.
