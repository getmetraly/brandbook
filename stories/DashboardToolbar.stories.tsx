import type { Meta, StoryObj } from "@storybook/react";
import { DashboardToolbar } from "@metraly/ui";

const meta: Meta<typeof DashboardToolbar> = {
  title: "Components/DashboardToolbar",
  component: DashboardToolbar,
  render: () => (
    <div style={{ padding: 16, background: 'var(--m-bg-0)' }}>
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
  ),
};

export default meta;
type Story = StoryObj<typeof DashboardToolbar>;

export const Default: Story = {};
