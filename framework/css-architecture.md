# CSS architecture

To support theming and maintainability at scale, the Metraly UI Framework adopts a modular CSS architecture based on **CSS custom properties** and composition.  This document outlines the recommended practices.

## Custom properties and global themes

Use CSS custom properties (variables) to define all design tokens—colours, spacing, radius, shadows and motion.  In `globals.css` the dark and light themes set base variables on the `:root` selector【913460924002922†L6-L21】【913460924002922†L24-L36】.  The framework should expose a `ThemeProvider` component that injects these variables into the DOM and switches between themes according to user preference.

Avoid hard‑coding values in component styles.  Instead, reference tokens:

```css
.button {
  color: var(--text-primary);
  background-color: var(--color-primary);
  border-radius: var(--radius-md);
  padding: var(--space-sm) var(--space-md);
}
```

If additional themes are introduced (e.g. high contrast), define another root context with the same token names but different values.  Components will automatically inherit the new theme.

## Scoped styles and modules

Use **CSS Modules** or **[CSS‑in‑JS](https://cssinjs.org)** (e.g. styled‑components, vanilla‑extract) to scope component styles.  Avoid adding arbitrary global selectors that could leak into other parts of the application.  Each component’s styles should live next to its implementation file for discoverability.

When naming classes, prefer functional names (e.g. `.badge`, `.card`) over purely presentational names (e.g. `.blueBox`).  Keep class names in lowercase with hyphens.  BEM notation (`.card__header`, `.card--selected`) is acceptable for complex components.

## Composition over overrides

Compose styles from primitives instead of overriding high specificity styles.  For example, build a `PrimaryButton` component that composes the base `Button` component and passes a prop to set `color="primary"`.  Avoid writing `.button.primary { ... }` overrides in CSS—this leads to specificity wars.

## Responsive utilities

Provide utility classes or mixins for responsive behaviour.  Examples include `.hidden-md-up`, `.hidden-sm-down`, `.grid‑12` or hooks like `useBreakpoint()`.  Utilities should adjust layout, spacing and typography based on breakpoints defined in the token system.

## Organising files

Within the framework repository:

* `tokens/` — defines global variables and exports TypeScript constants.
* `base/` — contains primitive components (button, input, card, etc.) and their styles.
* `components/` — composite components built from primitives (charts, dashboard widgets).
* `icons/` — stores SVG files or path definitions for custom icons.
* `utilities/` — responsive hooks, ARIA helpers, and testing utilities.

Documenting and enforcing this architecture helps reduce cognitive load for contributors and prevents style regressions.

---

## Current design status

This document should be interpreted together with `brandbook/current-design-state.md` and `AGENTS.md`. The current accepted direction is the grouped preview hardening design: dark engineering dashboard UI, cyan telemetry signal, restrained pulse-wave usage, stable interactions, protected `/components` baseline and grouped preview pages as the canonical surface.
