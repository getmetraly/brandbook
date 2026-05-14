# Component Design Recipes

This document is the practical cookbook for designing and implementing Metraly brandbook components.

Use it together with:

- `docs/prototype-visual-spec.md` — source-of-truth visual contract;
- `docs/prototype-parity-audit.md` — audit workflow and acceptance criteria;
- `docs/component-contract.md` — production component surface contract;
- `docs/composition-patterns.md` — composition-level rules.

The goal is not to invent a new style. The goal is to build production components that visually and behaviorally match `getmetraly/docs/prototypes/brandbook/*` while staying maintainable inside `packages/ui`.

## Core design recipe

Use this process for every component or component change.

1. Start from the prototype reference.
2. Identify whether an existing production primitive can express the surface.
3. Map the surface to existing `--m-*` tokens.
4. Define states before writing CSS.
5. Define density behavior before responsive behavior.
6. Define responsive collapse before visual redesign.
7. Add Storybook/state-board coverage.
8. Add screenshots for changed visible states.
9. Document intentional divergence when production should differ from prototype.

A component is not ready when it only "looks nice" in one desktop route. It is ready when it behaves correctly across states, density, and viewport constraints.

## Design decision order

When making a design choice, resolve it in this order:

1. Prototype behavior.
2. Existing `packages/ui` primitive contract.
3. `docs/prototype-visual-spec.md` rules.
4. `docs/prototype-parity-audit.md` acceptance criteria.
5. Existing Storybook/state-board examples.
6. New local interpretation.

Local interpretation is last. Do not start from a generic SaaS dashboard pattern.

## Good vs bad foundation patterns

### Good

- Uses existing primitives before creating new shells.
- Uses `--m-*` tokens for color, spacing, radius, focus, glow, and motion.
- Keeps cyan as operational signal.
- Keeps purple as secondary depth/accent.
- Keeps hover, selected, dragging, and resizing dimension-stable.
- Uses semantic state components such as `StateBadge`.
- Uses internal scroll for dense tables, tabs, widget bodies, and popovers.
- Adds Storybook/state coverage for meaningful states.

### Bad

- Creates local `.custom-card`, `.pretty-table`, or `.new-dashboard-widget` styles when a primitive exists.
- Hardcodes dark colors, cyan, shadows, or radius values.
- Adds pulse/glow because a surface feels empty.
- Makes hover move, scale, jump, or increase component height.
- Uses large marketing-style spacing inside dense dashboard surfaces.
- Solves responsive issues by creating a second mobile design language.
- Fixes production issues through preview-only CSS wrappers.

## CSS recipe

### Good tokenized surface

```css
.metraly-example-surface {
  background: var(--m-bg-2);
  border: 1px solid var(--m-line);
  border-radius: var(--m-r-3);
  color: var(--m-fg-1);
}

.metraly-example-surface:hover {
  background: var(--m-bg-3);
  border-color: var(--m-line-strong);
}

.metraly-example-surface:focus-visible {
  outline: 1px solid var(--m-cyan-500);
  box-shadow: var(--m-glow-focus);
}
```

### Bad hardcoded surface

```css
/* Bad: hardcoded, too bright, and not tokenized. */
.custom-card {
  background: #111827;
  color: #ffffff;
  border-radius: 18px;
  box-shadow: 0 0 30px cyan;
}

.custom-card:hover {
  transform: translateY(-2px);
}
```

Why bad:

- bypasses tokens;
- introduces non-prototype radius;
- overuses glow;
- hover changes layout/position;
- creates a second visual language.

## JSX composition recipe

### Good composition

```tsx
<DashboardWidget
  title="PR review latency"
  subtitle="Last 14 days · all teams"
  state="live"
>
  <MetralyTable
    dense
    stickyHeader
    columns={columns}
    data={rows}
  />
</DashboardWidget>
```

Why good:

- uses `DashboardWidget` for shell rhythm;
- uses `MetralyTable` for dense data semantics;
- keeps state semantic through `state="live"`;
- avoids local card/table recreation.

