import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { BYOLLMConnectorPanel, type BYOLLMProviderEntry } from "@metraly/ui";
import { MetralyStoryFrame, ProductPreview } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Settings/BYOLLMConnectorPanel",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

const PROVIDERS: BYOLLMProviderEntry[] = [
  {
    providerId: "openai-primary",
    name: "OpenAI",
    kind: "openai-compatible",
    state: "ready",
    description: "Default routing target for Claude Sonnet workloads.",
    endpoint: "https://api.openai.com/v1",
    token: { committed: true, maskedPreview: "sk-proj-••••••••abcd", validation: "valid" },
    models: [
      { id: "gpt-4o", label: "gpt-4o", meta: "default" },
      { id: "gpt-4o-mini", label: "gpt-4o-mini", meta: "fast" },
    ],
    defaultModelId: "gpt-4o",
    lastTestedAt: new Date(Date.now() - 600_000).toISOString(),
    onTest: () => undefined,
    onSetDefault: () => undefined,
    onDisable: () => undefined,
  },
  {
    providerId: "anthropic-secondary",
    name: "Anthropic",
    kind: "anthropic-compatible",
    state: "configured",
    description: "Secondary provider for GDPR-scoped workspaces.",
    endpoint: "https://api.anthropic.com",
    token: { committed: true, maskedPreview: "sk-ant-••••••••ef56", validation: "valid" },
    models: [
      { id: "claude-sonnet-4-5", label: "claude-sonnet-4-5", meta: "balanced" },
    ],
    onTest: () => undefined,
  },
];

const PLUGIN_PROVIDERS: BYOLLMProviderEntry[] = [
  {
    providerId: "groq-plugin",
    name: "Groq",
    kind: "openai-compatible",
    state: "ready",
    endpoint: "https://api.groq.com/openai/v1",
    token: { committed: true, maskedPreview: "gsk_••••••••abcd", validation: "valid" },
    pluginAttribution: { pluginId: "groq-provider", pluginName: "Groq Provider" },
    models: [{ id: "llama-3.3-70b-versatile", label: "llama-3.3-70b-versatile" }],
    onTest: () => undefined,
  },
];

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Settings"
      title="BYOLLMConnectorPanel"
      description="Full BYO-LLM settings panel. Lists first-party providers, plugin-contributed providers, routing policy, and privacy boundary."
      status="stable"
      tags={["settings", "AI"]}
      fullWidth
    >
      <ProductPreview>
        <div style={{ padding: 20 }}>
          <BYOLLMConnectorPanel
            providers={PROVIDERS}
            pluginContributedProviders={PLUGIN_PROVIDERS}
            routingSummary="Routes AI Workspace → OpenAI (gpt-4o). Fallback → Anthropic (claude-sonnet-4-5)."
            privacySummary="Workspace VPC via AWS eu-west-1. PII redaction enforced in the routing layer."
            onAddProvider={() => undefined}
          />
        </div>
      </ProductPreview>
    </MetralyStoryFrame>
  ),
};
