import type { Meta, StoryObj } from "@storybook/react";
import * as React from 'react';
import {
  MetralyButton,
  MetralyInput,
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

const PLUGIN_CATEGORIES = ['All', 'Sources', 'Exporters', 'AI', 'Alerts'];

const PLUGIN_CATALOG_STYLES = `
.plugin-catalog-story {
  box-sizing: border-box;
  width: min(100%, 1280px);
  margin-inline: auto;
  display: grid;
  gap: 14px;
  padding: clamp(12px, 2vw, 20px);
  background: var(--m-bg-0);
  min-height: 400px;
}

.plugin-catalog-story--focused {
  width: min(100%, 820px);
}

.plugin-catalog-story__phase {
  display: flex;
  justify-content: flex-end;
}

.plugin-catalog-story__phase-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
  padding: 0 10px;
  border: 1px solid var(--m-line-faint);
  border-radius: 999px;
  background: var(--m-bg-2);
  color: var(--m-fg-3);
  font-family: var(--m-font-mono);
  font-size: var(--m-fs-10);
  line-height: 1;
  white-space: nowrap;
}

/* AI Plugins is a focused catalog slice. Keep the phase pill identical to the
   other catalog stories, but tighten only this story's vertical rhythm so the
   badge does not feel detached from the search/category row. */
.plugin-catalog-story--focused .plugin-catalog-story__phase {
  min-height: 24px;
  margin-bottom: -6px;
}

.plugin-catalog-story--focused .plugin-catalog-story__phase-badge {
  min-height: 24px;
  padding: 0 10px;
}

.plugin-catalog-story__toolbar {
  display: grid;
  grid-template-columns: minmax(260px, 1fr) auto;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.plugin-catalog-story__search {
  min-width: 0;
}

.plugin-catalog-story__search .metraly-input__control {
  min-height: 32px;
  border-radius: var(--m-r-3);
  background: var(--m-bg-1);
}

.plugin-catalog-story__categories {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  padding-block: 1px;
  scrollbar-width: none;
}

.plugin-catalog-story__categories::-webkit-scrollbar {
  display: none;
}

.plugin-catalog-story__category {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 30px;
  padding: 0 12px;
  border: 1px solid var(--m-line);
  border-radius: var(--m-r-3);
  background: var(--m-bg-1);
  color: var(--m-fg-2);
  font-family: var(--m-font-ui);
  font-size: var(--m-fs-11);
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transition:
    color var(--m-dur-2) var(--m-ease),
    background var(--m-dur-2) var(--m-ease),
    border-color var(--m-dur-2) var(--m-ease),
    box-shadow var(--m-dur-2) var(--m-ease);
}

.plugin-catalog-story__category:hover {
  color: var(--m-fg-1);
  border-color: var(--m-line-strong);
  background: var(--m-bg-2);
}

.plugin-catalog-story__category:focus-visible {
  outline: none;
  box-shadow: var(--m-glow-focus);
}

.plugin-catalog-story__category.is-selected {
  border-color: color-mix(in oklab, var(--m-cyan-500) 70%, var(--m-line));
  background: color-mix(in oklab, var(--m-cyan-500) 12%, var(--m-bg-1));
  color: var(--m-cyan-500);
  box-shadow: 0 0 0 1px color-mix(in oklab, var(--m-cyan-500) 20%, transparent);
}

.plugin-catalog-story__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: 12px;
}

.plugin-catalog-story__card {
  box-sizing: border-box;
  min-width: 0;
  min-height: 174px;
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 10px;
  padding: 16px;
  border: 1px solid var(--m-line-faint);
  border-radius: var(--m-radius-md);
  background: var(--m-bg-1);
}

.plugin-catalog-story__card-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.plugin-catalog-story__icon {
  flex: 0 0 auto;
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border: 1px solid var(--m-line);
  border-radius: 10px;
  background: var(--m-bg-3);
  color: var(--m-cyan-500);
  font-size: 18px;
}

.plugin-catalog-story__copy {
  min-width: 0;
}

.plugin-catalog-story__title {
  margin-bottom: 4px;
  overflow: hidden;
  color: var(--m-fg-0);
  font-size: var(--m-fs-13);
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.plugin-catalog-story__description {
  overflow: hidden;
  display: -webkit-box;
  color: var(--m-fg-3);
  font-size: var(--m-fs-10);
  line-height: 1.5;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.plugin-catalog-story__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  min-width: 0;
  margin-top: auto;
  color: var(--m-fg-3);
  font-family: var(--m-font-mono);
  font-size: var(--m-fs-10);
}

.plugin-catalog-story__stats {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.plugin-catalog-story__empty {
  display: grid;
  min-height: 260px;
  place-items: center;
}

@media (max-width: 1099px) {
  .plugin-catalog-story {
    width: min(100%, 920px);
  }

  .plugin-catalog-story--focused {
    width: min(100%, 820px);
  }
}

@media (max-width: 767px) {
  .plugin-catalog-story {
    width: 100%;
    padding: 12px;
  }

  .plugin-catalog-story--focused .plugin-catalog-story__phase {
    margin-bottom: 0;
  }

  .plugin-catalog-story__toolbar {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .plugin-catalog-story__categories {
    justify-content: flex-start;
  }

  .plugin-catalog-story__category {
    min-height: 28px;
    padding-inline: 10px;
    font-size: var(--m-fs-10);
  }

  .plugin-catalog-story__grid {
    grid-template-columns: 1fr;
  }
}
`;

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
  initialFilter = 'All',
  focused = false,
}: {
  plugins?: PluginItem[];
  empty?: boolean;
  initialFilter?: string;
  focused?: boolean;
}) {
  const [filter, setFilter] = React.useState(initialFilter);
  const [search, setSearch] = React.useState('');

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
  const sectionClassName = [
    'plugin-catalog-story',
    focused ? 'plugin-catalog-story--focused' : null,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={sectionClassName} aria-label="Plugin catalog scenario">
      <style>{PLUGIN_CATALOG_STYLES}</style>

      <div className="plugin-catalog-story__phase" aria-hidden="true">
        <span className="plugin-catalog-story__phase-badge">Phase 9 · PluginCatalog</span>
      </div>

      <div className="plugin-catalog-story__toolbar">
        <MetralyInput
          search
          fullWidth
          wrapperClassName="plugin-catalog-story__search"
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          placeholder="Search mock plugin listings…"
          aria-label="Search plugins"
        />

        <div className="plugin-catalog-story__categories" role="radiogroup" aria-label="Plugin category">
          {PLUGIN_CATEGORIES.map((category) => {
            const selected = category === filter;

            return (
              <button
                key={category}
                type="button"
                className={selected ? 'plugin-catalog-story__category is-selected' : 'plugin-catalog-story__category'}
                aria-checked={selected}
                role="radio"
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {isEmpty ? (
        <div className="plugin-catalog-story__empty">
          <StateBlock
            variant="no-results"
            title="No plugins found"
            description="Try a different category or clear the search filter."
          />
        </div>
      ) : (
        <div className="plugin-catalog-story__grid">
          {visible.map((plugin) => {
            const badge = plugin.installed
              ? { state: plugin.status === 'preview' ? ('purple' as const) : ('live' as const), label: 'Installed' }
              : plugin.status === 'preview'
                ? { state: 'purple' as const, label: 'Preview' }
                : null;

            return (
              <article key={plugin.id} className="plugin-catalog-story__card">
                <div className="plugin-catalog-story__card-head">
                  <div className="plugin-catalog-story__icon" aria-hidden="true">◈</div>
                  {badge ? <StateBadge state={badge.state} label={badge.label} size="sm" /> : null}
                </div>

                <div className="plugin-catalog-story__copy">
                  <div className="plugin-catalog-story__title">{plugin.name}</div>
                  <div className="plugin-catalog-story__description">{plugin.description}</div>
                </div>

                <div className="plugin-catalog-story__footer">
                  <span className="plugin-catalog-story__stats">★ {plugin.rating} · {plugin.installCount}</span>
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
    </section>
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

/** Default: full catalog with app-like search and compact category chips. */
export const Default: StoryObj = {
  render: () => <PluginCatalogPlaceholder />,
};

/** AI category filtered: opens the same catalog with the AI chip selected. */
export const AIPlugins: StoryObj = {
  render: () => <PluginCatalogPlaceholder initialFilter="AI" focused />,
};

/** Empty results: no plugins match the active filter. */
export const EmptyResults: StoryObj = {
  render: () => <PluginCatalogPlaceholder empty />,
};
