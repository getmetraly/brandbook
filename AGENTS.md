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

# [brandbook] recent context, 2026-05-14 9:34pm GMT+3

Legend: 🎯session 🔴bugfix 🟣feature 🔄refactor ✅change 🔵discovery ⚖️decision 🚨security_alert 🔐security_note
Format: ID TIME TYPE TITLE
Fetch details: get_observations([IDs]) | Search: mem-search skill

Stats: 50 obs (21,194t read) | 1,892,631t work | 99% savings

### May 13, 2026
S19 Dashboard Editor story — add row 2+ widgets, fix right-rail search icon, keep layout/validation green (May 13, 10:59 PM)
S20 Dashboard Editor story — add row 2+ widgets, fix right-rail search icon, keep layout/validation green (May 13, 10:59 PM)
S21 Dashboard Editor story — add row 2+ widgets, fix right-rail search icon, keep layout/validation green — COMPLETED (May 13, 11:03 PM)
S22 Fix prototype P0 visual parity gaps in the Metraly brandbook UI component library (@metraly/ui) (May 13, 11:09 PM)
### May 14, 2026
115 10:26a ✅ Component Contract Updated with Actionable No-Pulse Rules
116 " ✅ Storybook Contract Expanded with Per-Component State Checklists and Pulse Story Rules
117 " 🔵 @metraly/ui TypeScript Type Check Passes Clean
118 " 🔵 Full Test Suite Passes — 155 Tests, 23 Suites, with Known JSX Transform Warning
119 10:27a 🔵 CSS Cleanup Verified — No Old Preview Layer or Hardcoded RGBA Remnants
120 " 🔵 Storybook Build Succeeds — PulseWave Absent from All Production Code
121 10:28a ✅ Session Change Summary — 14 Files Modified, 355 Insertions, 102 Deletions
122 " ✅ Committed P0 Visual Parity Fixes to prototype-source-rebuild Branch
S23 Design system convergence: prepare getmetraly/brandbook (packages/ui) with Phase 0 architecture plan + Phase 1 primitive components (MetralyButton, MetralyInput, MetralyIcon) so metraly/ui can eventually be rewritten on top of @metraly/ui (May 14, 10:28 AM)
123 10:47a 🔵 Brandbook UI Package Source Structure Mapped
124 " 🔵 Storybook Coverage Gap: Component State Board Story Missing
125 10:48a 🔵 Prototype Source Files Located at ../docs/prototypes/brandbook
126 " 🔵 Prototype Token System Fully Mapped from tokens.css
127 " 🔵 Prototype Form Controls Specification Fully Read
128 " 🔵 Prototype Widget Components Specification Fully Read — WidgetShell is DashboardWidget Alias
129 10:50a 🔵 Prototype Primitives Define PulseWave, GripDots, StatusDot, Icon SVG Paths
130 " 🔵 Component Implementation Audit: Form Controls TSX vs Prototype Contract
131 " 🔵 Dashboard Component CSS Audit: Core Conformance Confirmed with Gaps
132 " 🔵 Component State Board Story Already Exists in Storybook
133 " 🔵 DashboardDropZone Has data-pulse="off" Hardcoded and Uses Text × + Instead of SVG Icons
134 " 🔵 MetralyTabs CSS Missing Entirely — Zero CSS Rules for Tab Component
135 " 🔵 MetralyTable TSX Well-Structured with dense/stickyHeader Props and Row Marker System
136 10:51a 🔵 DashboardDropZone and DashboardResizeHandle Missing from @metraly/ui Package Exports
137 " 🔵 MetralyTable CSS Well-Implemented with m-shimmer and 2px Selected Row Indicator
138 10:58a ✅ Prototype Parity Implementation Plan Written to docs/superpowers/plans/
139 7:49p ⚖️ Metraly Design System Convergence: Brandbook-to-Product Architecture Plan Initiated
140 " 🔵 Complete @metraly/ui Public API Inventory Confirmed
141 " 🔵 Metraly Product Has Two Parallel App Entrypoints
142 " 🔵 Product Sidebar Implementation: 297-Line Component with Density, Collapse, and Pin System
143 " 🔵 Brandbook Repository Structure Confirmed: 5 Core Docs + Migration Dir + Storybook Scenarios
144 7:50p 🔵 Product Topbar: 51-Line Density-Aware Header with Hardcoded Quick Search and Notification Badge
145 " 🔵 Product Icon System: 50 Custom SVG Paths in a Single Record, No External Dependencies
146 " 🔵 DraggableTweaksPanel: Product-Only DevTools Panel That Mutates --cyan CSS Variable at Runtime
147 " 🔵 Product Legacy CSS Token System: Complete Variable Definitions Confirmed
148 " 🔵 Dashboard Editor Storybook Scenario Already Contains Full ScenarioSidebar and ScenarioTopbar
149 " 🔵 Brandbook Token System: Complete --m-* CSS Variable Catalog with OKLCH Colors and Motion/Spacing Scale
150 " 🔵 MetricsScreen: 571-Line Monolith with Metric Tree (220px Rail), Toolbar, Chart Card, Breakdown, and Formula Box
151 " 🔵 Brandbook Component Contract Establishes No-Pulse Rules and Responsive Behavior Per Component
152 " 🔵 Onboarding WizardScreen: 475-Line Multi-Step Flow Revealing Need for ChoiceCard, StepIndicator, ConnectorCard, and WizardLayout Primitives
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

Access 1893k tokens of past work via get_observations([IDs]) or mem-search skill.
</claude-mem-context>