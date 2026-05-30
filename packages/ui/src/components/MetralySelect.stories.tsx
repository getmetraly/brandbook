import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect } from "storybook/test";
import { MetralySelect } from "./MetralySelect";

const environmentOptions = [
  { value: "prod", label: "Production" },
  { value: "staging", label: "Staging" },
  { value: "sandbox", label: "Sandbox", disabled: true },
];

const meta = {
  component: MetralySelect,
  tags: ["ai-generated", "needs-work"],
  args: {
    label: "Environment",
    description: "Choose the control plane target for the rollout.",
    options: environmentOptions,
  },
} satisfies Meta<typeof MetralySelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("staging");
    return <MetralySelect {...args} value={value} onChange={setValue} />;
  },
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: /environment/i });
    await userEvent.click(trigger);
    await expect(canvas.getByRole("listbox", { name: /environment/i })).toBeVisible();
    await userEvent.click(canvas.getByRole("option", { name: /production/i }));
    await expect(canvas.getByRole("button", { name: /environment/i })).toHaveTextContent(
      /production/i,
    );
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: "Pick a target",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    options: [],
    description: "Loading environments from the deployment inventory.",
  },
};
