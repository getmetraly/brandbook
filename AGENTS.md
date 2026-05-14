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

# [brandbook] recent context, 2026-05-14 11:43am GMT+3

Legend: 🎯session 🔴bugfix 🟣feature 🔄refactor ✅change 🔵discovery ⚖️decision 🚨security_alert 🔐security_note
Format: ID TIME TYPE TITLE
Fetch details: get_observations([IDs]) | Search: mem-search skill

Stats: 50 obs (17,565t read) | 529,811t work | 97% savings

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
### May 13, 2026
240 10:27a 🔵 MetralyTabs Rail vs Active Line CSS Geometry — Root Cause of Alignment Issue
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
268 6:39p 🔵 Metraly Brandbook UI Package Component Inventory
269 " 🔵 Metraly UI Package CSS Architecture
270 " 🔵 Brandbook Design File Served as Gzip Binary — Not Directly Parseable
271 " 🔵 Brandbook Design File is a Tar Archive with Full Project Structure
272 " 🔵 Metraly Brandbook Design Token Specification
273 " 🔵 Brandbook Design Intent: Harden Existing System, Not Rebrand
274 6:40p 🔵 Critical Token Mismatch: Production Theme CSS vs Brandbook Spec
275 " 🔵 Brandbook Component State Matrix for All UI Components
276 " 🔵 Brandbook Primitive Components Not Present in packages/ui
277 6:41p 🔵 Production CSS Already Partially Uses Brandbook oklch Tokens
278 " 🔵 Production DashboardToolbar Diverges Significantly from Brandbook Layout
279 " 🔵 Production MetralySelect Uses Native HTML Select; Brandbook Uses Custom Dropdown
280 " 🔵 Production MetralyTabs API Difference: items vs tabs Prop
281 6:42p 🔵 DashboardDropZone Correctly Hardcodes data-pulse="off" per Brandbook Rules
282 " 🔵 StateBadge CSS Missing "new" and "purple" States; "stale" Color Wrong
283 " 🔵 MetralyTable CSS Well-Aligned with Brandbook Tokens; Row Marker Uses Hex Instead of oklch
284 " 🔵 WidgetPickerCard CSS Uses Static clip-path Pulse Marker, Not Animated SVG
285 6:45p 🔴 StateBadge visualStateAliases Fixed for "new", "purple", and "disabled" States
286 6:46p 🔴 StateBadge "stale" Color Fixed to Brandbook Amber
287 " 🟣 StateBadge CSS Now Has Complete State Coverage per Brandbook
288 " 🔴 Checkbox Checked/Indeterminate States Fixed to Match Brandbook Solid Fill
289 " 🔴 MetralySwitch Dimensions Resized to Match Brandbook Spec

Access 530k tokens of past work via get_observations([IDs]) or mem-search skill.
</claude-mem-context>