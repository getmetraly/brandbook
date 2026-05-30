import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MetralyIcon, metralyIconPaths } from "@metraly/ui";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Core/Icon",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

export const Library: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Core"
      title="MetralyIcon"
      description="Inline SVG icon primitive. All icons from metralyIconPaths displayed at sm/md/lg sizes."
      status="stable"
      fullWidth
    >
      <section>
        <div className="msf__section-title">All icons (md)</div>
        <div className="msf__grid msf__grid--icons">
          {(Object.keys(metralyIconPaths) as Array<keyof typeof metralyIconPaths>).map((name) => (
            <div
              key={name}
              className="msf__icon-cell"
            >
              <MetralyIcon name={name} size="md" />
              <span className="msf__icon-name">
                {name}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="msf__section-title">Sizes</div>
        <div className="msf__row msf__row--gap-lg">
          <MetralyIcon name="home" size="xs" />
          <MetralyIcon name="home" size="sm" />
          <MetralyIcon name="home" size="md" />
          <MetralyIcon name="home" size="lg" />
          <MetralyIcon name="home" size="xl" />
        </div>
      </section>
    </MetralyStoryFrame>
  ),
};
