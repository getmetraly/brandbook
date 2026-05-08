# Phase 0 Baseline Backlog

## Purpose

Turn the Phase 0 baseline audit into an executable backlog. This phase should freeze the current state of the brandbook, the website, and the product app before any shared-primitive migration begins.

## Phase Goal

Capture the current visual and behavioral baseline, identify the highest-risk flows, and make regressions visible before shared-component migration starts.

## Scope

### In Scope

- Brandbook docs portal pages.
- Brandbook editor flow.
- Brandbook component previews and grouped documentation pages.
- Website route inventory and claim-safe copy.
- App dashboard, board and wizard flows.
- Dependency matrix and test coverage matrix.

### Out of Scope

- No direct changes to `../app`.
- No direct changes to `../website`.
- No new component abstractions unless they are required to lock the baseline.
- No dependency upgrades without a separate compatibility review.

## Backlog Items

### 0.1 Capture Brandbook Baseline

- Record the current grouped docs portal route map.
- Capture screenshots for `/components`, `/components/forms`, `/components/data-display`, `/components/dashboard`, `/components/navigation`, `/components/feedback`, `/patterns/widget-editor`, `/patterns/dashboard-layout`, `/examples/engineering-dashboard`, and `/editor`.
- Record the current `@metraly/ui` component inventory and dashboard primitives.
- Verify that `/components` remains unchanged.

### 0.2 Capture Website Baseline

- Record the current public route inventory for homepage, pricing, demo, docs, trust, blog, privacy and terms.
- Capture the current claims language and note any copy that must remain conservative.
- Record which pages already use reusable shell or card patterns that can be mapped to brandbook primitives later.

### 0.3 Capture App Baseline

- Record the dashboard create/save/load/render flow.
- Record the board edit flow, including drag and resize behavior.
- Record the dashboard wizard flow and any page-level shell primitives.
- Identify which app-local shells and widget families duplicate brandbook primitives.

### 0.4 Freeze Dependency Risk

- Record current versions for React, Next.js, `react-grid-layout`, `@dnd-kit/*`, `zustand`, Storybook, Jest, Playwright and chart tooling.
- Flag the highest-risk mismatches between brandbook, website and app.
- Document any packages that should be pinned before the next migration slice.

### 0.5 Expand Test Coverage

- Ensure the brandbook test suite covers the editor lifecycle and grouped preview surfaces.
- Add or harden tests for component states that are still missing from the baseline.
- Record any missing visual regression gates that should be added in the next phase.

## Deliverables

- Baseline inventory for brandbook, website and app.
- Dependency risk summary.
- Screenshot or test baseline list for the highest-risk flows.
- List of gaps that should be handled in Phase 1 and Phase 2.

## Acceptance Criteria

- A reviewer can identify the current canonical brandbook surface without guessing.
- The website and app baseline routes are known and documented.
- The highest-risk flows are captured by tests or explicit baseline notes.
- Dependency drift is documented clearly enough to drive phase planning.
- No uncontrolled product or website changes are required to complete the baseline.

## Risks

- If the baseline is incomplete, later migrations will inherit hidden regressions.
- If the dependency matrix is too coarse, the next phase may choose the wrong update order.
- If baseline screenshots are skipped, visual regressions will be harder to isolate later.
