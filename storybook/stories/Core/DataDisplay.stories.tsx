import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  MetralyMetricCard,
  MetralyTable,
  MetralyTabs,
  MetralyIcon,
  TrendBadge,
  StateBadge,
} from "@metraly/ui";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Core/DataDisplay",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

/* ── MetralyMetricCard ─────────────────────────────────────────────── */

export const MetricCards: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Core"
      title="MetralyMetricCard"
      description="KPI surface for dashboards. Six semantic variants, comfortable and compact densities, optional icon, badge, footer, and description."
      status="stable"
      tags={["metrics", "dashboard"]}
    >
      <section>
        <div className="msf__section-title">Variants</div>
        <div className="msf__grid msf__grid--metric">
          <MetralyMetricCard
            title="Deployment frequency"
            value="4.2×/week"
            description="DORA metric — elite ≥ 1/day"
            icon={<MetralyIcon name="zap" size="md" />}
            variant="primary"
            footer={<TrendBadge direction="up" value="+18%" label="vs last sprint" />}
          />
          <MetralyMetricCard
            title="Lead time for changes"
            value="1.4 days"
            description="Time commit → production"
            icon={<MetralyIcon name="clock" size="md" />}
            variant="secondary"
            footer={<TrendBadge direction="down" value="−22%" label="vs last sprint" />}
          />
          <MetralyMetricCard
            title="Change failure rate"
            value="2.1%"
            description="Hotfixes / total deploys"
            icon={<MetralyIcon name="alertTriangle" size="md" />}
            variant="success"
          />
          <MetralyMetricCard
            title="MTTR"
            value="47 min"
            description="Mean time to restore"
            icon={<MetralyIcon name="activity" size="md" />}
            variant="warning"
            badge={<StateBadge state="warning" label="Needs attention" />}
          />
          <MetralyMetricCard
            title="Build failures"
            value="12"
            description="Last 7 days"
            icon={<MetralyIcon name="x" size="md" />}
            variant="error"
            footer={<TrendBadge direction="up" value="+4" label="vs last week" />}
          />
          <MetralyMetricCard
            title="Active connectors"
            value="8 / 10"
            description="Data sources syncing"
            icon={<MetralyIcon name="database" size="md" />}
            variant="info"
          />
        </div>
      </section>

      <section>
        <div className="msf__section-title">Compact density</div>
        <div className="msf__grid msf__grid--metric">
          <MetralyMetricCard
            title="Open PRs"
            value="23"
            variant="primary"
            density="compact"
          />
          <MetralyMetricCard
            title="Blocked pipelines"
            value="2"
            variant="error"
            density="compact"
          />
          <MetralyMetricCard
            title="Code coverage"
            value="84.2%"
            variant="success"
            density="compact"
          />
        </div>
      </section>
    </MetralyStoryFrame>
  ),
};

/* ── MetralyTabs ───────────────────────────────────────────────────── */

export const Tabs: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Core"
      title="MetralyTabs"
      description="Keyboard-accessible roving-focus tab strip. Supports counts, icons, disabled items, and a live-pulse marker."
      status="stable"
      tags={["navigation", "a11y"]}
    >
      <section>
        <div className="msf__section-title">Default</div>
        <MetralyTabs
          defaultValue="overview"
          ariaLabel="Dashboard tabs"
          items={[
            { value: "overview", label: "Overview" },
            { value: "commits", label: "Commits", count: 42 },
            { value: "prs", label: "Pull requests", count: 7 },
            { value: "pipelines", label: "Pipelines" },
            { value: "settings", label: "Settings", disabled: true },
          ]}
        />
      </section>

      <section>
        <div className="msf__section-title">With icons</div>
        <MetralyTabs
          defaultValue="connectors"
          ariaLabel="Settings tabs"
          items={[
            {
              value: "connectors",
              label: "Connectors",
              icon: <MetralyIcon name="database" size="xs" />,
            },
            {
              value: "ai",
              label: "AI providers",
              icon: <MetralyIcon name="sparkles" size="xs" />,
            },
            {
              value: "team",
              label: "Team",
              icon: <MetralyIcon name="users" size="xs" />,
            },
            {
              value: "audit",
              label: "Audit log",
              icon: <MetralyIcon name="fileText" size="xs" />,
              count: 3,
            },
          ]}
        />
      </section>

      <section>
        <div className="msf__section-title">With live pulse</div>
        <MetralyTabs
          defaultValue="live"
          ariaLabel="Live feed tabs"
          livePulse
          items={[
            { value: "live", label: "Live feed" },
            { value: "history", label: "History" },
          ]}
        />
      </section>
    </MetralyStoryFrame>
  ),
};

/* ── MetralyTable ──────────────────────────────────────────────────── */

type Connector = {
  name: string;
  kind: string;
  status: string;
  lastSync: string;
  records: string;
};

const CONNECTORS: Connector[] = [
  { name: "github/getmetraly", kind: "GitHub", status: "Healthy", lastSync: "2m ago", records: "14,230" },
  { name: "linear/ENG", kind: "Linear", status: "Healthy", lastSync: "5m ago", records: "3,891" },
  { name: "datadog/prod", kind: "Datadog", status: "Delayed", lastSync: "42m ago", records: "8,012" },
  { name: "jira/CORE", kind: "Jira", status: "Error", lastSync: "3h ago", records: "22,401" },
  { name: "pagerduty/sre", kind: "PagerDuty", status: "Healthy", lastSync: "8m ago", records: "1,244" },
];

const CONNECTOR_COLS = [
  { key: "name" as const, header: "Connector", width: "30%" },
  { key: "kind" as const, header: "Kind", width: "15%" },
  { key: "status" as const, header: "Status", width: "15%" },
  { key: "lastSync" as const, header: "Last sync", width: "20%", align: "right" as const },
  { key: "records" as const, header: "Records", width: "20%", align: "right" as const },
];

export const Table: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Core"
      title="MetralyTable"
      description="Display primitive for tabular engineering data. Supports loading/empty/error states, row markers, sticky header, and dense mode."
      status="stable"
      tags={["data", "a11y"]}
    >
      <section>
        <div className="msf__section-title">Default</div>
        <MetralyTable
          columns={CONNECTOR_COLS}
          data={CONNECTORS}
          rowKey={(row) => row.name}
          ariaLabel="Connectors"
          liveRowKeys={["github/getmetraly", "linear/ENG"]}
          unreadRowKeys={["pagerduty/sre"]}
        />
      </section>

      <section>
        <div className="msf__section-title">Loading state</div>
        <MetralyTable
          columns={CONNECTOR_COLS}
          data={[]}
          loading
          ariaLabel="Connectors loading"
        />
      </section>

      <section>
        <div className="msf__section-title">Empty state</div>
        <MetralyTable
          columns={CONNECTOR_COLS}
          data={[]}
          emptyText="No connectors configured yet"
          ariaLabel="Connectors empty"
        />
      </section>

      <section>
        <div className="msf__section-title">Error state</div>
        <MetralyTable
          columns={CONNECTOR_COLS}
          data={[]}
          error
          errorText="Failed to load connectors. Check your network and retry."
          ariaLabel="Connectors error"
        />
      </section>

      <section>
        <div className="msf__section-title">Dense mode</div>
        <MetralyTable
          columns={CONNECTOR_COLS}
          data={CONNECTORS}
          rowKey={(row) => row.name}
          ariaLabel="Connectors dense"
          dense
        />
      </section>
    </MetralyStoryFrame>
  ),
};
