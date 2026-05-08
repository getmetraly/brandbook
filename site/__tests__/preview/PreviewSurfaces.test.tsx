import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TelemetryEmptyState from '../../app/components/previews/TelemetryEmptyState';
import TelemetryNotificationCenter from '../../app/components/previews/TelemetryNotificationCenter';
import TelemetrySidebar from '../../app/components/previews/TelemetrySidebar';
import TelemetryToast from '../../app/components/previews/TelemetryToast';
import TelemetryTopbar from '../../app/components/previews/TelemetryTopbar';

describe('preview surfaces', () => {
  it('renders sidebar navigation with an active boards item', () => {
    render(<TelemetrySidebar />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(6);
    expect(screen.getByText('Metraly')).toBeInTheDocument();
    expect(screen.getByText('Engineering board')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Boards Layouts/i })).toHaveClass('is-active');
    expect(screen.getByText('Local preview')).toBeInTheDocument();
  });

  it('renders topbar actions and board copy', () => {
    render(<TelemetryTopbar />);

    expect(screen.getByText('Engineering board')).toBeInTheDocument();
    expect(screen.getByText('Last updated 2m ago')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add widget' })).toBeInTheDocument();
  });

  it('renders toast state variants with the expected copy', () => {
    const { container } = render(<TelemetryToast state="delayed" title="Board refreshed" description="Layout saved and queued for sync." />);

    const toast = container.querySelector('.telemetry-toast-draft');
    expect(toast).toHaveClass('is-delayed');
    expect(screen.getByText('Board refreshed')).toBeInTheDocument();
    expect(screen.getByText('Layout saved and queued for sync.')).toBeInTheDocument();
    expect(container.querySelector('.telemetry-state-pulse')).toBeInTheDocument();
  });

  it('renders notification entries and counts', () => {
    const { container } = render(<TelemetryNotificationCenter />);

    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('3 events')).toBeInTheDocument();
    expect(screen.getByText('Deployment completed')).toBeInTheDocument();
    expect(screen.getByText('Latency spike detected')).toBeInTheDocument();
    expect(screen.getByText('Board synced')).toBeInTheDocument();
    expect(container.querySelectorAll('.telemetry-notification-item.is-unread')).toHaveLength(1);
    expect(container.querySelectorAll('.telemetry-notification-item.is-warning')).toHaveLength(1);
    expect(container.querySelectorAll('.telemetry-notification-item.is-read')).toHaveLength(1);
  });

  it('renders the empty state call to action', () => {
    render(<TelemetryEmptyState />);

    expect(screen.getByText('No telemetry widgets yet')).toBeInTheDocument();
    expect(screen.getByText('Select a source and add your first board widget.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add widget' })).toBeInTheDocument();
  });
});
