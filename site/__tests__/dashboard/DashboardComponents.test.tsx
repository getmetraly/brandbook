import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DashboardEmptyState, DashboardGrid, DashboardToolbar, DashboardWidget } from '@metraly/ui';

describe('dashboard components', () => {
  it('renders toolbar metadata and actions', () => {
    render(
      <DashboardToolbar
        title="Dashboard Editor"
        description="Arrange widgets"
        meta="Saved"
        actions={<button type="button">Save</button>}
      />
    );

    expect(screen.getByText('Dashboard Editor')).toBeInTheDocument();
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('renders empty grid state', () => {
    render(<DashboardGrid widgets={[]} renderWidget={() => null} emptyState={<DashboardEmptyState title="Nothing here" />} />);
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('renders dashboard widget content', () => {
    render(<DashboardWidget id="w1" title="Flow efficiency">81%</DashboardWidget>);
    expect(screen.getByText('Flow efficiency')).toBeInTheDocument();
    expect(screen.getByText('81%')).toBeInTheDocument();
  });

  it('renders the canonical widget chrome', () => {
    const { container } = render(<DashboardWidget id="w1" title="Flow efficiency">81%</DashboardWidget>);

    expect(screen.getByLabelText('Drag widget')).toBeInTheDocument();
    expect(container.querySelector('.metraly-widget-shell-resize-handle')).toBeInTheDocument();
    expect(container.querySelector('.metraly-widget-shell')).toBeInTheDocument();
  });

  it('supports selection and removal actions', () => {
    const onSelect = jest.fn();
    const onRemove = jest.fn();

    render(
      <DashboardWidget id="w1" title="Flow efficiency" onSelect={onSelect} onRemove={onRemove}>
        81%
      </DashboardWidget>
    );

    const widget = screen.getByRole('button', { name: /Flow efficiency/ });
    fireEvent.click(widget);
    fireEvent.keyDown(widget, { key: 'Enter' });
    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));

    expect(onSelect).toHaveBeenCalledTimes(2);
    expect(onSelect).toHaveBeenNthCalledWith(1, 'w1');
    expect(onSelect).toHaveBeenNthCalledWith(2, 'w1');
    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onRemove).toHaveBeenCalledWith('w1');
  });
});
