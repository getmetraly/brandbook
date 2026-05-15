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
- Missing Brandbook components: StepRail, ReviewPanel, StickyWizardFooter, and AI/Plugin-specific surfaces
- Existing components need Storybook responsive variants

### 🔄 Phase 2 P0: Foundation Work (IN PROGRESS)

**P0-3 (COMPLETED, 2026-05-15)**: Typecheck script + app type safety
- `WizardScreen.tsx` select-row narrowing bug fixed
- `npm run typecheck` passes with zero errors
- Follow-up validation also confirmed `npm run build`

**P0-1 (COMPLETED, 2026-05-15)**: Naming fixes in app code
- `Sidebar.tsx`: "AI Assistant" → "AI Workspace", "Marketplace" → "Plugins", "Connect Sources" → "Connectors"
- `App.tsx`: titles updated to AI Workspace / Plugins / Connectors
- Feature folders renamed: `aiAssistant` → `ai-workspace`, `marketplace` → `plugins`
- Validation: `npm run test`, `npm run typecheck`, `npm run build` all pass

**P0-4 (COMPLETED, 2026-05-15)**: Remove board experiment and collapse to a single app entrypoint
- Deleted `src/features/board/` and the parallel board-only `App.tsx`/`index.tsx` bootstrap
- Renamed the product app from `App.jsx` → `App.tsx`
- Renamed the product bootstrap from `index.jsx` → `index.tsx`
- Validation: `npm run test`, `npm run typecheck`, `npm run build` all pass

**P0-5 (COMPLETED, 2026-05-15)**: StatusBadge in Brandbook
- Added `packages/ui/src/components/StatusBadge.tsx` as a canonical wrapper over `StateBadge`
- Added `stories/StatusBadge.stories.tsx` covering all 12 frozen statuses
- Validation: `npm run ui:check`, `npm run site:typecheck`, `npm run site:test`, `npm run build-storybook` all pass

**P0-2 (COMPLETED, 2026-05-15)**: Clean raw colors out of app `Badge.tsx`
- Replaced hardcoded hex and `rgba()` values with token-driven `color-mix(...)` usage
- Preserved existing app-facing status strings for compatibility
- Validation: `rg` confirms no raw color literals remain in `src/components/ui/Badge.tsx`
- Validation: `npm run test`, `npm run typecheck`, `npm run build` all pass

**P0-6 / P0-7 / P0-8 / P0-9 (COMPLETED, 2026-05-15)**: Add core Brandbook migration primitives
- Added `TrendBadge`, `MetralySkeleton`, `MetralyFilterBar`, and `MetralyEmptyState`
- Added CSS, Storybook stories, package exports, and site tests for all four primitives
- Validation: `npm run ui:check`, `npm run site:typecheck`, `npm run site:test`, `npm run build-storybook` all pass

**P0-10 / P0-11 / P1-1 / P1-2 / P1-3 / P1-4 (COMPLETED, 2026-05-15)**: Brandbook navigation, board a11y fallback, and wizard stabilization
- Added `MetralyTabs` keyboard/a11y story and test coverage for tab-to-tabpanel wiring
- Added `AppShellRoleContext` scenario story to confirm shell context alignment
- Added `MoveMenu` as the non-drag board movement fallback
- Hardened `DashboardDropZone` with SVG icon contract and optional keyboard-safe action button
- Added `GripHandle.stories.tsx` for `DashboardResizeHandle`
- Added `WizardLayout` as an importable public component, replaced the recipe story, and added site test coverage
- Validation: `npm run ui:check`, `npm run site:typecheck`, `npm run site:test`, `npm run build-storybook` all pass

**P1-5 / BoardCanvas coverage / overlay verification (COMPLETED, 2026-05-15)**: Wizard scenario, board canvas story, and overlay focus contracts
- Added `DashboardWizard.stories.tsx` to cover goal, role template, widget bundle review, create error, and success states
- Added `BoardCanvas.stories.tsx` for populated, empty, and narrow viewport coverage on top of `DashboardGrid`
- Expanded `MetralyDrawer.stories.tsx` and `MetralyBottomSheet.stories.tsx` with focus-restore/body-scroll verification stories
- Added `site/__tests__/shell/MetralyOverlayFocus.test.tsx` to verify focus restore and body scroll lock for both overlays
- Validation: `npm run ui:check`, `npm run site:typecheck`, `npm run site:test`, `npm run build-storybook` all pass

