import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { TokenInput } from "@metraly/ui";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Source/TokenInput",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Source"
      title="TokenInput"
      description="Secure credential entry. Draft → committed flow, masked preview, reveal toggle. Handles GitHub PATs, API keys, webhook secrets."
      status="stable"
      tags={["security", "form", "a11y"]}
    >
      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Draft — not yet committed</div>
        <div style={{ maxWidth: 480 }}>
          <TokenInput
            label="GitHub Personal Access Token"
            helper="Requires repo and read:org scopes."
            kind="github-pat"
            placeholder="ghp_••••••••••••••••••••"
          />
        </div>
      </section>

      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Committed (stored)</div>
        <div style={{ maxWidth: 480 }}>
          <TokenInput
            label="GitHub Personal Access Token"
            committed
            maskedPreview="ghp_••••••••••••••••abcd"
            kind="github-pat"
            validation="valid"
          />
        </div>
      </section>

      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Validating</div>
        <div style={{ maxWidth: 480 }}>
          <TokenInput
            label="API key"
            kind="api-key"
            validation="validating"
            defaultValue="sk-proj-123456789"
          />
        </div>
      </section>

      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Invalid token</div>
        <div style={{ maxWidth: 480 }}>
          <TokenInput
            label="API key"
            kind="api-key"
            validation="invalid"
            errorText="Token rejected — check expiry and scope."
            defaultValue="sk-bad-token"
          />
        </div>
      </section>

      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Webhook secret</div>
        <div style={{ maxWidth: 480 }}>
          <TokenInput
            label="Webhook secret"
            kind="webhook-secret"
            helper="Copy this secret into your GitHub webhook settings."
            committed
            maskedPreview="whsec_••••••••••••••••ef12"
            validation="valid"
          />
        </div>
      </section>
    </MetralyStoryFrame>
  ),
};
