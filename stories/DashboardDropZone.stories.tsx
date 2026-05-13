import type { Meta, StoryObj } from "@storybook/react";
import { DashboardDropZone } from "@metraly/ui";

const meta: Meta<typeof DashboardDropZone> = {
  title: "Components/DashboardDropZone",
  component: DashboardDropZone,
  args: {
    state: "idle",
    description: "Default drop zones stay pulse-free.",
  },
  render: (args) => <DashboardDropZone {...args} />,
};

export default meta;
type Story = StoryObj<typeof DashboardDropZone>;

export const Idle: Story = {};

export const Active: Story = {
  args: {
    state: "active",
    description: "Release to add a widget.",
  },
};

export const Rejected: Story = {
  args: {
    state: "rejected",
    label: "Cannot drop here",
    description: "Invalid placement.",
  },
};
