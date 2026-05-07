import * as React from "react";

/**
 * A simple container that applies Metraly card styling. Use this component
 * to wrap content that should appear on a distinct surface with a border,
 * shadow and rounded corners.
 */
export interface MetralyPanelProps {
  /** Content to render inside the panel. */
  children: React.ReactNode;
  /** Additional class names to append to the panel container. */
  className?: string;
}

export function MetralyPanel({ children, className }: MetralyPanelProps) {
  return (
    <div className={["metraly-panel", className].filter(Boolean).join(" ")}>{children}</div>
  );
}

export default MetralyPanel;
