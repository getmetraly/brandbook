import * as React from "react";

export type MetralyPanelPadding = "none" | "sm" | "md" | "lg";

/**
 * A simple container that applies Metraly card styling. Use this component
 * to wrap content that should appear on a distinct surface with a border,
 * shadow and rounded corners.
 */
export interface MetralyPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content to render inside the panel. */
  children: React.ReactNode;
  /** Padding preset. Defaults to none so composed components can control spacing. */
  padding?: MetralyPanelPadding;
  /** Render a clearer focus ring when the panel itself is focusable. */
  focusable?: boolean;
  /** Additional class names to append to the panel container. */
  className?: string;
}

export function MetralyPanel({
  children,
  className,
  padding = "none",
  focusable = false,
  tabIndex,
  ...rest
}: MetralyPanelProps) {
  const classes = [
    "metraly-panel",
    padding !== "none" ? `metraly-panel--padding-${padding}` : null,
    focusable ? "metraly-focus-ring" : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div {...rest} className={classes} tabIndex={focusable ? tabIndex ?? 0 : tabIndex}>
      {children}
    </div>
  );
}

export default MetralyPanel;
