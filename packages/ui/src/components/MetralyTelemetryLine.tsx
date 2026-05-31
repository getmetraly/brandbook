import * as React from "react";
import "../styles/metraly-telemetry-line.css";

/**
 * Horizontal line composed of repeating telemetry pulse markers.
 * Renders aria-hidden — use alongside a visible label in the host component.
 */
export interface MetralyTelemetryLineProps {
  /** Number of pulses to render. Defaults to 5. */
  pulses?: number;
  /** Semantic colour variant for the pulses. */
  variant?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
  /** Additional classes for the wrapper element. */
  className?: string;
}

export function MetralyTelemetryLine({
  pulses = 5,
  variant = "primary",
  className,
}: MetralyTelemetryLineProps) {
  const classes = [
    "metraly-telemetry-line",
    `is-${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} aria-hidden="true">
      {Array.from({ length: pulses }).map((_, idx) => (
        <span key={idx} className="metraly-telemetry-line__pulse" />
      ))}
    </span>
  );
}

export default MetralyTelemetryLine;
