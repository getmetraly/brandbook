# Adoption plan for the unified UI framework

Migrating to a unified UI framework is a multi‑phase endeavour that touches all parts of the Metraly ecosystem.  This plan outlines the sequence of activities required to adopt the framework with minimal disruption to development velocity.

## Phase 1 – Inventory and audit

1. **Catalogue components**: Complete the component inventory for the product app, marketing site and documentation.  Identify duplicates and variations.
2. **Extract tokens**: Assemble the colour, typography, spacing and motion tokens into a central definition (see `tokens.md`).  Build dark and light theme objects.
3. **Assess technical debt**: Record components that rely on inline styles or unstructured CSS.  Evaluate them for refactoring versus replacement.

## Phase 2 – Build the core

1. **Set up repository**: Create a new package (`@metraly/ui`) and configure tooling (TypeScript, ESLint, Jest, Storybook).
2. **Implement tokens**: Export tokens as CSS custom properties and TypeScript constants.  Provide a `ThemeProvider` to swap themes.
3. **Primitives**: Implement base components (Button, Badge, Card, Input, Icon, Grid) referencing the token system.  Document them in Storybook.
4. **Utilities**: Provide responsive hooks, ARIA helpers and test utilities.

## Phase 3 – Migrate composite components

1. **Charts**: Refactor the existing chart components to use shared primitives for axes, legends and tooltips.  Migrate them into the framework and ensure they are theme‑aware.
2. **Tables and lists**: Build a generic Table component with sortable, filterable and paginated capabilities.  Replace ad‑hoc tables in the product app.
3. **Dashboard**: Implement a generic `DashboardGrid` and registry mechanism in the framework.  Update the app to consume it.
4. **Layouts**: Create shell components for the top bar, sidebar, wizards and plugin screens.  Replace local implementations.

## Phase 4 – Integrate into projects

1. **Product app**: Gradually swap local components for framework counterparts.  Start with shared primitives (buttons, cards) and progress to charts and dashboards.  Use feature flags to toggle between old and new components during migration.
2. **Marketing site**: Replace hero components, cards and forms with framework primitives.  Adjust styling to account for marketing‑specific flourishes while reusing tokens.
3. **Documentation**: Build the docs using the framework’s components, including callouts, code blocks and navigation.

## Phase 5 – Verification and deprecation

1. **Visual regression**: Run automated visual regression tests to detect unintended changes.  Compare against baseline screenshots for each page.
2. **Accessibility audit**: Use tools (e.g. axe, Lighthouse) to ensure that migrated screens meet WCAG 2.1 AA criteria.
3. **Performance benchmark**: Measure bundle sizes and render times.  Optimise code splitting and tree shaking.
4. **Deprecate old code**: Remove or mark deprecated components.  Document migration guidelines for plugin authors.

## Continuous improvement

After completing the initial migration, the UI framework will become a living project.  Ongoing tasks include:

- Maintaining the token system and adding new semantic roles as needed.
- Adding new components and variations based on product requirements.
- Updating the brandbook when visual guidelines evolve.
- Gathering feedback from developers and users to refine the design system.

---

## Current design status

This document should be interpreted together with `brandbook/current-design-state.md` and `AGENTS.md`. The current accepted direction is the phase-13 `/draft` design: dark engineering dashboard UI, cyan telemetry signal, restrained pulse-wave usage, stable interactions, protected `/components` baseline and `/draft` as the active hardening lab.
