import type { Meta, StoryObj } from '@storybook/react';
import { StateBadge } from '@metraly/ui';
import '@metraly/ui/styles/metraly-state-badge.css';

const meta: Meta<typeof StateBadge> = {
  title: 'Components/StateBadge',
  component: StateBadge,
  args: {
    state: 'live',
    label: 'Live',
  },
};
export default meta;
type Story = StoryObj<typeof StateBadge>;

export const Live: Story = {};

export const Delayed: Story = {
  args: {
    state: 'delayed',
    label: 'Delayed',
  },
};

export const Stale: Story = {
  args: {
    state: 'stale',
  },
};

export const Disconnected: Story = {
  args: {
    state: 'disconnected',
  },
};

export const NoData: Story = {
  args: {
    state: 'noData',
  },
};

export const Compact: Story = {
  args: {
    state: 'live',
    label: 'Live',
    size: 'sm',
  },
};

export const WithoutIndicator: Story = {
  args: {
    state: 'stale',
    label: 'Stale',
    showIndicator: false,
  },
};

export const StateMatrix = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
    <StateBadge state="live" />
    <StateBadge state="delayed" />
    <StateBadge state="stale" />
    <StateBadge state="disconnected" />
    <StateBadge state="noData" />
    <StateBadge state="live" size="sm" />
    <StateBadge state="stale" showIndicator={false} />
  </div>
);
