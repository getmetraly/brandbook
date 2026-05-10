# Component Promotion Lifecycle

Status: active governance document.

This document defines how Metraly Brandbook component candidates move from visual exploration to real adoption in `getmetraly/website` and `getmetraly/metraly`.

The brandbook is currently shaping the component system. Components are not assumed to be production-ready until they pass the promotion criteria below.

## Lifecycle

| Stage | Meaning | Can be used in website? | Can be used in metraly? |
|---|---|---:|---:|
| Preview-only | Scenario, reference or exploration only. Not a reusable component contract. | No | No |
| Visual-ready | Visual direction is accepted, but API, accessibility, tests or responsive behavior still need hardening. | No | No |
| Hardening | Component has a real implementation and tests are being expanded. API may still change. | Only in experiment branch | Only in experiment branch |
| Release Candidate | API is documented, states are covered, tests pass and visual review is complete. | Yes, in a pilot branch | Yes, in a pilot branch |
| Adopted | Component is used in a downstream repository and verified there. | Yes | Yes |
| Deprecated | Legacy local implementation has a replacement path. | Avoid new usage | Avoid new usage |

## Promotion rules

A component may move from Preview-only to Visual-ready when:

- the visual direction matches the Metraly brandbook;
- the component appears in at least one preview route or Storybook story;
- it uses Metraly tokens instead of hardcoded one-off styling;
- it does not violate pulse-wave, drag, focus or hover rules.

A component may move from Visual-ready to Hardening when:

- it has a real reusable implementation under `packages/ui` or a clearly scoped preview component;
- props are named and documented enough for review;
- required states are represented in `/components/previews` or grouped docs pages;
- at least one test exists for rendering or state behavior.

A component may move from Hardening to Release Candidate when:

- API is explicit and stable enough for downstream usage;
- all relevant visual states are shown;
- Storybook coverage exists;
- Jest or Testing Library coverage exists;
- accessibility behavior is documented and tested where feasible;
- responsive behavior is visually checked at desktop, tablet and mobile widths;
- the component is framework-agnostic React code and does not depend on Next.js;
- CSS is tokenized and imported through `@metraly/ui/styles/*`;
- it has at least one realistic Engineering Intelligence scenario.

A component may move from Release Candidate to Adopted when:

- it is integrated in `getmetraly/website` or `getmetraly/metraly` through a pilot branch;
- the downstream repository build and tests pass;
- visual review is completed in the downstream route;
- any old local implementation has a migration or deprecation note.

## Required state vocabulary

Use the same state names across docs, preview pages, Storybook and tests:

- default;
- hover;
- focus-visible;
- active;
- selected;
- disabled;
- loading;
- empty;
- no-data;
- stale;
- delayed;
- error;
- disconnected;
- unread/new;
- dragging;
- drop-target;
- resizing;
- full-width.

Not every component needs every state, but missing relevant states must be documented.

## First Release Candidate candidates

Start with low-risk primitives before dashboard editors or advanced controls:

1. `StateBadge`.
2. `MetralyCard` / `MetralyPanel`.
3. `MetralyMetricCard`.
4. `MetralyTable` as display-only primitive.
5. `MetralyChartCard` and `MetralySparkline`.
6. `DashboardWidget` shell.

Keep these as Hardening until their API, state coverage and visual checks are complete:

- `MetralySelect`;
- `MetralyTabs`;
- `DashboardToolbar`;
- `DashboardDropZone`;
- `DashboardResizeHandle`;
- full dashboard editor composition;
- chart wrappers beyond `ChartCard` and `Sparkline`;
- real DnD behavior.

## Downstream adoption policy

### Website

The marketing website should adopt simple brand primitives first:

- badges;
- cards;
- panels;
- metric cards;
- telemetry dividers.

Do not adopt full dashboard editor, DnD, resize handles or complex chart interactions into the website first.

### Metraly product app

The product app should adopt dashboard primitives gradually:

- status badges;
- display tables;
- dashboard widgets;
- chart cards and sparklines;
- drop-zone and resize states only after editor contracts are stable.

Use an adapter layer in the product app so downstream imports are easy to replace or rollback.

## Review checklist for every promotion PR

- Component status table updated.
- Visual checkpoint recorded.
- Storybook story added or updated.
- Tests added or updated.
- Documentation updated in English.
- `/components` protected baseline unchanged unless explicitly requested.
- No pulse-wave drag handles.
- No pulse-wave before `Drag to move`.
- Default drop zones do not render pulse-wave.
- Hover states do not move elements vertically.
- Focus-visible states are clear.
- Component remains framework-agnostic React code.
