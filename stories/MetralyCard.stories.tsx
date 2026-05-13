import type { Meta, StoryObj } from '@storybook/react';
import { MetralyCard } from '@metraly/ui';
import '@metraly/ui/styles/metraly-card.css';

const meta: Meta<typeof MetralyCard> = {
  title: 'Components/Cards',
  component: MetralyCard,
  args: {
    title: 'Flow efficiency',
    subtitle: 'KPI summary',
    children: '81% (Live)',
  },
};

export default meta;
type Story = StoryObj<typeof MetralyCard>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    state: 'selected',
  },
};

export const Loading: Story = {
  args: {
    state: 'loading',
  },
};

export const Empty: Story = {
  args: {
    state: 'empty',
  },
};
