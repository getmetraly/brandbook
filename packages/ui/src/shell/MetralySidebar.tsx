import * as React from "react";

type SidebarContextValue = {
  collapsed: boolean;
};

const SidebarContext = React.createContext<SidebarContextValue>({ collapsed: false });

export interface MetralySidebarProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  children: React.ReactNode;
  collapsed?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  expandedWidth?: number | string;
  collapsedWidth?: number | string;
}

export interface MetralySidebarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  label?: React.ReactNode;
}

export interface MetralySidebarItemProps {
  active?: boolean;
  ariaLabel?: string;
  className?: string;
  collapsedLabel?: string;
  disabled?: boolean;
  href?: string;
  icon?: React.ReactNode;
  label: React.ReactNode;
  meta?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | React.MouseEventHandler<HTMLAnchorElement>;
  title?: string;
  variant?: "default" | "accent";
}

function toCssLength(value: number | string | undefined, fallback: string) {
  if (value === undefined) return fallback;
  return typeof value === "number" ? `${value}px` : value;
}

export function MetralySidebar({
  children,
  className,
  collapsed = false,
  header,
  footer,
  expandedWidth = 228,
  collapsedWidth = 64,
  style,
  ...rest
}: MetralySidebarProps) {
  const classes = [
    "metraly-sidebar",
    collapsed && "is-collapsed",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const sidebarStyle = {
    ...style,
    "--m-sidebar-expanded-width": toCssLength(expandedWidth, "228px"),
    "--m-sidebar-collapsed-width": toCssLength(collapsedWidth, "64px"),
  } as React.CSSProperties;

  return (
    <SidebarContext.Provider value={{ collapsed }}>
      <aside {...rest} className={classes} style={sidebarStyle}>
        {header ? <div className="metraly-sidebar__header">{header}</div> : null}
        <div className="metraly-sidebar__body">{children}</div>
        {footer ? <div className="metraly-sidebar__footer">{footer}</div> : null}
      </aside>
    </SidebarContext.Provider>
  );
}

export function MetralySidebarSection({
  children,
  className,
  label,
  ...rest
}: MetralySidebarSectionProps) {
  const { collapsed } = React.useContext(SidebarContext);
  const ariaLabel = typeof label === "string" ? label : undefined;
  const classes = ["metraly-sidebar-section", className].filter(Boolean).join(" ");

  return (
    <section {...rest} className={classes} aria-label={ariaLabel}>
      {label ? (
        <div className="metraly-sidebar-section__label" aria-hidden={collapsed}>
          {collapsed ? <span className="metraly-visually-hidden">{label}</span> : label}
        </div>
      ) : null}
      <div className="metraly-sidebar-section__items">{children}</div>
    </section>
  );
}

export function MetralySidebarItem({
  active = false,
  ariaLabel,
  className,
  collapsedLabel,
  disabled = false,
  href,
  icon,
  label,
  meta,
  onClick,
  title,
  variant = "default",
}: MetralySidebarItemProps) {
  const { collapsed } = React.useContext(SidebarContext);
  const classes = [
    "metraly-sidebar-item",
    active && "is-active",
    disabled && "is-disabled",
    variant === "accent" && "is-accent",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const textLabel = typeof label === "string" ? label : collapsedLabel;
  const resolvedAriaLabel = ariaLabel ?? (collapsed ? textLabel : undefined);
  const resolvedTitle = collapsed ? title ?? textLabel : title;

  const content = (
    <>
      {active ? <span className="metraly-sidebar-item__accent" aria-hidden="true" /> : null}
      {icon ? <span className="metraly-sidebar-item__icon" aria-hidden="true">{icon}</span> : null}
      <span className="metraly-sidebar-item__label">{label}</span>
      {meta !== undefined ? <span className="metraly-sidebar-item__meta">{meta}</span> : null}
    </>
  );

  if (href && !disabled) {
    return (
      <a
        href={href}
        className={classes}
        aria-current={active ? "page" : undefined}
        aria-label={resolvedAriaLabel}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined}
        title={resolvedTitle}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      aria-current={active ? "page" : undefined}
      aria-label={resolvedAriaLabel}
      onClick={disabled ? undefined : onClick as React.MouseEventHandler<HTMLButtonElement> | undefined}
      title={resolvedTitle}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

export default MetralySidebar;
