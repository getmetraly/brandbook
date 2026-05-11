import '@testing-library/jest-dom';
import { dashboardRepository } from '../../app/lib/dashboard';

beforeEach(() => {
  localStorage.clear();
});

describe('dashboard editor lifecycle (4.4)', () => {
  it('full lifecycle: create → add widgets → reload → data survives', async () => {
    const dashboard = await dashboardRepository.create({ name: 'Engineering Board' });
    const stat = dashboardRepository.createWidget('stat-card', { title: 'Flow efficiency' });
    const chart = dashboardRepository.createWidget('metric-chart', { title: 'Deploy trend' });

    const { dashboard: withStat } = await dashboardRepository.upsertWidget(dashboard, stat);
    const { dashboard: withChart } = await dashboardRepository.upsertWidget(withStat, chart);
    expect(withChart.widgets).toHaveLength(2);

    const reloaded = await dashboardRepository.fetch(dashboard.id);
    expect(reloaded).toBeDefined();
    expect(reloaded?.name).toBe('Engineering Board');
    expect(reloaded?.widgets).toHaveLength(2);
    expect(reloaded?.widgets.map((w) => w.title)).toEqual(
      expect.arrayContaining(['Flow efficiency', 'Deploy trend']),
    );
  });

  it('remove widget → save → reload → widget is gone', async () => {
    const dashboard = await dashboardRepository.create({ name: 'Board' });
    const w1 = dashboardRepository.createWidget('stat-card', { title: 'Keep me' });
    const w2 = dashboardRepository.createWidget('data-table', { title: 'Remove me' });

    const { dashboard: withBoth } = await dashboardRepository.upsertWidget(dashboard, w1);
    const { dashboard: withAll } = await dashboardRepository.upsertWidget(withBoth, w2);

    const { dashboard: trimmed } = await dashboardRepository.removeWidget(withAll, w2.id);
    const reloaded = await dashboardRepository.fetch(dashboard.id);

    expect(trimmed.widgets).toHaveLength(1);
    expect(reloaded?.widgets).toHaveLength(1);
    expect(reloaded?.widgets[0]?.title).toBe('Keep me');
  });

  it('dashboard name is preserved across saves', async () => {
    const dashboard = await dashboardRepository.create({ name: 'My Dashboard' });
    const widget = dashboardRepository.createWidget('stat-card');
    await dashboardRepository.upsertWidget(dashboard, widget);

    const reloaded = await dashboardRepository.fetch(dashboard.id);
    expect(reloaded?.name).toBe('My Dashboard');
  });

  it('updatedAt advances on each save', async () => {
    const dashboard = await dashboardRepository.create({ name: 'Timestamps' });
    const created = dashboard.updatedAt;

    await new Promise((resolve) => setTimeout(resolve, 2));
    const { dashboard: saved } = await dashboardRepository.save(dashboard);

    expect(new Date(saved.updatedAt).getTime()).toBeGreaterThanOrEqual(new Date(created).getTime());
  });

  it('layout update is persisted and survives reload', async () => {
    const dashboard = await dashboardRepository.create({ name: 'Layout board' });
    const widget = dashboardRepository.createWidget('stat-card');
    const { dashboard: withWidget } = await dashboardRepository.upsertWidget(dashboard, widget);

    await dashboardRepository.updateLayout(withWidget, [
      { i: widget.id, x: 3, y: 5, w: 8, h: 4 },
    ]);

    const reloaded = await dashboardRepository.fetch(dashboard.id);
    expect(reloaded?.widgets[0]?.position).toMatchObject({ x: 3, y: 5, w: 8, h: 4 });
  });

  it('fetch returns undefined for unknown dashboard id', async () => {
    const result = await dashboardRepository.fetch('non-existent-id');
    expect(result).toBeUndefined();
  });

  it('delete returns true and makes dashboard unfetchable', async () => {
    const dashboard = await dashboardRepository.create({ name: 'Disposable' });
    const deleted = await dashboardRepository.delete(dashboard.id);

    expect(deleted).toBe(true);
    expect(await dashboardRepository.fetch(dashboard.id)).toBeUndefined();
  });

  it('persisted flag reflects storage write outcome', async () => {
    const dashboard = await dashboardRepository.create({ name: 'Flag test' });
    const { persisted } = await dashboardRepository.save(dashboard);
    expect(persisted).toBe(true);
  });
});
