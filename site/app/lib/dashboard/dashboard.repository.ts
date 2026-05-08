import type { Dashboard, CreateDashboardInput, DashboardLayoutUpdate } from "./dashboard.types";
import type { DashboardWidgetInstance } from "@metraly/ui";
import {
  createDashboard,
  createWidgetInstance,
  deleteDashboard,
  fetchDashboard,
  removeWidget,
  saveDashboard,
  updateDashboardLayout,
  upsertWidget,
} from "./dashboard.fake-api";

export const dashboardRepository = {
  create: createDashboard,
  createWidget: createWidgetInstance,
  fetch: fetchDashboard,
  save: saveDashboard,
  delete: deleteDashboard,
  upsertWidget,
  removeWidget,
  updateLayout: updateDashboardLayout,
} satisfies {
  create(input?: CreateDashboardInput): Promise<Dashboard>;
  createWidget(type: string, options?: Partial<DashboardWidgetInstance>): DashboardWidgetInstance;
  fetch(id: string): Promise<Dashboard | undefined>;
  save(dashboard: Dashboard): Promise<{ dashboard: Dashboard; persisted: boolean }>;
  delete(id: string): Promise<boolean>;
  upsertWidget(dashboard: Dashboard, widget: DashboardWidgetInstance): Promise<{ dashboard: Dashboard; persisted: boolean }>;
  removeWidget(dashboard: Dashboard, widgetId: string): Promise<{ dashboard: Dashboard; persisted: boolean }>;
  updateLayout(dashboard: Dashboard, layout: DashboardLayoutUpdate): Promise<{ dashboard: Dashboard; persisted: boolean }>;
};
