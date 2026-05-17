import type { Meta, StoryObj } from "@storybook/nextjs";
import * as React from "react";
import { AppPluginsScreen } from "../../packages/ui/src/app-kit/AppPluginsScreen";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta<typeof AppPluginsScreen> = {
  title: "AppKit/AppPluginsScreen",
  component: AppPluginsScreen,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof AppPluginsScreen>;

export const Default: Story = {
  render: () => <AppPluginsScreen />,
};

export const ProductPreview: Story = {
  name: "Product Preview",
  parameters: { layout: "fullscreen" },
  render: () => (
    <MetralyStoryFrame
      category="AppKit"
      title="AppPluginsScreen"
      description="Plugin catalog with category filter, status badges, and install/manage actions. Shows Live, Preview, Designed, and Gated status variants across Sources, AI, Alerts, and Exporters."
      status="Preview"
      tags={["plugins", "catalog", "marketplace", "screen", "app-kit"]}
      fullWidth
      previewVariant="flush"
    >
      <div style={{ height: 700, overflow: "hidden" }}>
        <AppPluginsScreen />
      </div>
    </MetralyStoryFrame>
  ),
};
