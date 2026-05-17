import type { Meta, StoryObj } from "@storybook/nextjs";
import { DashboardResizeHandle, dashboardResizeHandleDirections } from "@metraly/ui";

const meta: Meta<typeof DashboardResizeHandle> = {
  title: "Components/GripHandle",
  component: DashboardResizeHandle,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof DashboardResizeHandle>;

export const FocusAndLabels: Story = {
  render: () => (
    <div
      style={{
        position: "relative",
        width: 240,
        height: 180,
        border: "1px solid var(--m-line)",
        borderRadius: "var(--m-r-2)",
        background: "var(--m-bg-1)",
      }}
    >
      {dashboardResizeHandleDirections.map((direction) => (
        <DashboardResizeHandle key={direction} direction={direction} active />
      ))}
    </div>
  ),
};

export const Idle: Story = {
  args: {
    direction: "east",
    label: "Resize width",
    active: false,
  },
  render: (args) => (
    <div
      style={{
        position: "relative",
        width: 240,
        height: 180,
        border: "1px solid var(--m-line)",
        borderRadius: "var(--m-r-2)",
        background: "var(--m-bg-1)",
      }}
    >
      <DashboardResizeHandle {...args} />
    </div>
  ),
};
