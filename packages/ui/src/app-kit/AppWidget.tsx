import React from "react";

// ─── AppWidget ───────────────────────────────────────────────────────────────

export type AppWidgetHealth = "live" | "stale" | "error" | "none";

export interface AppWidgetProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  health?: AppWidgetHealth;
  healthLabel?: string;
  selected?: boolean;
  span?: 3 | 4 | 6 | 8 | 12;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const DEFAULT_HEALTH_LABELS: Record<Exclude<AppWidgetHealth, "none">, string> =
  {
    live: "Live",
    stale: "Stale",
    error: "Error",
  };

export function AppWidget({
  title,
  subtitle,
  health = "none",
  healthLabel,
  selected = false,
  span,
  footer,
  children,
  className,
}: AppWidgetProps): React.ReactElement {
  const rootClasses = [
    "metraly-app-widget",
    selected ? "is-selected" : "",
    health === "stale" ? "is-stale" : "",
    health === "error" ? "is-error" : "",
    span != null ? `span-${span}` : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={rootClasses}>
      <div className="metraly-app-widget__head">
        <div>
          <div className="metraly-app-widget__title">{title}</div>
          {subtitle !== undefined && (
            <div className="metraly-app-widget__sub">{subtitle}</div>
          )}
        </div>
        {health !== "none" && (
          <div
            className={[
              "metraly-app-widget__health",
              health !== "live" ? "is-static" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <span className="dot" />
            {healthLabel ??
              DEFAULT_HEALTH_LABELS[health as Exclude<AppWidgetHealth, "none">]}
          </div>
        )}
      </div>

      <div className="metraly-app-widget__body">{children}</div>

      {footer !== undefined && (
        <div className="metraly-app-widget__foot">{footer}</div>
      )}
    </article>
  );
}

// ─── AppSparkline ─────────────────────────────────────────────────────────────

export interface AppSparklineProps {
  data: number[];
  secondary?: number[];
  height?: number;
}

const W = 200;

function buildPath(points: number[], h: number): { line: string; fill: string } {
  if (points.length < 2) {
    return { line: "", fill: "" };
  }

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min === 0 ? 1 : max - min;

  const xs = points.map((_, i) => (i / (points.length - 1)) * W);
  const ys = points.map((v) => h - ((v - min) / range) * h);

  const lineD = xs
    .map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${ys[i].toFixed(2)}`)
    .join(" ");

  const fillD =
    lineD +
    ` L${W.toFixed(2)},${h.toFixed(2)} L0,${h.toFixed(2)} Z`;

  return { line: lineD, fill: fillD };
}

export function AppSparkline({
  data,
  secondary,
  height = 44,
}: AppSparklineProps): React.ReactElement {
  const primary = buildPath(data, height);
  const sec = secondary && secondary.length >= 2 ? buildPath(secondary, height) : null;

  return (
    <div className="metraly-app-sparkline">
      <svg
        viewBox={`0 0 ${W} ${height}`}
        preserveAspectRatio="none"
        width="100%"
        height={height}
      >
        {primary.fill && <path className="fill" d={primary.fill} />}
        {primary.line && <path className="line" d={primary.line} />}
        {sec && sec.line && (
          <path className="line is-secondary" d={sec.line} />
        )}
      </svg>
    </div>
  );
}

// ─── AppMetric ────────────────────────────────────────────────────────────────

export interface AppMetricProps {
  value: React.ReactNode;
  size?: "default" | "lg";
  className?: string;
}

export function AppMetric({
  value,
  size = "default",
  className,
}: AppMetricProps): React.ReactElement {
  const cls = [
    "metraly-app-metric",
    size === "lg" ? "metraly-app-metric--lg" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={cls}>{value}</div>;
}

// ─── AppMetricDelta ───────────────────────────────────────────────────────────

export interface AppMetricDeltaProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "flat";
  className?: string;
}

export function AppMetricDelta({
  children,
  direction = "flat",
  className,
}: AppMetricDeltaProps): React.ReactElement {
  const cls = [
    "metraly-app-metric-delta",
    `is-${direction}`,
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={cls}>{children}</div>;
}
