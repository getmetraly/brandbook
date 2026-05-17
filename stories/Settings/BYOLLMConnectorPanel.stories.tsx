import type { Meta, StoryObj } from "@storybook/nextjs";
import * as React from "react";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";
import {
  BYOLLMConnectorPanel,
  type BYOLLMProviderEntry,
} from "../../packages/ui/src/settings/BYOLLMConnectorPanel";

const meta: Meta<typeof BYOLLMConnectorPanel> = {
  title: "Settings/BYOLLMConnectorPanel",
  component: BYOLLMConnectorPanel,
  decorators: [
    (Story) => React.createElement("div", { style: { maxWidth: 720 } }, React.createElement(Story)),
  ],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Settings → AI Provider Connectors. BYO LLM lives here, ONLY here. AI-type plugins may contribute additional provider cards into this same panel, tagged via Plugin. This panel is NEVER the marketplace.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof BYOLLMConnectorPanel>;

const ANTHROPIC: BYOLLMProviderEntry = {
  providerId: "anthropic-primary",
  name: "Anthropic · primary",
  kind: "anthropic-compatible",
  state: "ready",
  endpoint: "https://api.anthropic.com/v1",
  token: { committed: true, maskedPreview: "sk-ant-•••••abcd", validation: "valid" },
  models: [
    { id: "claude-sonnet-4.5", label: "claude-sonnet-4.5", meta: "fast · long context" },
    { id: "claude-haiku-4.5",  label: "claude-haiku-4.5",  meta: "fastest" },
  ],
  defaultModelId: "claude-sonnet-4.5",
  privacy: "Data stays in workspace VPC, region eu-west-1.",
  lastTestedAt: "2026-05-15T10:42:00Z",
  onTest: () => {},
  onSetDefault: () => {},
  onDisable: () => {},
};

const OPENAI: BYOLLMProviderEntry = {
  providerId: "openai-primary",
  name: "OpenAI · primary",
  kind: "openai-compatible",
  state: "rate_limited",
  endpoint: "https://api.openai.com/v1",
  token: { committed: true, maskedPreview: "sk-•••••3f02", validation: "valid" },
  models: [
    { id: "gpt-4o-mini", label: "gpt-4o-mini", meta: "cost-efficient" },
    { id: "gpt-4o",      label: "gpt-4o" },
  ],
  defaultModelId: "gpt-4o",
  lastTestedAt: "2026-05-15T10:30:00Z",
  onTest: () => {},
};

const LOCAL: BYOLLMProviderEntry = {
  providerId: "ollama-workstation",
  name: "Ollama · workstation",
  kind: "local",
  state: "ready",
  endpoint: "http://localhost:11434/v1",
  models: [{ id: "llama3.1:70b", label: "llama3.1:70b", meta: "local · 4-bit quant" }],
  privacy: "All inference happens locally. No data leaves the workstation.",
  lastTestedAt: "2026-05-15T10:30:00Z",
  onTest: () => {},
};

const BEDROCK_PLUGIN: BYOLLMProviderEntry = {
  providerId: "bedrock-via-plugin",
  name: "Bedrock · sonnet",
  kind: "anthropic-compatible",
  state: "ready",
  endpoint: "https://bedrock-runtime.us-east-1.amazonaws.com",
  token: { committed: true, maskedPreview: "aws-•••••5ec1", validation: "valid" },
  pluginAttribution: { pluginId: "metraly-bedrock-bridge", pluginName: "Bedrock bridge" },
  models: [{ id: "anthropic.claude-3-5-sonnet-v2", label: "anthropic.claude-3-5-sonnet-v2", meta: "us-east-1" }],
  privacy: "Routed via the workspace's AWS account.",
  lastTestedAt: "2026-05-15T09:55:00Z",
  onTest: () => {},
};

export const NothingConfigured: Story = {
  args: {
    providers: [],
    onAddProvider: () => {},
  },
};

export const FirstPartyOnly: Story = {
  args: {
    providers: [ANTHROPIC, OPENAI],
    routingSummary: "Default model: claude-sonnet-4.5 · fallback: gpt-4o",
    privacySummary: "Workspace VPC · region eu-west-1",
    onAddProvider: () => {},
  },
};

export const WithPluginContribution: Story = {
  args: {
    providers: [ANTHROPIC, OPENAI, LOCAL],
    pluginContributedProviders: [BEDROCK_PLUGIN],
    routingSummary: "Default model: claude-sonnet-4.5 · fallback: gpt-4o",
    privacySummary: "Workspace VPC · region eu-west-1 · local Ollama allowed for dev",
    onAddProvider: () => {},
  },
};

export const NeedsAttention: Story = {
  args: {
    providers: [{ ...OPENAI, state: "auth_failed" }, { ...ANTHROPIC, state: "not_configured" }],
    onAddProvider: () => {},
  },
};

export const ProductPreview: Story = {
  name: "Product Preview",
  parameters: { layout: "padded" },
  render: () => (
    <MetralyStoryFrame
      category="Settings"
      title="BYOLLMConnectorPanel"
      description="Full BYO-LLM settings panel — lists all configured AI provider connectors (first-party and plugin-contributed), a routing summary, privacy summary, and an Add provider action."
      status="Ready"
      tags={["settings", "BYO-LLM", "AI", "providers", "panel"]}
    >
      <div style={{ maxWidth: 720 }}>
        <BYOLLMConnectorPanel
          providers={[ANTHROPIC, OPENAI, LOCAL]}
          pluginContributedProviders={[BEDROCK_PLUGIN]}
          routingSummary="Default model: claude-sonnet-4.5 · fallback: gpt-4o"
          privacySummary="Workspace VPC · region eu-west-1 · local Ollama allowed for dev"
          onAddProvider={() => {}}
        />
      </div>
    </MetralyStoryFrame>
  ),
};
