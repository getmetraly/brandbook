import type { Meta, StoryObj } from "@storybook/nextjs";
import * as React from "react";
import { AppIconLibrary } from "../../packages/ui/src/app-kit/AppIconLibrary";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta<typeof AppIconLibrary> = {
  title: "AppKit/AppIconLibrary",
  component: AppIconLibrary,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof AppIconLibrary>;

export const AllIcons: Story = {
  render: () => <AppIconLibrary />,
};

export const LargeIcons: Story = {
  render: () => <AppIconLibrary iconSize={24} />,
};

export const ProductPreview: Story = {
  name: "Product Preview",
  parameters: { layout: "padded" },
  render: () => (
    <MetralyStoryFrame
      category="AppKit"
      title="AppIconLibrary"
      description="Icon gallery displaying all available MetralyIcon glyphs. Stroke 1.5, currentColor, viewBox 24. Used throughout the product for navigation, actions, and status."
      status="Ready"
      tags={["icons", "MetralyIcon", "design-tokens", "app-kit"]}
    >
      <AppIconLibrary iconSize={20} />
    </MetralyStoryFrame>
  ),
};
