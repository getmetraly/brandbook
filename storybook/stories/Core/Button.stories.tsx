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
        <div className="msf__section-title">Variants</div>
        <div className="msf__row msf__row--wrap">
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
        <div className="msf__section-title">Sizes</div>
        <div className="msf__row msf__row--wrap">
          <MetralyButton variant="primary" size="sm">Small</MetralyButton>
          <MetralyButton variant="primary" size="md">Medium</MetralyButton>
          <MetralyButton variant="primary" size="lg">Large</MetralyButton>
        </div>
      </section>

      {/* Icon slots */}
      <section>
        <div className="msf__section-title">Icon slots</div>
        <div className="msf__row msf__row--wrap">
          <MetralyButton variant="primary" iconLeft={<MetralyIcon name="plus" size="sm" />}>
            Add widget
          </MetralyButton>
          <MetralyButton variant="secondary" iconRight={<MetralyIcon name="chevronDown" size="sm" />}>
            Open menu
          </MetralyButton>
          <MetralyButton variant="ghost" iconLeft={<MetralyIcon name="search" size="sm" />} aria-label="Search" />
          <MetralyButton variant="neutral" iconLeft={<MetralyIcon name="settings" size="sm" />} aria-label="Open settings" />
        </div>
      </section>

      {/* States */}
      <section>
        <div className="msf__section-title">States</div>
        <div className="msf__row msf__row--wrap">
          <MetralyButton variant="primary" loading>Saving…</MetralyButton>
          <MetralyButton variant="primary" disabled>Disabled</MetralyButton>
          <MetralyButton variant="primary" fullWidth>Full width</MetralyButton>
        </div>
      </section>

      {/* Danger confirmation pattern */}
      <section>
        <div className="msf__section-title">Danger confirmation</div>
        <div className="msf__row msf__row--wrap">
          <MetralyButton variant="ghost">Cancel</MetralyButton>
          <MetralyButton variant="danger" iconLeft={<MetralyIcon name="trash" size="sm" />}>
            Delete connector
          </MetralyButton>
        </div>
      </section>
    </MetralyStoryFrame>
  ),
};
