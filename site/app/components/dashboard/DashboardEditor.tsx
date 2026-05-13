"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DashboardToolbar,
  type DashboardLayoutItem,
} from "@metraly/ui";
import DashboardCanvas from "./DashboardCanvas";
import DashboardWidgetPicker from "./DashboardWidgetPicker";
import { dashboardRepository, type Dashboard } from "../../lib/dashboard";

function getDashboardIdFromUrl(): string | null {
  const url = new URL(window.location.href);
  return url.searchParams.get("dashboard");
}

function setDashboardIdInUrl(id: string) {
  const url = new URL(window.location.href);
  url.searchParams.set("dashboard", id);
  window.history.replaceState(null, "", url.toString());
}

export function DashboardEditor() {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const [pickerOpen, setPickerOpen] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [activeTab, setActiveTab] = useState("delivery");
  const [status, setStatus] = useState("Not saved yet");
  const [error, setError] = useState<string | null>(null);

  const selectedType = useMemo(() => {
    return dashboard?.widgets.find((widget) => widget.id === selectedWidgetId)?.type;
  }, [dashboard, selectedWidgetId]);

  useEffect(() => {
    let alive = true;

    async function init() {
      setLoading(true);
      setError(null);
      try {
        const existingId = getDashboardIdFromUrl();
        const existing = existingId ? await dashboardRepository.fetch(existingId) : undefined;
        const next = existing ?? await dashboardRepository.create({ name: "Metraly board" });
        setDashboardIdInUrl(next.id);
        if (alive) {
          setDashboard(next);
          setStatus(existing ? "Loaded from local persistence" : "Created new dashboard");
        }
      } catch (err) {
        if (alive) setError(err instanceof Error ? err.message : "Failed to load dashboard");
      } finally {
        if (alive) setLoading(false);
      }
    }

    init();
    return () => {
      alive = false;
    };
  }, []);

  async function handleAddWidget(type: string) {
    if (!dashboard) return;
    const widget = dashboardRepository.createWidget(type, {
      position: {
        x: 0,
        y: dashboard.widgets.length * 2,
      },
    });

    const result = await dashboardRepository.upsertWidget(dashboard, widget);
    setDashboard(result.dashboard);
    setSelectedWidgetId(widget.id);
    setStatus(result.persisted ? "Widget added and saved" : "Widget added locally");
  }

  async function handleRemoveWidget(id: string) {
    if (!dashboard) return;
    const result = await dashboardRepository.removeWidget(dashboard, id);
    setDashboard(result.dashboard);
    setSelectedWidgetId((current) => (current === id ? null : current));
    setStatus(result.persisted ? "Widget removed and saved" : "Widget removed locally");
  }

  async function handleLayoutChange(layout: DashboardLayoutItem[]) {
    if (!dashboard) return;
    const result = await dashboardRepository.updateLayout(dashboard, layout);
    setDashboard(result.dashboard);
    setStatus(result.persisted ? "Layout saved" : "Layout updated locally");
  }

  async function handleSave() {
    if (!dashboard) return;
    setSaving(true);
    try {
      const result = await dashboardRepository.save(dashboard);
      setDashboard(result.dashboard);
      setStatus(result.persisted ? "Saved" : "Saved in memory only");
    } finally {
      setSaving(false);
    }
  }

  async function handleReset() {
    const next = await dashboardRepository.create({ name: "Metraly board" });
    setDashboardIdInUrl(next.id);
    setDashboard(next);
    setSelectedWidgetId(null);
    setStatus("Created new dashboard");
  }

  return (
    <div className="dashboard-editor-panel panel">
      <div className="dashboard-editor-topbar">
        <div className="dashboard-editor-topbar-copy">
          <strong>Dashboard editor</strong>
          <span>Create, arrange, resize and persist telemetry widgets.</span>
          <span className="dashboard-editor-topbar-status">
            {dashboard ? `Dashboard ${dashboard.id} · ${dashboard.widgets.length} widgets · ${status}` : status}
          </span>
        </div>
        <div className="dashboard-editor-topbar-actions">
          <button className="metraly-dashboard-toolbar-button" type="button" onClick={handleReset} disabled={loading || saving}>
            Reset
          </button>
          <button className="metraly-dashboard-toolbar-button is-primary" type="button" onClick={handleSave} disabled={loading || saving || !dashboard}>
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      <DashboardToolbar
        tabs={[
          { value: "delivery", label: "Delivery", count: 11 },
          { value: "dora", label: "DORA", count: 4 },
          { value: "flow", label: "Flow", count: 6 },
          { value: "reviews", label: "Reviews", count: 5 },
          { value: "ci", label: "CI", count: 3 },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        syncState={error ? "disconnected" : saving ? "stale" : "live"}
        syncLabel={error ? "Disconnected" : saving ? "Saving" : "Live sync"}
        editMode={editMode}
        onToggleEdit={() => setEditMode((current) => !current)}
        onAddWidget={() => setPickerOpen((current) => !current)}
        addWidgetLabel={pickerOpen ? "Hide library" : "Add widget"}
      />

      <div className="dashboard-editor-banner" data-state={editMode ? "edit" : "view"}>
        <span className="dashboard-editor-banner-marker" aria-hidden="true" />
        <span>Edit mode</span>
        <span>Drag widgets with grip dots, resize from the corner handles and persist changes with Save.</span>
      </div>

      {loading ? <p className="dashboard-editor-status">Loading dashboard…</p> : null}
      {error ? <p className="dashboard-editor-error">{error}</p> : null}

      {dashboard ? (
        <div className={pickerOpen ? "dashboard-editor-layout" : "dashboard-editor-layout dashboard-editor-layout--board-only"}>
          {pickerOpen ? (
            <DashboardWidgetPicker
              selectedType={selectedType}
              disabled={loading || saving}
              onAdd={handleAddWidget}
            />
          ) : null}
          <DashboardCanvas
            widgets={dashboard.widgets}
            selectedWidgetId={selectedWidgetId}
            onSelectWidget={setSelectedWidgetId}
            onRemoveWidget={handleRemoveWidget}
            onLayoutChange={handleLayoutChange}
          />
        </div>
      ) : null}
    </div>
  );
}

export default DashboardEditor;
