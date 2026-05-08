# Storybook Version Hygiene

## Problem

`npm install` failed because `@storybook/addon-essentials@^9.1.5` was requested, but the active npm registry does not provide that version.

## Decision

Use Storybook 10 for compatibility with Next.js 16 and remove `@storybook/addon-essentials`, because the active npm registry does not provide `@storybook/addon-essentials@9.1.5` or a matching Storybook 10 variant.

Pinned packages:

- `storybook@10.0.8`
- `@storybook/nextjs@10.0.8`
- `@storybook/react@10.0.8`
- `webpack@^5.106.2`

This avoids the mixed Storybook 9 / missing addon dependency state and keeps the docs preview system installable with Next.js 16.

## Added

- `site/.storybook/main.ts`
- `site/.storybook/preview.ts`

Storybook now reads stories from the root `stories/` directory and imports the same Metraly UI styles as the Next.js site.

## Validation notes

After extracting the bundle locally, run:

```bash
npm run clean:install
npm install --no-audit --no-fund
npm --prefix site run storybook
```

Then continue with:

```bash
npm run ui:check
npm run site:typecheck
npm run site:test
npm run site:build
```

## Registry validation

The package versions were checked against npm before packaging:

- `storybook@10.0.8` exists.
- `@storybook/nextjs@10.0.8` exists and supports `next@^16.0.0`.
- `@storybook/react@10.0.8` exists and supports `react@^19.0.0`.
- `@storybook/addon-essentials` is intentionally not installed.

The sandbox package-lock generation timed out due to dependency resolution time, so the final local validation should still be run on the developer machine.
