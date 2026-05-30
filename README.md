# Metraly Brandbook

Minimal source for the Metraly framework UI package.

This repository intentionally keeps only:

- `packages/ui` source files: React components, TypeScript helpers, and CSS;
- canonical Markdown documents that describe the design system contract.

Removed from this cleaned baseline:

- Storybook host and stories;
- site/docs application;
- e2e and test harnesses;
- temporary visual parity artifacts;
- migration reports, audit backlog, old phase notes, and generated patch history.

## Package

The production package lives in:

```text
packages/ui
```

Public CSS entrypoint:

```text
packages/ui/src/styles/metraly-ui.css
```

Type check:

```bash
npm install
npm run ui:check
```

## Design system rules

- Active classes use `metraly-*`.
- Design tokens use `--m-*`.
- `packages/ui/src/styles/metraly-ui.css` is the single public CSS entrypoint.
- Components should be improved in-place before adding parallel AppKit-only implementations.
- AppKit screens are composition examples built from canonical primitives.
