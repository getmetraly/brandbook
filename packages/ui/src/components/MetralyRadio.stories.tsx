import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { MetralyRadio } from "./MetralyRadio";

const meta = {
  component: MetralyRadio,
  tags: ["ai-generated", "needs-work"],
  args: {
    name: "deployment-mode",
    label: "Progressive rollout",
    description: "Shift traffic gradually while watching latency and error budgets.",
  },
} satisfies Meta<typeof MetralyRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  args: {
    checked: true,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("radio", { name: /progressive rollout/i }),
    ).toBeChecked();
  },
};

export const WithHint: Story = {
  args: {
    hint: "Recommended for high-risk service migrations.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: "Immediate cutover",
    description: "Blocked until the maintenance window opens.",
  },
};
