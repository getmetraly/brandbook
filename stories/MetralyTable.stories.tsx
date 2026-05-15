import type { Meta, StoryObj } from '@storybook/react';
import { MetralyTable } from '@metraly/ui';

interface Row {
  name: string;
  value: number;
}

interface PRReviewRow {
  team: string;
  open: number;
  first: string;
  merge: string;
  stale: number;
}

const columns = [
  { key: 'name' as const, header: 'Name' },
  { key: 'value' as const, header: 'Value', align: 'right' as const },
];

const data: Row[] = [
  { name: 'Alpha', value: 42 },
  { name: 'Beta', value: 73 },
  { name: 'Gamma', value: 18 },
];

const stageStyle = {
  minHeight: 360,
  padding: 24,
  background: 'var(--m-bg-0)',
  color: 'var(--m-fg-0)',
};

const frameStyle = {
  width: 'min(720px, 100%)',
  minHeight: 220,
};

const meta: Meta<typeof MetralyTable<Row>> = {
  title: 'Components/MetralyTable',
  component: MetralyTable<Row>,
  parameters: { layout: 'fullscreen' },
  args: {
    columns,
    data,
    rowKey: (row) => row.name,
    stickyHeader: true,
    dense: true,
    liveRowKeys: ['Alpha'],
    unreadRowKeys: ['Gamma'],
    footer: <span>updated 12s ago</span>,
  },
  render: (args) => (
    <div style={stageStyle}>
      <div style={frameStyle}>
        <MetralyTable {...args} />
      </div>
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof MetralyTable<Row>>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    data: [],
    emptyText: 'No entries',
    footer: <span>0 rows</span>,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    loading: true,
    footer: <span>loading telemetry</span>,
  },
};

export const Error: Story = {
  args: {
    data: [],
    error: true,
    errorText: 'Could not load telemetry — check your connector health.',
    footer: <span>last attempt failed</span>,
  },
};

export const SelectedRow: Story = {
  args: {
    selectedRowKeys: ['Beta'],
    footer: <span>3 rows · 1 selected</span>,
  },
};

const prReviewColumns = [
  { key: 'team' as const, header: 'Team', width: '34%' },
  { key: 'open' as const, header: 'Open PRs', align: 'right' as const, width: '16%' },
  { key: 'first' as const, header: '1st response', align: 'right' as const, width: '18%' },
  { key: 'merge' as const, header: 'Time to merge', align: 'right' as const, width: '18%' },
  { key: 'stale' as const, header: 'Stale > 3d', align: 'right' as const, width: '14%' },
];

const prReviewData: PRReviewRow[] = [
  { team: 'platform', open: 8, first: '2.4h', merge: '11h', stale: 0 },
  { team: 'growth', open: 14, first: '9.1h', merge: '31h', stale: 3 },
  { team: 'billing', open: 6, first: '4.2h', merge: '18h', stale: 1 },
  { team: 'search', open: 9, first: '1.8h', merge: '9h', stale: 0 },
  { team: 'data-pipelines', open: 12, first: '14.6h', merge: '44h', stale: 5 },
  { team: 'mobile', open: 4, first: '3h', merge: '14h', stale: 0 },
];

export const PRReviewBoard: StoryObj<typeof MetralyTable<PRReviewRow>> = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={stageStyle}>
      <div style={{ width: 'min(920px, 100%)', minHeight: 280 }}>
        <MetralyTable<PRReviewRow>
          columns={prReviewColumns}
          data={prReviewData}
          rowKey={(row) => row.team}
          ariaLabel="PR review latency by team"
          stickyHeader
          dense
          footer={<span>updated 12s ago</span>}
        />
      </div>
    </div>
  ),
};

export const MobileCards: StoryObj<typeof MetralyTable<PRReviewRow>> = {
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'mobile2' },
  },
  render: () => (
    <div style={stageStyle}>
      <div style={{ width: 'min(420px, 100%)', minHeight: 280 }}>
        <MetralyTable<PRReviewRow>
          columns={prReviewColumns}
          data={prReviewData}
          rowKey={(row) => row.team}
          ariaLabel="PR review latency by team"
          dense
          mobilePresentation="cards"
          footer={<span>mobile cards mode</span>}
        />
      </div>
    </div>
  ),
};

export const MobileStacked: StoryObj<typeof MetralyTable<PRReviewRow>> = {
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'mobile1' },
  },
  render: () => (
    <div style={stageStyle}>
      <div style={{ width: 'min(390px, 100%)', minHeight: 280 }}>
        <MetralyTable<PRReviewRow>
          columns={prReviewColumns}
          data={prReviewData}
          rowKey={(row) => row.team}
          ariaLabel="PR review latency by team"
          dense
          mobilePresentation="stacked"
          footer={<span>stacked mobile mode</span>}
        />
      </div>
    </div>
  ),
};
