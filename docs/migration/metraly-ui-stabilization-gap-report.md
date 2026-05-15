# Metraly UI — Stabilization Gap Report

**Status:** Phase 2 gate reviewed on 2026-05-15 — Phase 3 compat-import migration is unblocked with known follow-up risks.
**Date:** 2026-05-15
**Scope:** `getmetraly/brandbook/packages/ui` + Storybook stories + `getmetraly/metraly/app/ui` visual harness
**Related:** `metraly-ui-pre-migration-stabilization-checklist.md`, `metraly-ui-storybook-gap-matrix.md`

---

## 1. Automated checks — brandbook

Commands run against `getmetraly/brandbook`:

| Command | Status | Notes |
|---|---|---|
| `npm run ui:check` | Pass | Verified after adding `StatusBadge`. |
| `npm run site:typecheck` | Pass | Verified after adding `StatusBadge`. |
| `npm run site:test` | Pass | Verified after adding `StatusBadge` tests. |
| `npm run build-storybook` | Pass | Verified after adding `StatusBadge` story. |
| `npm run test:e2e` | Not verified in this pass | Run manually. |

Automated checks were run in this pass. Visual stability is still not claimed beyond a successful Storybook build.

---

## 2. Automated checks — metraly/app/ui

Commands available and status:

| Command | Available | Status | Notes |
|---|---|---|---|
| `npm run test` | Yes | Pass | `vitest run` — unit tests only |
| `npm run build` | Yes | Pass | `vite build` |
| `npm run lint` | Yes | Not run in this pass | ESLint |
| `npm run typecheck` | Yes | Pass | `tsc --noEmit` script added and verified |
| `npm run build-storybook` | Yes | Pass | Storybook 10.4.0 scaffolded in `app/ui`; static build verified |
| `npm run storybook` | Yes | Not run in this pass | Local visual harness now available on port 6007 |
| `npm run test:a11y` | Yes | Pass | `jest-axe` smoke coverage verifies compat adapters and a screen-level consumer |
| `npm run test:visual` | Yes | Pass | Playwright snapshots cover `Compat/Surfaces` desktop + mobile against built Storybook |

---

## 3. Token and CSS drift — brandbook

Current drift check results:

- No hardcoded hex colors found in `packages/ui/src` or `stories`.
- `rgba()` still exists in chart internals and a few shadow effects:
  - chart grid / active-bar styling in `packages/ui/src/charts/*`
  - `box-shadow` entries in `packages/ui/src/styles/metraly-forms.css` and `metraly-wizard.css`
- These remaining `rgba()` usages are isolated presentation details, not legacy token-system aliases.

This is acceptable for Phase 3 compat-import work, but not a blanket claim that every visual value is tokenized.

---

## 4. Token and CSS drift — metraly/app/ui

Raw color violations confirmed by code inspection:

| File | Violations |
|---|---|
| `components/ui/Badge.tsx` | Cleaned on 2026-05-15. Uses token-driven `color-mix(...)`; status taxonomy is still legacy and should migrate to `StatusBadge` later. |
| `App.tsx` | Multiple `rgba()` and hex values throughout login screen and first-run screen (inline `style={}`) |
| `features/plugins/PluginScreen.tsx` | Per-plugin brand colors hardcoded: `#E8EDF5`, `#2684FF`, `#B44CFF`, `#4A154B`, `#06AC38`, `#FF9100`, `#5E6AD2`, `#FF6B35`, `#00E5FF` |

These are confirmed blockers for the design-system gate.

---

## 5. Component readiness matrix — Brandbook `@metraly/ui`

Components required by the migration plan, assessed against what exists in `packages/ui/src/`:

