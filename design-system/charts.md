# Charts

Status: draft / recommended primitive

## Recommendation

Use **Recharts** as the default chart primitive for Metraly dashboard and brandbook surfaces.

## Why Recharts

Recharts is a practical fit for Metraly because the product needs reusable dashboard charts rather than a fully custom visualization engine on day one.

Use it for:

- line charts;
- area charts;
- bar charts;
- composed charts;
- compact dashboard widgets;
- responsive board cards;
- chart tooltips and legends.

## Metraly wrapper strategy

Do not use raw Recharts directly across the product. Create Metraly wrappers instead:

```text
MetralyChartCard
MetralyLineChart
MetralyAreaChart
MetralyBarChart
MetralyComposedChart
MetralySparkline
MetralyChartTooltip
```

The wrappers should own:

- tokenized colors;
- tooltip styling;
- axis styling;
- grid styling;
- empty/loading/error states;
- responsive behavior inside board widgets;
- accessibility labels.

## Token mapping

```text
line.primary     -> --metraly-graph-1 / cyan
line.secondary   -> --metraly-graph-3 / purple
bar.primary      -> --metraly-graph-3 / purple
area.health      -> --metraly-graph-1 with opacity gradient
warning.series   -> --metraly-graph-7 / orange
```

## When to use lower-level primitives

Use CSS/SVG primitives for:

- tiny sparklines;
- decorative telemetry dividers;
- static brandbook examples;
- loading skeletons;
- non-data decorative pulse accents.

Use visx later only for advanced custom visualizations such as dependency graphs, engineering topology, incident timelines or custom flow maps.

## Acceptance criteria

- Charts must use semantic Metraly tokens, not ad-hoc colors.
- Tooltips must follow the dark panel style.
- Charts must be responsive inside board widgets.
- Empty states must be visible and explain what data is missing.
- Chart cards must support board edit mode states: selected, dragging, resizing, full-width and drop target.
