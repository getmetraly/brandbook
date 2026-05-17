import React from "react";
import { MetralyTopbar } from "../shell/MetralyTopbar";
import { MetralyIcon } from "../components/MetralyIcon";

export interface AppTopbarProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  searchPlaceholder?: string;
  notifCount?: number;
  onSearchChange?: (value: string) => void;
  onRefresh?: () => void;
  actions?: React.ReactNode;
  className?: string;
}

export function AppTopbar({
  title,
  subtitle,
  searchPlaceholder,
  notifCount,
  onSearchChange,
  onRefresh,
  actions,
  className,
}: AppTopbarProps): React.ReactElement {
  const actionContent = (
    <>
      {searchPlaceholder && (
        <div className="metraly-app-topbar__search">
          <span className="metraly-app-topbar__search-icon">
            <MetralyIcon name="search" size={16} aria-hidden />
          </span>
          <input
            type="search"
            className="metraly-app-topbar__search-input"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearchChange?.(e.currentTarget.value)}
            aria-label={searchPlaceholder}
          />
        </div>
      )}

      {notifCount !== undefined && (
        <button
          type="button"
          className="metraly-app-icon-btn metraly-app-topbar__bell"
          aria-label="Notifications"
        >
          <MetralyIcon name="bell" size={16} aria-hidden />
          {notifCount > 0 && (
            <span className="metraly-app-topbar__notif-badge">
              {notifCount}
            </span>
          )}
        </button>
      )}

      {onRefresh && (
        <button
          type="button"
          className="metraly-app-icon-btn"
          aria-label="Refresh data"
          onClick={onRefresh}
        >
          <MetralyIcon name="refresh" size={16} aria-hidden />
        </button>
      )}

      {actions}
    </>
  );

  return (
    <MetralyTopbar
      title={title}
      subtitle={subtitle}
      density="compact"
      className={className}
      actions={actionContent}
    />
  );
}

export default AppTopbar;
