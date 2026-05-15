import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  MetralyButton,
  MetralyIcon,
  ReviewPanel,
  StickyWizardFooter,
  WizardLayout,
} from '@metraly/ui';
import type { WizardLayoutStep } from '@metraly/ui';

// ─── Types ────────────────────────────────────────────────────────────────────

type ConnectorStage = 'sources' | 'preview' | 'configure' | 'review';

// ─── Step helpers ─────────────────────────────────────────────────────────────

const STAGE_ORDER: ConnectorStage[] = ['sources', 'preview', 'configure', 'review'];

const STAGE_LABELS: Record<ConnectorStage, string> = {
  sources: 'Select Sources',
  preview: 'Preview Connection',
  configure: 'Configure',
  review: 'Review',
};

function stepsFor(active: ConnectorStage): WizardLayoutStep[] {
  const idx = STAGE_ORDER.indexOf(active);
  return STAGE_ORDER.map((id, i) => ({
    id,
    label: STAGE_LABELS[id],
    status: i < idx ? 'done' : i === idx ? 'current' : 'next',
  }));
}

// ─── Source tiles ─────────────────────────────────────────────────────────────

const SOURCES = [
  { id: 'github', label: 'GitHub', icon: 'github' as const, note: 'Repos, PRs, CI pipelines' },
  { id: 'jira', label: 'Jira', icon: 'jira' as const, note: 'Issues, sprints, backlogs' },
  { id: 'gitlab', label: 'GitLab', icon: 'gitlab' as const, note: 'MRs, pipelines, milestones' },
  { id: 'linear', label: 'Linear', icon: 'arrowRight' as const, note: 'Projects, cycles, issues' },
  { id: 'slack', label: 'Slack', icon: 'sparkles' as const, note: 'Channels, standups, alerts' },
  { id: 'pagerduty', label: 'PagerDuty', icon: 'alertTri' as const, note: 'Incidents, on-call rota' },
];

function SourceTile({
  source,
  selected,
  onToggle,
}: {
  source: typeof SOURCES[number];
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        padding: '18px 16px',
        borderRadius: 12,
        border: selected
          ? '2px solid var(--m-cyan-500)'
          : '1px solid var(--m-line)',
        background: selected
          ? 'color-mix(in oklab, var(--m-cyan-500) 6%, var(--m-bg-1))'
          : 'var(--m-bg-1)',
        cursor: 'pointer',
        textAlign: 'left',
        outline: 'none',
        boxShadow: selected ? '0 0 0 1px var(--m-cyan-500)' : 'none',
      }}
    >
      <MetralyIcon name={source.icon} size="lg" />
      <span style={{ fontSize: 'var(--m-fs-12)', fontWeight: 700, color: 'var(--m-fg-0)' }}>
        {source.label}
      </span>
      <span style={{ fontSize: 'var(--m-fs-10)', color: 'var(--m-fg-3)', lineHeight: 1.4 }}>
        {source.note}
      </span>
    </button>
  );
}

// ─── Scenario shell ───────────────────────────────────────────────────────────

