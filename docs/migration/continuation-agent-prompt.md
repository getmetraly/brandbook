# Continuation Agent Prompt

Use this prompt to continue the Metraly Brandbook migration work from a fresh local machine.

## Prompt

You are working in the `getmetraly/brandbook` repository.

Your role is a senior frontend engineer, design-system architect and careful migration agent for the Metraly component system.

Metraly is a developer analytics / engineering intelligence platform. The brandbook is the visual source of truth and the hardening workspace for reusable UI components that may later be adopted by:

- `getmetraly/website` — marketing / public website;
- `getmetraly/metraly` — core product app.

Do not treat the current brandbook as a finished production component library. Treat it as a source of truth where component candidates move through this lifecycle:

```text
Preview-only
→ Visual-ready
→ Hardening
→ Release Candidate
→ Adopted
→ Deprecated
```

## Current repository state

PR #1 was merged and added the migration governance layer:

- `docs/migration/component-promotion-lifecycle.md`;
- `docs/migration/component-status.md`;
- `docs/migration/visual-checkpoints.md`;
- `docs/migration/full-component-migration-roadmap.md`.

PR #2 is in progress and starts Phase 1:

```text
test(e2e): add visual baseline smoke checks
```

Branch:

```text
brandbook-migration-governance-start
```

PR #2 adds:

- `e2e/visual-baseline.spec.ts`;
- root scripts `e2e:install` and `test:e2e`;
- site script fix so `npm --prefix site run test:e2e` runs Playwright from the repository root;
- `docs/migration/phase-1-next-session-handoff.md`.

Before doing any new component work, finish validating and merging PR #2.

## First task: validate PR #2

From the repository root, run:

```bash
npm install
npx playwright install-deps chromium
npm run e2e:install
npm run check
npm run site:build
npm run build-storybook
npm run test:e2e
```

If Playwright browser installation hangs after download reaches 100%, recover with:

```bash
Ctrl+C
rm -rf ~/.cache/ms-playwright/chromium_headless_shell-1217
rm -rf ~/.cache/ms-playwright/chromium-1217
npx playwright install-deps chromium
npm run e2e:install
npm run test:e2e
```

If Node 26 prints this warning, do not treat it as a blocker unless it becomes a hard error:

```text
[DEP0205] DeprecationWarning: `module.register()` is deprecated.
```

If Playwright starts collecting Jest tests from `site/__tests__`, stop and fix the script/config boundary. E2E tests must come from root `e2e/`, not from Jest unit tests.

PR #2 can be merged only when:

- `npm run check` passes;
- `npm run site:build` passes;
- `npm run build-storybook` passes;
- `npm run test:e2e` passes;
- generated files are not committed.

Check generated files with:

```bash
git status --short
```

Do not commit:

- `.next/`;
- `storybook-static/`;
- `test-results/`;
- `playwright-report/`;
- `*.tsbuildinfo`;
- local `.env*` files.

## After PR #2 merge: start PR #3

Start a new branch from updated `main` after PR #2 is merged.

Recommended branch name:

```text
phase-2-statebadge-card-panel-rc
```

Recommended PR title:

```text
feat(ui): harden StateBadge and card primitives
```

Primary scope:

- `StateBadge`;
- `MetralyCard`;
- `MetralyPanel`;
- `MetralyMetricCard` only if needed for card composition.

Do not include in PR #3:

- full dashboard editor rewrite;
- custom select implementation;
- real DnD behavior;
- broad chart wrapper refactoring;
- website adoption;
- metraly product adoption;
- unrelated visual polish.

## Required reading before coding

Read these files first:

```text
docs/migration/component-promotion-lifecycle.md
docs/migration/component-status.md
docs/migration/visual-checkpoints.md
docs/migration/full-component-migration-roadmap.md
docs/migration/phase-1-next-session-handoff.md
AGENTS.md
```

Then inspect the relevant implementation, tests and Storybook stories for:

```text
StateBadge
MetralyCard
MetralyPanel
MetralyMetricCard
```

## Design direction and constraints

Preserve the Metraly visual direction:

- dark UI default;
- minimal, calm and technical;
- cyan as primary signal;
- purple/indigo as secondary signal;
- subtle glow only where semantically useful;
- pulse-wave motif should be restrained and meaningful;
- no decorative pulse spam;
- no pulse-wave before `Drag to move`;
- drag handles must use neutral grip dots;
- no hover jump or vertical shift;
- focus-visible states must be clear;
- disabled states must be visibly disabled and non-interactive;
- default drop zones must stay pulse-free;
- chart and dashboard visuals must remain readable in dense engineering dashboards.

Keep the package framework-agnostic:

- `@metraly/ui` must not depend on Next.js APIs;
- do not use Next routing, server components or app-directory assumptions inside package components;
- components should remain usable in React 18 and React 19 downstream apps.

## PR #3 work plan

For each component in scope:

1. Inspect current implementation and CSS.
2. Inspect current unit tests.
3. Inspect current Storybook stories.
4. Inspect current usage in brandbook routes.
5. Identify visual states that are missing or broken.
6. Fix only scoped issues.
7. Add or update tests.
8. Add or update Storybook stories.
9. Update `docs/migration/component-status.md`.
10. Run full validation.

Required component states to consider:

```text
default
hover
focus-visible
active
selected
disabled
loading
empty
stale
delayed
error
disconnected
unread/new
compact
dense dashboard usage
```

Not every component needs every state. If a state is intentionally not supported, document why.

## PR #3 acceptance criteria

PR #3 can be considered ready when:

- `StateBadge` is readable in cards, tables and compact dashboard rows;
- `MetralyCard` and `MetralyPanel` have stable spacing, border and surface treatment;
- hover states do not move layout;
- focus-visible states are clear;
- disabled/empty/error states are readable;
- no component introduces pulse spam;
- no package component depends on Next.js;
- Storybook shows relevant states;
- tests cover the intended behavior;
- `docs/migration/component-status.md` is updated;
- the PR body includes a visual checkpoint section.

Required validation:

```bash
npm run check
npm run site:build
npm run build-storybook
npm run test:e2e
```

## Visual debt workflow

When visual defects are found, record them using this format:

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

Do not fix unrelated visual debt in the current PR. Keep each PR focused.

## Recommended next PR sequence

After PR #3:

1. PR #4: `MetralyTable` display-only hardening.
2. PR #5: `MetralyChartCard` + `MetralySparkline` hardening.
3. PR #6: `DashboardWidget` shell hardening.
4. Website pilot only after simple primitives reach Release Candidate.
5. Metraly product pilot only after dashboard primitives are stable enough for adapter-based integration.

## Output expectations

For every PR:

- keep changes small and reviewable;
- include complete files, not fragments;
- update docs in English;
- do not silently delete files;
- do not touch protected `/components` baseline unless explicitly requested;
- write tests before or alongside changes;
- explain what was validated and what remains intentionally out of scope.

## Start now

Begin by checking the current branch and PR state:

```bash
git status --short
git branch --show-current
git pull
```

Then validate PR #2. Do not start component visual hardening until PR #2 is merged.
