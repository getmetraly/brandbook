import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StateBadge } from '@metraly/ui';

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
  ] as const)('renders state %s with default label %s', (state, expectedLabel) => {
    const { unmount } = render(<StateBadge state={state} />);
    expect(screen.getByText(expectedLabel)).toBeInTheDocument();
    unmount();
  });

  it('applies state-specific CSS class', () => {
    const { container } = render(<StateBadge state="stale" />);
    expect(container.querySelector('.metraly-state-badge.is-stale')).toBeInTheDocument();
  });
});