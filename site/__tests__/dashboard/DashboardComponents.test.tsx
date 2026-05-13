import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DashboardEmptyState, DashboardGrid, DashboardResizeHandle, DashboardToolbar, DashboardWidget } from '@metraly/ui';

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
    const { container } = render(
      <DashboardWidget id="w1" title="Flow efficiency" selected onDragStart={() => undefined}>81%</DashboardWidget>
    );

    expect(screen.getByRole('button', { name: 'Drag to move' })).toBeInTheDocument();
    expect(container.querySelector('.metraly-widget-shell-grip-dots')).toBeInTheDocument();
    expect(container.querySelector('.metraly-widget-shell-resize-handle')).toBeInTheDocument();
    expect(container.querySelector('.metraly-widget-shell')).toBeInTheDocument();
  });

  it('search input is readOnly and has no onChange when onSearchChange is not provided', () => {
    render(<DashboardToolbar title="Board" searchValue="" />);
    const input = screen.getByRole('searchbox');
    expect(input).toHaveAttribute('readonly');
    // onChange must not be wired — simulating change must not throw
    expect(() => fireEvent.change(input, { target: { value: 'x' } })).not.toThrow();
  });

  it('search input fires onSearchChange when handler is provided', () => {
    const onSearch = jest.fn();
    render(<DashboardToolbar title="Board" searchValue="q" onSearchChange={onSearch} />);
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'new' } });
    expect(onSearch).toHaveBeenCalledWith('new');
  });

  it('inactive resize handle is not focusable', () => {
    const { container } = render(<DashboardResizeHandle direction="east" label="Resize width" />);
    const handle = container.querySelector('.metraly-dashboard-resize-handle');
    expect(handle).not.toHaveAttribute('tabindex', '0');
  });

  it('active resize handle is focusable with correct label', () => {
    render(<DashboardResizeHandle direction="east" label="Resize width" active />);
    const handle = screen.getByRole('separator', { name: 'Resize width' });
    expect(handle).toHaveAttribute('tabindex', '0');
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
