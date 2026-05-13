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

const frameStyle = {
  width: '100%',
  maxWidth: 720,
  minHeight: 220,
};

const meta: Meta<typeof MetralyTable<Row>> = {
  title: 'Components/MetralyTable',
  component: MetralyTable<Row>,
  args: {
    columns,
    data,
    rowKey: (row) => row.name,
    stickyHeader: true,
    dense: true,
    liveRowKeys: ['Alpha'],
    unreadRowKeys: ['Gamma'],
  },
  render: (args) => (
    <div style={frameStyle}>
      <MetralyTable {...args} />
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
  },
};

export const Loading: Story = {
  args: {
    data: [],
    loading: true,
  },
};

export const SelectedRow: Story = {
  args: {
    selectedRowKeys: ['Beta'],
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
  render: () => (
    <div style={{ width: '100%', maxWidth: 920, minHeight: 280 }}>
      <MetralyTable<PRReviewRow>
        columns={prReviewColumns}
        data={prReviewData}
        rowKey={(row) => row.team}
        ariaLabel="PR review latency by team"
        stickyHeader
        dense
      />
    </div>
  ),
};
