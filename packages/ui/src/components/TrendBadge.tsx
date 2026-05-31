import * as React from "react";

export type TrendBadgeDirection = "up" | "down" | "flat";
export type TrendBadgeSentiment = "positive" | "negative" | "neutral";
export type TrendBadgeSize = "sm" | "md";

export interface TrendBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  direction: TrendBadgeDirection;
  sentiment: TrendBadgeSentiment;
  value?: string;
  size?: TrendBadgeSize;
  label?: string;
}

const directionGlyph: Record<TrendBadgeDirection, string> = {
  up: "▲",
  down: "▼",
  flat: "•",
};

function defaultLabel(direction: TrendBadgeDirection, value?: string) {
  if (value) return `${direction} ${value}`;
  if (direction === "flat") return "flat";
  return direction;
}

export function TrendBadge({
  direction,
  sentiment,
  value,
  size = "md",
  label,
  className,
  ...rest
}: TrendBadgeProps) {
  const classes = [
    "metraly-trend-badge",
    `is-${direction}`,
    `is-${sentiment}`,
    size !== "md" ? `metraly-trend-badge--${size}` : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const hasValue = typeof value === "string" && value.length > 0;
  const accessibleLabel = rest["aria-label"] ?? label ?? defaultLabel(direction, value);

  return (
    <span
      {...rest}
      className={classes}
      data-direction={direction}
      data-sentiment={sentiment}
      data-size={size}
      role={hasValue ? rest.role : rest.role ?? "img"}
      aria-label={hasValue ? rest["aria-label"] ?? label : accessibleLabel}
    >
      <span className="metraly-trend-badge__glyph" aria-hidden="true">{directionGlyph[direction]}</span>
      {hasValue ? <span className="metraly-trend-badge__value">{value}</span> : null}
    </span>
  );
}

export default TrendBadge;