**P1-6 / P1-7 (COMPLETED, 2026-05-15)**: Metric card state matrix and mobile table presentation
- Added `stories/MetralyMetricCard.stories.tsx` with positive delta, negative delta, loading, empty, error, stale, and compact overflow states
- Extended `MetralyTable` with `mobilePresentation?: "table" | "cards" | "stacked"`
- Added mobile cards and mobile stacked stories to `stories/MetralyTable.stories.tsx`
- Added site tests to verify the new table presentation metadata contract
- Validation: `npm run ui:check`, `npm run site:typecheck`, `npm run site:test`, `npm run build-storybook` all pass

**P1-9 / P1-10 (COMPLETED, 2026-05-15)**: App sidebar semantics and PulseMarker primitive
- Replaced sidebar pin/unpin `<span role="button">` affordances with native `<button type="button">` controls in `app/ui/src/components/layout/Sidebar.tsx`
- Added `PulseMarker` to `@metraly/ui` as an explicit semantic pulse primitive with dot and heartbeat-wave variants
- Added `stories/PulseMarker.stories.tsx` and `site/__tests__/PulseMarker.test.tsx`
- Validation: app `npm run test`, `npm run typecheck`, `npm run build` and brandbook `npm run ui:check`, `npm run site:typecheck`, `npm run site:test`, `npm run build-storybook` all pass

**P1-8 (COMPLETED, 2026-05-15)**: Create the app-side `design-system/` skeleton
- Added `app/ui/src/design-system/index.ts` as the local app-facing barrel
- Added `app/ui/src/design-system/compat/brandbook-legacy.ts` as the inert Phase 1 / Phase 2 compat placeholder
- Added token bridge placeholders:
  - `app/ui/src/design-system/tokens/semantic.css`
  - `app/ui/src/design-system/tokens/aliases.css`
  - `app/ui/src/design-system/tokens/status-tokens.css`
- Validation: app `npm run typecheck` and `npm run build` both pass

**P1-11A (COMPLETED, 2026-05-15)**: Introduce shared card surface foundation in Brandbook
- Added `CardShell` as the common layout foundation above `MetralyPanel`
- Reworked `MetralyCard` and `MetralyMetricCard` to compose `CardShell` while preserving semantic APIs
- Reworked `DashboardWidget` to compose `CardShell` while keeping widget-specific drag/resize/remove chrome separate
- Updated migration map/plan/local architecture/component contract docs to reflect the layered surface model
- Validation: static source/CSS checks in sandbox; full Jest requires installed dependencies

## Task Ordering

1. **P1-11**: Extract `StepRail` from `WizardLayout`
2. **P1-12**: Extract `ReviewPanel` and `StickyWizardFooter`
3. **P1-13**: Start app-side compat imports only after the wizard sub-primitives exist

After P0 complete: Move to P1 (component stabilization in Brandbook).

## Key Files

**App structure**:
- `app/ui/src/App.tsx` — Main product app (manual state router, all screens)
- `app/ui/src/index.tsx` — Canonical app bootstrap
- `app/ui/src/components/layout/Sidebar.tsx` — Main sidebar with canonical labels applied
- `app/ui/src/features/onboarding/WizardScreen.tsx` — Settings wizard, typecheck regression fixed

**Brandbook**:
- `packages/ui/src/` — Component library (Phase 6 + 7 responsive stories done)
- Stabilization gate: All Phase 6 recipe components have responsive variants

## Canonical Naming (Frozen)

✅ AI Workspace (not AI Assistant)
✅ Plugins (not Marketplace)  
✅ Connectors (not Connect Sources)

## Canonical Status Taxonomy (Frozen)

