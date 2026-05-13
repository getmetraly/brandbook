import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  MetralyAreaChart,
  MetralyBarChart,
  MetralyChartCard,
  MetralyChartTooltipContent,
  MetralyComposedChart,
  MetralyLineChart,
  MetralySparkline,
} from '@metraly/ui/charts';
import { StateBadge } from '@metraly/ui';

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

const chartData = [
  { name: 'Mon', review: 8.4, deploys: 14, flow: 72, failure: 4.6 },
  { name: 'Tue', review: 7.8, deploys: 17, flow: 74, failure: 4.1 },
  { name: 'Wed', review: 6.2, deploys: 21, flow: 77, failure: 3.9 },
];

const series = [{ dataKey: 'review', name: 'Review latency', tone: 'primary' }];

describe('Phase 4 chart prototype conformance', () => {
  it('renders MetralyChartCard state matrix and badge slot', () => {
    const { rerender } = render(
      <MetralyChartCard title="Cycle time" summary="Cycle time improved." badge={<StateBadge state="live" />}>
        <div>chart body</div>
      </MetralyChartCard>,
    );

    expect(screen.getByLabelText('Cycle time')).toHaveAttribute('data-chart-state', 'default');
    expect(screen.getByRole('status', { name: 'Live' })).toBeInTheDocument();
    expect(screen.getByText('chart body')).toBeInTheDocument();

    rerender(<MetralyChartCard title="Cycle time" summary="Loading summary" state="loading" />);
    expect(screen.getByRole('status')).toHaveTextContent('Loading chart');

    rerender(<MetralyChartCard title="Cycle time" summary="No data summary" state="noData" />);
    expect(screen.getByRole('status')).toHaveTextContent('No chart data');

    rerender(<MetralyChartCard title="Cycle time" summary="Error summary" state="error" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Chart disconnected');
  });

  it('renders MetralySparkline default, loading, empty and error states', () => {
    const { rerender } = render(<MetralySparkline ariaLabel="Flow sparkline" values={[1, 2, 4]} />);

    let sparkline = screen.getByRole('img', { name: 'Flow sparkline' });
    expect(sparkline).toHaveAttribute('data-chart-type', 'sparkline');
    expect(sparkline).toHaveAttribute('data-chart-state', 'default');
    expect(sparkline).toHaveAttribute('data-point-count', '3');

    rerender(<MetralySparkline ariaLabel="Loading sparkline" values={[]} state="loading" />);
    expect(screen.getByRole('status', { name: 'Loading sparkline' })).toHaveAttribute('data-chart-state', 'loading');

    rerender(<MetralySparkline ariaLabel="Empty sparkline" values={[]} />);
    expect(screen.getByRole('status', { name: 'Empty sparkline' })).toHaveAttribute('data-chart-state', 'empty');

    rerender(<MetralySparkline ariaLabel="Error sparkline" values={[]} state="error" />);
    expect(screen.getByRole('alert', { name: 'Error sparkline' })).toHaveAttribute('data-chart-state', 'error');
  });

  it('renders chart wrappers with chart type, state, series count and point count contracts', () => {
    const { rerender } = render(
      <MetralyLineChart ariaLabel="Review line chart" data={chartData} series={series} summary="Review latency summary" />,
    );

    let chart = screen.getByRole('img', { name: 'Review line chart' });
    expect(chart).toHaveAttribute('data-chart-type', 'line');
    expect(chart).toHaveAttribute('data-chart-state', 'default');
    expect(chart).toHaveAttribute('data-series-count', '1');
    expect(chart).toHaveAttribute('data-point-count', '3');

    rerender(<MetralyAreaChart ariaLabel="Flow area chart" data={chartData} series={[{ dataKey: 'flow', name: 'Flow', tone: 'primary' }]} summary="Flow summary" />);
    chart = screen.getByRole('img', { name: 'Flow area chart' });
    expect(chart).toHaveAttribute('data-chart-type', 'area');

    rerender(<MetralyBarChart ariaLabel="Deploy bar chart" data={chartData} series={[{ dataKey: 'deploys', name: 'Deployments', tone: 'secondary' }]} summary="Deploy summary" />);
    chart = screen.getByRole('img', { name: 'Deploy bar chart' });
    expect(chart).toHaveAttribute('data-chart-type', 'bar');

    rerender(
      <MetralyComposedChart
        ariaLabel="Delivery composed chart"
        data={chartData}
        series={[
          { dataKey: 'deploys', name: 'Deployments', kind: 'bar', tone: 'secondary' },
          { dataKey: 'flow', name: 'Flow', kind: 'area', tone: 'primary' },
          { dataKey: 'failure', name: 'Failure rate', kind: 'line', tone: 'warning' },
        ]}
        summary="Delivery summary"
      />,
    );
    chart = screen.getByRole('img', { name: 'Delivery composed chart' });
    expect(chart).toHaveAttribute('data-chart-type', 'composed');
    expect(chart).toHaveAttribute('data-series-count', '3');
  });

  it('renders wrapper loading, empty and error states without invoking raw chart composition', () => {
    const { rerender } = render(<MetralyLineChart ariaLabel="Empty line" data={[]} series={series} summary="Empty summary" />);

    expect(screen.getByRole('status', { name: 'Empty line' })).toHaveAttribute('data-chart-state', 'empty');
    expect(screen.getByText('No chart data')).toBeInTheDocument();

    rerender(<MetralyAreaChart ariaLabel="Loading area" data={[]} series={series} summary="Loading summary" state="loading" />);
    expect(screen.getByRole('status', { name: 'Loading area' })).toHaveAttribute('data-chart-state', 'loading');

    rerender(<MetralyBarChart ariaLabel="Error bar" data={[]} series={series} summary="Error summary" state="error" />);
    expect(screen.getByRole('alert', { name: 'Error bar' })).toHaveAttribute('data-chart-state', 'error');

    rerender(<MetralyComposedChart ariaLabel="No data composed" data={[]} series={[]} summary="No data summary" state="noData" />);
    expect(screen.getByRole('status', { name: 'No data composed' })).toHaveAttribute('data-chart-state', 'noData');
  });

  it('renders tooltip content with labels and values instead of color-only identification', () => {
    render(
      <MetralyChartTooltipContent
        active
        label="Wed"
        payload={[
          { name: 'Deployments', value: 21, dataKey: 'deploys', color: '#a855f7', unit: '/day' },
          { name: 'Failure rate', value: 3.9, dataKey: 'failure', color: '#f59e0b', unit: '%' },
        ]}
      />,
    );

    const tooltip = screen.getByRole('status');
    expect(tooltip).toHaveTextContent('Wed');
    expect(tooltip).toHaveTextContent('Deployments');
    expect(tooltip).toHaveTextContent('21/day');
    expect(tooltip).toHaveTextContent('Failure rate');
    expect(tooltip).toHaveTextContent('3.9%');
  });
});
