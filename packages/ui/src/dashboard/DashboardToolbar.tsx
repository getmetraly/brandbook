import * as React from "react";
import { MetralyTabs, type MetralyTabItem } from "../components/MetralyTabs";
import { StateBadge, type StateBadgeState } from "../components/StateBadge";

export interface DashboardToolbarProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  meta?: React.ReactNode;
  tabs?: MetralyTabItem[];
  activeTab?: string;
  onTabChange?: (value: string) => void;
  searchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  syncState?: StateBadgeState;
  syncLabel?: string;
  editMode?: boolean;
  onToggleEdit?: () => void;
  onAddWidget?: () => void;
  addWidgetLabel?: string;
  className?: string;
}

export function DashboardToolbar({
  title = "Dashboard editor",
  description = "Create, arrange and persist telemetry widgets.",
  actions,
  meta,
  tabs,
  activeTab,
  onTabChange,
  searchValue,
  searchPlaceholder = "Search widgets",
  onSearchChange,
  syncState,
  syncLabel,
  editMode,
  onToggleEdit,
  onAddWidget,
  addWidgetLabel = "Add widget",
  className,
}: DashboardToolbarProps) {
  const classes = ["metraly-dashboard-toolbar", className].filter(Boolean).join(" ");
  const hasControls = Boolean(tabs?.length || searchValue !== undefined || onSearchChange || syncState);
  const hasActions = Boolean(actions || onToggleEdit || onAddWidget);

  return (
    <header className={classes}>
      <div className="metraly-dashboard-toolbar-copy">
        <strong>{title}</strong>
        <span>{description}</span>
        {meta ? <div className="metraly-dashboard-toolbar-meta">{meta}</div> : null}
      </div>
      {hasControls ? (
        <div className="metraly-dashboard-toolbar-controls">
          {tabs?.length ? (
            <MetralyTabs
              className="metraly-dashboard-toolbar-tabs"
              ariaLabel="Dashboard sections"
              items={tabs}
              value={activeTab}
              onValueChange={onTabChange}
            />
          ) : null}
          {searchValue !== undefined || onSearchChange ? (
            <label className="metraly-dashboard-toolbar-search">
              <span>Search dashboard widgets</span>
              <input
                type="search"
                value={searchValue ?? ""}
                readOnly={!onSearchChange}
                placeholder={searchPlaceholder}
                onChange={onSearchChange ? (event) => onSearchChange(event.target.value) : undefined}
              />
            </label>
          ) : null}
          {syncState ? (
            <StateBadge
              state={syncState}
              label={syncLabel ?? (syncState === "live" ? "Live sync" : undefined)}
              className="metraly-dashboard-toolbar-sync"
            />
          ) : null}
        </div>
      ) : null}
      {hasActions ? (
        <div className="metraly-dashboard-toolbar-actions">
          {onToggleEdit ? (
            <button
              type="button"
              className={editMode ? "metraly-dashboard-toolbar-button is-active metraly-focus-ring" : "metraly-dashboard-toolbar-button metraly-focus-ring"}
              aria-pressed={editMode}
              onClick={onToggleEdit}
            >
              {editMode ? "Edit mode on" : "Edit mode"}
            </button>
          ) : null}
          {onAddWidget ? (
            <button
              type="button"
              className="metraly-dashboard-toolbar-button is-primary metraly-focus-ring"
              onClick={onAddWidget}
            >
              {addWidgetLabel}
            </button>
          ) : null}
          {actions}
        </div>
      ) : null}
    </header>
  );
}

export default DashboardToolbar;
