import type { Meta, StoryObj } from "@storybook/react";
import { DashboardToolbar } from "@metraly/ui";
import "@metraly/ui/styles/metraly-dashboard.css";

const meta: Meta<typeof DashboardToolbar> = {
  title: "Components/DashboardToolbar",
  component: DashboardToolbar,
  args: {
    title: "Engineering board",
    description: "Last updated 2m ago",
    meta: "2 widgets · saved",
    tabs: [
      { value: "delivery", label: "Delivery" },
      { value: "dora", label: "DORA" },
      { value: "flow", label: "Flow" },
    ],
    activeTab: "delivery",
    searchValue: "",
    syncState: "live",
    editMode: true,
    actions: <button className="metraly-dashboard-toolbar-button is-primary" type="button">Editor</button>,
  },
  render: (args) => <DashboardToolbar {...args} />,
};

export default meta;
type Story = StoryObj<typeof DashboardToolbar>;

export const Default: Story = {};
