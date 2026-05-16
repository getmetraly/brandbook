import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { TokenInput } from "../../packages/ui/src/source/TokenInput";

const meta: Meta<typeof TokenInput> = {
  title: "Source/TokenInput",
  component: TokenInput,
  decorators: [
    (Story) => React.createElement("div", { style: { maxWidth: 600 } }, React.createElement(Story)),
  ],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Credential entry primitive. Full token is never displayed once committed; only the masked preview remains. Drafts may be revealed for verification, but reveal closes on blur. Copy-to-clipboard is disabled for stored values.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof TokenInput>;

export const Empty: Story = {
  args: { label: "GitHub personal access token", kind: "github-pat" },
};

export const TypingDraft: Story = {
  render: () => {
    const [v, setV] = React.useState("ghp_abc123partialvaluetypedin");
    return (
      <TokenInput
        label="GitHub PAT"
        kind="github-pat"
        value={v}
        onChange={setV}
        onValidate={() => {}}
      />
    );
  },
};

export const Validating: Story = {
  render: () => {
    const [v, setV] = React.useState("ghp_validatingthistoken");
    return (
      <TokenInput
        label="GitHub PAT"
        kind="github-pat"
        value={v}
        onChange={setV}
        validation="validating"
        onValidate={() => {}}
      />
    );
  },
};

export const Invalid: Story = {
  render: () => {
    const [v, setV] = React.useState("ghp_invalidtoken");
    return (
      <TokenInput
        label="GitHub PAT"
        kind="github-pat"
        value={v}
        onChange={setV}
        validation="invalid"
        errorText="Token rejected. It may be expired or missing required scopes."
        onValidate={() => {}}
      />
    );
  },
};

export const Stored: Story = {
  args: {
    label: "GitHub PAT",
    kind: "github-pat",
    committed: true,
    maskedPreview: "ghp_••••••••abcd",
    validation: "valid",
    onReplace: () => {},
    onClear: () => {},
  },
};

export const StoredRateLimited: Story = {
  args: {
    label: "Jira API token",
    kind: "api-key",
    committed: true,
    maskedPreview: "atl•••••f9b2",
    validation: "rate_limited",
    onReplace: () => {},
    onClear: () => {},
  },
};

export const ProviderToken: Story = {
  args: {
    label: "OpenAI API key",
    kind: "provider-token",
    helper: "Workspace key; rotate it from the OpenAI dashboard.",
  },
};

export const WebhookSecret: Story = {
  args: {
    label: "Webhook signing secret",
    kind: "webhook-secret",
    helper: "Shared secret used to verify signatures on inbound webhooks.",
  },
};
