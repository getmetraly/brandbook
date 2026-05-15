import * as React from "react";

export type PulseMarkerVariant = "dot" | "wave";
export type PulseMarkerTone = "live" | "new" | "info" | "warning" | "error";
export type PulseMarkerSize = "sm" | "md";

export interface PulseMarkerProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: PulseMarkerVariant;
  tone?: PulseMarkerTone;
  size?: PulseMarkerSize;
  pulse?: boolean;
  ariaLabel?: string;
}

export function PulseMarker({
  variant = "dot",
  tone = "live",
  size = "md",
  pulse = true,
  ariaLabel,
  className,
  ...rest
}: PulseMarkerProps) {
  const classes = [
    "metraly-pulse-marker",
    `is-${variant}`,
    `is-${tone}`,
    `is-${size}`,
    pulse ? "is-pulsing" : "is-static",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      {...rest}
      className={classes}
      data-variant={variant}
      data-tone={tone}
      data-size={size}
      data-pulse={pulse ? "on" : "off"}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      role={ariaLabel ? "status" : undefined}
    />
  );
}

export default PulseMarker;