| Component | Exists in brandbook | Story exists | Missing states | Visual risk | A11y risk | Responsive risk | Blocks migration |
|---|---|---|---|---|---|---|---|
| `MetralyButton` → `Button` | Yes | Yes (`MetralyButton.stories.tsx`) | Destructive variant, full-width mobile, wrapped action row | Low | Low | Low | No |
| `MetralyInput` → `Input` | Yes | Yes (`MetralyInput.stories.tsx`) | Long value, icon combinations, mobile full-width | Low | Low | Medium | No |
| `MetralySelect` → `Select` | Yes | Partial (in `MetralyForms.stories.tsx`) | Open state, error, long options, compact filter usage | Medium | Low | Medium | No |
| `MetralyTabs` → `Tabs` | Yes | Yes (`MetralyTabs.stories.tsx`) | route-link alternative remains documentation-only | Medium | Low | Medium | No |
| `CardShell` / `CardFrame` foundation | Yes | Covered by surface tests | Additional direct story optional; semantic cards remain public stories | Medium | Low | Low | No |
| `MetralyCard` → `Card` | Yes, composed from `CardShell` | Yes (`MetralyCard.stories.tsx`) | Tone variants, interactive selected, error, hover/focus states | Medium | Low | Low | No |
| `MetralyPanel` → `Panel` | Yes | None found (in `NewComponentStateBoard`?) | All states | Medium | Low | Medium | No |
| `MetralyMetricCard` → `MetricCard` | Yes, composed from `CardShell` | Yes (`MetralyMetricCard.stories.tsx`) | richer dashboard recipes | Medium | Low | Low | No |
| `DashboardWidget` → `WidgetShell` | Yes, composed from `CardShell` while retaining widget chrome | Yes (`DashboardWidget.stories.tsx`) | editMode, gated, stale remain integration follow-ups | Medium | Low | Medium | No |
| `WidgetPickerCard` → `WidgetCatalogCard` | Yes | Yes (`WidgetPickerCard.stories.tsx`) | semantic alias + product-catalog integration remain follow-ups | Medium | Low | Medium | No |
| `MetralyTable` → `DataTable<Row>` | Yes | Yes (`MetralyTable.stories.tsx`) | richer responsive datasets remain optional | Medium | Low | Medium | No |
| `EmptyState` / `DashboardEmptyState` | Partial (`MetralyEmptyState` + `DashboardEmptyState`) | Yes (`MetralyEmptyState.stories.tsx`) | Dashboard-specific integration still missing | Medium | Low | Medium | No |
| `MetralyBadge` → `Badge`/`StatusBadge` split | `MetralyBadge` and `StatusBadge` exist | Partial (`StatusBadge.stories.tsx`, `StateBadge.stories.tsx`) | app-side adoption still pending | Medium | Low | Low | No |
| `StateBadge` → `HealthPill` | `StateBadge` exists | Yes (`StateBadge.stories.tsx`) | connector-specific product states remain future work | Medium | Low | Low | No |
| `TrendBadge` | Yes | Yes (`TrendBadge.stories.tsx`) | Screen-level integration into cards/tables | Medium | Low | Low | No |
| `PulseMarker` | Yes | Yes (`PulseMarker.stories.tsx`) | broader product integrations | Medium | Low | Low | No |
| `HealthPill` | Only as `StateBadge` | Partial | Connector-specific health states remain future work | Medium | Low | Low | No |
| `Skeleton` | Yes | Yes (`MetralySkeleton.stories.tsx`) | Screen-level loading recipes | Medium | Low | Low | No |
| `FilterBar` | Yes | Yes (`MetralyFilterBar.stories.tsx`) | Product-specific control compositions | Medium | Low | Medium | No |
| `BoardCanvas` → exists as `DashboardGrid` | `DashboardGrid` exists | Yes (`BoardCanvas.stories.tsx`) | drag/edit state matrix, full-width widget mix | Medium | Low | Medium | No |
| `DashboardToolbar` → `BoardToolbar` | Yes | Yes (`DashboardToolbar.stories.tsx`) | unsaved changes, save error, mobile collapse | Medium | Low | Medium | No |
| `DashboardDropZone` → `BoardDropZone` | Yes | Yes (`DashboardDropZone.stories.tsx`) | pointer-only placement still product-side | Medium | Medium | Medium | No |
| `GripHandle` / `DashboardResizeHandle` | `DashboardResizeHandle` exists | Yes (`GripHandle.stories.tsx`) | disabled, touch target | Medium | Medium | Medium | No |
| `MoveMenu` | Yes | Yes (`MoveMenu.stories.tsx`) | boundary states | Medium | Medium | Low | No |
| `MetralyDrawer` → `Drawer` | Yes | Yes (`MetralyDrawer.stories.tsx`) | stacked workflow variants | Medium | Medium | Medium | No |
| `MetralyBottomSheet` → `BottomSheet` | Yes | Yes (`MetralyBottomSheet.stories.tsx`) | product-specific catalog variants | Medium | Medium | Medium | No |
| `WizardLayout` | Yes (`WizardLayout`) | Yes (`WizardLayout.stories.tsx`) | first/last/error step variants remain optional | Medium | Medium | Medium | No |
| `StepRail` | Yes | Yes (`StepRail.stories.tsx`) | invalid / locked are future extensions | Medium | Low | Medium | No |
| `ReviewPanel` | Yes | Yes (`ReviewPanel.stories.tsx`) | plugin review specialization remains future work | Medium | Low | Medium | No |
| `StickyWizardFooter` | Yes | Yes (`StickyWizardFooter.stories.tsx`) | disabled next / loading submit can be expanded later | Medium | Low | Medium | No |
| `AIWorkspaceLayout` | Spec only (`docs/migration/ai-plugin-component-spec.md`) | Placeholder story only (`AIWorkspaceLayout.stories.tsx`) | Full implementation deferred to Phase 9 | High | Low | High | **Phase 9 only** |
| `EvidencePanel` | Spec only (`docs/migration/ai-plugin-component-spec.md`) | No implementation story | Full implementation deferred to Phase 9 | High | Low | Medium | **Phase 9 only** |
| `AnswerCard` | Spec only (`docs/migration/ai-plugin-component-spec.md`) | No implementation story | Full implementation deferred to Phase 9 | High | Low | Low | **Phase 9 only** |
| `TraceDrawer` | Spec only (`docs/migration/ai-plugin-component-spec.md`) | No implementation story | Full implementation deferred to Phase 9 | High | High | Medium | **Phase 9 only** |
| `PluginCatalog` | Spec only (`docs/migration/ai-plugin-component-spec.md`) | Placeholder story only (`PluginCatalog.stories.tsx`) | Full implementation deferred to Phase 9 | High | Low | High | **Phase 9 only** |
| `PluginReviewDrawer` | Spec only (`docs/migration/ai-plugin-component-spec.md`) | No implementation story | Full implementation deferred to Phase 9 | High | High | Medium | **Phase 9 only** |
| `PermissionBadge` | Spec only (`docs/migration/ai-plugin-component-spec.md`) | No implementation story | Full implementation deferred to Phase 9 | High | Low | Low | **Phase 9 only** |
| `SigningBanner` | Spec only (`docs/migration/ai-plugin-component-spec.md`) | No implementation story | Full implementation deferred to Phase 9 | High | Low | Low | **Phase 9 only** |

