# Claude Design → Metraly Integration: Top 5 Next Steps

**Date:** 2026-05-16  
**Status:** Planning Phase 2-4 execution after Claude Design integration audit pass

---

## Background

**18 Claude Design components already migrated** to `brandbook/packages/ui` and palette-verified.  
**Product app (`metraly/ui`) has 25 documented gaps** (11 P0, 9 P1, 3 P2) from audit.

These 5 steps unlock full component adoption and eliminate design-system drift in the app.

---

## Step 1: Complete all missing Storybook stories (Phase 2) — 12 hours

**Target repo:** `brandbook`  
**Goal:** Every canonical component + pattern has required-states matrix in Storybook.

### What's missing (from gap matrix)

| Story | Files | Impact | Time |
|-------|-------|--------|------|
| Tabs with arrow-key a11y | `stories/MetralyTabs.stories.tsx` | Route nav keyboard floor | 2h |
| AppShellRoleContext scenario | `stories/MetralyShell.stories.tsx` | Scope consistency | 2h |
| MoveMenu component + story | `packages/ui/src/components/HandlePrimitive/MoveMenu.tsx` + story | **WCAG 2.1 SC 2.5.1 floor** | 4h |
| DashboardWizard split-builder | `stories/Scenarios/DashboardWizard.stories.tsx` (extend) | Dashboard editor flow | 2h |
| GripHandle (resize handle) | `stories/GripHandle.stories.tsx` (extend with keyboard) | Drag accessibility | 1h |
| DataTable mobile variants | `stories/MetralyTable.stories.tsx` (add mobilePresentation) | Mobile explorer | 1h |

**Exit criteria:**
- ✅ All component stories render with 3+ viewport variants (320px / 768px / 1280px)
- ✅ Keyboard-only flows tested (tabs, move menu, resize)
- ✅ `npm run build-storybook` produces no errors
- ✅ Stories exported in `/site/.storybook/preview.ts` groups

**Acceptance test:**
```bash
npm run build-storybook
grep -c "KeyboardEvent\|aria-current\|tabindex" site/storybook-static/index.html
```

---

## Step 2: Implement missing core primitives (Phase 2) — 8 hours

**Target repo:** `brandbook`  
**Goal:** All P1-blocking components exist and are production-ready.

### What needs implementation

| Component | Current state | Work |
|-----------|---------------|------|
| `MoveMenu` | Spec only; primitive inside wizard | Extract to public component; add story; wire keyboard handlers |
| `DashboardWidget` | Exists but not fully wired | Verify all widget variants (selected/dragging/empty/error/loading) |
| `MetralyEmptyState` | Spec exists | Finalize component and 6-state story |
| Chart wrapper completion | Recharts integration | Verify all 5 chart types (Area, Bar, Line, Gauge, Heatmap) have complete stories |

**Files:**
- `packages/ui/src/components/HandlePrimitive/MoveMenu.tsx` (new)
- `packages/ui/src/dashboard/DashboardWidget.tsx` (verify + test)
- `packages/ui/src/components/MetralyEmptyState.tsx` (finalize)
- `packages/ui/src/charts/*.stories.tsx` (verify 100% coverage)

**Exit criteria:**
- ✅ `npm run ui:check` passes (zero TS errors)
- ✅ `npm run site:test` passes (44 suites, 254 tests)
- ✅ Storybook stories render without errors
- ✅ All components have JSDoc with `@example` blocks

---

## Step 3: Stabilize product app — Phase 4 prep (16 hours)

**Target repo:** `metraly/ui`  
**Goal:** App code is clean, P0 taxonomy/token gaps fixed, ready for compat layer.

### P0 fixes required

