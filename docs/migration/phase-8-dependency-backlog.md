# Phase 8 Dependency Backlog

## Purpose

Turn the dependency and compatibility phase into concrete backlog items. This phase reduces toolchain drift and keeps the brandbook contract stable while the app and website migrate toward it.

## Phase Goal

Stabilize the shared contract by pinning risky dependencies, documenting version alignment rules and keeping known compatibility gaps isolated.

## Scope

### In Scope

- Brandbook dependency pinning and compatibility review.
- React, Next.js, `react-grid-layout`, `@dnd-kit/*`, `zustand`, Storybook, Jest, Playwright and chart tooling alignment.
- Package boundary checks for `@metraly/ui` and the site.
- Compatibility guidance for the app repo’s React 18 and Vite stack.

### Out of Scope

- No broad feature work.
- No direct changes to `../app` or `../website`.
- No migration of product shells or marketing pages in this phase.
- No new component abstractions unrelated to compatibility.

## Backlog Items

### 8.1 Pin Brandbook Floating Dependencies

- Replace floating or unstable dependency ranges in brandbook with validated versions where the migration stack already relies on them.
- Prioritize `recharts`, TypeScript and any QA tooling that materially affects the baseline.
- Record which pins are required immediately and which can wait for the next phase.

### 8.2 Isolate `react-grid-layout` Compatibility

- Keep the current `react-grid-layout` adapter isolated in the brandbook editor surface.
- Confirm the runtime prop surface and the TypeScript workaround remain stable.
- Document the exact mismatch so future app migration work knows what to preserve.

### 8.3 Review React And Next Alignment

- Keep brandbook and website aligned on the same Next.js major line where possible.
- Document the React 19 baseline in brandbook and website.
- Keep the app repo on React 18 until its migration path is explicitly staged and tested.
- Note any hook or peer-dependency behavior that changes across versions.

### 8.4 Review `@dnd-kit/*` And `zustand`

- Confirm that drag-and-drop and selector-friendly state dependencies remain aligned across the canonical repos.
- Record any version differences that are acceptable versus those that would break the shared contract.
- Keep drag/resize accessibility assumptions consistent across the migration plan.

### 8.5 Review Storybook, Jest And Playwright Tooling

- Confirm that the brandbook testing stack is compatible with the current grouped preview and editor surfaces.
- Pin or update the tooling only when the migration plan depends on it.
- Keep visual regression and interaction testing aligned with the phase backlogs.

### 8.6 Document Package Boundary Rules

- Confirm that site imports come from `@metraly/ui` where intended rather than from source-path imports.
- Confirm that `@metraly/ui` exports match the canonical docs and phase backlog assumptions.
- Note any missing exports that should be added in a later, non-breaking phase.

### 8.7 Record Repository-Specific Risk Boundaries

- Document which dependency risks belong to brandbook only.
- Document which risks are shared with the website.
- Document which risks are app-specific and should not be normalized prematurely.
- Keep compatibility guidance explicit enough that later migration work does not guess.

### 8.8 Define Upgrade Sequencing

- Establish the order in which risky dependencies should be revisited.
- Avoid forcing dependency changes before the phase that needs them.
- Make sure pinned versions remain consistent with the backlog and the audit.

## Required Tests

- typecheck and build verification for brandbook packages.
- regression runs for the editor and grouped preview surfaces.
- package boundary checks for `@metraly/ui` imports and exports.
- compatibility validation for the versions that are pinned or constrained.

## Deliverables

- Dependency pin list for brandbook.
- Compatibility matrix for brandbook, website and app.
- Documented `react-grid-layout` adapter rule.
- Package boundary notes for shared imports and exports.

## Acceptance Criteria

- Known compatibility risk areas are documented and bounded.
- No migration phase depends on an unreviewed dependency upgrade.
- The brandbook stack remains the canonical reference while the app stays on its own schedule.
- Tooling and version drift are explicit enough to plan future upgrades safely.

## Risks

- Forcing version alignment too early can destabilize the app repo.
- Leaving floating dependencies in the canonical stack makes every later phase less predictable.
- If the `react-grid-layout` workaround is not isolated, compatibility drift will spread into unrelated code.

