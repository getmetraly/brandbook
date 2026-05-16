/**
 * SettingsAuditRow — one row in an audit log strip
 * ------------------------------------------------------------------
 * Used under settings sections (provider connectors, plugins, etc.) to
 * show a compact recent-change log. Source-agnostic; caller supplies
 * structured rows. Timestamps and actor IDs render mono.
 */
import * as React from "react";
import "../styles/metraly-settings.css";

export type SettingsAuditAction =
  | "created"
  | "updated"
  | "deleted"
  | "rotated"
  | "tested"
  | "enabled"
  | "disabled"
  | "linked"
  | "unlinked";

export interface SettingsAuditRowProps {
  /** ISO timestamp. Rendered mono. */
  timestamp: string;
  /** Actor identifier, e.g. "alex.k" or "system". */
  actor: string;
  action: SettingsAuditAction;
  /** Subject of the action, e.g. "OpenAI provider · primary". */
  subject: string;
  /** Optional short detail. */
  detail?: string;
  /** Optional reference id (correlation id, change id). Rendered mono. */
  refId?: string;
  className?: string;
}

const ACTION_LABEL: Record<SettingsAuditAction, string> = {
  created: "Created",
  updated: "Updated",
  deleted: "Deleted",
  rotated: "Rotated",
  tested: "Tested",
  enabled: "Enabled",
  disabled: "Disabled",
  linked: "Linked",
  unlinked: "Unlinked",
};

function fmtTime(iso: string): string {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  } catch {
    return iso;
  }
}

export const SettingsAuditRow: React.FC<SettingsAuditRowProps> = ({
  timestamp,
  actor,
  action,
  subject,
  detail,
  refId,
  className,
}) => {
  return (
    <div className={["m-audit-row", className ?? ""].filter(Boolean).join(" ")}>
      <span className="m-audit-row__time">{fmtTime(timestamp)}</span>
      <span className="m-audit-row__actor">{actor}</span>
      <span className="m-audit-row__action">{ACTION_LABEL[action]}</span>
      <span className="m-audit-row__subject">{subject}</span>
      {detail ? <span className="m-audit-row__detail">{detail}</span> : null}
      {refId ? <span className="m-audit-row__ref">{refId}</span> : null}
    </div>
  );
};

SettingsAuditRow.displayName = "SettingsAuditRow";

export default SettingsAuditRow;
