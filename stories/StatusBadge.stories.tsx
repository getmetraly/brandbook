import type { Meta, StoryObj } from "@storybook/react";
import { StatusBadge } from "@metraly/ui";

const meta: Meta<typeof StatusBadge> = {
  title: "Components/StatusBadge",
  component: StatusBadge,
  args: {
    status: "Live",
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

const canonicalStatuses = [
  "Live",
  "Preview",
  "Designed",
  "Planned",
  "In progress",
  "Gated",
  "Policy defined",
  "Benchmark pending",
  "Coming soon",
  "Error",
  "Delayed",
  "No data",
] as const;

export const Live: Story = {};

export const Compact: Story = {
  args: {
    status: "Delayed",
    size: "sm",
  },
};

export const CanonicalTaxonomy: Story = {
  render: (args) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 24,
        padding: 24,
        background: "var(--m-bg-0)",
        color: "var(--m-fg-1)",
      }}
    >
      {canonicalStatuses.map((status) => (
        <div
          key={status}
          style={{ display: "inline-flex", flexDirection: "column", alignItems: "flex-start", gap: 8 }}
        >
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.06em",
              color: "var(--m-fg-3)",
              fontFamily: "var(--m-font-mono)",
              textTransform: "uppercase",
            }}
          >
            {status}
          </span>
          <StatusBadge {...args} status={status} />
        </div>
      ))}
    </div>
  ),
};