### Bad composition

```tsx
<div className="dashboard-card">
  <h2>PR review latency</h2>
  <table className="pretty-table">...</table>
</div>
```

Why bad:

- recreates widget shell locally;
- likely bypasses drag/resize/state contracts;
- likely misses table frame, sticky header, and dense telemetry behavior;
- cannot be audited against the component contract easily.

## When to create a new component

Create a new component only when all of these are true:

- Existing primitives cannot express the behavior through composition.
- The pattern appears in at least two production contexts or is clearly part of the prototype system.
- State behavior is documented.
- Responsive behavior is documented.
- Storybook/state-board coverage will be added in the same PR.
- The component can be implemented with `--m-*` tokens without local visual hacks.

Do not create a new component only because a page needs one slightly different visual treatment.

## When to add a prop instead of a new component

Add a prop to an existing component when:

- the visual language stays the same;
- the state is already part of the prototype vocabulary;
- the new behavior can be expressed without local CSS overrides;
- the prop improves reuse across multiple contexts.

Examples:

- `dense` on table or widget surfaces;
- `stickyHeader` on `MetralyTable`;
- `state` on `DashboardWidget`;
- `size="sm"` on `StateBadge`.

Avoid props that create a hidden second design system, such as:

- `marketingVariant`;
- `largeRounded`;
- `neonGlow`;
- `mobileSpecialLayout`;
- `customColor`.

## MetralyTable recipe

Use `MetralyTable` for dense operational data: PR latency, deployment history, CI health, team health, incidents, and flow metrics.

### Good

```tsx
<MetralyTable
  dense
  stickyHeader
  ariaLabel="PR review latency by team"
  columns={columns}
  data={rows}
  footer={<span>14d window · 6 teams · updated 2m ago</span>}
/>
```

Recommended column patterns:

```ts
const columns = [
  { key: "team", header: "Team", width: "28%" },
  { key: "open", header: "Open PRs", align: "right" },
  { key: "firstResponse", header: "1st response", align: "right" },
  { key: "status", header: "Status" },
];
```

State cells should use canonical badges:

```tsx
<StateBadge state="stale" label="Delayed" size="sm" />
```

### Bad

```tsx
<div className="table-card">
  {rows.map((row) => (
    <div className="table-row">...</div>
  ))}
</div>
```

Why bad:

- loses table semantics;
- likely breaks keyboard/screen-reader behavior;
- bypasses sticky header and table frame;
- usually creates page-level overflow on narrow widths.

### Checklist

- Real `<table>` semantics are preserved.
- Horizontal overflow is inside `.metraly-table-frame`.
- Numeric columns use mono/right-aligned treatment where appropriate.
- Status cells use `StateBadge`.
- Loading, empty, stale, disconnected, and error states preserve shell dimensions.
- Row hover does not change row height.

## WidgetPickerCard recipe

Use `WidgetPickerCard` for widget library rows and picker lists.

### Good

```tsx
<WidgetPickerCard
  title="Deployment frequency"
  description="Deploys per day, by service and team."
  kind="dora/deploy-freq"
  iconLabel="lightning"
  selected={selectedWidget === "deploy-freq"}
  onSelect={() => setSelectedWidget("deploy-freq")}
/>
```

### Good selected behavior

Selected state should be:

- border emphasis;
- subtle background emphasis;
- optional selected glow;
- no pulse wave;
- no layout shift.

### Bad

```tsx
<div className="picker-row selected">
  <PulseWave />
  <strong>Deployment frequency</strong>
</div>
```

Why bad:

- reintroduces pulse into picker rows;
- bypasses picker state contract;
- likely creates noisy dense rails.

### Checklist

- Rail width works around 300-320px.
- Mobile stacks into dense full-width rows.
- Long title and description do not overflow.
- Disabled and loading states remain readable.
- Dragging state does not add pulse or jump.

