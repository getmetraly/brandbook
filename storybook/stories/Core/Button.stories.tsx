import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MetralyButton, MetralyIcon } from "@metraly/ui";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Core/Button",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Core"
      title="MetralyButton"
      description="Primary interaction primitive. Six variants, three sizes, loading state, icon slots."
      status="stable"
      tags={["interactive", "a11y"]}
    >
      {/* Variants */}
      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Variants</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <MetralyButton variant="primary">Primary</MetralyButton>
          <MetralyButton variant="secondary">Secondary</MetralyButton>
          <MetralyButton variant="ghost">Ghost</MetralyButton>
          <MetralyButton variant="neutral">Neutral</MetralyButton>
          <MetralyButton variant="danger">Danger</MetralyButton>
          <MetralyButton variant="dashed">Dashed</MetralyButton>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Sizes</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <MetralyButton variant="primary" size="sm">Small</MetralyButton>
          <MetralyButton variant="primary" size="md">Medium</MetralyButton>
          <MetralyButton variant="primary" size="lg">Large</MetralyButton>
        </div>
      </section>

      {/* Icon slots */}
      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Icon slots</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <MetralyButton variant="primary" iconLeft={<MetralyIcon name="plus" size="sm" />}>
            Add widget
          </MetralyButton>
          <MetralyButton variant="secondary" iconRight={<MetralyIcon name="chevronDown" size="sm" />}>
            Open menu
          </MetralyButton>
          <MetralyButton variant="ghost" iconLeft={<MetralyIcon name="search" size="sm" />} />
          <MetralyButton variant="neutral" iconLeft={<MetralyIcon name="settings" size="sm" />} />
        </div>
      </section>

      {/* States */}
      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>States</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <MetralyButton variant="primary" loading>Saving…</MetralyButton>
          <MetralyButton variant="primary" disabled>Disabled</MetralyButton>
          <MetralyButton variant="primary" fullWidth>Full width</MetralyButton>
        </div>
      </section>

      {/* Danger confirmation pattern */}
      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Danger confirmation</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <MetralyButton variant="ghost">Cancel</MetralyButton>
          <MetralyButton variant="danger" iconLeft={<MetralyIcon name="trash" size="sm" />}>
            Delete connector
          </MetralyButton>
        </div>
      </section>
    </MetralyStoryFrame>
  ),
};
