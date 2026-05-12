import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MetralyBadge, StateBadge } from '@metraly/ui';

describe('StateBadge', () => {
  it('renders label and state', () => {
    render(<StateBadge state="live" label="Live" />);
    expect(screen.getByText('Live')).toBeInTheDocument();
  });

  it('uses default label when label prop not provided', () => {
    render(<StateBadge state="noData" />);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  it('has role=status and aria-label for screen readers', () => {
    render(<StateBadge state="live" label="Live" />);
    const badge = screen.getByRole('status');
    expect(badge).toHaveAttribute('aria-label', 'Live');
  });

  it('supports custom aria label', () => {
    render(<StateBadge state="delayed" label="Delayed" ariaLabel="Delayed telemetry" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Delayed telemetry');
  });

  it('supports compact size for dense dashboard rows', () => {
    const { container } = render(<StateBadge state="live" size="sm" />);
    const badge = container.querySelector('.metraly-state-badge');
    expect(badge).toHaveClass('metraly-state-badge--sm');
    expect(badge).toHaveAttribute('data-size', 'sm');
  });

  it('supports solid tone for higher emphasis contexts', () => {
    const { container } = render(<StateBadge state="warning" tone="solid" />);
    const badge = container.querySelector('.metraly-state-badge');
    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(badge).toHaveClass('metraly-state-badge--tone-solid');
    expect(badge).toHaveAttribute('data-tone', 'solid');
  });

  it('can hide the visual indicator without changing the label', () => {
    const { container } = render(<StateBadge state="stale" showIndicator={false} />);
    expect(screen.getByText('Stale')).toBeInTheDocument();
    expect(container.querySelector('.metraly-state-pulse')).not.toBeInTheDocument();
  });

  it('derives aria-label from state when label is omitted', () => {
    render(<StateBadge state="delayed" />);
    const badge = screen.getByRole('status');
    expect(badge).toHaveAttribute('aria-label', 'Delayed');
  });

  it.each([
    ['live', 'Live'],
    ['stale', 'Stale'],
    ['delayed', 'Delayed'],
    ['disconnected', 'Disconnected'],
    ['noData', 'No data'],
    ['error', 'Error'],
    ['warning', 'Warning'],
    ['success', 'Success'],
    ['info', 'Info'],
  ] as const)('renders state %s with default label %s', (state, expectedLabel) => {
    const { unmount } = render(<StateBadge state={state} />);
    expect(screen.getByText(expectedLabel)).toBeInTheDocument();
    unmount();
  });

  it('applies state-specific CSS class', () => {
    const { container } = render(<StateBadge state="stale" />);
    expect(container.querySelector('.metraly-state-badge.is-stale')).toBeInTheDocument();
  });

  it('keeps the indicator and label in separate constrained elements', () => {
    const { container } = render(<StateBadge state="disconnected" label="Pipeline source disconnected" />);
    expect(container.querySelector('.metraly-state-dot')).toBeInTheDocument();
    expect(container.querySelector('.metraly-state-badge-label')).toHaveTextContent('Pipeline source disconnected');
  });
});

describe('MetralyBadge', () => {
  it('uses the Claude Design badge class contract', () => {
    const { container } = render(<MetralyBadge variant="warning">Chart wrapper</MetralyBadge>);
    const badge = container.querySelector('.metraly-badge');
    expect(badge).toHaveClass('metraly-badge--warning');
    expect(badge).toHaveAttribute('data-variant', 'warning');
    expect(badge).toHaveTextContent('Chart wrapper');
  });
});
