import * as React from "react";
import { CardShell } from "./CardShell";
import { MetralyIcon } from "./MetralyIcon";
import type { CardShellTone } from "./CardShell";
import type { MetralyIconName } from "./MetralyIcon";

export type SigningStatus = "verified" | "unverified" | "community";
export interface SigningBannerProps {
  status: SigningStatus;
  publisherName?: string;
  className?: string;
}

const CFG: Record<SigningStatus, { tone: CardShellTone; icon: MetralyIconName; text: string; detail: string | null }> = {
  verified: { tone: "cyan", icon: "checkCircle", text: "Verified by Metraly", detail: null },
  unverified: { tone: "warning", icon: "alertTri", text: "Not verified", detail: "Review permissions carefully" },
  community: { tone: "neutral", icon: "users", text: "Community plugin", detail: null },
};

export function SigningBanner({ status, publisherName, className }: SigningBannerProps) {
  const cfg = CFG[status];
  const title = publisherName ? `${cfg.text} · ${publisherName}` : cfg.text;
  return (
    <CardShell
      tone={cfg.tone}
      density="compact"
      className={className}
      leading={<MetralyIcon name={cfg.icon} size="sm" />}
      title={title}
      subtitle={cfg.detail ?? undefined}
    />
  );
}
export default SigningBanner;
