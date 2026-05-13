import { fireEvent, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DashboardWidgetPicker } from '../../app/components/dashboard/DashboardWidgetPicker';
import {
  createDashboardWidgetInstance,
  defaultDashboardWidgetRegistry,
  findDashboardWidgetDefinition,
} from '@metraly/ui';

describe('dashboard widget registry and picker (4.2)', () => {
  it('keeps the canonical widget catalog in deterministic order', () => {
    expect(
      defaultDashboardWidgetRegistry.map(({ type, title, state, defaultLayout }) => ({
        type,
        title,
        state,
        defaultLayout,
      })),
    ).toEqual([
      { type: 'stat-card', title: 'Stat Card', state: 'live', defaultLayout: { x: 0, y: 0, w: 4, h: 2, minW: 3, minH: 2 } },
      { type: 'metric-chart', title: 'Metric Chart', state: 'live', defaultLayout: { x: 4, y: 0, w: 5, h: 3, minW: 4, minH: 2 } },
      { type: 'data-table', title: 'Data Table', state: 'delayed', defaultLayout: { x: 0, y: 3, w: 6, h: 3, minW: 4, minH: 2 } },
    ]);
  });

  it('creates widget instances from registry defaults and preserves explicit overrides', () => {
    const definition = findDashboardWidgetDefinition(defaultDashboardWidgetRegistry, 'metric-chart');
    expect(definition).toBeDefined();

    const widget = createDashboardWidgetInstance(definition!, {
      id: 'metric_01',
      title: 'Review latency',
      position: { x: 7 },
    });

    expect(widget).toMatchObject({
      id: 'metric_01',
      type: 'metric-chart',
      title: 'Review latency',
      state: 'live',
      position: { x: 7, y: 0, w: 5, h: 3, minW: 4, minH: 2 },
    });
  });

  it('renders registry entries with selection and kind label', () => {
    const onAdd = jest.fn();

    render(<DashboardWidgetPicker selectedType="metric-chart" onAdd={onAdd} />);

    const listbox = screen.getByRole('listbox', { name: 'Available widgets' });
    const options = within(listbox).getAllByRole('option');

    expect(options).toHaveLength(3);
    expect(within(options[0]).getByText('Stat Card')).toBeInTheDocument();
    expect(within(options[1]).getByText('Metric Chart')).toBeInTheDocument();
    expect(within(options[1]).getByText('chart')).toBeInTheDocument();
    // "Live" badge is intentionally suppressed for regular live state — only
    // "new" / "disabled" / "loading" states show a badge in the picker row.
    expect(within(options[1]).queryByText('Live')).not.toBeInTheDocument();
    expect(options[1]).toHaveAttribute('aria-selected', 'true');

    fireEvent.click(options[0]);
    expect(onAdd).toHaveBeenCalledWith('stat-card');
  });

  it('disables every option when picker is disabled', () => {
    const onAdd = jest.fn();

    render(<DashboardWidgetPicker disabled onAdd={onAdd} />);

    const options = screen.getAllByRole('option');
    options.forEach((option) => {
      expect(option).toBeDisabled();
    });

    fireEvent.click(options[0]);
    expect(onAdd).not.toHaveBeenCalled();
  });
});
