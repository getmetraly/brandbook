import { StateBadge } from "@metraly/ui";
import {
  MetralyAreaChart,
  MetralyBarChart,
  MetralyChartCard,
  MetralyComposedChart,
  MetralyLineChart,
  MetralySparkline,
} from "@metraly/ui/charts";

const chartData = [
  { name: "Mon", review: 8.4, deploys: 14, flow: 72, failure: 4.6 },
  { name: "Tue", review: 7.8, deploys: 17, flow: 74, failure: 4.1 },
  { name: "Wed", review: 6.2, deploys: 21, flow: 77, failure: 3.9 },
  { name: "Thu", review: 5.8, deploys: 20, flow: 80, failure: 4.2 },
  { name: "Fri", review: 5.4, deploys: 24, flow: 82, failure: 3.6 },
];

function StateGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="claude-state-group" aria-label={title}>
      <header className="claude-state-group-head">
        <strong>{title}</strong>
        <span className="claude-readiness">Phase 4</span>
      </header>
      <div className="claude-state-grid">{children}</div>
    </section>
  );
}

function StateCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="claude-state-cell">
      <span className="claude-state-cell-label">{label}</span>
      <div>{children}</div>
    </div>
  );
}

export default function ChartsPrototypeConformancePage() {
  return (
    <main className="claude-state-board" aria-label="Phase 4 chart prototype conformance examples">
      <header className="claude-preview-section-head">
        <span className="draft-kicker">Prototype conformance · Phase 4</span>
        <h1>Charts and engineering dashboard signals</h1>
        <p>
          Chart family matrix for card states, sparkline states, Recharts wrapper contracts, badge slots,
          tooltip-readable series, and dashboard integration examples.
        </p>
      </header>

      <StateGroup title="MetralyChartCard states">
        <StateCell label="default + badge">
          <MetralyChartCard title="Cycle time" description="PR open to production" summary="Cycle time improved this sprint." badge={<StateBadge state="live" />}>
            <MetralyLineChart
              ariaLabel="Cycle time line chart"
              data={chartData}
              series={[{ dataKey: "review", name: "Review latency", tone: "primary" }]}
              summary="Review latency improved from 8.4h to 5.4h."
              height={220}
            />
          </MetralyChartCard>
        </StateCell>
        <StateCell label="loading">
          <MetralyChartCard title="Loading chart" summary="Waiting for source" state="loading" />
        </StateCell>
        <StateCell label="no data">
          <MetralyChartCard title="No data chart" summary="No chart data in this range" state="noData" />
        </StateCell>
        <StateCell label="error">
          <MetralyChartCard title="Error chart" summary="Source disconnected" state="error" />
        </StateCell>
      </StateGroup>

      <StateGroup title="MetralySparkline states">
        <StateCell label="default">
          <MetralySparkline ariaLabel="Flow sparkline" values={[72, 74, 77, 80, 82]} />
        </StateCell>
        <StateCell label="secondary tone">
          <MetralySparkline ariaLabel="Deployments sparkline" values={[14, 17, 21, 20, 24]} tone="secondary" />
        </StateCell>
        <StateCell label="loading">
          <MetralySparkline ariaLabel="Loading sparkline" values={[]} state="loading" />
        </StateCell>
        <StateCell label="empty">
          <MetralySparkline ariaLabel="Empty sparkline" values={[]} />
        </StateCell>
        <StateCell label="error">
          <MetralySparkline ariaLabel="Error sparkline" values={[]} state="error" />
        </StateCell>
      </StateGroup>

      <StateGroup title="Chart wrappers">
        <StateCell label="line">
          <MetralyLineChart
            ariaLabel="Review latency line chart"
            data={chartData}
            series={[{ dataKey: "review", name: "Review latency", tone: "primary" }]}
            summary="Review latency decreased through the week."
            height={220}
          />
        </StateCell>
        <StateCell label="area">
          <MetralyAreaChart
            ariaLabel="Flow efficiency area chart"
            data={chartData}
            series={[{ dataKey: "flow", name: "Flow efficiency", tone: "primary" }]}
            summary="Flow efficiency improved to 82%."
            height={220}
          />
        </StateCell>
        <StateCell label="bar">
          <MetralyBarChart
            ariaLabel="Deployments bar chart"
            data={chartData}
            series={[{ dataKey: "deploys", name: "Deployments", tone: "secondary" }]}
            summary="Deployments increased to 24 per day."
            height={220}
          />
        </StateCell>
        <StateCell label="composed">
          <MetralyComposedChart
            ariaLabel="Delivery composed chart"
            data={chartData}
            series={[
              { dataKey: "deploys", name: "Deployments", kind: "bar", tone: "secondary" },
              { dataKey: "flow", name: "Flow efficiency", kind: "area", tone: "primary" },
              { dataKey: "failure", name: "Failure rate", kind: "line", tone: "warning" },
            ]}
            summary="Deployments and flow improved while failure rate declined."
            height={260}
          />
        </StateCell>
      </StateGroup>

      <StateGroup title="Wrapper fallback states">
        <StateCell label="empty line">
          <MetralyLineChart ariaLabel="Empty line chart" data={[]} series={[{ dataKey: "review", name: "Review" }]} summary="No line data" />
        </StateCell>
        <StateCell label="loading area">
          <MetralyAreaChart ariaLabel="Loading area chart" data={[]} series={[{ dataKey: "flow", name: "Flow" }]} summary="Loading area data" state="loading" />
        </StateCell>
        <StateCell label="error bar">
          <MetralyBarChart ariaLabel="Error bar chart" data={[]} series={[{ dataKey: "deploys", name: "Deploys" }]} summary="Bar chart disconnected" state="error" />
        </StateCell>
        <StateCell label="no data composed">
          <MetralyComposedChart ariaLabel="No data composed chart" data={[]} series={[]} summary="No composed data" state="noData" />
        </StateCell>
      </StateGroup>
    </main>
  );
}
