import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { AppDashboardScreen } from "@metraly/ui";
import { MetralyStoryFrame, ProductPreview } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "AppKit/AppDashboardScreen",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

/**
 * ProductPreview — renders the full AppDashboardScreen at bounded width.
 * The component ships its own default nav, DORA metric strip, service health
 * table, and at-risk PR list; no additional fixture data needed.
 */
export const ProductPreviewStory: Story = {
  name: "ProductPreview",
  render: () => (
    <MetralyStoryFrame
      category="AppKit"
      title="AppDashboardScreen"
      description="Full-composition screen: sidebar + topbar + DORA metric strip + service health + at-risk PRs. Controlled via sections/activeId/onNav."
      status="stable"
      tags={["appkit", "screen", "product-preview"]}
      fullscreen
    >
      <ProductPreview>
        <div className="msf__viewport-h">
          <AppDashboardScreen />
        </div>
      </ProductPreview>
    </MetralyStoryFrame>
  ),
  parameters: { layout: "fullscreen" },
};

export const CustomNav: Story = {
  render: () => (
    <MetralyStoryFrame
      category="AppKit"
      title="AppDashboardScreen — custom nav"
      description="Demonstrates overriding nav sections and active item."
      status="stable"
      fullscreen
    >
      <ProductPreview>
        <div className="msf__viewport-h">
          <AppDashboardScreen
            title="DevOps / SRE"
            subtitle="Incident & reliability view"
            activeId="dash-devops"
          />
        </div>
      </ProductPreview>
    </MetralyStoryFrame>
  ),
  parameters: { layout: "fullscreen" },
};