function ConnectorWizardScenario({ initialStage = 'sources' }: { initialStage?: ConnectorStage }) {
  const [stage, setStage] = React.useState<ConnectorStage>(initialStage);
  const [selected, setSelected] = React.useState<Set<string>>(new Set(['github']));
  const [repoFilter, setRepoFilter] = React.useState('metraly/*');
  const [refreshRate, setRefreshRate] = React.useState('5 min');

  const steps = stepsFor(stage);
  const stageIdx = STAGE_ORDER.indexOf(stage);
  const canBack = stageIdx > 0;
  const canNext = stageIdx < STAGE_ORDER.length - 1;
  const isLast = stageIdx === STAGE_ORDER.length - 1;

  function goBack() {
    if (canBack) setStage(STAGE_ORDER[stageIdx - 1]);
  }
  function goNext() {
    if (canNext) setStage(STAGE_ORDER[stageIdx + 1]);
  }

  function renderBody() {
    if (stage === 'sources') {
      return (
        <div style={{ display: 'grid', gap: 20 }}>
          <p style={{ margin: 0, fontSize: 'var(--m-fs-12)', color: 'var(--m-fg-2)' }}>
            Select the data sources to connect to your Metraly workspace. You can add more later.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: 12,
            }}
          >
            {SOURCES.map((s) => (
              <SourceTile
                key={s.id}
                source={s}
                selected={selected.has(s.id)}
                onToggle={() => {
                  setSelected((prev) => {
                    const next = new Set(prev);
                    if (next.has(s.id)) next.delete(s.id);
                    else next.add(s.id);
                    return next;
                  });
                }}
              />
            ))}
          </div>
        </div>
      );
    }

    if (stage === 'preview') {
      return (
        <div style={{ display: 'grid', gap: 16 }}>
          <p style={{ margin: 0, fontSize: 'var(--m-fs-12)', color: 'var(--m-fg-2)' }}>
            Verifying connection to selected sources with synthetic credentials.
          </p>
          {[...selected].map((id) => {
            const src = SOURCES.find((s) => s.id === id)!;
            return (
              <div
                key={id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 16px',
                  borderRadius: 10,
                  border: '1px solid var(--m-line)',
                  background: 'var(--m-bg-1)',
                }}
              >
                <MetralyIcon name={src.icon} size="md" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'var(--m-fs-12)', fontWeight: 700, color: 'var(--m-fg-0)' }}>
                    {src.label}
                  </div>
                  <div style={{ fontSize: 'var(--m-fs-10)', color: 'var(--m-fg-3)', marginTop: 2 }}>
                    Synthetic auth · workspace preview
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 'var(--m-fs-10)',
                    fontWeight: 600,
                    color: 'color-mix(in oklab, var(--m-cyan-500) 90%, var(--m-fg-0))',
                    background: 'color-mix(in oklab, var(--m-cyan-500) 10%, var(--m-bg-2))',
                    padding: '3px 10px',
                    borderRadius: 999,
                    border: '1px solid color-mix(in oklab, var(--m-cyan-500) 25%, var(--m-line))',
                  }}
                >
                  Connected
                </span>
              </div>
            );
          })}
        </div>
      );
    }

    if (stage === 'configure') {
      return (
        <div style={{ display: 'grid', gap: 20 }}>
          <p style={{ margin: 0, fontSize: 'var(--m-fs-12)', color: 'var(--m-fg-2)' }}>
            Configure sync settings for the connected sources.
          </p>
          <div style={{ display: 'grid', gap: 14 }}>
            <div style={{ display: 'grid', gap: 6 }}>
              <label style={{ fontSize: 'var(--m-fs-11)', fontWeight: 600, color: 'var(--m-fg-1)' }}>
                Repository filter
              </label>
              <input
                type="text"
                value={repoFilter}
                onChange={(e) => setRepoFilter(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: 8,
                  border: '1px solid var(--m-line)',
                  background: 'var(--m-bg-2)',
                  color: 'var(--m-fg-0)',
                  fontSize: 'var(--m-fs-12)',
                  fontFamily: 'var(--m-font-mono)',
                }}
              />
              <span style={{ fontSize: 'var(--m-fs-10)', color: 'var(--m-fg-3)' }}>
                Glob pattern — e.g. metraly/* or org/repo-name
              </span>
            </div>
            <div style={{ display: 'grid', gap: 6 }}>
              <label style={{ fontSize: 'var(--m-fs-11)', fontWeight: 600, color: 'var(--m-fg-1)' }}>
                Sync interval
              </label>
              <select
                value={refreshRate}
                onChange={(e) => setRefreshRate(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: 8,
                  border: '1px solid var(--m-line)',
                  background: 'var(--m-bg-2)',
                  color: 'var(--m-fg-0)',
                  fontSize: 'var(--m-fs-12)',
                }}
              >
                {['1 min', '5 min', '15 min', '30 min', '1 hr'].map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      );
    }

    // review
    return (
      <ReviewPanel
        title="Review connection setup"
        description="Confirm before connecting. You can change settings later in Connectors."
        items={[
          {
            icon: <MetralyIcon name="github" size="md" aria-hidden />,
            label: 'Sources',
            value: [...selected].map((id) => SOURCES.find((s) => s.id === id)?.label).join(', '),
          },
          {
            icon: <MetralyIcon name="lock" size="md" aria-hidden />,
            label: 'Auth method',
            value: 'OAuth 2.0 (synthetic)',
          },
          {
            icon: <MetralyIcon name="filter" size="md" aria-hidden />,
            label: 'Repo filter',
            value: repoFilter,
          },
          {
            icon: <MetralyIcon name="clock" size="md" aria-hidden />,
            label: 'Sync interval',
            value: refreshRate,
          },
        ]}
      />
    );
  }

  return (
    <WizardLayout
      title={STAGE_LABELS[stage]}
      steps={steps}
      footer={
        <StickyWizardFooter
          onBack={canBack ? goBack : undefined}
          onPrimary={goNext}
          primaryLabel={isLast ? 'Connect sources' : 'Continue'}
          primaryVariant={isLast ? 'primary' : 'primary'}
        />
      }
    >
      {renderBody()}
    </WizardLayout>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Scenarios/ConnectorWizard',
  parameters: { layout: 'fullscreen' },
};

export default meta;

// ─── Stories ──────────────────────────────────────────────────────────────────

/** Step 1: Select data sources. */
export const SelectSources: StoryObj = {
  render: () => <ConnectorWizardScenario initialStage="sources" />,
};

/** Step 2: Preview and verify connections. */
export const PreviewConnection: StoryObj = {
  render: () => <ConnectorWizardScenario initialStage="preview" />,
};

/** Step 3: Configure sync settings. */
export const Configure: StoryObj = {
  render: () => <ConnectorWizardScenario initialStage="configure" />,
};

/** Step 4: Review and confirm. Uses ReviewPanel. */
export const Review: StoryObj = {
  render: () => <ConnectorWizardScenario initialStage="review" />,
};

/** Mobile 390px — sources step. */
export const Mobile390: StoryObj = {
  name: 'Mobile / 390px',
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => <ConnectorWizardScenario initialStage="sources" />,
};

/** Tablet 768px — review step with ReviewPanel. */
export const Tablet768: StoryObj = {
  name: 'Tablet / 768px',
  parameters: { viewport: { defaultViewport: 'tablet' } },
  render: () => <ConnectorWizardScenario initialStage="review" />,
};
