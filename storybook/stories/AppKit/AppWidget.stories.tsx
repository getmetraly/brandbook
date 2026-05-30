import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { AppWidget, AppSparkline, AppMetric, AppMetricDelta, AppMetricStrip } from "@metraly/ui";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "AppKit/AppWidget",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

const SPARK_DATA = [4, 6, 5, 8, 7, 9, 11, 10, 13, 12, 14, 15];

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="AppKit"
      title="AppWidget + AppMetricStrip"
      description="Widget card and metric strip from the App Kit. AppMetric/AppMetricDelta/AppSparkline compose inside AppWidget."
      status="stable"
      tags={["appkit"]}
      fullWidth
    >
      <section>
        <div className="msf__section-title">Health states</div>
        <div className="msf__grid msf__grid--metric">
          <AppWidget title="Deploy frequency" subtitle="DORA · Last 14d" health="live">
            <AppMetric value="8.4 / wk" size="lg" />
            <AppMetricDelta direction="up">▲ +1.2 vs prev period</AppMetricDelta>
            <AppSparkline data={SPARK_DATA} />
          </AppWidget>

          <AppWidget title="Change failure rate" subtitle="DORA · Last 14d" health="live">
            <AppMetric value="4.1%" size="lg" />
            <AppMetricDelta direction="up">▲ +0.8% vs prev period</AppMetricDelta>
          </AppWidget>

          <AppWidget title="MTTR" subtitle="Incidents · Last 14d" health="stale" healthLabel="Stale — synced 6h ago">
            <AppMetric value="210 min" size="lg" />
          </AppWidget>

          <AppWidget title="Lead time" subtitle="DORA · Last 14d" health="error" healthLabel="Source error">
            <AppMetric value="—" />
          </AppWidget>
        </div>
      </section>

      <section>
        <div className="msf__section-title">AppMetricStrip</div>
        <AppMetricStrip
          items={[
            { id: "deploys",   label: "Deploy frequency",    value: "8.4/wk",  delta: "▲ +1.2",   deltaDirection: "up" },
            { id: "failure",   label: "Change failure rate", value: "4.1%",    delta: "▲ +0.8%",  deltaDirection: "up" },
            { id: "mttr",      label: "MTTR",                value: "210 min", delta: "▼ −40 min", deltaDirection: "down" },
            { id: "lead-time", label: "Lead time",           value: "2.1d",    delta: "▼ −0.4d",  deltaDirection: "down" },
          ]}
        />
      </section>
    </MetralyStoryFrame>
  ),
};
