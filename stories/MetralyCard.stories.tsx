import type { Meta, StoryObj } from '@storybook/nextjs';
import { MetralyCard } from '@metraly/ui';

const stageStyle = {
  minHeight: 320,
  padding: 24,
  background: 'var(--m-bg-0)',
  color: 'var(--m-fg-0)',
};

const cardFrameStyle = {
  width: 280,
};

const meta: Meta<typeof MetralyCard> = {
  title: 'Components/Cards',
  component: MetralyCard,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Flow efficiency',
    subtitle: 'KPI summary',
    children: (
      <div style={{ display: 'grid', gap: 6 }}>
        <strong style={{ fontSize: 'var(--m-fs-22)', letterSpacing: '-0.04em', color: 'var(--m-cyan-500)' }}>81%</strong>
        <span style={{ color: 'var(--m-fg-3)', fontSize: 'var(--m-fs-10)', fontFamily: 'var(--m-font-mono)' }}>LIVE</span>
      </div>
    ),
  },
  render: (args) => (
    <div style={stageStyle}>
      <div style={cardFrameStyle}>
        <MetralyCard {...args} />
      </div>
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof MetralyCard>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    state: 'selected',
  },
};

export const Loading: Story = {
  args: {
    state: 'loading',
  },
};

export const Empty: Story = {
  args: {
    state: 'empty',
  },
};
