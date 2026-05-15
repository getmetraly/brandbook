import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MetralyMetricCard, StateBadge } from '@metraly/ui';

describe('MetralyMetricCard', () => {
  it('renders title and value', () => {
    render(<MetralyMetricCard title="Active users" value="1,234" />);
    expect(screen.getByText('Active users')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });

  it('renders optional description for engineering context', () => {
    render(<MetralyMetricCard title="Lead time" value="2.4d" description="Median across merged pull requests" />);
    expect(screen.getByText('Median across merged pull requests')).toBeInTheDocument();
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

  it('anchors the footer to the bottom for equal-height metric grids', () => {
    const css = readFileSync(
      join(__dirname, '../../../packages/ui/src/styles/metraly-metric-card.css'),
      'utf8',
    );

    expect(css).toMatch(/\.metraly-metric-card\s*\{[^}]*height:\s*100%/s);
    expect(css).toMatch(/\.metraly-metric-card-header\s*\{[^}]*flex:\s*1 1 auto/s);
    expect(css).toMatch(/\.metraly-metric-card-footer\s*\{[^}]*margin-top:\s*auto/s);
  });

  it('omits footer when not provided', () => {
    const { container } = render(<MetralyMetricCard title="Latency" value="120ms" />);
    expect(container.querySelector('.metraly-metric-card-footer')).not.toBeInTheDocument();
  });

  it('supports compact density for dense metric grids', () => {
    const { container } = render(<MetralyMetricCard title="Deploys" value="18" density="compact" />);
    const card = container.querySelector('.metraly-metric-card');
    expect(card).toHaveClass('metraly-metric-card--compact');
    expect(card).toHaveAttribute('data-density', 'compact');
  });

  it.each([
    'primary', 'secondary', 'success', 'warning', 'error', 'info',
  ] as const)('renders variant %s with a semantic class and metadata', (variant) => {
    const { container, unmount } = render(<MetralyMetricCard title="Metric" value="0" variant={variant} />);
    const card = container.querySelector(`.metraly-metric-card.is-${variant}`);
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute('data-variant', variant);
    unmount();
  });
});
