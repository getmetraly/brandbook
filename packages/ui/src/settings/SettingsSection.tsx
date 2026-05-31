/**
 * SettingsSection — wrapper for a single settings area
 * ------------------------------------------------------------------
 * Title + optional description + child rows. Optional status badge in
 * the header (e.g. "Configured / Not configured / Gated").
 */
import * as React from "react";
import { CardShell } from "../components/CardShell";
import { StatusBadge } from "../components/StatusBadge";
import "../styles/metraly-settings.css";

export interface SettingsSectionProps {
  title: string;
  description?: string;
  /** Optional badge in the header — e.g. configuration state. */
  badge?: {
    status: React.ComponentProps<typeof StatusBadge>["status"];
    label: string;
  };
  /** Right-aligned header actions. */
  actions?: React.ReactNode;
  /** Wrap in CardShell. Defaults to true. */
  frame?: boolean;
  /** Compact header / row spacing. */
  compact?: boolean;
  /** Headline level for screen-readers. */
  headingLevel?: 2 | 3 | 4;
  children?: React.ReactNode;
  className?: string;
  id?: string;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  description,
  badge,
  actions,
  frame = true,
  compact = false,
  headingLevel = 3,
  children,
  className,
  id,
}) => {
  const reactId = React.useId();
  const rootId = id ?? reactId;
  const Heading = (`h${headingLevel}`) as keyof React.JSX.IntrinsicElements;

  const inner = (
    <section
      id={rootId}
      className={[
        "metraly-settings-section",
        compact ? "metraly-settings-section--compact" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby={`${rootId}-title`}
    >
      <header className="metraly-settings-section__head">
        <div className="metraly-settings-section__head-text">
          <Heading id={`${rootId}-title`} className="metraly-settings-section__title">
            {title}
          </Heading>
          {description ? (
            <p className="metraly-settings-section__desc">{description}</p>
          ) : null}
        </div>
        <div className="metraly-settings-section__head-aside">
          {badge ? <StatusBadge status={badge.status} label={badge.label} /> : null}
          {actions}
        </div>
      </header>

      {children ? <div className="metraly-settings-section__body">{children}</div> : null}
    </section>
  );

  return frame ? (
    <CardShell
      className={[
        "metraly-settings-section-card",
        compact ? "metraly-settings-section-card--compact" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      density={compact ? "compact" : "comfortable"}
    >
      {inner}
    </CardShell>
  ) : (
    inner
  );
};

SettingsSection.displayName = "SettingsSection";

export default SettingsSection;
