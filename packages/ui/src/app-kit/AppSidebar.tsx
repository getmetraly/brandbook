import React from "react";
import { MetralyIcon, type MetralyIconName } from "../components/MetralyIcon";

export interface AppSidebarNavItem {
  id: string;
  icon?: MetralyIconName;
  label: string;
  href?: string;
  active?: boolean;
  variant?: "default" | "accent";
  badge?: "preview" | "gated";
  disabled?: boolean;
}

export interface AppSidebarNavSection {
  label: string;
  items: AppSidebarNavItem[];
}

export interface AppSidebarUser {
  initials: string;
  name: string;
  role: string;
}

export interface AppSidebarProps {
  logo?: React.ReactNode;
  brandName?: string;
  healthLabel?: string;
  sections?: AppSidebarNavSection[];
  user?: AppSidebarUser;
  footerAction?: React.ReactNode;
  activeId?: string;
  onNav?: (id: string) => void;
  className?: string;
  "aria-label"?: string;
}

function NavItem({
  item,
  activeId,
  onNav,
}: {
  item: AppSidebarNavItem;
  activeId: string | undefined;
  onNav: ((id: string) => void) | undefined;
}): React.ReactElement {
  const isActive = item.active || item.id === activeId;

  const classNames = [
    "metraly-app-sidebar__item",
    isActive ? "is-active" : "",
    item.variant === "accent" ? "is-accent" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      {item.icon && (
        <span className="metraly-app-sidebar__item__icon">
          <MetralyIcon name={item.icon} size={15} aria-hidden />
        </span>
      )}
      <span>{item.label}</span>
      {item.badge && (
        <span
          className={`metraly-app-sidebar__item-badge is-${item.badge}`}
        >
          {item.badge === "preview" ? "Preview" : "Gated"}
        </span>
      )}
    </>
  );

  if (item.href && !item.disabled) {
    return (
      <a
        href={item.href}
        className={classNames}
        aria-current={isActive ? "page" : undefined}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classNames}
      aria-current={isActive ? "page" : undefined}
      disabled={item.disabled}
      onClick={() => onNav?.(item.id)}
    >
      {inner}
    </button>
  );
}

export function AppSidebar({
  logo,
  brandName,
  healthLabel,
  sections = [],
  user,
  footerAction,
  activeId,
  onNav,
  className,
  "aria-label": ariaLabel,
}: AppSidebarProps): React.ReactElement {
  return (
    <aside
      className={["metraly-app-sidebar", className].filter(Boolean).join(" ")}
      aria-label={ariaLabel ?? "Primary navigation"}
    >
      <div className="metraly-app-sidebar__head">
        {(logo || brandName) && (
          <div className="metraly-app-sidebar__brand">
            {logo && (
              <div className="metraly-app-sidebar__brand-logo">{logo}</div>
            )}
            {brandName && (
              <span className="metraly-app-sidebar__brand-name">
                {brandName}
              </span>
            )}
          </div>
        )}
        {healthLabel && (
          <div className="metraly-app-sidebar__health">
            <span className="metraly-app-sidebar__health dot" />
            {healthLabel}
          </div>
        )}
      </div>

      <nav className="metraly-app-sidebar__nav">
        {sections.map((section) => (
          <div key={section.label} className="metraly-app-sidebar__section">
            <span className="metraly-app-sidebar__section-title">
              {section.label}
            </span>
            {section.items.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                activeId={activeId}
                onNav={onNav}
              />
            ))}
          </div>
        ))}
      </nav>

      {user && (
        <div className="metraly-app-sidebar__foot">
          <div className="metraly-app-avatar">{user.initials}</div>
          <div>
            <div className="metraly-app-sidebar__foot-name">{user.name}</div>
            <div className="metraly-app-sidebar__foot-role">{user.role}</div>
          </div>
          {footerAction && <div>{footerAction}</div>}
        </div>
      )}
    </aside>
  );
}

export default AppSidebar;
