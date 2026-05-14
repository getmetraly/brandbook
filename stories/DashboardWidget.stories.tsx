import type { Meta, StoryObj } from '@storybook/react';
import { DashboardWidget } from '@metraly/ui';

const errorContent = (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 16 }}>
    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--m-err-bg)', color: 'var(--m-err)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--m-err)', fontSize: 16 }}>✕</div>
    <div style={{ fontSize: 'var(--m-fs-12)', color: 'var(--m-fg-1)' }}>Source disconnected</div>
    <div style={{ fontSize: 'var(--m-fs-10)', color: 'var(--m-fg-3)', fontFamily: 'var(--m-font-mono)' }}>last sync 12m ago · retrying…</div>
    <button type="button" style={{ marginTop: 4, background: 'transparent', color: 'var(--m-cyan-500)', border: '1px solid var(--m-cyan-500)', padding: '4px 10px', borderRadius: 'var(--m-r-2)', fontSize: 'var(--m-fs-11)', fontFamily: 'var(--m-font-ui)', cursor: 'pointer' }}>Reconnect</button>
  </div>
);

const emptyContent = (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, padding: 16, color: 'var(--m-fg-3)' }}>
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none"><rect x="1" y="10" width="2" height="4" rx="1" fill="currentColor" opacity=".4"/><rect x="4" y="7" width="2" height="7" rx="1" fill="currentColor" opacity=".6"/><rect x="7" y="4" width="2" height="10" rx="1" fill="currentColor" opacity=".8"/><rect x="10" y="2" width="2" height="12" rx="1" fill="currentColor"/><rect x="13" y="6" width="2" height="8" rx="1" fill="currentColor" opacity=".6"/></svg>
    <div style={{ fontSize: 'var(--m-fs-11)' }}>No telemetry in this range</div>
    <div style={{ fontSize: 'var(--m-fs-10)', fontFamily: 'var(--m-font-mono)' }}>0 events · widen the time window</div>
  </div>
);

const loadingContent = (
  <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
    {(['60%', '85%', '45%', '70%'] as const).map((w, i) => (
      <div key={i} style={{ height: 10, width: w, background: 'linear-gradient(90deg, var(--m-bg-3) 0%, var(--m-bg-4) 50%, var(--m-bg-3) 100%)', backgroundSize: '200% 100%', animation: 'm-shimmer 1.4s linear infinite', borderRadius: 4, opacity: 1 - i * 0.12 }} />
    ))}
  </div>
);

const meta: Meta<typeof DashboardWidget> = {
  title: 'Components/DashboardWidget',
  component: DashboardWidget,
  args: {
    id: 'story-widget',
    title: 'Deployment frequency',
    subtitle: 'DORA/DEPLOY-FREQ',
    state: 'live',
    stateLabel: 'Live',
    children: <p style={{ padding: '12px 10px', color: 'var(--m-fg-1)', fontSize: 'var(--m-fs-12)', margin: 0 }}>24 / day</p>,
  },
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
  args: {
    loading: true,
    state: 'info',
    stateLabel: 'Loading',
    children: loadingContent,
  },
};

export const Empty: Story = {
  args: {
    state: 'noData',
    stateLabel: 'No Data',
    children: emptyContent,
  },
};

export const Stale: Story = {
  args: {
    state: 'stale',
    stateLabel: 'Stale 4m',
    children: <p style={{ padding: '12px 10px', color: 'var(--m-fg-1)', fontSize: 'var(--m-fs-12)', margin: 0 }}>4.2%<br /><span style={{ fontSize: 'var(--m-fs-10)', color: 'var(--m-fg-3)' }}>last 4m ago</span></p>,
  },
};

export const Error: Story = {
  name: 'Error · Disconnected',
  args: {
    state: 'disconnected',
    stateLabel: 'Disconnected',
    children: errorContent,
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    state: 'live',
    stateLabel: 'Live',
  },
};
