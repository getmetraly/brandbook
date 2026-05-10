# Full Component Migration Roadmap

Status: active roadmap.

This roadmap turns the current Metraly Brandbook preview hardening work into a controlled component migration path for `getmetraly/website` and `getmetraly/metraly`.

The current brandbook is not treated as a finished production component library. It is the source of truth and hardening workspace where component candidates mature into reusable contracts.

## Target outcome

Metraly should end with a compact, reusable component system where:

- `packages/ui` contains framework-agnostic React components;
- `site` provides visual docs, previews, state boards and Storybook scenarios;
- `website` adopts only low-risk brand primitives first;
- `metraly` adopts product/dashboard primitives gradually;
- old local implementations are deprecated only after downstream adoption is verified;
- every migration step is visually checkable.

## Architecture principles

### Keep the package framework-agnostic

`@metraly/ui` must not depend on Next.js APIs, routing, server components or app directory assumptions. It must work in both:

- `website`: Next.js / React 19;
- `metraly`: Vite / React 18.

### Keep components compact

Prefer a small set of primitives and compositions:

- `StateBadge`;
- `MetralyCard` / `MetralyPanel`;
- `MetralyMetricCard`;
- `MetralyTable`;
- `MetralyChartCard` / chart wrappers;
- `DashboardWidget`;
- `DashboardToolbar`;
- `DashboardDropZone`;
- `DashboardResizeHandle`;
- `WidgetPickerCard`.

Avoid one-off components such as `ReviewLatencyCard`, `DoraCard`, `IncidentCard`, `MetricCardV2` when they can be represented by primitives plus data presets.

### Prefer recipes over new components

For product-specific widget types, prefer registry definitions or recipe objects over new visual primitives:

```ts
const dashboardWidgetPresets = {
  reviewLatency: { ... },
  doraOverview: { ... },
  ciFailureRate: { ... },
};
```

### Separate preview scenarios from package API

`/components/previews` may contain scenario code, but `packages/ui` should contain only reusable components with stable-enough contracts.

## Phase 0 — Governance cleanup

Goal: make future work safe and reviewable.

Tasks:

1. Remove temporary agent memory blocks from governance files.
2. Keep `claude-design-handoff.md` aligned with the latest verification status.
3. Decide lockfile policy for the workspace.
4. Add component lifecycle documentation.
5. Add component status tracking.
6. Add visual checkpoint rules.

Visual checkpoint: none; this is repository hygiene.

Required commands:

```bash
npm install
npm run check
npm run site:build
npm run build-storybook
```

Acceptance criteria:

- governance files are clean;
- component lifecycle exists;
- component status matrix exists;
- visual checkpoint checklist exists;
- no protected `/components` changes.

## Phase 1 — Visual baseline freeze

Goal: create a repeatable visual review baseline before promoting components.

Tasks:

1. Record baseline routes in `docs/migration/visual-checkpoints.md`.
2. Add or verify Playwright smoke coverage for:
   - `/components`;
   - `/components/previews`;
   - `/components/charts`;
   - `/components/dashboard`;
   - `/patterns/widget-editor`.
3. Capture or document desktop, tablet and mobile visual checks.
4. Document known visual issues instead of hiding them.

Visual checkpoint:

- `/components` protected baseline;
- `/components/previews` state board and dashboard editor;
- `/components/charts` chart wrappers;
- `/components/dashboard` dashboard primitives.

Acceptance criteria:

- visual baseline routes are documented;
- smoke tests exist or backlog items are documented;
- every future PR can refer back to the baseline.

## Phase 2 — Token contract cleanup

Goal: make components portable to `website` and `metraly` without copying CSS hacks.

Tasks:

1. Normalize token naming:
   - core tokens;
   - semantic tokens;
   - component tokens.
2. Ensure components use CSS variables, not scattered hardcoded values.
3. Keep token files small and documented.
4. Validate dark theme first.
5. Document how downstream repositories should import token CSS.

