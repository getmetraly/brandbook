import React from "react";
import "./metraly-story-frame.css";

export interface MetralyStoryFrameProps {
  /** Top-level navigation group, e.g. "Core", "Shell", "AppKit" */
  category?: string;
  title: string;
  description?: string;
  /** "stable" | "wip" | "planned" — defaults to "stable" */
  status?: "stable" | "wip" | "planned";
  /** Freeform tags rendered as small pills, e.g. ["a11y", "interactive"] */
  tags?: string[];
  children: React.ReactNode;
  /** Expand to full canvas width (disables 960px max-width) */
  fullWidth?: boolean;
  /** Full-screen product preview: removes padding, fills 100vh, hides header */
  fullscreen?: boolean;
}

const STATUS_LABELS: Record<NonNullable<MetralyStoryFrameProps["status"]>, string> = {
  stable: "Stable",
  wip: "WIP",
  planned: "Planned",
};

export function MetralyStoryFrame({
  category,
  title,
  description,
  status = "stable",
  tags = [],
  children,
  fullWidth = false,
  fullscreen = false,
}: MetralyStoryFrameProps): React.ReactElement {
  const classes = [
    "msf",
    fullWidth && "msf--full-width",
    fullscreen && "msf--fullscreen",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {!fullscreen && (
        <div className="msf__header">
          {category && <div className="msf__category">{category}</div>}
          <h2 className="msf__title">{title}</h2>
          {description && <p className="msf__description">{description}</p>}
          <div className="msf__meta">
            <span className={`msf__status${status !== "stable" ? ` msf__status--${status}` : ""}`}>
              {STATUS_LABELS[status]}
            </span>
            {tags.map((tag) => (
              <span key={tag} className="msf__tag">{tag}</span>
            ))}
          </div>
        </div>
      )}
      <div className="msf__content">{children}</div>
    </div>
  );
}

/** Bounded product-preview frame with border + background. */
export function ProductPreview({ children }: { children: React.ReactNode }): React.ReactElement {
  return <div className="msf__product-preview">{children}</div>;
}
