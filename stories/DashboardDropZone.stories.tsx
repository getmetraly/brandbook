import type { Meta, StoryObj } from "@storybook/react";
import { DashboardDropZone } from "@metraly/ui";

const stageStyle = {
  minHeight: 260,
  padding: 24,
  background: 'var(--m-bg-0)',
  color: 'var(--m-fg-0)',
};

const frameStyle = {
  width: 'min(960px, 100%)',
};

const meta: Meta<typeof DashboardDropZone> = {
  title: "Components/DashboardDropZone",
  component: DashboardDropZone,
  parameters: { layout: 'fullscreen' },
  args: {
    state: "idle",
    description: "Default drop zones stay pulse-free.",
  },
  render: (args) => (
    <div style={stageStyle}>
      <div style={frameStyle}>
        <DashboardDropZone {...args} />
      </div>
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof DashboardDropZone>;

export const Idle: Story = {};

export const Active: Story = {
  args: {
    state: "active",
    label: "Release to add widget",
    description: undefined,
  },
};

export const Rejected: Story = {
  args: {
    state: "rejected",
    label: "Cannot drop here",
    description: undefined,
  },
};

export const EmptyWithKeyboardFallback: Story = {
  args: {
    state: "empty",
    label: "Add the first widget",
    description: "Use the action button when drag and drop is unavailable.",
    actionLabel: "Add widget",
  },
  render: (args) => (
    <div style={stageStyle}>
      <div style={frameStyle}>
        <DashboardDropZone {...args} onAction={() => undefined} />
      </div>
    </div>
  ),
};
