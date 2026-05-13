import type { Meta, StoryObj } from '@storybook/react';
import { MetralyCheckbox, MetralyRadio, MetralySelect, MetralySwitch, MetralyTabs } from '@metraly/ui';
import '@metraly/ui/styles/metraly-forms.css';

function ControlStatesShowcase() {
  return (
    <div style={{ display: 'grid', gap: 24, maxWidth: 560 }}>
      <MetralyCheckbox
        id="control-checkbox-live"
        checked
        label="Enable telemetry"
        description="Use live repository signals in this board."
      />
      <MetralyCheckbox
        id="control-checkbox-error"
        label="Archive previous dashboard"
        description="This action requires confirmation."
        error
      />
      <MetralyRadio
        id="control-radio-primary"
        checked
        name="source"
        value="primary"
        label="Primary source"
        description="Use the canonical source of truth."
      />
      <MetralyRadio
        id="control-radio-disabled"
        name="source"
        value="backup"
        label="Backup source"
        description="Disabled in this example."
        disabled
      />
      <MetralySwitch checked label="Live telemetry" description="Keep the board connected to streaming data." />
      <MetralySwitch disabled label="Frozen mode" description="Disabled toggle state." />
      <MetralySelect
        id="control-select"
        label="Metric source"
        defaultValue="github"
        options={[
          { value: 'github', label: 'GitHub' },
          { value: 'ci', label: 'CI/CD' },
          { value: 'incidents', label: 'Incidents', disabled: true },
        ]}
      />
      <MetralySelect
        id="control-select-error"
        label="Review source"
        defaultValue="github"
        error
        options={[
          { value: 'github', label: 'GitHub' },
          { value: 'ci', label: 'CI/CD' },
        ]}
      />
      <MetralyTabs
        ariaLabel="Dashboard sections"
        defaultValue="boards"
        items={[
          { value: 'overview', label: 'Overview' },
          { value: 'boards', label: 'Boards' },
          { value: 'signals', label: 'Signals', disabled: true },
          { value: 'incidents', label: 'Incidents' },
        ]}
      />
    </div>
  );
}

const meta: Meta<typeof ControlStatesShowcase> = {
  title: 'Scenarios/Component State Board',
  component: ControlStatesShowcase,
};

export default meta;
type Story = StoryObj<typeof ControlStatesShowcase>;

export const Default: Story = {};
