import type { Meta, StoryObj } from '@storybook/react';
import {
  ComponentStateBoard,
  EngineeringDashboardEditorPreview,
} from '../site/app/components/previews/ClaudeDesignStateBoard';
import '@metraly/ui/styles/metraly-card.css';
import '@metraly/ui/styles/metraly-state-badge.css';
import '@metraly/ui/styles/metraly-table.css';
import '@metraly/ui/styles/metraly-forms.css';
import '@metraly/ui/styles/metraly-widget-shell.css';
import '@metraly/ui/styles/metraly-widget-picker.css';
import '@metraly/ui/styles/metraly-dashboard.css';
import '@metraly/ui/styles/metraly-charts.css';
import '../site/app/globals.css';
import '../site/app/components/previews/previews.css';

const meta: Meta = {
  title: 'Metraly/Preview Hardening',
};

export default meta;
type Story = StoryObj;

export const StateBoard: Story = {
  render: () => <ComponentStateBoard />,
};

export const DashboardEditorScenario: Story = {
  render: () => <EngineeringDashboardEditorPreview />,
};
