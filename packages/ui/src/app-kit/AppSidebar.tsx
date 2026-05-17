import React from "react";
import {
  MetralySidebar,
  MetralySidebarSection,
  MetralySidebarItem,
} from "../shell/MetralySidebar";
import { MetralyIcon, type MetralyIconName } from "../components/MetralyIcon";

export interface AppSidebarNavItem {
  id: string;
  icon?: MetralyIconName;
  label: string;
  href?: string;
  /** Marks this item active regardless of activeId */
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
  /** Controlled active item by id */
  activeId?: string;
  onNav?: (id: string) => void;
  className?: string;
  "aria-label"?: string;
}

// ---- Sub-elements rendered into MetralySidebar slots ----

function SidebarBrand({
  logo,
  brandName,
  healthLabel,
}: Pick<AppSidebarProps, "logo" | "brandName" | "healthLabel">) {
  if (!logo && !brandName && !healthLabel) return null;
  return (
    <div className="metraly-app-sidebar__head">
      {(logo || brandName) && (
        <div className="metraly-app-sidebar__brand">
          {logo && (
            <div className="metraly-app-sidebar__brand-logo">{logo}</div>
          )}
          {brandName && (
            <span className="metraly-app-sidebar__brand-name">{brandName}</span>
          )}
        </div>
      )}
      {healthLabel && (
        <div className="metraly-app-sidebar__health">
          <span className="dot" />
          {healthLabel}
        </div>
      )}
    </div>
  );
}

function SidebarUserFooter({
  user,
  footerAction,
}: { user: AppSidebarUser; footerAction?: React.ReactNode }) {
  return (
    <div className="metraly-app-sidebar__foot-inner">
      <div className="metraly-app-avatar">{user.initials}</div>
      <div>
        <div className="metraly-app-sidebar__foot-name">{user.name}</div>
        <div className="metraly-app-sidebar__foot-role">{user.role}</div>
      </div>
      {footerAction != null && <div>{footerAction}</div>}
    </div>
  );
}

// ---- AppSidebar ----

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
    <MetralySidebar
      className={className}
      header={
        <SidebarBrand
          logo={logo}
          brandName={brandName}
          healthLabel={healthLabel}
        />
      }
      footer={
        user ? (
          <SidebarUserFooter user={user} footerAction={footerAction} />
        ) : null
      }
      aria-label={ariaLabel ?? "Primary navigation"}
    >
      {sections.map((section) => (
        <MetralySidebarSection key={section.label} label={section.label}>
          {section.items.map((item) => {
            const isActive = item.active === true || item.id === activeId;

            const badge =
              item.badge != null ? (
                <span
                  className={`metraly-app-sidebar__item-badge is-${item.badge}`}
                >
                  {item.badge === "preview" ? "Preview" : "Gated"}
                </span>
              ) : null;

            return (
              <MetralySidebarItem
                key={item.id}
                label={item.label}
                icon={
                  item.icon != null ? (
                    <MetralyIcon name={item.icon} size={15} aria-hidden />
                  ) : undefined
                }
                active={isActive}
                disabled={item.disabled}
                href={item.href}
                variant={item.variant}
                meta={badge}
                onClick={
                  item.href == null && item.disabled !== true
                    ? () => onNav?.(item.id)
                    : undefined
                }
              />
            );
          })}
        </MetralySidebarSection>
      ))}
    </MetralySidebar>
  );
}

export default AppSidebar;
