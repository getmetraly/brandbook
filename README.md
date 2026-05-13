# Metraly Brandbook

This repository tracks the prototype-first rebuild of the Metraly brandbook.

## Canonical reference

`../docs/prototypes/brandbook/*` is the source of truth for tokens, layout, component states, and dashboard editor behavior.

## Repo layout

- `packages/ui` translates the prototype into production React primitives.
- `site` is a docs and showcase host for `@metraly/ui`.
- `stories` is the conformance harness for prototype states and scenarios.
- `docs/` contains the current working contract and migration notes.

## Validation

```bash
npm run ui:check
npm run site:typecheck
npm run site:test
npm run build-storybook
npm run test:e2e
```

`npm run check` covers the core package and site type/test pass.
