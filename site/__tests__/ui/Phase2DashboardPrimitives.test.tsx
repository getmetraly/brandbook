import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DashboardDropZone, DashboardToolbar, DashboardWidget, WidgetPickerCard } from '@metraly/ui';

describe('Phase 2 dashboard primitive conformance', () => {
  it('renders WidgetPickerCard kind metadata and new state', () => {
    render(
      <WidgetPickerCard
        title="DORA overview"
        description="All four DORA metrics on one card."
        iconLabel="dora"
        kind="dora/overview"
        visualState="new"
        tags={['dora', 'exec']}
      />,
    );

    const card = screen.getByRole('option', { name: /DORA overview/i });

    expect(card).toHaveAttribute('data-state', 'new');
    expect(card).toHaveAttribute('data-kind', 'dora/overview');
    expect(screen.getByText('dora/overview')).toBeInTheDocument();
    expect(screen.getByRole('status', { name: 'New' })).toHaveAttribute('data-state', 'new');
    expect(screen.getByRole('status', { name: 'New' })).toHaveAttribute('data-pulse', 'on');
    expect(screen.getByText('dora')).toHaveAttribute('data-variant', 'primary');
    expect(screen.getByText('exec')).toHaveAttribute('data-variant', 'success');
  });

  it('renders WidgetPickerCard selected, loading, dragging and disabled states', () => {
    const { rerender } = render(
      <WidgetPickerCard title="Deploy frequency" kind="dora/deploy-freq" selected onSelect={() => undefined} />,
    );

    let card = screen.getByRole('option', { name: /Deploy frequency/i });
    expect(card).toHaveAttribute('data-state', 'selected');
    expect(card).toHaveAttribute('aria-selected', 'true');

    rerender(<WidgetPickerCard title="CI failure rate" kind="ci/fail" loading onSelect={() => undefined} />);
    card = screen.getByRole('option', { name: /CI failure rate/i });
    expect(card).toBeDisabled();
    expect(card).toHaveAttribute('data-state', 'loading');
    expect(within(card).getByText('…')).toBeInTheDocument();

    rerender(<WidgetPickerCard title="Blocked work" kind="flow/blocked" dragging />);
    card = screen.getByRole('option', { name: /Blocked work/i });
    expect(card).toHaveAttribute('data-state', 'dragging');
    expect(card).toHaveClass('is-dragging');

    rerender(<WidgetPickerCard title="WIP per engineer" kind="flow/wip" disabled />);
    card = screen.getByRole('option', { name: /WIP per engineer/i });
    expect(card).toHaveAttribute('data-state', 'disabled');
    expect(card).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('status', { name: /disabled/i })).toHaveAttribute('data-state', 'disabled');
  });

  it('renders DashboardWidget header grip and all prototype resize handles when selected', () => {
    const onDragStart = jest.fn();
    const { container } = render(
      <DashboardWidget id="lead-time" title="Lead time" subtitle="PR to production" selected onDragStart={onDragStart}>
        <div>41h</div>
      </DashboardWidget>,
    );

    const shell = screen.getByTestId('widget-shell');
    const header = container.querySelector('.metraly-widget-shell-head');
    const dragHandle = screen.getByRole('button', { name: 'Drag to move' });

    expect(shell).toHaveClass('is-selected');
    expect(header).toContainElement(dragHandle);
    expect(dragHandle).toHaveAttribute('data-drag-handle', 'grip-dots');
    expect(dragHandle.querySelector('.metraly-widget-shell-grip-dots')).toBeInTheDocument();
    expect(dragHandle.querySelector('.metraly-pulse-marker')).not.toBeInTheDocument();

    const handles = screen.getAllByRole('separator');
    expect(handles).toHaveLength(8);
    expect(handles.map((handle) => handle.getAttribute('data-direction'))).toEqual([
      'northwest',
      'north',
      'northeast',
      'east',
      'southeast',
      'south',
      'southwest',
      'west',
    ]);
    handles.forEach((handle) => {
      expect(handle).toHaveAttribute('data-state', 'active');
      expect(handle).toHaveClass('is-active');
    });
  });

  it('does not render resize handles until a resizable widget is selected', () => {
    const { rerender } = render(
      <DashboardWidget id="deploys" title="Deploys" onDragStart={() => undefined}>
        <div>24/day</div>
      </DashboardWidget>,
    );

    expect(screen.queryAllByRole('separator')).toHaveLength(0);

    rerender(
      <DashboardWidget id="deploys" title="Deploys" selected resizable={false} onDragStart={() => undefined}>
        <div>24/day</div>
      </DashboardWidget>,
    );

    expect(screen.queryAllByRole('separator')).toHaveLength(0);
  });

  it('renders DashboardDropZone states with tone and no-pulse contract', () => {
    const { rerender, container } = render(<DashboardDropZone state="idle" />);

    let zone = screen.getByRole('status', { name: /Drop widget here/i });
    expect(zone).toHaveAttribute('data-drop-zone-state', 'idle');
    expect(zone).toHaveAttribute('data-tone', 'neutral');
    expect(zone).toHaveAttribute('data-pulse', 'off');
    expect(zone.querySelector('.metraly-pulse-marker')).not.toBeInTheDocument();
    expect(container.querySelector('.metraly-dashboard-drop-zone-line')).not.toBeInTheDocument();

    rerender(<DashboardDropZone state="hover" />);
    zone = screen.getByRole('status', { name: /Widget can land here/i });
    expect(zone).toHaveAttribute('data-drop-zone-state', 'hover');
    expect(zone).toHaveAttribute('data-tone', 'cyan');
    expect(zone.querySelector('.metraly-dashboard-drop-zone-line')).toBeInTheDocument();

    rerender(<DashboardDropZone state="active" />);
    zone = screen.getByRole('status', { name: /Release to add widget/i });
    expect(zone).toHaveClass('is-active');
    expect(zone).toHaveAttribute('data-tone', 'cyan');
    expect(zone.querySelector('.metraly-dashboard-drop-zone-line')).toBeInTheDocument();

    rerender(<DashboardDropZone state="rejected" />);
    zone = screen.getByRole('status', { name: /Cannot drop here/i });
    expect(zone).toHaveAttribute('data-tone', 'danger');
    expect(within(zone).getByText('!')).toBeInTheDocument();
    expect(zone.querySelector('.metraly-dashboard-drop-zone-line')).not.toBeInTheDocument();

    rerender(<DashboardDropZone state="empty" />);
    zone = screen.getByRole('status', { name: /Add the first widget/i });
    expect(zone).toHaveAttribute('data-tone', 'cyan');
    expect(zone.querySelector('.metraly-dashboard-drop-zone-line')).toBeInTheDocument();
  });

  it('renders DashboardToolbar as a two-row editor surface', () => {
    render(
      <DashboardToolbar
        title="Delivery board"
        description="DORA and flow signals."
        tabs={[{ value: 'delivery', label: 'Delivery' }, { value: 'dora', label: 'DORA' }]}
        activeTab="delivery"
        searchValue=""
        syncState="live"
        editMode
        onToggleEdit={() => undefined}
        onAddWidget={() => undefined}
      />,
    );

    const toolbar = screen.getByRole('banner');
    expect(toolbar).toHaveAttribute('data-layout', 'two-row');
    expect(toolbar).toHaveAttribute('data-edit-mode', 'on');
    expect(toolbar.querySelector('[data-row="tabs"]')).toBeInTheDocument();
    expect(toolbar.querySelector('[data-row="controls"]')).toBeInTheDocument();
    expect(screen.getByRole('tablist', { name: 'Dashboard sections' })).toBeInTheDocument();
    expect(screen.getByRole('searchbox', { name: 'Search dashboard widgets' })).toBeInTheDocument();
    expect(screen.getByRole('status', { name: 'Live sync' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Edit mode on' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Add widget' })).toBeInTheDocument();
  });
});
