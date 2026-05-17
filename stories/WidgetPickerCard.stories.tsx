import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';
import { WidgetPickerCard, WidgetPickerList } from '@metraly/ui';

const stageStyle = {
  display: 'grid',
  placeItems: 'start',
  minHeight: 300,
  padding: 24,
  background: 'var(--m-bg-0)',
  color: 'var(--m-fg-0)',
};

const cardStyle = {
  width: '100%',
  maxWidth: 340,
};

const meta: Meta<typeof WidgetPickerCard> = {
  title: 'Components/WidgetPickerCard',
  component: WidgetPickerCard,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Deployment frequency',
    description: 'Deploys per day, by service & team.',
    selected: true,
    kind: 'dora/deploy-freq',
    iconLabel: 'lightning',
    state: 'live',
  },
  render: (args) => (
    <div style={stageStyle}>
      <div style={cardStyle}>
        <WidgetPickerCard {...args} />
      </div>
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof WidgetPickerCard>;

export const Selected: Story = {};

export const Stale: Story = {
  args: {
    selected: false,
    title: 'Change failure rate',
    description: '% of deploys that triggered a rollback or incident.',
    kind: 'dora/cfr',
    iconLabel: 'chart',
    state: 'stale',
  },
};

export const New: Story = {
  args: {
    selected: false,
    title: 'Flaky builds',
    description: 'Tests retried-then-passed in the last 7 days.',
    kind: 'ci/flaky',
    iconLabel: 'lightning',
    visualState: 'new',
  },
};

export const Disabled: Story = {
  args: {
    selected: false,
    disabled: true,
    title: 'WIP per engineer',
    description: 'Source is not connected.',
    kind: 'flow/wip',
    iconLabel: 'table',
  },
};

export const Loading: Story = {
  args: {
    selected: false,
    title: 'PR review latency',
    description: 'First review response, by team.',
    kind: 'review/latency',
    iconLabel: 'metric',
    loading: true,
  },
};

export const Gated: Story = {
  name: 'Gated / Policy required',
  args: {
    selected: false,
    disabled: true,
    title: 'AI Insights panel',
    description: 'Requires AI Workspace policy approval before activation.',
    kind: 'ai/insights',
    iconLabel: 'sparkles',
    state: 'disabled',
    stateLabel: 'Gated',
  },
};

export const ComingSoon: Story = {
  name: 'Coming soon / Planned widget',
  args: {
    selected: false,
    disabled: true,
    title: 'Benchmark comparison',
    description: 'Compare your metrics against anonymised industry benchmarks.',
    kind: 'benchmark/compare',
    iconLabel: 'chart',
    state: 'disabled',
    stateLabel: 'Coming soon',
  },
};

export const InProgress: Story = {
  name: 'In progress / Beta widget',
  args: {
    selected: false,
    title: 'Deployment blast radius',
    description: 'Services affected per deployment, predicted from dependency graph.',
    kind: 'risk/blast-radius',
    iconLabel: 'lightning',
    state: 'purple',
    stateLabel: 'In progress',
  },
};

export const LongText: Story = {
  name: 'Long text / Truncation check',
  args: {
    selected: false,
    title: 'Very long widget name that should not break layout or overflow its container',
    description:
      'This is an exceptionally verbose description designed to verify that text wrapping and overflow handling work correctly in the widget picker card without causing layout shift.',
    kind: 'test/long-text',
    iconLabel: 'metric',
    state: 'live',
  },
};

/** Verify compact list-item behavior at mobile/rail widths (240px). */
export const NarrowRail: Story = {
  name: 'Narrow / 240px rail width',
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => (
    <div style={{ ...stageStyle, padding: 12 }}>
      <div style={{ width: 240 }}>
        <WidgetPickerCard
          title="Deploy frequency"
          description="Deploys per day, by service."
          selected
          kind="dora/deploy-freq"
          iconLabel="lightning"
          state="live"
        />
      </div>
    </div>
  ),
};

/** Grid of multiple cards for layout-rhythm verification. */
export const GridLayout: Story = {
  name: 'Grid / Multiple cards (selection state matrix)',
  render: () => (
    <div style={{ ...stageStyle, minHeight: 'auto' }}>
      <WidgetPickerList
        ariaLabel="Widget catalog state matrix"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10, width: 'min(960px, 100%)' }}
      >
        <WidgetPickerCard title="Deploy frequency" description="Deploys per day." selected iconLabel="lightning" state="live" kind="dora/deploy-freq" />
        <WidgetPickerCard title="Change failure rate" description="Rollback ratio." selected={false} iconLabel="chart" state="live" kind="dora/cfr" />
        <WidgetPickerCard title="MTTR" description="Mean time to restore." selected iconLabel="metric" state="live" kind="dora/mttr" />
        <WidgetPickerCard title="Lead time" description="Commit to deploy." selected={false} iconLabel="metric" state="stale" kind="dora/lead" />
        <WidgetPickerCard title="AI Insights" description="Requires policy approval." selected={false} disabled iconLabel="sparkles" state="disabled" stateLabel="Gated" kind="ai/insights" />
        <WidgetPickerCard title="Benchmark" description="Industry benchmarks." selected={false} disabled iconLabel="chart" state="disabled" stateLabel="Coming soon" kind="benchmark/compare" />
      </WidgetPickerList>
    </div>
  ),
};

/** Interactive multi-select with WidgetPickerList + aria-multiselectable. */
export const WithListbox: Story = {
  name: 'With listbox / Interactive multi-select',
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(['deploy', 'mttr']);
    const widgets = [
      { id: 'deploy', title: 'Deploy Frequency', description: 'Deploys per day.', iconLabel: 'lightning', state: 'live' as const, kind: 'dora/deploy-freq' },
      { id: 'lead', title: 'Lead Time', description: 'Commit to deploy.', iconLabel: 'metric', state: 'live' as const, kind: 'dora/lead' },
      { id: 'mttr', title: 'MTTR', description: 'Mean time to restore.', iconLabel: 'metric', state: 'live' as const, kind: 'dora/mttr' },
      { id: 'insights', title: 'AI Insights', description: 'Requires policy approval.', iconLabel: 'sparkles', state: 'gated' as const, stateLabel: 'Gated', kind: 'ai/insights' },
    ];
    const toggle = (id: string) =>
      setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

    return (
      <div style={{ ...stageStyle, minHeight: 'auto' }}>
        <div style={{ width: 'min(640px, 100%)', display: 'grid', gap: 12 }}>
          <div style={{ color: 'var(--m-fg-3)', fontSize: 'var(--m-fs-10)' }}>
            {selected.length} of {widgets.length} selected — WidgetPickerList provides role="listbox"
          </div>
          <WidgetPickerList ariaLabel="Choose widgets for your dashboard" multiSelect>
            {widgets.map((w) => (
              <WidgetPickerCard
                key={w.id}
                title={w.title}
                description={w.description}
                iconLabel={w.iconLabel}
                state={w.state}
                stateLabel={'stateLabel' in w ? w.stateLabel : undefined}
                kind={w.kind}
                selected={selected.includes(w.id)}
                disabled={w.state === 'gated'}
                onSelect={() => toggle(w.id)}
              />
            ))}
          </WidgetPickerList>
        </div>
      </div>
    );
  },
};
