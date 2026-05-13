import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardEditor from '../../app/components/dashboard/DashboardEditor';
import { dashboardRepository } from '../../app/lib/dashboard';

function setDashboardUrl(path: string) {
  window.history.replaceState(null, '', path);
}

beforeEach(() => {
  localStorage.clear();
  setDashboardUrl('/');
});

describe('DashboardEditor lifecycle (4.4)', () => {
  it('creates a dashboard, adds a widget and restores it after reload', async () => {
    const first = render(<DashboardEditor />);

    await screen.findByText(/Created new dashboard/);
    const dashboardId = new URL(window.location.href).searchParams.get('dashboard');
    expect(dashboardId).toMatch(/^dashboard_/);

    const picker = screen.getByRole('listbox', { name: 'Available widgets' });
    fireEvent.click(within(picker).getAllByRole('option')[0]);
    await screen.findByText(/Widget added and saved/);
    await waitFor(() => {
      expect(first.container.querySelectorAll('.metraly-dashboard-widget')).toHaveLength(1);
    });

    first.unmount();
    const second = render(<DashboardEditor />);

    await screen.findByText(/Loaded from local persistence/);
    await waitFor(() => {
      expect(second.container.querySelectorAll('.metraly-dashboard-widget')).toHaveLength(1);
    });
    expect(new URL(window.location.href).searchParams.get('dashboard')).toBe(dashboardId);
  });

  it('loads an existing dashboard from the URL and reset creates a fresh board', async () => {
    const dashboard = await dashboardRepository.create({ name: 'Saved board' });
    const widget = dashboardRepository.createWidget('stat-card', { title: 'Persisted widget' });
    await dashboardRepository.upsertWidget(dashboard, widget);
    setDashboardUrl(`/?dashboard=${dashboard.id}`);

    render(<DashboardEditor />);

    await screen.findByText(/Loaded from local persistence/);
    expect(screen.getByText('Persisted widget')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));

    await screen.findByText(/Created new dashboard/);
    expect(screen.getByRole('region', { name: 'Empty dashboard' })).toBeInTheDocument();
    expect(screen.queryByText('Persisted widget')).not.toBeInTheDocument();
    expect(new URL(window.location.href).searchParams.get('dashboard')).not.toBe(dashboard.id);
  });
});
