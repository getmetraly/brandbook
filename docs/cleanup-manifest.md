# Repository Cleanup Manifest

Generated from `brandbook-main(2).zip`.

## Goal

Create a minimal brandbook repository that keeps only:

- `packages/ui` React/TypeScript source and CSS;
- package metadata required for the UI package;
- canonical Markdown files that describe the design system.

## Kept content

```text
README.md
package.json
packages/ui/package.json
packages/ui/tsconfig.json
packages/ui/src/**/*.ts
packages/ui/src/**/*.tsx
packages/ui/src/**/*.css
docs/source-of-truth.md
docs/design-principles.md
docs/component-contract.md
docs/component-design-recipes.md
docs/composition-patterns.md
docs/responsive-contract.md
docs/prototype-visual-spec.md
docs/style-contract.md
docs/cleanup-manifest.md
```

## Removed content categories

- `.tmp` visual parity artifacts and screenshots;
- Storybook stories and story-only helpers;
- `site` docs/showcase app;
- e2e and test harnesses;
- root Jest/Vitest/Playwright configs;
- package lock files;
- scripts and generated patch history;
- migration reports, phase notes, old audit backlogs, and temporary implementation documents;
- `packages/ui/assets` because current components inline their SVG/logo surfaces and the asset export was removed;
- `packages/ui/migration` because it is migration history, not current design system source.

## Counts

- Original files: 410
- Kept files in cleaned repo: 151
- Removed original files: 264

## Notes

This cleanup intentionally removes Storybook and site commands from the root package because those folders are no longer present in the minimal baseline.

Future Storybook/docs work should be reintroduced as a deliberate layer, not mixed with the package source baseline.
