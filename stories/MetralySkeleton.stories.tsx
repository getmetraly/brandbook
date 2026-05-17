import type { Meta, StoryObj } from "@storybook/nextjs";
import { MetralySkeleton } from "@metraly/ui";

const meta: Meta<typeof MetralySkeleton> = {
  title: "Components/MetralySkeleton",
  component: MetralySkeleton,
  args: {
    variant: "text",
    lines: 3,
  },
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof MetralySkeleton>;

const stageStyle = {
  minHeight: 360,
  padding: 24,
  background: "var(--m-bg-0)",
};

export const Text: Story = {
  render: (args) => (
    <div style={stageStyle}>
      <div style={{ width: "min(360px, 100%)" }}>
        <MetralySkeleton {...args} />
      </div>
    </div>
  ),
};

export const Card: Story = {
  args: { variant: "card" },
  render: (args) => (
    <div style={stageStyle}>
      <div style={{ width: "min(320px, 100%)" }}>
        <MetralySkeleton {...args} />
      </div>
    </div>
  ),
};

export const Table: Story = {
  args: { variant: "table" },
  render: (args) => (
    <div style={stageStyle}>
      <div style={{ width: "min(760px, 100%)" }}>
        <MetralySkeleton {...args} />
      </div>
    </div>
  ),
};

export const Widget: Story = {
  args: { variant: "widget" },
  render: (args) => (
    <div style={stageStyle}>
      <div style={{ width: "min(360px, 100%)" }}>
        <MetralySkeleton {...args} />
      </div>
    </div>
  ),
};
