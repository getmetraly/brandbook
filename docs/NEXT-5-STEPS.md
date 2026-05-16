# 🚀 Следующие 5 шагов — Claude Design → Metraly Integration

**Статус:** Ready to execute  
**Всего работы:** 60 часов  
**Репозитории:** `brandbook` + `metraly/ui`

---

## 📋 Quick Overview

```
┌─────────────────────────────────────────────────────────────┐
│ Step 1: Complete Storybook stories (12h) — BRANDBOOK      │
│ └─ Tabs, MoveMenu, DashboardWizard, GripHandle, Tables    │
│                                                             │
│ Step 2: Implement missing components (8h) — BRANDBOOK     │
│ └─ MoveMenu, DashboardWidget, EmptyState, Charts          │
│                                                             │
│ Step 3: Stabilize app P0 gaps (16h) — METRALY/UI         │
│ └─ Rename (sidebar, folders, routes)                      │
│ └─ Tokenize (rgba → --m-* tokens)                         │
│ └─ Fix a11y (button semantics, MoveMenu)                  │
│                                                             │
│ Step 4: Implement compat layer (4h) — METRALY/UI         │
│ └─ design-system/compat/brandbook-legacy.ts               │
│ └─ 50+ aliases (Button, Icon, Table, etc.)                │
│                                                             │
│ Step 5: Migrate first 5 components (20h) — METRALY/UI    │
│ └─ StateBadge, Icon, Table, Button, EmptyState           │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ Step 1: Complete all missing Storybook stories

**Время:** 12 часов  
**Владелец:** Brandbook team  
**Блокирует:** Step 2

### What to add

```
🟥 CRITICAL (4 stories)
  □ Tabs.stories.tsx — Arrow-key navigation, tabpanel focus
  □ MoveMenu.stories.tsx — All 4 directions, keyboard activation
  □ AppShellRoleContext.stories.tsx — Scope consistency, gated nav
  □ DashboardWizard scenario — Split-builder (not centered card)

🟨 HIGH PRIORITY (2 stories)
  □ GripHandle.stories.tsx — Focus-visible, keyboard label
  □ DataTable.stories.tsx — Mobile mobilePresentation variants
```

### ✓ Exit criteria

- `npm run build-storybook` passes
- All stories render at 320px / 768px / 1280px
- Keyboard flows tested (tabs, move, resize)
- No TypeScript or build errors

### 🔗 Files to modify

- `stories/MetralyTabs.stories.tsx` (new or extend)
- `stories/Components/GripHandle.stories.tsx` (extend)
- `stories/MetralyTable.stories.tsx` (extend)
- `stories/Dashboard/DashboardWizard.stories.tsx` (extend)
- `stories/Scenarios/AppShellRoleContext.stories.tsx` (new)
- `packages/ui/src/components/HandlePrimitive/MoveMenu.tsx` (new)

---

## ✅ Step 2: Implement missing core primitives

**Время:** 8 часов  
**Владелец:** Brandbook team  
**Блокирует:** Step 3, Step 5

### What to implement

```
🟥 BLOCKING (2 components)
  □ MoveMenu — Extract from wizard, public API, keyboard handlers
  □ DashboardWidget — Verify all 6 widget states (selected/dragging/empty/error/loading/stale)

🟨 REQUIRED (2 components)
  □ MetralyEmptyState — Finalize component, 6-state story
  □ Chart wrappers — Verify all 5 complete (Area, Bar, Line, Gauge, Heatmap)
