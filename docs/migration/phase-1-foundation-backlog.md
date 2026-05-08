# Phase 1 Foundation Backlog

## Purpose

Turn the foundation phase of the migration plan into concrete backlog items. This phase should stabilize the shared visual language and the lowest-level primitives before any broader component migration begins.

## Phase Goal

Make tokens, primitive APIs and theme behavior stable enough to serve as the reusable base for both the website and the product app.

## Scope

### In Scope

- Brandbook token definitions and documentation.
- Core primitive components in `@metraly/ui`.
- Theme and color-system behavior.
- Primitive-level tests and documentation updates.
- Dependency pinning decisions that affect the base layer.

### Out of Scope

- No dashboard editor refactors beyond primitive support.
- No app-shell or marketing-shell rewrite.
- No direct changes to `../app` or `../website`.
- No chart wrapper expansion beyond documenting the base contract.

## Backlog Items

### 1.1 Pin the Canonical Token Set

- Review the current color, spacing, typography, radius, shadow and motion tokens in `brandbook`.
- Decide which token names are canonical and which are legacy compatibility aliases.
- Update the token documentation so every exported token has a short semantic description.
- Record which tokens are safe for app and website reuse and which should remain brandbook-specific.

### 1.2 Stabilize Theme Behavior

- Confirm the theme model used by the brandbook site and `@metraly/ui`.
- Document how dark mode is represented and whether light mode remains a supported path.
- Verify that theme switching does not introduce layout shift or hydration issues.
- Capture any theme-specific constraints needed by cards, badges, tables and shell components.

### 1.3 Freeze the Core Primitive Set

- Confirm the baseline primitives that should remain stable across repositories:
  - `MetralyCard`
  - `MetralyPanel`
  - `MetralyLogo`
  - `MetralyBadge`
  - `StateBadge`
  - `MetralyMetricCard`
  - `DashboardWidget` as the canonical widget frame
  - `MetralyTable`
- Review whether any primitive needs a smaller or more explicit API surface.
- Remove or flag one-off styling that does not belong in the base layer.

### 1.4 Document Primitive Usage Rules

- Update the design-system docs with the intended usage of each primitive.
- Document when a page should use a primitive directly versus a composite wrapper.
- Add notes for cursor, hover, focus-visible and disabled behavior.
- Clarify which primitives are acceptable in marketing contexts and which are dashboard-only.

### 1.5 Harden Primitive State Coverage

- Ensure primitive tests cover default, hover, focus-visible, selected, disabled, loading and error states where relevant.
- Add tests for role and label semantics on any interactive primitive.
- Verify that selected/active states use the intended cyan accent and do not jump vertically on hover.

### 1.6 Lock the Package Boundary

- Verify that the brandbook site imports primitives from `@metraly/ui` where intended.
- Identify any source-path imports that should eventually be replaced with package imports.
- Confirm that the `@metraly/ui` export surface matches the canonical documentation.
- Record any package exports that should be added later but are not required for this phase.

### 1.7 Pin High-Risk Dependencies

- Pin `recharts` in brandbook before chart wrapper work grows further.
- Keep `react-grid-layout` adapter logic isolated and documented.
- Record any future version alignment work needed between React 19 in brandbook/website and React 18 in the app repo.

## Required Tests

- token and primitive unit/component tests.
- primitive state tests for hover, focus, selected, disabled and error cases.
- theme behavior tests if theme switching is part of the implementation path.
- typecheck and build verification for `site` and `packages/ui`.
- visual checks for card, badge, table and widget shell density.

## Deliverables

- Canonical token inventory.
- Primitive API summary.
- Theme behavior notes.
- Documentation updates for token and primitive usage.
- Dependency pinning decisions for the base layer.

## Acceptance Criteria

- Tokens and primitive APIs are stable enough to be reused by both the website and the app without ad hoc CSS copy-paste.
- The brandbook docs explain how and when the base primitives should be used.
- The current base primitives have explicit state coverage and accessible semantics.
- Package boundaries are clear enough that future migration phases can rely on them.
- Any dependency risk that could destabilize the foundation layer is documented and bounded.

## Risks

- Over-abstracting the base layer can make later component migration harder.
- Leaving floating dependencies at the foundation layer increases the cost of every downstream phase.
- If token names remain ambiguous, the website and app may drift in interpretation even if they share the same CSS values.
