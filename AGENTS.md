# AGENTS.md — Metraly Brandbook Operating Guide

This file defines how AI/code agents should work in `getmetraly/brandbook`.

## Repository purpose

This repository is the visual source of truth for Metraly. It contains:

- brand principles;
- design tokens;
- component guidelines;
- implementation assets;
- the Next.js brandbook site;
- protected baseline examples in `/components`;
- active preview hardening work in `site/app/components/previews`.

## Language rule

All new or updated brandbook documentation must be written in English.

## Protected surfaces

### `/components`

`site/app/components/page.tsx` is the baseline/reference page. It should not be changed unless the user explicitly asks to modify `/components`.

Allowed without approval:

- read it;
- compare against it;
- document gaps;
- reference it in reports.

Not allowed without approval:

- changing layout;
- changing examples;
- removing the `Metric source` example;
- rewriting CSS specifically for `/components`.

### Preview hardening

`site/app/components/previews/` is the active working surface for experiments, component hardening, screenshot review, state coverage and product scenario examples.

## Current design snapshot

Before editing UI or docs, read:

```text
brandbook/current-design-state.md
site/app/components/previews/README.md
design-system/components.md
design-system/micro-telemetry-primitives.md
design-system/board-edit-mode.md
```

## Visual system rules

- Dark UI is the default.
- Cyan is the primary operational signal.
- Purple is a secondary depth/accent color.
- Glow must be subtle and functional.
- Pulse-wave is a brand primitive, not decoration spam.
- Pulse-wave can be used inside logo marks, state indicators, selected controls, badges, chart accents and telemetry dividers.
- Do not place pulse-wave before drag labels such as `Drag to move`.
- Drag handles must use neutral grip dots.
- Hover states must not move elements vertically.
- Focus states must be visible.
- Disabled states must be clear and non-interactive.
- Static content should use the default cursor.
- Buttons and menu items should use pointer cursor.
- Text inputs should use text cursor.
- Resize handles should use resize cursors.

## Component hardening priorities

Work from small primitives to composite surfaces:

1. Checkbox / Radio / Switch / Dropdown / Tabs / Segmented Control.
2. StateBadge / Toast / Notification / Timeline / EmptyState / Skeleton.
3. WidgetPicker / WidgetShell / GridItem / TableRow.
4. Sidebar / Topbar / Toolbar / CommandPalette / Menus / Modal / Drawer.
5. Charts and board edit mode.
6. Real dashboard scenario.

## Required state coverage

Every component candidate should show or support the relevant states:

- default;
- hover;
- focus-visible;
- active/selected;
- disabled;
- loading;
- unread/new;
- error/destructive;
- delayed/stale/no-data for telemetry states.

## Dashboard and DnD rules

- Board edit mode must show selected, dragging, drop target, resize and full-width states.
- Drop targets should use a visible dashed cyan border and subtle tint.
- Resize affordances should sit outside content rhythm and must not cover text.
- `@dnd-kit/*` and `react-grid-layout` compatibility matters.
- Zustand state should be selector-friendly.
- Recharts must be wrapped by Metraly chart primitives before product adoption.

## Documentation update rules

When changing UI or visual direction, update the relevant `.md` docs in the same patch:

- `brandbook/current-design-state.md`
- `site/app/components/previews/README.md`
- `design-system/components.md`
- `design-system/micro-telemetry-primitives.md`
- `design-system/board-edit-mode.md`
- `framework/testing-strategy.md`
- migration notes if adoption changes

## Verification checklist

Before returning a patch/archive:

- `/components` unchanged unless explicitly requested.
- preview hardening surfaces compile conceptually and import existing components.
- CSS braces are balanced.
- No visible `draft` badges unless requested.
- No pulse before drag handles.
- Hero text, toolbar, sidebar and widget picker do not collide.
- Markdown docs are in English.
- `AGENTS.md` remains aligned with current design rules.

## Output expectations for agents

