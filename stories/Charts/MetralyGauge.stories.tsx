import type { Meta, StoryObj } from "@storybook/nextjs";
import * as React from "react";
import { MetralyGauge } from "../../packages/ui/src/charts/MetralyGauge";
import { CardShell } from "../../packages/ui/src/components/CardShell";
import { DashboardWidget } from "../../packages/ui/src/dashboard/DashboardWidget";
import {
  WidgetStateMatrix,
} from "../../packages/ui/src/components/WidgetStateMatrix";
import { GaugeWidgetExample } from "../../packages/ui/src/dashboard/DashboardWidgetExamples";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta<typeof MetralyGauge> = {
  title: "Charts/MetralyGauge",
  component: MetralyGauge,
  decorators: [
    (Story) => React.createElement("div", { style: { maxWidth: 720 } }, React.createElement(Story)),
  ],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "First-class gauge primitive. Use for DORA scores, SLA saturation, connector health, AI provider confidence. Composes inside DashboardWidget, MetralyChartCard, and Source Health cards without modification.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof MetralyGauge>;

// ── basic ──────────────────────────────────────────────────────────────────

export const HealthScore: Story = {
  args: {
    label: "Source health",
    description: "Composite of latency, error rate, and freshness over the last 24 h",
    value: 86,
    unit: "%",
    thresholds: [
      { value: 0, tone: "danger", label: "Critical" },
      { value: 60, tone: "warning", label: "At risk" },
      { value: 80, tone: "success", label: "Healthy" },
    ],
  },
};

export const WarningThreshold: Story = {
  args: {
    label: "Lead time score",
    description: "Lead time for changes vs. elite target",
    value: 64,
    unit: "%",
    thresholds: [
      { value: 0, tone: "danger" },
      { value: 60, tone: "warning" },
      { value: 80, tone: "success" },
    ],
    summary: "vs target 90%",
  },
};

export const DangerThreshold: Story = {
  args: {
    label: "Change failure rate",
    description: "Failed deploys / total deploys over 14 d",
    value: 22,
    unit: "%",
    thresholds: [
      { value: 0, tone: "success" },
      { value: 10, tone: "warning" },
      { value: 20, tone: "danger" },
    ],
  },
};

export const CompactConnectorHealth: Story = {
  args: {
    label: "GitHub Actions",
    value: 93,
    unit: "%",
    variant: "compact",
    thresholds: [
      { value: 0, tone: "danger" },
      { value: 70, tone: "warning" },
      { value: 90, tone: "success" },
    ],
  },
  parameters: { docs: { description: { story: "Compact dial inside a connectors card. Threshold ticks suppressed for density." } } },
};

export const InlineTableUsage: Story = {
  render: () => (
    <CardShell>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, alignItems: "center" }}>
        <div>
          <div style={{ color: "var(--m-fg-0)", fontWeight: 600, fontSize: 13 }}>core-api · prod</div>
          <div style={{ color: "var(--m-fg-2)", fontSize: 11.5 }}>SLA 99.9% · last 7 d</div>
        </div>
        <MetralyGauge
          value={99.62}
          unit="%"
          variant="inline"
          thresholds={[
            { value: 0, tone: "danger" },
            { value: 99, tone: "warning" },
            { value: 99.9, tone: "success" },
          ]}
          ariaLabel-data-unused="see label prop instead"
          label="SLA saturation"
        />
      </div>
    </CardShell>
  ),
};

// ── states ─────────────────────────────────────────────────────────────────

export const Loading: Story = {
  args: { label: "Source health", value: 0, state: "loading" },
};
export const Empty: Story = {
  args: { label: "Source health", value: undefined, state: "empty" },
};
export const Stale: Story = {
  args: { label: "Source health", value: 72, state: "stale", unit: "%", summary: "last update 2 h ago" },
};
export const Partial: Story = {
  args: { label: "Source health", value: 81, state: "partial", unit: "%" },
};
export const ErrorState: Story = {
  args: { label: "Source health", value: 0, state: "error", onRetry: () => {} },
};
export const AuthFailed: Story = {
  args: { label: "Source health", value: 0, state: "auth_failed", onRetry: () => {} },
};
export const RateLimited: Story = {
  args: { label: "Source health", value: 0, state: "rate_limited", onRetry: () => {} },
};

// ── widget-shell composition ──────────────────────────────────────────────

