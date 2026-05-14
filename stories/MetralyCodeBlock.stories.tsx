import type { Meta, StoryObj } from "@storybook/react";
import { MetralyCodeBlock, ThemeProvider } from "@metraly/ui";

const meta: Meta<typeof MetralyCodeBlock> = {
  title: "Primitives/MetralyCodeBlock",
  component: MetralyCodeBlock,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: 24, background: "var(--m-bg-0)", minHeight: 180, display: "grid", gap: 16 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MetralyCodeBlock>;

export const Block: Story = {
  args: {
    variant: "block",
    accent: "cyan",
    children: "$ metraly auth github --org my-org\n✓ Waiting for OAuth callback on localhost:7842…",
  },
};

export const Inline: Story = {
  render: () => (
    <p style={{ color: "var(--m-fg-1)", fontSize: "var(--m-fs-12)" }}>
      Sign in with <MetralyCodeBlock variant="inline" accent="cyan">admin@metraly.local</MetralyCodeBlock> to inspect the local preview.
    </p>
  ),
};

export const StatusAccents: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 10 }}>
      <MetralyCodeBlock variant="block" accent="default">$ metraly sync --range 30d</MetralyCodeBlock>
      <MetralyCodeBlock variant="block" accent="ok">✓ GitHub connected · indexing 42 repositories</MetralyCodeBlock>
      <MetralyCodeBlock variant="block" accent="warn">! Backfill exceeds default retention window</MetralyCodeBlock>
      <MetralyCodeBlock variant="block" accent="err">✕ OAuth callback failed · token expired</MetralyCodeBlock>
    </div>
  ),
};
