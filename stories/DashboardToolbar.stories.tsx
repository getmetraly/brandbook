import type { Meta, StoryObj } from "@storybook/nextjs";
import { DashboardToolbar, MetralyButton } from "@metraly/ui";

const stageStyle = {
  minHeight: '100dvh',
  boxSizing: 'border-box' as const,
  padding: 24,
  background: 'var(--m-bg-0)',
  color: 'var(--m-fg-0)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  overflow: 'hidden',
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
          actions={<MetralyButton variant="primary" size="sm">Save</MetralyButton>}
        />
      </div>
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof DashboardToolbar>;

export const Default: Story = {};
