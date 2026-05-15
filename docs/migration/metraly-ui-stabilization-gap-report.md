# Metraly UI — Stabilization Gap Report

**Status:** Phase 2 gate — migration is blocked until P0 gaps are resolved.
**Date:** 2026-05-15
**Scope:** `getmetraly/brandbook/packages/ui` + Storybook stories
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
| `build-storybook` | **Missing** | — | No Storybook configured in app repo |
| `test:a11y` | **Missing** | — | No Playwright/axe accessibility testing |
| `test:visual` | **Missing** | — | No visual regression configured |

---

## 3. Token and CSS drift — brandbook

Drift check grep commands were not run in this pass. Based on prior session observations (obs 119, 120):

- No `PulseWave` in production code — confirmed by prior session.
- No hardcoded RGBA in component implementations — confirmed clean per obs 119.
- Old preview layer CSS removed — confirmed per obs 119.

Recommended to re-run before consuming any component in the app:

```bash
cd /path/to/brandbook
rg "#[0-9a-fA-F]{3,8}" packages/ui/src stories
rg "rgba?\(" packages/ui/src stories
rg "--(bg|glass|glass2|border|border2|cyan|purple|success|warning|error|text|muted|muted2)" packages/ui/src/components stories
rg "PulseWave|pulse" packages/ui/src stories
```

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
| `MetralyTabs` → `Tabs` | Yes | None found | All states — keyboard nav, overflow, route-link alternative | High | **High** — tab semantics unverified | Medium | **Yes** |
| `MetralyCard` → `Card` | Yes | Yes (`MetralyCard.stories.tsx`) | Tone variants, interactive selected, error, hover/focus states | Medium | Low | Low | No |
| `MetralyPanel` → `Panel` | Yes | None found (in `NewComponentStateBoard`?) | All states | Medium | Low | Medium | No |
| `MetralyMetricCard` → `MetricCard` | Yes | Yes (`MetralyMetricCard.stories.tsx`) | richer dashboard recipes | Medium | Low | Low | No |
| `DashboardWidget` → `WidgetShell` | Yes | Yes (`DashboardWidget.stories.tsx`) | editMode, gated, stale | Medium | Low | Medium | **Yes** |
| `WidgetPickerCard` → `WidgetCatalogCard` | Yes | Yes (`WidgetPickerCard.stories.tsx`) | Gated, coming-soon, requiresPro, long text | Medium | Low | **High** — full-width layout seen | **Yes** |
| `MetralyTable` → `DataTable<Row>` | Yes | Yes (`MetralyTable.stories.tsx`) | error, bulk actions, richer responsive datasets | Medium | Low | Medium | No |
| `EmptyState` / `DashboardEmptyState` | Partial (`MetralyEmptyState` + `DashboardEmptyState`) | Yes (`MetralyEmptyState.stories.tsx`) | Dashboard-specific integration still missing | Medium | Low | Medium | No |
| `MetralyBadge` → `Badge`/`StatusBadge` split | `MetralyBadge` and `StatusBadge` exist | Partial (`StatusBadge.stories.tsx`, `StateBadge.stories.tsx`) | Sidebar/app integration still missing | Medium | Low | Low | **Yes** |
| `StateBadge` → `HealthPill` | `StateBadge` exists | Yes (`StateBadge.stories.tsx`) | Connector-specific states (rate-limited, failed auth) | Medium | Low | Low | **Yes** |
| `TrendBadge` | Yes | Yes (`TrendBadge.stories.tsx`) | Screen-level integration into cards/tables | Medium | Low | Low | No |
| `PulseMarker` | Yes | Yes (`PulseMarker.stories.tsx`) | broader product integrations | Medium | Low | Low | No |
| `HealthPill` | Only as `StateBadge` | Partial | Connector-specific health states | Medium | Low | Low | **Yes** |
| `Skeleton` | Yes | Yes (`MetralySkeleton.stories.tsx`) | Screen-level loading recipes | Medium | Low | Low | No |
| `FilterBar` | Yes | Yes (`MetralyFilterBar.stories.tsx`) | Product-specific control compositions | Medium | Low | Medium | No |
| `BoardCanvas` → exists as `DashboardGrid` | `DashboardGrid` exists | Yes (`BoardCanvas.stories.tsx`) | drag/edit state matrix, full-width widget mix | Medium | Low | Medium | No |
| `DashboardToolbar` → `BoardToolbar` | Yes | Yes (`DashboardToolbar.stories.tsx`) | unsaved changes, save error, mobile collapse | Medium | Low | **High** | **Yes** |
| `DashboardDropZone` → `BoardDropZone` | Yes | Yes (`DashboardDropZone.stories.tsx`) | pointer-only placement still product-side | Medium | Medium | Medium | No |
| `GripHandle` / `DashboardResizeHandle` | `DashboardResizeHandle` exists | Yes (`GripHandle.stories.tsx`) | disabled, touch target | Medium | Medium | Medium | No |
| `MoveMenu` | Yes | Yes (`MoveMenu.stories.tsx`) | boundary states | Medium | Medium | Low | No |
| `MetralyDrawer` → `Drawer` | Yes | Yes (`MetralyDrawer.stories.tsx`) | stacked workflow variants | Medium | Medium | Medium | No |
| `MetralyBottomSheet` → `BottomSheet` | Yes | Yes (`MetralyBottomSheet.stories.tsx`) | product-specific catalog variants | Medium | Medium | Medium | No |
| `WizardLayout` | Yes (`WizardLayout`) | Yes (`WizardLayout.stories.tsx`) | first/last/error step variants, dedicated `StepRail`/`ReviewPanel` primitives | Medium | Medium | Medium | No |
| `StepRail` | **Missing** | **Missing** | current, completed, invalid, locked | High | Low | Medium | **Yes** |
| `ReviewPanel` | **Missing** | **Missing** | connector, dashboard, plugin review | High | Low | Medium | **Yes** |
| `StickyWizardFooter` | **Missing** | **Missing** | disabled next, loading submit, mobile safe-area | High | Low | **High** | **Yes** |
| `AIWorkspaceLayout` | **Missing** | **Missing** | All context modes | **High** | Low | **High** | **Yes** |
| `EvidencePanel` | **Missing** | **Missing** | synthetic, live, BYO, missing, stale data | **High** | Low | Medium | **Yes** |
| `AnswerCard` | **Missing** | **Missing** | streaming, partial, failed, uncertainty | **High** | Low | Low | **Yes** |
| `TraceDrawer` | **Missing** | **Missing** | All | High | **High** | Medium | **Yes** |
| `PluginCatalog` | **Missing** | **Missing** | All | High | Low | **High** | **Yes** |
| `PluginReviewDrawer` | **Missing** | **Missing** | All | High | **High** | Medium | **Yes** |
| `PermissionBadge` | **Missing** | **Missing** | All permission types | High | Low | Low | **Yes** |
| `SigningBanner` | **Missing** | **Missing** | signed, unsigned, revoked, unknown | High | Low | Low | **Yes** |