Live, Preview, Designed, Planned, In progress, Gated, Policy defined, Benchmark pending, Coming soon, Error, Delayed, No data


## 2026-05-15 — Foundation consolidation pass

Status: Phase 3 foundation refactor completed in brandbook upstream.

Done:

- `FieldShell` introduced and composed by form controls plus filter chips.
- `OverlayShell` introduced and composed by `MetralyDrawer` and `MetralyBottomSheet`.
- `StateBlock` introduced and composed by empty/dashboard/widget states.
- `NavigationItemFrame` introduced for sidebar/tree visual row consistency.
- `useRovingSelection` introduced for tabs/segmented control keyboard/value management.
- `HandlePrimitive` introduced for drag/resize/move/drop affordances.
- Agent rules added in `docs/migration/metraly-ui-foundation-agent-rules.md` and linked from `AGENTS.md`.

Next:

- Use these foundations when migrating `getmetraly/metraly/ui` local `design-system/` adapters.
- Add richer Storybook pages for each foundation if design QA needs visual matrix coverage.
- Continue DataTable and WidgetCatalogCard migration on top of these foundations.

## 2026-05-15 — WizardLayout app rhythm alignment

Updated `WizardLayout` after foundation consolidation so Storybook product scenarios match the current demo app wizard direction more closely:

- default progress placement changed to horizontal top stepper;
- centered content width introduced through `contentWidth`;
- wizard header/body/review are now grouped in one canonical card surface;
- footer actions sit below the card;
- side rail remains available through `progressPlacement="side"` for documentation-only layouts.

Next visual QA targets: DashboardWizard stories, Connector Wizard app parity, mobile stepper overflow, footer safe-area behavior.

## 2026-05-15 — Wizard scenario split correction

Status: Wizard visual alignment refined after comparing mixed Connector Setup Preview and Dashboard Preview screenshots.

Done:

- `Components/WizardLayout/Default` now represents the connector/setup style with top progress and a centered card.
- `Components/WizardLayout/SideRailReference` keeps the rail variant as documentation-only.
- `Scenarios/DashboardWizard/*` now represents the dashboard builder style with a left builder rail and right preview canvas.

Next:

- Validate both stories at 320, 390, 768, 1024 and 1280px.
- When migrating to `getmetraly/metraly/ui`, map connector flows to `WizardLayout` and dashboard creation to a feature-owned `DashboardWizardShell` recipe.


### Wizard parity status

- Connector wizard: split into source, preview connection, configure, and review stories.
- Dashboard wizard: sidebar/header rhythm aligned toward AppShellRoleContext; review bundle has search before category chips; mini-stepper no longer renders stray connector lines.

## 2026-05-15 — Wizard sub-primitives extracted (P1-11, P1-12)

Status: `StepRail`, `ReviewPanel`, and `StickyWizardFooter` extracted from `WizardLayout` into standalone importable primitives.

Done:

- `StepRail` extracted as a public component with `orientation: 'horizontal' | 'vertical'` prop.
  - `WizardLayout` now composes `StepRail` internally; no behavior change.
  - Backward compat: `WizardLayoutStep` / `WizardLayoutStepStatus` re-exported as aliases.
  - Story: `Components/StepRail/*` (9 stories: horizontal mid/first/last/warning/two/mobile + vertical rail/no-footnote/warning)
  - Test: `site/__tests__/wizard/StepRail.test.tsx` (14 assertions)
- `ReviewPanel` introduced as a structured key/value review list for wizard confirmation steps.
  - Accepts title, description, items with icon/label/value/badge, loading skeleton, empty state.
  - Story: `Components/ReviewPanel/*` (6 stories)
  - Test: `site/__tests__/wizard/ReviewPanel.test.tsx` (9 assertions)
- `StickyWizardFooter` introduced as the canonical back/primary/status footer primitive.
  - Sticky by default; static on ≤560px via media query.
  - Story: `Components/StickyWizardFooter/*` (6 stories)
  - Test: `site/__tests__/wizard/StickyWizardFooter.test.tsx` (9 assertions)
