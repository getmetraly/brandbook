import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DashboardDropZone, DashboardEmptyState, DashboardWidget, MetralyTable, type MetralyTableColumn } from '@metraly/ui';

type ReviewRow = {
  team: string;
  open: string;
  response: string;
};

const columns: MetralyTableColumn<ReviewRow>[] = [
  { key: 'team', header: 'Team' },
  { key: 'open', header: 'Open PRs', align: 'right' },
  { key: 'response', header: 'First response', align: 'right' },
];

const rows: ReviewRow[] = [
  { team: 'Platform', open: '8', response: '2.4h' },
  { team: 'Growth', open: '14', response: '9.1h' },
  { team: 'Data', open: '12', response: '14.6h' },
  { team: 'Infra', open: '3', response: '1.1h' },
];

describe('Phase 3 table and board-edit composition conformance', () => {
  it('renders MetralyTable live and unread row markers without adding row interaction', () => {
    render(
      <MetralyTable
        ariaLabel="Review latency table"
        columns={columns}
        data={rows}
        rowKey={(row) => row.team}
        selectedRowKeys={['Growth']}
        unreadRowKeys={['Data']}
        liveRowKeys={['Platform']}
      />,
    );

    const liveRow = screen.getByRole('row', { name: 'Platform row live' });
    const unreadRow = screen.getByRole('row', { name: 'Data row unread' });
    const selectedRow = screen.getByRole('row', { selected: true });

    expect(liveRow).toHaveAttribute('data-row-marker', 'live');
    expect(liveRow).toHaveAttribute('data-state', 'live');
    expect(liveRow.querySelector('.metraly-table-row-marker')).toHaveAttribute('data-marker', 'live');

    expect(unreadRow).toHaveAttribute('data-row-marker', 'unread');
    expect(unreadRow).toHaveClass('is-unread');
    expect(unreadRow.querySelector('.metraly-table-row-marker')).toHaveAttribute('data-marker', 'unread');

    expect(selectedRow).toHaveAttribute('data-row-key', 'Growth');
    expect(selectedRow).toHaveAttribute('data-state', 'selected');
  });

  it('supports custom row marker resolver for stale and error rows', () => {
    render(
      <MetralyTable
        ariaLabel="Source health table"
        columns={columns}
        data={rows}
        rowKey={(row) => row.team}
        rowMarker={(row) => (row.team === 'Growth' ? 'stale' : row.team === 'Data' ? 'error' : undefined)}
      />,
    );

    expect(screen.getByRole('row', { name: 'Growth row stale' })).toHaveAttribute('data-row-marker', 'stale');
    expect(screen.getByRole('row', { name: 'Data row error' })).toHaveAttribute('data-row-marker', 'error');
  });

  it('renders sticky header and dense dashboard table contracts', () => {
    render(
      <MetralyTable
        ariaLabel="Dense dashboard table"
        columns={columns}
        data={rows}
        stickyHeader
        dense
      />,
    );

    const table = screen.getByRole('table', { name: 'Dense dashboard table' });

    expect(table).toHaveAttribute('data-sticky-header', 'on');
    expect(table).toHaveAttribute('data-density', 'dense');
    expect(table).toHaveClass('has-sticky-header');
    expect(table).toHaveClass('is-dense');
  });

  it('keeps loading and empty states observable for the table primitive', () => {
    const { rerender } = render(<MetralyTable ariaLabel="Loading table" columns={columns} data={[]} loading />);

    expect(screen.getByRole('table', { name: 'Loading table' })).toHaveAttribute('aria-busy', 'true');
    expect(document.querySelectorAll('.metraly-table-row.is-loading[data-state="loading"]')).toHaveLength(3);

    rerender(<MetralyTable ariaLabel="Empty table" columns={columns} data={[]} emptyText="No review data" />);

    expect(screen.getByRole('table', { name: 'Empty table' })).toHaveAttribute('data-sticky-header', 'off');
    expect(screen.getByText('No review data').closest('tr')).toHaveAttribute('data-state', 'empty');
  });

  it('renders board-edit composition states with selected, dragging, full-width, drop target and empty dashboard', () => {
    const { container } = render(
      <div>
        <DashboardWidget id="selected" title="Selected widget" selected onDragStart={() => undefined}>
          Selected body
        </DashboardWidget>
        <DashboardWidget id="dragging" title="Dragging widget" dragging onDragStart={() => undefined}>
          Dragging body
        </DashboardWidget>
        <DashboardWidget id="full" title="Full-width widget" selected fullWidth onDragStart={() => undefined}>
          Full body
        </DashboardWidget>
        <DashboardDropZone state="active" />
        <DashboardDropZone state="rejected" />
        <DashboardEmptyState title="No widgets yet" description="Add the first delivery widget." action={<button type="button">Add delivery widget</button>} />
      </div>,
    );

    expect(container.querySelector('.metraly-widget-shell.is-selected')).toBeInTheDocument();
    expect(container.querySelector('.metraly-widget-shell.is-dragging')).toBeInTheDocument();
    expect(container.querySelector('.metraly-widget-shell.is-fullwidth')).toBeInTheDocument();
    expect(screen.getByRole('status', { name: /Release to add widget/i })).toHaveAttribute('data-drop-zone-state', 'active');
    expect(screen.getByRole('status', { name: /Cannot drop here/i })).toHaveAttribute('data-drop-zone-state', 'rejected');
    expect(screen.getByRole('region', { name: /Empty dashboard/ })).toBeInTheDocument();
  });
});