```

### ✓ Exit criteria

- `npm run ui:check` passes (zero TS errors)
- `npm run site:test` passes (44 suites, 254 tests)
- Storybook builds without errors
- All components have JSDoc examples

### 🔗 Files to create/modify

- `packages/ui/src/components/HandlePrimitive/MoveMenu.tsx` (new)
- `packages/ui/src/dashboard/DashboardWidget.tsx` (verify)
- `packages/ui/src/components/MetralyEmptyState.tsx` (finalize)
- `packages/ui/src/charts/*.stories.tsx` (verify coverage)

---

## ✅ Step 3: Stabilize product app — Phase 4 prep

**Время:** 16 часов  
**Владелец:** Metraly team  
**Блокирует:** Step 4

### P0 taxonomy fixes (6 hours)

```
RENAME SIDEBAR LABELS
  □ "AI Assistant" → "AI Workspace"
  □ "Marketplace" → "Plugins"
  □ "Connect Sources" → "Connectors"

RENAME FEATURE FOLDERS (40+ imports!)
  □ features/aiAssistant/ → features/ai-workspace/
  □ features/marketplace/ → features/plugins/
  □ features/onboarding/WizardScreen.tsx → features/connectors/ConnectorWizardScreen.tsx

ALIGN APP.TSX TITLES MAP
  □ Update titles object to match sidebar labels
```

### P0 color/token fixes (4 hours)

```
REPLACE INLINE COLORS
  □ App.tsx login/first-run screens (5 places)
  □ Sidebar.tsx (3 places with rgba/hex)
  □ Topbar.tsx (hardcoded search)
  
MAPPING:
  rgba(11,15,25,0.95) → --m-bg-1
  rgba(255,255,255,0.05) → --m-bg-0
  #xxx hex colors → corresponding --m-* tokens
```

### P0 a11y fixes (2 hours)

```
SIDEBAR PIN BUTTON
  □ <span role="button"> → <button type="button">
  
DASHBOARD DRAG/RESIZE
  □ Add MoveMenu next to grip (keyboard fallback)
  □ Add keyboard label to resize handle
```

### P0 cleanup (2 hours)

```
DUAL ENTRYPOINTS
  □ Delete App.jsx + index.jsx (keep TS only)
  
TYPE SAFETY
  □ npm run typecheck passes with zero errors
```

### ✓ Exit criteria

- `npm run typecheck` — zero errors
- `npm run test` — passes (50+ tests)
- `npm run build` — succeeds
- Visual regression baselines captured
- Keyboard-only dashboard edit works

### 🔗 Files to modify

- `components/layout/Sidebar.tsx`
- `features/aiAssistant/` → `features/ai-workspace/` (+ 40 imports)
- `features/marketplace/` → `features/plugins/` (+ 15 imports)
- `features/onboarding/WizardScreen.tsx` → `features/connectors/ConnectorWizardScreen.tsx`
- `App.tsx` (colors, titles)
- `Topbar.tsx` (colors)
- `components/dashboard/DraggableDashboardRenderer.tsx` (add MoveMenu)
- Delete: `App.jsx`, `index.jsx`

---

## ✅ Step 4: Implement compat layer in app

**Время:** 4 часа  
**Владелец:** Metraly team  
**Блокирует:** Step 5

### Create integration point

```
ui/src/design-system/
  ├── compat/
  │   └── brandbook-legacy.ts     ← 50 aliases
  ├── tokens/
  │   ├── semantic.css
  │   ├── aliases.css
  │   └── status-tokens.css
  └── index.ts
```

### Compat barrel contents (200 lines)

```typescript
// Button, Input, Select, Checkbox, Switch
// Tabs, SegmentedControl, Badge, StateBadge
// Card, MetricCard, Panel, Table, Empty State
// Icon, Navigation Tree, Drawer, BottomSheet
// DashboardWidget, DashboardGrid, DashboardEmptyState
// WizardLayout, StepRail, ReviewPanel, StickyWizardFooter
// Charts (Area, Bar, Line, Gauge, Heatmap, Sparkline)
// Icons (Pin, Grip, Move directions, etc.)
// + 20 more helpers

export {
  MetralyButton as Button,
  MetralyIcon as Icon,
  MetralyTable as DataTable,
  StateBadge,
  // ...
} from '@metraly/ui';
```

### ✓ Exit criteria

- `import { Button } from './design-system/compat/brandbook-legacy'` works
- TypeScript types correct (no `any` fallbacks)
- `npm run typecheck && npm run build` green
- 50 exports defined

### 🔗 Files to create

- `ui/src/design-system/compat/brandbook-legacy.ts` (new, 200 lines)
- `ui/src/design-system/index.ts` (new)
- Update `package.json` — add `@metraly/ui` dependency

---

## ✅ Step 5: Start Phase 4 compat migration

**Время:** 20 часов  
**Владелец:** Metraly team  
**Depends on:** Step 4

### Migrate first 5 components (priority order)

```
PRIORITY 1: StateBadge (was Badge) — 4 hours
  Consumers: Dashboard, Metrics, Connector, Settings screens
  Work: Replace 8 calls to Badge() with StateBadge, map status strings
  
PRIORITY 2: Icon (was Icon.tsx) — 2 hours
  Consumers: 15+ files importing components/shared/Icon.tsx
  Work: Replace import path, delete duplicate icon file
  
PRIORITY 3: DataTable (was DataTable.tsx) — 3 hours
  Consumers: MetricsScreen.tsx, BreakdownTable.tsx
  Work: 2-screen pilot (Metrics + Breakdown table)
  
PRIORITY 4: Button (was inline <button>) — 4 hours
  Consumers: Topbar.tsx, Sidebar.tsx, forms
  Work: Replace 12+ inline button styles with MetralyButton props
  
PRIORITY 5: EmptyState (was DashboardEmptyState) — 2 hours
  Consumers: Dashboard, Metrics, Plugin screens
  Work: Replace 3 inline empty state JSX with MetralyEmptyState
  
BONUS: DashboardWidget (was widgetRegistry) — 5 hours
  Consumers: 21 KB monolith with 8 widgets
  Work: Decompose 3 largest widgets, pilot the pattern
```

### Per-component workflow

1. **Replace import** → `import { ... } from './design-system/compat/brandbook-legacy'`
2. **Update consumers** → All call sites updated to new API/props
3. **Run tests** → `npm run test` passes for modified screens
4. **Visual baseline** → Screenshot before/after, review diff
5. **Type check** → `npm run typecheck` zero errors

### ✓ Exit criteria

- 5 components migrated (StateBadge ✓, Icon ✓, Table ✓, Button ✓, EmptyState ✓)
- All consumers updated
- `npm run typecheck && npm run test && npm run build` green
- Visual baselines captured and reviewed
- Zero `rgba()` / hex literals in migrated screens

### 🔗 Files to modify

```
components/ui/Badge.tsx → replace calls with StateBadge
components/shared/Icon.tsx → delete after migration
components/ui/DataTable.tsx → thin wrapper around MetralyTable
Topbar.tsx → use MetralyButton
Dashboard, Metrics, Settings screens → use MetralyButton + StateBadge
3 widget files → use DashboardWidget shell pattern
```

---

## 📊 Timeline

| Step | Hours | Team | Week 1 | Week 2 | Week 3 |
|------|-------|------|--------|--------|--------|
| 1 | 12h | Brandbook | ▓▓▓▓ | — | — |
| 2 | 8h | Brandbook | ▓▓ | — | — |
| 3 | 16h | Metraly | ▓▓▓▓▓▓ | — | — |
| 4 | 4h | Metraly | — | ▓▓ | — |
| 5 | 20h | Metraly | — | ▓▓▓▓▓▓ | ▓▓▓▓▓▓ |

**Critical path:** Steps 1 → 2 → 3 → 4 → 5  
**Parallelizable:** Step 1 + Step 3 (different repos)

---

## 🎯 Success measures

After all 5 steps complete:

```
✅ Storybook stories:           6/6 complete
✅ Component implementation:     18/18 working (Claude Design)
✅ Product app cleanup:         11 P0 gaps fixed
✅ Type safety:                 zero errors
✅ Tests:                       254 site + 50+ app, all pass
✅ Visual regression:           baselines captured, delta bounded
✅ Accessibility:               WCAG 2.1 SC 2.5.1 floor met
✅ Token conformance:           zero rgba()/hex in app code
✅ Taxonomy:                    all names canonical
✅ Compat layer:               50 aliases working
✅ First 5 components:         fully migrated
```

---

## 📂 See also

- `docs/migration-execution-roadmap.md` — detailed steps, files, exit criteria
- `../claudedesign/audit/` — audit findings (01-06)
- `docs/migration/metraly-ui-next-implementation-plan.md` — full Phase 1-9 plan
