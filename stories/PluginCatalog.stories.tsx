import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  MetralyButton,
  MetralyFilterBar,
  MetralyInput,
  MetralySegmentedControl,
  StateBadge,
  StateBlock,
} from '@metraly/ui';

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
  const [search, setSearch] = React.useState('');

  const categories = React.useMemo(() => ['All', 'Sources', 'AI', 'Alerts', 'Exporters'], []);
  const categoryOptions = React.useMemo(
    () => categories.map((label) => ({ label, value: label })),
    [categories],
  );

  const visible = React.useMemo(() => {
    const query = search.trim().toLowerCase();

    return plugins.filter((plugin) => {
      const matchesCategory = filter === 'All' || plugin.category === filter;
      const matchesSearch =
        query.length === 0 ||
        plugin.name.toLowerCase().includes(query) ||
        plugin.description.toLowerCase().includes(query) ||
        plugin.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [filter, plugins, search]);

  const isEmpty = empty || visible.length === 0;

  return (
    <div
      style={{
        display: 'grid',
        gap: 20,
        padding: 'clamp(14px, 3vw, 24px)',
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
            id: 'search',
            label: 'Search',
            control: (
              <MetralyInput
                search
                fullWidth
                value={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
                placeholder="Plugin, publisher, category…"
                aria-label="Search plugins"
              />
            ),
          },
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
        onReset={() => {
          setFilter('All');
          setSearch('');
        }}
      />

      {isEmpty ? (
        <div style={{ display: 'grid', minHeight: 220, placeItems: 'center' }}>
          <StateBlock
            variant="no-results"
            title="No plugins found"
            description="Try a different category or clear the search filter."
          />
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: 14,
          }}
        >
          {visible.map((plugin) => {
            const badge = plugin.installed
              ? { state: plugin.status === 'preview' ? ('purple' as const) : ('live' as const), label: 'Installed' }
              : plugin.status === 'preview'
                ? { state: 'purple' as const, label: 'Preview' }
                : null;

            return (
              <article
                key={plugin.id}
                style={{
                  minWidth: 0,
                  minHeight: 174,
                  border: '1px solid var(--m-line-faint)',
                  borderRadius: 'var(--m-radius-md)',
                  padding: '16px',
                  background: 'var(--m-bg-1)',
                  display: 'grid',
                  gridTemplateRows: 'auto auto 1fr',
                  gap: 10,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: 'var(--m-bg-3)',
                      border: '1px solid var(--m-line)',
                      display: 'grid',
                      placeItems: 'center',
                      color: 'var(--m-cyan-500)',
                      fontSize: 18,
                      flex: '0 0 auto',
                    }}
                  >
                    ◈
                  </div>
                  {badge ? <StateBadge state={badge.state} label={badge.label} size="sm" /> : null}
                </div>

                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 'var(--m-fs-13)',
                      fontWeight: 700,
                      color: 'var(--m-fg-0)',
                      marginBottom: 4,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {plugin.name}
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
                    {plugin.description}
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 12,
                    fontSize: 'var(--m-fs-10)',
                    color: 'var(--m-fg-3)',
                    fontFamily: 'var(--m-font-mono)',
                    marginTop: 'auto',
                    minWidth: 0,
                  }}
                >
                  <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    ★ {plugin.rating} · {plugin.installCount}
                  </span>
                  <MetralyButton
                    size="sm"
                    variant={plugin.installed ? 'neutral' : 'primary'}
                    aria-label={plugin.installed ? `Manage ${plugin.name}` : `Install ${plugin.name}`}
                  >
                    {plugin.installed ? 'Manage' : 'Install'}
                  </MetralyButton>
                </div>
              </article>
            );
          })}
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

/** Default: full catalog with readable category filters, search and installed/preview badges. */
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
