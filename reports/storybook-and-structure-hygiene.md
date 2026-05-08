# Storybook and Structure Hygiene

## Storybook location

Storybook is configured inside the Next.js site workspace:

- `site/.storybook/main.ts`
- `site/.storybook/preview.ts`

Stories are intentionally kept at the repository root:

- `stories/**/*.stories.tsx`
- `stories/**/*.stories.mdx`

Run Storybook from the repository root:

```bash
npm run storybook
```

or directly through the site workspace:

```bash
npm --prefix site run storybook
```

## Expected clean root structure

Canonical source folders:

- `brandbook/`
- `design-system/`
- `framework/`
- `migration/`
- `packages/ui/`
- `site/`
- `stories/`
- `e2e/`
- `reports/`
- `scripts/`

Canonical root config files:

- `package.json`
- `.gitignore`
- `.npmrc`
- `jest.config.js`
- `jest.setup.ts`
- `playwright.config.ts`
- `README.md`
- `AGENTS.md`

## Legacy files removed from this bundle

The following old handoff/legacy paths are not part of the canonical structure and should not be kept locally:

- `implementation-pack/`
- `phase-02/`
- `draft`
- `__tests__/`
- `unzipped/`
- `brandbook-main/`
- `FULL_ARCHIVE_NOTES.md`
- `PHASE_08_NOTES.md`
- `archive-integrity-report.md`
- `runtime-fix-report.md`

If they exist in a local checkout, they are stale leftovers from earlier bundles or from extracting a new bundle over an existing directory.

Run:

```bash
npm run clean:legacy
```

before installing dependencies.
