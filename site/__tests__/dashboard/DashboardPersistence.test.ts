import '@testing-library/jest-dom';
import {
  dashboardRepository,
  readDashboardFromStorage,
  readDashboardIndex,
  dashboardStorageKey,
} from '../../app/lib/dashboard';

beforeEach(() => {
  localStorage.clear();
});

describe('dashboard persistence layer (4.6)', () => {
  it('delete removes dashboard from storage and index', async () => {
    const dashboard = await dashboardRepository.create({ name: 'Temp' });
    expect(readDashboardIndex()).toContain(dashboard.id);

    await dashboardRepository.delete(dashboard.id);

    expect(readDashboardFromStorage(dashboard.id)).toBeUndefined();
    expect(readDashboardIndex()).not.toContain(dashboard.id);
  });

  it('removeWidget removes the correct widget and persists', async () => {
    const dashboard = await dashboardRepository.create({ name: 'Board' });
    const w1 = dashboardRepository.createWidget('stat-card', { title: 'Stat A' });
    const w2 = dashboardRepository.createWidget('metric-chart', { title: 'Chart B' });
    const { dashboard: withBoth } = await dashboardRepository.upsertWidget(dashboard, w1);
    const { dashboard: withAll } = await dashboardRepository.upsertWidget(withBoth, w2);
    expect(withAll.widgets).toHaveLength(2);

    const { dashboard: afterRemove } = await dashboardRepository.removeWidget(withAll, w1.id);
    expect(afterRemove.widgets).toHaveLength(1);
    expect(afterRemove.widgets[0]?.id).toBe(w2.id);

    const fetched = await dashboardRepository.fetch(dashboard.id);
    expect(fetched?.widgets).toHaveLength(1);
    expect(fetched?.widgets[0]?.id).toBe(w2.id);
  });

  it('multiple dashboards are tracked in the index independently', async () => {
    const a = await dashboardRepository.create({ name: 'Board A' });
    const b = await dashboardRepository.create({ name: 'Board B' });
    const c = await dashboardRepository.create({ name: 'Board C' });

    const index = readDashboardIndex();
    expect(index).toContain(a.id);
    expect(index).toContain(b.id);
    expect(index).toContain(c.id);

    await dashboardRepository.delete(b.id);
    const afterDelete = readDashboardIndex();
    expect(afterDelete).toContain(a.id);
    expect(afterDelete).not.toContain(b.id);
    expect(afterDelete).toContain(c.id);
  });

  it('corrupt storage JSON returns undefined without throwing', () => {
    localStorage.setItem(dashboardStorageKey('bad-id'), '{not valid json');
    expect(readDashboardFromStorage('bad-id')).toBeUndefined();
  });

  it('storage with invalid shape returns undefined', () => {
    localStorage.setItem(dashboardStorageKey('bad-shape'), JSON.stringify({ wrong: true }));
    expect(readDashboardFromStorage('bad-shape')).toBeUndefined();
  });

  it('widget id round-trips correctly through save and fetch', async () => {
    const dashboard = await dashboardRepository.create({ name: 'Round-trip' });
    const widget = dashboardRepository.createWidget('stat-card');
    const originalId = widget.id;

    await dashboardRepository.upsertWidget(dashboard, widget);
    const fetched = await dashboardRepository.fetch(dashboard.id);

    expect(fetched?.widgets[0]?.id).toBe(originalId);
    expect(fetched?.widgets[0]?.type).toBe('stat-card');
  });

  it('upsertWidget replaces existing widget with same id', async () => {
    const dashboard = await dashboardRepository.create({ name: 'Upsert test' });
    const widget = dashboardRepository.createWidget('stat-card', { title: 'Original' });
    const { dashboard: withWidget } = await dashboardRepository.upsertWidget(dashboard, widget);

    const updated = { ...widget, title: 'Updated' };
    const { dashboard: withUpdated } = await dashboardRepository.upsertWidget(withWidget, updated);

    expect(withUpdated.widgets).toHaveLength(1);
    expect(withUpdated.widgets[0]?.title).toBe('Updated');
  });
});
