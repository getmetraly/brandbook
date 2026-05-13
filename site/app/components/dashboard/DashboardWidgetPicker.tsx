"use client";

import { useMemo, useState } from "react";
import { WidgetPickerCard, defaultDashboardWidgetRegistry, type DashboardWidgetDefinition } from "@metraly/ui";

export interface DashboardWidgetPickerProps {
  registry?: DashboardWidgetDefinition[];
  selectedType?: string;
  disabled?: boolean;
  onAdd: (type: string) => void;
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 14 14" width="12" height="12" fill="none" stroke="currentColor" aria-hidden="true">
      <circle cx="6" cy="6" r="3.5" strokeWidth="1.35" />
      <path d="M9 9 12 12" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}

export function DashboardWidgetPicker({
  registry = defaultDashboardWidgetRegistry,
  selectedType,
  disabled = false,
  onAdd,
}: DashboardWidgetPickerProps) {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return registry;
    return registry.filter((definition) => {
      const haystack = [
        definition.title,
        definition.description,
        definition.iconLabel,
        definition.stateLabel,
        definition.type,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [registry, search]);

  return (
    <section className="dashboard-widget-picker" aria-label="Widget picker">
      <div className="dashboard-widget-picker-head">
        <strong>Widget library</strong>
        <span>Pick a reusable telemetry surface.</span>
      </div>
      <label className="dashboard-widget-picker-search" aria-label="Filter widgets">
        <span aria-hidden="true">Search</span>
        <span className="dashboard-widget-picker-search-field">
          <SearchIcon />
          <input
            type="search"
            value={search}
            placeholder="Filter widgets…"
            onChange={(event) => setSearch(event.target.value)}
          />
        </span>
      </label>
      <div className="dashboard-widget-picker-list" role="listbox" aria-label="Available widgets">
        {filtered.map((definition) => (
          <WidgetPickerCard
            key={definition.type}
            title={definition.title}
            description={definition.description}
            iconLabel={definition.iconLabel ?? definition.type}
            state={definition.state ?? "live"}
            stateLabel={definition.stateLabel}
            selected={selectedType === definition.type}
            disabled={disabled}
            onSelect={() => onAdd(definition.type)}
          />
        ))}
      </div>
    </section>
  );
}

export default DashboardWidgetPicker;
