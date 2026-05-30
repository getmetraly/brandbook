import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  DashboardWidget,
  MetralyGauge,
  GaugeWidgetExample,
  ActivityWidgetExample,
  InsightWidgetExample,
  StateBoardWidgetExample,
} from "@metraly/ui";
import { MetralyStoryFrame, ProductPreview } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Dashboard/DashboardWidget",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Dashboard"
      title="DashboardWidget"
      description="Widget shell with drag/resize handles, state management (ok / stale / error / loading), and a select/remove chrome layer."
      status="stable"
      tags={["dashboard", "interactive", "a11y"]}
      fullWidth
    >
      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Ready state with content</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          <DashboardWidget id="gauge-demo" title="Deployment frequency" subtitle="DORA · Last 14d">
            <MetralyGauge value={72} max={100} unit="%" tone="success" bare label="Deploy frequency" />
          </DashboardWidget>

          <DashboardWidget id="gauge-warn" title="Change failure rate" subtitle="DORA · Last 14d">
            <MetralyGauge value={4.2} max={10} unit="%" tone="warning" bare label="Failure rate" />
          </DashboardWidget>

          <DashboardWidget id="gauge-err" title="MTTR" subtitle="Incidents · Last 14d">
            <MetralyGauge value={280} max={240} unit="min" tone="danger" bare label="Mean time to restore" />
          </DashboardWidget>
        </div>
      </section>

      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Widget states</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          <DashboardWidget id="loading" title="Cycle time" loading />
          <DashboardWidget id="stale" title="PR throughput" state="stale" stateTitle="Data is stale" stateDescription="Last synced 6h ago" />
          <DashboardWidget id="error" title="Deploy count" state="error" stateTitle="Source error" stateDescription="GitHub connector returned 401" />
          <DashboardWidget id="empty" title="Custom widgets" state="noData" stateTitle="No data" stateDescription="Connect a source to see data" />
        </div>
      </section>

      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Selected state</div>
        <div style={{ maxWidth: 300 }}>
          <DashboardWidget id="selected" title="DORA Overview" subtitle="Last 14d" selected>
            <MetralyGauge value={88} max={100} unit="%" tone="success" bare label="Overall score" />
          </DashboardWidget>
        </div>
      </section>

      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Widget examples (from registry)</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          <DashboardWidget id="activity" title="Activity Feed" subtitle="Live">
            <ActivityWidgetExample />
          </DashboardWidget>
          <DashboardWidget id="insight" title="AI Insight" subtitle="Latest">
            <InsightWidgetExample />
          </DashboardWidget>
          <DashboardWidget id="state-board" title="Service health" subtitle="5 services">
            <StateBoardWidgetExample />
          </DashboardWidget>
        </div>
      </section>
    </MetralyStoryFrame>
  ),
};
