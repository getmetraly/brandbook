import { fireEvent, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  MetralyCheckbox,
  MetralyRadio,
  MetralySelect,
  MetralySwitch,
  MetralyTabs,
  StateBadge,
} from '@metraly/ui';

describe('Phase 1 prototype conformance states', () => {
  it('normalizes StateBadge prototype aliases and pulse semantics', () => {
    render(
      <div>
        <StateBadge state="ok" />
        <StateBadge state="new" label="3 new" />
        <StateBadge state="purple" />
        <StateBadge state="disabled" label="N/A" />
        <StateBadge state="info" label="Cached" />
      </div>,
    );

    expect(screen.getByRole('status', { name: 'OK' })).toHaveAttribute('data-state', 'ok');
    expect(screen.getByRole('status', { name: 'OK' })).toHaveAttribute('data-visual-state', 'success');
    expect(screen.getByRole('status', { name: 'OK' })).toHaveAttribute('data-pulse', 'off');

    expect(screen.getByRole('status', { name: '3 new' })).toHaveAttribute('data-state', 'new');
    expect(screen.getByRole('status', { name: '3 new' })).toHaveAttribute('data-visual-state', 'live');
    expect(screen.getByRole('status', { name: '3 new' })).toHaveAttribute('data-pulse', 'on');

    expect(screen.getByRole('status', { name: 'Beta' })).toHaveAttribute('data-state', 'purple');
    expect(screen.getByRole('status', { name: 'Beta' })).toHaveAttribute('data-visual-state', 'info');
    expect(screen.getByRole('status', { name: 'Beta' })).toHaveAttribute('data-pulse', 'off');

    expect(screen.getByRole('status', { name: 'N/A' })).toHaveAttribute('data-state', 'disabled');
    expect(screen.getByRole('status', { name: 'N/A' })).toHaveAttribute('data-visual-state', 'noData');
    expect(screen.getByRole('status', { name: 'N/A' })).toHaveAttribute('data-pulse', 'off');

    expect(screen.getByRole('status', { name: 'Cached' })).toHaveAttribute('data-state', 'info');
    expect(screen.getByRole('status', { name: 'Cached' })).toHaveAttribute('data-pulse', 'off');
  });

  it('keeps live StateBadge pulsing by default but allows pulse opt-out', () => {
    render(
      <div>
        <StateBadge state="live" />
        <StateBadge state="live" label="Static live" pulse={false} />
      </div>,
    );

    expect(screen.getByRole('status', { name: 'Live' })).toHaveAttribute('data-pulse', 'on');
    expect(screen.getByRole('status', { name: 'Static live' })).toHaveAttribute('data-pulse', 'off');
  });

  it('renders checkbox prototype hint and loading state without interaction', () => {
    render(
      <MetralyCheckbox
        id="phase-checkbox"
        label="Telemetry on"
        hint="Saving policy"
        checked
        loading
        onChange={() => undefined}
      />,
    );

    const checkbox = screen.getByRole('checkbox', { name: /Telemetry on/ });
    const row = checkbox.closest('.metraly-checkbox');

    expect(checkbox).toBeDisabled();
    expect(checkbox).toHaveAttribute('aria-busy', 'true');
    expect(checkbox).toHaveAccessibleDescription('Saving policy');
    expect(row).toHaveAttribute('data-state', 'loading');
    expect(row).toHaveClass('is-loading');
  });

  it('renders radio prototype hint and error state', () => {
    render(<MetralyRadio id="phase-radio" name="phase-radio" label="p99" hint="Choose a supported quantile" error />);

    const radio = screen.getByRole('radio', { name: /p99/ });
    const row = radio.closest('.metraly-radio');

    expect(radio).toHaveAttribute('aria-invalid', 'true');
    expect(radio).toHaveAccessibleDescription('Choose a supported quantile');
    expect(row).toHaveAttribute('data-state', 'error');
    expect(row).toHaveClass('is-error');
  });

  it('renders switch loading and purple accent states', () => {
    render(<MetralySwitch label="Beta channel" hint="Applying setting" checked loading accent="purple" onClick={() => undefined} />);

    const switchControl = screen.getByRole('switch', { name: 'Beta channel' });
    const row = switchControl.closest('.metraly-switch-row');

    expect(switchControl).toBeDisabled();
    expect(switchControl).toHaveAttribute('aria-busy', 'true');
    expect(row).toHaveAttribute('data-state', 'loading');
    expect(row).toHaveAttribute('data-accent', 'purple');
    expect(row).toHaveClass('is-loading');
    expect(row).toHaveClass('is-purple');
    expect(screen.getByText('Applying setting')).toBeInTheDocument();
  });

  it('renders select placeholder, loading, empty and hint states', () => {
    const { rerender } = render(
      <MetralySelect
        id="phase-select"
        label="Signal source"
        placeholder="Select source…"
        options={[{ value: 'github', label: 'GitHub pull requests' }]}
        hint="Source is required"
        loading
      />,
    );

    const loadingSelect = screen.getByRole('combobox', { name: /Signal source/ });
    const loadingField = loadingSelect.closest('.metraly-select-field');

    expect(loadingSelect).toBeDisabled();
    expect(loadingSelect).toHaveAttribute('aria-busy', 'true');
    expect(loadingSelect).toHaveAccessibleDescription('Source is required');
    expect(loadingField).toHaveAttribute('data-state', 'loading');
    expect(loadingField).toHaveClass('is-loading');
    expect(screen.getByRole('option', { name: 'Select source…' })).toBeDisabled();

    rerender(<MetralySelect id="phase-empty-select" label="Empty source" options={[]} hint="No sources connected" />);

    const emptySelect = screen.getByRole('combobox', { name: /Empty source/ });
    const emptyField = emptySelect.closest('.metraly-select-field');

    expect(emptySelect).toBeDisabled();
    expect(emptySelect).toHaveAccessibleDescription('No sources connected');
    expect(emptyField).toHaveAttribute('data-state', 'empty');
    expect(emptyField).toHaveClass('is-empty');
    expect(screen.getByRole('option', { name: 'No options' })).toBeInTheDocument();
  });

  it('renders tabs live pulse state and skips disabled tabs during keyboard navigation', () => {
    const onValueChange = jest.fn();
    render(
      <MetralyTabs
        ariaLabel="Phase tabs"
        value="dora"
        livePulse
        onValueChange={onValueChange}
        items={[
          { value: 'dora', label: 'DORA', count: 4 },
          { value: 'ci', label: 'CI', disabled: true },
          { value: 'flow', label: 'Flow', count: 6 },
        ]}
      />,
    );

    const tablist = screen.getByRole('tablist', { name: 'Phase tabs' });
    const dora = within(tablist).getByRole('tab', { name: /DORA/i });
    const ci = within(tablist).getByRole('tab', { name: /CI/i });

    expect(tablist).toHaveAttribute('data-live-pulse', 'on');
    expect(dora).toHaveAttribute('data-state', 'selected');
    expect(dora).toHaveAttribute('data-live-pulse', 'on');
    expect(ci).toBeDisabled();
    expect(ci).toHaveAttribute('data-state', 'disabled');

    fireEvent.keyDown(dora, { key: 'ArrowRight' });
    expect(onValueChange).toHaveBeenCalledWith('flow');
  });
});
