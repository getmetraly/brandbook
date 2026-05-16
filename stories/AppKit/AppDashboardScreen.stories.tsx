import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { AppDashboardScreen } from "../../packages/ui/src/app-kit/AppDashboardScreen";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta<typeof AppDashboardScreen> = {
  title: "AppKit/AppDashboardScreen",
  component: AppDashboardScreen,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof AppDashboardScreen>;

export const Default: Story = {
  render: () => <AppDashboardScreen />,
};

export const ProductPreview: Story = {
  name: "Product Preview",
  parameters: { layout: "fullscreen" },
  render: () => (
    <MetralyStoryFrame
      category="AppKit"
      title="AppDashboardScreen"
      description="Full VP Engineering dashboard: sidebar navigation + topbar + DORA metric widgets + service health table + at-risk PR list. Composition of all app-kit primitives."
      status="Ready"
      tags={["dashboard", "DORA", "screen", "composition", "app-kit"]}
      fullWidth
      previewVariant="flush"
    >
      <div style={{ height: 700, overflow: "hidden" }}>
        <AppDashboardScreen />
      </div>
    </MetralyStoryFrame>
  ),
};
