import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { MetralyCheckbox } from "./MetralyCheckbox";

const meta = {
  component: MetralyCheckbox,
  tags: ["ai-generated", "needs-work"],
  args: {
    label: "Enable anomaly detection",
    description: "Trigger additional telemetry analysis on suspicious deploys.",
  },
} satisfies Meta<typeof MetralyCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checked: Story = {
  args: {
    checked: true,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("checkbox", { name: /enable anomaly detection/i }),
    ).toBeChecked();
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    description: "Inherited from parent policy until the rollout finishes.",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    description: "Refreshing available telemetry enrichers.",
  },
};
