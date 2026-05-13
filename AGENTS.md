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

# [brandbook] recent context, 2026-05-13 11:14pm GMT+3

Legend: 🎯session 🔴bugfix 🟣feature 🔄refactor ✅change 🔵discovery ⚖️decision 🚨security_alert 🔐security_note
Format: ID TIME TYPE TITLE
Fetch details: get_observations([IDs]) | Search: mem-search skill

Stats: 13 obs (6,284t read) | 233,392t work | 97% savings

### May 13, 2026
68 10:47p ✅ Dashboard Editor Visual Conformance Pass Initiated
69 " 🔵 Prototype Dashboard Editor Layout and Component Architecture Confirmed
70 10:48p 🔵 Dashboard.stories.tsx Layout Mismatches Confirmed Against Prototype
71 " 🔵 Prototype WidgetPickerCard Uses Icon Glyphs and Shows Badges Only for "new" State
73 " 🟣 Dashboard.stories.tsx Rebuilt with Three-Column App Chrome Layout
74 " 🔵 site/app/components/dashboard/dashboard.css Contains Stale Two-Column Layout Rules
72 10:49p 🔵 Prototype WidgetShell Badge and Resize Handle Rules Confirmed
75 10:54p 🟣 WidgetPickerCard Icon System Replaced with Inline SVG Glyphs
76 10:56p 🟣 Dashboard Editor Story — Row 2+ Widgets & Right Rail Search Icon Fix
77 10:58p 🔵 Right-Rail Search Row Uses Wrong Icon ("metric" instead of "search")
S19 Dashboard Editor story — add row 2+ widgets, fix right-rail search icon, keep layout/validation green (May 13, 10:59 PM)
S20 Dashboard Editor story — add row 2+ widgets, fix right-rail search icon, keep layout/validation green (May 13, 10:59 PM)
78 11:08p 🟣 Dashboard Editor Story — Row 2+ Widgets Added & Search Icon Fixed
79 " 🟣 All 4 Validation Commands Pass After Story Expansion
80 11:09p 🔵 Story Passes PulseWave & CSS Boundary Hygiene Check
S21 Dashboard Editor story — add row 2+ widgets, fix right-rail search icon, keep layout/validation green — COMPLETED (May 13, 11:09 PM)
**Investigated**: Grepped `stories/Dashboard.stories.tsx` to locate search icon bug (line 414: `name="metric"` instead of `name="search"`). Confirmed `PICKER_ICONS` already had "search" key. Verified baseline validation was still green before making changes. Post-change grep confirmed zero pulse-wave, site CSS, or preview-pattern matches in the story.

**Learned**: The local `Icon` component in the story did not include a "search" path entry — it needed to be added alongside the fix. SVG bar charts in story-only widgets should use `preserveAspectRatio="none"` to scale fluidly to grid column width. A `widgetBody()` dispatch function with a `body: string` discriminant on `WidgetDef` cleanly handles multiple widget body types without prop drilling or union type explosion.

**Completed**: `stories/Dashboard.stories.tsx` fully rewritten and passing all 4 validation commands:
    - Added "search" SVG glyph to local `Icon` paths map; fixed search row from `name="metric"` to `name="search"`
    - Added 5 inline widget body components: `DeployFreqBody` (SVG bar chart with rollback dots), `DoraOverviewBody` (2×2 DORA quadrant), `CycleTimeBarsBody` (proportional horizontal bar + legend), `BlockedWorkBody` (severity-colored list), `PRReviewTableBody` (team latency table with outlier coloring)
    - Expanded canvas from 4 widgets (row 1 only) to 11 widgets across 7 rows matching prototype grid positions
    - Introduced `WidgetDef` TypeScript type and `widgetBody()` selector
    - 3-column layout preserved: sidebar 196px | flex canvas | right rail 320px
    - Zero pulse-wave, site CSS imports, or preview patterns (confirmed by grep)
    - `ui:check` ✅ · `site:typecheck` ✅ · `site:test` ✅ 155/155 · `build-storybook` ✅

**Next Steps**: All acceptance criteria met. Task is complete. No further work planned unless user requests additional changes.


Access 233k tokens of past work via get_observations([IDs]) or mem-search skill.
</claude-mem-context>