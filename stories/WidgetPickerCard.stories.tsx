import type { Meta, StoryObj } from '@storybook/react';
import { WidgetPickerCard } from '@metraly/ui';

const stageStyle = {
  display: 'grid',
  placeItems: 'start',
  minHeight: 300,
  padding: 24,
  background: 'var(--m-bg-0)',
  color: 'var(--m-fg-0)',
};

const cardStyle = {
  width: '100%',
  maxWidth: 340,
};

const meta: Meta<typeof WidgetPickerCard> = {
  title: 'Components/WidgetPickerCard',
  component: WidgetPickerCard,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Deployment frequency',
    description: 'Deploys per day, by service & team.',
    selected: true,
    kind: 'dora/deploy-freq',
    iconLabel: 'lightning',
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

export const Stale: Story = {
  args: {
    selected: false,
    title: 'Change failure rate',
    description: '% of deploys that triggered a rollback or incident.',
    kind: 'dora/cfr',
    iconLabel: 'chart',
    state: 'stale',
  },
};

export const New: Story = {
  args: {
    selected: false,
    title: 'Flaky builds',
    description: 'Tests retried-then-passed in the last 7 days.',
    kind: 'ci/flaky',
    iconLabel: 'lightning',
    visualState: 'new',
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
  },
};

export const Loading: Story = {
  args: {
    selected: false,
    title: 'PR review latency',
    description: 'First review response, by team.',
    kind: 'review/latency',
    iconLabel: 'metric',
    loading: true,
  },
};
