import type { Meta, StoryObj } from '@storybook/react';
import { MetralyCheckbox, MetralyRadio, MetralySelect, MetralySwitch, MetralyTabs } from '@metraly/ui';

function FormsShowcase() {
  return (
    <div style={{ display: 'grid', gap: 24, maxWidth: 520 }}>
      <MetralyCheckbox checked label="Enable telemetry" description="Use live repository signals in this board." />
      <MetralyRadio checked name="source" value="primary" label="Primary source" />
      <MetralySwitch checked label="Live telemetry" description="Keep the board connected to streaming data." />
      <MetralySelect
        label="Metric source"
        defaultValue="github"
        options={[
          { value: 'github', label: 'GitHub' },
          { value: 'ci', label: 'CI/CD' },
          { value: 'incidents', label: 'Incidents' },
        ]}
      />
      <MetralyTabs
        ariaLabel="Dashboard sections"
        defaultValue="boards"
        items={[
          { value: 'overview', label: 'Overview' },
          { value: 'boards', label: 'Boards' },
          { value: 'signals', label: 'Signals' },
          { value: 'incidents', label: 'Incidents' },
        ]}
      />
    </div>
  );
}

const meta: Meta<typeof FormsShowcase> = {
  title: 'Metraly/Form Primitives',
  component: FormsShowcase,
};

export default meta;
type Story = StoryObj<typeof FormsShowcase>;

export const Default: Story = {};
