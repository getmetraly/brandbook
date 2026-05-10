import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  DashboardDropZone,
  DashboardResizeHandle,
  DashboardWidget,
  defaultDashboardWidgetRegistry,
  createDashboardWidgetInstance,
  findDashboardWidgetDefinition,
} from '@metraly/ui';

describe('dashboard edit mode primitives', () => {
  it('renders a highlighted drop zone when active', () => {
    const { container } = render(<DashboardDropZone active label="Drop widget here" />);

    expect(screen.getByRole('status')).toHaveTextContent('Drop widget here');
    expect(container.firstChild).toHaveClass('is-active');
    expect(container.querySelector('.metraly-dashboard-drop-zone-line')).not.toBeInTheDocument();
  });

  it('renders neutral drop zone states without pulse markers by default', () => {
    const { container } = render(<DashboardDropZone state="idle" label="Drop widget here" />);

    expect(screen.getByRole('status')).toHaveAttribute('data-drop-zone-state', 'idle');
    expect(container.querySelector('.metraly-dashboard-drop-zone-icon')).toHaveTextContent('+');
    expect(container.querySelector('.metraly-dashboard-drop-zone-line')).not.toBeInTheDocument();
    expect(container.querySelector('.metraly-pulse-marker')).not.toBeInTheDocument();
  });

  it('renders a keyboard-focusable resize handle with an accessible label', () => {
    render(<DashboardResizeHandle label="Resize widget" direction="east" active />);

    const handle = screen.getByRole('separator', { name: 'Resize widget' });
    expect(handle).toHaveAttribute('tabIndex', '0');
    expect(handle).toHaveClass('is-east');
    expect(handle).toHaveClass('is-active');
  });

  it('resolves widget definitions from the shared registry', () => {
    expect(findDashboardWidgetDefinition(defaultDashboardWidgetRegistry, 'metric-chart')).toMatchObject({
      title: 'Metric Chart',
      state: 'live',
    });
    expect(findDashboardWidgetDefinition(defaultDashboardWidgetRegistry, 'missing-type')).toBeUndefined();
  });

  it('creates widget instances from a registry definition', () => {
    const definition = findDashboardWidgetDefinition(defaultDashboardWidgetRegistry, 'stat-card');
    expect(definition).toBeDefined();

    const widget = createDashboardWidgetInstance(definition!);

    expect(widget).toMatchObject({
      type: 'stat-card',
      title: 'Stat Card',
      state: 'live',
      position: { x: 0, y: 0, w: 4, h: 2, minW: 3, minH: 2 },
    });
  });

  it('renders widget bodies from the shared registry definition', () => {
    const definition = findDashboardWidgetDefinition(defaultDashboardWidgetRegistry, 'data-table');
    expect(definition?.render).toBeDefined();

    render(<>{definition?.render?.()}</>);

    expect(screen.getByRole('table', { name: 'Data table' })).toBeInTheDocument();
    expect(screen.getByText('metraly/app')).toBeInTheDocument();
  });

  it('renders dashboard widget drag handles as neutral grip dots', () => {
    const { container } = render(<DashboardWidget title="Review latency" state="live">4h</DashboardWidget>);

    const handle = screen.getByRole('button', { name: 'Drag to move' });
    expect(handle.querySelector('.metraly-widget-shell-grip-dots')).toBeInTheDocument();
    expect(container.querySelectorAll('.metraly-widget-shell-grip-dots span')).toHaveLength(6);
    expect(handle.querySelector('.metraly-pulse-marker')).not.toBeInTheDocument();
  });
});
