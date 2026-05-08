# Migration & Adoption Plan for the Unified Metraly UI Framework

This plan outlines how to adopt the unified UI framework across the Metraly product app, marketing website and documentation with minimal disruption.  It builds on the existing adoption plan document while incorporating new insights from the research and architecture review.

## Phase 1 – Foundation and Planning

1. **Complete component and layout inventory:** Finish cataloguing all components and layouts across the product, website and docs.  Use the component audit to identify duplicates and prioritise what to migrate first.
2. **Finalize token definitions:** Consolidate colour, typography, spacing, radii, shadow and motion tokens into a single source of truth using Style Dictionary.  Establish alias and component‑level tokens【766331026675180†L258-L290】.
3. **Set up repositories:** Create or update the `@metraly/ui` package within a monorepo (e.g. Turborepo/NX).  Configure tooling (TypeScript, ESLint, Prettier, Storybook, Jest) and CI pipelines.
4. **Define migration KPIs:** Agree on metrics (e.g. percentage of pages using new primitives, number of deprecated components removed, performance and accessibility scores) to measure adoption progress.

## Phase 2 – Building the Core Library

1. **Implement tokens and theme provider:** Generate CSS variables and TypeScript constants for tokens.  Develop a `ThemeProvider` that applies dark, light and high‑contrast themes and allows runtime accent colour changes.
2. **Build primitive components:** Create unstyled but tokenised primitives (Box, Stack, Text, Button, Input, Checkbox, Card, Table, Icon).  Ensure they are accessible by default and support RTL and reduced motion.
3. **Develop utilities:** Add responsive hooks, ARIA helpers, state management hooks (Zustand slices) and i18n utilities.  Provide a `LanguageSelector` component to switch locales.【849328462375381†L73-L79】
4. **Set up Storybook:** Document tokens, primitives and initial guidelines.  Use Chromatic or Percy for visual regression testing and integrate accessibility tests using `axe-core`.
5. **Publish early alpha:** Release an alpha version of `@metraly/ui` for internal evaluation.  Solicit feedback from engineers and designers and iterate.

## Phase 3 – Migrating Composite Components

1. **Refactor charts:** Build wrappers around Recharts (MetralyAreaChart, MetralyBarChart, etc.) that consume tokenised colours, axes and tooltips【344032000343319†L203-L221】.  Replace bespoke chart components gradually.
2. **Create layout templates:** Develop `AppShell`, `DashboardLayout`, `WizardLayout` and `PluginLayout`.  Ensure they handle responsive collapse, density adjustments and RTL.
3. **Implement DashboardGrid:** Encapsulate React Grid Layout with edit mode controls, drag handles and drop targets.  Persist user layouts and support feature flags for migration.
4. **Unify cards and tables:** Build `InsightCard` and `MetralyTable` components.  Refactor AIInsightCard, InlineInsight, StatCard, Leaderboard and DataTable to use these primitives.
5. **Telemetry primitives:** Implement the micro telemetry indicators (select, accordion, live badge, sync state, drag indicator, divider) with motion tokens and minimal animation【655436002110531†L62-L85】.
6. **Develop plugin API:** Expose a registry for widgets, tables and charts.  Provide sample plugins demonstrating how to register and render new components.

## Phase 4 – Integrating into Projects

### Product App

1. **Enable feature flags:** Allow toggling between old and new components to test the new framework incrementally.  Start with low‑risk surfaces like internal admin dashboards.
2. **Migrate primitives:** Replace existing buttons, cards, tables, forms and icons with their framework counterparts.  Address any visual regressions or functional gaps.
3. **Update dashboard components:** Swap DashboardRenderer and DraggableDashboardRenderer for the new DashboardGrid.  Adapt the widget registry accordingly.
4. **Refactor pages:** Use layout templates (AppShell, WizardLayout) to rebuild pages with unified structure and responsiveness.
5. **Test and iterate:** Run unit, integration, visual and accessibility tests.  Collect user feedback and fix issues.

### Marketing Site

1. **Adopt tokens and primitives:** Replace marketing site components with framework primitives, adjusting styling as needed for marketing flair (e.g. larger imagery, different accent colours).
2. **Integrate i18n:** Use the framework’s i18n utilities to translate marketing content and implement a global language selector.
3. **Align motion:** Use the framework’s motion tokens for hero animations and interactive components, ensuring they are subtle and optional.

### Documentation

1. **Rebuild docs using the framework:** Use components like Card, Alert, Tabs and Table for the docs UI.  Ensure code snippets use the monospaced font and tokens.
2. **Embed interactive examples:** Leverage Storybook or MDX components to embed live examples of the framework in the documentation.
3. **Synchronise with design system:** Link documentation to the corresponding brandbook and design system guidelines.  Include migration guides for plugin developers.

## Phase 5 – Verification and Deprecation

1. **Visual regression and accessibility audits:** Run automated tests (Chromatic/Percy, `axe-core`) to ensure that migrated pages match the previous design or improve upon it in colour contrast and accessibility.【344032000343319†L203-L221】
2. **Performance benchmarking:** Measure bundle sizes, load times and runtime performance.  Optimise code splitting and lazy loading where necessary.
3. **Deprecate legacy components:** Once a component or page has been migrated, mark the old implementation as deprecated.  Remove deprecated code in subsequent releases and update references.
4. **Communicate changes:** Inform internal teams and plugin developers about migration milestones, breaking changes and new features via release notes and changelogs.

## Continuous Improvement

The migration does not end with the last deprecation.  Ongoing tasks include:

* Adding new tokens, components and utilities as product requirements evolve.
* Collecting feedback from designers, developers and users to refine the framework.
* Keeping up with accessibility standards, browser support and tooling improvements.
* Updating the brandbook and documentation whenever the design system evolves.

By following this phased migration plan, Metraly can adopt the unified UI framework methodically, mitigating risk while achieving consistency, accessibility and performance improvements across all user experiences.

---

## Current design status

This document should be interpreted together with `brandbook/current-design-state.md` and `AGENTS.md`. The current accepted direction is the grouped preview hardening design: dark engineering dashboard UI, cyan telemetry signal, restrained pulse-wave usage, stable interactions, protected `/components` baseline and grouped preview pages as the canonical surface.
