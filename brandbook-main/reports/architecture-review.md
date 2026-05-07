# Architecture Review & Improvement Proposals for the Metraly UI Framework

This document reviews the current architecture of the Metraly UI framework and proposes improvements to support scalability, accessibility and maintainability across the product app, marketing site and documentation.  It synthesises insights from existing framework documents, the research report and best‑practice guidelines.

## 1. Current Architecture Overview

The Metraly design system consists of:

* **Design tokens** defined in CSS variables (`globals.css`) for colours, spacing, radii, typography, shadows and motion【913460924002922†L6-L36】.  These tokens underpin both dark and light themes and are exported via TypeScript constants.
* **Component inventory** scattered across the product app (`ui/src/components`) and website, with duplication of cards, charts and layout containers【632635575803481†L24-L47】.
* **Icons** stored centrally in a `Icon` component with about 40 SVG paths【632635575803481†L24-L47】.
* **Motion guidelines** defined in design system documents, but not fully integrated into components【655436002110531†L62-L85】.
* **CSS architecture** using custom properties and CSS modules【913460924002922†L6-L36】, but with some inline styles and ad‑hoc overrides.
* **Testing strategy** specifying unit, snapshot, accessibility and integration tests, but not uniformly adopted across components【849328462375381†L60-L65】.

The framework aims to package these into a reusable library (`@metraly/ui`) with tokens, base components, composite components, icons and utilities【849328462375381†L4-L16】.  However, some gaps remain:

* No clear separation between design tokens and semantic tokens (global vs. alias vs. component‑specific)【766331026675180†L258-L290】.
* Duplicated UI patterns (multiple card variants, bespoke chart implementations)【632635575803481†L24-L47】.
* Lack of unified layout templates for dashboards, wizards and plugin screens【632635575803481†L24-L47】.
* Inconsistent state management and form patterns across components.
* Limited i18n support and no built‑in language selector.
* Motion guidelines not formalised into tokens or utilities.

## 2. Improvement Proposals

### 2.1 Token System Refinement

* **Adopt a three‑tier token hierarchy**: global tokens (raw values), alias tokens (semantic roles such as primary, success, error) and component‑specific tokens【766331026675180†L258-L290】.  This enables theming by remapping alias values without renaming tokens.
* **Centralise token definitions** using a tool like Style Dictionary.  Generate CSS variables, TypeScript constants and JSON for design tools from a single source of truth.  Enforce naming conventions through linting.
* **Support theme switching** via a `ThemeProvider` that toggles between dark, light and high‑contrast modes and sets root variables accordingly.  Provide APIs for custom accent colours.
* **Create motion tokens** (durations, easing curves, transforms) and integrate them into animation utilities to ensure consistent timing across interactions【33027700081329†L152-L166】.

### 2.2 Layered Component Architecture

* **Primitives layer:** base components (Box, Stack, Text, Button, Input, Checkbox, Card, Table, Icon) that only encapsulate styling and basic behaviour.  All primitives should be accessible out of the box and consume tokens via CSS variables.
* **Composites layer:** higher‑level components built from primitives (InsightCard, DashboardGrid, WizardScreen, PluginScreen, TelemetryIndicator).  These should expose a limited API and accept slots/props for content and actions.
* **Layouts layer:** page templates like AppShell, DashboardLayout, WizardLayout and PluginLayout.  These provide common structural scaffolding (top bar, sidebar, content area) and handle responsiveness and breakpoints.
* **Hooks and utilities:** responsive hooks (`useBreakpoint`), ARIA helpers (`useFocusRing`, `useDragHandle`), state management hooks (`useZustandSlice`) and i18n helpers (`useLocale`, `t`).

This layered approach promotes composition over inheritance and ensures that primitives remain unopinionated while composites enforce design patterns.

### 2.3 Unified State Management and Context

