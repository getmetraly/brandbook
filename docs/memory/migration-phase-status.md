---
name: migration-phase-status
description: Metraly UI → Brandbook migration overall phase status and task ordering
metadata: 
  node_type: memory
  type: project
  phase: Phase 2 planning + P0 implementation
  date: 2026-05-15
  originSessionId: 4f98bff0-e0b2-44fb-8599-c78cb0301929
---

## Migration Overview

**Goal**: Migrate Metraly UI (`metraly/app/ui`) components to use @metraly/ui (brandbook) design system as upstream.

**Key Constraint**: Brandbook must be stabilized (all components have Storybook stories + responsive variants) BEFORE component migration begins.

**Repos**:
- Brandbook (design system): `/home/zubarev/Projects/metraly/brandbook/` (branch `docs/metraly-ui-ux-migration-plan`)
- App (product): `/home/zubarev/Projects/metraly/app/ui/` (main branch)

## Phase Status

### ✅ Phase 1: Inventory & Taxonomy (COMPLETED)
Created 5 deliverable documents on `docs/metraly-ui-ux-migration-plan` branch, committed at `1f299b1`:
- Phase 1 Inventory: Full component, screen, entrypoint catalog
- Naming & Status Taxonomy: Canonical naming freeze (AI Workspace, Plugins, Connectors) + status taxonomy (Live, Preview, Designed, etc.)
- Stabilization Gap Report: Brandbook components missing or needing work before app migration
- Storybook Gap Matrix: Which components need stories + responsive variants
- Next Implementation Plan: P0/P1/P2 ordered backlog

### 🔄 Phase 2: Stabilization Planning (COMPLETED)
Planning document created. Identified pre-migration blockers:
- Missing Brandbook components: TrendBadge, PulseMarker, Skeleton, FilterBar, MoveMenu, WizardLayout (as component), StepRail, ReviewPanel, StickyWizardFooter, all AI/Plugin components
- Existing components need Storybook responsive variants

### 🔄 Phase 2 P0: Foundation Work (IN PROGRESS)

**P0-3 (IN PROGRESS)**: Typecheck script + app type safety
- Status: 1 error remaining in WizardScreen.tsx line 211
- Fix known, not yet applied
- Blocks: Cannot verify other P0 fixes without passing typecheck

**P0-1 (PENDING)**: Naming fixes in app code
- Sidebar.tsx: "AI Assistant" → "AI Workspace", "Marketplace" → "Plugins", "Connect Sources" → "Connectors"
- App.jsx: Folder renames (aiAssistant → aiWorkspace, marketplace → plugins, connectSources → connectors)
- Risk: Low (search & rename)
- Unblocks: Verification that naming taxonomy is applied in code

**P0-5 (PENDING)**: StatusBadge in Brandbook
- Create canonical status badge component in Brandbook with all 12 statuses from taxonomy
- Risk: Low (new component, isolated)
- Unblocks: App can use canonical StatusBadge instead of Badge.tsx

## Task Ordering

1. **P0-3** (5 min fix + test): Fix WizardScreen.tsx line 211, pass typecheck
2. **P0-1** (30 min): Sidebar + App.jsx naming fixes, re-run typecheck, verify no regressions
3. **P0-5** (1–2 hours): Create StatusBadge in Brandbook, write Storybook story with all 12 statuses

After P0 complete: Move to P1 (component stabilization in Brandbook).

## Key Files

**App structure**:
- `app/ui/src/App.jsx` — Main product app (manual state router, all screens)
- `app/ui/src/App.tsx` — Isolated board experiment (React Router, excluded from typecheck)
- `app/ui/src/components/layout/Sidebar.tsx` — Main sidebar with deprecated labels
- `app/ui/src/features/onboarding/WizardScreen.tsx` — Settings wizard (has remaining typecheck error)

**Brandbook**:
- `packages/ui/src/` — Component library (Phase 6 + 7 responsive stories done)
- Stabilization gate: All Phase 6 recipe components have responsive variants

## Canonical Naming (Frozen)

✅ AI Workspace (not AI Assistant)
✅ Plugins (not Marketplace)  
✅ Connectors (not Connect Sources)

## Canonical Status Taxonomy (Frozen)

Live, Preview, Designed, Planned, In progress, Gated, Policy defined, Benchmark pending, Coming soon, Error, Delayed, No data
