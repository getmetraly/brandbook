import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { AppAIWorkspaceScreen } from "@metraly/ui";
import { MetralyStoryFrame, ProductPreview } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "AppKit/AppAIWorkspaceScreen",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

/**
 * Ships with a default seeded conversation (DORA analysis) and three
 * quick prompts. Fully interactive — type in the input to add messages.
 */
export const ProductPreviewStory: Story = {
  name: "ProductPreview",
  render: () => (
    <MetralyStoryFrame
      category="AppKit"
      title="AppAIWorkspaceScreen"
      description="AI Workspace screen: sidebar + topbar + AIWorkspaceLayout with chat, evidence panel, and quick prompts."
      status="stable"
      tags={["appkit", "screen", "AI", "product-preview", "interactive"]}
      fullscreen
    >
      <ProductPreview>
        <div style={{ height: "100vh" }}>
          <AppAIWorkspaceScreen />
        </div>
      </ProductPreview>
    </MetralyStoryFrame>
  ),
  parameters: { layout: "fullscreen" },
};
