import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { AppIconLibrary } from "@metraly/ui";
import { MetralyStoryFrame, ProductPreview } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "AppKit/AppIconLibrary",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="AppKit"
      title="AppIconLibrary"
      description="Full icon library grid from the App Kit. All MetralyIcon names with sizes."
      status="stable"
      tags={["appkit", "icons"]}
      fullWidth
    >
      <ProductPreview>
        <div className="msf__pad-lg">
          <AppIconLibrary />
        </div>
      </ProductPreview>
    </MetralyStoryFrame>
  ),
};