Visual checkpoint:

- `/foundations/tokens`;
- `/components/previews`;
- `/components/charts`.

Acceptance criteria:

- token names are documented;
- no duplicate token naming patterns;
- components still match dark Metraly visual direction;
- no hover/focus/disabled regressions.

## Phase 3 — Release Candidate batch 1: simple primitives

Goal: produce the first components that can realistically be piloted downstream.

Target components:

1. `StateBadge`.
2. `MetralyCard`.
3. `MetralyPanel`.
4. `MetralyMetricCard`.
5. `MetralyTelemetryLine`.

Tasks per component:

- create or update component passport;
- show all relevant states in preview route;
- add or update Storybook story;
- add or update tests;
- update `component-status.md`;
- verify compact and dashboard/card usage.

Visual checkpoint:

- `/components/previews`;
- `/components/feedback`;
- `/components/primitives`;
- Storybook stories.

Acceptance criteria:

- each component has documented API;
- state coverage is visible;
- tests pass;
- no Next.js dependency;
- component can be used in both React 18 and React 19 environments.

## Phase 4 — Forms hardening

Goal: harden low-risk form controls before complex selects or command surfaces.

Target components:

1. `MetralyCheckbox`.
2. `MetralyRadio`.
3. `MetralySwitch`.
4. `MetralyInput` / search input if introduced.

Keep `MetralySelect` as Hardening until keyboard/typeahead/portal behavior is explicitly solved.

Visual checkpoint:

- `/components/forms`;
- `/components/previews`;
- Storybook control states.

Acceptance criteria:

- label click works;
- disabled states are non-interactive;
- focus-visible is clear;
- error states do not rely on color alone;
- hover does not shift layout;
- keyboard behavior is tested.

## Phase 5 — Data display hardening

Goal: create compact display primitives for real engineering data.

Target components:

1. `MetralyTable` as display-only primitive.
2. `DashboardEmptyState`.
3. `TelemetrySkeleton` / skeleton states.
4. `StateBadge` inside tables.

Do not include sorting, filtering, pagination or virtualization in the base table. These belong in wrappers.

Visual checkpoint:

- `/components/data-display`;
- `/components/previews`;
- `/examples/engineering-dashboard`.

Acceptance criteria:

- loading skeleton rows do not shift layout;
- empty state is calm;
- selected rows expose state;
- row keys are stable;
- table works inside dashboard cards and narrow containers.

## Phase 6 — Chart wrappers hardening

Goal: make Recharts usage consistent and portable through Metraly wrappers.

Target components:

1. `MetralyChartCard`.
2. `MetralySparkline`.
3. `MetralyLineChart`.
4. `MetralyAreaChart`.
5. `MetralyBarChart`.
6. `MetralyComposedChart`.
7. `MetralyChartTooltip`.

Tasks:

- ensure no raw Recharts usage spreads into pages without wrappers;
- document chart states;
- add chart state stories;
- verify tooltip accessibility;
- verify SSR/build behavior;
- keep animation disabled or restrained.

Visual checkpoint:

- `/components/charts`;
- `/components/previews`;
- `/examples/engineering-dashboard`;
- Storybook chart wrappers.

Acceptance criteria:

- chart wrappers remain compact;
- chart summaries exist;
- loading, empty, no-data and error states are visible;
- axis and tooltip styling match Metraly dark UI;
- chart wrappers are still marked Hardening until downstream pilot usage succeeds.

## Phase 7 — Dashboard primitives hardening

Goal: prepare dashboard components for future `metraly` adoption without rewriting the product editor.

Target components:

1. `DashboardWidget`.
2. `DashboardToolbar`.
3. `DashboardDropZone`.
4. `DashboardResizeHandle`.
5. `DashboardGrid`.
6. `WidgetPickerCard`.

Tasks:

