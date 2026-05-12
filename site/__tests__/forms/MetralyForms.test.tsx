import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MetralyCheckbox, MetralyRadio, MetralySelect, MetralySwitch, MetralyTabs } from '@metraly/ui';

describe('Metraly form primitives', () => {
  it('renders checkbox with accessible name', () => {
    render(<MetralyCheckbox checked label="Enable telemetry" />);
    expect(screen.getByRole('checkbox', { name: 'Enable telemetry' })).toBeChecked();
  });

  it('renders radio with accessible name', () => {
    render(<MetralyRadio checked label="Primary source" name="source" value="primary" />);
    expect(screen.getByRole('radio', { name: 'Primary source' })).toBeChecked();
  });

  it('renders switch as a switch role', () => {
    render(<MetralySwitch checked label="Live telemetry" />);
    expect(screen.getByRole('switch', { name: 'Live telemetry' })).toHaveAttribute('aria-checked', 'true');
  });

  it('renders select options', () => {
    render(
      <MetralySelect
        label="Metric source"
        defaultValue="github"
        options={[
          { value: 'github', label: 'GitHub' },
          { value: 'ci', label: 'CI/CD' },
        ]}
      />
    );
    expect(screen.getByRole('combobox', { name: 'Metric source' })).toHaveValue('github');
    expect(screen.getByText('CI/CD')).toBeInTheDocument();
  });

  it('renders selected tab', () => {
    render(
      <MetralyTabs
        ariaLabel="Dashboard sections"
        defaultValue="boards"
        items={[
          { value: 'overview', label: 'Overview' },
          { value: 'boards', label: 'Boards' },
        ]}
      />
    );
    expect(screen.getByRole('tab', { name: 'Boards' })).toHaveAttribute('aria-selected', 'true');
  });

  it('renders Claude Design style tab counts without changing accessible tab names', () => {
    render(
      <MetralyTabs
        ariaLabel="Engineering dashboard sections"
        defaultValue="ci"
        items={[
          { value: 'delivery', label: 'Delivery', count: 11 },
          { value: 'dora', label: 'DORA', count: 4 },
          { value: 'flow', label: 'Flow', count: 6 },
          { value: 'ci', label: 'CI', count: 3 },
        ]}
      />
    );

    const activeTab = screen.getByRole('tab', { name: /CI\s*3/ });
    expect(activeTab).toHaveAttribute('aria-selected', 'true');
    expect(activeTab.querySelector('.metraly-tab-count')).toHaveTextContent('3');
    expect(screen.getByRole('tab', { name: /Delivery\s*11/ })).toBeInTheDocument();
  });
});
