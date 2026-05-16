import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { StateBoard, type StateBoardItem } from "../../packages/ui/src/components/StateBoard";
import { StateBoardWidgetExample } from "../../packages/ui/src/dashboard/DashboardWidgetExamples";
import { WidgetStateMatrix } from "../../packages/ui/src/components/WidgetStateMatrix";

const meta: Meta<typeof StateBoard> = {
  title: "Components/StateBoard",
  component: StateBoard,
  decorators: [
    (Story) => React.createElement("div", { style: { maxWidth: 720 } }, React.createElement(Story)),
  ],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof StateBoard>;

const SOURCE_HEALTH: StateBoardItem[] = [
  { id: "gh-acme",   label: "GitHub · acme",        hint: "4 repos · synced 2 m ago",     status: "ok",      meter: "98%",        timestamp: "10:40" },
  { id: "gh-fe",     label: "GitHub · frontend",    hint: "2 repos · synced 4 m ago",     status: "ok",      meter: "96%",        timestamp: "10:38" },
  { id: "jira-prod", label: "Jira · prod",          hint: "Throttled · 92% quota",         status: "warning", meter: "throttled",  timestamp: "10:36" },
  { id: "linear",    label: "Linear · platform",    hint: "Auth failed at 10:20",          status: "danger",  meter: "—",          timestamp: "10:20" },
  { id: "actions",   label: "GitHub Actions",       hint: "syncing batch 12/14",           status: "info",    meter: "12/14",      timestamp: "live" },
];

const SERVICE_STATUS: StateBoardItem[] = [
  { id: "api",      label: "core-api",   status: "ok",      meter: "p99 220ms", timestamp: "now" },
  { id: "pay",      label: "payments",   status: "warning", meter: "p99 480ms", timestamp: "now", hint: "elevated latency on /checkout" },
  { id: "ingest",   label: "ingest",     status: "ok",      meter: "p99 90ms",  timestamp: "now" },
  { id: "sched",    label: "scheduler",  status: "neutral", meter: "—",         timestamp: "—",   hint: "no traffic in window" },
  { id: "search",   label: "search",     status: "danger",  meter: "p99 1200ms", timestamp: "now", hint: "above SLO budget" },
  { id: "billing",  label: "billing",    status: "ok",      meter: "p99 310ms", timestamp: "now" },
];

const PLUGIN_RUNTIME: StateBoardItem[] = [
  { id: "p1", label: "metraly-jira-extras",      hint: "version 0.4.1", status: "ok",       meter: "ready" },
  { id: "p2", label: "metraly-pagerduty",        hint: "version 0.2.0", status: "warning",  meter: "rate limited", timestamp: "since 09:55" },
  { id: "p3", label: "metraly-onprem-mssql",     hint: "version 0.1.0-beta", status: "gated", meter: "trial expires 06-01" },
  { id: "p4", label: "metraly-anthropic-byo",    hint: "AI provider · contributes to Settings", status: "ok", meter: "ready" },
];

export const SourceHealth: Story = {
  args: { title: "Source health", items: SOURCE_HEALTH, variant: "grid" },
};

export const ServiceStatus: Story = {
  args: { title: "Service status", description: "Production · last 5 min", items: SERVICE_STATUS, variant: "list" },
};

export const PluginRuntimes: Story = {
  args: { title: "Plugin runtime status", items: PLUGIN_RUNTIME, variant: "list" },
};

// ── widget-shell composition ─────────────────────────────────────────────────

export const InsideWidget: Story = {
  render: () => (
    <div style={{ maxWidth: 380 }}>
      <StateBoardWidgetExample
        title="Source health"
        subtitle="5 sources"
        board={{
          title: "Source health",
          items: SOURCE_HEALTH,
          variant: "list",
        }}
        onDrilldown={() => {}}
      />
    </div>
  ),
};

// ── states ───────────────────────────────────────────────────────────────────


export const Loading: Story = { args: { items: [], state: "loading", title: "Source health" } };
export const Empty: Story = { args: { items: [], state: "empty", title: "Source health" } };
export const ErrorState: Story = { args: { items: [], state: "error", title: "Source health" } };
export const Stale: Story = { args: { items: SOURCE_HEALTH, state: "stale", title: "Source health" } };
export const Partial: Story = { args: { items: SOURCE_HEALTH.slice(0, 3), state: "partial", title: "Source health" } };

export const FullStateMatrix: Story = {
  render: () => (
    <WidgetStateMatrix
      title="StateBoard — widget state matrix"
      columns={3}
      render={(s) => (
        <StateBoard
          title="Source health"
          items={s === "ready" || s === "partial" || s === "stale" ? SOURCE_HEALTH.slice(0, 3) : []}
          state={s}
          variant="list"
          frame={false}
          showSummary={false}
        />
      )}
    />
  ),
};