## DashboardWidget recipe

Use `DashboardWidget` for anything mounted inside the dashboard board/editor.

### Good

```tsx
<DashboardWidget
  id="cycle-time"
  title="Cycle time breakdown"
  subtitle="Coding · review · merge · deploy"
  state="stale"
  stateLabel="Delayed"
  selected={isSelected}
  dragging={isDragging}
  resizing={isResizing}
  onSelect={selectWidget}
  onDragStart={startDrag}
>
  <CycleTimeChart />
</DashboardWidget>
```

### Bad

```tsx
<section className="widget-shell">
  <button className="drag-icon">↕</button>
  <h3>Cycle time breakdown</h3>
  <CycleTimeChart />
</section>
```

Why bad:

- custom drag affordance is not the neutral grip-dot contract;
- missing state badge slot;
- missing selected/resizing resize handle behavior;
- likely misses shell state classes.

### Checklist

- Header keeps grip, title/subtitle, badge and actions stable.
- Drag handle is neutral grip dots only.
- Resize handles appear only for selected/resizing widgets.
- Dense content scrolls inside widget body.
- Loading, empty, stale, disconnected and error states preserve dimensions.
- Nested buttons/links do not conflict with widget selection behavior.

## DashboardToolbar recipe

Use `DashboardToolbar` for dense operational chrome above dashboard/editor surfaces.

### Good

```tsx
<DashboardToolbar
  title="Delivery overview"
  description="DORA · flow · review health"
  tabs={tabs}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  searchValue={query}
  onSearchChange={setQuery}
  syncState="live"
  syncLabel="Live sync"
  editMode={editMode}
  onToggleEdit={toggleEditMode}
  onAddWidget={openWidgetLibrary}
/>
```

### Bad

```tsx
<header className="big-page-header">
  <h1>Delivery overview</h1>
  <button>Add widget</button>
</header>
```

Why bad:

- becomes a marketing/page header instead of dense operational chrome;
- loses tabs/search/sync/action rhythm;
- likely fails narrow wrapping behavior.

### Checklist

- Tabs can horizontal-scroll on narrow widths.
- Search, sync state and actions remain reachable.
- Toolbar wraps before overflowing the page.
- Buttons do not jump on hover.
- `live` sync pulse is semantic, not decorative.

## MetralySelect recipe

Use `MetralySelect` for compact filter and settings choices.

### Good

```tsx
<MetralySelect
  label="Time window"
  value={timeWindow}
  onChange={setTimeWindow}
  options={[
    { value: "7d", label: "Last 7 days" },
    { value: "14d", label: "Last 14 days" },
    { value: "30d", label: "Last 30 days" },
  ]}
/>
```

### Bad

```tsx
<select className="large-filter-select">
  <option>Last 14 days</option>
</select>
```

Bad when it introduces:

- large non-prototype spacing;
- browser-default styling that conflicts with dark UI;
- inconsistent focus/hover/error states;
- labels/options that overflow narrow layouts.

### Checklist

- Trigger is full-width inside its container.
- Long selected labels truncate before overflow.
- Popover is dark, raised, bordered and viewport-safe.
- Long option lists scroll internally.
- Escape, click-outside and keyboard navigation are supported or explicitly documented as a limitation.
- Focus-visible is clear and dimension-stable.

## StateBadge recipe

Use `StateBadge` for operational state, not decoration.

### Good

```tsx
<StateBadge state="live" label="Live" size="sm" />
<StateBadge state="stale" label="Delayed" size="sm" pulse={false} />
<StateBadge state="error" label="Disconnected" size="sm" />
```

### Bad

```tsx
<span className="status-pill cyan-glow">Fast</span>
<span className="status-pill pulse">Beta</span>
```

Why bad:

- creates ad hoc badge language;
- overuses glow or pulse;
- makes semantic state unclear;
- usually breaks dense table/widget alignment.

### Checklist

