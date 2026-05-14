"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { MetralyChartTooltip } from "./MetralyChartTooltip";
import {
  chartStateFromData,
  metralyChartMargin,
  resolveChartTone,
  useResponsiveChartAxisProps,
  type MetralyChartBaseProps,
  type MetralyChartDatum,
} from "./types";

export function MetralyBarChart<TDatum extends MetralyChartDatum = MetralyChartDatum>({
  data,
  xKey = "name",
  series,
  width,
  height = 260,
  ariaLabel,
  summary,
  state = "default",
  className,
}: MetralyChartBaseProps<TDatum>) {
  const resolvedState = chartStateFromData(state, data.length);
  const { containerRef, xAxisProps, yAxisProps } = useResponsiveChartAxisProps(width);
  const classes = ["metraly-chart", "is-bar", resolvedState !== "default" && `is-${resolvedState}`, className]
    .filter(Boolean)
    .join(" ");
  const chartProps = {
    "data-chart-type": "bar",
    "data-chart-state": resolvedState,
    "data-series-count": series.length,
    "data-point-count": data.length,
  };

  if (resolvedState === "empty" || resolvedState === "noData" || resolvedState === "loading" || resolvedState === "error") {
    const role = resolvedState === "error" ? "alert" : "status";
    const copy = resolvedState === "loading" ? "Loading chart" : resolvedState === "error" ? "Chart disconnected" : "No chart data";
    return (
      <div className={classes} role={role} aria-label={ariaLabel} {...chartProps}>
        <span className="metraly-chart-state-copy">{copy}</span>
        <span className="metraly-chart-sr">{summary}</span>
      </div>
    );
  }

  const bars = series.map((item, index) => (
    <Bar
      key={item.dataKey}
      dataKey={item.dataKey}
      name={item.name}
      fill={resolveChartTone(item.tone ?? (index === 0 ? "primary" : "secondary"))}
      radius={[8, 8, 0, 0]}
      activeBar={{ stroke: "rgba(0,229,204,0.42)", strokeWidth: 1, fillOpacity: 0.88 }}
      isAnimationActive={false}
    />
  ));

  return (
    <div ref={containerRef} className={classes} role="img" aria-label={ariaLabel} {...chartProps}>
      {width ? (
        <BarChart width={width} height={height} data={data} margin={metralyChartMargin} title={ariaLabel}>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey={xKey} {...xAxisProps} />
          <YAxis {...yAxisProps} />
          <MetralyChartTooltip />
          {bars}
        </BarChart>
      ) : (
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data} margin={metralyChartMargin} title={ariaLabel}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey={xKey} {...xAxisProps} />
            <YAxis {...yAxisProps} />
            <MetralyChartTooltip />
            {bars}
          </BarChart>
        </ResponsiveContainer>
      )}
      <span className="metraly-chart-sr">{summary}</span>
    </div>
  );
}

export default MetralyBarChart;
