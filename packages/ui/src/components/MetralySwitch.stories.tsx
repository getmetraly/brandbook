import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect } from "storybook/test";
import { MetralySwitch } from "./MetralySwitch";

const meta = {
  component: MetralySwitch,
  tags: ["ai-generated", "needs-work"],
  args: {
    label: "Live incident alerts",
    description: "Forward Sev-1 regressions to the on-call rotations immediately.",
  },
} satisfies Meta<typeof MetralySwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState(false);
    return (
      <MetralySwitch
        {...args}
        checked={checked}
        onClick={() => setChecked((current) => !current)}
      />
    );
  },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("switch", { name: /live incident alerts/i });
    await expect(toggle).toHaveAttribute("aria-checked", "false");
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-checked", "true");
  },
};

export const PurpleAccent: Story = {
  args: {
    accent: "purple",
    checked: true,
    label: "Escalate to review board",
    description: "Route risky AI-generated changes through manual approval.",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    label: "Realtime policy sync",
    description: "Waiting for the compliance backend to confirm the new state.",
  },
};
