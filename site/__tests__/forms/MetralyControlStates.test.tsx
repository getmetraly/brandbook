import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  MetralyCheckbox,
  MetralyRadio,
  MetralySelect,
  MetralySwitch,
  MetralyTabs,
} from '@metraly/ui';

describe('Metraly control state coverage', () => {
  it('renders checkbox labels, descriptions and invalid state', () => {
    render(
      <MetralyCheckbox
        id="checkbox-telemetry"
        label="Enable telemetry"
        description="Collect anonymous usage metrics."
        error
      />
    );

    const checkbox = screen.getByRole('checkbox', { name: /Enable telemetry/ });

    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    expect(checkbox).toHaveAttribute('aria-describedby', 'checkbox-telemetry-description');
    expect(screen.getByText('Collect anonymous usage metrics.')).toBeInTheDocument();
  });

  it('renders radio labels, descriptions and disabled state', () => {
    render(
      <MetralyRadio
        id="radio-source"
        label="Primary source"
        description="Use the canonical source of truth."
        name="source"
        value="primary"
        disabled
      />
    );

    const radio = screen.getByRole('radio', { name: /Primary source/ });

    expect(radio).toBeDisabled();
    expect(radio).toHaveAttribute('aria-describedby', 'radio-source-description');
    expect(screen.getByText('Use the canonical source of truth.')).toBeInTheDocument();
  });

  it('renders switch as an accessible toggle with focus and click handling', () => {
    const onClick = jest.fn();

    render(<MetralySwitch checked label="Live sync" description="Follow the upstream feed." onClick={onClick} />);

    const toggle = screen.getByRole('switch', { name: 'Live sync' });
    toggle.focus();

    expect(toggle).toHaveFocus();
    expect(toggle).toHaveAttribute('aria-checked', 'true');

    fireEvent.click(toggle);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders select error and disabled states', () => {
    render(
      <MetralySelect
        id="source-select"
        label="Metric source"
        defaultValue="github"
        error
        options={[
          { value: 'github', label: 'GitHub' },
          { value: 'ci', label: 'CI/CD', disabled: true },
        ]}
      />
    );

    const select = screen.getByRole('combobox', { name: 'Metric source' });

    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('option', { name: 'CI/CD' })).toBeDisabled();
  });

  it('renders tabs with selected and disabled states', () => {
    const onValueChange = jest.fn();

    render(
      <MetralyTabs
        ariaLabel="Dashboard sections"
        defaultValue="boards"
        onValueChange={onValueChange}
        items={[
          { value: 'overview', label: 'Overview' },
          { value: 'boards', label: 'Boards' },
          { value: 'alerts', label: 'Alerts', disabled: true },
        ]}
      />
    );

    const boardsTab = screen.getByRole('tab', { name: 'Boards' });
    const alertsTab = screen.getByRole('tab', { name: 'Alerts' });

    expect(boardsTab).toHaveAttribute('aria-selected', 'true');
    expect(alertsTab).toBeDisabled();

    fireEvent.click(screen.getByRole('tab', { name: 'Overview' }));
    expect(onValueChange).toHaveBeenCalledWith('overview');
  });
});
