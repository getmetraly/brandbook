# Visual Checkpoints

Status: active QA checklist.

This document defines the visual checkpoints that must be reviewed after each component hardening step. It is intentionally route-based so every PR leaves a visible state that can be checked by humans and by Playwright smoke tests.

## Required viewports

Use these minimum viewport checks for visual QA:

| Viewport | Size | Purpose |
|---|---:|---|
| Desktop | 1440 × 1000 | Primary brandbook and dashboard review. |
| Tablet | 768 × 1000 | Toolbar wrapping, card grids and docs layout. |
| Mobile | 390 × 900 | Collision checks and narrow container behavior. |

## Core route checkpoints

### `/components`

Purpose: protected baseline reference.

Rules:

- Do not change this route unless explicitly requested.
- Use it as a baseline comparison surface.
- Preserve existing examples, including `Metric source`.

Visual checks:

- page loads;
- hero/copy remains readable;
- no unexpected layout changes;
- no deleted baseline examples.

### `/components/previews`

Purpose: active preview hardening route and Claude Design reference translation.

Visual checks:

- component state board renders all groups;
- Engineering Dashboard Editor preview renders;
- no visible `draft` badge text;
- drag handles use neutral grip dots;
- no pulse-wave appears before `Drag to move`;
- default drop zones do not render pulse-wave;
- selected widget remains readable;
- dragging state uses subtle elevation only;
- toolbar controls do not collide;
- widget picker panel does not overlap the workspace;
- chart cards remain readable;
- empty and disconnected states are calm and clear;
- mobile width does not introduce horizontal overflow.

### `/components/forms`

Purpose: form primitive hardening.

Visual checks:

- checkbox/radio selected circles are visible;
- focus-visible is clear;
- disabled states are clear and non-interactive;
- error states do not rely on color alone;
- hover does not shift layout vertically;
- labels remain readable in compact containers.

### `/components/data-display`

Purpose: display tables, badges, skeletons and empty states.

Visual checks:

- table headers and cells align;
- selected row state is visible;
- skeleton rows do not shift layout;
- empty state is calm and not decorative;
- badges remain readable inside cells;
- narrow containers do not break row readability.

### `/components/charts`

Purpose: Recharts wrapper hardening through Metraly chart primitives.

Visual checks:

- chart background matches Metraly dark card surface;
- axes are muted but readable;
- primary series uses cyan;
- secondary series uses purple/indigo;
- warning series uses orange;
- tooltip is a dark Metraly panel;
- no looping chart animations;
- loading, empty, no-data and error states are visible;
- chart summaries are present for accessibility.

### `/components/dashboard`

Purpose: dashboard primitive hardening.

Visual checks:

- DashboardWidget default, selected, dragging and full-width states render;
- DashboardToolbar wraps without collision;
- DashboardDropZone uses dashed cyan border and subtle tint;
- DashboardResizeHandle sits outside content rhythm;
- widget body text and badges remain readable;
- no pulse-wave is used as a handle.

### `/patterns/widget-editor`

Purpose: dashboard editor composition reference.

Visual checks:

- editor add-flow remains visually thin;
- widget picker does not dominate the canvas;
- selected, dragging, drop-target and resize states are obvious;
- states are labelled Preview-only or Hardening where appropriate;
- no production DnD claim is implied.

### `/examples/engineering-dashboard`

Purpose: realistic Engineering Intelligence composition.

Visual checks:

- examples use Metraly vocabulary: DORA, review latency, cycle time, lead time, deployment frequency, change failure rate, CI failure rate, flaky builds, blocked work and team delivery health;
- no generic infra-monitoring examples dominate the page;
- chart/table/card composition feels like a product surface, not a marketing mockup;
- page remains readable at desktop and tablet widths.

## Storybook checkpoints

Each Release Candidate component must have a Storybook story with:

- default state;
- state matrix;
- narrow container example;
- dashboard/card composition if relevant;
- disabled/focus-visible/error examples where relevant.

Storybook groups should stay aligned with brandbook routes:

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

## PR visual report template

Every component hardening PR should include this block in its summary or in a follow-up doc:

```md
## Visual checkpoint

Routes checked:
- `/components/previews`
- `/components/charts`

Viewports:
- Desktop 1440 × 1000: pass / notes
- Tablet 768 × 1000: pass / notes
- Mobile 390 × 900: pass / notes

Storybook:
- story added/updated: yes/no
- build-storybook: pass/fail/not run

Known visual issues:
- ...
```

## Manual QA rules

- If a component has no visible route, do not promote it.
- If a component has no Storybook state story, do not mark it Release Candidate.
- If the route looks correct only at desktop width, keep it Hardening.
- If the component requires keyboard behavior that is not implemented, keep it Hardening.
- If a component is only a scenario composition, keep it Preview-only.