* **Zustand slices:** Consolidate state into modular slices (theme, layout, user preferences, telemetry settings) rather than a monolithic store.  Use `useShallow` to prevent unnecessary re‑renders and memoise selectors【368704142465245†L46-L155】.
* **Drag‑and‑drop context:** Provide a context provider that encapsulates `dnd-kit` sensors, keyboard announcements and collision strategies.  This prevents duplication of DnD logic across components and ensures accessibility【23584703095371†L78-L180】.
* **Preferences and persistence:** Centralise user preferences (density, sidebar collapse, language) in a context that persists to local storage with JSON schema validation.

### 2.4 Internationalisation and Localization

* **Integrate an i18n library** (e.g. i18next) at the framework level, exposing a `LocaleProvider` and translation utilities.  All components must accept text via props or translation keys.
* **Provide a `LanguageSelector` component** that updates the active locale and persists the choice.
* **Use CSS logical properties** to support RTL layouts out of the box【849328462375381†L73-L79】.  Test components in both LTR and RTL directions.

### 2.5 Accessibility Enhancements

* **Default focus styles:** Create a focus ring utility that can be applied consistently across primitives.  Use the `focus-visible` pseudo‑class to show focus only when navigating via keyboard.
* **Keyboard interactions:** Provide built‑in keyboard operations for drag‑and‑drop (Enter/Space to pick up/drop, arrow keys to move) and use ARIA live regions for announcements【888601493971794†L223-L233】.
* **Reduced motion support:** Detect `prefers-reduced-motion` and disable non‑essential animations; provide alternatives like cross‑fades or instantaneous transitions【655436002110531†L62-L85】.
* **ARIA roles and semantics:** Use proper semantics (e.g. `role="table"` on table components, `role="region"` on panels) and descriptive `aria-label`s.

### 2.6 CSS Architecture and Styling

* **Enforce CSS Modules or vanilla‑extract** to scope styles locally.  Avoid global overrides and specificity wars.  Use BEM naming or token‑based class names.
* **Offer a theming API:** Provide hooks and context to read tokens in JavaScript and to extend themes.  Document how to create custom themes or overrides for different brands.
* **Responsive design:** Supply utilities and tokens for breakpoints.  Ensure layouts adapt across devices and support user‑configured density settings (compact, default, comfortable) by scaling spacing tokens【913460924002922†L6-L21】.

### 2.7 Build & Tooling Improvements

* **Storybook integration:** Use Storybook as the documentation site for the framework.  Align its visual style with the brandbook.  Add Chromatic or Percy for visual regression testing.
* **CI/CD pipeline:** Implement linting, testing and build steps in CI.  Run accessibility checks using `axe-core` or `jest-axe` on Storybook stories.  Generate typed documentation from JSDoc/TSDoc comments.
* **Versioning and release management:** Adopt Semantic Versioning (SemVer) for the `@metraly/ui` package.  Use changesets to manage releases and generate changelogs automatically.
* **Monorepo support:** Consider using a monorepo tool (e.g. Turborepo or NX) to manage packages for the UI framework, website and docs.  This facilitates shared tooling and incremental builds.

### 2.8 Migration Strategy

* **Wrap existing components:** Provide compatibility wrappers that map old component APIs to new primitives.  This allows gradual migration without blocking feature development.
* **Opt‑in migration:** Use feature flags to toggle between old and new components.  Convert one feature at a time, starting with internal dashboards where risk is lower.
* **Deprecation policy:** Mark old components as deprecated in documentation and code comments.  Provide clear migration guides for plugin developers and third‑party contributors.
* **Training and adoption:** Offer internal workshops or documentation to onboard engineers and designers to the new framework.  Provide Figma component libraries and code samples.

## 3. Expected Outcomes

Implementing these improvements will:

* **Reduce duplication and maintenance costs** by unifying tokens, primitives and composites.
* **Improve accessibility and usability** through consistent focus management, keyboard support and reduced motion options.
* **Enhance scalability** by adopting a layered architecture and modular state management.
* **Accelerate feature development** by providing ready‑made layouts, charts, tables and icons.
* **Strengthen brand coherence** across the product, marketing site and documentation by adhering to tokens and design guidelines.

These proposals lay the foundation for a sustainable design system that evolves with Metraly’s product roadmap and user needs.