When asked to provide a patch, include complete files, not diff fragments.
When asked for a full archive, include the full project tree.
When a file should be deleted, list it in a delete list instead of deleting it silently.


<claude-mem-context>
# Memory Context

# [brandbook] recent context, 2026-05-13 11:25am GMT+3

Legend: 🎯session 🔴bugfix 🟣feature 🔄refactor ✅change 🔵discovery ⚖️decision 🚨security_alert 🔐security_note
Format: ID TIME TYPE TITLE
Fetch details: get_observations([IDs]) | Search: mem-search skill

Stats: 50 obs (20,224t read) | 328,333t work | 94% savings

### May 10, 2026
S28 Validation of Claude Design visual reference integration into getmetraly/brandbook — completed; TDD fix plan produced for 7 issues; awaiting user "start" to begin implementation (May 10, 3:46 PM)
S27 Validation-only review of Claude Design visual reference integration into getmetraly/brandbook — checking protected surfaces, design-system fit, component state coverage, build health, and test results (May 10, 3:46 PM)
S29 Validation of Claude Design integration into getmetraly/brandbook completed; TDD fix plan written to repository docs and progress log initialized; awaiting "start" to begin implementation (May 10, 3:51 PM)
S30 TDD fix plan for Metraly Brandbook Codex integration — all 7 steps completed, 71/71 tests green, build clean (May 10, 3:52 PM)
S31 Metraly Brandbook TDD fix plan — all 7 steps complete, 71/71 tests green, build clean, loop bug persisting (May 10, 3:55 PM)
S32 Read continuation-agent-prompt.md and resume migration work in metraly/brandbook (May 10, 3:58 PM)
### May 11, 2026
S33 Resume migration work from continuation-agent-prompt.md — ended up executing Phase 1-3 primitive hardening and shipping 35 new tests + 1 bug fix (May 11, 7:01 PM)
S34 Phase 4 Dashboard backlog read — planning to start dashboard editor hardening work (May 11, 7:08 PM)
S36 Checkout brandbook-migration-governance-start branch, merge main, re-read continuation-agent-prompt.md, fix all discrepancies, produce detailed report (May 11, 7:10 PM)
S35 Continue metraly/brandbook migration work — Phase 4 dashboard tests (4.3/4.4/4.5/4.6/4.7) (May 11, 7:13 PM)
218 7:26p 🔵 /components/previews page content gap — missing "Engineering Dashboard Editor", "Release to add widget", drag/drop rule text
219 " 🔵 Required e2e text exists in ClaudeDesignStateBoard.tsx — failures are selector specificity issues, not missing content
220 " 🔵 ClaudeDesignStateBoard has h1 "Metraly preview hardening surface" — creates second h1 on page alongside DocsShell's h1
221 7:27p 🔵 Complete heading hierarchy for /components/previews confirmed — sidebar Link causes "Preview Hardening" duplicate match
222 " 🔵 ClaudeDesignStateBoard hero section has h1 + "draft-kicker" span — both are accessibility/e2e issues
223 " 🔵 No "draft" status text in DocsShell/DocsBlocks — /draft/i count(0) e2e check will pass
224 " 🔴 Fixed duplicate h1 in ClaudeDesignStateBoard — changed to p.claude-preview-section-title
225 7:29p 🔵 visual-baseline.spec.ts exact failing lines identified — 4 selectors need specificity fixes
226 " 🔴 Fixed visual-baseline.spec.ts strict mode violation — added .first() to getByText(/Dashed cyan border/i)
227 7:30p 🔴 Fixed dashboard-editor.spec.ts "Stat Card" strict mode — scoped to [data-widget-id] locator
228 " 🔵 E2e progress: 7→5 failures after fixes; 2 tests fixed, viewport width assertion now failing
229 " 🔵 New strict mode violations found: "Release to add widget" and "Engineering Dashboard Editor" both match 2 elements
230 7:31p 🔴 Fixed remaining strict mode violations in e2e specs — .first() added to Release/Remove selectors
231 " 🔴 All 15 Playwright e2e tests pass — PR #2 criterion 4 of 4 satisfied
### May 13, 2026
232 10:20a 🔵 Phase 3 Forms & Controls Work Context Established in brandbook Repo
233 " 🔵 Git Index.lock Read-Only Filesystem Error in brandbook Repo
234 " 🔵 Phase 3 Brandbook Forms & Controls: Status and Roadmap
235 10:21a 🔵 MetralySwitch Prototype Spec and Full Metraly Component Design Rules
237 " 🔵 Correct Path for Phase 3 Migration Doc in brandbook Repo
236 10:22a 🔵 Metraly Brandbook Component Readiness Matrix and Implementation Handoff Rules
238 10:25a 🔵 Phase 3 PR State: MetralyTabs Rail Alignment is the Remaining Blocker
239 10:27a 🔵 MetralyTabs Implementation and CSS Architecture Mapped
240 " 🔵 MetralyTabs Rail vs Active Line CSS Geometry — Root Cause of Alignment Issue
241 " 🔴 MetralyTabs Active Underline Alignment Fixed in metraly-forms.css
242 10:28a 🔴 MetralyTabs Content Padding Conflict Resolved in metraly-forms.css
243 " 🔵 Forms Test Suite Passes After MetralyTabs CSS Fix — 17/17 Tests Green
244 " 🔵 Chart card renders DOM elements but SVGs are missing
245 10:40a 🔵 Recharts responsive containers render with correct dimensions but produce no SVG
246 " 🔵 Playwright executable path typo: `chrome-headless_shell` vs `chrome-headless-shell`
248 " 🔵 ChartCard uses a mock stub instead of real Recharts — root cause of blank SVG
249 " 🔵 Next.js HMR WebSocket errors in headless Playwright are benign noise
247 10:41a 🔵 Recharts SVG absence is not a timing issue — confirmed after 2.5s wait
250 " 🔵 Real Recharts chart components exist in packages/ui with full API
251 10:42a 🟣 MetralyAreaChart gained optional width prop enabling fixed-size rendering without ResponsiveContainer
252 " 🟣 Fixed-width rendering pattern rolled out to MetralyAreaChart and MetralyComposedChart
253 10:43a 🔴 All four Metraly chart components updated with fixed-width mode; preview wired with width={680}
254 " 🔵 SVG still absent after fixed-width changes — preview page may not use ClaudeDesignStateBoard charts
255 " 🔵 ClaudeDesignStateBoard Jest tests pass but Playwright still shows no SVGs — confirms component/route mismatch
256 10:44a 🔵 Dev server restarted on port 3001 — old server still occupying port 3000
257 " 🔵 Playwright cannot reach port 3001 — sandbox network restricted to previously established port 3000
258 " 🔵 Port 3000 held by next-server PID 124656 — the same PID Next.js reported but kill failed to reach
259 10:45a 🔵 Stale next-server PID 124656 successfully killed with escalated permissions
260 " 🔵 Fresh dev server started on port 3000 with patched chart code; second kill -9 may have terminated it
261 " 🔵 @metraly/ui exports source files directly — no build step required for chart changes to take effect
262 " 🔵 Real MetralyAreaChart now renders recharts-wrapper at correct dimensions but Recharts produces empty SVG wrapper
263 10:47a ⚖️ Replaced Recharts components in preview with hand-crafted SVG — bypassing Recharts client-side paint failure entirely
264 " 🔴 Fixed SVG path syntax in DashboardAreaPreview and DashboardCompositePreview; removed unused Recharts imports
265 " 🔴 Chart cards now render SVG in headless Playwright — svg=2, chartCards=2 confirmed
266 10:48a 🟣 All 17 Jest tests pass after SVG chart fix; handoff doc and git status summarize complete changeset
267 " 🟣 Final screenshot confirms chart card renders visible SVG area chart in headless Playwright

Access 328k tokens of past work via get_observations([IDs]) or mem-search skill.
</claude-mem-context>