---

## 6. Summary: missing components in brandbook

Components that do not yet exist in `packages/ui/src/`:

```
AIWorkspaceLayout
EvidencePanel
AnswerCard
TraceDrawer
PluginCatalog
PluginReviewDrawer
PermissionBadge
SigningBanner
```

These are no longer Phase 1 blockers. They remain explicitly deferred to Phase 9 (AI Workspace / Plugins migration).

---

## 7. Accessibility risks

| Component | Risk | Specific concern |
|---|---|---|
| `MetralyTabs` | **High** | Tab keyboard semantics (Arrow key navigation) not verified in stories. Pseudo-tabs for route nav are a known risk. |
| `DashboardDropZone` → `BoardDropZone` | Medium | Story now covers the action-button fallback; product placement logic still needs real keyboard wiring later. |
| `DashboardResizeHandle` | Medium | Story confirms label and visible focus; touch-target validation is still manual. |
| `MoveMenu` | Medium | Primitive exists, but editor integration is still pending. |
| `MetralyDrawer` | Medium | Focus restore and body scroll lock are covered by story plus site tests; remaining risk is composition-specific misuse. |
| `MetralyBottomSheet` | Medium | Focus restore and long-content behavior are covered by story plus site tests; remaining risk is product-specific content density. |
| Board editing overall | **High** | Without `MoveMenu`, board editing is drag-only. WCAG 2.1 SC 2.5.1 at risk. |

---

## 8. Responsive risks

| Component | Risk | Specific concern |
|---|---|---|
| `WidgetPickerCard` | **High** | Prior audit found full-width block layout instead of constrained card width in brandbook. |
| `DataTable`/`MetralyTable` | **High** | No mobile card/stacked presentation. No internal scroll verified. |
| `BoardToolbar` | **High** | Secondary action collapse on narrow widths not verified. |
| `WizardLayout` | Medium | Base layout exists and storybook build passes; dedicated first/last/error step variants are still missing. |
| `AIWorkspaceLayout` | **High** | Does not exist — responsive behavior entirely unspecified. |
| `PluginCatalog` | **High** | Does not exist. |
| `BottomSheet` | **Medium-High** | Long content internal scroll not confirmed at 320px. |

