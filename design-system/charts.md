# Charts

Status: hardening primitive.

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

Implemented preview-safe wrappers currently live under `@metraly/ui/charts`:

- `MetralyChartCard`
- `MetralyLineChart`
- `MetralyAreaChart`
- `MetralyBarChart`
- `MetralyComposedChart`
- `MetralySparkline`
- `MetralyChartTooltip`

These wrappers are Hardening, not Ready. They are accepted for brandbook preview usage while API, accessibility and downstream adoption are validated.

## Visual rules

- Dark panel background.
- Low-contrast grid lines.
- Cyan primary series.
- Purple/indigo secondary series.
- Orange warning series.
- Tooltips styled as dark Metraly panels.
- Axis labels muted and readable.
- No chart animation loops.

## Current chart examples on grouped preview pages

- Wrapper-backed Recharts gallery from `/components/charts`.
- Flow efficiency area chart.
- Review latency trend.
- Deployment frequency.
- Change failure rate.
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

Use `ariaLabel` and `summary` on every chart wrapper. Tooltip rows should include text labels and values, not color-only series identification. Set Recharts animation props to static values for brandbook previews; no looping chart animation should be introduced.

## Reference Cleanup

The Claude Design zip included both Engineering Intelligence metrics and generic infrastructure metrics. Production previews should use review latency, cycle time, lead time, deployment frequency, change failure rate, MTTR, CI failure rate, flaky builds, blocked work, flow efficiency, WIP and DORA overview.

Avoid RPS, p99 latency as the main concept, api-gateway, auth-service, DB queries/sec, logs/traces as primary examples, CPU saturation and edge nodes.
