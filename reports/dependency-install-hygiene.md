# Dependency install hygiene

Status: updated after local `npm install` failed on `unrs-resolver` postinstall with `napi-postinstall: Permission denied`.

## Changes

- Removed deprecated `@types/react-grid-layout`; `react-grid-layout` ships its own type definitions.
- Removed `eslint` and `eslint-config-next` from the default install path for this bundle. The current site workflow is `typecheck`, `test`, and `build`; lint can be reintroduced later with a dedicated ESLint config once the portal structure is stable.
- Removed the `next lint` script to avoid a broken lint command on modern Next.js versions and to keep the install path lighter.
- Kept `next` and `@next/mdx` pinned to `16.2.6`, matching the locally reported Next.js version.
- Kept `react-grid-layout` at `^2.2.3`, `react-resizable` at `^3.0.5`, and the requested DnD/Zustand versions.
- Added root `.npmrc` with `audit=false` and `fund=false` to reduce install noise. Lifecycle scripts are not disabled.
- Fixed root `playwright.config.ts` so the e2e web server runs `npm --prefix site run dev`.

## Clean local install

If a previous install failed, remove partially installed dependency trees and lockfiles before retrying:

```bash
npm run clean:install
npm install --no-audit --no-fund
```

Then run:

```bash
npm run ui:check
npm run site:typecheck
npm run site:test
npm run site:build
```

## Notes

The previous warnings about `inflight`, `glob`, `abab`, `whatwg-encoding`, and `domexception` were transitive dependency warnings from the test/tooling tree. They are not direct project dependencies. The fatal blocker was the `napi-postinstall` permission error, so this pass focuses on removing the likely unnecessary dependency path and making a clean reinstall predictable.
