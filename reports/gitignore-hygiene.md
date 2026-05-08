# Gitignore Hygiene Pass

## Summary

Added repository hygiene rules so generated files, dependency folders, build output, local environment files, test artifacts, and handoff archives do not get committed by accident.

## Files added / updated

- `.gitignore`
- `site/.gitignore`
- `packages/ui/.gitignore`

## Root-level policy

The root `.gitignore` protects the full repository tree and is intentionally broad for monorepo usage:

- dependency folders: `node_modules/`, `.pnp/`, Yarn cache folders;
- Next.js output: `.next/`, `out/`, `.vercel/`, `.turbo/`;
- build output: `build/`, `dist/`, `lib/`, cache/temp folders;
- Storybook output: `storybook-static/`;
- test output: `coverage/`, `playwright-report/`, `test-results/`;
- TypeScript cache: `*.tsbuildinfo`;
- local environment files: `.env`, `.env.*`, while preserving `.env.example` and `.env.sample`;
- local editor / machine files;
- local handoff archives such as `.zip`, `.tar`, `.tar.gz`, `.tgz`.

## Site-level policy

`site/.gitignore` repeats the important app-local rules so the Next.js app remains protected even if it is later extracted or copied independently.

## UI package policy

`packages/ui/.gitignore` repeats package-local rules for build output, caches, coverage, Storybook output, and dependency folders.

## Notes

Package lockfiles are intentionally not ignored. If the project starts committing a root workspace lockfile, it should remain tracked for reproducible installs.
