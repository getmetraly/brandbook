import type { Meta, StoryObj } from '@storybook/react';
import {
  DashboardGrid,
  DashboardToolbar,
  DashboardWidget,
  defaultDashboardWidgetRegistry,
  findDashboardWidgetDefinition,
  type DashboardWidgetInstance,
} from '@metraly/ui';
import '@metraly/ui/styles/metraly-state-badge.css';
import '@metraly/ui/styles/metraly-widget-shell.css';
import '@metraly/ui/styles/metraly-dashboard.css';

const sampleWidgets: DashboardWidgetInstance[] = [
  {
    id: 'flow-efficiency',
    type: 'stat-card',
    title: 'Flow efficiency',
    description: 'KPI summary widget.',
    state: 'live',
    position: { x: 0, y: 0, w: 4, h: 2 },
  },
  {
    id: 'review-latency',
    type: 'metric-chart',
    title: 'Review latency',
    description: 'Trend widget surface.',
    state: 'delayed',
    position: { x: 4, y: 0, w: 5, h: 3 },
  },
];

function DashboardPreview() {
  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <DashboardToolbar
        title="Dashboard Editor"
        description="Create, arrange and persist telemetry widgets."
        meta={`${defaultDashboardWidgetRegistry.length} widget types available`}
        actions={<button className="btn btn-primary" type="button">Save</button>}
      />
      <DashboardGrid
        widgets={sampleWidgets}
        layout={sampleWidgets.map((widget) => ({ i: widget.id, ...widget.position }))}
        renderWidget={(widget) => (
          <DashboardWidget title={widget.title} subtitle={widget.description} state={widget.state} selected={widget.id === 'flow-efficiency'}>
            {findDashboardWidgetDefinition(defaultDashboardWidgetRegistry, widget.type)?.render?.()}
          </DashboardWidget>
        )}
      />
    </div>
  );
}

const meta: Meta<typeof DashboardPreview> = {
  title: 'Metraly/Dashboard',
  component: DashboardPreview,
};

export default meta;
type Story = StoryObj<typeof DashboardPreview>;

export const Default: Story = {};
