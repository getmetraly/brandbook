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
        <div className="msf__section-title">Draft — not yet committed</div>
        <div className="msf__constrained-lg">
          <TokenInput
            label="GitHub Personal Access Token"
            helper="Requires repo and read:org scopes."
            kind="github-pat"
            placeholder="ghp_••••••••••••••••••••"
          />
        </div>
      </section>

      <section>
        <div className="msf__section-title">Committed (stored)</div>
        <div className="msf__constrained-lg">
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
        <div className="msf__section-title">Validating</div>
        <div className="msf__constrained-lg">
          <TokenInput
            label="API key"
            kind="api-key"
            validation="validating"
            defaultValue="sk-proj-123456789"
          />
        </div>
      </section>

      <section>
        <div className="msf__section-title">Invalid token</div>
        <div className="msf__constrained-lg">
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
        <div className="msf__section-title">Webhook secret</div>
        <div className="msf__constrained-lg">
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
