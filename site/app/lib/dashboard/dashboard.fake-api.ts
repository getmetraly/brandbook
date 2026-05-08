import type {
  Dashboard,
  CreateDashboardInput,
  DashboardLayoutUpdate,
  DashboardMutationResult,
} from "./dashboard.types";
import {
  createDashboardWidgetInstance,
  defaultDashboardWidgetRegistry,
  findDashboardWidgetDefinition,
  type DashboardWidgetInstance,
} from "@metraly/ui";
import {
  deleteDashboardFromStorage,
  readDashboardFromStorage,
  writeDashboardToStorage,
} from "./dashboard.persistence";

function now(): string {
  return new Date().toISOString();
}

function uid(prefix = "dash"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

type CreateWidgetOptions = Omit<Partial<DashboardWidgetInstance>, "position"> & {
  position?: Partial<DashboardWidgetInstance["position"]>;
};

function cloneDashboard(dashboard: Dashboard): Dashboard {
  return {
    ...dashboard,
    widgets: dashboard.widgets.map((widget) => ({
      ...widget,
      position: { ...widget.position },
      settings: widget.settings ? { ...widget.settings } : undefined,
    })),
  };
}

export async function createDashboard(input: CreateDashboardInput = {}): Promise<Dashboard> {
  const timestamp = now();
  const dashboard: Dashboard = {
    id: uid("dashboard"),
    name: input.name ?? "Untitled dashboard",
    version: 1,
    widgets: input.widgets ?? [],
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  writeDashboardToStorage(dashboard);
  return cloneDashboard(dashboard);
}

export async function fetchDashboard(id: string): Promise<Dashboard | undefined> {
  const dashboard = readDashboardFromStorage(id);
  return dashboard ? cloneDashboard(dashboard) : undefined;
}

export async function saveDashboard(dashboard: Dashboard): Promise<DashboardMutationResult> {
  const next = { ...cloneDashboard(dashboard), updatedAt: now() };
  const persisted = writeDashboardToStorage(next);
  return { dashboard: cloneDashboard(next), persisted };
}

export async function upsertWidget(
  dashboard: Dashboard,
  widget: DashboardWidgetInstance,
): Promise<DashboardMutationResult> {
  const index = dashboard.widgets.findIndex((existing) => existing.id === widget.id);
  const widgets = index === -1
    ? [...dashboard.widgets, widget]
    : dashboard.widgets.map((existing) => (existing.id === widget.id ? widget : existing));

  return saveDashboard({ ...dashboard, widgets });
}

export async function removeWidget(
  dashboard: Dashboard,
  widgetId: string,
): Promise<DashboardMutationResult> {
  return saveDashboard({
    ...dashboard,
    widgets: dashboard.widgets.filter((widget) => widget.id !== widgetId),
  });
}

export async function updateDashboardLayout(
  dashboard: Dashboard,
  layout: DashboardLayoutUpdate,
): Promise<DashboardMutationResult> {
  const widgets = dashboard.widgets.map((widget) => {
    const item = layout.find((layoutItem) => layoutItem.i === widget.id);
    if (!item) return widget;
    return {
      ...widget,
      position: {
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
        minW: item.minW ?? widget.position.minW,
        minH: item.minH ?? widget.position.minH,
        maxW: item.maxW ?? widget.position.maxW,
        maxH: item.maxH ?? widget.position.maxH,
        static: item.static ?? widget.position.static,
      },
    };
  });

  return saveDashboard({ ...dashboard, widgets });
}

export async function deleteDashboard(id: string): Promise<boolean> {
  return deleteDashboardFromStorage(id);
}

export function createWidgetInstance(
  type: string,
  options: CreateWidgetOptions = {},
): DashboardWidgetInstance {
  const definition = findDashboardWidgetDefinition(defaultDashboardWidgetRegistry, type);
  if (definition) {
    return createDashboardWidgetInstance(definition, {
      id: options.id,
      title: options.title,
      description: options.description,
      state: options.state,
      stateLabel: options.stateLabel,
      settings: options.settings,
      position: options.position,
    });
  }

  return {
    id: options.id ?? uid("widget"),
    type,
    title: options.title ?? type,
    description: options.description,
    state: options.state ?? "live",
    stateLabel: options.stateLabel,
    position: {
      x: options.position?.x ?? 0,
      y: options.position?.y ?? 0,
      w: options.position?.w ?? 4,
      h: options.position?.h ?? 2,
      minW: options.position?.minW ?? 3,
      minH: options.position?.minH ?? 2,
    },
    settings: options.settings,
  };
}
