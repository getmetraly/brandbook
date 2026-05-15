import * as React from "react";
import { StateBadge } from "./StateBadge";
import type { StateBadgeSize } from "./StateBadge";

export type PermissionLevel = "read-only" | "write" | "admin";
export interface PermissionBadgeProps {
  level: PermissionLevel;
  size?: StateBadgeSize;
  className?: string;
}

const LEVEL_STATE: Record<PermissionLevel, "ok" | "warning" | "error"> = {
  "read-only": "ok",
  write: "warning",
  admin: "error",
};
const LEVEL_LABEL: Record<PermissionLevel, string> = {
  "read-only": "Read only",
  write: "Write",
  admin: "Admin",
};

export function PermissionBadge({ level, size = "md", className }: PermissionBadgeProps) {
  return <StateBadge state={LEVEL_STATE[level]} label={LEVEL_LABEL[level]} size={size} className={className} />;
}
export default PermissionBadge;
