"use client";

import {
  Area,
  AreaChart,
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

export default function RechartsTelemetryCardDraft() {
  return (
    <div className="recharts-telemetry-card-draft">
      <div className="recharts-telemetry-head">
        <div>
          <strong>Flow efficiency</strong>
          <p>Telemetry-native Recharts wrapper draft.</p>
        </div>
        <span className="brand-badge brand-badge-warning">draft</span>
      </div>

      <div className="recharts-telemetry-chart">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data}>
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.24)" />
            <YAxis stroke="rgba(255,255,255,0.24)" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#00e5cc"
              fill="rgba(0,229,204,0.14)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
