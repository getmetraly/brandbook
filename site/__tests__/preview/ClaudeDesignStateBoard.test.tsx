import { fireEvent, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  ComponentStateBoard,
  EngineeringDashboardEditorPreview,
} from '../../app/components/previews/ClaudeDesignStateBoard';
import { MetralyTable, type MetralyTableColumn } from '@metraly/ui';
import { MetralyChartCard } from '@metraly/ui/charts';

jest.mock('recharts', () => {
  const React = require('react');
  const Chart = ({ children, title }: { children?: React.ReactNode; title?: string }) =>
    React.createElement('svg', { role: 'presentation', 'data-chart-title': title }, children);
  const Primitive = () => null;
  return {
    ResponsiveContainer: ({ children }: { children?: React.ReactNode }) => React.createElement('div', null, children),
    LineChart: Chart,
    AreaChart: Chart,
    BarChart: Chart,
    ComposedChart: Chart,
    CartesianGrid: Primitive,
    XAxis: Primitive,
    YAxis: Primitive,
    Tooltip: Primitive,
    Line: Primitive,
    Area: Primitive,
    Bar: Primitive,
  };
});

type TestRow = {
  team: string;
  status: string;
};

const columns: MetralyTableColumn<TestRow>[] = [
  { key: 'team', header: 'Team' },
  { key: 'status', header: 'Status' },
];

