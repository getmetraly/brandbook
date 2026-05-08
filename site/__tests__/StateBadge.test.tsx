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
    // default label should transform camelCase to spaced words (No data)
    expect(screen.getByText('No data')).toBeInTheDocument();
  });
});