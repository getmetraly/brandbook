import type { Meta, StoryObj } from '@storybook/react';
import { StateBadge } from '@metraly/ui';
import {
  MetralyAreaChart,
  MetralyBarChart,
  MetralyChartCard,
  MetralyComposedChart,
  MetralyLineChart,
} from '@metraly/ui/charts';
import '@metraly/ui/styles/metraly-state-badge.css';
import '@metraly/ui/styles/metraly-charts.css';

const data = [
  { name: 'Mon', review: 8.4, deploys: 14, flow: 72, failure: 4.6 },
  { name: 'Tue', review: 7.8, deploys: 17, flow: 74, failure: 4.1 },
  { name: 'Wed', review: 6.2, deploys: 21, flow: 77, failure: 3.9 },
  { name: 'Thu', review: 5.8, deploys: 20, flow: 80, failure: 4.2 },
  { name: 'Fri', review: 5.4, deploys: 24, flow: 82, failure: 3.6 },
];

function ChartWrapperShowcase() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16 }}>
      <MetralyChartCard title="Review latency" summary="Review latency improved from 8.4 hours to 5.4 hours." badge={<StateBadge state="live" label="Live" />}>
        <MetralyLineChart data={data} xKey="name" ariaLabel="Review latency line chart" summary="Review latency improved from 8.4 hours to 5.4 hours." series={[{ dataKey: 'review', name: 'Review latency', tone: 'primary' }]} />
      </MetralyChartCard>
      <MetralyChartCard title="Deployment frequency" summary="Deployments increased from 14 to 24 per day.">
        <MetralyBarChart data={data} xKey="name" ariaLabel="Deployment frequency bar chart" summary="Deployments increased from 14 to 24 per day." series={[{ dataKey: 'deploys', name: 'Deploys', tone: 'secondary' }]} />
      </MetralyChartCard>
      <MetralyChartCard title="Flow efficiency" summary="Flow efficiency increased from 72 percent to 82 percent." state="selected">
        <MetralyAreaChart data={data} xKey="name" ariaLabel="Flow efficiency area chart" summary="Flow efficiency increased from 72 percent to 82 percent." series={[{ dataKey: 'flow', name: 'Flow efficiency', tone: 'primary' }]} />
      </MetralyChartCard>
      <MetralyChartCard title="Delivery composite" summary="Deploys rose while failure rate stayed under five percent." state="resizing">
        <MetralyComposedChart
          data={data}
          xKey="name"
          ariaLabel="Delivery composite chart"
          summary="Deploys rose while failure rate stayed under five percent."
          series={[
            { dataKey: 'flow', name: 'Flow efficiency', kind: 'area', tone: 'primary' },
            { dataKey: 'deploys', name: 'Deploys', kind: 'bar', tone: 'secondary' },
            { dataKey: 'failure', name: 'Failure rate', kind: 'line', tone: 'warning' },
          ]}
        />
      </MetralyChartCard>
      <MetralyChartCard title="No data chart" summary="No data is available in this window." state="noData" />
      <MetralyChartCard title="Disconnected chart" summary="The chart source is disconnected." state="error" />
    </div>
  );
}

const meta: Meta<typeof ChartWrapperShowcase> = {
  title: 'Metraly/Chart Wrappers',
  component: ChartWrapperShowcase,
};

export default meta;
type Story = StoryObj<typeof ChartWrapperShowcase>;

export const Default: Story = {};
