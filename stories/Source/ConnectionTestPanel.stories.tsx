import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ConnectionTestPanel } from "../../packages/ui/src/source/ConnectionTestPanel";

const meta: Meta<typeof ConnectionTestPanel> = {
  title: "Source/ConnectionTestPanel",
  component: ConnectionTestPanel,
  decorators: [
    (Story) => React.createElement("div", { style: { maxWidth: 680 } }, React.createElement(Story)),
  ],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof ConnectionTestPanel>;

const READY_CHECKS = [
  { id: "auth",    label: "Authentication",          result: "ok" as const },
  { id: "scopes",  label: "Required scopes present", result: "ok" as const },
  { id: "rate",    label: "Rate-limit window",       result: "ok" as const, detail: "4,920 / 5,000 remaining" },
  { id: "egress",  label: "Egress allowlist",        result: "ok" as const },
];

export const NotTested: Story = {
  args: { status: "not_tested", onRetry: () => {} },
};

export const Testing: Story = {
  args: { status: "testing" },
};

export const Ready: Story = {
  args: {
    status: "ready",
    lastTestedAt: "2026-05-15T10:42:00Z",
    latencyMs: 218,
    checks: READY_CHECKS,
    onRetry: () => {},
  },
};

export const AuthFailed: Story = {
  args: {
    status: "auth_failed",
    lastTestedAt: "2026-05-15T10:42:00Z",
    onRetry: () => {},
    checks: [
      { id: "auth",   label: "Authentication", result: "fail", detail: "401 Unauthorized" },
      { id: "scopes", label: "Required scopes present", result: "skip" },
    ],
  },
};

export const PermissionDenied: Story = {
  args: {
    status: "permission_denied",
    lastTestedAt: "2026-05-15T10:42:00Z",
    onRetry: () => {},
    checks: [
      { id: "auth",   label: "Authentication", result: "ok" },
      { id: "scopes", label: "Required scopes present", result: "fail", detail: "Missing: read:org, workflow" },
    ],
  },
};

export const RateLimited: Story = {
  args: {
    status: "rate_limited",
    lastTestedAt: "2026-05-15T10:42:00Z",
    onRetry: () => {},
  },
};

export const SourceUnavailable: Story = {
  args: {
    status: "source_unavailable",
    lastTestedAt: "2026-05-15T10:42:00Z",
    onRetry: () => {},
    nextStep: "Verify the host is reachable from this workspace's egress IPs.",
  },
};

export const Degraded: Story = {
  args: {
    status: "degraded",
    lastTestedAt: "2026-05-15T10:42:00Z",
    latencyMs: 1840,
    onRetry: () => {},
    checks: [
      { id: "auth",     label: "Authentication",           result: "ok" },
      { id: "scopes",   label: "Required scopes present",  result: "ok" },
      { id: "rate",     label: "Rate-limit window",        result: "ok" },
      { id: "webhooks", label: "Webhook reachability",     result: "fail", detail: "outbound 443 closed" },
      { id: "history",  label: "Historical events",        result: "fail", detail: "Only last 30 days available on this plan" },
    ],
  },
};
