import type { Meta, StoryObj } from '@storybook/react';
import { StateBadge } from '@metraly/ui';

const meta: Meta<typeof StateBadge> = {
  title: 'Components/StateBadge',
  component: StateBadge,
  args: {
    state: 'live',
    label: 'Live',
  },
};
export default meta;
type Story = StoryObj<typeof StateBadge>;

export const Live: Story = {};

export const New: Story = {
  args: { state: 'new', label: 'New' },
};

export const Ok: Story = {
  args: { state: 'ok', label: 'Healthy' },
};

export const Stale: Story = {
  args: { state: 'stale', label: 'Stale 4m' },
};

export const Delayed: Story = {
  args: { state: 'delayed', label: 'Delayed' },
};

export const Disconnected: Story = {
  args: { state: 'disconnected' },
};

export const Error: Story = {
  args: { state: 'error' },
};

export const Warning: Story = {
  args: { state: 'warning' },
};

export const NoData: Story = {
  args: { state: 'noData' },
};

export const Info: Story = {
  args: { state: 'info' },
};

export const Purple: Story = {
  args: { state: 'purple', label: 'Beta' },
};

export const Disabled: Story = {
  args: { state: 'disabled', label: 'N/A' },
};

export const Success: Story = {
  args: { state: 'success' },
};

export const Compact: Story = {
  args: { state: 'live', label: 'Live', size: 'sm' },
};

export const WithoutIndicator: Story = {
  args: { state: 'stale', label: 'Stale', showIndicator: false },
};

export const PulseDisabled: Story = {
  name: 'Pulse — off',
  args: { state: 'live', label: 'Live', pulse: false },
};

export const CanonicalMatrix = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
      gap: 24,
      padding: 24,
      background: 'var(--m-bg-0)',
      color: 'var(--m-fg-1)',
    }}
  >
    {([
      ['LIVE',         { state: 'live' as const }],
      ['OK',           { state: 'ok' as const, label: 'Healthy' }],
      ['STALE',        { state: 'stale' as const, label: 'Stale 4m' }],
      ['ERROR',        { state: 'error' as const }],
      ['NEW / UNREAD', { state: 'new' as const }],
      ['INFO',         { state: 'info' as const }],
      ['DISCONNECTED', { state: 'disconnected' as const }],
      ['DELAYED',      { state: 'delayed' as const }],
      ['NO DATA',      { state: 'noData' as const }],
      ['WARNING',      { state: 'warning' as const }],
      ['SUCCESS',      { state: 'success' as const }],
      ['PURPLE',       { state: 'purple' as const, label: 'Beta' }],
      ['DISABLED',     { state: 'disabled' as const, label: 'N/A' }],
    ] as const).map(([label, props]) => (
      <div key={label} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
        <span style={{ fontSize: 10, letterSpacing: '0.06em', color: 'var(--m-fg-3)', fontFamily: 'var(--m-font-mono)', textTransform: 'uppercase' }}>{label}</span>
        <StateBadge {...(props as any)} />
      </div>
    ))}
  </div>
);
