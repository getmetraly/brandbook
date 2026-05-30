import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { AppConnectorWizardScreen } from "@metraly/ui";
import { MetralyStoryFrame, ProductPreview } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "AppKit/AppConnectorWizardScreen",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

export const ProductPreviewStory: Story = {
  name: "ProductPreview",
  render: () => (
    <MetralyStoryFrame
      category="AppKit"
      title="AppConnectorWizardScreen"
      description="Multi-step connector wizard screen. Steps: select source → authenticate → configure scopes → backfill → review."
      status="stable"
      tags={["appkit", "screen", "wizard", "product-preview"]}
      fullscreen
    >
      <ProductPreview>
        <div className="msf__viewport-h">
          <AppConnectorWizardScreen />
        </div>
      </ProductPreview>
    </MetralyStoryFrame>
  ),
  parameters: { layout: "fullscreen" },
};
