import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { AIProviderConnectorCard } from "@metraly/ui";
import { MetralyStoryFrame, ProductPreview } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Settings/AIProviderConnectorCard",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

const OPENAI_MODELS = [
  { id: "gpt-4o",        label: "gpt-4o",        meta: "fast · $5/M" },
  { id: "gpt-4o-mini",   label: "gpt-4o-mini",   meta: "value · $0.15/M" },
  { id: "o3-mini",       label: "o3-mini",        meta: "reasoning" },
];

const ANTHROPIC_MODELS = [
  { id: "claude-sonnet-4-5", label: "claude-sonnet-4-5", meta: "balanced" },
  { id: "claude-opus-4",     label: "claude-opus-4",     meta: "max quality" },
  { id: "claude-haiku-3-5",  label: "claude-haiku-3-5",  meta: "fast" },
];

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Settings"
      title="AIProviderConnectorCard"
      description="Single provider connector tile. States: not_configured → configured → testing → ready / auth_failed / rate_limited / disabled."
      status="stable"
      tags={["settings", "AI", "interactive"]}
    >
      <section>
        <div className="msf__section-title">Ready</div>
        <ProductPreview>
          <div className="msf__pad-lg">
            <AIProviderConnectorCard
              name="OpenAI"
              kind="openai-compatible"
              state="ready"
              description="OpenAI API via api.openai.com."
              endpoint="https://api.openai.com/v1"
              token={{ committed: true, maskedPreview: "sk-proj-••••••••abcd", validation: "valid" }}
              models={OPENAI_MODELS}
              defaultModelId="gpt-4o"
              lastTestedAt={new Date(Date.now() - 600_000).toISOString()}
              privacy="Data is processed by OpenAI. No PII is sent."
              onTest={() => undefined}
              onSetDefault={() => undefined}
              onDisable={() => undefined}
            />
          </div>
        </ProductPreview>
      </section>

      <section>
        <div className="msf__section-title">Not configured</div>
        <ProductPreview>
          <div className="msf__pad-lg">
            <AIProviderConnectorCard
              name="Anthropic"
              kind="anthropic-compatible"
              state="not_configured"
              description="Anthropic Claude API — GDPR-compliant."
              endpoint="https://api.anthropic.com"
              token={{ committed: false }}
              models={ANTHROPIC_MODELS}
              privacy="Anthropic processes data in the US. Data Processing Addendum available."
            />
          </div>
        </ProductPreview>
      </section>

      <section>
        <div className="msf__section-title">Auth failed</div>
        <ProductPreview>
          <div className="msf__pad-lg">
            <AIProviderConnectorCard
              name="Custom endpoint"
              kind="custom"
              state="auth_failed"
              endpoint="https://llm.internal.corp/v1"
              token={{ committed: true, maskedPreview: "••••••••dead", validation: "invalid" }}
              onTest={() => undefined}
            />
          </div>
        </ProductPreview>
      </section>

      <section>
        <div className="msf__section-title">Via plugin attribution</div>
        <ProductPreview>
          <div className="msf__pad-lg">
            <AIProviderConnectorCard
              name="Groq (via plugin)"
              kind="openai-compatible"
              state="ready"
              description="Fast LPU inference via api.groq.com."
              endpoint="https://api.groq.com/openai/v1"
              token={{ committed: true, maskedPreview: "gsk_••••••••abcd", validation: "valid" }}
              pluginAttribution={{ pluginId: "groq-provider", pluginName: "Groq Provider" }}
              models={[{ id: "llama-3.3-70b-versatile", label: "llama-3.3-70b-versatile", meta: "fast" }]}
              onTest={() => undefined}
            />
          </div>
        </ProductPreview>
      </section>
    </MetralyStoryFrame>
  ),
};
