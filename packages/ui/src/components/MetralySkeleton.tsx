import * as React from "react";

export type MetralySkeletonVariant = "text" | "card" | "table" | "widget";

export interface MetralySkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: MetralySkeletonVariant;
  lines?: number;
  height?: string;
}

export function MetralySkeleton({
  variant = "text",
  lines = 3,
  height,
  className,
  ...rest
}: MetralySkeletonProps) {
  const classes = [
    "metraly-skeleton",
    `is-${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (variant === "text") {
    return (
      <div {...rest} className={classes} data-variant={variant}>
        {Array.from({ length: lines }).map((_, index) => (
          <span
            key={index}
            className="metraly-skeleton__line"
            style={height ? { height } : undefined}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      {...rest}
      className={classes}
      data-variant={variant}
      style={height ? { ...rest.style, height } : rest.style}
    >
      <span className="metraly-skeleton__block" />
    </div>
  );
}

export default MetralySkeleton;
