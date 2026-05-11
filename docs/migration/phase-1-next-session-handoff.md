# Phase 1 Next Session Handoff

Status: active handoff for continuing work from a fresh Ubuntu machine.

This document records the current migration state, the open work in Phase 1 and the exact local verification steps needed before moving into component visual hardening.

## Current state

### Completed

PR #1 was merged into `main`.

It added the governance layer for the component migration:

- `docs/migration/component-promotion-lifecycle.md`;
- `docs/migration/component-status.md`;
- `docs/migration/visual-checkpoints.md`;
- `docs/migration/full-component-migration-roadmap.md`;
- cleaned `AGENTS.md`;
- updated the Claude Design handoff status.

The migration lifecycle is now:

```text
Preview-only
→ Visual-ready
→ Hardening
→ Release Candidate
→ Adopted
→ Deprecated
```

### In progress

PR #2 is open:

```text
test(e2e): add visual baseline smoke checks
```

Branch:

```text
brandbook-migration-governance-start
```

Purpose:

- start Phase 1 visual baseline automation;
- add route-level Playwright smoke checks;
- add viewport checks for `/components/previews`;
- add root e2e scripts;
- make `npm --prefix site run test:e2e` run the root Playwright config instead of accidentally collecting Jest tests from `site/__tests__`.

Files changed in PR #2:

- `e2e/visual-baseline.spec.ts`;
- `package.json`;
- `site/package.json`.

## Important local issue already discovered

When Playwright was run from `site/`, it incorrectly picked up Jest unit tests from `site/__tests__`, producing errors such as:

```text
ReferenceError: expect is not defined
ReferenceError: describe is not defined
```

This was fixed by changing the site script:

```json
"test:e2e": "cd .. && playwright test"
```

Root scripts were also added:

```json
"e2e:install": "playwright install chromium",
"test:e2e": "playwright test"
```

## Current local blocker

The latest local run reached the correct Playwright e2e files, but failed because Chromium was not installed in the local Playwright cache:

```text
browserType.launch: Executable doesn't exist at ~/.cache/ms-playwright/...
Looks like Playwright was just installed or updated.
Please run: npx playwright install
```

This is a local environment/browser-cache issue, not a component or route failure.

The local machine also showed:

```text
BEWARE: your OS is not officially supported by Playwright; downloading fallback build for ubuntu24.04-x64.
```

If `playwright install chromium` hangs after download reaches 100%, treat it as a local browser extraction/cache issue.

## Fresh Ubuntu machine setup

From a fresh Ubuntu machine, use the following sequence.

### 1. Clone and enter the repository

```bash
git clone https://github.com/getmetraly/brandbook.git
cd brandbook
```

### 2. Fetch the open Phase 1 branch

```bash
git fetch origin
git checkout brandbook-migration-governance-start
git pull
```

### 3. Check runtime versions

```bash
node --version
npm --version
```

Node 26 may print deprecation warnings from Storybook/Playwright dependencies:

```text
[DEP0205] DeprecationWarning: `module.register()` is deprecated.
```

This warning is not currently a blocker.

### 4. Install workspace dependencies

```bash
npm install
```

If dependency state looks inconsistent, use the safe clean install path:

```bash
npm run clean:install
npm install
```

### 5. Install Playwright dependencies and Chromium

On Ubuntu, install system dependencies first if needed:

```bash
npx playwright install-deps chromium
```

Then install the Chromium browser used by the tests:

```bash
npm run e2e:install
```

If the install hangs after the browser download reaches 100%, interrupt it after several minutes and clear the incomplete browser cache:

```bash
Ctrl+C
rm -rf ~/.cache/ms-playwright/chromium_headless_shell-1217
rm -rf ~/.cache/ms-playwright/chromium-1217
npm run e2e:install
```

### 6. Run the validation suite

From the repository root:

```bash
npm run check
npm run site:build
npm run build-storybook
npm run test:e2e
```

Expected meaning:

