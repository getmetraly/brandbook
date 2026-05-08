# Phase 7 Visual And Accessibility Backlog

## Purpose

Turn the visual regression and accessibility hardening phase into concrete backlog items. This phase raises the confidence bar before the migration expands into the remaining surface area.

## Phase Goal

Reduce the chance of subtle visual, responsive and accessibility regressions by turning the canonical brandbook surfaces into a dependable regression gate.

## Scope

### In Scope

- Visual regression for canonical grouped preview pages.
- Accessibility checks for docs pages, grouped previews and the editor flow.
- Reduced-motion checks for animated or pulse-driven surfaces.
- Responsive screenshots and layout checks at common desktop and mobile widths.
- Baseline preservation for `/components`.

### Out of Scope

- No new component abstractions.
- No dashboard or website product migration work.
- No direct changes to `../app` or `../website`.
- No dependency upgrades unrelated to QA.

## Backlog Items

### 7.1 Establish Canonical Screenshot Surfaces

- Capture and pin screenshots for `/components`.
- Capture and pin screenshots for grouped preview pages that best represent the system:
  - `/components/primitives`
  - `/components/forms`
  - `/components/data-display`
  - `/components/dashboard`
  - `/components/navigation`
  - `/components/feedback`
  - `/patterns/dashboard-layout`
  - `/patterns/widget-editor`
  - `/examples/engineering-dashboard`
  - `/editor`
- Decide which additional surfaces are stable enough to join the baseline later.

### 7.2 Add Visual Regression Gate

- Define how screenshot comparisons will be run and reviewed for brandbook.
- Decide whether Storybook, Playwright or both should own the regression baseline.
- Keep the baseline pinned before adding more surfaces.
- Make sure the regression gate is strict enough to catch spacing, collision and alignment drift.

### 7.3 Add Accessibility Checks

- Verify keyboard navigation for grouped preview pages and the docs shell.
- Check focus-visible behavior for buttons, tabs, menus, links, tables and editor controls.
- Check semantic roles and labels for dialogs, switches, tabs, tables and option lists.
- Confirm aria labels for widget picker, widget shell and dashboard editor surfaces.

### 7.4 Add Reduced-Motion Checks

- Verify that motion and pulse-driven surfaces remain calm and readable under reduced-motion settings.
- Confirm that no animation loops or excessive transitions are introduced during migration.
- Check that pulse markers and loading states remain semantic rather than decorative.

### 7.5 Add Responsive Coverage

- Capture desktop and mobile screenshots for the docs portal, grouped preview pages and the editor flow.
- Check that the hero, nav, sidebar, toolbar and widget picker do not collide at smaller widths.
- Ensure dashboard, cards and docs layouts remain readable without content overlap or clipping.

### 7.6 Preserve Surface-Specific QA Rules

- Keep `/components` unchanged unless explicitly requested.
- Preserve the grouped preview pages as the candidate regression surfaces.
- Make sure chart wrappers, DnD affordances and empty states are part of the regression set.
- Keep the docs portal readable and navigable at all supported widths.

### 7.7 Expand Test Coverage Where Needed

- Add or harden tests for visual states that are not yet covered by existing RTL/component suites.
- Add docs route checks for breadcrumbs, related links and previous/next links.
- Add editor lifecycle checks where the UI is most likely to drift during layout changes.

### 7.8 Define Release Gate Criteria

- Agree on the minimum set of screenshots and accessibility checks required before a migration phase can ship.
- Define what counts as a blocking visual regression.
- Define what counts as a blocking accessibility regression.
- Keep the release gate narrow enough to be usable, not so broad that it becomes noisy.

## Required Tests

- Storybook build if Storybook is used as the visual baseline.
- visual snapshot comparisons for canonical surfaces.
- axe-style accessibility checks.
- reduced-motion review.
- responsive screenshots at desktop and mobile widths.
- route and shell smoke checks for docs/editor surfaces.

## Deliverables

- Baseline screenshot matrix.
- Accessibility checklist and gate.
- Reduced-motion verification notes.
- Responsive coverage plan for canonical surfaces.
- Release gate definition for later migration phases.

## Acceptance Criteria

- A component cannot be promoted without a visual and accessibility pass.
- Brandbook becomes a stable regression gate for downstream migrations.
- Canonical surfaces are clear enough that future work knows what to compare against.
- The QA gate is strict enough to catch subtle regressions but not so noisy that it becomes unusable.

## Risks

- Visual tooling can be noisy if the baseline is not pinned first.
- Accessibility gates can become superficial if they only check presence and not behavior.
- Too many screenshot surfaces can make the regression gate too expensive to maintain.

