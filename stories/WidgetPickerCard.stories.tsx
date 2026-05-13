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
  title: 'Components/WidgetPickerCard',
  component: WidgetPickerCard,
  args: {
    title: 'Deployment frequency',
    description: 'Deploys per day, by service & team.',
    selected: true,
    kind: 'dora/deploy-freq',
    iconLabel: 'lightning',
    tags: ['dora', 'delivery'],
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
    title: 'Change failure rate',
    description: '% of deploys that triggered a rollback or incident.',
    kind: 'dora/cfr',
    iconLabel: 'chart',
    state: 'stale',
  },
};

export const Delayed: Story = {
  args: {
    selected: false,
    title: 'Blocked work',
    description: 'Issues stalled > 3 days, by stage.',
    kind: 'flow/blocked',
    iconLabel: 'bell',
    state: 'delayed',
    stateLabel: 'Delayed',
  },
};

export const Disabled: Story = {
  args: {
    selected: false,
    disabled: true,
    title: 'WIP per engineer',
    description: 'Source is not connected.',
    kind: 'flow/wip',
    iconLabel: 'table',
    state: 'noData',
  },
};
