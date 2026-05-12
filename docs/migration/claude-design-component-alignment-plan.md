# Claude Design Component Alignment Plan

Status: active roadmap.

This document defines how Metraly Brandbook components should be aligned with the Claude Design visual reference before they can be promoted to Release Candidate.

The goal is not to copy prototype code directly. The goal is to translate the Claude Design visual language into stable, reusable and framework-agnostic `@metraly/ui` primitives.

## Source of truth

Primary visual reference:

```text
/components/previews
```

Specifically:

- Claude Design state board;
- Engineering dashboard editor scenario;
- badge, widget, card, table, dashboard and form states shown there.

The protected `/components` baseline route must not be changed unless explicitly requested.

## Visual direction

Metraly components should feel:

- dark;
- technical;
- compact;
- calm;
- engineering-dashboard oriented;
- production-like, not generic SaaS-kit;
- minimal, but not unfinished.

Avoid:

- generic rounded card library look;
- excessive border radius on panels/cards;
- hover movement or jumping;
- decorative pulse spam;
- raw browser-default controls;
- over-glowing selected states;
- inconsistent badge typography.

## Claude Design translation rules

### Radius model

Use component-specific radius instead of one global rounded style.

- Panels, cards, widgets: tighter radius, usually `8px–10px`.
- Small controls: `5px–7px` where appropriate.
- Badges/chips: pill radius `999px`.
- Drag handles and status dots: shape depends on semantic role, not decoration.

Current direction:

```text
--metraly-radius-sm: 4px
--metraly-radius-md: 6px
--metraly-radius-lg: 8px
--metraly-radius-xl: 10px
--metraly-radius-pill: 999px
```

### Badge model

State badges should follow the Claude Design computed style:

- `display: inline-flex`;
- `align-items: center`;
- mono font;
- uppercase;
- small size;
- pill radius;
- compact padding;
- restrained translucent state backgrounds;
- small indicator dot;
- never stretched to full width.

Target badge style:

```text
font-family: JetBrains Mono / mono token
font-size: 11px
line-height: 13.2px
letter-spacing: 0.44px
text-transform: uppercase
padding: 2px 8px 2px 6px
gap: 6px
border-radius: 999px
width: fit-content
```

Badge states:

```text
live/success      → OK green
stale/noData      → muted neutral
warning/delayed   → warm warning yellow
error/disconnect  → red/orange error
info/new          → cyan/info
```

### Card and panel model

Cards and panels should be stricter than badges:

- reduced radius;
- subtle border;
- dark layered surface;
- no vertical movement on hover;
- selected state should be visible but not glowing aggressively;
- error state should be clear but not alarmist unless it is a blocking alert;
- dense dashboard usage must remain readable.

### Typography model

- Badge/status labels: mono, uppercase, compact.
- Metric values: display font, strong weight, tight tracking.
- Titles: display font where card-like, UI font where table/control-like.
- Supporting copy: muted, compact, readable.

### Color model

Prefer OKLCH colors from Claude Design where they define stronger visual intent.

Examples:

```text
warning: oklch(0.82 0.14 80)
ok:      oklch(0.78 0.14 155)
error:   oklch(0.72 0.18 25)
info:    oklch(0.78 0.13 200)
```

Use translucent backgrounds, usually around `0.09–0.13` alpha.

### Motion model

Allowed:

- color transition;
- border transition;
- subtle opacity changes;
- skeleton loading animation with reduced-motion fallback.

Not allowed:

- hover translate / vertical jump;
- decorative pulse on default surfaces;
- pulse before drag handle text;
- animated noise that makes dashboard scanning harder.

## Component alignment sequence

### Phase A — Current PR #3: primitive visual alignment

Components:

- `StateBadge`;
- `MetralyCard`;
- `MetralyPanel`;
- `MetralyMetricCard`.

Goal:

Make these primitives visually compatible with Claude Design before any broader component work.

Current status:

- `StateBadge` is close after pill/mono/uppercase update.
- `MetralyCard` and `MetralyPanel` need visual inspection against `/components/previews`.
- `MetralyMetricCard` needs inspection in dense dashboard areas.

