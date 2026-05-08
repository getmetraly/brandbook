"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Mon", value: 42 },
  { name: "Tue", value: 58 },
  { name: "Wed", value: 61 },
  { name: "Thu", value: 54 },
  { name: "Fri", value: 76 },
];

const tooltipStyle = {
  background: "#111722",
  border: "1px solid rgba(0,229,204,0.28)",
  borderRadius: 14,
  color: "#f0f4f8",
  boxShadow: "0 20px 50px rgba(0,0,0,0.42)",
};

const labelStyle = {
  color: "#8b9bb4",
};

export default function RechartsTelemetryCard() {
  return (
    <div className="recharts-telemetry-card-draft">
      <div className="recharts-telemetry-head">
        <div>
          <strong>Flow efficiency</strong>
          <p>Telemetry-native Recharts wrapper draft.</p>
        </div>
      </div>

      <div className="recharts-telemetry-chart">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 14, right: 14, bottom: 0, left: -14 }}>
            <defs>
              <linearGradient id="draftFlowEfficiency" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00e5cc" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#00e5cc" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.32)" tickLine={false} axisLine={false} />
            <YAxis stroke="rgba(255,255,255,0.32)" tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={tooltipStyle}
              labelStyle={labelStyle}
              cursor={{ stroke: "rgba(0,229,204,0.42)", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#00e5cc"
              fill="url(#draftFlowEfficiency)"
              strokeWidth={3}
              activeDot={{ r: 5, stroke: "#0b0f14", strokeWidth: 2, fill: "#00e5cc" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
