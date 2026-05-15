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
| `npm run ui:check` | Not verified in this pass | Run manually to confirm TypeScript clean. |
| `npm run site:typecheck` | Not verified in this pass | Run manually. |
| `npm run site:test` | Not verified in this pass | Run manually. |
| `npm run build-storybook` | Not verified in this pass — known to pass per session obs 163 | Verify is still green after responsive story changes. |
| `npm run test:e2e` | Not verified in this pass | Run manually. |

Automated checks were not run in this pass. Visual stability is not claimed.

---

## 2. Automated checks — metraly/app/ui

Commands available and status:

| Command | Available | Status | Notes |
|---|---|---|---|
| `npm run test` | Yes | Not run in this pass | `vitest run` — unit tests only |
| `npm run build` | Yes | Not run in this pass | `vite build` |
| `npm run lint` | Yes | Not run in this pass | ESLint |
| `typecheck` | **Missing** | — | No `tsc --noEmit` script exists |
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
| `components/ui/Badge.tsx` | `#00C853`, `#FF9100`, `#FF1744`, multiple `rgba()` values hardcoded in component body |
| `App.jsx` | Multiple `rgba()` and hex values throughout login screen and first-run screen (inline `style={}`) |
| `features/marketplace/PluginScreen.tsx` | Per-plugin brand colors hardcoded: `#E8EDF5`, `#2684FF`, `#B44CFF`, `#4A154B`, `#06AC38`, `#FF9100`, `#5E6AD2`, `#FF6B35`, `#00E5FF` |

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
| `MetralyMetricCard` → `MetricCard` | Yes | Partial (`DashboardWidget.stories.tsx` context) | Loading, empty, error, stale, long label/value, compact | **High** | Low | Medium | **Yes** |
| `DashboardWidget` → `WidgetShell` | Yes | Yes (`DashboardWidget.stories.tsx`) | editMode, gated, stale | Medium | Low | Medium | **Yes** |
| `WidgetPickerCard` → `WidgetCatalogCard` | Yes | Yes (`WidgetPickerCard.stories.tsx`) | Gated, coming-soon, requiresPro, long text | Medium | Low | **High** — full-width layout seen | **Yes** |
| `MetralyTable` → `DataTable<Row>` | Yes | Yes (`MetralyTable.stories.tsx`) | Loading, empty, error, status row, summary footer, bulk actions, mobile cards mode | **High** | Low | **High** | **Yes** |
| `EmptyState` / `DashboardEmptyState` | Partial (DashboardEmptyState exists) | None found | All states | High | Low | Medium | **Yes** |
| `MetralyBadge` → `Badge`/`StatusBadge` split | `MetralyBadge` exists; no `StatusBadge` | Partial (`StateBadge.stories.tsx`) | All canonical taxonomy states | **High** | Low | Low | **Yes** |
| `StateBadge` → `HealthPill` | `StateBadge` exists | Yes (`StateBadge.stories.tsx`) | Connector-specific states (rate-limited, failed auth) | Medium | Low | Low | **Yes** |
| `TrendBadge` | **Missing** | **Missing** | All | High | Low | Low | **Yes** |
| `PulseMarker` | **Missing** | **Missing** | Telemetry heartbeat, reduced-motion, anti-pattern doc | **High** | **High** | Low | **Yes** |
| `HealthPill` | Only as `StateBadge` | Partial | Connector-specific health states | Medium | Low | Low | **Yes** |
| `Skeleton` | **Missing** | **Missing** | Card, table, widget skeletons, reduced-motion | High | Low | Low | **Yes** |
| `FilterBar` | **Missing** | **Missing** | Compact, overflow, reset, mobile | High | Low | **High** | **Yes** |
| `BoardCanvas` → exists as `DashboardGrid` | `DashboardGrid` exists | None found | Empty layout, narrow viewport | Medium | Low | **High** | **Yes** |
| `DashboardToolbar` → `BoardToolbar` | Yes | Yes (`DashboardToolbar.stories.tsx`) | unsaved changes, save error, mobile collapse | Medium | Low | **High** | **Yes** |
| `DashboardDropZone` → `BoardDropZone` | Yes | Yes (`DashboardDropZone.stories.tsx`) | keyboard target, invalid drop | Medium | **High** — keyboard alt unconfirmed | Medium | **Yes** |
| `GripHandle` / `DashboardResizeHandle` | `DashboardResizeHandle` exists | None found | Focus, disabled, keyboard label, touch target | Medium | **High** | Medium | **Yes** |
| `MoveMenu` | **Missing** | **Missing** | move directions, cancel, boundary states | **High** | **High** | Low | **Yes** |
| `MetralyDrawer` → `Drawer` | Yes | Yes (`MetralyDrawer.stories.tsx`) | Focus restore, body scroll lock | Medium | **High** | Medium | **Yes** |
| `MetralyBottomSheet` → `BottomSheet` | Yes | Yes (`MetralyBottomSheet.stories.tsx`) | Long content scroll, focus restore | Medium | **High** | **High** | **Yes** |
| `WizardLayout` | **Missing** (only `WizardLayoutRecipe`) | Yes (recipe) | first/middle/last/error/review step, mobile | **High** | Medium | **High** | **Yes** |
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
TrendBadge
PulseMarker (as standalone component — pulse animation exists but not as named component)
Skeleton
FilterBar
MoveMenu
WizardLayout (exists as recipe story, not as component)
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
| `DashboardDropZone` → `BoardDropZone` | **High** | No keyboard/pointer fallback found. `data-pulse="off"` hardcoded. Uses text "+" not SVG. |
| `DashboardResizeHandle` | **High** | No story confirms keyboard label or focus-visible state. |
| `MoveMenu` | **High** | Component does not exist — entire non-drag fallback is missing. |
| `MetralyDrawer` | **Medium-High** | Focus trap and focus restore behavior not confirmed by story. |
| `MetralyBottomSheet` | **Medium-High** | Same as Drawer. |
| Board editing overall | **High** | Without `MoveMenu`, board editing is drag-only. WCAG 2.1 SC 2.5.1 at risk. |

