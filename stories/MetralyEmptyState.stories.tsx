import type { Meta, StoryObj } from "@storybook/react";
import { MetralyButton, MetralyEmptyState } from "@metraly/ui";

const meta: Meta<typeof MetralyEmptyState> = {
  title: "Components/MetralyEmptyState",
  component: MetralyEmptyState,
  parameters: { layout: "fullscreen" },
  args: {
    title: "No connector data yet",
    description: "Connect a source or widen the time range to populate this surface.",
  },
};

export default meta;
type Story = StoryObj<typeof MetralyEmptyState>;

const stageStyle = {
  minHeight: 420,
  padding: 24,
  background: "var(--m-bg-0)",
};

export const Default: Story = {
  render: (args) => (
    <div style={stageStyle}>
      <MetralyEmptyState {...args} action={<MetralyButton size="sm">Connect source</MetralyButton>} />
    </div>
  ),
};

export const Gated: Story = {
  args: {
    variant: "gated",
    title: "Plugin review required",
    description: "This integration is available only after trust policy review.",
  },
  render: (args) => (
    <div style={stageStyle}>
      <MetralyEmptyState {...args} action={<MetralyButton variant="secondary" size="sm">Review policy</MetralyButton>} />
    </div>
  ),
};

export const Error: Story = {
  args: {
    variant: "error",
    title: "Unable to load evidence",
    description: "The upstream connector returned an error. Retry or inspect trace details.",
  },
  render: (args) => (
    <div style={stageStyle}>
      <MetralyEmptyState {...args} action={<MetralyButton variant="secondary" size="sm">Retry</MetralyButton>} />
    </div>
  ),
};

export const NoResults: Story = {
  args: {
    variant: "no-results",
    title: "No results match these filters",
    description: "Reset the filter set or choose a wider window.",
  },
  render: (args) => (
    <div style={stageStyle}>
      <MetralyEmptyState {...args} action={<MetralyButton variant="ghost" size="sm">Reset filters</MetralyButton>} />
    </div>
  ),
};
