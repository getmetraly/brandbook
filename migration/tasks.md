# Migration tasks checklist

To operationalise the migration roadmap, break the work down into actionable tasks.  This checklist can be tracked in the issue tracker and updated as tasks are completed.

## Brandbook creation

- [ ] Finalise brand philosophy and tone of voice (see `philosophy.md`).
- [ ] Approve logo variations and export assets in SVG and PNG formats.
- [ ] Define primary, secondary and tertiary colour palettes; document usage rules.
- [ ] Select and licence typography (Inter, Space Grotesk/Geist, JetBrains Mono).  Create font stacks and fallback definitions.
- [ ] Compile icon library: audit current icons, design missing ones, standardise names.
- [ ] Write motion guidelines and specify animation tokens.
- [ ] Publish brandbook to the documentation site.

## Design system & framework setup

- [ ] Create the `@metraly/ui` repository/package with a clean project scaffold (TypeScript, Jest, Storybook).
- [ ] Implement token system and export CSS variables and TypeScript constants.
- [ ] Build base components: Button, Card, Badge, Input, Icon, Grid.
- [ ] Port existing chart components to the framework; refactor to use shared primitives.
- [ ] Implement the dashboard grid and widget registry.
- [ ] Create shell components (top bar, sidebar, wizard screens, plugin screens).
- [ ] Build responsive utilities and hooks (breakpoints, layout helpers).
- [ ] Set up automated tests and CI pipeline (unit, visual, accessibility).
- [ ] Document all components in Storybook with usage examples.

## Application migration

- [ ] Replace product app’s local tokens with framework tokens.  Remove unused colours from old stylesheets.
- [ ] Swap existing buttons, badges and cards with the framework primitives.  Address layout adjustments as needed.
- [ ] Integrate the `ThemeProvider` to support dark and light modes.
- [ ] Migrate each dashboard to use the framework’s dashboard grid and chart components.
- [ ] Refactor forms and settings pages to use framework inputs and modals.
- [ ] Update plugin pages to extend from the new plugin screen template.
- [ ] Replace marketing site hero components and cards with framework versions.  Preserve unique marketing patterns (e.g. gradients) by passing custom props or using CSS overrides.
- [ ] Build the documentation site using framework components; include code examples and live previews.

## Internationalisation

To support a multilingual audience, additional tasks are required:

- [ ] **Set up i18n infrastructure**: Integrate a translation library (e.g. i18next) into the product app, website and documentation.  Define a default locale and initial set of languages.
- [ ] **Create translation keys**: Replace hard‑coded UI strings with keyed messages in translation files.  Organise keys by domain (dashboards, charts, navigation, etc.).
- [ ] **Implement locale switching**: Build a language selector component and persist user preference.  Ensure directionality (LTR/RTL) is applied automatically.
- [ ] **Test layouts across locales**: Audit screens in at least two languages (one LTR and one RTL) to catch overflow, wrapping and alignment issues.  Adjust components to use CSS logical properties where necessary.
- [ ] **Localise dates, numbers and units**: Use the Intl API or i18n helpers to format dates, times, currencies and numbers according to the active locale.
- [ ] **Update documentation**: Document i18n guidelines in the design system and include examples of localisation hooks in Storybook.

## Verification

- [ ] Conduct performance profiling and ensure that the new framework does not regress load times.
- [ ] Run accessibility audits across all migrated pages.
- [ ] Gather user feedback via surveys or user tests and refine components based on insights.

This checklist is intentionally high‑level; each task may be broken down into smaller issues.  Use the labels and date naming conventions described in `AGENTS.md`【849328462375381†L32-L37】 for tracking progress.

---

## Current design status

This document should be interpreted together with `brandbook/current-design-state.md` and `AGENTS.md`. The current accepted direction is the phase-13 `/draft` design: dark engineering dashboard UI, cyan telemetry signal, restrained pulse-wave usage, stable interactions, protected `/components` baseline and `/draft` as the active hardening lab.
