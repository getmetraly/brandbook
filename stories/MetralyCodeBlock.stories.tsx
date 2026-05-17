import type { Meta, StoryObj } from "@storybook/nextjs";
import { MetralyCodeBlock, ThemeProvider } from "@metraly/ui";

const meta: Meta<typeof MetralyCodeBlock> = {
  title: "Primitives/MetralyCodeBlock",
  component: MetralyCodeBlock,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ boxSizing: "border-box", width: "100%", minHeight: 160, padding: 24, background: "var(--m-bg-0)", display: "grid", gap: 16, alignContent: "start" }}>
          <div style={{ width: "min(760px, 100%)", minWidth: 0 }}>
            <Story />
          </div>
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
    accent: "primary",
    children: "$ metraly auth github --org my-org\n✓ Waiting for OAuth callback on localhost:7842…",
  },
};

export const Inline: Story = {
  render: () => (
    <p style={{ color: "var(--m-fg-1)", fontSize: "var(--m-fs-12)" }}>
      Sign in with <MetralyCodeBlock variant="inline" accent="primary">admin@metraly.local</MetralyCodeBlock> to inspect the local preview.
    </p>
  ),
};

export const StatusAccents: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 10 }}>
      <MetralyCodeBlock variant="block" accent="default">$ metraly sync --range 30d</MetralyCodeBlock>
      <MetralyCodeBlock variant="block" accent="success">✓ GitHub connected · indexing 42 repositories</MetralyCodeBlock>
      <MetralyCodeBlock variant="block" accent="warning">! Backfill exceeds default retention window</MetralyCodeBlock>
      <MetralyCodeBlock variant="block" accent="error">✕ OAuth callback failed · token expired</MetralyCodeBlock>
    </div>
  ),
};
