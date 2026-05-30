import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { StateBoard } from "@metraly/ui";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Dashboard/StateBoard",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

const CONNECTOR_ITEMS = [
  {
    id: "github",
    label: "github/getmetraly",
    hint: "GitHub · 14,230 records",
    status: "ok" as const,
    meter: "14,230 rec",
    timestamp: "2m ago",
  },
  {
    id: "linear",
    label: "linear/ENG",
    hint: "Linear · Sprint board",
    status: "ok" as const,
    meter: "3,891 rec",
    timestamp: "5m ago",
  },
  {
    id: "datadog",
    label: "datadog/prod",
    hint: "Datadog · Metrics",
    status: "warning" as const,
    statusLabel: "Delayed",
    meter: "8,012 rec",
    timestamp: "42m ago",
  },
  {
    id: "jira",
    label: "jira/CORE",
    hint: "Jira · Project tracker",
    status: "danger" as const,
    statusLabel: "Error",
    timestamp: "3h ago",
  },
  {
    id: "pagerduty",
    label: "pagerduty/sre",
    hint: "PagerDuty · On-call",
    status: "ok" as const,
    meter: "1,244 rec",
    timestamp: "8m ago",
  },
  {
    id: "sentry",
    label: "sentry/prod",
    hint: "Sentry · Error tracking",
    status: "gated" as const,
    statusLabel: "Gated",
  },
];

const PIPELINE_ITEMS = [
  { id: "p1", label: "monorepo-full-build", status: "ok" as const, meter: "4m 12s", timestamp: "3m ago" },
  { id: "p2", label: "deploy-staging", status: "ok" as const, meter: "1m 44s", timestamp: "8m ago" },
  { id: "p3", label: "e2e-suite", status: "warning" as const, meter: "12m 30s", timestamp: "22m ago" },
  { id: "p4", label: "unit-tests", status: "danger" as const, meter: "—", timestamp: "1h ago" },
  { id: "p5", label: "security-scan", status: "ok" as const, meter: "5m 08s", timestamp: "15m ago" },
  { id: "p6", label: "docs-build", status: "disabled" as const },
];

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Dashboard"
      title="StateBoard"
      description="System-health overview grid for connectors, pipelines, and services. Grid and list variants with summary chip strip."
      status="stable"
      tags={["health", "status", "dashboard"]}
    >
      <section>
        <div className="msf__section-title">Grid variant — connectors</div>
        <StateBoard
          title="Data connectors"
          description="Sync health across all configured data sources"
          items={CONNECTOR_ITEMS}
          variant="grid"
          showSummary
          frame
        />
      </section>

      <section>
        <div className="msf__section-title">List variant — pipelines</div>
        <StateBoard
          title="CI pipelines"
          items={PIPELINE_ITEMS}
          variant="list"
          showSummary
          frame
        />
      </section>

      <section>
        <div className="msf__section-title">Loading state</div>
        <StateBoard
          title="Data connectors"
          items={[]}
          state="loading"
          variant="grid"
          frame
        />
      </section>

      <section>
        <div className="msf__section-title">Empty state</div>
        <StateBoard
          title="Data connectors"
          items={[]}
          state="idle"
          variant="grid"
          frame
          emptyLabel="No connectors configured — add one to start monitoring"
        />
      </section>
    </MetralyStoryFrame>
  ),
};
