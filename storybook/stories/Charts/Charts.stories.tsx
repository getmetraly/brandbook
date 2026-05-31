import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  MetralyChartCard,
  MetralyLineChart,
  MetralyBarChart,
  MetralyAreaChart,
  MetralyComposedChart,
  MetralySparkline,
  StateBadge,
} from "@metraly/ui";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Charts/Charts",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

/* ── Fixtures ──────────────────────────────────────────────────────── */

const DEPLOY_FREQ = [
  { name: "May 1",  deploys: 3, hotfixes: 0 },
  { name: "May 8",  deploys: 5, hotfixes: 1 },
  { name: "May 15", deploys: 4, hotfixes: 0 },
  { name: "May 22", deploys: 6, hotfixes: 1 },
  { name: "May 29", deploys: 4, hotfixes: 2 },
];

const LEAD_TIME = [
  { name: "W1", leadTime: 3.2 },
  { name: "W2", leadTime: 2.8 },
  { name: "W3", leadTime: 1.9 },
  { name: "W4", leadTime: 2.1 },
  { name: "W5", leadTime: 1.6 },
  { name: "W6", leadTime: 1.4 },
];

const CI_DURATION = [
  { name: "Mon", duration: 4.2 },
  { name: "Tue", duration: 4.8 },
  { name: "Wed", duration: 5.5 },
  { name: "Thu", duration: 6.7 },
  { name: "Fri", duration: 6.1 },
  { name: "Sat", duration: 4.4 },
  { name: "Sun", duration: 3.9 },
];

const MTTR = [
  { name: "May 1",  mttr: 92 },
  { name: "May 8",  mttr: 64 },
  { name: "May 15", mttr: 47 },
  { name: "May 22", mttr: 58 },
  { name: "May 29", mttr: 41 },
];

const SPARKLINE_UP   = [12, 14, 11, 15, 17, 16, 19, 21, 18, 23];
const SPARKLINE_DOWN = [23, 21, 19, 22, 18, 16, 14, 15, 12, 11];
const SPARKLINE_FLAT = [15, 16, 14, 15, 16, 15, 14, 16, 15, 15];

/* ── Stories ────────────────────────────────────────────────────────── */

export const LineCharts: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Charts"
      title="MetralyLineChart"
      description="Multi-series line chart for continuous time-series engineering metrics."
      status="stable"
      tags={["charts", "data"]}
    >
      <section>
        <div className="msf__section-title">Single series — lead time</div>
        <MetralyChartCard
          title="Lead time for changes"
          description="Weeks 1–6 · days"
          summary="Down 56 % over 6 weeks. Elite threshold: ≤ 1 day."
        >
          <MetralyLineChart
            data={LEAD_TIME}
            series={[{ key: "leadTime", label: "Lead time (days)", tone: "primary" }]}
            ariaLabel="Lead time for changes over 6 weeks"
            summary="Down 56 % over 6 weeks."
          />
        </MetralyChartCard>
      </section>

      <section>
        <div className="msf__section-title">Multi-series — deploy frequency</div>
        <MetralyChartCard
          title="Deploys vs hotfixes"
          description="Last 5 sprints"
          summary="Hotfix ratio increased this sprint — review rollback procedures."
          badge={<StateBadge state="warning" label="Regression" />}
        >
          <MetralyLineChart
            data={DEPLOY_FREQ}
            series={[
              { key: "deploys",  label: "Deploys",  tone: "primary" },
              { key: "hotfixes", label: "Hotfixes", tone: "danger" },
            ]}
            ariaLabel="Deploys vs hotfixes per sprint"
            summary="Hotfix ratio increased this sprint."
          />
        </MetralyChartCard>
      </section>

      <section>
        <div className="msf__section-title">States</div>
        <div className="msf__grid msf__grid--two">
          <MetralyChartCard title="Loading" summary="" state="loading">
            <MetralyLineChart data={[]} series={[]} state="loading" ariaLabel="Loading" summary="" />
          </MetralyChartCard>
          <MetralyChartCard title="No data" summary="" state="empty">
            <MetralyLineChart data={[]} series={[]} state="empty" ariaLabel="No data" summary="" />
          </MetralyChartCard>
        </div>
      </section>
    </MetralyStoryFrame>
  ),
};

export const BarCharts: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Charts"
      title="MetralyBarChart"
      description="Vertical bar chart for categorical and periodic comparisons."
      status="stable"
      tags={["charts", "data"]}
    >
      <section>
        <div className="msf__section-title">CI duration by day</div>
        <MetralyChartCard
          title="CI build duration"
          description="Last 7 days · minutes"
          summary="Thursday spike (+60 %) correlates with monorepo cache invalidation."
          badge={<StateBadge state="warning" label="Spike" />}
        >
          <MetralyBarChart
            data={CI_DURATION}
            series={[{ key: "duration", label: "Duration (min)", tone: "primary" }]}
            ariaLabel="CI build duration last 7 days"
            summary="Thursday spike correlates with cache invalidation."
          />
        </MetralyChartCard>
      </section>

      <section>
        <div className="msf__section-title">Mobile — 430px</div>
        <div className="msf__vp-430">
          <MetralyChartCard
            title="CI build duration"
            description="Last 7 days"
            summary="Thursday spike detected."
          >
            <MetralyBarChart
              data={CI_DURATION}
              series={[{ key: "duration", label: "Duration (min)", tone: "primary" }]}
              ariaLabel="CI build duration mobile"
              summary=""
            />
          </MetralyChartCard>
        </div>
      </section>
    </MetralyStoryFrame>
  ),
};

