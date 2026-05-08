# Package Foundation Validation

## Scope

This pass implements the package rename and structure stabilization requested for the shared interface package.

## Completed changes

- Removed the temporary `implementation-pack/` directory.
- Created `packages/ui/` as the canonical shared UI package.
- Renamed the local package to `@metraly/ui`.
- Added `packages/ui/src/index.ts` with stable named exports.
- Moved React components to `packages/ui/src/components/`.
- Moved CSS files to `packages/ui/src/styles/`.
- Kept assets under `packages/ui/assets/`.
- Updated `site/package.json` to use `"@metraly/ui": "file:../packages/ui"`.
- Updated `site/next.config.mjs` to transpile `@metraly/ui`.
- Updated site imports to use package imports instead of relative paths.
- Updated tests and stories to import from `@metraly/ui`.
- Updated Jest aliases for `@metraly/ui`.
- Added TypeScript config for the UI package.
- Removed stale duplicate folders: `phase-02/` and empty `draft` file.

## New import contract

```ts
import { MetralyCard, MetralyTable, StateBadge, WidgetShell } from "@metraly/ui";
```

```ts
import "@metraly/ui/styles/metraly-theme.css";
```

## Static validation performed

Passed:

- `package.json` is valid JSON.
- `site/package.json` is valid JSON.
- `site/package-lock.json` is valid JSON.
- `packages/ui/package.json` is valid JSON.
- `site/tsconfig.json` is valid JSON.
- `packages/ui/tsconfig.json` is valid JSON.
- No root-level `implementation-pack/` directory remains.
- No `unzipped/` directory remains.
- No `phase-02/` directory remains.
- No source import references `@metraly/implementation-pack`.
- Package imports now resolve to `@metraly/ui`.

## Runtime/build validation status

Attempted:

```bash
npm --prefix packages/ui run typecheck
```

Result:

The command could not complete because dependencies are not installed in the sandbox workspace. The errors are dependency-resolution errors for `react`, `react/jsx-runtime`, and React type declarations, not source-level package path errors.

Expected local validation command sequence after extracting the archive:

```bash
npm --prefix site install
npm --prefix packages/ui run typecheck
npm --prefix site run typecheck
npm --prefix site run test -- --runInBand
npm --prefix site run build
```

## Follow-up recommendation

The next implementation phase should migrate remaining draft controls into the `@metraly/ui` package in this order:

1. `TelemetryCheckboxDraft`
2. `TelemetrySwitchDraft`
3. `TelemetryTabsDraft`
4. `TelemetrySelectDraft`
5. `WidgetPickerCardDraft`
6. empty/loading/error primitives
7. dashboard grid wrappers
