# Phase 2 — StateBadge and Card Primitive Hardening Plan

Status: active implementation plan for PR #3.

Branch:

```text
phase-2-statebadge-card-panel-rc
```

Goal:

Harden the first low-risk primitive batch without touching the protected `/components` baseline or introducing downstream product adoption yet.

## Scope

Included:

- `StateBadge`;
- `MetralyCard`;
- `MetralyPanel`;
- `MetralyMetricCard`.

Out of scope:

- full dashboard editor rewrite;
- custom select implementation;
- real DnD behavior;
- chart wrapper refactoring;
- website adoption;
- metraly product adoption;
- unrelated visual polish.

## Current findings

### StateBadge

Current strengths:

- compact API;
- default label derivation;
- `role="status"`;
- custom `ariaLabel`;
- `size="sm"` support;
- optional visual indicator;
- basic state tests already exist.

Hardening opportunities:

- add explicit semantic aliases for common downstream usage:
  - `error`;
  - `warning`;
  - `success`;
  - `info`.
- add `tone="subtle" | "solid"` for future dashboard/marketing contexts;
- keep `subtle` as default;
- keep indicator restrained and semantic;
- preserve existing `live`, `stale`, `delayed`, `disconnected`, `noData` API.

### MetralyPanel

Current strengths:

- framework-agnostic;
- compact HTML surface;
- padding presets;
- focusable mode;
- basic tests exist.

Hardening opportunities:

- expose `data-padding` and `data-focusable` for visual/e2e checks;
- document that hover/selected semantics belong in composed components, not base panel;
- ensure focus ring stays stable and does not shift layout.

### MetralyCard

Current strengths:

- title/subtitle/body/footer slots;
- selected/error/loading/empty visual states;
- skeleton and empty rendering;
- basic tests exist.

Hardening opportunities:

- add `density="comfortable" | "compact"`;
- add custom `emptyLabel` for product-specific empty states;
- add `aria-busy` in loading state;
- add `data-state` and `data-density`;
- keep hover stable with no vertical movement;
- keep selected/error state as class-based visual API.

### MetralyMetricCard

Current strengths:

- compact metric title/value API;
- badge slot;
- footer slot;
- variant states;
- basic tests exist.

Hardening opportunities:

- add `density="comfortable" | "compact"`;
- add optional `description` slot for engineering context;
- add `data-variant` and `data-density`;
- keep metric card a composition primitive, not a separate card per metric type.

## Test additions

Add or update tests for:

- `StateBadge` semantic aliases: `error`, `warning`, `success`, `info`;
- `StateBadge` tone data attribute;
- `MetralyCard` custom empty label;
- `MetralyCard` `aria-busy` in loading state;
- `MetralyCard` compact density class/data attribute;
- `MetralyPanel` `data-padding` / `data-focusable`;
- `MetralyMetricCard` description slot;
- `MetralyMetricCard` compact density class/data attribute.

## CSS hardening

Keep all changes tokenized.

Allowed:

- add compact density classes;
- add tone classes;
- improve spacing consistency;
- add class/data hooks for state checks.

Not allowed:

- hover `translateY`;
- new decorative glow spam;
- pulse-wave in non-semantic places;
- Next.js-specific CSS assumptions;
- broad restyling of unrelated components.

## Visual checkpoint

Routes to inspect after implementation:

- `/components/previews`;
- `/components/feedback`;
- `/components/primitives`;
- `/examples/engineering-dashboard`.

Storybook to inspect:

- StateBadge stories;
- MetralyCard / Panel stories;
- MetricCard stories if present.

Viewports:

- 1440 × 1000;
- 768 × 1000;
- 390 × 900.

## Required validation

```bash
npm run check
npm run site:build
npm run build-storybook
npm run test:e2e
```

## Promotion target

Do not mark the components as fully `Ready` yet.

Target status after this PR:

- `StateBadge`: Release Candidate candidate if visual review passes;
- `MetralyCard`: Release Candidate candidate if compact/dashboard use passes;
- `MetralyPanel`: Release Candidate candidate if focus/padding behavior passes;
- `MetralyMetricCard`: Hardening or Release Candidate candidate depending on story/test coverage.