| Item | File | Change | Time |
|------|------|--------|------|
| Rename sidebar labels | `components/layout/Sidebar.tsx` | `AI Assistant` → `AI Workspace`, `Marketplace` → `Plugins`, `Connect Sources` → `Connectors` | 1h |
| Rename feature folders | `features/aiAssistant/`, `features/marketplace/` | Move to `features/ai-workspace/`, `features/plugins/` + update 40+ imports | 3h |
| Rename WizardScreen | `features/onboarding/WizardScreen.tsx` | Move to `features/connectors/ConnectorWizardScreen.tsx` | 1h |
| Fix App.tsx dual entrypoints | `App.tsx` + `App.jsx` | Delete `App.jsx`, keep TS only | 0.5h |
| Tokenize inline colors | `App.tsx`, `Sidebar.tsx`, `Topbar.tsx` | Replace 15+ `rgba()`/hex with `--m-*` tokens | 4h |
| Fix Sidebar a11y | `components/layout/Sidebar.tsx` | Replace `<span role="button">` pin with `<button type="button">` | 0.5h |
| Add MoveMenu to dashboard | `components/dashboard/DraggableDashboardRenderer.tsx` | Wire `MoveMenu` next to grip; keyboard activation logic | 4h |
| Verify type safety | `tsconfig.json` + run `npm run typecheck` | Ensure no `any` types in feature code | 2h |

**Exit criteria:**
- ✅ `npm run typecheck` passes with zero errors
- ✅ `npm run test` passes (existing 50+ tests)
- ✅ `npm run build` succeeds
- ✅ Visual regression baselines captured (Dashboard, Sidebar, Connector Wizard)
- ✅ Keyboard-only dashboard edit flow works (Playwright test)

---

## Step 4: Implement compat layer in app (4 hours)

**Target repo:** `metraly/ui`  
**Goal:** Create `design-system/compat/brandbook-legacy.ts` as single integration point.

### Files to create

```
ui/src/design-system/
  ├── compat/
  │   └── brandbook-legacy.ts        (new — 200 line barrel)
  ├── tokens/
  │   ├── semantic.css               (bridge — maps to brandbook OKLCH)
  │   ├── aliases.css                (back-compat layer)
  │   └── status-tokens.css          (DORA + Status mappings)
  └── index.ts                       (public exports)
```

### What goes in `brandbook-legacy.ts`

```typescript
// @metraly/ui re-exports for compat
export {
  MetralyButton as Button,
  MetralyInput as Input,
  MetralySelect as Select,
  MetralyCheckbox as Checkbox,
  MetralySwitch as Switch,
  MetralyTabs as Tabs,
  MetralyBadge as Badge,
  StateBadge,
  MetralyTable as DataTable,
  MetralyCard as Card,
  MetralyMetricCard as MetricCard,
  DashboardWidget,
  DashboardGrid,
  MetralyIcon as Icon,
  MetralyEmptyState as EmptyState,
  MoveMenu,
  WizardLayout,
  // ... 20+ more
} from '@metraly/ui';
```

**Work:**
1. Create `design-system/compat/` folder structure (0.5h)
2. Write compat barrel with 50+ aliases (1.5h)
3. Add `@metraly/ui` to `package.json` dependencies (0.5h)
4. Verify `npm run build` with imports flowing through compat (1h)

**Exit criteria:**
- ✅ `import { Button } from './design-system/compat/brandbook-legacy'` resolves
- ✅ TypeScript types work (no `any` fallbacks)
- ✅ All 50 exports are defined
- ✅ `npm run typecheck && npm run build` green

---

## Step 5: Start Phase 4 compat migration (20 hours)

**Target repo:** `metraly/ui`  
**Goal:** Migrate first 5 high-impact components to use brandbook via compat layer.

### Priority order (highest-impact first)

| Component | Consumer files | Complexity | Time |
|-----------|----------------|------------|------|
| `StateBadge` (was `Badge`) | 8 screens using status badges | Medium | 4h |
| `MetralyIcon` (was `Icon`) | 15+ files importing `components/shared/Icon.tsx` | Low | 2h |
| `MetralyTable` (was `DataTable`) | `MetricsScreen.tsx`, `BreakdownTable.tsx` | Medium | 3h |
| `MetralyButton` | `Topbar.tsx`, `Sidebar.tsx`, forms | Medium | 4h |
| `MetralyEmptyState` | `DashboardEmptyState`, 3 screens | Low | 2h |
| `DashboardWidget` | `widgetRegistry.tsx` (21 KB monolith — 3 widgets pilot) | High | 5h |

