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
        <div className="msf__section-title">Text (3 lines)</div>
        <div className="msf__constrained-sm">
          <MetralySkeleton variant="text" lines={3} />
        </div>
      </section>

      <section>
        <div className="msf__section-title">Card</div>
        <div className="msf__constrained-sm">
          <MetralySkeleton variant="card" />
        </div>
      </section>

      <section>
        <div className="msf__section-title">Widget</div>
        <div className="msf__constrained-sm">
          <MetralySkeleton variant="widget" />
        </div>
      </section>

      <section>
        <div className="msf__section-title">Table</div>
        <MetralySkeleton variant="table" />
      </section>
    </MetralyStoryFrame>
  ),
};
