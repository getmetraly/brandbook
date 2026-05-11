import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MetralyMetricCard, StateBadge } from '@metraly/ui';

describe('MetralyMetricCard', () => {
  it('renders title and value', () => {
    render(<MetralyMetricCard title="Active users" value="1,234" />);
    expect(screen.getByText('Active users')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });

  it('renders optional icon', () => {
    render(<MetralyMetricCard title="Builds" value="42" icon={<span data-testid="icon" />} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders optional footer', () => {
    render(<MetralyMetricCard title="Uptime" value="99.9%" footer="Last 30 days" />);
    expect(screen.getByText('Last 30 days')).toBeInTheDocument();
  });

  it('renders optional badge', () => {
    render(<MetralyMetricCard title="Sync" value="Live" badge={<StateBadge state="live" size="sm" />} />);
    expect(screen.getByRole('status', { name: 'Live' })).toBeInTheDocument();
  });

  it('omits footer when not provided', () => {
    const { container } = render(<MetralyMetricCard title="Latency" value="120ms" />);
    expect(container.querySelector('.metraly-metric-card-footer')).not.toBeInTheDocument();
  });

  it.each([
    'primary', 'secondary', 'success', 'warning', 'error', 'info',
  ] as const)('renders variant %s with a semantic class', (variant) => {
    const { container, unmount } = render(<MetralyMetricCard title="Metric" value="0" variant={variant} />);
    expect(container.querySelector(`.metraly-metric-card.is-${variant}`)).toBeInTheDocument();
    unmount();
  });
});
