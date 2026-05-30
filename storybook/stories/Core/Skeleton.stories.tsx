import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MetralySkeleton } from "@metraly/ui";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Core/Skeleton",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

// MetralySkeleton variants: "text" | "card" | "table" | "widget"

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Core"
      title="MetralySkeleton"
      description="Loading placeholder for text blocks, cards, tables, and widgets."
      status="stable"
    >
      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Text (3 lines)</div>
        <div style={{ maxWidth: 320 }}>
          <MetralySkeleton variant="text" lines={3} />
        </div>
      </section>

      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Card</div>
        <div style={{ maxWidth: 300 }}>
          <MetralySkeleton variant="card" />
        </div>
      </section>

      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Widget</div>
        <div style={{ maxWidth: 300 }}>
          <MetralySkeleton variant="widget" />
        </div>
      </section>

      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Table</div>
        <MetralySkeleton variant="table" />
      </section>
    </MetralyStoryFrame>
  ),
};
