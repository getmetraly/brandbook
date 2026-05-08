import '@testing-library/jest-dom';
import { dashboardRepository } from '../../app/lib/dashboard';

beforeEach(() => {
  localStorage.clear();
});

describe('dashboardRepository', () => {
  it('creates, saves and fetches a dashboard', async () => {
    const dashboard = await dashboardRepository.create({ name: 'Test board' });
    const widget = dashboardRepository.createWidget('stat-card', {
      title: 'Stat Card',
      position: { x: 1, y: 2, w: 4, h: 2 },
    });

    const updated = await dashboardRepository.upsertWidget(dashboard, widget);
    expect(updated.dashboard.widgets).toHaveLength(1);

    const fetched = await dashboardRepository.fetch(dashboard.id);
    expect(fetched?.widgets[0]?.title).toBe('Stat Card');
  });

  it('persists layout updates immutably', async () => {
    const dashboard = await dashboardRepository.create({ name: 'Layout board' });
    const widget = dashboardRepository.createWidget('stat-card', { title: 'Stat Card' });
    const withWidget = await dashboardRepository.upsertWidget(dashboard, widget);

    const result = await dashboardRepository.updateLayout(withWidget.dashboard, [
      { i: widget.id, x: 2, y: 3, w: 6, h: 4 },
    ]);

    expect(result.dashboard.widgets[0]?.position).toMatchObject({ x: 2, y: 3, w: 6, h: 4 });
    const fetched = await dashboardRepository.fetch(dashboard.id);
    expect(fetched?.widgets[0]?.position).toMatchObject({ x: 2, y: 3, w: 6, h: 4 });
  });
});
