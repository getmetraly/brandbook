import type { Meta, StoryObj } from "@storybook/nextjs";
import { MetralyBadge, MetralyButton, MetralyFilterBar } from "@metraly/ui";

const meta: Meta<typeof MetralyFilterBar> = {
  title: "Components/MetralyFilterBar",
  component: MetralyFilterBar,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof MetralyFilterBar>;

const stageStyle = {
  minHeight: 320,
  padding: 24,
  background: "var(--m-bg-0)",
};

const baseFilters = [
  { id: "range", label: "Range", control: <span>Last 14d</span> },
  { id: "team", label: "Team", control: <span>Platform</span> },
  { id: "source", label: "Source", control: <span>GitHub</span>, meta: <MetralyBadge variant="info">Live</MetralyBadge> },
];

export const Default: Story = {
  render: () => (
    <div style={stageStyle}>
      <MetralyFilterBar
        filters={baseFilters}
        onReset={() => undefined}
        actions={<MetralyButton size="sm">Save view</MetralyButton>}
      />
    </div>
  ),
};

export const Overflow: Story = {
  render: () => (
    <div style={stageStyle}>
      <MetralyFilterBar
        filters={[
          ...baseFilters,
          { id: "metric", label: "Metric", control: <span>Deployment frequency</span> },
          { id: "env", label: "Environment", control: <span>Production</span> },
          { id: "owner", label: "Owner", control: <span>Core platform</span> },
        ]}
        onReset={() => undefined}
        actions={<MetralyButton size="sm" variant="secondary">Export CSV</MetralyButton>}
      />
    </div>
  ),
};

export const MobileCollapsed: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: () => (
    <div style={stageStyle}>
      <MetralyFilterBar
        filters={baseFilters}
        collapsed
        onReset={() => undefined}
        actions={<MetralyButton size="sm">Show filters</MetralyButton>}
      />
    </div>
  ),
};
