import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { SettingsSection, SettingsAuditRow, MetralyButton, MetralyIcon } from "@metraly/ui";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Settings/SettingsSection",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

const AUDIT_ROWS = [
  { timestamp: new Date(Date.now() - 300_000).toISOString(),   actor: "alex.k",  action: "rotated"  as const, subject: "OpenAI provider · primary", refId: "chg-0042" },
  { timestamp: new Date(Date.now() - 3_600_000).toISOString(), actor: "sam.w",   action: "tested"   as const, subject: "Anthropic provider",         detail: "All checks passed" },
  { timestamp: new Date(Date.now() - 86_400_000).toISOString(),actor: "system",  action: "enabled"  as const, subject: "BYO-LLM · Llama 3.1" },
  { timestamp: new Date(Date.now() - 172_800_000).toISOString(),actor: "alex.k", action: "created"  as const, subject: "OpenAI provider · primary",  refId: "chg-0039" },
];

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Settings"
      title="SettingsSection + SettingsAuditRow"
      description="Settings section frame with badge, actions, and an audit log strip."
      status="stable"
      tags={["settings"]}
    >
      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Configured state with audit log</div>
        <div style={{ maxWidth: 720 }}>
          <SettingsSection
            title="AI Provider Connectors"
            description="Connect OpenAI-compatible and Anthropic-compatible endpoints. Metraly routes AI features to the configured default."
            badge={{ status: "Live", label: "2 ready" }}
            actions={
              <MetralyButton variant="secondary" size="sm" iconLeft={<MetralyIcon name="plus" size="sm" />}>
                Add provider
              </MetralyButton>
            }
          >
            <div style={{ padding: "8px 0 16px" }}>
              {AUDIT_ROWS.map((row, i) => (
                <SettingsAuditRow key={i} {...row} />
              ))}
            </div>
          </SettingsSection>
        </div>
      </section>

      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Not configured (gated)</div>
        <div style={{ maxWidth: 720 }}>
          <SettingsSection
            title="SSO / SAML"
            description="Single Sign-On is available on Enterprise plans."
            badge={{ status: "Gated", label: "Enterprise" }}
            actions={<MetralyButton variant="ghost" size="sm">Learn more</MetralyButton>}
          />
        </div>
      </section>

      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Compact mode</div>
        <div style={{ maxWidth: 720 }}>
          <SettingsSection
            title="Audit log"
            badge={{ status: "Live", label: "Active" }}
            compact
          >
            <div>
              {AUDIT_ROWS.slice(0, 2).map((row, i) => (
                <SettingsAuditRow key={i} {...row} />
              ))}
            </div>
          </SettingsSection>
        </div>
      </section>
    </MetralyStoryFrame>
  ),
};
