import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MetralyTelemetryLine } from "@metraly/ui";

const meta = {
  component: MetralyTelemetryLine,
  tags: ["ai-generated"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof MetralyTelemetryLine>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
  args: { variant: "primary" },
};

export const Success: Story = {
  args: { variant: "success" },
};

export const Warning: Story = {
  args: { variant: "warning" },
};

export const Error: Story = {
  args: { variant: "error" },
};

export const Extended: Story = {
  args: { pulses: 8, variant: "primary" },
};