**Work per component:**

1. **Replace local import** → `import { ... } from './design-system/compat/brandbook-legacy'`
2. **Map API** — if signatures differ, add adapter wrapper (temporary)
3. **Visual regression baseline** — screenshot before/after
4. **Verify consumers** — run each screen in the app
5. **Test coverage** — add unit tests for critical props

**Exit criteria:**
- ✅ `Badge` → `StateBadge` fully migrated (all 8 consumers updated)
- ✅ `Icon` → `MetralyIcon` fully migrated (no local duplicate)
- ✅ `DataTable` → `MetralyTable` piloted in 2 screens
- ✅ `MetralyButton` replaces inline `<button>` in 3 screens
- ✅ Visual regression delta bounded (< 5% of DOM)
- ✅ `npm run test && npm run typecheck && npm run build` all green
- ✅ Playwright visual baselines captured and reviewed

---

## Timeline and dependencies

```
Step 1 (Storybook — 12h)     ◄━━┓
                               ├━━━ Blocks Step 2 (verify stories exist)
Step 2 (Components — 8h)      ◄━┛
                               ├━━━ Step 3 (needs MoveMenu, complete components)
Step 3 (App cleanup — 16h)    ◄━┛
                               ├━━━ Blocks Step 4
Step 4 (Compat layer — 4h)    ◄━┛
                               ├━━━ Unblocks Step 5
Step 5 (Migration — 20h)      ◄━┛
```

**Total:** 60 hours across 2-3 weeks.

**Parallelizable work:**
- Step 1 and Step 3 can run in parallel (different repos)
- Step 5 (6 components) can be parallelized — one agent per component (2-3 agents)

---

## Verification checkpoints

After each step completes:

| Step | Command | Expected |
|------|---------|----------|
| 1 | `npm run build-storybook && npm run site:test` | 44 suites pass; 254 tests pass; no build errors |
| 2 | `npm run ui:check && npm run site:test && npm run build-storybook` | Zero TS errors; all tests pass; Storybook builds |
| 3 | `npm run typecheck && npm run test && npm run build && npm run test:visual` | All green; visual baselines captured |
| 4 | `npm run typecheck && npm run build` | All green; compat imports work |
| 5 | `npm run typecheck && npm run test && npm run build && npm run test:visual` | 254 tests pass; visual delta bounded; all screens render |

---

## Success criteria (final)

By the end of these 5 steps:

- ✅ **All 18 Claude Design components** are in brandbook with complete Storybook stories
- ✅ **App has zero design-system drift** — all colors are `--m-*` tokens, no `rgba()` / hex
- ✅ **Taxonomy is canonical** — sidebar, routes, feature folders use frozen names
- ✅ **Compat layer works** — app can import from `@metraly/ui` without changes
- ✅ **5 high-impact components migrated** — Status, Icon, Table, Button, EmptyState
- ✅ **Accessibility floor met** — MoveMenu keyboard flow, focus traps, WCAG 2.1
- ✅ **Visual parity maintained** — regression baselines captured and reviewed
- ✅ **All tests pass** — 254 site tests + 50+ app tests + Playwright smoke + axe

---

## Next phase (Phase 6 — deferred)

Once these 5 steps complete, Phase 4 continues with:
- Remaining 15 component migrations (DashboardGrid, Charts, Forms, Navigation)
- MetricsScreen decomposition
- Dashboard Wizard split-builder recipe
- Phase 9 (AI Workspace + Plugins) component implementation

Phase 6 is the final integration: remove compat layer, delete duplicates, finalize imports.
