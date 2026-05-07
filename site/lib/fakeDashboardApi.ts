// Fake API layer for dashboard operations.  This module emulates CRUD
// functionality using the browser's localStorage.  It allows us to test
// creation, retrieval and persistence of dashboard configurations without
// relying on a backend service.

export interface WidgetConfig {
  id: string;
  type: string;
  title: string;
  /** Position within the grid (0‑based grid columns and rows, plus span). */
  position: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  /** Additional user‑defined settings. */
  settings?: Record<string, unknown>;
}

export interface Dashboard {
  id: string;
  widgets: WidgetConfig[];
}

const STORAGE_PREFIX = "metraly-dashboard-";

/**
 * Generates a random unique identifier.  In production this would come from
 * the backend or database.
 */
function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

/**
 * Persists a dashboard object in localStorage.
 */
function persist(dashboard: Dashboard): void {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(STORAGE_PREFIX + dashboard.id, JSON.stringify(dashboard));
  } catch (err) {
    console.warn("Failed to persist dashboard", err);
  }
}

/**
 * Creates a new dashboard with an optional set of initial widgets.  Returns
 * the created dashboard instance.
 */
export async function createDashboard(initialWidgets: WidgetConfig[] = []): Promise<Dashboard> {
  const dashboard: Dashboard = {
    id: uid(),
    widgets: [...initialWidgets],
  };
  persist(dashboard);
  return Promise.resolve(dashboard);
}

/**
 * Fetches a dashboard by identifier.  Resolves to undefined if not found.
 */
export async function fetchDashboard(id: string): Promise<Dashboard | undefined> {
  if (typeof localStorage === "undefined") return undefined;
  const raw = localStorage.getItem(STORAGE_PREFIX + id);
  if (!raw) return undefined;
  try {
    return JSON.parse(raw) as Dashboard;
  } catch (err) {
    console.warn("Failed to parse dashboard", err);
    return undefined;
  }
}

/**
 * Saves modifications to a dashboard.  Returns the updated dashboard.
 */
export async function saveDashboard(dashboard: Dashboard): Promise<Dashboard> {
  persist(dashboard);
  return Promise.resolve(dashboard);
}

/**
 * Updates or inserts a widget within a dashboard.  If the widget id exists
 * it is replaced; otherwise it is appended.  Returns the updated dashboard.
 */
export async function upsertWidget(dashboard: Dashboard, widget: WidgetConfig): Promise<Dashboard> {
  const index = dashboard.widgets.findIndex((w) => w.id === widget.id);
  if (index >= 0) {
    dashboard.widgets.splice(index, 1, widget);
  } else {
    dashboard.widgets.push(widget);
  }
  persist(dashboard);
  return Promise.resolve(dashboard);
}

/**
 * Removes a widget by id from the dashboard.  Returns the updated dashboard.
 */
export async function removeWidget(dashboard: Dashboard, widgetId: string): Promise<Dashboard> {
  dashboard.widgets = dashboard.widgets.filter((w) => w.id !== widgetId);
  persist(dashboard);
  return Promise.resolve(dashboard);
}