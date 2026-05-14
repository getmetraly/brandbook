# Source of Truth

`../docs/prototypes/brandbook/*` is the canonical visual and behavioral reference for the Metraly brandbook rebuild.

## Working boundaries

- This repository is the only codebase to modify for the rebuild.
- `../docs` is read-only.
- `../website` and `../metraly` are read-only.

## Repo roles

- `packages/ui` contains the production React primitives translated from the prototype.
- `site` is a clean docs and showcase host for `@metraly/ui`.
- `stories` is the conformance harness for prototype states and scenarios.
- Markdown docs in this repo describe the current contract only.

## Validation

Run the repo checks from the root:

```bash
npm run ui:check
npm run site:typecheck
npm run site:test
npm run build-storybook
npm run test:e2e
```

Use `npm run check` when you want the core type and test pass for `packages/ui` and `site`.
