import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MetralyBadge, StateBadge, StatusBadge, TrendBadge, PulseMarker } from "@metraly/ui";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Core/Badges",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Core"
      title="Badges & Status"
      description="MetralyBadge, StateBadge, StatusBadge, TrendBadge, and PulseMarker — the full status communication suite."
      status="stable"
      tags={["status", "a11y"]}
    >
      {/* StatusBadge — uses StatusBadgeStatus strings */}
      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>StatusBadge</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <StatusBadge status="Live" />
          <StatusBadge status="Preview" />
          <StatusBadge status="In progress" />
          <StatusBadge status="Gated" />
          <StatusBadge status="Error" />
          <StatusBadge status="Delayed" />
          <StatusBadge status="No data" />
          <StatusBadge status="Planned" />
        </div>
      </section>

      {/* StateBadge — uses StateBadgeState */}
      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>StateBadge</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <StateBadge state="live" />
          <StateBadge state="ok" />
          <StateBadge state="new" />
          <StateBadge state="stale" />
          <StateBadge state="error" />
          <StateBadge state="warning" />
          <StateBadge state="disabled" />
          <StateBadge state="disconnected" />
          <StateBadge state="noData" />
        </div>
      </section>

      {/* MetralyBadge — freeform label with semantic variant */}
      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>MetralyBadge</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <MetralyBadge>preview</MetralyBadge>
          <MetralyBadge variant="success">stable</MetralyBadge>
          <MetralyBadge variant="warning">beta</MetralyBadge>
          <MetralyBadge variant="error">deprecated</MetralyBadge>
          <MetralyBadge variant="info">gated</MetralyBadge>
          <MetralyBadge variant="secondary">secondary</MetralyBadge>
        </div>
      </section>

      {/* TrendBadge — direction + sentiment */}
      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>TrendBadge</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <TrendBadge direction="up"   sentiment="positive" value="+12%" />
          <TrendBadge direction="up"   sentiment="negative" value="+5.2%" />
          <TrendBadge direction="down" sentiment="positive" value="-8%" />
          <TrendBadge direction="down" sentiment="negative" value="-3%" />
          <TrendBadge direction="flat" sentiment="neutral"  value="0%" />
        </div>
      </section>

      {/* PulseMarker — tone: live | new | info | warning | error */}
      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>PulseMarker</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
          <PulseMarker tone="live"    ariaLabel="Live" />
          <PulseMarker tone="new"     ariaLabel="New" />
          <PulseMarker tone="info"    ariaLabel="Info" />
          <PulseMarker tone="warning" ariaLabel="Warning" />
          <PulseMarker tone="error"   ariaLabel="Error" />
          <PulseMarker tone="live"    pulse={false} ariaLabel="Static (no pulse)" />
        </div>
      </section>
    </MetralyStoryFrame>
  ),
};