---

## 8. Responsive risks

| Component | Risk | Specific concern |
|---|---|---|
| `WidgetPickerCard` | **High** | Prior audit found full-width block layout instead of constrained card width in brandbook. |
| `DataTable`/`MetralyTable` | **High** | No mobile card/stacked presentation. No internal scroll verified. |
| `BoardToolbar` | **High** | Secondary action collapse on narrow widths not verified. |
| `WizardLayout` | **High** | Wizard sticky footer + mobile safe-area not verified. |
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
| `design-system/` folder | **Missing** | Create per architecture plan before migration |
| `compat/` barrel | **Missing** | Create before migrating any component import |
| Token bridge CSS | **Missing** | Create `design-system/tokens/semantic.css` before using any brandbook token in app |

---

## 10. Definition of ready — current state

Assessed against the gate from `metraly-ui-pre-migration-stabilization-checklist.md`:

| Gate item | Status |
|---|---|
| P0 component stories exist and pass visual review | **Not ready** — StatusBadge/TrendBadge/PulseMarker/Skeleton/FilterBar/MoveMenu missing |
| P0 scenario stories exist and pass responsive review | **Not ready** — AppShell, AppShellRoleContext, DashboardOverview missing; DashboardEditor exists |
| Drawer/BottomSheet/Dialog focus behavior is production-safe | **Unknown** — not verified in this pass |
| `DataTable<Row>` validated for mobile and dense data | **Not ready** — mobile presentation missing |
| `WidgetShell` validated across all states | **Partial** — editMode, gated, stale states missing |
| Board editing has non-drag fallback | **Not ready** — MoveMenu does not exist |
| StatusBadge/HealthPill canonical taxonomy represented | **Partial** — StateBadge story exists but canonical statuses incomplete |
| AppShell stories prove route/nav/title alignment | **Not ready** — AppShell and AppShellRoleContext stories missing |
| Token/CSS drift checks clean | **Unknown** — not run in this pass; app has known raw color violations |
| App repo has typecheck/visual/a11y strategy ready | **Not ready** — all three missing |

**Conclusion: migration to `metraly/app/ui` screens is blocked. Brandbook stabilization must proceed first.**
