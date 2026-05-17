import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MetralyPanel } from "@metraly/ui";

const meta = {
  component: MetralyPanel,
  tags: ["ai-generated"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof MetralyPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoPadding: Story = {
  args: {
    padding: "none",
    children: "Panel with no padding — used when child components control their own spacing.",
  },
};

export const SmallPadding: Story = {
  args: {
    padding: "sm",
    children: "Panel with small padding.",
  },
};

export const MediumPadding: Story = {
  args: {
    padding: "md",
    children: "Panel with medium padding — the common default for content cards.",
  },
};

export const LargePadding: Story = {
  args: {
    padding: "lg",
    children: "Panel with large padding — used in full-page sections.",
  },
};
