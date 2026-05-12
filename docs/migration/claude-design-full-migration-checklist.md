# Claude Design Full Migration Checklist

Status: active visual migration checklist.

This document defines the practical review and migration path for moving Metraly Brandbook closer to the Claude Design visual reference before promoting reusable components to Release Candidate.

## Core decision

Move the Brandbook visual system closer to Claude Design first, then harden individual components.

This means the migration order is:

```text
Claude Design visual language
→ foundation tokens and base surfaces
→ primitive components
→ grouped component routes
→ dashboard/editor scenarios
→ Storybook state matrix
→ downstream pilots
```

Do not start website/metraly adoption while the Brandbook still visibly mixes generic rounded SaaS styling with Claude Design styling.

## Migration principle

Do not copy prototype code directly.

Translate the visual language into stable `@metraly/ui` primitives:

- framework-agnostic;
- reusable;
- testable;
- Storybook-friendly;
- compatible with future website/metraly adoption.

## What to check first

Always start review from:

```text
/components/previews
```

This route is the main visual truth because it contains:

- Claude Design state board;
- Engineering Dashboard Editor preview;
- real component combinations;
- dashboard/editor density;
- badges, cards, forms, tables, widgets and chart wrappers together.

Then check grouped docs routes:

```text
/components/primitives
/components/forms
/components/data-display
/components/charts
/components/dashboard
/patterns/widget-editor
/examples/engineering-dashboard
```

## Global visual checklist

Every component and route should be checked against these criteria.

### 1. Overall visual language

Check:

- Does it feel like the Claude Design reference?
- Does it feel technical and engineering-dashboard oriented?
- Does it avoid the generic SaaS UI-kit look?
- Does it look production-like, not raw or prototype-only?
- Does it fit the dark Metraly background?

Fail signs:

- too much radius on cards/panels;
- mixed typography systems;
- random bright colors;
- raw browser-default controls;
- excessive glow;
- badges/cards from different visual systems on the same screen.

### 2. Radius

Check:

- Panels/cards/widgets should be stricter, usually around 8–10px.
- Badges/chips should remain pill-shaped.
- Controls should use compact radius, usually 5–7px.
- Tables should be structured and not over-rounded.

Fail signs:

- cards look like large rounded SaaS marketing cards;
- nested surfaces each have large radius;
- badge radius was made square even though Claude Design uses pill badges;
- all components use one universal radius regardless of role.

### 3. Spacing and density

Check:

- Does the component work in dense dashboards?
- Are state cells compact but readable?
- Are badges/chips fit-content instead of stretched?
- Are cards not wasting vertical space?
- Does mobile still breathe without becoming huge?

Fail signs:

- badges stretched to full width;
- state cells look empty or oversized;
- metric cards too tall for dashboard grids;
- table rows too airy;
- nested containers create too much padding.

### 4. Typography

Check:

- Badge/status labels use mono uppercase style.
- Metrics use strong display typography.
- Card titles are readable but compact.
- Supporting copy is muted and does not compete with data.
- Labels and small metadata use consistent font size.

Fail signs:

- badge text is regular UI font;
- badge labels are not uppercase where Claude Design expects uppercase;
- metric values do not stand out;
- too many font weights on one card;
- label sizes differ randomly across routes.

### 5. Color and state treatment

Check:

- State color is semantic and restrained.
- Backgrounds use translucent OKLCH-like state colors.
- Selected/focus/error states are visible but not noisy.
- Neutral states remain readable.
- Warning/error do not overpower the whole dashboard unless blocking.

Fail signs:

- raw saturated blocks;
- selected glow too strong;
- warning/error looks like a banner inside every small component;
- state background is missing and text floats on dark surface;
- color is the only state indicator without text/shape.

### 6. Motion and interaction

Check:

- No hover vertical jump.
- Focus-visible is clear.
- Disabled state is obviously disabled.
- Loading is subtle and has reduced-motion fallback.
- Pulse is only semantic.

Fail signs:

- buttons/cards jump on hover;
- pulse used as decoration;
- pulse before `Drag to move`;
- drop zones pulse by default;
- focus ring changes layout.

## Component group review plan

## Phase 0 — Foundation visual reset

Goal:

Bring tokens and base surfaces closer to Claude Design before fixing every component one by one.

Files to inspect:

```text
packages/ui/src/styles/metraly-theme.css
site/app/globals.css
site/app/component-overrides.css
site/app/components/docs/docs.css
site/app/components/previews/previews.css
```

Check:

- radius tokens;
- dark background stack;
- card/panel surface color;
- border opacity;
- focus ring;
- typography tokens;
- OKLCH state color compatibility;
- docs preview container radius/padding.

Done when:

- base surfaces no longer look generic rounded SaaS;
- docs containers do not fight component styles;
- Claude Design preview and grouped docs routes feel like one visual system.

## Phase 1 — Primitive foundation

Components:

```text
StateBadge
MetralyBadge
MetralyPanel
MetralyCard
MetralyMetricCard
```

Routes:

```text
/components/previews
/components/primitives
/components/feedback
/examples/engineering-dashboard
```

### StateBadge checklist

Check:

- pill shape;
- mono font;
- uppercase;
- 11px-ish size;
- compact padding;
- dot is small and semantic;
- no full-width stretching;
- live/stale/delayed/disconnected/no-data states match Claude Design feel;
- table cells do not stretch badges.

