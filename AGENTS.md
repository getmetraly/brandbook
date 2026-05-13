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

# [brandbook] recent context, 2026-05-13 11:32pm GMT+3

Legend: 🎯session 🔴bugfix 🟣feature 🔄refactor ✅change 🔵discovery ⚖️decision 🚨security_alert 🔐security_note
Format: ID TIME TYPE TITLE
Fetch details: get_observations([IDs]) | Search: mem-search skill

Stats: 23 obs (11,751t read) | 837,246t work | 99% savings

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
81 11:15p ⚖️ Brandbook Prototype Source Rebuild — Codex Architecture Cleanup Pass
82 " 🔵 Branch Audit: prototype-source-rebuild Has 187 Files Changed vs main
83 " 🔵 WidgetPickerCard Confirmed Pulse-Free with Inline SVG Operational Icons
84 " 🔵 Storybook Global CSS Stack Confirmed Complete; Pulse Usage Semantically Correct Across Codebase
85 " 🔵 Dashboard.stories.tsx Already Contains Extracted Scenario Body Components
86 " 🔵 site/app/components/dashboard/dashboard.css Contains Site-Scoped Layout Classes, Not a Second Design System
87 " 🔵 Test Suite Confirms Badge Suppression Contract for WidgetPickerCard
88 11:18p 🔵 Critical: E2E Tests Reference Deleted /components/previews Route
89 " 🔵 Dashboard Editor Scenario Fully Implements 3-Column Shell with 11-Widget Canvas
90 " 🔵 Component Stories Audit: All Stories Are Prototype-First, No Old Preview Imports

Access 837k tokens of past work via get_observations([IDs]) or mem-search skill.
</claude-mem-context>