Done criteria:

- badges are not stretched;
- badges match the pill/mono/uppercase Claude Design direction;
- cards and panels no longer look like generic rounded SaaS cards;
- metric cards fit dashboard density;
- tests still pass;
- visual review passes at desktop, tablet and mobile widths.

Validation:

```bash
npm run check
npm run site:build
npm run build-storybook
npm run test:e2e
```

Visual routes:

```text
/components/previews
/components/feedback
/components/primitives
/examples/engineering-dashboard
```

### Phase B — Forms and compact controls

Components:

- `MetralyCheckbox`;
- `MetralyRadio`;
- `MetralySwitch`;
- `MetralySelect`;
- `MetralyTabs`.

Goal:

Make form controls match Claude Design's compact engineering-control style.

Check:

- control height around Claude Design control rhythm;
- selected states are clear but not over-glowing;
- focus-visible is visible;
- disabled state is obvious;
- select does not become a heavy custom component without full keyboard/a11y model;
- tabs use compact, calm selected state.

Done criteria:

- state board looks coherent across all form controls;
- no raw browser-default feel;
- tests cover keyboard and disabled states where relevant;
- Storybook state matrix exists or is updated.

### Phase C — WidgetPickerCard and dashboard shell primitives

Components:

- `WidgetPickerCard`;
- `DashboardWidget`;
- `DashboardToolbar`;
- `DashboardDropZone`;
- `DashboardResizeHandle`;
- `DashboardEmptyState`.

Goal:

Make dashboard/editor primitives match the Claude Design dashboard editor scenario.

Rules:

- drag handle uses neutral grip dots;
- no pulse before `Drag to move`;
- default drop zones stay pulse-free;
- active drop zones use dashed cyan border and subtle tint;
- selected widget state is clear and restrained;
- resize handles are visible without looking decorative;
- empty states are helpful, not generic marketing cards.

Done criteria:

- `/components/previews` dashboard editor scenario feels visually unified;
- e2e smoke checks still pass;
- no broad DnD behavior rewrite in this phase.

### Phase D — Table and data display

Components:

- `MetralyTable`;
- row state handling;
- empty/loading states;
- StateBadge inside table cells.

Goal:

Promote table as display-first primitive.

Do not add yet:

- sorting;
- filtering;
- pagination;
- virtualization;
- complex row actions.

Done criteria:

- dense table state matches Claude Design;
- StateBadge cells do not stretch;
- selected rows are readable;
- loading/empty states are consistent;
- table remains display-first and easy to adopt downstream.

### Phase E — Chart wrappers

Components:

- `MetralyChartCard`;
- `MetralySparkline`;
- `MetralyChartTooltip`;
- minimal wrappers around Recharts.

Goal:

Make charts visually fit the Claude Design engineering dashboard.

Rules:

- no raw Recharts scattered in downstream apps;
- chart wrappers are minimal;
- tooltip includes label and values, not color-only identification;
- metric cards and chart cards visually align;
- sparkline fits dense metric cards.

### Phase F — Adoption pilots

Only after the relevant primitives pass visual review:

1. Website pilot for simple primitives.
2. Metraly product pilot for dashboard primitives.

Do not start adoption while primitives still visibly diverge from Claude Design.

## PR workflow

Each PR should:

- focus on one component group;
- update `docs/migration/component-status.md`;
- include tests;
- include Storybook updates when the visual state matrix changes;
- include visual checkpoint notes;
- avoid unrelated cleanup;
- stay framework-agnostic inside `@metraly/ui`.

## Final acceptance criteria

The component system can be considered aligned with Claude Design when:

- `/components/previews` looks coherent and no longer like a mix of two systems;
- cards, panels, badges, controls, tables and widgets share one visual language;
- compact/dense dashboard states are readable;
- all primitive states have tests or documented intentional gaps;
- Storybook has enough state coverage for migration work;
- future website/metraly adoption can happen through stable primitives, not copied prototype code.
