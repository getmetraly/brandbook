# Recipe Composition UX Audit

Status: initial Staff-level review after the public API and component-map audit.

Scope: Storybook recipes and product-composition patterns that should guide the future migration of `getmetraly/metraly/ui` into `@metraly/ui` without turning screen-specific UX into public primitives.

## Principle

The brandbook should not grow by copying every product screen into `packages/ui`. It should grow by separating three layers:

1. **Public primitives** — stable components with clear contracts, reusable across product, website, and docs.
2. **Recipes** — canonical screen assemblies that demonstrate how primitives compose into real product UX.
3. **Product composition** — app-specific logic, data loading, permissions, drag/drop, and workflow state that stays outside `packages/ui`.

This keeps the public API smaller, makes Storybook useful for migration, and avoids creating one-off components such as `AuthCard`, `PluginCard`, `MetricsExplorerScreen`, or `WizardStepper` too early.

## Current recipe inventory

| Recipe | Keep as recipe? | Public components used | Current value | Main gap |
| --- | --- | --- | --- | --- |
| Metrics Explorer | Yes | Shell, Sidebar, Topbar, NavigationTree, SegmentedControl, Select, MetricCard, Panel, Table, CodeBlock, Drawer | Strong proof that explorer UX does not need a dedicated public screen component. | Mobile metric switcher should use BottomSheet semantics instead of drawer CSS overrides; chart placeholder should become a chart wrapper example. |
| Auth Form | Yes | Panel, Input, Button, Badge, CodeBlock, Icon | Good proof that auth can be assembled from existing seams. | Needs error/loading/SSO states; avoid raw inline controls. |
| Integration Card | Yes | Card, Button, Badge, Icon | Good marketplace/onboarding card reference without `PluginCard`. | Needs search/filter toolbar and state matrix: installed, syncing, needs auth, error, disabled. |
| Wizard Layout | Yes | Panel, Card, Button, Badge, CodeBlock, Drawer, Icon | Good onboarding reference; step indicator correctly remains recipe-only. | Needs error/skipped/review states and clearer mobile step navigation. |

## API drift found

### Badge variants

Several recipes were using legacy badge values such as `ok`, `cyan`, `warn`, and `ghost` while `MetralyBadge` exposes the canonical variants:

- `primary`
- `secondary`
- `success`
- `warning`
- `error`
- `info`

This makes stories unreliable as migration references because the code examples can drift away from the public API. The first safe cleanup is to align recipes to the actual `MetralyBadge` contract rather than expanding the badge API back to old aliases.

Decision: **do not add alias variants**. Fix recipes and docs to use canonical variants.

## Component merge candidates

These are areas where the brandbook can become stronger by reducing duplicate concepts, not by adding more components.

### 1. Badge / StateBadge

Current direction:

- `MetralyBadge` = static semantic label.
- `StateBadge` = operational/live state with optional indicator and pulse.

Potential merge: **do not merge implementation now**, but document the distinction more clearly.

Recommended rule:

- Use `MetralyBadge` for classification: `Beta`, `Elite`, `Available`, `Optional`, `Current step`.
- Use `StateBadge` for telemetry/system state: `Live`, `Healthy`, `Stale 4m`, `No data`, `Disconnected`, `Delayed`.

Do not add operational states to `MetralyBadge`; do not use `StateBadge` for generic marketing/category labels.

### 2. MetralyCard / MetralyMetricCard / MetralyPanel

Current direction:

- `MetralyPanel` = neutral surface and section container.
- `MetralyCard` = content/action card with icon, title, subtitle, body, footer, state.
- `MetralyMetricCard` = compact metric/stat surface with value-first hierarchy.

Potential merge: **do not merge public components**. Instead, normalize spacing, header slots, and state naming.

Recommended rule:

- Use `Panel` for layout regions and grouped controls.
- Use `Card` for selectable/actionable objects such as integrations, sources, templates.
- Use `MetricCard` for KPI/stat blocks only.

### 3. Drawer / BottomSheet

Current direction:

- `MetralyDrawer` = side navigation/context panel.
- `MetralyBottomSheet` = mobile utility tray / transient selection panel.

