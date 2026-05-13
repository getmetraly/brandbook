import type { Meta, StoryObj } from '@storybook/react';
import { DashboardWidget } from '@metraly/ui';

const meta: Meta<typeof DashboardWidget> = {
  title: 'Components/DashboardWidget',
  component: DashboardWidget,
  args: {
    id: 'story-widget',
    title: 'Widget title',
    subtitle: 'Widget subtitle',
    state: 'live',
    stateLabel: 'Live',
    children: <p>Widget content goes here.</p>,
  },
};

export default meta;
type Story = StoryObj<typeof DashboardWidget>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    selected: true,
  },
};

export const Dragging: Story = {
  args: {
    dragging: true,
  },
};

export const Resizable: Story = {
  args: {
    resizable: true,
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    state: 'delayed',
    stateLabel: 'Full width',
  },
};

export const Disconnected: Story = {
  args: {
    state: 'disconnected',
    stateLabel: 'Disconnected',
    children: <p>Reconnect CI to restore failure-rate telemetry.</p>,
  },
};
