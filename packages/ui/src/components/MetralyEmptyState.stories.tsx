import type { Meta, StoryObj } from "@storybook/react-vite";
import { MetralyButton } from "./MetralyButton";
import { MetralyEmptyState } from "./MetralyEmptyState";

const meta = {
  component: MetralyEmptyState,
  tags: ["ai-generated"],
} satisfies Meta<typeof MetralyEmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    action: <MetralyButton variant="primary">Create dashboard</MetralyButton>,
    description: "Create your first dashboard to start tracking deployment health and review latency.",
    title: "No dashboards yet",
  },
};

export const Error: Story = {
  args: {
    description: "The connector returned an authentication error. Rotate the token and retry the sync.",
    title: "Failed to load connector data",
    variant: "error",
  },
};

export const Gated: Story = {
  args: {
    action: <MetralyButton variant="secondary">Compare plans</MetralyButton>,
    description: "Upgrade the workspace to unlock AI Workspace summaries for connector reviews.",
    title: "Feature not available on this plan",
    variant: "gated",
  },
};
