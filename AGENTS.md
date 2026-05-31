<claude-mem-context>
# Memory Context

# [brandbook] recent context, 2026-05-31 12:22pm GMT+3

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

---

## AGENT.md — Metraly Brandbook Rules

This repository is the Metraly framework UI / brandbook layer. Treat it as a strict design-system repository, not as a playground for visual experiments.

### Source of truth

Canonical implementation lives in:

```text
packages/ui/src
packages/ui/src/styles/metraly-ui.css
packages/ui/src/styles/metraly-theme.css
packages/ui/src/styles/metraly-fonts.css
packages/ui/src/fonts/*.woff2
```

### Repository layers

```text
packages/ui/      production UI package and canonical CSS
storybook/        validation/demo layer that consumes @metraly/ui
assets/           brand assets only when intentionally synced from design-system source
fonts/            optional top-level assets; package fonts live in packages/ui/src/fonts
```

Storybook may wrap components for documentation, but it must not redefine how the components look.

### Styling rules

Use only canonical tokens from `metraly-theme.css`:

```text
--m-bg-0..4
--m-line, --m-line-faint, --m-line-strong
--m-fg-0..4
--m-cyan-*, --m-purple-*
--m-ok, --m-warn, --m-err, --m-new
--m-font-*
--m-fs-*
--m-1..9
--m-r-*
--m-glow-*
--m-shadow-*
--m-dur-*, --m-ease
```

### Inline CSS policy

Inline CSS is forbidden in Storybook stories. Use shared Storybook layout classes from `storybook/stories/_shared/metraly-story-frame.css`.

### CSS class policy

Production package classes: `metraly-*`. Storybook helpers: `msf__*`. No `brand-*`, `claude-*`, `m-*` classes.

### Fonts

`metraly-ui.css` must import `metraly-fonts.css` before theme/component CSS. Bundled font files stay at `packages/ui/src/fonts/`.

### Storybook rules

Storybook is a validation layer. It must consume the package, not fork it.

### Validation commands

```bash
npm run check
npm run build-storybook
```

### Commit discipline

Use focused commits. Example: `fix(brandbook): align storybook with metraly design-system tokens`