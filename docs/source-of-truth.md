# Source of Truth

`packages/ui` is the canonical implementation of the Metraly framework UI.

Claude Design and prototype files may be used as visual references, but the source of truth in this cleaned repository is:

```text
packages/ui/src
packages/ui/src/styles/metraly-ui.css
packages/ui/src/styles/metraly-theme.css
packages/ui/src/styles/metraly-fonts.css
packages/ui/src/fonts/*.woff2
```

## Repository scope

This cleaned repository contains only:

- reusable React components and TypeScript helpers in `packages/ui/src`;
- CSS files in `packages/ui/src/styles`;
- package metadata needed to type-check and consume `@metraly/ui`;
- canonical Markdown documents describing the design system;
- `storybook/` as a separate validation layer that consumes `@metraly/ui` without redefining component styles.

It intentionally excludes site apps, e2e test results, visual parity artifacts, migration history, temporary patches, and old implementation reports. `storybook-static/` is generated output and must not be hand-edited.

## Package roles

- `components` — base primitives and reusable UI controls.
- `shell` — application frame, sidebar, topbar, overlays.
- `dashboard` — dashboard/editor primitives.
- `charts` — chart wrappers and chart-specific UI.
- `source` — data/source connection primitives.
- `settings` — settings/provider primitives.
- `app-kit` — product-level compositions built from canonical primitives.
- `styles` — design tokens and component CSS.

## Validation

The minimal validation command is:

```bash
npm run ui:check
```

Storybook is present as a deliberate docs/demo validation layer. It must load the public `metraly-ui.css` entrypoint, use canonical tokens only, and keep story layout helpers separate from production components.
