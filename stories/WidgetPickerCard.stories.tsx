import type { Meta, StoryObj } from '@storybook/react';
import { WidgetPickerCard } from '@metraly/ui';
import '@metraly/ui/styles/metraly-state-badge.css';
import '@metraly/ui/styles/metraly-widget-picker.css';

const stageStyle = {
  display: 'grid',
  placeItems: 'start',
  minHeight: 260,
  padding: 24,
  background: '#0b0f14',
  color: '#f0f4f8',
};

const cardStyle = {
  width: '100%',
  maxWidth: 420,
};

const meta: Meta<typeof WidgetPickerCard> = {
  title: 'Metraly/WidgetPickerCard',
  component: WidgetPickerCard,
  args: {
    title: 'Flow efficiency',
    description: 'Track delivery throughput, review health and deployment flow.',
    selected: true,
    kind: 'flow/efficiency',
    iconLabel: 'flow',
    tags: ['github', 'telemetry'],
    state: 'live',
  },
  render: (args) => (
    <div style={stageStyle}>
      <div style={cardStyle}>
        <WidgetPickerCard {...args} />
      </div>
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof WidgetPickerCard>;

export const Selected: Story = {};

export const Unselected: Story = {
  args: {
    selected: false,
    kind: 'review/latency',
    iconLabel: 'review',
    state: 'stale',
  },
};

export const Delayed: Story = {
  args: {
    selected: false,
    kind: 'review/latency',
    iconLabel: 'latency',
    state: 'delayed',
    stateLabel: 'Delayed',
  },
};

export const Disabled: Story = {
  args: {
    selected: false,
    disabled: true,
    title: 'WIP per engineer',
    description: 'Source is not connected yet.',
    kind: 'flow/wip',
    iconLabel: 'wip',
    state: 'noData',
  },
};