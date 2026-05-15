# AGENTS.md — Metraly Brandbook Operating Guide

This repository is the working copy for the Metraly brandbook rebuild.

## Canonical reference

`../docs/prototypes/brandbook/*` is the only source of truth for visual and behavioral decisions.

## Repository roles

- `packages/ui` is the production implementation of the prototype primitives.
- `site` is a clean docs and showcase host for `@metraly/ui`.
- `stories` is the prototype conformance harness.
- `docs/` contains current contract notes and migration guidance.

## Language rule

All new or updated brandbook documentation must be written in English.

## Working rule

Do not treat the old preview-hardening layer, historical phase notes, or legacy `--metraly-*` token assumptions as canonical.


<claude-mem-context>
# Memory Context

# [brandbook] recent context, 2026-05-15 10:24am GMT+3

Legend: 🎯session 🔴bugfix 🟣feature 🔄refactor ✅change 🔵discovery ⚖️decision 🚨security_alert 🔐security_note
Format: ID TIME TYPE TITLE
Fetch details: get_observations([IDs]) | Search: mem-search skill

Stats: 50 obs (20,865t read) | 1,371,453t work | 98% savings

### May 13, 2026
S19 Dashboard Editor story — add row 2+ widgets, fix right-rail search icon, keep layout/validation green (May 13, 10:59 PM)
S20 Dashboard Editor story — add row 2+ widgets, fix right-rail search icon, keep layout/validation green (May 13, 10:59 PM)
S21 Dashboard Editor story — add row 2+ widgets, fix right-rail search icon, keep layout/validation green — COMPLETED (May 13, 11:03 PM)
S22 Fix prototype P0 visual parity gaps in the Metraly brandbook UI component library (@metraly/ui) (May 13, 11:09 PM)
### May 14, 2026
S23 Design system convergence: prepare getmetraly/brandbook (packages/ui) with Phase 0 architecture plan + Phase 1 primitive components (MetralyButton, MetralyInput, MetralyIcon) so metraly/ui can eventually be rewritten on top of @metraly/ui (May 14, 10:28 AM)
144 7:50p 🔵 Product Topbar: 51-Line Density-Aware Header with Hardcoded Quick Search and Notification Badge
145 " 🔵 Product Icon System: 50 Custom SVG Paths in a Single Record, No External Dependencies
146 " 🔵 DraggableTweaksPanel: Product-Only DevTools Panel That Mutates --cyan CSS Variable at Runtime
147 " 🔵 Product Legacy CSS Token System: Complete Variable Definitions Confirmed
148 " 🔵 Dashboard Editor Storybook Scenario Already Contains Full ScenarioSidebar and ScenarioTopbar
153 7:54p ⚖️ Metraly Design System Convergence: Architecture-First Mandate
155 " 🟣 Component Map Document Created: Metraly UI → Brandbook Gap Matrix
156 " 🟣 MetralyIcon Component Implemented — Phase 1 Started
154 7:55p 🟣 Phase 0 Architecture Plan Created: Metraly UI → Brandbook Component Plan
S24 Design system convergence: prepare getmetraly/brandbook (packages/ui) with Phase 0 architecture plan + Phase 1 primitives (MetralyButton, MetralyInput, MetralyIcon) — full implementation and commit (May 14, 7:57 PM)
S25 Design system convergence: getmetraly/brandbook Phase 0 architecture plan + Phase 1 primitive components (MetralyButton, MetralyInput, MetralyIcon) — fully committed to main at b7333b1 (May 14, 8:00 PM)
157 8:12p 🟣 Phase 6 Storybook recipe stories completed — all four patterns implemented
158 " ✅ Component map and plan docs updated to reflect Phase 6 recipe completion
160 8:45p 🔵 Shell command execution requires explicit approval in current environment
161 " ✅ Phase 6 + Phase 7 status summary documented in session
159 8:52p 🔵 Storybook preview.ts has no viewport configuration — mobile stories use layout-only approach
162 9:00p 🟣 Responsive story variants added to all 5 Phase 6 recipe stories
163 " 🟣 Phase 7 verification: ui:check and build-storybook pass after responsive changes
164 " ✅ Documentation updated to reflect responsive variant completion in Phase 6
### May 15, 2026
165 8:53a 🔵 Metraly UI → Brandbook Migration Plan Document Read
166 " 🔵 Local Repo Structure: metraly/app Not metraly/ui
167 " 🔵 Component Map and Scenario Audit Documents Fully Read
168 8:54a 🔵 metraly/app/ui/src Complete File Inventory
169 " 🔵 Brandbook Package UI Components vs Plan Requirements Gap
170 8:55a 🔵 Dual App Entrypoints: Two Completely Different Apps in Same Codebase
171 " 🔵 Sidebar Naming Drift Confirmed in Code: AI Assistant, Marketplace, Connect Sources
172 " 🔵 AIScreen is Chat-Only, PluginScreen Has No Review/Trust Flow
173 " 🔵 metraly/app/ui Missing typecheck, storybook, and a11y Scripts
174 " 🔵 Migration Docs Directory Exists with One Pre-existing File
175 8:56a 🔵 App UI Components Are Minimal Prototypes — Not Production Design System Components
176 8:57a 🟣 Phase 1 Inventory Document Created
177 8:58a 🟣 Naming and Status Taxonomy Freeze Document Created
178 9:00a 🟣 Stabilization Gap Report Created — Migration Formally Blocked
179 9:01a 🟣 Storybook Gap Matrix Document Created
180 9:03a 🟣 Next Implementation Plan Document Created — Phase 1 Complete
181 " 🔵 All Five Phase 1 Deliverables Untracked on Migration Plan Branch
182 " ✅ Phase 1 Migration Deliverables Committed to brandbook
S26 Metraly UI Migration Phase 1 Execution — Inventory, naming freeze, stabilization gap analysis, and ordered implementation backlog (May 15, 9:03 AM)
183 9:05a 🔵 App Dependencies Confirm DnD Kit, react-grid-layout, and Zustand Are Already Installed
184 " 🔵 tsconfig.json Has strict:false and Mismatched Module Settings for a Vite Project
185 " 🔵 Vite Config Has No Explicit Entry — Defaults to index.html, Resolving Entrypoint Question
186 9:06a ✅ tsconfig.json Updated to Vite-Compatible ESM Configuration
187 " ✅ typecheck Script Added to metraly/app/ui package.json
188 9:07a 🔵 react-router-dom Confirmed Not Installed — App.tsx Cannot Run
189 " 🔵 DraggableDashboardRenderer Imports from react-grid-layout/legacy — Potential Type Resolution Issue
190 " 🔵 react-grid-layout v2 Layout Type Is Readonly Array — Incompatible with @types/react-grid-layout
191 9:08a 🔵 Layout Type Used as Mutable Array in Multiple Files — Will Break Under v2 readonly Type
192 " 🔵 Test Setup Uses @testing-library/jest-dom/vitest — Vitest Globals May Cause typecheck Errors Without Config
193 9:09a 🔵 vitest/globals.d.ts Found — Adding to tsconfig types Will Fix Test File typecheck
194 " 🔵 DraggableDashboardRenderer Has Proper Button Semantics But Raw rgba() Colors in Edit Mode
195 " 🔴 P0-3: TypeScript typecheck setup — all type errors resolved in app/ui
196 " ⚖️ react-grid-layout v2 requires all imports from /legacy entry
197 " ✅ P0-3 typecheck: next step is running `npm run typecheck` to confirm clean output