export const InsideDashboardWidget: Story = {
  render: () => (
    <div style={{ maxWidth: 340 }}>
      <GaugeWidgetExample
        title="Lead time score"
        subtitle="rolling 14 d"
        gauge={{
          value: 78,
          unit: "%",
          thresholds: [
            { value: 0, tone: "danger" },
            { value: 60, tone: "warning" },
            { value: 80, tone: "success" },
          ],
          label: "Lead time score",
        }}
        onDrilldown={() => {}}
      />
    </div>
  ),
};

export const InsideSourceHealthCard: Story = {
  render: () => (
    <CardShell>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 220px", gap: 16, alignItems: "center" }}>
        <div>
          <div style={{ color: "var(--m-fg-0)", fontWeight: 600 }}>GitHub · acme</div>
          <div style={{ color: "var(--m-fg-2)", fontSize: 12 }}>Synced 2026-05-15 10:42 · 4 repos</div>
          <ul style={{ listStyle: "none", padding: 0, margin: "8px 0 0", display: "flex", gap: 8, color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)", fontSize: 11 }}>
            <li>latency 220 ms</li>
            <li>error 0.4%</li>
            <li>freshness 4 m</li>
          </ul>
        </div>
        <MetralyGauge
          label="Health"
          value={91}
          unit="%"
          thresholds={[
            { value: 0, tone: "danger" },
            { value: 70, tone: "warning" },
            { value: 90, tone: "success" },
          ]}
          variant="compact"
        />
      </div>
    </CardShell>
  ),
};

export const InsideDORAOverview: Story = {
  render: () => (
    <CardShell>
      <header style={{ marginBottom: 12 }}>
        <div style={{ color: "var(--m-fg-0)", fontWeight: 600 }}>DORA overview</div>
        <div style={{ color: "var(--m-fg-2)", fontSize: 12 }}>Platform team · last 14 d</div>
      </header>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {[
          { label: "Lead time", value: 78 },
          { label: "Deploy freq", value: 92 },
          { label: "Change fail", value: 41 },
          { label: "MTTR", value: 65 },
        ].map((m) => (
          <MetralyGauge
            key={m.label}
            label={m.label}
            value={m.value}
            unit="%"
            variant="compact"
            thresholds={[
              { value: 0, tone: "danger" },
              { value: 60, tone: "warning" },
              { value: 80, tone: "success" },
            ]}
          />
        ))}
      </div>
    </CardShell>
  ),
};

// ── widget state matrix ───────────────────────────────────────────────────

export const FullStateMatrix: Story = {
  render: () => (
    <WidgetStateMatrix
      title="MetralyGauge — widget state matrix"
      description="Every WidgetState status rendered with the same gauge."
      columns={4}
      render={(s) => (
        <MetralyGauge
          label="Source health"
          value={s === "ready" || s === "partial" || s === "stale" ? 82 : undefined}
          unit="%"
          variant="compact"
          state={s}
          thresholds={[
            { value: 0, tone: "danger" },
            { value: 60, tone: "warning" },
            { value: 80, tone: "success" },
          ]}
        />
      )}
    />
  ),
};

export const ProductPreview: Story = {
  name: "Product Preview",
  parameters: { layout: "padded" },
  render: () => (
    <MetralyStoryFrame
      category="Charts"
      title="MetralyGauge"
      description="Health score gauge for DORA metrics, SLA saturation, and connector health. Composes inside DashboardWidget and MetralyChartCard."
      status="Ready"
      tags={["gauge", "DORA", "health", "SLA"]}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <MetralyGauge
          label="Source health"
          description="Composite score over 24h"
          value={86}
          unit="%"
          thresholds={[
            { value: 0, tone: "danger", label: "Critical" },
            { value: 60, tone: "warning", label: "At risk" },
            { value: 80, tone: "success", label: "Healthy" },
          ]}
        />
        <MetralyGauge
          label="Lead time score"
          description="Lead time for changes vs. elite target"
          value={64}
          unit="%"
          thresholds={[
            { value: 0, tone: "danger" },
            { value: 60, tone: "warning" },
            { value: 80, tone: "success" },
          ]}
          summary="vs target 90%"
        />
        <MetralyGauge
          label="Change failure rate"
          description="Failed deploys / total deploys over 14d"
          value={22}
          unit="%"
          thresholds={[
            { value: 0, tone: "success" },
            { value: 10, tone: "warning" },
            { value: 20, tone: "danger" },
          ]}
        />
      </div>
    </MetralyStoryFrame>
  ),
};