describe('Claude Design preview hardening surface', () => {
  it('renders all required component state groups without visible draft copy', () => {
    render(<ComponentStateBoard />);

    [
      'MetralyCheckbox',
      'MetralyRadio',
      'MetralySwitch',
      'MetralySelect',
      'MetralyTabs',
      'Widget library',
      'Widget surface',
      'DashboardToolbar / DropZone / ResizeHandle',
    ].forEach((group) => {
      expect(screen.getByRole('region', { name: group })).toBeInTheDocument();
    });

    expect(screen.queryByText(/draft/i)).not.toBeInTheDocument();
  });

  it('renders disabled controls, tab semantics and selected table rows', () => {
    render(<ComponentStateBoard />);

    expect(screen.getByRole('checkbox', { name: 'Locked policy' })).toBeDisabled();
    expect(screen.getByRole('switch', { name: 'Read-only board' })).toBeDisabled();
    expect(screen.getAllByRole('tablist').length).toBeGreaterThan(0);
    expect(screen.getAllByRole('tab', { selected: true }).length).toBeGreaterThan(0);
    expect(screen.getByRole('row', { selected: true })).toHaveTextContent('Growth');
  });

  it('covers loading and empty table states with accessible labels', () => {
    const { rerender } = render(<MetralyTable columns={columns} data={[]} loading ariaLabel="Loading delivery table" />);

    expect(screen.getByRole('table', { name: 'Loading delivery table' })).toHaveAttribute('aria-busy', 'true');
    expect(document.querySelectorAll('.metraly-table-row.is-loading')).toHaveLength(3);

    rerender(<MetralyTable columns={columns} data={[]} emptyText="No delivery data in this window." ariaLabel="Empty delivery table" />);

    expect(screen.getByRole('table', { name: 'Empty delivery table' })).toBeInTheDocument();
    expect(screen.getByText('No delivery data in this window.')).toBeInTheDocument();
  });

  it('renders dashboard editor scenario landmarks and editor states', () => {
    const { container } = render(<EngineeringDashboardEditorPreview />);

    expect(screen.getByRole('complementary', { name: 'Dashboard navigation' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Engineering Dashboard Editor' })).toBeInTheDocument();
    expect(screen.getByRole('complementary', { name: 'Widget library' })).toBeInTheDocument();
    expect(screen.getAllByRole('status', { name: 'Live sync' }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Release to add widget')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Pipeline source disconnected');
    expect(screen.getByRole('table', { name: 'PR review latency by team table' })).toBeInTheDocument();
    expect(screen.getAllByRole('img', { name: /chart/i }).length).toBeGreaterThan(0);

    const selectedWidget = container.querySelector('.metraly-widget-shell.is-selected');
    const draggingWidget = container.querySelector('.metraly-widget-shell.is-dragging');
    expect(selectedWidget).toBeInTheDocument();
    expect(draggingWidget).toBeInTheDocument();
    expect(container.querySelectorAll('.metraly-dashboard-resize-handle').length).toBeGreaterThanOrEqual(3);
  });
 
  it('covers full-width widgets, active drop target and resize handles', () => {
    const { container } = render(<EngineeringDashboardEditorPreview />);

    const dropZone = screen.getByText('Release to add widget').closest('.metraly-dashboard-drop-zone');

    expect(container.querySelector('.metraly-widget-shell.is-fullwidth')).toBeInTheDocument();
    expect(dropZone).toHaveAttribute('data-drop-zone-state', 'active');
    const resizeWidthHandles = screen.getAllByRole('separator', { name: 'Resize width' });
    expect(resizeWidthHandles[0]).toBeInTheDocument();
    expect(screen.getAllByRole('separator', { name: 'Resize height' })[0]).toHaveClass('is-active');
    expect(screen.getAllByRole('separator', { name: 'Resize width and height' })[0]).toHaveClass('is-active');
  });
  it('shows dragging widgets and the empty dashboard state in the editor scenario', () => {
    const { container } = render(<EngineeringDashboardEditorPreview />);

    expect(container.querySelector('.metraly-widget-shell.is-dragging')).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Empty dashboard' })).toBeInTheDocument();
    expect(screen.getByText('Add delivery widget')).toBeInTheDocument();
  });

  it('shows the area chart tooltip on hover over a plotted value', () => {
    const { container } = render(<EngineeringDashboardEditorPreview />);

    fireEvent.pointerEnter(screen.getByRole('button', { name: 'Tue: Flow efficiency 74%' }));
    expect(screen.getByRole('tooltip')).toHaveTextContent('Tue');
    expect(screen.getByRole('tooltip')).toHaveTextContent('Flow efficiency');
    expect(screen.getByRole('tooltip')).toHaveTextContent('74%');
    expect(container.querySelector('.claude-chart-cursor-point')).toBeInTheDocument();
  });

  it('shows the composite chart tooltip on hover over a plotted value', () => {
    const { container } = render(<EngineeringDashboardEditorPreview />);

    fireEvent.pointerEnter(
      screen.getByRole('button', {
        name: 'Wed: Deployments 21/day, Flow efficiency 77%, Failure rate 3.9%',
      }),
    );
    expect(screen.getByRole('tooltip')).toHaveTextContent('Deployments');
    expect(screen.getByRole('tooltip')).toHaveTextContent('21/day');
    expect(screen.getByRole('tooltip')).toHaveTextContent('Failure rate');
    expect(container.querySelector('.claude-chart-hover-band')).toBeInTheDocument();
  });

  it('does not render pulse-wave before drag labels or inside default drop zones', () => {
    const { container } = render(<EngineeringDashboardEditorPreview />);
    const dragHandles = screen.getAllByRole('button', { name: 'Drag to move' });
    const dropZone = screen.getByText('Release to add widget').closest('.metraly-dashboard-drop-zone');

    dragHandles.forEach((handle) => {
      expect(within(handle).queryByText(/pulse/i)).not.toBeInTheDocument();
      expect(handle.querySelector('.metraly-widget-shell-grip-dots')).toBeInTheDocument();
    });
    expect(dropZone?.querySelector('.metraly-dashboard-drop-zone-line')).not.toBeInTheDocument();
    expect(container.querySelector('.metraly-dashboard-drop-zone .metraly-pulse-marker')).not.toBeInTheDocument();
  });

  it('editor note does not contain a pulse marker', () => {
    const { container } = render(<EngineeringDashboardEditorPreview />);
    const note = container.querySelector('[role="note"]');
    expect(note).toBeInTheDocument();
    expect(note?.querySelector('.metraly-pulse-marker')).not.toBeInTheDocument();
  });

  it('active sidebar nav item has aria-current="page"', () => {
    render(<EngineeringDashboardEditorPreview />);
    const nav = screen.getByRole('navigation');
    const active = within(nav).getByRole('button', { name: /delivery/i });
    expect(active).toHaveAttribute('aria-current', 'page');
  });
});

describe('MetralyChartCard state coverage', () => {
  it('renders error state with role=alert', () => {
    render(<MetralyChartCard title="Test" summary="summary text" state="error" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Chart disconnected');
  });

  it('renders loading state with role=status', () => {
    render(<MetralyChartCard title="Test" summary="summary text" state="loading" />);
    expect(screen.getByRole('status')).toHaveTextContent('Loading chart');
  });

  it('renders noData state with role=status', () => {
    render(<MetralyChartCard title="Test" summary="summary text" state="noData" />);
    expect(screen.getByRole('status')).toHaveTextContent('No chart data');
  });

  it('renders text summary alternative', () => {
    render(<MetralyChartCard title="Cycle time" summary="Cycle time improved this sprint." />);
    expect(screen.getByText('Cycle time improved this sprint.')).toBeInTheDocument();
  });
});
