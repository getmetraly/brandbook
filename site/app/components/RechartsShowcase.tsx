"use client";

import {
  MetralyAreaChart,
  MetralyBarChart,
  MetralyChartCard,
  MetralyComposedChart,
  MetralyLineChart,
} from "@metraly/ui/charts";

const deliveryTrend = [
  { name: "Mon", cycle: 52, deploys: 6, failure: 4.8, reviews: 14, flow: 68 },
  { name: "Tue", cycle: 48, deploys: 8, failure: 4.1, reviews: 18, flow: 71 },
  { name: "Wed", cycle: 43, deploys: 10, failure: 3.8, reviews: 22, flow: 74 },
  { name: "Thu", cycle: 41, deploys: 9, failure: 4.2, reviews: 20, flow: 78 },
  { name: "Fri", cycle: 38, deploys: 12, failure: 3.5, reviews: 27, flow: 81 },
];

export function RechartsShowcase() {
  return (
    <div className="chart-grid">
      <MetralyChartCard
        title="Review latency trend"
        description="Median first-review response by day."
        summary="Review latency improved from 52 hours to 38 hours across the week."
        badge={<span className="brand-badge brand-badge-primary">Line</span>}
      >
        <MetralyLineChart
          data={deliveryTrend}
          xKey="name"
          ariaLabel="Line chart showing review latency trend by day"
          summary="Review latency improved from 52 hours to 38 hours across the week."
          series={[{ dataKey: "cycle", name: "Review latency", tone: "primary" }]}
        />
      </MetralyChartCard>

      <MetralyChartCard
        title="Deployment frequency"
        description="Deployments per day across teams."
        summary="Deployment frequency increased from 6 to 12 deploys per day."
        badge={<span className="brand-badge brand-badge-primary">Bar</span>}
      >
        <MetralyBarChart
          data={deliveryTrend}
          xKey="name"
          ariaLabel="Bar chart showing deployment frequency by day"
          summary="Deployment frequency increased from 6 to 12 deploys per day."
          series={[{ dataKey: "deploys", name: "Deploys", tone: "secondary" }]}
        />
      </MetralyChartCard>

      <MetralyChartCard
        title="Flow efficiency area"
        description="Completed work versus waiting time pressure."
        summary="Flow efficiency rose from 68 percent to 81 percent."
        badge={<span className="brand-badge brand-badge-success">Area</span>}
        className="chart-wide"
      >
        <MetralyAreaChart
          data={deliveryTrend}
          xKey="name"
          ariaLabel="Area chart showing flow efficiency by day"
          summary="Flow efficiency rose from 68 percent to 81 percent."
          series={[{ dataKey: "flow", name: "Flow efficiency", tone: "primary" }]}
        />
      </MetralyChartCard>

      <MetralyChartCard
        title="Delivery health composed chart"
        description="Deploys, reviews and change failure rate together."
        summary="Deployments and reviews increased while change failure rate stayed under five percent."
        badge={<span className="brand-badge brand-badge-success">Wrapper</span>}
        className="chart-wide"
      >
        <MetralyComposedChart
          data={deliveryTrend}
          xKey="name"
          ariaLabel="Composed chart showing deploys reviews and change failure rate"
          summary="Deployments and reviews increased while change failure rate stayed under five percent."
          series={[
            { dataKey: "flow", name: "Flow efficiency", kind: "area", tone: "primary" },
            { dataKey: "reviews", name: "Reviewed PRs", kind: "bar", tone: "secondary" },
            { dataKey: "failure", name: "Change failure rate", kind: "line", tone: "warning" },
          ]}
        />
      </MetralyChartCard>
    </div>
  );
}

export default RechartsShowcase;
