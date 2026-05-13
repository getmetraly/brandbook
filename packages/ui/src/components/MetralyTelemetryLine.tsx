import * as React from "react";

/**
 * Render a horizontal line composed of repeating telemetry pulse markers.
 */
export interface MetralyTelemetryLineProps {
  /** Number of pulses to render. Defaults to 5. */
  pulses?: number;
  /** Semantic colour variant for the pulses. */
  variant?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
  /** Additional classes for the wrapper element. */
  className?: string;
}

const pulseColors: Record<NonNullable<MetralyTelemetryLineProps["variant"]>, string> = {
  primary: "var(--m-cyan-500)",
  secondary: "var(--m-purple-500)",
  success: "var(--m-ok)",
  warning: "var(--m-warn)",
  error: "var(--m-err)",
  info: "var(--m-fg-2)",
};

const pulseClipPath =
  "polygon(0 52%, 20% 52%, 26% 25%, 36% 82%, 47% 8%, 58% 52%, 100% 52%, 100% 66%, 52% 66%, 47% 48%, 37% 100%, 27% 55%, 23% 66%, 0 66%)";

export function MetralyTelemetryLine({
  pulses = 5,
  variant = "primary",
  className,
}: MetralyTelemetryLineProps) {
  const color = pulseColors[variant];

  return (
    <div
      className={["inline-flex items-center gap-[2px]", className]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      {Array.from({ length: pulses }).map((_, idx) => (
        <span
          key={idx}
          className="block"
          style={{
            width: "28px",
            height: "12px",
            backgroundColor: color,
            clipPath: pulseClipPath,
          }}
        />
      ))}
    </div>
  );
}

export default MetralyTelemetryLine;
