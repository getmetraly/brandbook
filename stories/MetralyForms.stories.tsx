import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  MetralyCheckbox,
  MetralyRadio,
  MetralySelect,
  MetralySwitch,
  MetralyTabs,
} from '@metraly/ui';

const SECTION = (title: string) => (
  <div style={{ fontFamily: 'var(--m-font-mono)', fontSize: 10, color: 'var(--m-fg-3)', textTransform: 'uppercase', letterSpacing: '0.04em', padding: '4px 0 8px' }}>{title}</div>
);

const GRID = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>{children}</div>
);

const CELL = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ display: 'grid', gap: 8, padding: 12, background: 'var(--m-bg-1)', borderRadius: 'var(--m-r-3)', border: '1px solid var(--m-line)' }}>
    <div style={{ fontFamily: 'var(--m-font-mono)', fontSize: 9, color: 'var(--m-fg-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
    {children}
  </div>
);

function CheckboxMatrix() {
  const [val, setVal] = useState(false);

  return (
    <div style={{ display: 'grid', gap: 16, maxWidth: 960 }}>
      {SECTION('MetralyCheckbox')}
      <GRID>
        <CELL label="Default"><MetralyCheckbox label="Stream metrics" /></CELL>
        <CELL label="Hover"><MetralyCheckbox label="Auto-retry" /></CELL>
        <CELL label="Focus-visible"><MetralyCheckbox label="Always-on focus" /></CELL>
        <CELL label="Checked"><MetralyCheckbox checked label="Telemetry on" /></CELL>
        <CELL label="Indeterminate"><MetralyCheckbox indeterminate label="Some sources" /></CELL>
        <CELL label="Disabled"><MetralyCheckbox checked disabled label="Locked policy" /></CELL>
        <CELL label="Loading"><MetralyCheckbox loading label="Saving..." /></CELL>
        <CELL label="Error"><MetralyCheckbox error label="Token expired" hint="Re-authenticate to continue" /></CELL>
        <CELL label="Interactive">
          <MetralyCheckbox checked={val} onChange={(e) => setVal(e.target.checked)} label="Try me" hint="Space or click" />
        </CELL>
      </GRID>
    </div>
  );
}

function RadioMatrix() {
  const [val, setVal] = useState('P99');

  return (
    <div style={{ display: 'grid', gap: 16, maxWidth: 960 }}>
      {SECTION('MetralyRadio')}
      <GRID>
        <CELL label="Default"><MetralyRadio name="r1" value="p50" label="p50" /></CELL>
        <CELL label="Checked"><MetralyRadio name="r2" value="p99" checked label="p99" /></CELL>
        <CELL label="Focus-visible"><MetralyRadio name="r3" value="tab" label="Tab to focus" /></CELL>
        <CELL label="Disabled"><MetralyRadio name="r4" value="med" disabled label="median (locked)" /></CELL>
        <CELL label="Error"><MetralyRadio name="r5" value="inv" error label="Invalid metric" hint="Choose a supported quantile" /></CELL>
        <CELL label="Group">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {['P50', 'P90', 'P99', 'MAX'].map((option) => (
              <MetralyRadio
                key={option}
                name="rgrp"
                value={option}
                checked={val === option}
                onChange={() => setVal(option)}
                label={option}
              />
            ))}
          </div>
        </CELL>
      </GRID>
    </div>
  );
}

function SwitchMatrix() {
  const [on, setOn] = useState(true);

  return (
    <div style={{ display: 'grid', gap: 16, maxWidth: 960 }}>
      {SECTION('MetralySwitch')}
      <GRID>
        <CELL label="Off"><MetralySwitch label="Live tail" /></CELL>
        <CELL label="On"><MetralySwitch checked label="Live tail" /></CELL>
        <CELL label="Loading"><MetralySwitch checked loading label="Applying..." /></CELL>
        <CELL label="Disabled (off)"><MetralySwitch disabled label="Read-only" /></CELL>
        <CELL label="Disabled (on)"><MetralySwitch checked disabled label="Locked" /></CELL>
        <CELL label="Purple accent"><MetralySwitch checked accent="purple" label="Beta channel" /></CELL>
        <CELL label="Interactive">
          <MetralySwitch checked={on} onClick={() => setOn(!on)} label={`Toggleable: ${on ? 'on' : 'off'}`} />
        </CELL>
      </GRID>
    </div>
  );
}

const SELECT_OPTS = [
  { value: '5m', label: 'Last 5 minutes' },
  { value: '1h', label: 'Last 1 hour' },
  { value: '24h', label: 'Last 24 hours' },
  { value: '7d', label: 'Last 7 days' },
];

function SelectMatrix() {
  const [v, setV] = useState('1h');

  return (
    <div style={{ display: 'grid', gap: 16, maxWidth: 960 }}>
      {SECTION('MetralySelect')}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
        <CELL label="Default"><MetralySelect label="Range" options={SELECT_OPTS} placeholder="Select range..." onChange={() => undefined} /></CELL>
        <CELL label="Value selected"><MetralySelect label="Range" options={SELECT_OPTS} value="24h" onChange={() => undefined} /></CELL>
        <CELL label="Open · selected"><MetralySelect label="Range" options={SELECT_OPTS} value="1h" open onChange={() => undefined} /></CELL>
        <CELL label="Loading"><MetralySelect label="Range" options={SELECT_OPTS} value="1h" loading onChange={() => undefined} /></CELL>
        <CELL label="Disabled"><MetralySelect label="Range" options={SELECT_OPTS} value="1h" disabled onChange={() => undefined} /></CELL>
        <CELL label="Interactive"><MetralySelect label="Range" options={SELECT_OPTS} value={v} onChange={setV} /></CELL>
      </div>
    </div>
  );
}

const DORA_ICON = (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <path d="M8 1 L3 8 H7 L6 13 L11 6 H7 Z" />
  </svg>
);

const FLOW_ICON = (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <path d="M2 11 L5 7 L8 9 L12 3" />
  </svg>
);

const TAB_ITEMS = [
  { value: 'dora', label: 'DORA', count: 4, icon: DORA_ICON },
  { value: 'flow', label: 'Flow', count: 6, icon: FLOW_ICON },
  { value: 'reviews', label: 'Reviews', count: 5 },
  { value: 'ci', label: 'CI', count: 3 },
  { value: 'teams', label: 'Teams' },
];

function TabsMatrix() {
  const [v, setV] = useState('dora');

  return (
    <div style={{ display: 'grid', gap: 16, maxWidth: 960 }}>
      {SECTION('MetralyTabs')}
      <CELL label="Default + Counts">
        <MetralyTabs items={TAB_ITEMS} defaultValue="dora" />
      </CELL>
      <CELL label="Selected with Live Pulse">
        <MetralyTabs items={TAB_ITEMS} value={v} onValueChange={setV} livePulse />
      </CELL>
      <CELL label="Disabled Tab">
        <MetralyTabs
          items={[
            { value: 'dora', label: 'DORA', count: 4, icon: DORA_ICON },
            { value: 'flow', label: 'Flow', count: 6 },
            { value: 'reviews', label: 'Reviews', count: 5 },
            { value: 'ci', label: 'CI', count: 3 },
            { value: 'teams', label: 'Teams', disabled: true },
          ]}
          defaultValue="dora"
        />
      </CELL>
    </div>
  );
}

const meta: Meta = { title: 'Components/Forms', component: () => null };
export default meta;
type Story = StoryObj;

export const Checkbox: Story = { render: () => <CheckboxMatrix /> };
export const Radio: Story = { render: () => <RadioMatrix /> };
export const Switch: Story = { render: () => <SwitchMatrix /> };
export const Select: Story = { render: () => <SelectMatrix /> };
export const Tabs: Story = { render: () => <TabsMatrix /> };
export const AllControls: Story = {
  name: 'All Controls',
  render: () => (
    <div style={{ display: 'grid', gap: 32 }}>
      <CheckboxMatrix />
      <RadioMatrix />
      <SwitchMatrix />
      <SelectMatrix />
      <TabsMatrix />
    </div>
  ),
};
