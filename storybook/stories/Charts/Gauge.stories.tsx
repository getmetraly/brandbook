import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MetralyGauge } from "@metraly/ui";
import { MetralyStoryFrame, ProductPreview } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Charts/Gauge",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Charts"
      title="MetralyGauge"
      description="Health / risk / saturation / score gauge. Variants: semicircle | compact | inline. Semantic tone driven by thresholds or explicit tone prop."
      status="stable"
      tags={["chart", "a11y", "DORA"]}
      fullWidth
    >
      {/* Tones */}
      <section>
        <div className="msf__section-title">Tones (semicircle, default)</div>
        <div className="msf__grid msf__grid--wide">
          <MetralyGauge value={94} label="Uptime" unit="%" tone="success"  description="30-day rolling" />
          <MetralyGauge value={72} label="Deploy frequency" unit="/wk" tone="neutral"  description="DORA metric" />
          <MetralyGauge value={4.2} max={10} label="Change failure rate" unit="%" tone="warning" description="Target < 5%" />
          <MetralyGauge value={280} max={240} label="MTTR" unit="min" tone="danger" description="Target < 240 min" />
        </div>
      </section>

      {/* Threshold-driven */}
      <section>
        <div className="msf__section-title">Threshold-driven coloring</div>
        <div className="msf__grid msf__grid--wide">
          <MetralyGauge
            value={68}
            label="Error rate"
            unit="%"
            thresholds={[
              { value: 0,  tone: "success", label: "Healthy" },
              { value: 60, tone: "warning", label: "Degraded" },
              { value: 80, tone: "danger",  label: "Critical" },
            ]}
            showThresholdTicks
            description="3-zone threshold"
          />
          <MetralyGauge
            value={42}
            label="Cycle time"
            unit="h"
            thresholds={[
              { value: 0,  tone: "success" },
              { value: 48, tone: "warning" },
              { value: 72, tone: "danger"  },
            ]}
            description="Lead time for changes"
          />
        </div>
      </section>

      {/* Variants */}
      <section>
        <div className="msf__section-title">Variants</div>
        <div className="msf__stack msf__stack--lg msf__constrained-2xl">
          <div>
            <div className="msf__eyebrow">semicircle</div>
            <MetralyGauge value={78} label="Confidence" unit="%" variant="semicircle" tone="success" />
          </div>
          <div>
            <div className="msf__eyebrow">compact</div>
            <MetralyGauge value={78} label="Confidence" unit="%" variant="compact" tone="success" />
          </div>
          <div>
            <div className="msf__eyebrow">inline</div>
            <MetralyGauge value={78} label="Confidence" unit="%" variant="inline" tone="success" />
          </div>
        </div>
      </section>

      {/* Widget states */}
      <section>
        <div className="msf__section-title">Widget states</div>
        <div className="msf__grid">
          <MetralyGauge value={undefined} state="loading" label="Loading" />
          <MetralyGauge value={undefined} state="empty"   label="No data" />
          <MetralyGauge value={undefined} state="error"   label="Error"   onRetry={() => undefined} />
          <MetralyGauge value={undefined} state="stale"   label="Stale"   />
          <MetralyGauge value={undefined} state="auth_failed" label="Auth failed" onRetry={() => undefined} />
        </div>
      </section>
    </MetralyStoryFrame>
  ),
};