- `MetralyTable` gains `error` and `errorText` props for explicit error state rendering.
  - Story: `Components/MetralyTable/Error`
- `WidgetPickerCard` stories expanded with `Gated`, `ComingSoon`, `InProgress`, `LongText`, `NarrowRail`, and `GridLayout` scenarios.
- `site/tsconfig.json` target upgraded from ES2017 → ES2018 (unblocks `s` regex flag in existing tests).
- Two pre-existing test regressions fixed: `MetralyCard` compact density class name + wizard body gap token assertion.
- All 247 site tests pass. `npm run ui:check` and `npm run site:typecheck` pass.

Next:

- Validate all wizard stories at 320, 390, 768, 1024, 1280px.
- Port connector wizard story to use `ReviewPanel` in the review step and `StickyWizardFooter` in the footer slot.
- Continue `WidgetPickerCard` → `WidgetCatalogCard` semantic work (listbox/option ARIA roles).
- Continue `MetralyTable` bulk-actions story and internal-scroll improvements.
- Start P2-2 types deduplication and P2-3 DraggableTweaksPanel gating in app.

## 2026-05-15 — Phase 2 stabilization gate review

Status: Phase 2 stabilization gate reviewed after app Storybook setup, wizard viewport QA, ConnectorWizard split, WidgetCatalogCard alias/test, and AI/Plugin spec creation.

Done:

- App repo now has a local visual harness:
  - `app/ui/.storybook/main.ts`
  - `app/ui/.storybook/preview.ts`
  - `app/ui/src/stories/AppShell.stories.tsx`
  - `app/ui/src/stories/DashboardScreen.stories.tsx`
  - `app/ui/src/stories/MetricsScreen.stories.tsx`
  - `npm run build-storybook` passes in `app/ui`
- Wizard responsive/story split follow-up is closed:
  - `stories/WizardLayout.stories.tsx` now includes Desktop1024 + Desktop1280
  - `stories/DashboardWizard.stories.tsx` now includes Mobile390 + Tablet768 + Desktop1024
  - `stories/ConnectorWizard.stories.tsx` exists as the dedicated connector/setup scenario
- `WidgetCatalogCard` / `WidgetCatalogList` semantic aliases exported from `@metraly/ui`
- `site/__tests__/WidgetCatalogCard.test.tsx` verifies listbox/option ARIA contract
- `docs/migration/ai-plugin-component-spec.md` freezes the deferred Phase 9 AI/Plugins contracts

Gate decision:

- Phase 3 compat-import migration is now unblocked.
- Remaining non-blocking risks:
  - no app-level visual regression automation yet;
  - no app-level accessibility automation yet;
  - raw-color cleanup remains in product feature screens (`App.tsx`, `PluginScreen.tsx`);
  - AI/Plugins component implementation remains deferred to Phase 9.

Next:

- Install `@metraly/ui` into `app/ui` and start replacing compat exports with real imports.
- Keep Phase 9 AI/Plugins surfaces out of the first compat-import wave.

## 2026-05-15 — Phase 3 kickoff: first live compat import

Status: Started in `getmetraly/metraly/app/ui` after the stabilization gate passed.

Done:

- `@metraly/ui` is installed in `app/ui` as a local file dependency.
- `recharts` was added in `app/ui` to satisfy the brandbook package peer contract.
- `app/ui/src/design-system/compat/brandbook-legacy.ts` now routes `PlaceholderScreenCompat` to the real `MetralyEmptyState` export from `@metraly/ui`.
- `app/ui/src/App.tsx` now consumes the compat barrel instead of importing `components/ui/PlaceholderScreen` directly.
- `app/ui/src/index.tsx` and `app/ui/.storybook/preview.ts` now load `@metraly/ui` theme + empty-state styles so the first imported primitive renders correctly in both the app and app Storybook.

Next:

- Continue swapping low-risk compat aliases to real `@metraly/ui` exports.
- Keep Phase 9 AI/Plugins surfaces out of the early compat-import wave.
