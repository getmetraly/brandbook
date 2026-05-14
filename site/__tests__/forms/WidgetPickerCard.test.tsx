import { fireEvent, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WidgetPickerCard } from '@metraly/ui';

describe('WidgetPickerCard', () => {
  it('renders title, description, selected state and kind label', () => {
    render(
      <WidgetPickerCard
        title="Flow efficiency"
        description="Track delivery throughput."
        selected
        iconLabel="metric"
        state="live"
      />
    );

    expect(screen.getByRole('option', { selected: true })).toBeInTheDocument();
    expect(screen.getByText('Flow efficiency')).toBeInTheDocument();
    expect(screen.getByText('Track delivery throughput.')).toBeInTheDocument();
    // The kind label (effectiveKind = iconLabel when no kind prop is provided) is always rendered.
    expect(screen.getByText('metric')).toBeInTheDocument();
    // Routine "live" state does not show a badge in the picker row — only "new" / "disabled" / "loading" do.
    expect(screen.queryByText('Live')).not.toBeInTheDocument();
  });

  it('supports selection callbacks and suppresses routine state badges', () => {
    const onSelect = jest.fn();

    render(
      <WidgetPickerCard
        title="Review latency"
        description="Track PR waiting time."
        selected={false}
        iconLabel="review"
        state="delayed"
        onSelect={onSelect}
      />
    );

    const option = screen.getByRole('option', { name: /Review latency/ });
    fireEvent.click(option);

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(option).toHaveAttribute('aria-selected', 'false');
    // "delayed" is a routine operational state — no badge shown in picker rows.
    expect(screen.queryByText('Delayed')).not.toBeInTheDocument();

    render(
      <WidgetPickerCard
        title="Disabled widget"
        description="Cannot be selected."
        iconLabel="disabled"
        disabled
        onSelect={onSelect}
      />
    );

    expect(screen.getByRole('option', { name: /Disabled widget/ })).toBeDisabled();
  });
});
