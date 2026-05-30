import * as React from "react";
import { MetralyDrawer } from "../shell/MetralyDrawer";
import { ReviewPanel } from "../wizard/ReviewPanel";
import { StickyWizardFooter } from "../wizard/StickyWizardFooter";
import { MetralyButton } from "./MetralyButton";
import { PermissionBadge } from "./PermissionBadge";
import { SigningBanner } from "./SigningBanner";
import type { Plugin } from "./PluginCatalog";
import type { PermissionLevel } from "./PermissionBadge";
import type { StateBadgeState } from "./StateBadge";
import type { ReviewPanelItem } from "../wizard/ReviewPanel";

export interface PluginPermission {
  scope: string;
  description: string;
  risk: "low" | "medium" | "high";
}

export interface PluginReviewDrawerProps {
  open: boolean;
  plugin: Plugin | null;
  permissions: PluginPermission[];
  onInstall: () => void;
  onClose: () => void;
}

function riskToLevel(risk: PluginPermission["risk"]): PermissionLevel {
  if (risk === "high") return "admin";
  if (risk === "medium") return "write";
  return "read-only";
}

function riskToBadge(risk: PluginPermission["risk"]): StateBadgeState {
  if (risk === "high") return "error";
  if (risk === "medium") return "warning";
  return "ok";
}

export function PluginReviewDrawer({ open, plugin, permissions, onInstall, onClose }: PluginReviewDrawerProps) {
  if (!plugin) return null;

  const maxRisk = permissions.reduce<PluginPermission["risk"]>((acc, p) => {
    if (acc === "high" || p.risk === "high") return "high";
    if (acc === "medium" || p.risk === "medium") return "medium";
    return "low";
  }, "low");

  const reviewItems: ReviewPanelItem[] = permissions.map((p) => ({
    id: p.scope,
    label: p.scope,
    value: p.description,
    badgeState: riskToBadge(p.risk),
  }));

  return (
    <MetralyDrawer
      open={open}
      onOpenChange={(o) => { if (!o) onClose(); }}
      title={plugin.name}
      side="right"
      width="min(440px, 100vw)"
    >
      <div className="metraly-plugin-review">
        <div className="metraly-plugin-review__head">
          <div className="metraly-plugin-review__category">
            {plugin.category}
          </div>
          <PermissionBadge level={riskToLevel(maxRisk)} />
        </div>
        <SigningBanner status="unverified" />
        <ReviewPanel title="Required permissions" items={reviewItems} />
        <StickyWizardFooter
          back={<MetralyButton variant="ghost" onClick={onClose}>Cancel</MetralyButton>}
          primary={<MetralyButton variant="primary" onClick={onInstall}>Install</MetralyButton>}
        />
      </div>
    </MetralyDrawer>
  );
}
export default PluginReviewDrawer;
