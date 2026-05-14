import type { Meta, StoryObj } from '@storybook/react';
import { DashboardWidget } from '@metraly/ui';

const meta: Meta<typeof DashboardWidget> = {
  title: 'Components/DashboardWidget',
  component: DashboardWidget,
  args: {
    id: 'w1',
    title: 'Deployment frequency',
    subtitle: 'DORA/DEPLOY-FREQ',
    state: 'live',
    stateLabel: 'Live',
    children: <p style={{ padding: '12px 10px', color: 'var(--m-fg-1)', fontSize: 'var(--m-fs-12)', margin: 0 }}>24 / day</p>,
  },
};

export default meta;
type Story = StoryObj<typeof DashboardWidget>;

export const Default: Story = {};

export const Selected: Story = {
  args: { selected: true, resizable: true },
};

export const Dragging: Story = {
  args: { dragging: true },
};

export const Resizing: Story = {
  args: { selected: true, resizing: true, resizable: true },
};

export const Loading: Story = {
  args: { id: 'w1', title: 'MTTR', subtitle: 'DORA/MTTR', state: 'live', loading: true, children: undefined },
};

export const Empty: Story = {
  args: { id: 'w1', title: 'CI failure rate', subtitle: 'CI/FAIL', state: 'noData', children: undefined },
};

export const Stale: Story = {
  args: {
    state: 'stale',
    stateLabel: 'Stale 4m',
    children: <p style={{ padding: '12px 10px', color: 'var(--m-fg-1)', fontSize: 'var(--m-fs-12)', margin: 0 }}>4.2%<br /><span style={{ fontSize: 'var(--m-fs-10)', color: 'var(--m-fg-3)' }}>last 4m ago</span></p>,
  },
};

export const Error: Story = {
  args: { id: 'w1', title: 'Flaky builds', subtitle: 'METRIC/SCALAR', state: 'error', children: undefined },
};

export const Disconnected: Story = {
  args: { id: 'w1', title: 'Flaky builds', subtitle: 'METRIC/SCALAR', state: 'disconnected', children: undefined },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
};

export const WithFooter: Story = {
  args: {
    footer: <span style={{ color: 'var(--m-fg-3)', fontSize: 'var(--m-fs-10)', fontFamily: 'var(--m-font-mono)' }}>Updated 30s ago</span>,
  },
};
