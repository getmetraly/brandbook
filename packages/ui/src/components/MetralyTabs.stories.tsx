import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect } from "storybook/test";
import { MetralyPanel } from "./MetralyPanel";
import { MetralyTabs, type MetralyTabItem } from "./MetralyTabs";

const tabItems: MetralyTabItem[] = [
  { value: "overview", label: "Overview", count: 12 },
  { value: "evidence", label: "Evidence", count: 4 },
  { value: "history", label: "History", count: 18 },
];

const meta = {
  component: MetralyTabs,
  tags: ["ai-generated", "needs-work"],
  args: {
    ariaLabel: "Workspace sections",
    items: tabItems,
  },
} satisfies Meta<typeof MetralyTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("overview");
    const activeLabel = args.items.find((item) => item.value === value)?.label ?? value;

    return (
      <>
        <MetralyTabs {...args} value={value} onValueChange={setValue} />
        <MetralyPanel padding="md">
          <strong>{activeLabel}</strong>
          <div>Focused content for the selected response lane.</div>
        </MetralyPanel>
      </>
    );
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("tab", { name: /evidence/i }));
    await expect(canvas.getByRole("tab", { name: /evidence/i })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(canvas.getByText(/focused content for the selected response lane/i)).toBeVisible();
  },
};

export const LivePulse: Story = {
  args: {
    livePulse: true,
    value: "evidence",
  },
};

export const DisabledItem: Story = {
  args: {
    items: [
      { value: "overview", label: "Overview", count: 12 },
      { value: "evidence", label: "Evidence", count: 4 },
      { value: "history", label: "History", count: 18, disabled: true },
    ],
  },
};
