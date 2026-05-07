# Archive Integrity Report

Status: verified and corrected.

## What was wrong

A previous archive contained both:

- root project files such as `brandbook/`, `design-system/`, `site/`, `implementation-pack/`;
- an extra nested `unzipped/` directory containing another copy of the project.

That structure was ambiguous and could cause outdated files to be copied by mistake.

## Corrected archive structure

The corrected archive is flat and matches the project structure directly at the ZIP root:

```text
AGENTS.md
README.md
FULL_ARCHIVE_NOTES.md
brandbook/
design-system/
framework/
implementation-pack/
migration/
reports/
site/
__tests__/
e2e/
.storybook/
stories/
jest.config.js
jest.setup.ts
playwright.config.ts
archive-integrity-report.md
runtime-fix-report.md
```

There is no nested `unzipped/` directory in the corrected archive.

## Runtime fix verification

Verified:

- `implementation-pack/react/MetralyTable.tsx` no longer renders event handlers such as `onClick` or `onKeyDown`.
- `implementation-pack/react/WidgetShell.tsx` no longer renders mouse event handlers from server-rendered draft usage.
- `site/app/components/draft/TelemetryTableRowDraft.tsx` delegates rendering to `MetralyTable` without passing event handlers.
- `site/app/components/draft/TelemetryGridItemDraft.tsx` delegates rendering to `WidgetShell`.
- `site/app/components/draft/TelemetryStateBadgeDraft.tsx` delegates rendering to `StateBadge`.
- `site/app/components/DashboardEditor.tsx` imports `fakeDashboardApi` from the correct relative path.
- `react-grid-layout` global CSS is imported from `site/app/layout.tsx`, not from a nested Client Component.

## Known validation limitation

Full `npm install` / `npm run typecheck` was not completed in this environment because package downloads are restricted. Static checks and archive integrity checks were completed locally.
