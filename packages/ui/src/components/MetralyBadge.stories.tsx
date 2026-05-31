import type { Meta, StoryObj } from "@storybook/react-vite";
import { MetralyBadge } from "./MetralyBadge";

const meta = {
  component: MetralyBadge,
  tags: ["ai-generated"],
} satisfies Meta<typeof MetralyBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Active",
    variant: "primary",
  },
};

export const Warning: Story = {
  args: {
    children: "Review",
    variant: "warning",
  },
};

export const Error: Story = {
  args: {
    children: "Blocked",
    variant: "error",
  },
};
