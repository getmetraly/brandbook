import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { MetralyFilterBar, MetralySegmentedControl, StateBadge, StateBlock } from '@metraly/ui';

// ---------------------------------------------------------------------------
// Shared fixture data
// ---------------------------------------------------------------------------

const PLUGIN_FIXTURES = [
  { id: 'github', name: 'GitHub Advanced', category: 'Sources', description: 'Deep PR analytics, CODEOWNERS, and advanced workflow metrics.', installed: true, status: 'live' as const, rating: 4.9, installCount: '12.4k' },
  { id: 'jira', name: 'Jira Sync Pro', category: 'Sources', description: 'Bi-directional sync with Jira epics, sprints, velocity and burndown.', installed: false, status: 'live' as const, rating: 4.7, installCount: '8.1k' },
  { id: 'ai-explainer', name: 'AI Explainer', category: 'AI', description: 'Natural language summaries for any metric card. Powered by your local LLM.', installed: true, status: 'preview' as const, rating: 4.8, installCount: '5.6k' },
  { id: 'slack', name: 'Slack Digest', category: 'Alerts', description: 'Daily and weekly engineering digests posted to your Slack channels.', installed: false, status: 'live' as const, rating: 4.5, installCount: '9.3k' },
  { id: 'anomaly', name: 'AI Anomaly Guard', category: 'AI', description: 'ML-powered anomaly detection across all DORA metrics with alert routing.', installed: false, status: 'preview' as const, rating: 4.9, installCount: '1.7k' },
  { id: 'csv', name: 'CSV Exporter', category: 'Exporters', description: 'Export any dashboard to CSV with configurable date ranges and field mapping.', installed: false, status: 'live' as const, rating: 4.2, installCount: '6.7k' },
];

// ---------------------------------------------------------------------------
// Placeholder component — real implementation ships in Phase 9
// ---------------------------------------------------------------------------

interface PluginItem {
  id: string;
  name: string;
  category: string;
  description: string;
  installed: boolean;
  status: 'live' | 'preview' | 'coming-soon';
  rating: number;
  installCount: string;
}

function PluginCatalogPlaceholder({
  plugins = PLUGIN_FIXTURES,
  empty = false,
}: {
  plugins?: PluginItem[];
  empty?: boolean;
}) {
  const [filter, setFilter] = React.useState('All');
  const categoryOptions = ['All', 'Sources', 'AI', 'Alerts', 'Exporters'].map((label) => ({
    label,
    value: label,
  }));

  const visible =
    filter === 'All' ? plugins : plugins.filter((p) => p.category === filter);

  return (
    <div
      style={{
        display: 'grid',
        gap: 20,
        padding: 24,
        background: 'var(--m-bg-0)',
        minHeight: 400,
        borderRadius: 'var(--m-radius-md)',
        border: '1px solid var(--m-line)',
      }}
    >
      {/* Phase label */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <span
          style={{
            fontSize: 'var(--m-fs-10)',
            color: 'var(--m-fg-3)',
            fontFamily: 'var(--m-font-mono)',
            background: 'var(--m-bg-2)',
            padding: '2px 8px',
            borderRadius: 999,
            border: '1px solid var(--m-line-faint)',
          }}
        >
          Phase 9 · PluginCatalog
        </span>
      </div>

      <MetralyFilterBar
        filters={[
          {
            id: 'category',
            label: 'Category',
            control: (
              <MetralySegmentedControl
                ariaLabel="Plugin category"
                options={categoryOptions}
                value={filter}
                onValueChange={setFilter}
                fullWidth
                size="sm"
              />
            ),
            meta: `${visible.length} shown`,
          },
        ]}
      />

      {empty || visible.length === 0 ? (
        <StateBlock
          variant="no-results"
          title="No plugins found"
          description="Try a different category or clear the search filter."
        />
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 14,
          }}
        >
          {visible.map((p) => (
            <div
              key={p.id}
              style={{
                border: '1px solid var(--m-line-faint)',
                borderRadius: 'var(--m-radius-md)',
                padding: '16px',
                background: 'var(--m-bg-1)',
                display: 'grid',
                gap: 10,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: 'var(--m-bg-3)',
                    border: '1px solid var(--m-line)',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 18,
                  }}
                >
                  ◈
                </div>
                <StateBadge
                  state={p.status === 'preview' ? 'purple' : p.installed ? 'live' : 'disabled'}
                  label={p.installed ? 'Installed' : p.status === 'preview' ? 'Preview' : ''}
                />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 'var(--m-fs-13)',
                    fontWeight: 700,
                    color: 'var(--m-fg-0)',
                    marginBottom: 4,
                  }}
                >
                  {p.name}
                </div>
                <div
                  style={{
                    fontSize: 'var(--m-fs-10)',
                    color: 'var(--m-fg-3)',
                    lineHeight: 1.5,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {p.description}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 'var(--m-fs-10)',
                  color: 'var(--m-fg-3)',
                  fontFamily: 'var(--m-font-mono)',
                  marginTop: 'auto',
                }}
              >
                <span>★ {p.rating} · {p.installCount}</span>
                <div
                  style={{
                    padding: '5px 12px',
                    borderRadius: 6,
                    fontSize: 'var(--m-fs-10)',
                    fontWeight: 600,
                    background: p.installed
                      ? 'transparent'
                      : 'color-mix(in oklab, var(--m-cyan-500) 12%, var(--m-bg-2))',
                    border: p.installed
                      ? '1px solid var(--m-line)'
                      : '1px solid color-mix(in oklab, var(--m-cyan-500) 35%, var(--m-line))',
                    color: p.installed ? 'var(--m-fg-3)' : 'var(--m-cyan-500)',
                    cursor: 'pointer',
                  }}
                >
                  {p.installed ? 'Manage' : 'Install'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta = {
  title: 'Scenarios/PluginCatalog',
  parameters: { layout: 'padded' },
};

export default meta;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/** Default: full catalog with filter chips and installed/preview badges. */
export const Default: StoryObj = {
  render: () => <PluginCatalogPlaceholder />,
};

/** AI category filtered: shows only AI plugins. */
export const AIPlugins: StoryObj = {
  render: () => <PluginCatalogPlaceholder plugins={PLUGIN_FIXTURES.filter((p) => p.category === 'AI')} />,
};

/** Empty results: no plugins match the active filter. */
export const EmptyResults: StoryObj = {
  render: () => <PluginCatalogPlaceholder empty />,
};
