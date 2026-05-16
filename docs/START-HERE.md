# 🎯 START HERE — Claude Design Migration

**Updated:** 2026-05-16  
**Status:** Ready to execute (previous audit pass complete)

---

## What happened (recap)

- ✅ **18 Claude Design components** imported into `brandbook/packages/ui`
- ✅ **Palette cleaned** (var(--m-cyan) → var(--m-cyan-500), rgba() → color-mix)
- ✅ **Storybook framing** improved (maxWidth decorators on 11 stories)
- ✅ **All validation passes** (typecheck, tests, build-storybook, build)
- ✅ **Integration audit written** (`docs/claude-design-brandbook-integration-report.md`)

---

## What's next (the plan)

**5 sequential steps to get Claude Design components fully adopted in Metraly:**

| Step | Hours | What | Status |
|------|-------|------|--------|
| 1 | 12h | ✏️ Complete missing Storybook stories (Tabs, MoveMenu, DashboardWizard, etc.) | 📋 Ready |
| 2 | 8h | 🔧 Implement missing core primitives (MoveMenu, EmptyState, verify widgets) | 📋 Ready |
| 3 | 16h | 🏗️ Stabilize app codebase (rename folders, tokenize colors, fix a11y) | 📋 Ready |
| 4 | 4h | 🔌 Create compat layer in app (`design-system/compat/brandbook-legacy.ts`) | 📋 Ready |
| 5 | 20h | 🚀 Migrate first 5 components (StateBadge, Icon, Table, Button, EmptyState) | 📋 Ready |

**Total:** 60 hours across 2-3 weeks (Steps 1 + 3 can run in parallel)

---

## Three key documents

### 📌 `NEXT-5-STEPS.md` (quickstart)
Checklist + visual timeline. Use this for:
- Daily progress tracking
- Component-by-component tasks
- Exit criteria per step
- ~5 min read

### 📌 `migration-execution-roadmap.md` (detailed)
Full specification with file paths, commands, risks. Use this for:
- Pre-step review
- Parallel team coordination
- Verification checkpoints
- ~20 min read

### 📌 `NEXT-5-STEPS-VISUAL.txt` (diagram)
ASCII timeline + dependencies. Use this for:
- Understanding critical path
- Identifying parallelization opportunities
- Final state overview
- ~3 min read

---

## How to start TODAY

### Option A: Run Steps 1 + 3 in parallel (optimal)

**Brandbook team (Step 1):**
```bash
cd brandbook
# Create 6 new stories
# See: NEXT-5-STEPS.md § Step 1
npm run build-storybook
```

**Metraly team (Step 3):**
```bash
cd ../metraly/ui
# Rename folders (ai-workspace, plugins)
# Tokenize colors (rgba → --m-*)
# Fix a11y (button semantics)
npm run test && npm run typecheck
```

**Both teams verify in parallel:**
```bash
npm run ui:check
npm run site:typecheck
npm run build-storybook
```

### Option B: Run steps sequentially (safer)

If teams are limited, follow the critical path:
1. Step 1 (Brandbook Storybook) — 12h
2. Step 2 (Brandbook components) — 8h
3. Step 3 (Metraly cleanup) — 16h
4. Step 4 (Compat layer) — 4h
5. Step 5 (Component migration) — 20h

---

## Success criteria (exit condition)

After all 5 steps complete, the system meets:

```
✅ All 18 Claude Design components have complete Storybook stories
✅ All components are production-ready (zero TS errors, all tests pass)
✅ Product app has zero design-system drift (no rgba/hex, tokens only)
✅ Taxonomy is canonical (sidebar, routes, folders renamed)
✅ Compat layer established (design-system/compat/brandbook-legacy.ts)
✅ First 5 components successfully migrated to brandbook imports
✅ Visual regression baselines captured and reviewed
✅ All tests pass (254 site + 50+ app)
✅ Keyboard-only flows work (MoveMenu, resize, nav)
✅ WCAG 2.1 SC 2.5.1 accessibility floor met
```

---

## Files to reference

| File | Purpose |
|------|---------|
| `docs/NEXT-5-STEPS.md` | 📋 Checklist (quickstart) |
| `docs/migration-execution-roadmap.md` | 📋 Detailed spec |
| `docs/NEXT-5-STEPS-VISUAL.txt` | 📋 Timeline + diagram |
| `docs/claude-design-brandbook-integration-report.md` | ✅ Audit report (completed work) |
| `../claudedesign/audit/01-inventory.md` | 📚 Full component inventory |
| `../claudedesign/audit/03-metraly-product-gaps.md` | 📚 P0/P1/P2 gap analysis |
| `../claudedesign/audit/06-migration-roadmap.md` | 📚 Phase 1-7 roadmap |

---

## Estimated calendar timeline

```
WEEK 1:
  Mon-Tue: Step 1 (Storybook) — Brandbook team
  Mon-Fri: Step 3 (Cleanup) — Metraly team [parallel]
  Fri:     Checkpoint — verify Step 1 + Step 3 complete

WEEK 2:
  Mon-Tue: Step 2 (Components) — Brandbook team
  Mon-Wed: Step 4 (Compat) — Metraly team [after Step 3]
  Thu-Fri: Integration testing

WEEK 3:
  Mon-Fri: Step 5 (Migration) — Metraly team [3 agents in parallel]
           5 components × 4h each = 20h / 3 agents ≈ 5-6 days

END WEEK 3:
  ✅ All 5 steps complete
  ✅ First 5 components migrated
  ✅ Ready to continue Phase 4 (remaining 15 components)
```

---

## Quick links to start work

**Brandbook team — Step 1 checklist:**
```
□ stories/MetralyTabs.stories.tsx — Add arrow-key story (2h)
□ stories/Components/GripHandle.stories.tsx — Add keyboard focus (1h)
□ stories/MetralyTable.stories.tsx — Add mobile variants (1h)
□ stories/Dashboard/DashboardWizard.stories.tsx — Extend split-builder (2h)
□ stories/Scenarios/AppShellRoleContext.stories.tsx — Create new (2h)
□ packages/ui/src/components/HandlePrimitive/MoveMenu.tsx — Create component (4h)
```

**Metraly team — Step 3 checklist:**
```
□ Rename folders: features/aiAssistant → features/ai-workspace (3h)
□ Rename folders: features/marketplace → features/plugins (1h)
□ Update Sidebar.tsx labels + imports (1h)
□ Update App.tsx titles map (0.5h)
□ Tokenize App.tsx colors (2h)
□ Tokenize Sidebar.tsx colors (1h)
□ Fix sidebar pin button: <span role="button"> → <button> (0.5h)
□ Replace inline colors with tokens in all P0 files (4h)
□ Delete App.jsx + index.jsx (0.5h)
□ Add MoveMenu to DashboardRenderer (2h)
□ Run npm run typecheck && npm run test && npm run build (1h)
```

---

## Questions?

See the detailed roadmap:
```bash
cat docs/migration-execution-roadmap.md
cat docs/NEXT-5-STEPS.md
```

Or review the audit findings:
```bash
cat ../claudedesign/audit/03-metraly-product-gaps.md
cat ../claudedesign/audit/06-migration-roadmap.md
```

---

## 🚀 Ready to start?

1. **Read** `docs/NEXT-5-STEPS.md` (5 min)
2. **Assign** Step 1 to Brandbook team, Step 3 to Metraly team (parallel)
3. **Track** progress using the checklists
4. **Verify** each step completes with test/build commands
5. **Move to** next step when exit criteria met

Good luck! 🎉
