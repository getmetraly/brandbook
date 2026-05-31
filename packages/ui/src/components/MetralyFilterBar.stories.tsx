import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect } from "storybook/test";
import { MetralyButton } from "./MetralyButton";
import { MetralyFilterBar } from "./MetralyFilterBar";
import { MetralySelect } from "./MetralySelect";

const filters = [
  {
    id: "state",
    label: "State",
    control: (
      <MetralySelect
        options={[
          { label: "All", value: "all" },
          { label: "Active", value: "active" },
          { label: "Paused", value: "paused" },
        ]}
        defaultValue="all"
      />
    ),
  },
  {
    id: "source",
    label: "Source",
    control: (
      <MetralySelect
        options={[
          { label: "All", value: "all" },
          { label: "GitHub", value: "github" },
          { label: "Jira", value: "jira" },
        ]}
        defaultValue="github"
      />
    ),
    meta: "2 active",
  },
] as const;

function ResettableFilterBar() {
  const [resetCount, setResetCount] = React.useState(0);

  return (
    <div>
      <MetralyFilterBar
        actions={<MetralyButton variant="primary">Apply filters</MetralyButton>}
        filters={filters.map((filter) => ({ ...filter }))}
        onReset={() => setResetCount((count) => count + 1)}
      />
      <p>Reset count: {resetCount}</p>
    </div>
  );
}

const meta = {
  component: MetralyFilterBar,
  tags: ["ai-generated"],
} satisfies Meta<typeof MetralyFilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {
    actions: <MetralyButton variant="primary">Apply filters</MetralyButton>,
    filters: filters.map((filter) => ({ ...filter })),
  },
};

export const Collapsed: Story = {
  args: {
    collapsed: true,
    filters: [
      { id: "status", label: "Status", meta: "Active" },
      { id: "owner", label: "Owner", meta: "Platform" },
    ],
  },
};

export const Resettable: Story = {
  args: {
    filters: filters.map((filter) => ({ ...filter })),
  },
  render: () => <ResettableFilterBar />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /reset/i }));
    await expect(canvas.getByText(/reset count: 1/i)).toBeVisible();
  },
};
