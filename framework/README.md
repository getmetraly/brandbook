# Metraly UI Framework

The **Metraly UI Framework** is a unified collection of React and TypeScript components, design tokens and utilities that power the Metraly product app, marketing website and documentation.  It exists to ensure consistency, reduce duplication and accelerate feature development.

## Why a framework?

During the research phase we discovered that multiple repositories (`metraly`, `website`, and the new `brandbook`) currently define their own components and styles.  Duplication makes maintenance difficult and increases the risk of visual drift.  A unified framework solves this by providing:

* **One source of truth** for colours, typography, spacing and motion via the token system defined in the design system.
* **Reusable components** for charts, cards, tables, navigation and interactive controls.
* **Standardised layouts** such as dashboards, wizards and plugin screens.
* **Tooling and documentation** (e.g. Storybook) to demonstrate component usage and encourage contribution.

## Scope

The framework resides in its own package (e.g. `@metraly/ui`).  It exposes:

- **Core tokens**: colour, typography, spacing, shadows, motion.  Defined in CSS variables and exported as TypeScript constants.
- **Base components**: buttons, badges, input fields, cards, layout containers.  These are styled primitives built on top of tokens.
- **Composite components**: charts (AreaChart, BarChart, Gauge, Heatmap, Sparkline), data tables, dashboards and panels built from base components.
- **Icon library**: an internal library of SVG paths mapped to semantic names (see `Icon.tsx`), with optional wrappers for Font Awesome.
- **Utilities**: helpers for responsive grid layouts, ARIA hooks for accessibility and testing utilities.
  In future iterations, the framework will also expose **locale helpers** to simplify internationalisation (e.g. wrappers around `Intl` APIs and a language selector component).

## Usage

1. **Install** the package into the product app, website or docs: `npm install @metraly/ui`.
2. **Wrap** your application in the `ThemeProvider` to load tokens for dark and light themes.
3. **Import** components from the framework rather than redefining them locally.  For example:

```tsx
import { Card, AreaChart } from '@metraly/ui';

export function ExampleWidget({ data }) {
  return (
    <Card title="Build duration">
      <AreaChart data={data} color="primary" />
    </Card>
  );
}
```

4. **Extend** components via composition rather than overriding internal styles.  If a component is missing a feature, open an issue or contribute a new variation.

## Contribution and governance

All code in the framework follows the licensing guidelines specified in `AGENTS.md` (AGPLv3 header) and the development practices described there.  To contribute:

1. Work in a local Git worktree as per the instructions【849328462375381†L4-L16】 and ensure you read the status and architecture documents in the `docs` repository when available.  Treat them as the source of truth for planning【849328462375381†L25-L30】.
2. Write unit tests alongside implementation files and run `make test` before submitting a pull request【849328462375381†L60-L65】.
3. Follow the UI design notes (card selection patterns, hover behaviour, wizard screens) when introducing new interactive patterns【849328462375381†L71-L85】.
4. Add new icons to the icon registry rather than embedding SVG paths inline.
5. Update the brandbook documentation and Storybook with examples of new components.

By centralising our UI toolkit, we can ensure that all parts of the Metraly ecosystem speak a common visual language and evolve together.

---

## Current design status

This document should be interpreted together with `brandbook/current-design-state.md` and `AGENTS.md`. The current accepted direction is the grouped preview hardening design: dark engineering dashboard UI, cyan telemetry signal, restrained pulse-wave usage, stable interactions, protected `/components` baseline and grouped preview pages as the canonical surface.
