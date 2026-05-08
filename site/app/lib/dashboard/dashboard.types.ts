import type { DashboardLayoutItem, DashboardWidgetInstance } from "@metraly/ui";

export type DashboardId = string;

export type Dashboard = {
  id: DashboardId;
  name: string;
  version: 1;
  widgets: DashboardWidgetInstance[];
  createdAt: string;
  updatedAt: string;
};

export type CreateDashboardInput = {
  name?: string;
  widgets?: DashboardWidgetInstance[];
};

export type DashboardLayoutUpdate = DashboardLayoutItem[];

export type DashboardMutationResult = {
  dashboard: Dashboard;
  persisted: boolean;
};
