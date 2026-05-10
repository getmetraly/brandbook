"use client";

import * as React from "react";
import { Tooltip } from "recharts";

type TooltipPayloadItem = {
  name?: string;
  value?: string | number;
  dataKey?: string;
  color?: string;
  unit?: string;
};

export interface MetralyChartTooltipContentProps {
  active?: boolean;
  label?: string | number;
  payload?: TooltipPayloadItem[];
}

export function MetralyChartTooltipContent({
  active,
  label,
  payload = [],
}: MetralyChartTooltipContentProps) {
  if (!active || payload.length === 0) return null;

  return (
    <div className="metraly-chart-tooltip" role="status">
      {label !== undefined ? <strong>{label}</strong> : null}
      <div className="metraly-chart-tooltip-list">
        {payload.map((item) => (
          <span key={`${item.dataKey ?? item.name}-${item.value}`}>
            <i style={{ background: item.color }} aria-hidden="true" />
            <span>{item.name ?? item.dataKey}</span>
            <b>
              {item.value}
              {item.unit ?? ""}
            </b>
          </span>
        ))}
      </div>
    </div>
  );
}

export function MetralyChartTooltip() {
  return (
    <Tooltip
      cursor={{ stroke: "rgba(0,229,204,0.22)", strokeWidth: 1 }}
      content={<MetralyChartTooltipContent />}
    />
  );
}

export default MetralyChartTooltip;
