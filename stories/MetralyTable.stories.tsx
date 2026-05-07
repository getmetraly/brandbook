import type { Meta, StoryObj } from '@storybook/react';
import MetralyTable from '../implementation-pack/react/MetralyTable';

interface Row {
  name: string;
  value: number;
}

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'value', header: 'Value', align: 'right' as const },
];

const data: Row[] = [
  { name: 'Alpha', value: 42 },
  { name: 'Beta', value: 73 },
];

const meta: Meta<typeof MetralyTable<Row>> = {
  title: 'Metraly/MetralyTable',
  component: MetralyTable<Row>,
  args: {
    columns,
    data,
  },
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
