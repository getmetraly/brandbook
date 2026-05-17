import type { Meta, StoryObj } from "@storybook/nextjs";

const swatches = [
  { name: "--m-bg-0", value: "var(--m-bg-0)" },
  { name: "--m-bg-1", value: "var(--m-bg-1)" },
  { name: "--m-bg-2", value: "var(--m-bg-2)" },
  { name: "--m-cyan-500", value: "var(--m-cyan-500)" },
  { name: "--m-purple-500", value: "var(--m-purple-500)" },
  { name: "--m-ok", value: "var(--m-ok)" },
];

function FoundationTokensStory() {
  return (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", padding: 16 }}>
      {swatches.map((swatch) => (
        <div key={swatch.name} style={{ border: "1px solid var(--m-line)", borderRadius: 8, overflow: "hidden", background: "var(--m-bg-1)" }}>
          <div style={{ height: 72, background: swatch.value }} />
          <div style={{ padding: 12, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 13 }}>{swatch.name}</strong>
            <span style={{ fontSize: 12, color: "var(--m-fg-2)" }}>{swatch.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const meta: Meta<typeof FoundationTokensStory> = {
  title: "Foundation/Tokens",
  component: FoundationTokensStory,
};

export default meta;
type Story = StoryObj<typeof FoundationTokensStory>;

export const Default: Story = {};
