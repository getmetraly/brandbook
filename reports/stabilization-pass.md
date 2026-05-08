# Stabilization Pass — Brandbook Source Archive

Status: completed for the current archive iteration.

## Source archive

The active source is `brandbook-main.zip`. Previous generated archives and stale working folders were removed from the working area before extraction.

## Cleanup

- Removed nested archive layout risk: the final archive is generated from the project root, not from an extra `unzipped/` directory.
- Removed generated dependency folders from the final source archive: `node_modules`, `.next`, caches and TypeScript build info.
- Moved component tests into `site/__tests__` so they are colocated with the Next.js site test runner.
- Removed stale Jest references to `<rootDir>/unzipped`.

## Runtime fixes

- `MetralyTable` is server-safe by default and no longer passes event handlers to table rows.
- `MetralyTable` now supports `ariaLabel` and `selectedRowKeys` without client handlers.
- `TelemetryTableRowDraft` renders through `MetralyTable` with selected row state.
- `TelemetryStateBadgeDraft` renders through `StateBadge`.
- `TelemetryGridItemDraft` and `TelemetryWidgetShellDraft` render through `WidgetShell`.

## Shared package architecture

- Added `packages/ui/package.json` as a local package: `@metraly/ui`.
- Updated the site to import shared UI through the local package instead of fragile relative paths outside the site root.
- Added `transpilePackages: ["@metraly/ui"]` to `site/next.config.mjs`.
- Kept `packages/ui` as the canonical shared source while making the Next.js site resolver safer.

## Validation

Executed from `site/`:

```bash
npm install --ignore-scripts
npm run typecheck
npm test -- --runInBand
```

Results:

- Typecheck: passed.
- Tests: passed, 4 suites / 8 tests.

Known note:

- Jest prints React's outdated JSX transform warning in the test environment. The assertions pass; this is a test transform warning, not a runtime regression.
- `next build` was not accepted as final validation in this environment because production generation timed out during static page generation. The source now has a safer local package boundary and explicit typecheck/test validation.

## Next recommended work

1. Run the final archive locally with a clean install.
2. Verify `/`, `/draft`, `/editor`, and `/docs` in dev mode.
3. Continue migrating remaining draft controls: checkbox, select, switch, tabs and widget picker.
4. Add a client-only dashboard grid wrapper around `react-grid-layout` and keep server-safe primitives separate.
