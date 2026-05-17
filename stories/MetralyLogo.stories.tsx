import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MetralyLogo } from "@metraly/ui";

const meta = {
  component: MetralyLogo,
  tags: ["ai-generated"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof MetralyLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HorizontalDark: Story = {
  args: { variant: "horizontal", tone: "dark" },
};

export const HorizontalLight: Story = {
  args: { variant: "horizontal", tone: "light" },
};

export const HorizontalMono: Story = {
  args: { variant: "horizontal", tone: "mono" },
};

export const MarkOnly: Story = {
  args: { variant: "mark", tone: "dark" },
};

export const MarkMono: Story = {
  args: { variant: "mark", tone: "mono" },
};