Potential merge: keep separate public components, but share internal overlay behavior.

Recommended improvement:

- Add a shared internal focus/scroll-lock helper.
- Use `Drawer` for navigation and large contextual panels.
- Use `BottomSheet` for mobile metric switchers, step pickers, filter trays, and quick actions.

### 4. NavigationTree / Sidebar / SegmentedControl

Current direction:

- `Sidebar` = shell navigation container.
- `NavigationTree` = nested hierarchical selection.
- `SegmentedControl` = small mutually exclusive mode/range selector.

Potential merge: no merge. They solve different interaction models.

Recommended improvement:

- Add recipes showing correct composition: sidebar + tree for desktop, bottom sheet + tree for mobile, segmented control for mode/range only.

### 5. Select / future FilterPill

Current direction:

- `MetralySelect` is enough for team/repository filters.
- A dedicated `FilterPill` is not justified yet.

Potential merge: defer `FilterPill`. Use select/button/badge composition first.

Recommended improvement:

- Add a filter-toolbar recipe before creating a new primitive.

## UX/UI improvement backlog

### P0 — reliability / API correctness

- Align all recipe badge variants to the real `MetralyBadge` API.
- Remove raw inline controls where a primitive exists, especially buttons and control-like chips.
- Add local verification: `npm run ui:check`, `npm run site:typecheck`, `npm run site:test`, `npm run build-storybook`, `npm run test:e2e`.

### P1 — mobile recipe quality

- Use `MetralyBottomSheet` for mobile utility trays instead of styling `MetralyDrawer` into a bottom sheet inside stories.
- Add focus trap, focus restore, and body scroll lock to shared overlay behavior.
- Ensure topbar actions collapse predictably on `mobile1` viewport.
- Avoid fixed filter widths that can overflow narrow mobile screens.

### P1 — product-state realism

Each recipe should demonstrate at least one non-happy path:

- loading
- empty
- error
- disabled / unavailable
- auth required
- syncing / stale

This makes recipes useful for real migration, not just screenshots.

### P2 — recipe polish

- Replace Metrics Explorer inline SVG placeholder with a canonical chart-card example.
- Add marketplace search/filter/sort toolbar to Integration Card Recipe.
- Add final review step to Wizard Layout Recipe.
- Add SSO vs workspace-local split to Auth Form Recipe.
- Add recipe notes explaining what stays product-side.

## Proposed next implementation phases

### Phase UX-1: Safe Storybook cleanup

Goal: make existing recipes compile against the public API and remove obvious primitive bypasses.

Allowed changes:

- Story files only.
- Docs only.
- No new public component exports.
- No visual redesign beyond API-aligned polish.

### Phase UX-2: Overlay behavior hardening

Goal: make `MetralyDrawer` and `MetralyBottomSheet` production-safe.

Allowed changes:

- Shared internal focus helper.
- Focus trap.
- Focus restore.
- Body scroll lock.
- Escape handling verification.
- Story examples for keyboard behavior.

### Phase UX-3: Migration-ready recipes

Goal: turn patterns from demos into canonical migration references.

Allowed changes:

- Add stateful variants to recipes.
- Add marketplace toolbar recipe.
- Add Metrics Explorer mobile filter/switcher with BottomSheet.
- Add wizard review/error states.
- Add auth loading/error/SSO states.

## Do not do yet

- Do not create `AuthCard`.
- Do not create `PluginCard` / `IntegrationCard` as public API.
- Do not create `MetricsExplorerScreen`.
- Do not create `WizardStepper` as public API.
- Do not create `FilterPill` until filter-toolbar recipe proves a reusable API shape.
- Do not merge `Card` and `MetricCard`; normalize their visual language instead.

## Definition of done for recipe quality

A recipe is migration-ready when it:

1. uses only exported public primitives;
2. does not bypass primitives with raw controls unless documenting a product-only exception;
3. has desktop, tablet, and mobile stories where relevant;
4. includes at least one non-happy state;
5. explains what remains product-side;
6. avoids story-only CSS hacks for real component behavior;
7. passes typecheck, Storybook build, and visual review on key viewports.
