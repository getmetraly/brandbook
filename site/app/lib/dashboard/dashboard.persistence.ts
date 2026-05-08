import type { Dashboard } from "./dashboard.types";

const STORAGE_PREFIX = "metraly-dashboard:";
const INDEX_KEY = "metraly-dashboard:index";

function storage(): Storage | undefined {
  if (typeof window === "undefined") return undefined;
  return window.localStorage;
}

export function dashboardStorageKey(id: string): string {
  return `${STORAGE_PREFIX}${id}`;
}

export function readDashboardFromStorage(id: string): Dashboard | undefined {
  const localStorage = storage();
  if (!localStorage) return undefined;

  const raw = localStorage.getItem(dashboardStorageKey(id));
  if (!raw) return undefined;

  try {
    const parsed = JSON.parse(raw) as Dashboard;
    if (!parsed || typeof parsed.id !== "string" || !Array.isArray(parsed.widgets)) {
      return undefined;
    }
    return parsed;
  } catch {
    return undefined;
  }
}

export function writeDashboardToStorage(dashboard: Dashboard): boolean {
  const localStorage = storage();
  if (!localStorage) return false;

  localStorage.setItem(dashboardStorageKey(dashboard.id), JSON.stringify(dashboard));
  const existing = readDashboardIndex();
  if (!existing.includes(dashboard.id)) {
    localStorage.setItem(INDEX_KEY, JSON.stringify([...existing, dashboard.id]));
  }
  return true;
}

export function deleteDashboardFromStorage(id: string): boolean {
  const localStorage = storage();
  if (!localStorage) return false;

  localStorage.removeItem(dashboardStorageKey(id));
  localStorage.setItem(INDEX_KEY, JSON.stringify(readDashboardIndex().filter((item) => item !== id)));
  return true;
}

export function readDashboardIndex(): string[] {
  const localStorage = storage();
  if (!localStorage) return [];

  const raw = localStorage.getItem(INDEX_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}
