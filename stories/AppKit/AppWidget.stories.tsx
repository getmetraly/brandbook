import type { Meta, StoryObj } from "@storybook/nextjs";
import * as React from "react";
import { AppWidget, AppSparkline, AppMetric, AppMetricDelta } from "../../packages/ui/src/app-kit/AppWidget";
import { AppMetricStrip } from "../../packages/ui/src/app-kit/AppMetricStrip";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta<typeof AppWidget> = {
  title: "AppKit/AppWidget",
  component: AppWidget,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof AppWidget>;

export const Live: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <AppWidget title="Deploy frequency" subtitle="last 7d" health="live" footer={<><span>updated 4m ago</span><span>+18% vs prior</span></>}>
        <AppMetric value="42" />
        <AppMetricDelta direction="up">▲ +18% vs prior 7d</AppMetricDelta>
        <AppSparkline data={[12, 18, 22, 14, 28, 31, 42]} />
      </AppWidget>
    </div>
  ),
};

export const Stale: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <AppWidget title="Lead time p50" subtitle="commit → prod" health="stale" healthLabel="Delayed">
        <AppMetric value="2h 14m" />
        <AppMetricDelta direction="down">▼ +21% vs target</AppMetricDelta>
        <AppSparkline data={[110, 124, 100, 130, 150, 134, 154]} secondary={[90, 90, 90, 90, 90, 90, 90]} />
      </AppWidget>
    </div>
  ),
};

export const MetricStripDemo: Story = {
  name: "AppMetricStrip",
  render: () => (
    <AppMetricStrip items={[
      { id: "freq",    label: "Deploy freq",   value: "42 / wk", delta: "+18%",  deltaDirection: "up" },
      { id: "lt",      label: "Lead time p50",  value: "2h 14m", delta: "+21%",  deltaDirection: "down" },
      { id: "cfr",     label: "Failure rate",   value: "3.1%",   delta: "flat",  deltaDirection: "flat" },
      { id: "sev1",    label: "Open Sev-1",     value: "0",      delta: "clear", deltaDirection: "up" },
    ]} />
  ),
};

export const ProductPreview: Story = {
  name: "Product Preview",
  parameters: { layout: "padded" },
  render: () => (
    <MetralyStoryFrame
      category="AppKit"
      title="AppWidget"
      description="Dashboard widget shell with header, health badge, sparkline, and footer. Supports live/stale/error states and column span. Pairs with AppMetricStrip for dense metric rows."
      status="Ready"
      tags={["widget", "dashboard", "sparkline", "metrics", "app-kit"]}
    >
      <AppMetricStrip items={[
        { id: "freq",  label: "Deploy freq",  value: "42 / wk", delta: "+18%", deltaDirection: "up" },
        { id: "lt",    label: "Lead time p50", value: "2h 14m", delta: "+21%", deltaDirection: "down" },
        { id: "cfr",   label: "Failure rate",  value: "3.1%",  delta: "flat",  deltaDirection: "flat" },
        { id: "sev1",  label: "Open Sev-1",    value: "0",     delta: "clear", deltaDirection: "up" },
      ]} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 12 }}>
        <AppWidget title="Deploy frequency" subtitle="last 7d" health="live" footer={<span>updated 4m ago</span>}>
          <AppMetric value="42" />
          <AppMetricDelta direction="up">▲ +18% vs prior 7d</AppMetricDelta>
          <AppSparkline data={[12, 18, 22, 14, 28, 31, 42]} />
        </AppWidget>
        <AppWidget title="Lead time p50" subtitle="commit → prod" health="stale" healthLabel="Delayed">
          <AppMetric value="2h 14m" />
          <AppMetricDelta direction="down">▼ +21% vs target</AppMetricDelta>
          <AppSparkline data={[110, 124, 100, 130, 150, 134, 154]} secondary={[90, 90, 90, 90, 90, 90, 90]} />
        </AppWidget>
        <AppWidget title="Open Sev-1" subtitle="now" health="live" healthLabel="OK">
          <AppMetric value="0" />
          <AppMetricDelta direction="up">No active incidents</AppMetricDelta>
          <AppSparkline data={[0, 1, 0, 0, 2, 0, 0]} />
        </AppWidget>
      </div>
    </MetralyStoryFrame>
  ),
};
