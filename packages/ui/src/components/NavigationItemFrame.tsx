import * as React from "react";

export type NavigationItemFrameAs = "button" | "a" | "span";
export type NavigationItemFrameTone = "default" | "primary" | "secondary" | "success" | "warning" | "error" | "info";

export interface NavigationItemFrameProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  as?: NavigationItemFrameAs;
  href?: string;
  active?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  label: React.ReactNode;
  meta?: React.ReactNode;
  marker?: React.ReactNode;
  tone?: NavigationItemFrameTone;
  accent?: boolean;
  children?: React.ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function content({ active, icon, label, meta, marker, children }: NavigationItemFrameProps) {
  return (
    <>
      {active ? <span className="metraly-navigation-item-frame__accent" aria-hidden="true" /> : null}
      {marker !== undefined ? <span className="metraly-navigation-item-frame__marker" aria-hidden="true">{marker}</span> : null}
      {icon ? <span className="metraly-navigation-item-frame__icon" aria-hidden="true">{icon}</span> : null}
      <span className="metraly-navigation-item-frame__label">{label}</span>
      {meta !== undefined ? <span className="metraly-navigation-item-frame__meta">{meta}</span> : null}
      {children}
    </>
  );
}

export function NavigationItemFrame({
  as = "button",
  href,
  active = false,
  disabled = false,
  icon,
  label,
  meta,
  marker,
  tone = "default",
  accent = false,
  className,
  children,
  ...rest
}: NavigationItemFrameProps) {
  const classes = cx(
    "metraly-navigation-item-frame",
    active && "is-active",
    disabled && "is-disabled",
    accent && "is-accent",
    className,
  );
  const shared = {
    ...rest,
    className: classes,
    "data-tone": tone,
    "data-state": disabled ? "disabled" : active ? "selected" : "default",
  } as React.HTMLAttributes<HTMLElement> & { "data-tone": string; "data-state": string };

  if (as === "a" && href && !disabled) {
    return (
      <a {...(shared as React.AnchorHTMLAttributes<HTMLAnchorElement>)} href={href}>
        {content({ active, icon, label, meta, marker, children })}
      </a>
    );
  }

  if (as === "span") {
    return (
      <span {...(shared as React.HTMLAttributes<HTMLSpanElement>)}>
        {content({ active, icon, label, meta, marker, children })}
      </span>
    );
  }

  return (
    <button {...(shared as React.ButtonHTMLAttributes<HTMLButtonElement>)} type="button" disabled={disabled}>
      {content({ active, icon, label, meta, marker, children })}
    </button>
  );
}

export default NavigationItemFrame;
