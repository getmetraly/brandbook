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
      description="Evidence-backed AI workspace. Composes canonical MetralySidebar, MetralyTopbar, and AIWorkspaceLayout. Sidebar shows active-state, badge variants, and brand header. Topbar renders search, notification bell, and refresh into the MetralyTopbar actions slot."
      status="Preview"
      tags={["AI", "chat", "evidence", "screen", "composition", "app-kit"]}
      fullWidth
      previewVariant="flush"
    >
      {/* Fixed height to show the complete product screen in Storybook.
          Overflow hidden clips the 100vh shell to this viewport slice. */}
      <div style={{ height: 680, overflow: "hidden", position: "relative" }}>
        <AppAIWorkspaceScreen />
      </div>
    </MetralyStoryFrame>
  ),
};
