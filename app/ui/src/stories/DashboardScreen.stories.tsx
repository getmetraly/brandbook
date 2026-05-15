import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';

// ---------------------------------------------------------------------------
// Static fixture data
// ---------------------------------------------------------------------------

const METRIC_CARDS = [
  { id: 'deploy-freq', label: 'Deployment Frequency', value: '4.2', unit: 'deploys/day', trend: '+12%', up: true },
  { id: 'lead-time', label: 'Lead Time for Changes', value: '38h', unit: 'avg', trend: '-8%', up: false },
  { id: 'cfr', label: 'Change Failure Rate', value: '4.5%', unit: 'last 30d', trend: '-2.1%', up: false },
  { id: 'mttr', label: 'MTTR', value: '44min', unit: 'avg', trend: '+5min', up: true },
  { id: 'ci-pass', label: 'CI Pass Rate', value: '92.4%', unit: 'last 7d', trend: '+2.1%', up: true },
  { id: 'pr-cycle', label: 'PR Cycle Time', value: '22h', unit: 'p50', trend: '-3h', up: false },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function MetricCard({
  label,
  value,
  unit,
  trend,
  up,
  loading = false,
}: {
  label: string;
  value: string;
  unit: string;
  trend: string;
  up: boolean;
  loading?: boolean;
}) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 12,
        padding: '18px 20px',
        display: 'grid',
        gap: 8,
      }}
    >
      <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(226,230,240,0.45)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        {label}
      </div>
      {loading ? (
        <div style={{ height: 28, background: 'rgba(255,255,255,0.06)', borderRadius: 6, animation: 'pulse 1.5s ease-in-out infinite' }} />
      ) : (
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: '#E2E6F0', letterSpacing: '-0.5px' }}>{value}</span>
          <span style={{ fontSize: 11, color: 'rgba(226,230,240,0.4)' }}>{unit}</span>
        </div>
      )}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 3,
          fontSize: 11,
          fontWeight: 600,
          color: up ? '#00C853' : '#FF9100',
          background: up ? 'rgba(0,200,83,0.1)' : 'rgba(255,145,0,0.1)',
          padding: '2px 8px',
          borderRadius: 999,
          width: 'fit-content',
        }}
      >
        {up ? '▲' : '▼'} {trend}
      </div>
    </div>
  );
}

function DashboardLayout({
  loading = false,
  title = 'Overview',
}: {
  loading?: boolean;
  title?: string;
}) {
  return (
    <div
      style={{
        height: '100vh',
        background: '#0B0F19',
        color: '#E2E6F0',
        fontFamily: 'system-ui, sans-serif',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Topbar */}
      <header
        style={{
          height: 51,
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          gap: 12,
          background: 'rgba(11,15,25,0.9)',
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 700 }}>{title}</span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: 'rgba(226,230,240,0.4)',
            background: 'rgba(255,255,255,0.05)',
            padding: '3px 8px',
            borderRadius: 999,
          }}
        >
          Last 30 days
        </span>
      </header>

      {/* Content */}
      <main style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 16,
            marginBottom: 24,
          }}
        >
          {METRIC_CARDS.map((m) => (
            <MetricCard key={m.id} {...m} loading={loading} />
          ))}
        </div>

        {/* Placeholder chart area */}
        <div
          style={{
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 12,
            padding: 24,
            display: 'grid',
            placeItems: 'center',
            minHeight: 200,
            color: 'rgba(226,230,240,0.2)',
            fontSize: 12,
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          Trend chart area
        </div>
      </main>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta = {
  title: 'Screens/DashboardScreen',
  parameters: { layout: 'fullscreen' },
};

export default meta;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/** Default: populated dashboard with metric cards and trend indicators. */
export const Default: StoryObj = {
  render: () => <DashboardLayout />,
};

/** Loading: skeleton state while metrics are fetching. */
export const Loading: StoryObj = {
  render: () => <DashboardLayout loading title="Overview — loading" />,
};