Access 1371k tokens of past work via get_observations([IDs]) or mem-search skill.
</claude-mem-context>
## Foundation consolidation rule

Agents must follow `docs/migration/metraly-ui-foundation-agent-rules.md` before changing reusable UI components.

Foundation primitives now own shared layout, spacing, state rhythm, aria glue, overflow behavior, and responsive contracts:

```text
MetralyPanel -> CardShell -> semantic surfaces
FieldShell -> form controls and filter chips
OverlayShell -> Drawer / BottomSheet / future review and trace drawers
StateBlock -> empty / error / gated / loading placeholders
NavigationItemFrame -> sidebar and tree visual rows
useRovingSelection -> tabs and segmented controls
HandlePrimitive -> drag / resize / move / drop affordances
```

Do not merge semantic components into one large API. Compose the shared foundations and keep public components meaningful for their product role.

### Wizard layout rule

For wizard scenarios, prefer the app-aligned `WizardLayout` default: horizontal progress stepper above a centered card, card header/body/review inside one surface, and footer actions below the card. Use `progressPlacement="side"` only for rail documentation, not product-like flows.

### Wizard scenario split rule

Connector/setup/onboarding wizard stories should use `WizardLayout` default top progress. Dashboard creation/builder stories should use the app-like split builder recipe: compact left rail for template/widgets/settings and a right preview canvas. Do not force Dashboard Wizard into the connector setup card layout, and do not use the side rail variant for product-like wizard flows unless explicitly documenting the rail primitive.


## Wizard story parity rules

- Do not mix the connector setup wizard and dashboard builder wizard in the same layout.
- `Components/WizardLayout` demonstrates the connector/source setup flow: centered card, bounded top stepper, provider tiles, connection preview, configure, review.
- `Scenarios/DashboardWizard` demonstrates the dashboard builder flow: AppShell-like sidebar/topbar, left builder rail, right preview canvas.
- Use the AppShellRoleContext sidebar/header rhythm for dashboard-builder stories; avoid creating a second oversized navigation shell.
- Dashboard builder rails must include search/filter affordances when the list can grow beyond a few items.
