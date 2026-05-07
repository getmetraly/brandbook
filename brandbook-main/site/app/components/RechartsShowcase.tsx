"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { day: "Mon", cycle: 4.2, deploys: 6, health: 91, reviews: 14 },
  { day: "Tue", cycle: 3.8, deploys: 8, health: 94, reviews: 18 },
  { day: "Wed", cycle: 3.1, deploys: 10, health: 96, reviews: 22 },
  { day: "Thu", cycle: 2.7, deploys: 9, health: 98, reviews: 20 },
  { day: "Fri", cycle: 2.4, deploys: 12, health: 99, reviews: 27 },
];

const tooltipStyle = {
  background: "#111722",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 14,
  color: "#f0f4f8",
};

const axisProps = {
  stroke: "rgba(240,244,248,0.48)",
  tickLine: false,
  axisLine: false,
  fontSize: 12,
};

export function RechartsShowcase() {
  return (
    <div className="chart-grid">
      <div className="component-card chart-card">
        <div className="chart-card-head">
          <h3>Line chart</h3>
          <span className="brand-badge brand-badge-primary">Recharts</span>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data} margin={{ top: 18, right: 18, left: -18, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="day" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "rgba(0,229,204,0.22)" }} />
            <Line type="monotone" dataKey="cycle" name="Cycle time" stroke="#00e5cc" strokeWidth={3} dot={false} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="component-card chart-card">
        <div className="chart-card-head">
          <h3>Bar chart</h3>
          <span className="brand-badge brand-badge-primary">Recharts</span>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} margin={{ top: 18, right: 18, left: -18, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="day" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(0,229,204,0.08)" }} />
            <Bar dataKey="deploys" name="Deploys" fill="#a855f7" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="component-card chart-card chart-wide">
        <div className="chart-card-head">
          <h3>Composed dashboard chart</h3>
          <span className="brand-badge brand-badge-success">recommended primitive</span>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={data} margin={{ top: 18, right: 18, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="metralyHealth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00e5cc" stopOpacity={0.36} />
                <stop offset="95%" stopColor="#00e5cc" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="day" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "rgba(0,229,204,0.22)" }} />
            <Area type="monotone" dataKey="health" name="Health" stroke="#00e5cc" fill="url(#metralyHealth)" strokeWidth={2} />
            <Bar dataKey="reviews" name="Reviews" fill="#6366f1" radius={[8, 8, 0, 0]} />
            <Line type="monotone" dataKey="cycle" name="Cycle time" stroke="#f59e0b" strokeWidth={3} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="component-card chart-card chart-wide">
        <div className="chart-card-head">
          <h3>Area chart</h3>
          <span className="brand-badge brand-badge-primary">Metraly tokens</span>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data} margin={{ top: 18, right: 18, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="metralyCycle" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.36} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="day" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "rgba(168,85,247,0.22)" }} />
            <Area type="monotone" dataKey="cycle" name="Cycle time" stroke="#a855f7" fill="url(#metralyCycle)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RechartsShowcase;
