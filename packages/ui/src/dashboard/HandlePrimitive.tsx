import * as React from "react";

export type HandlePrimitiveKind = "drag" | "resize" | "move" | "drop";
export type HandlePrimitiveState = "idle" | "active" | "disabled";

export interface HandlePrimitiveProps extends React.HTMLAttributes<HTMLElement> {
  kind: HandlePrimitiveKind;
  "aria-label"?: string;
  "aria-hidden"?: boolean | "true" | "false";
  label: string;
  direction?: string;
  active?: boolean;
  disabled?: boolean;
  focusable?: boolean;
  as?: "span" | "button";
  children?: React.ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function defaultGlyph(kind: HandlePrimitiveKind) {
  if (kind === "drag") return <span className="metraly-handle-primitive__grip-dots metraly-widget-shell-grip-dots"><span /><span /><span /><span /><span /><span /></span>;
  if (kind === "drop") return <span className="metraly-handle-primitive__drop-line" />;
  return <span className="metraly-handle-primitive__mark" />;
}

export function HandlePrimitive({
  kind,
  label,
  direction,
  active = false,
  disabled = false,
  focusable = active,
  as = "span",
  children,
  className,
  ...rest
}: HandlePrimitiveProps) {
  const state: HandlePrimitiveState = disabled ? "disabled" : active ? "active" : "idle";
  const classes = cx(
    "metraly-handle-primitive",
    `metraly-handle-primitive--${kind}`,
    direction && `is-${direction}`,
    active && "is-active",
    disabled && "is-disabled",
    "metraly-focus-ring",
    className,
  );
  const content = children ?? defaultGlyph(kind);

  if (as === "button") {
    return (
      <button
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        type="button"
        className={classes}
        aria-label={label}
        disabled={disabled}
        data-kind={kind}
        data-direction={direction}
        data-state={state}
      >
        {content}
      </button>
    );
  }

  return (
    <span
      {...rest}
      className={classes}
      role={focusable ? rest.role ?? "button" : rest.role}
      aria-label={focusable ? label : rest["aria-label"]}
      aria-hidden={!focusable && !rest["aria-label"] ? true : rest["aria-hidden"]}
      tabIndex={focusable ? rest.tabIndex ?? 0 : rest.tabIndex}
      data-kind={kind}
      data-direction={direction}
      data-state={state}
    >
      {content}
    </span>
  );
}

export default HandlePrimitive;
