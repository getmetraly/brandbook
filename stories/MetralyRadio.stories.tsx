import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MetralyRadio } from "@metraly/ui";

const meta = {
  component: MetralyRadio,
  tags: ["ai-generated"],
} satisfies Meta<typeof MetralyRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "plan",
    value: "free",
    label: "Free plan",
  },
};

export const WithDescription: Story = {
  args: {
    name: "plan",
    value: "pro",
    label: "Pro plan",
    description: "Includes unlimited data sources and advanced analytics.",
  },
};

export const Checked: Story = {
  args: {
    name: "plan",
    value: "pro",
    label: "Pro plan",
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    name: "plan",
    value: "enterprise",
    label: "Enterprise plan",
    description: "Contact sales for pricing.",
    disabled: true,
  },
};

export const ErrorState: Story = {
  args: {
    name: "plan",
    value: "free",
    label: "Free plan",
    error: true,
  },
};
