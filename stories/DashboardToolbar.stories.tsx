import type { Meta, StoryObj } from "@storybook/react";
import { DashboardToolbar } from "@metraly/ui";

const stageStyle = {
  minHeight: 260,
  padding: 24,
  background: 'var(--m-bg-0)',
  color: 'var(--m-fg-0)',
};

const frameStyle = {
  width: 'min(1120px, 100%)',
};

const meta: Meta<typeof DashboardToolbar> = {
  title: "Components/DashboardToolbar",
  component: DashboardToolbar,
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={stageStyle}>
      <div style={frameStyle}>
        <DashboardToolbar
          tabs={[
            { value: "delivery", label: "Delivery", count: 11 },
            { value: "dora", label: "DORA", count: 4 },
            { value: "flow", label: "Flow", count: 6 },
            { value: "reviews", label: "Reviews", count: 5 },
            { value: "ci", label: "CI", count: 3 },
          ]}
          activeTab="delivery"
          searchValue=""
          syncState="live"
          syncLabel="Live sync"
          editMode
          onToggleEdit={() => undefined}
          onAddWidget={() => undefined}
          actions={<button className="metraly-dashboard-toolbar-button is-primary" type="button">Save</button>}
        />
      </div>
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof DashboardToolbar>;

export const Default: Story = {};
