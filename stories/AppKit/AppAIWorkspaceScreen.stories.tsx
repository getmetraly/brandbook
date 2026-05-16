import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { AppAIWorkspaceScreen } from "../../packages/ui/src/app-kit/AppAIWorkspaceScreen";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta<typeof AppAIWorkspaceScreen> = {
  title: "AppKit/AppAIWorkspaceScreen",
  component: AppAIWorkspaceScreen,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof AppAIWorkspaceScreen>;

export const Default: Story = {
  render: () => <AppAIWorkspaceScreen />,
};

export const ProductPreview: Story = {
  name: "Product Preview",
  parameters: { layout: "fullscreen" },
  render: () => (
    <MetralyStoryFrame
      category="AppKit"
      title="AppAIWorkspaceScreen"
      description="Evidence-backed AI workspace with chat interface, reasoning evidence chips, and quick prompts. Composes AIWorkspaceLayout with the app shell."
      status="Preview"
      tags={["AI", "chat", "evidence", "screen", "composition", "app-kit"]}
      fullWidth
      previewVariant="flush"
    >
      <div style={{ height: 700, overflow: "hidden" }}>
        <AppAIWorkspaceScreen />
      </div>
    </MetralyStoryFrame>
  ),
};
