import type { Meta, StoryObj } from '@storybook/react';
import StateBadge from '../implementation-pack/react/StateBadge';

const meta: Meta<typeof StateBadge> = {
  title: 'Metraly/StateBadge',
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

export const NoData: Story = {
  args: {
    state: 'noData',
  },
};