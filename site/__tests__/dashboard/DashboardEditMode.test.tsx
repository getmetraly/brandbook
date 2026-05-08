import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  DashboardDropZone,
  DashboardResizeHandle,
  defaultDashboardWidgetRegistry,
  findDashboardWidgetDefinition,
} from '@metraly/ui';

describe('dashboard edit mode primitives', () => {
  it('renders a highlighted drop zone when active', () => {
    const { container } = render(<DashboardDropZone active label="Drop widget here" />);

    expect(screen.getByRole('status')).toHaveTextContent('Drop widget here');
    expect(container.firstChild).toHaveClass('is-active');
  });

  it('renders a keyboard-focusable resize handle with an accessible label', () => {
    render(<DashboardResizeHandle label="Resize widget" />);

    const handle = screen.getByRole('separator', { name: 'Resize widget' });
    expect(handle).toHaveAttribute('tabIndex', '0');
  });

  it('resolves widget definitions from the shared registry', () => {
    expect(findDashboardWidgetDefinition(defaultDashboardWidgetRegistry, 'metric-chart')).toMatchObject({
      title: 'Metric Chart',
      state: 'live',
    });
    expect(findDashboardWidgetDefinition(defaultDashboardWidgetRegistry, 'missing-type')).toBeUndefined();
  });
});
