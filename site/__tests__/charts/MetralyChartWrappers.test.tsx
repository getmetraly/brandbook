import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MetralyBadge } from '@metraly/ui';
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

  it('renders badge content inside the constrained chart badge slot', () => {
    const { container } = render(
      <MetralyChartCard
        title="Review latency"
        summary="Review queue latency over the selected sprint."
        badge={<MetralyBadge variant="info">Chart wrapper</MetralyBadge>}
      />
    );

    expect(container.querySelector('.metraly-chart-card-badge .metraly-badge')).toBeInTheDocument();
    expect(screen.getByText('Chart wrapper')).toBeInTheDocument();
  });

  it('renders an accessible sparkline text alternative', () => {
    render(<MetralySparkline values={[1, 3, 2, 5]} ariaLabel="Review latency sparkline" />);

    expect(screen.getByRole('img', { name: 'Review latency sparkline' })).toBeInTheDocument();
  });
});
