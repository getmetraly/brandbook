"use client";

import * as React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
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

export function MetralyLineChart<TDatum extends MetralyChartDatum = MetralyChartDatum>({
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
        <LineChart data={data} margin={metralyChartMargin} title={ariaLabel}>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey={xKey} {...metralyAxisProps} />
          <YAxis {...metralyAxisProps} />
          <MetralyChartTooltip />
          {series.map((item) => (
            <Line
              key={item.dataKey}
              type="monotone"
              dataKey={item.dataKey}
              name={item.name}
              stroke={resolveChartTone(item.tone)}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5 }}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <span className="metraly-chart-sr">{summary}</span>
    </div>
  );
}

export default MetralyLineChart;
