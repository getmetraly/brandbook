import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MetralyChartCard, MetralySparkline } from '@metraly/ui/charts';

describe('Metraly chart wrappers', () => {
  it('renders accessible chart card summaries and hardening states', () => {
    const states = ['selected', 'dragging', 'resizing', 'fullWidth', 'empty', 'loading', 'error', 'noData'] as const;
    const { container } = render(
      <>
        {states.map((state) => (
          <MetralyChartCard key={state} title={`${state} chart`} summary={`${state} summary`} state={state} />
        ))}
      </>
    );

    states.forEach((state) => {
      expect(screen.getByText(`${state} summary`)).toBeInTheDocument();
      expect(container.querySelector(`.metraly-chart-card.is-${state}`)).toBeInTheDocument();
    });
    expect(screen.getByRole('alert')).toHaveTextContent('Chart disconnected');
  });

  it('renders an accessible sparkline text alternative', () => {
    render(<MetralySparkline values={[1, 3, 2, 5]} ariaLabel="Review latency sparkline" />);

    expect(screen.getByRole('img', { name: 'Review latency sparkline' })).toBeInTheDocument();
  });
});
