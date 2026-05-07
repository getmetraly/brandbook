"use client";

import { useEffect, useState } from "react";
import WidgetShell from "../../../implementation-pack/react/WidgetShell";
import {
  createDashboard,
  fetchDashboard,
  saveDashboard,
  upsertWidget,
  removeWidget,
  type Dashboard,
  type WidgetConfig,
} from "../lib/fakeDashboardApi";
// Import responsive grid layout and width provider from react-grid-layout
import { Responsive, WidthProvider } from "react-grid-layout";

// Wrap Responsive component with WidthProvider to auto-calc width
const ResponsiveGridLayout = WidthProvider(Responsive);

// Import grid and resizable styles.  Without these imports the grid
// will not display correctly.  Note: these packages are provided by
// react-grid-layout; when migrating to production ensure they are
// installed and available.
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

// Define a small registry of available widget templates.  In a real
// application this would be fetched from a plugin registry or API.
const registry = [
  {
    type: "stat-card",
    title: "Stat Card",
    state: "live" as const,
    body: <p>Simple KPI summary widget.</p>,
  },
  {
    type: "metric-chart",
    title: "Metric Chart",
    state: "live" as const,
    body: <p>Line chart for metric over time.</p>,
  },
  {
    type: "data-table",
    title: "Data Table",
    state: "delayed" as const,
    body: <p>Tabular widget for entity listings.</p>,
  },
];

export default function DashboardEditor() {
  const [dashboard, setDashboard] = useState<Dashboard | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // On mount, either load existing dashboard by id from query/hash or create a new one.
  useEffect(() => {
    async function init() {
      setLoading(true);
      setError(null);
      try {
        const url = new URL(window.location.href);
        const id = url.searchParams.get("dashboard");
        let dash: Dashboard | undefined;
        if (id) {
          dash = await fetchDashboard(id);
        }
        if (!dash) {
          dash = await createDashboard();
          // update url to include the dashboard id
          url.searchParams.set("dashboard", dash.id);
          window.history.replaceState(null, "", url.toString());
        }
        setDashboard(dash);
      } catch (err: any) {
        setError(err?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  // Handler to add a new widget from the registry
  async function handleAddWidget(type: string) {
    if (!dashboard) return;
    // Create a basic widget config with a random id and default position
    const widget: WidgetConfig = {
      id: Math.random().toString(36).slice(2, 10),
      type,
      title: registry.find((item) => item.type === type)?.title || type,
      position: { x: 0, y: dashboard.widgets.length, w: 1, h: 1 },
    };
    const updated = await upsertWidget({ ...dashboard }, widget);
    setDashboard({ ...updated });
  }

  // Handler to remove widget
  async function handleRemoveWidget(id: string) {
    if (!dashboard) return;
    const updated = await removeWidget({ ...dashboard }, id);
    setDashboard({ ...updated });
  }

  // Handler to save dashboard manually
  async function handleSave() {
    if (!dashboard) return;
    await saveDashboard(dashboard);
    alert("Dashboard saved to localStorage.");
  }

  // Handler to reset and create a new dashboard
  async function handleReset() {
    const newDash = await createDashboard();
    // update url param
    const url = new URL(window.location.href);
    url.searchParams.set("dashboard", newDash.id);
    window.history.replaceState(null, "", url.toString());
    setDashboard(newDash);
  }

  return (
    <div className="dashboard-editor-panel panel">
      <div className="dashboard-editor-head">
        <div>
          <strong>Dashboard Editor</strong>
          <span style={{ fontSize: "0.875rem", color: "var(--metraly-text-secondary)" }}>
            Create, edit and arrange widgets. State persists in localStorage.
          </span>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button className="btn btn-secondary" type="button" onClick={handleReset} disabled={loading}>Reset</button>
          <button className="btn btn-primary" type="button" onClick={handleSave} disabled={loading}>Save</button>
        </div>
      </div>
      {loading && <p style={{ marginTop: "1rem" }}>Loading dashboard…</p>}
      {error && <p style={{ marginTop: "1rem", color: "var(--metraly-error)" }}>{error}</p>}
      {dashboard && (
        <div className="dashboard-editor-body" style={{ marginTop: "1rem", display: "grid", gap: "1rem" }}>
          {/* Render widgets inside a responsive grid layout.  Each widget
              defines its position and size via the `data-grid` prop.  On
              layout change, update the dashboard state to reflect new
              positions. */}
          <ResponsiveGridLayout
            className="dashboard-grid"
            layouts={{
              lg: dashboard.widgets.map((w) => ({
                i: w.id,
                x: w.position.x,
                y: w.position.y,
                w: w.position.w,
                h: w.position.h,
              })),
            }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={160}
            onLayoutChange={(currentLayout) => {
              // currentLayout is array of items with updated x/y/w/h
              setDashboard((prev) => {
                if (!prev) return prev;
                const updatedWidgets = prev.widgets.map((w) => {
                  const item = currentLayout.find((i) => i.i === w.id);
                  return item
                    ? {
                        ...w,
                        position: {
                          x: item.x,
                          y: item.y,
                          w: item.w,
                          h: item.h,
                        },
                      }
                    : w;
                });
                return { ...prev, widgets: updatedWidgets };
              });
            }}
          >
            {dashboard.widgets.map((w) => {
              const template = registry.find((item) => item.type === w.type);
              return (
                <div key={w.id} data-grid={{ x: w.position.x, y: w.position.y, w: w.position.w, h: w.position.h }}>
                  <WidgetShell
                    title={w.title}
                    state={template?.state || "live"}
                    resizable
                    selected={false}
                  >
                    {template?.body}
                    <div style={{ marginTop: "0.75rem", display: "flex", justifyContent: "flex-end" }}>
                      <button className="btn btn-sm btn-secondary" type="button" onClick={() => handleRemoveWidget(w.id)}>
                        Remove
                      </button>
                    </div>
                  </WidgetShell>
                </div>
              );
            })}
          </ResponsiveGridLayout>
          <div style={{ marginTop: "1rem" }}>
            <strong>Add widget:</strong>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
              {registry.map((r) => (
                <button
                  key={r.type}
                  className="btn btn-sm btn-secondary"
                  type="button"
                  onClick={() => handleAddWidget(r.type)}
                  disabled={loading}
                >
                  {r.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}