# Charts

Status: recommended primitive.

Metraly uses charting for engineering analytics: flow efficiency, review latency, deployment health, DORA, incident trends, heatmaps and sprint burndown previews.

## Current direction

Use Recharts through Metraly wrappers, not raw Recharts scattered across product code.

Wrappers should include:

```text
MetralyChartCard
MetralyLineChart
MetralyAreaChart
MetralyBarChart
MetralyComposedChart
MetralyHeatmap
MetralySprintBurndown
MetralySparkline
MetralyChartTooltip
```

## Visual rules

- Dark panel background.
- Low-contrast grid lines.
- Cyan primary series.
- Purple/indigo secondary series.
- Orange warning series.
- Tooltips styled as dark Metraly panels.
- Axis labels muted and readable.
- No chart animation loops.

## Current chart examples on `/draft`

- Recharts gallery from `/components`.
- Flow efficiency area chart.
- Heatmap widget.
- Sprint burndown with visible but restrained dashed ideal line.
- Widget registry chart-related examples.

## Board edit compatibility

Chart cards must support:

- selected;
- dragging;
- resizing;
- full-width;
- empty/loading/error;
- no-data.

## Accessibility

Every chart wrapper should expose:

- accessible label;
- summarized text alternative;
- tooltip content that does not rely on color alone;
- keyboard-safe focus behavior when interactive.
