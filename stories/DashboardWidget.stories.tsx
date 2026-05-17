import type { Meta, StoryObj } from '@storybook/nextjs';
import { DashboardWidget, MetralyButton } from '@metraly/ui';

const stageStyle = {
  minHeight: '100dvh',
  boxSizing: 'border-box' as const,
  padding: 24,
  background: 'var(--m-bg-0)',
  color: 'var(--m-fg-0)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  overflow: 'hidden',
};

function widgetFrameStyle(args: Partial<React.ComponentProps<typeof DashboardWidget>>) {
  const isWide = Boolean(args.fullWidth);
  const hasFooter = Boolean(args.footer);
  const isTallState = Boolean(args.loading || args.state === 'noData' || args.state === 'error' || args.state === 'disconnected');
  return {
    width: isWide ? 'min(920px, 100%)' : 'min(320px, 100%)',
    height: isWide ? (hasFooter ? 170 : 148) : isTallState ? 220 : 180,
  };
}

const meta: Meta<typeof DashboardWidget> = {
  title: 'Components/DashboardWidget',
  component: DashboardWidget,
  parameters: { layout: 'fullscreen' },
  args: {
    id: 'w1',
    title: 'Deployment frequency',
    subtitle: 'DORA/DEPLOY-FREQ',
    state: 'live',
    stateLabel: 'Live',
    children: (
      <div style={{ padding: '12px 10px', color: 'var(--m-fg-1)', fontSize: 'var(--m-fs-12)', margin: 0 }}>
        <strong style={{ display: 'block', fontSize: 'var(--m-fs-18)', letterSpacing: '-0.03em' }}>24 / day</strong>
        <span style={{ color: 'var(--m-ok)', fontFamily: 'var(--m-font-mono)', fontSize: 'var(--m-fs-10)' }}>▲ 18% vs -14d</span>
      </div>
    ),
  },
  render: (args) => (
    <div style={stageStyle}>
      <div style={widgetFrameStyle(args)}>
        <DashboardWidget {...args} />
      </div>
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof DashboardWidget>;

export const Default: Story = {};

export const Selected: Story = {
  args: { selected: true, resizable: true },
};

export const Dragging: Story = {
  args: { dragging: true },
};

export const Resizing: Story = {
  args: { selected: true, resizing: true, resizable: true },
};

export const Loading: Story = {
  args: { id: 'w1', title: 'MTTR', subtitle: 'DORA/MTTR', state: 'live', loading: true, children: undefined },
};

export const Empty: Story = {
  args: {
    id: 'w1',
    title: 'CI failure rate',
    subtitle: 'CI/FAIL',
    state: 'noData',
    children: undefined,
    stateTitle: 'No telemetry in this range',
    stateDescription: '0 events · widen the time window',
    stateAction: <MetralyButton variant='ghost' size='sm'>Change range</MetralyButton>,
  },
};

export const Stale: Story = {
  args: {
    state: 'stale',
    stateLabel: 'Stale 4m',
    children: (
      <div style={{ padding: '12px 10px', color: 'var(--m-fg-1)', fontSize: 'var(--m-fs-12)', margin: 0 }}>
        <strong style={{ display: 'block', fontSize: 'var(--m-fs-18)', letterSpacing: '-0.03em' }}>4.2%</strong>
        <span style={{ color: 'var(--m-warn)', fontFamily: 'var(--m-font-mono)', fontSize: 'var(--m-fs-10)' }}>last 4m ago</span>
      </div>
    ),
  },
};

export const Error: Story = {
  args: {
    id: 'w1',
    title: 'Flaky builds',
    subtitle: 'METRIC/SCALAR',
    state: 'error',
    children: undefined,
    stateTitle: 'Unable to load widget',
    stateDescription: 'The metric source returned an error.',
    stateAction: <MetralyButton variant='secondary' size='sm'>Retry</MetralyButton>,
  },
};

export const Disconnected: Story = {
  args: {
    id: 'w1',
    title: 'Flaky builds',
    subtitle: 'METRIC/SCALAR',
    state: 'disconnected',
    children: undefined,
    stateTitle: 'Source disconnected',
    stateDescription: 'Last sync 12m ago · reconnect to restore live data.',
    stateAction: <MetralyButton variant='secondary' size='sm'>Reconnect</MetralyButton>,
  },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
};

export const WithFooter: Story = {
  args: {
    fullWidth: true,
    footer: <span style={{ color: 'var(--m-fg-3)', fontSize: 'var(--m-fs-10)', fontFamily: 'var(--m-font-mono)' }}>Updated 30s ago</span>,
  },
};