- Badge is compact `inline-flex`.
- Badge does not stretch to parent width.
- `live` and `new` may pulse by default.
- Warning/error/stale do not use aggressive glow.
- Repeated table badges do not all announce as live regions unless necessary.

## Chart wrapper recipe

Use chart wrappers inside `MetralyChartCard` or `DashboardWidget` shells.

### Good

```tsx
<DashboardWidget
  title="Deployment frequency"
  subtitle="Deploys per day · last 14 days"
  state="live"
>
  <MetralyLineChart data={deploymentSeries} />
</DashboardWidget>
```

### Bad

```tsx
<div className="chart-card">
  <h3>Deployment frequency</h3>
  <ResponsiveContainer width={700} height={240}>...</ResponsiveContainer>
</div>
```

Why bad:

- fixed desktop width breaks responsive shells;
- local chart card bypasses shell contract;
- badge/action slots are likely unconstrained;
- tooltip/legend may escape the shell.

### Checklist

- Chart lives inside responsive shell.
- No fixed desktop width is required.
- Cyan is the primary series.
- Purple is the secondary series.
- Tooltip, legend and SVG do not escape the card/widget.
- Empty/loading/error states preserve chart shell dimensions.

## Card, panel and metric recipe

Use existing shells before creating new layout containers.

### Good

```tsx
<MetralyMetricCard
  label="Lead time"
  value="18.4h"
  delta="-2.1h"
  state="success"
/>
```

```tsx
<MetralyPanel title="Review health">
  <MetralyTable dense columns={columns} data={rows} />
</MetralyPanel>
```

### Bad

```tsx
<div className="metric-box big-rounded-glow">
  <span>Lead time</span>
  <strong>18.4h</strong>
</div>
```

Why bad:

- bypasses shell rhythm;
- often uses wrong radius/glow;
- makes metrics look like marketing cards instead of dense telemetry.

### Checklist

- Existing shell owns surface, border, radius and hover behavior.
- Metric values use mono font.
- Secondary text is muted and compact.
- Header slots tolerate wrapping.
- Cards stack before internals become unreadable.

## Responsive recipe

Responsive behavior preserves the same design language with fewer simultaneous columns.

### Good

```css
.metraly-example-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: var(--m-space-3);
}
```

### Bad

```css
@media (max-width: 600px) {
  .metraly-card {
    background: white;
    color: black;
    border-radius: 24px;
  }
}
```

Why bad:

- creates a second mobile design system;
- breaks dark operational tone;
- hides rather than solves layout constraints.

## Interaction recipe

Every interactive component must define:

- default state;
- hover state;
- focus-visible state;
- selected/active state where applicable;
- disabled state;
- loading/empty/error state where applicable;
- narrow viewport behavior.

Do not add visual transitions that change layout geometry. Allowed transitions include color, border-color, opacity and box-shadow when they are tokenized and subtle.

## Review checklist before opening a PR

Before opening a visual/component PR, verify:

- Prototype file references are listed.
- Existing primitives were considered first.
- No new local design language was introduced.
- No hardcoded colors/shadows/radius values were added.
- Pulse/glow usage is semantic.
- Hover/focus/selected states do not shift layout.
- Responsive behavior does not create body horizontal overflow.
- Storybook/state examples exist for touched components.
- Screenshots are attached or linked.
- Intentional divergences are documented.

## Anti-pattern index

Avoid these patterns:

- `div` tables for tabular data;
- local card shells when `MetralyCard`, `MetralyPanel`, `DashboardWidget` or `MetralyChartCard` can be used;
- pulse in picker rows, drop zones or drag handles;
- generic cyan glow on idle surfaces;
- large rounded marketing cards inside dense dashboard routes;
- page-level horizontal scroll from tables, tabs, popovers or chart wrappers;
- mobile-only redesigns that change tone;
- preview-only CSS rescue layers;
- ad hoc badges instead of `StateBadge`;
- hardcoded font sizes/colors where `--m-*` tokens exist.
