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

## Verification

- [ ] Conduct performance profiling and ensure that the new framework does not regress load times.
- [ ] Run accessibility audits across all migrated pages.
- [ ] Gather user feedback via surveys or user tests and refine components based on insights.

This checklist is intentionally high‑level; each task may be broken down into smaller issues.  Use the labels and date naming conventions described in `AGENTS.md`【849328462375381†L32-L37】 for tracking progress.
