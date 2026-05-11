import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DashboardEmptyState } from '@metraly/ui';

describe('DashboardEmptyState', () => {
  it('renders default title and description', () => {
    render(<DashboardEmptyState />);
    expect(screen.getByText('No widgets yet')).toBeInTheDocument();
    expect(screen.getByText('Add a telemetry widget to start building this dashboard.')).toBeInTheDocument();
  });

  it('accepts custom title and description', () => {
    render(<DashboardEmptyState title="Nothing here" description="Start by adding a widget." />);
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
    expect(screen.getByText('Start by adding a widget.')).toBeInTheDocument();
  });

  it('renders action slot when provided', () => {
    render(<DashboardEmptyState action={<button type="button">Add widget</button>} />);
    expect(screen.getByRole('button', { name: 'Add widget' })).toBeInTheDocument();
  });

  it('omits action slot when not provided', () => {
    const { container } = render(<DashboardEmptyState />);
    expect(container.querySelector('.metraly-dashboard-empty-action')).not.toBeInTheDocument();
  });

  it('has accessible region label', () => {
    render(<DashboardEmptyState />);
    expect(screen.getByRole('region', { name: 'Empty dashboard' })).toBeInTheDocument();
  });

  it('pulse decoration is aria-hidden', () => {
    const { container } = render(<DashboardEmptyState />);
    const pulse = container.querySelector('.metraly-dashboard-empty-pulse');
    expect(pulse).toHaveAttribute('aria-hidden', 'true');
  });
});
