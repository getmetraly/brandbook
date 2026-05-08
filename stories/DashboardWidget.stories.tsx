import type { Meta, StoryObj } from '@storybook/react';
import { DashboardWidget } from '@metraly/ui';
import '@metraly/ui/styles/metraly-state-badge.css';
import '@metraly/ui/styles/metraly-widget-shell.css';

const meta: Meta<typeof DashboardWidget> = {
  title: 'Metraly/DashboardWidget',
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
