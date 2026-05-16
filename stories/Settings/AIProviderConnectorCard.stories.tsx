import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";
import { AIProviderConnectorCard } from "../../packages/ui/src/settings/AIProviderConnectorCard";

const meta: Meta<typeof AIProviderConnectorCard> = {
  title: "Settings/AIProviderConnectorCard",
  component: AIProviderConnectorCard,
  decorators: [
    (Story) => React.createElement("div", { style: { maxWidth: 660 } }, React.createElement(Story)),
  ],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof AIProviderConnectorCard>;

const ANTHROPIC_MODELS = [
  { id: "claude-sonnet-4.5", label: "claude-sonnet-4.5", meta: "fast · long context" },
  { id: "claude-haiku-4.5",  label: "claude-haiku-4.5",  meta: "fastest" },
];

const OPENAI_MODELS = [
  { id: "gpt-4o-mini", label: "gpt-4o-mini", meta: "cost-efficient" },
  { id: "gpt-4o",      label: "gpt-4o",      meta: "default" },
];

export const ReadyAnthropic: Story = {
  args: {
    name: "Anthropic · primary",
    kind: "anthropic-compatible",
    state: "ready",
    description: "Default provider for AI Workspace.",
    endpoint: "https://api.anthropic.com/v1",
    token: { committed: true, maskedPreview: "sk-ant-•••••abcd", validation: "valid" },
    models: ANTHROPIC_MODELS,
    defaultModelId: "claude-sonnet-4.5",
    privacy: "Data stays in workspace VPC, region eu-west-1.",
    lastTestedAt: "2026-05-15T10:42:00Z",
    onTest: () => {},
    onSetDefault: () => {},
    onDisable: () => {},
  },
};

export const NotConfiguredOpenAI: Story = {
  args: {
    name: "OpenAI · primary",
    kind: "openai-compatible",
    state: "not_configured",
    description: "Add a key to enable this provider.",
    endpoint: "https://api.openai.com/v1",
    token: { committed: false, onChange: () => {} },
    models: OPENAI_MODELS,
    onTest: () => {},
  },
};

export const AuthFailed: Story = {
  args: {
    name: "OpenAI · primary",
    kind: "openai-compatible",
    state: "auth_failed",
    endpoint: "https://api.openai.com/v1",
    token: { committed: true, maskedPreview: "sk-•••••3f02", validation: "invalid" },
    lastTestedAt: "2026-05-15T10:30:00Z",
    onTest: () => {},
    onDisable: () => {},
  },
};

export const RateLimited: Story = {
  args: {
    name: "OpenAI · primary",
    kind: "openai-compatible",
    state: "rate_limited",
    endpoint: "https://api.openai.com/v1",
    token: { committed: true, maskedPreview: "sk-•••••3f02", validation: "valid" },
    lastTestedAt: "2026-05-15T10:38:00Z",
    onTest: () => {},
  },
};

export const Local: Story = {
  args: {
    name: "Ollama · workstation",
    kind: "local",
    state: "ready",
    description: "Local instance running on the engineer's laptop.",
    endpoint: "http://localhost:11434/v1",
    models: [
      { id: "llama3.1:70b", label: "llama3.1:70b", meta: "local · 4-bit quant" },
      { id: "qwen2.5:14b",  label: "qwen2.5:14b",  meta: "local" },
    ],
    privacy: "All inference happens on this machine. No data leaves the workstation.",
    lastTestedAt: "2026-05-15T10:30:00Z",
    onTest: () => {},
  },
};

export const Custom: Story = {
  args: {
    name: "Custom · internal-gateway",
    kind: "custom",
    state: "configured",
    description: "Routes through the company's LLM gateway.",
    endpoint: "https://llm-gw.internal/v1",
    token: { committed: true, maskedPreview: "tok_•••••12ab", validation: "idle" },
    onTest: () => {},
  },
};

export const Disabled: Story = {
  args: {
    name: "Ollama · workstation",
    kind: "local",
    state: "disabled",
    endpoint: "http://localhost:11434/v1",
    onEnable: () => {},
  },
};

export const Gated: Story = {
  args: {
    name: "Custom · early-access-model",
    kind: "custom",
    state: "gated",
    description: "Awaiting compliance review before this model can be enabled.",
    endpoint: "https://research.internal/v1",
  },
};

export const PluginContributed: Story = {
  args: {
    name: "Bedrock · sonnet (via plugin)",
    kind: "anthropic-compatible",
    state: "ready",
    description: "Provider card contributed by the metraly-bedrock-bridge plugin.",
    endpoint: "https://bedrock-runtime.us-east-1.amazonaws.com",
    token: { committed: true, maskedPreview: "aws-•••••5ec1", validation: "valid" },
    pluginAttribution: { pluginId: "metraly-bedrock-bridge", pluginName: "Bedrock bridge" },
    models: [{ id: "anthropic.claude-3-5-sonnet-v2", label: "anthropic.claude-3-5-sonnet-v2", meta: "Bedrock region us-east-1" }],
    defaultModelId: "anthropic.claude-3-5-sonnet-v2",
    privacy: "Routed via the workspace's AWS account. No keys leave the plugin.",
    lastTestedAt: "2026-05-15T09:55:00Z",
    onTest: () => {},
  },
};

export const ProductPreview: Story = {
  name: "Product Preview",
  parameters: { layout: "padded" },
  render: () => (
    <MetralyStoryFrame
      category="Settings"
      title="AIProviderConnectorCard"
      description="Single AI provider connector card showing authentication state, available models, privacy details, and action controls. Cards can be first-party, local, custom, or plugin-contributed."
      status="Ready"
      tags={["settings", "AI", "provider", "connector", "BYO-LLM"]}
    >
      <div style={{ display: "grid", gap: 16, maxWidth: 660 }}>
        <AIProviderConnectorCard
          name="Anthropic · primary"
          kind="anthropic-compatible"
          state="ready"
          description="Default provider for AI Workspace."
          endpoint="https://api.anthropic.com/v1"
          token={{ committed: true, maskedPreview: "sk-ant-•••••abcd", validation: "valid" }}
          models={ANTHROPIC_MODELS}
          defaultModelId="claude-sonnet-4.5"
          privacy="Data stays in workspace VPC, region eu-west-1."
          lastTestedAt="2026-05-15T10:42:00Z"
          onTest={() => {}}
          onSetDefault={() => {}}
          onDisable={() => {}}
        />
        <AIProviderConnectorCard
          name="OpenAI · primary"
          kind="openai-compatible"
          state="rate_limited"
          endpoint="https://api.openai.com/v1"
          token={{ committed: true, maskedPreview: "sk-•••••3f02", validation: "valid" }}
          models={OPENAI_MODELS}
          lastTestedAt="2026-05-15T10:30:00Z"
          onTest={() => {}}
        />
        <AIProviderConnectorCard
          name="Ollama · workstation"
          kind="local"
          state="ready"
          description="Local instance running on the engineer's laptop."
          endpoint="http://localhost:11434/v1"
          models={[{ id: "llama3.1:70b", label: "llama3.1:70b", meta: "local · 4-bit quant" }]}
          privacy="All inference happens on this machine. No data leaves the workstation."
          lastTestedAt="2026-05-15T10:30:00Z"
          onTest={() => {}}
        />
      </div>
    </MetralyStoryFrame>
  ),
};