---

## 9. App repo conformance gaps

These infrastructure items are required before screen migration can start:

| Item | Status | Required action |
|---|---|---|
| TypeScript check script | **Present** | Verified by `npm run typecheck` |
| Storybook | **Present** | Storybook 10 scaffolded; `npm run build-storybook` passes |
| Visual regression | **Present** | Playwright screenshot baselines now cover app compat surfaces through built Storybook |
| Accessibility testing | **Present** | `jest-axe` smoke tests now cover the compat adapters and `BreakdownTable` consumer |
| `design-system/` folder | **Present** | Skeleton created in `app/ui/src/design-system/`; first live compat consumer can now route through it |
| `compat/` barrel | **Present** | `app/ui/src/design-system/compat/brandbook-legacy.ts` now contains live adapters for placeholder, status, DORA, and table surfaces |
| Token bridge CSS | **Present** | `app/ui/src/design-system/tokens/*.css` exists as bridge placeholders; app entry + Storybook preview now also load the upstream badge/table styles |

---

## 10. Definition of ready — current state

Assessed against the gate from `metraly-ui-pre-migration-stabilization-checklist.md`:

| Gate item | Status |
|---|---|
| P0 component stories exist and pass visual review | **Ready with known follow-up** — Tabs, MoveMenu, BoardDropZone, GripHandle, WizardLayout, StepRail, ReviewPanel, StickyWizardFooter, table states, and widget catalog stories now exist |
| P0 scenario stories exist and pass responsive review | **Ready** — AppShellRoleContext, DashboardWizard, ConnectorWizard, WizardLayout viewports, and app-level Storybook shell/screen stories exist |
| Drawer/BottomSheet/Dialog focus behavior is production-safe | **Ready for existing overlay primitives** — `Drawer` and `BottomSheet` verified by story + site test; no separate dialog primitive is in Phase 3 scope |
| `DataTable<Row>` validated for mobile and dense data | **Ready** — `mobilePresentation`, internal scroll, bulk actions, and error state are covered |
| `WidgetShell` validated across all states | **Ready with integration follow-up** — `CardShell` foundation and widget stories are stable; app editor wiring remains product work |
| Board editing has non-drag fallback | **Ready at primitive level** — `MoveMenu` exists; app-side editor wiring remains follow-up |
| StatusBadge/HealthPill canonical taxonomy represented | **Ready for Phase 3** — `StatusBadge` exists with canonical story; product-specific health variants are future work |
| AppShell stories prove route/nav/title alignment | **Ready** — `AppShellRoleContext` in brandbook and `AppShell` stories in app Storybook cover alignment |
| Token/CSS drift checks clean | **Partial** — no raw hex in brandbook; a few `rgba()` chart/shadow values remain, and app screens still contain known raw colors |
| App repo has typecheck/visual/a11y strategy ready | **Ready with scoped follow-up** — typecheck, Storybook, Playwright visual snapshots, and `jest-axe` smoke coverage are in place; broaden coverage as more screens migrate |

**Conclusion: the Phase 2 stabilization gate is passed for Phase 3 compat-import migration. Remaining risks are app-side raw-color cleanup in feature screens and the deferred Phase 9 AI/Plugins component implementation.**


## Stabilization delta — foundation primitives available

The brandbook now exposes shared foundations that reduce the previous stabilization risk from duplicated component shells:

| Previous risk | Foundation mitigation |
|---|---|
| repeated card/widget footer/header fixes | `CardShell` |
| repeated form label/value/helper alignment fixes | `FieldShell` |
| divergent drawer/bottom-sheet focus and body-lock behavior | `OverlayShell` |
| one-off empty/error/loading blocks | `StateBlock` |
| sidebar/tree visual drift | `NavigationItemFrame` |
| duplicated roving keyboard behavior | `useRovingSelection` |
| pulse/handle/drag affordance drift | `HandlePrimitive` |

Remaining stabilization work is app-level adoption, visual regression coverage, and final replacement of feature-local raw shells.
