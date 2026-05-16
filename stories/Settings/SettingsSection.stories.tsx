import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { SettingsSection } from "../../packages/ui/src/settings/SettingsSection";
import { SettingsAuditRow } from "../../packages/ui/src/settings/SettingsAuditRow";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta<typeof SettingsSection> = {
  title: "Settings/SettingsSection",
  component: SettingsSection,
  decorators: [
    (Story) => React.createElement("div", { style: { maxWidth: 700 } }, React.createElement(Story)),
  ],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof SettingsSection>;

export const Basic: Story = {
  args: {
    title: "Workspace",
    description: "Name, region, and slug for this Metraly workspace.",
    children: (
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
        <li style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 12, alignItems: "center" }}>
          <span style={{ color: "var(--m-fg-2)", fontSize: 12.5 }}>Name</span>
          <span style={{ color: "var(--m-fg-0)" }}>Acme · Platform</span>
        </li>
        <li style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 12, alignItems: "center" }}>
          <span style={{ color: "var(--m-fg-2)", fontSize: 12.5 }}>Region</span>
          <span style={{ color: "var(--m-fg-0)", fontFamily: "var(--m-font-mono)", fontSize: 12 }}>eu-west-1</span>
        </li>
        <li style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 12, alignItems: "center" }}>
          <span style={{ color: "var(--m-fg-2)", fontSize: 12.5 }}>Slug</span>
          <span style={{ color: "var(--m-fg-0)", fontFamily: "var(--m-font-mono)", fontSize: 12 }}>acme-platform</span>
        </li>
      </ul>
    ),
  },
};

export const WithBadge: Story = {
  args: {
    title: "Plugin runtime",
    description: "Sandboxed runtime for installed plugins.",
    badge: { status: "live", label: "Ready" },
    children: (
      <div style={{ fontSize: 12.5, color: "var(--m-fg-1)" }}>
        4 plugins installed. WASM runtime version 0.6.2.
      </div>
    ),
  },
};

export const WithAuditRows: Story = {
  args: {
    title: "Recent changes",
    description: "Last 10 changes across this workspace's connectors and providers.",
    children: (
      <div style={{ display: "grid", gap: 4 }}>
        <SettingsAuditRow timestamp="2026-05-15T10:42:00Z" actor="alex.k"    action="updated"  subject="GitHub · acme — backfill range 30d → 60d" refId="chg_28a1" />
        <SettingsAuditRow timestamp="2026-05-15T09:18:00Z" actor="system"    action="rotated"  subject="OpenAI provider · primary"                  refId="chg_2898" />
        <SettingsAuditRow timestamp="2026-05-14T22:04:00Z" actor="rick.l"    action="enabled"  subject="Plugin metraly-anthropic-byo"               refId="chg_2812" />
        <SettingsAuditRow timestamp="2026-05-14T17:30:00Z" actor="alex.k"    action="tested"   subject="Jira · prod"                                refId="chg_2787" />
        <SettingsAuditRow timestamp="2026-05-14T11:02:00Z" actor="cleo.t"    action="created"  subject="GitHub Actions connector"                   refId="chg_2740" />
      </div>
    ),
  },
};

export const Compact: Story = {
  args: {
    title: "API tokens",
    description: "Programmatic access. Use the audit log to track usage.",
    badge: { status: "neutral", label: "0 tokens" },
    compact: true,
    actions: (
      <button
        type="button"
        style={{
          height: 26,
          padding: "0 10px",
          borderRadius: 6,
          border: "1px solid color-mix(in oklch, var(--m-cyan-500) 50%, transparent)",
          background: "color-mix(in oklch, var(--m-cyan-500) 18%, transparent)",
          color: "var(--m-cyan-500)",
          fontFamily: "inherit",
          fontSize: 11.5,
          cursor: "pointer",
        }}
      >
        New token
      </button>
    ),
    children: (
      <div style={{ fontSize: 12, color: "var(--m-fg-2)" }}>No tokens issued yet.</div>
    ),
  },
};

export const ProductPreview: Story = {
  name: "Product Preview",
  parameters: { layout: "padded" },
  render: () => (
    <MetralyStoryFrame
      category="Settings"
      title="SettingsSection"
      description="Structured settings panel with a title, optional badge, optional actions, and slotted content — used throughout the Settings area for workspace, connectors, API tokens, and audit log."
      status="Ready"
      tags={["settings", "section", "audit", "panel"]}
    >
      <div style={{ display: "grid", gap: 24, maxWidth: 700 }}>
        <SettingsSection
          title="Workspace"
          description="Name, region, and slug for this Metraly workspace."
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
            <li style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 12, alignItems: "center" }}>
              <span style={{ color: "var(--m-fg-2)", fontSize: 12.5 }}>Name</span>
              <span style={{ color: "var(--m-fg-0)" }}>Acme · Platform</span>
            </li>
            <li style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 12, alignItems: "center" }}>
              <span style={{ color: "var(--m-fg-2)", fontSize: 12.5 }}>Region</span>
              <span style={{ color: "var(--m-fg-0)", fontFamily: "var(--m-font-mono)", fontSize: 12 }}>eu-west-1</span>
            </li>
            <li style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 12, alignItems: "center" }}>
              <span style={{ color: "var(--m-fg-2)", fontSize: 12.5 }}>Slug</span>
              <span style={{ color: "var(--m-fg-0)", fontFamily: "var(--m-font-mono)", fontSize: 12 }}>acme-platform</span>
            </li>
          </ul>
        </SettingsSection>
        <SettingsSection
          title="Recent changes"
          description="Last 10 changes across this workspace's connectors and providers."
        >
          <div style={{ display: "grid", gap: 4 }}>
            <SettingsAuditRow timestamp="2026-05-15T10:42:00Z" actor="alex.k"  action="updated" subject="GitHub · acme — backfill range 30d → 60d" refId="chg_28a1" />
            <SettingsAuditRow timestamp="2026-05-15T09:18:00Z" actor="system"  action="rotated" subject="OpenAI provider · primary"                 refId="chg_2898" />
            <SettingsAuditRow timestamp="2026-05-14T22:04:00Z" actor="rick.l"  action="enabled" subject="Plugin metraly-anthropic-byo"              refId="chg_2812" />
          </div>
        </SettingsSection>
        <SettingsSection
          title="API tokens"
          description="Programmatic access. Use the audit log to track usage."
          badge={{ status: "neutral", label: "0 tokens" }}
          compact
          actions={
            <button
              type="button"
              style={{
                height: 26, padding: "0 10px", borderRadius: 6,
                border: "1px solid color-mix(in oklch, var(--m-cyan-500) 50%, transparent)",
                background: "color-mix(in oklch, var(--m-cyan-500) 18%, transparent)",
                color: "var(--m-cyan-500)", fontFamily: "inherit", fontSize: 11.5, cursor: "pointer",
              }}
            >
              New token
            </button>
          }
        >
          <div style={{ fontSize: 12, color: "var(--m-fg-2)" }}>No tokens issued yet.</div>
        </SettingsSection>
      </div>
    </MetralyStoryFrame>
  ),
};
