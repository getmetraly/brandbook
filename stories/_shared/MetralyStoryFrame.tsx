import * as React from "react";
import { StatusBadge } from "../../packages/ui/src/components/StatusBadge";
import type { StatusBadgeStatus } from "../../packages/ui/src/components/StatusBadge";
import "./metraly-story-frame.css";

export interface MetralyStoryFrameProps {
  category: string;
  title: string;
  description?: string;
  status?: "Ready" | "Preview" | "Draft" | "Planned" | "Gated";
  tags?: string[];
  children: React.ReactNode;
  maxWidth?: number | string;
  previewVariant?: "default" | "padded" | "flush";
  className?: string;
  fullWidth?: boolean;
}

const STATUS_MAP: Record<NonNullable<MetralyStoryFrameProps["status"]>, StatusBadgeStatus> = {
  Ready: "Live",
  Preview: "Preview",
  Draft: "Draft",
  Planned: "Planned",
  Gated: "Gated",
};

export function MetralyStoryFrame({
  category,
  title,
  description,
  status,
  tags,
  children,
  maxWidth,
  previewVariant = "default",
  className,
  fullWidth = false,
}: MetralyStoryFrameProps) {
  const rootClasses = [
    "metraly-story-frame",
    fullWidth && "metraly-story-frame--full-width",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const previewClasses = [
    "metraly-story-frame__preview",
    previewVariant === "padded" && "metraly-story-frame__preview--padded",
    previewVariant === "flush" && "metraly-story-frame__preview--flush",
  ]
    .filter(Boolean)
    .join(" ");

  const rootStyle: React.CSSProperties | undefined =
    maxWidth !== undefined && !fullWidth
      ? { maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth }
      : undefined;

  return (
    <div className={rootClasses} style={rootStyle}>
      <div className="metraly-story-frame__head">
        <div className="metraly-story-frame__eyebrow">{category}</div>
        <div className="metraly-story-frame__title-row">
          <h2 className="metraly-story-frame__title">{title}</h2>
          {status ? <StatusBadge status={STATUS_MAP[status]} /> : null}
        </div>
        {description ? (
          <p className="metraly-story-frame__desc">{description}</p>
        ) : null}
        {tags && tags.length > 0 ? (
          <div className="metraly-story-frame__tags">
            {tags.map((tag) => (
              <span key={tag} className="metraly-story-frame__tag">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <div className={previewClasses}>{children}</div>
    </div>
  );
}

export interface MetralyStoryGridProps {
  children: React.ReactNode;
  columns?: 2 | 3;
  className?: string;
}

export function MetralyStoryGrid({
  children,
  columns,
  className,
}: MetralyStoryGridProps) {
  const classes = [
    "metraly-story-grid",
    columns === 2 && "metraly-story-grid--2",
    columns === 3 && "metraly-story-grid--3",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <div className={classes}>{children}</div>;
}

export interface MetralyStorySurfaceProps {
  children: React.ReactNode;
  className?: string;
  minHeight?: number | string;
}

export function MetralyStorySurface({
  children,
  className,
  minHeight,
}: MetralyStorySurfaceProps) {
  const style: React.CSSProperties | undefined =
    minHeight !== undefined
      ? { minHeight: typeof minHeight === "number" ? `${minHeight}px` : minHeight }
      : undefined;
  return (
    <div
      className={["metraly-story-surface", className].filter(Boolean).join(" ")}
      style={style}
    >
      {children}
    </div>
  );
}
