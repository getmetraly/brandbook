import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { AppPluginsScreen } from "@metraly/ui";
import { MetralyStoryFrame, ProductPreview } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "AppKit/AppPluginsScreen",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

export const ProductPreviewStory: Story = {
  name: "ProductPreview",
  render: () => (
    <MetralyStoryFrame
      category="AppKit"
      title="AppPluginsScreen"
      description="Plugins catalog screen. Lists installed plugins, catalog, signing status, and permission review."
      status="stable"
      tags={["appkit", "screen", "product-preview"]}
      fullscreen
    >
      <ProductPreview>
        <div className="msf__viewport-h">
          <AppPluginsScreen />
        </div>
      </ProductPreview>
    </MetralyStoryFrame>
  ),
  parameters: { layout: "fullscreen" },
};
