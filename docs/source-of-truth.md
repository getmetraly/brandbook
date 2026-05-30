# Source of Truth

`packages/ui` is the canonical implementation of the Metraly framework UI.

Claude Design and prototype files may be used as visual references, but the source of truth in this cleaned repository is:

```text
packages/ui/src
packages/ui/src/styles/metraly-ui.css
```

## Repository scope

This cleaned repository contains only:

- reusable React components and TypeScript helpers in `packages/ui/src`;
- CSS files in `packages/ui/src/styles`;
- package metadata needed to type-check and consume `@metraly/ui`;
- canonical Markdown documents describing the design system.

It intentionally excludes Storybook, site, e2e tests, visual parity artifacts, migration history, temporary patches, and old implementation reports.

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

Storybook and visual tests should live outside this cleaned baseline or be reintroduced later as a deliberate docs/demo layer.
