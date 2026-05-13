import type { Meta, StoryObj } from '@storybook/react';
import { MetralyTable } from '@metraly/ui';
import '@metraly/ui/styles/metraly-table.css';

interface Row {
  name: string;
  value: number;
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
  display: 'grid',
  gap: 12,
  padding: 20,
  borderRadius: 24,
  border: '1px solid rgba(255,255,255,0.08)',
  background: '#111722',
  minHeight: 220,
  color: '#f0f4f8',
};

const tableStyle = {
  width: '100%',
  maxWidth: 720,
};

const meta: Meta<typeof MetralyTable<Row>> = {
  title: 'Metraly/MetralyTable',
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
      <div style={tableStyle}>
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