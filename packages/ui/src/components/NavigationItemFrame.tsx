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

const elementContent = (props: NavigationItemFrameProps) => (
  <>
    {props.active ? <span className="metraly-navigation-item-frame__accent" aria-hidden="true" /> : null}
    {props.marker !== undefined ? <span className="metraly-navigation-item-frame__marker" aria-hidden="true">{props.marker}</span> : null}
    {props.icon ? <span className="metraly-navigation-item-frame__icon" aria-hidden="true">{props.icon}</span> : null}
    <span className="metraly-navigation-item-frame__label">{props.label}</span>
    {props.children}
  </>
);

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

  const props: NavigationItemFrameProps = { as, href, active, disabled, icon, label, meta, marker, tone, accent, className, children };

  const renderElement = () => {
    if (as === "a" && href && !disabled) {
      return <a {...(shared as React.AnchorHTMLAttributes<HTMLAnchorElement>)} href={href}>{elementContent(props)}</a>;
    }
    if (as === "span") {
      return <span {...(shared as React.HTMLAttributes<HTMLSpanElement>)}>{elementContent(props)}</span>;
    }
    return <button {...(shared as React.ButtonHTMLAttributes<HTMLButtonElement>)} type="button" disabled={disabled}>{elementContent(props)}</button>;
  };

  if (meta !== undefined) {
    return (
      <div className="metraly-navigation-item-frame-row">
        {renderElement()}
        <span className="metraly-navigation-item-frame__meta">{meta}</span>
      </div>
    );
  }

  return renderElement();
}

export default NavigationItemFrame;