- `npm run check` validates UI package typecheck, site typecheck and Jest unit tests.
- `npm run site:build` validates the Next.js brandbook build.
- `npm run build-storybook` validates Storybook static build.
- `npm run test:e2e` validates route-level Playwright smoke checks.

## What PR #2 validates

PR #2 adds smoke coverage for these routes:

```text
/components
/components/previews
/components/forms
/components/data-display
/components/charts
/components/dashboard
/patterns/widget-editor
/examples/engineering-dashboard
```

It also checks `/components/previews` at these viewports:

```text
Desktop: 1440 × 1000
Tablet: 768 × 1000
Mobile: 390 × 900
```

The e2e tests also check core preview hardening rules:

- neutral grip dots;
- no pulse-wave in default drop zones;
- dashed cyan border;
- no visible `draft` text.

## Merge criteria for PR #2

PR #2 can be merged when:

- `npm run check` passes;
- `npm run site:build` passes;
- `npm run build-storybook` passes;
- `npm run test:e2e` passes on a machine with Playwright Chromium installed;
- generated files such as `.next/`, `storybook-static/`, `test-results/`, `playwright-report/` and `*.tsbuildinfo` are not committed.

Before merge, check:

```bash
git status --short
```

Expected clean state or only intentionally changed tracked files.

## Known non-blockers

The following are currently non-blockers:

- Node 26 `[DEP0205] module.register()` deprecation warning;
- visual defects in existing components that were not introduced by PR #2;
- Playwright browser install warnings about unsupported OS fallback, as long as tests run successfully after browser installation.

## Known blockers

The following are blockers:

- e2e tests still collecting Jest tests from `site/__tests__`;
- missing Playwright browser after `npm run e2e:install` completed;
- route smoke failures caused by missing routes, broken pages or unexpected runtime errors;
- Storybook build failure;
- Next build failure;
- accidental modifications to protected `/components` baseline without explicit request.

## Next work after PR #2 merge

After PR #2 is merged, start PR #3:

```text
StateBadge + MetralyCard / MetralyPanel Release Candidate pass
```

Scope:

- `StateBadge`;
- `MetralyCard`;
- `MetralyPanel`;
- `MetralyMetricCard` if needed for card composition.

Do not start with:

- full dashboard editor;
- custom select implementation;
- real DnD behavior;
- broad chart wrapper refactoring;
- website or metraly downstream adoption.

## PR #3 checklist

For each component in scope:

- inspect current implementation and CSS;
- inspect current Storybook stories;
- inspect current tests;
- check visual states in `/components/previews` and relevant grouped routes;
- fix only visual/API issues related to this batch;
- keep components compact and tokenized;
- keep `@metraly/ui` framework-agnostic;
- update `docs/migration/component-status.md`;
- add a visual checkpoint section to the PR body.

Required checks for PR #3:

```bash
npm run check
npm run site:build
npm run build-storybook
npm run test:e2e
```

## Visual debt tracking format

When visual defects are discovered, record them in this format:

```text
Route:
Component:
Viewport:
Problem:
Expected:
Priority:
Screenshot:
```

Priority levels:

```text
P0 — build, test or route load blocker.
P1 — breaks readability, layout or interaction clarity.
P2 — visual quality issue, but not blocking.
P3 — polish.
```

Do not fix unrelated visual debt in the current PR. Keep each PR focused on one component batch.

## Recommended next PR sequence

1. Merge PR #2 after e2e/browser setup is verified.
2. PR #3: `StateBadge` + `MetralyCard` / `MetralyPanel` visual hardening.
3. PR #4: `MetralyTable` display-only hardening.
4. PR #5: `MetralyChartCard` + `MetralySparkline` hardening.
5. PR #6: `DashboardWidget` shell hardening.
6. Website pilot only after the first simple primitives reach Release Candidate.
7. Metraly product pilot only after dashboard primitives are stable enough for a controlled adapter-based integration.