- define explicit state contracts;
- keep real DnD out of Release Candidate until keyboard/persistence behavior is validated;
- keep compatibility with `@dnd-kit/*` and `react-grid-layout`;
- verify no pulse-wave drag handles;
- verify default drop zones are pulse-free;
- document resize behavior.

Visual checkpoint:

- `/components/dashboard`;
- `/components/previews`;
- `/patterns/widget-editor`;
- `/examples/engineering-dashboard`.

Acceptance criteria:

- selected, dragging, drop-target, resize and full-width states are visible;
- toolbar wraps without collision;
- drag handles are neutral grip dots;
- resize handles do not overlap content;
- composition remains Preview-only until real editor behavior is verified.

## Phase 8 — Storybook as visual verification layer

Goal: make Storybook the fast visual review surface for every component state.

Required story groups:

- Foundations / Tokens;
- Primitives / Card;
- Primitives / Badge;
- Forms / Controls;
- DataDisplay / Table;
- Charts / Wrappers;
- Dashboard / Widget;
- Dashboard / Toolbar;
- Dashboard / DropZone;
- Scenarios / EngineeringDashboard.

Acceptance criteria:

- every Release Candidate component has a Storybook story;
- every Hardening component has at least one state story;
- Storybook uses the same CSS/tokens as the site;
- `npm run build-storybook` passes.

## Phase 9 — Website pilot integration

Goal: prove that low-risk brand primitives can be adopted by `getmetraly/website`.

First candidates:

1. `StateBadge`.
2. `MetralyCard` / `MetralyPanel`.
3. `MetralyMetricCard`.
4. `MetralyTelemetryLine`.

Do not pilot dashboard editor, DnD, resize handles or complex charts in the website first.

Recommended pilot branch in website:

```text
adopt-brandbook-primitives-demo
```

Recommended pilot routes:

- `/demo`;
- `/docs`;
- one homepage section only if risk is low.

Acceptance criteria:

- website `npm run ci` passes;
- visual review passes;
- SEO/legal copy is unchanged unless intentionally edited;
- imports are controlled and do not pull the whole dashboard system;
- bundle impact is reviewed.

## Phase 10 — Metraly product pilot integration

Goal: prove that dashboard primitives work in the product app without rewriting the dashboard editor.

First candidates:

1. `StateBadge`.
2. `MetralyTable` display-only.
3. `DashboardWidget`.
4. `MetralyChartCard` / `MetralySparkline`.
5. `DashboardDropZone` static state only.

Use an adapter layer in the product app:

```ts
export {
  StateBadge,
  DashboardWidget,
  MetralyTable,
} from "@metraly/ui";
```

Do not scatter direct imports across the product until adoption is proven.

Acceptance criteria:

- Vite build passes;
- React 18 compatibility is verified;
- product tests pass;
- one low-risk product surface uses the component;
- old local implementation is documented but not removed too early.

## Phase 11 — Deprecation and cleanup

Goal: remove duplicate local implementations only after successful adoption.

Tasks:

1. Mark old components as deprecated after replacement exists.
2. Add migration notes.
3. Remove dead local components in separate cleanup PRs.
4. Keep rollback path clear until product adoption is stable.

Acceptance criteria:

- no duplicate components with the same purpose remain undocumented;
- removal PRs are small;
- downstream builds and tests pass.

## Current priority order

1. Governance cleanup.
2. Visual baseline.
3. `StateBadge` + Card/Panel Release Candidate.
4. `MetralyTable` display-only Release Candidate.
5. `MetralyChartCard` + `MetralySparkline` hardening.
6. `DashboardWidget` hardening.
7. Website pilot.
8. Metraly pilot.
9. Real DnD only after editor contracts stabilize.

## Non-goals for the next few PRs

- full dashboard editor rewrite;
- custom select implementation;
- real DnD behavior;
- moving every component to Release Candidate at once;
- migrating all website pages;
- migrating the full Metraly dashboard renderer;
- introducing new visual direction.
