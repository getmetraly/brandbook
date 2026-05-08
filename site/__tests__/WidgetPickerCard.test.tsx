import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WidgetPickerCard } from '@metraly/ui';

describe('WidgetPickerCard', () => {
  it('renders title, description, state and tags', () => {
    render(
      <WidgetPickerCard
        title="Flow efficiency"
        description="Track delivery throughput."
        selected
        iconLabel="pulse"
        tags={['github', 'telemetry']}
        state="live"
      />
    );

    expect(screen.getByRole('option', { selected: true })).toBeInTheDocument();
    expect(screen.getByText('Flow efficiency')).toBeInTheDocument();
    expect(screen.getByText('Track delivery throughput.')).toBeInTheDocument();
    expect(screen.getByText('Live')).toBeInTheDocument();
    expect(screen.getByText('github')).toBeInTheDocument();
  });
});
