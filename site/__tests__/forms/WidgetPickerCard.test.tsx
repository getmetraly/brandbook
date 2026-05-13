import { fireEvent, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WidgetPickerCard } from '@metraly/ui';

describe('WidgetPickerCard', () => {
  it('renders title, description, selected state and metadata', () => {
    render(
      <WidgetPickerCard
        title="Flow efficiency"
        description="Track delivery throughput."
        selected
        iconLabel="pulse"
        state="live"
      />
    );

    expect(screen.getByRole('option', { selected: true })).toBeInTheDocument();
    expect(screen.getByLabelText('Live')).toBeInTheDocument();
    expect(screen.getByText('Flow efficiency')).toBeInTheDocument();
    expect(screen.getByText('Track delivery throughput.')).toBeInTheDocument();
    expect(screen.getByText('Live')).toBeInTheDocument();
    expect(screen.getByText('PU')).toBeInTheDocument();
    expect(screen.getByText('pulse')).toBeInTheDocument();
  });

  it('supports selection callbacks and disabled state', () => {
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
    expect(screen.getByText('Delayed')).toBeInTheDocument();

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
