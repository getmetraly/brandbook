import type { Meta, StoryObj } from '@storybook/react';
import { WidgetPickerCard } from '@metraly/ui';
import '@metraly/ui/styles/metraly-state-badge.css';
import '@metraly/ui/styles/metraly-widget-picker.css';

const meta: Meta<typeof WidgetPickerCard> = {
  title: 'Metraly/WidgetPickerCard',
  component: WidgetPickerCard,
  args: {
    title: 'Flow efficiency',
    description: 'Track delivery throughput, review health and deployment flow.',
    selected: true,
    iconLabel: 'pulse',
    tags: ['github', 'telemetry'],
    state: 'live',
  },
};

export default meta;
type Story = StoryObj<typeof WidgetPickerCard>;

export const Selected: Story = {};

export const Unselected: Story = {
  args: {
    selected: false,
    state: 'stale',
  },
};

export const Delayed: Story = {
  args: {
    state: 'delayed',
    stateLabel: 'Delayed',
  },
};
