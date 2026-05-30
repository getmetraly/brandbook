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
        <div className="msf__section-title">Configured state with audit log</div>
        <div className="msf__constrained-3xl">
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
            <div className="msf__section-gap-sm">
              {AUDIT_ROWS.map((row, i) => (
                <SettingsAuditRow key={i} {...row} />
              ))}
            </div>
          </SettingsSection>
        </div>
      </section>

      <section>
        <div className="msf__section-title">Not configured (gated)</div>
        <div className="msf__constrained-3xl">
          <SettingsSection
            title="SSO / SAML"
            description="Single Sign-On is available on Enterprise plans."
            badge={{ status: "Gated", label: "Enterprise" }}
            actions={<MetralyButton variant="ghost" size="sm">Learn more</MetralyButton>}
          />
        </div>
      </section>

      <section>
        <div className="msf__section-title">Compact mode</div>
        <div className="msf__constrained-3xl">
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