export const AreaCharts: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Charts"
      title="MetralyAreaChart"
      description="Area chart for cumulative totals and trend emphasis."
      status="stable"
      tags={["charts", "data"]}
    >
      <section>
        <div className="msf__section-title">MTTR over time</div>
        <MetralyChartCard
          title="Mean time to restore"
          description="Last 5 sprints · minutes"
          summary="MTTR improved from 92 min to 41 min — below the 60 min target."
          badge={<StateBadge state="ok" label="On target" />}
        >
          <MetralyAreaChart
            data={MTTR}
            series={[{ key: "mttr", label: "MTTR (min)", tone: "success" }]}
            ariaLabel="Mean time to restore over 5 sprints"
            summary="Improved from 92 min to 41 min."
          />
        </MetralyChartCard>
      </section>
    </MetralyStoryFrame>
  ),
};

export const AreaChartsNarrow: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Charts"
      title="MetralyAreaChart"
      description="Narrow/mobile state with long labels and compare series."
      status="stable"
      tags={["charts", "data", "mobile", "narrow"]}
    >
      <section>
        <div className="msf__section-title">Narrow width · long labels</div>
        <div style={{ maxWidth: 340 }}>
          <MetralyChartCard
            title="Deployment Frequency by Service Grouping"
            description="Trailing 30 days · compare mode"
            summary="Ensures labels and legend stay readable at narrow widths."
            badge={<StateBadge state="live" label="Live" />}
          >
            <MetralyAreaChart
              data={DEPLOY_FREQ.map((row) => ({
                sprint: `Sprint ${row.sprint} · Platform`,
                deploys: row.deploys,
                baseline: Math.max(row.deploys - 2, 0),
              }))}
              xKey="sprint"
              series={[
                { dataKey: "deploys", name: "Deploys", tone: "primary" },
                { dataKey: "baseline", name: "Baseline", tone: "secondary" },
              ]}
              ariaLabel="Deployment frequency narrow chart"
              summary="Narrow/mobile compare state."
            />
          </MetralyChartCard>
        </div>
      </section>
    </MetralyStoryFrame>
  ),
};

export const ComposedCharts: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Charts"
      title="MetralyComposedChart"
      description="Mixed bar + line chart for overlaying volumes with rates."
      status="stable"
      tags={["charts", "data"]}
    >
      <section>
        <div className="msf__section-title">Deploys + hotfix rate</div>
        <MetralyChartCard
          title="Deploy volume + hotfix rate"
          description="Last 5 sprints"
          summary="Bars = total deploys, line = hotfixes."
        >
          <MetralyComposedChart
            data={DEPLOY_FREQ}
            series={[
              { key: "deploys",  label: "Deploys",  tone: "primary",  chartType: "bar" },
              { key: "hotfixes", label: "Hotfixes", tone: "danger",   chartType: "line" },
            ]}
            ariaLabel="Deploy volume and hotfix rate"
            summary="Bars = total deploys, line = hotfixes."
          />
        </MetralyChartCard>
      </section>
    </MetralyStoryFrame>
  ),
};

export const Sparklines: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Charts"
      title="MetralySparkline"
      description="Inline mini-chart for metric cards and table cells. No axes or labels."
      status="stable"
      tags={["charts", "data"]}
    >
      <section>
        <div className="msf__section-title">Tones</div>
        <div className="msf__stack msf__constrained-lg">
          <MetralySparkline values={SPARKLINE_UP}   ariaLabel="Deployment frequency trend — rising" tone="primary" />
          <MetralySparkline values={SPARKLINE_DOWN}  ariaLabel="Error rate trend — falling" tone="danger" />
          <MetralySparkline values={SPARKLINE_FLAT}  ariaLabel="Lead time trend — stable" tone="success" />
          <MetralySparkline values={SPARKLINE_UP}   ariaLabel="Build count — rising" tone="warning" />
        </div>
      </section>

      <section>
        <div className="msf__section-title">States</div>
        <div className="msf__stack msf__constrained-lg">
          <MetralySparkline values={[]} ariaLabel="Loading sparkline" state="loading" />
          <MetralySparkline values={[]} ariaLabel="Empty sparkline" state="empty" />
        </div>
      </section>

      <section>
        <div className="msf__section-title">Mobile — 375px</div>
        <div className="msf__vp-375">
          <div className="msf__stack">
            <MetralySparkline values={SPARKLINE_UP}  ariaLabel="Trend up mobile" tone="primary" />
            <MetralySparkline values={SPARKLINE_DOWN} ariaLabel="Trend down mobile" tone="danger" />
          </div>
        </div>
      </section>
    </MetralyStoryFrame>
  ),
};
