# Brandbook Prototype Downstream Migration Notes

Status: downstream adoption plan
Date: 2026-05-13
Branch: `phase-1-statebadge-forms-prototype-conformance`
Related plan: `docs/migration/brandbook-prototype-phase-plan.md`

## Purpose

This document explains how to adopt the prototype-conformant Brandbook primitives in downstream repositories after local validation passes.

Downstream adoption must be controlled and incremental. This branch aligns component APIs, state contracts, tests, Storybook stories and prototype-conformance routes, but it does not prove downstream product behavior by itself.

## Required validation before downstream work

Run locally in `getmetraly/brandbook`:

```bash
npm run site:test
npm run ui:check
```

Also manually inspect the new conformance routes:

- `/components/forms/prototype-conformance`
- `/components/dashboard/prototype-conformance`
- `/components/data-display/prototype-conformance`
- `/components/charts/prototype-conformance`

If validation fails, fix Brandbook first. Do not migrate downstream repos against a failing component baseline.

## Adoption principles

- Prefer `@metraly/ui` primitives instead of local one-off components.
- Keep downstream changes small and phase-based.
- Do not migrate real dashboard editor DnD until keyboard, persistence and reload behavior are verified.
- Do not copy prototype files from `getmetraly/docs/prototypes/brandbook/*` into downstream repos.
- Do not use `PulseWave` as a drag affordance.
- Use neutral grip dots for drag only.
- Keep hover states layout-stable.
- Keep sorting, filtering, pagination and row interactions outside `MetralyTable`.
- Use chart wrappers instead of raw Recharts scattered across product pages.

## Recommended adoption order for `getmetraly/metraly`

### Step 1 — Safe primitives

Adopt first:

- `StateBadge`
- `MetralyBadge`
- `MetralyTabs`
- `MetralyCheckbox`
- `MetralyRadio`
- `MetralySwitch`
- `MetralySelect`

Why:

- These have focused tests and visual conformance coverage.
- They normalize state vocabulary across product surfaces.
- They are lower risk than dashboard/editor primitives.

Validation:

- Run existing product unit tests.
- Verify focus-visible states manually.
- Verify disabled/loading states do not accept interaction.

### Step 2 — Data display

Adopt next:

- `MetralyTable`
- `StateBadge` inside table cells
- `MetralySparkline` in compact metric cells

Use `MetralyTable` only as a display primitive. Keep these outside the table:

- sorting;
- filtering;
- pagination;
- row click behavior;
- selection state ownership;
- server data fetching.

New supported table contracts:

- `selectedRowKeys`
- `unreadRowKeys`
- `liveRowKeys`
- `rowMarker`
- `stickyHeader`
- `dense`

### Step 3 — Chart wrappers

Adopt chart wrappers where dashboard/product pages currently compose raw Recharts directly:

- `MetralyChartCard`
- `MetralySparkline`
- `MetralyLineChart`
- `MetralyAreaChart`
- `MetralyBarChart`
- `MetralyComposedChart`
- `MetralyChartTooltip`

Rules:

- Use `state="loading"`, `state="error"`, `state="noData"` or empty `data={[]}` for fallback states.
- Keep tooltip content label/value/unit based, not color-only.
- Keep Recharts wrapper APIs compact.

### Step 4 — Dashboard primitives

Adopt carefully:

- `WidgetPickerCard`
- `DashboardWidget`
- `DashboardDropZone`
- `DashboardToolbar`
- `DashboardResizeHandle`
- `DashboardEmptyState`

Important constraints:

- `DashboardWidget` drag grip is now in the header.
- Drag affordance must be neutral grip dots only.
- Selected/resizable widgets render eight resize handles.
- `DashboardToolbar` is structurally two-row.
- `DashboardDropZone` has `data-pulse="off"`; do not add idle pulse effects.

### Step 5 — Real DnD and persistence later

Do not promote real dashboard editor behavior until these are verified in `metraly`:

- `@dnd-kit/*` keyboard interaction;
- `react-grid-layout` resize behavior;
- layout persistence reload;
- selected widget keyboard focus;
- drop rejection states;
- restore-after-refresh behavior;
- test coverage for create/save/update widgets.

## Recommended adoption order for `getmetraly/website`

Website should adopt conservative, marketing-safe primitives first:

1. `StateBadge`, `MetralyBadge`, `MetralyTabs`.
2. `MetralySparkline` and `MetralyChartCard` for product-preview sections.
3. `MetralyTable` only for static comparison or feature matrix sections.
4. Avoid dashboard editor primitives unless the website needs a live product demo.

Avoid:

- real DnD behavior;
- resize handles;
- dense product-only tables without copy context;
- raw Recharts composition when chart wrappers exist.

## API changes to watch

### StateBadge

New supported states:

- `ok`
- `new`
- `purple`
- `disabled`

Pulse defaults:

- `live` → on;
- `new` → on;
- all static states → off;
- `pulse={false}` can explicitly opt out.

### Forms

New additions:

- `hint` on checkbox/radio/switch/select;
- `loading` on checkbox/switch/select;
- `accent="cyan|purple"` on switch;
- `placeholder` and `empty` behavior on select;
- `livePulse` on tabs.

### WidgetPickerCard

New additions:

- `kind`;
- `visualState`;
- `dragging`;
- `loading`;
- `data-state`;
- `data-kind`.

### DashboardWidget

Changed geometry:

- drag grip moved from footer to header;
- selected/resizable widget renders all eight resize handles;
- no pulse marker inside drag affordance.

### MetralyTable

New additions:

- `unreadRowKeys`;
- `liveRowKeys`;
- `rowMarker`;
- `stickyHeader`;
- `dense`.

### Charts

New additions:

- `state` on chart wrappers;
- `chartStateFromData` helper;
- `data-chart-type`;
- `data-chart-state`;
- `data-series-count`;
- `data-point-count`;
- sparkline fallback states.

## Migration checklist per downstream PR

- [ ] Use only components exported by `@metraly/ui`.
- [ ] Remove equivalent local one-off component only after visual parity is confirmed.
- [ ] Add before/after screenshots to the downstream PR.
- [ ] Run downstream tests and type checks.
- [ ] Verify focus-visible and disabled states manually.
- [ ] Verify no hover layout shift.
- [ ] Verify no pulse-wave is used for drag.
- [ ] Keep product behavior separate from visual migration.
- [ ] Update downstream docs or comments if a local wrapper remains intentionally.

## Known deferrals

- Custom select/listbox remains deferred until full keyboard/a11y behavior is specified.
- Real DnD behavior remains deferred.
- Dashboard persistence remains deferred.
- Product-specific chart query/data fetching remains downstream-owned.
- Table sorting/filtering/pagination remain wrapper responsibilities.