---

## 6. Summary: missing components in brandbook

Components that do not yet exist in `packages/ui/src/`:

```
StepRail
ReviewPanel
StickyWizardFooter
AIWorkspaceLayout
EvidencePanel
AnswerCard
TraceDrawer
PluginCatalog
PluginReviewDrawer
PermissionBadge
SigningBanner
```

These are Phase 1 Brandbook work before any app consumption.

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
| TypeScript check script | **Missing** | Add `"typecheck": "tsc --noEmit"` to `package.json` |
| Storybook | **Missing** | Install Storybook or equivalent visual harness |
| Visual regression | **Missing** | Choose tool (Chromatic, Playwright screenshots, or similar) |
| Accessibility testing | **Missing** | Choose tool (axe-playwright, jest-axe, or similar) |
| `design-system/` folder | **Present** | Skeleton created in `app/ui/src/design-system/`; keep it inert until Phase 3 imports are ready |
| `compat/` barrel | **Present** | `app/ui/src/design-system/compat/brandbook-legacy.ts` exists as an empty placeholder |
| Token bridge CSS | **Present** | `app/ui/src/design-system/tokens/*.css` exists as inert bridge placeholders |

---

## 10. Definition of ready — current state

Assessed against the gate from `metraly-ui-pre-migration-stabilization-checklist.md`:

| Gate item | Status |
|---|---|
| P0 component stories exist and pass visual review | **Partial** — PulseMarker and MoveMenu now exist; Tabs and some panel stories still need broader review |
| P0 scenario stories exist and pass responsive review | **Not ready** — AppShell, AppShellRoleContext, DashboardOverview missing; DashboardEditor exists |
| Drawer/BottomSheet/Dialog focus behavior is production-safe | **Partial** — `Drawer` and `BottomSheet` verified by story + site test; dialog-specific checks still absent |
| `DataTable<Row>` validated for mobile and dense data | **Ready at component level** — `mobilePresentation` added; screen-level adoption still pending |
| `WidgetShell` validated across all states | **Partial** — editMode, gated, stale states missing |
| Board editing has non-drag fallback | **Partial** — `MoveMenu` exists; editor wiring still pending |
| StatusBadge/HealthPill canonical taxonomy represented | **Partial** — `StatusBadge` now exists and has a canonical story; HealthPill and downstream integrations remain incomplete |
| AppShell stories prove route/nav/title alignment | **Not ready** — AppShell and AppShellRoleContext stories missing |
| Token/CSS drift checks clean | **Unknown** — not run in this pass; app has known raw color violations |
| App repo has typecheck/visual/a11y strategy ready | **Partial** — typecheck exists; visual/a11y strategy still missing |

**Conclusion: migration to `metraly/app/ui` screens is blocked. Brandbook stabilization must proceed first.**
