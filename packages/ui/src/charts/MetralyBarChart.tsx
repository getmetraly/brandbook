"use client";

import * as React from "react";
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
  metralyAxisProps,
  metralyChartMargin,
  resolveChartTone,
  type MetralyChartBaseProps,
  type MetralyChartDatum,
} from "./types";

export function MetralyBarChart<TDatum extends MetralyChartDatum = MetralyChartDatum>({
  data,
  xKey = "name",
  series,
  height = 260,
  ariaLabel,
  summary,
  className,
}: MetralyChartBaseProps<TDatum>) {
  return (
    <div className={["metraly-chart", className].filter(Boolean).join(" ")} role="img" aria-label={ariaLabel}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={metralyChartMargin} title={ariaLabel}>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey={xKey} {...metralyAxisProps} />
          <YAxis {...metralyAxisProps} />
          <MetralyChartTooltip />
          {series.map((item, index) => (
            <Bar
              key={item.dataKey}
              dataKey={item.dataKey}
              name={item.name}
              fill={resolveChartTone(item.tone ?? (index === 0 ? "primary" : "secondary"))}
              radius={[8, 8, 0, 0]}
              isAnimationActive={false}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
      <span className="metraly-chart-sr">{summary}</span>
    </div>
  );
}

export default MetralyBarChart;