Done when:

- badge looks like a Claude Design status label in previews and tables;
- it does not look like a generic rounded pill from a UI library.

### MetralyBadge checklist

Check:

- visually compatible with StateBadge;
- no dot;
- same mono uppercase language;
- semantic colors match StateBadge tone family;
- fit-content width;
- works inside component rows and dense surfaces.

Done when:

- `/components/primitives → MetralyPanel / Badge / MetricCard` looks coherent.

### MetralyPanel checklist

Check:

- radius is stricter than old rounded card style;
- border is visible but subtle;
- background is dark layered surface;
- nested panel does not look overly rounded;
- focusable panel ring is visible and stable;
- padding presets do not create bloated surfaces.

Done when:

- panel can be used as a neutral custom surface without feeling generic.

### MetralyCard checklist

Check:

- default, selected, loading, empty, error;
- compact density;
- selected state is visible but not over-glowing;
- error state is clear but not noisy;
- skeleton is subtle;
- empty state does not look like a marketing card;
- card title/subtitle spacing matches Claude Design.

Done when:

- cards in `/components/primitives` and `/components/previews` feel like part of the same dashboard system.

### MetralyMetricCard checklist

Check:

- value typography;
- title and description hierarchy;
- badge slot alignment;
- compact density;
- footer border/spacing;
- hover does not move;
- dashboard grid density.

Done when:

- metric cards fit the Engineering Dashboard Editor preview without looking like a separate design system.

## Phase 2 — Forms and controls

Components:

```text
MetralyCheckbox
MetralyRadio
MetralySwitch
MetralySelect
MetralyTabs
```

Routes:

```text
/components/previews
/components/forms
```

Check:

- default/hover/focus/selected/disabled/error;
- compact control height;
- selected state matches Claude Design;
- focus-visible is clear;
- disabled state is not too faint;
- select is not raw browser-default;
- tabs are compact and not over-rounded;
- no decorative pulse.

Done when:

- state board controls look like the same system as badges/cards.

## Phase 3 — Dashboard/editor primitives

Components:

```text
WidgetPickerCard
DashboardWidget
DashboardToolbar
DashboardDropZone
DashboardResizeHandle
DashboardEmptyState
```

Routes:

```text
/components/previews
/components/dashboard
/patterns/widget-editor
```

Check:

- widget surfaces;
- selected/dragging/full-width states;
- drag handle uses neutral grip dots;
- no pulse before `Drag to move`;
- drop zone idle state has no pulse;
- active drop zone uses dashed cyan border and subtle tint;
- rejected drop zone is clear but not noisy;
- toolbar spacing and tabs feel compact;
- empty state is useful and not generic.

Done when:

- Engineering Dashboard Editor preview feels coherent end-to-end.

## Phase 4 — Tables and data display

Components:

```text
MetralyTable
StateBadge inside table cells
Empty/loading table states
Selected row state
```

Routes:

```text
/components/previews
/components/data-display
```

Check:

- row height and density;
- header typography;
- selected row style;
- StateBadge does not stretch inside cells;
- loading state;
- empty state;
- numeric alignment;
- border rhythm.

Do not add yet:

- sorting;
- filtering;
- pagination;
- virtualization;
- complex row actions.

Done when:

- table is a strong display-first primitive matching Claude Design dashboard density.

## Phase 5 — Charts

Components:

```text
MetralyChartCard
MetralySparkline
MetralyLineChart
MetralyAreaChart
MetralyBarChart
MetralyComposedChart
MetralyChartTooltip
```

Routes:

```text
/components/previews
/components/charts
/examples/engineering-dashboard
```

Check:

- chart card surface matches dashboard cards;
- chart title/description/badge hierarchy;
- tooltip readability;
- sparkline inside metric cards;
- axis and grid opacity;
- dense chart containers;
- no raw Recharts feel.

Done when:

- charts look native to Metraly, not pasted from a chart library.

## Phase 6 — Full route audit

Routes:

```text
/components/previews
/components/primitives
/components/forms
/components/data-display
/components/charts
/components/dashboard
/patterns/widget-editor
/examples/engineering-dashboard
```

Viewports:

```text
1440 × 1000
768 × 1000
390 × 900
```

For each route check:

- no mixed visual languages;
- no broken spacing;
- no stretched badges;
- no unexpected rounded containers;
- no hover jump;
- no excessive glow;
- no unreadable low-contrast state;
- no horizontal overflow on mobile;
- all key states are visible.

## Current PR strategy

PR #3 should stay Draft until Phase 1 is visually acceptable.

PR #3 should include:

- foundation token alignment needed for primitive consistency;
- StateBadge and MetralyBadge alignment;
- MetralyPanel, MetralyCard and MetralyMetricCard alignment;
- tests for changed contracts;
- updated docs.

After PR #3:

```text
PR #4 — Forms and controls
PR #5 — Dashboard/editor primitives
PR #6 — Tables and data display
PR #7 — Charts
PR #8 — Full route visual audit
```

## Validation commands

Run before marking a PR ready:

```bash
npm run check
npm run site:build
npm run build-storybook
npm run test:e2e
```

Then run the visual review manually:

```bash
npm run site:dev
```

Manual visual review is mandatory for this migration because automated smoke checks can confirm routes load, but cannot decide whether the component feels aligned with Claude Design.
