import type { Meta, StoryObj } from "@storybook/react";

const COLOR_SWATCHES = [
  { name: "--m-bg-0", group: "Background" },
  { name: "--m-bg-1", group: "Background" },
  { name: "--m-bg-2", group: "Background" },
  { name: "--m-bg-3", group: "Background" },
  { name: "--m-bg-4", group: "Background" },
  { name: "--m-fg-0", group: "Foreground" },
  { name: "--m-fg-1", group: "Foreground" },
  { name: "--m-fg-2", group: "Foreground" },
  { name: "--m-fg-3", group: "Foreground" },
  { name: "--m-fg-4", group: "Foreground" },
  { name: "--m-line", group: "Lines" },
  { name: "--m-line-faint", group: "Lines" },
  { name: "--m-line-strong", group: "Lines" },
  { name: "--m-cyan-300", group: "Cyan" },
  { name: "--m-cyan-400", group: "Cyan" },
  { name: "--m-cyan-500", group: "Cyan" },
  { name: "--m-cyan-600", group: "Cyan" },
  { name: "--m-purple-300", group: "Purple" },
  { name: "--m-purple-400", group: "Purple" },
  { name: "--m-purple-500", group: "Purple" },
  { name: "--m-purple-600", group: "Purple" },
  { name: "--m-ok", group: "Semantic" },
  { name: "--m-warn", group: "Semantic" },
  { name: "--m-err", group: "Semantic" },
  { name: "--m-new", group: "Semantic" },
];

const SPACE_TOKENS = [
  "--m-1", "--m-2", "--m-3", "--m-4", "--m-5", "--m-6", "--m-7", "--m-8", "--m-9",
];

const RADIUS_TOKENS = [
  "--m-r-1", "--m-r-2", "--m-r-3", "--m-r-4", "--m-r-full",
];

const FONT_SIZE_TOKENS = [
  "--m-fs-9", "--m-fs-10", "--m-fs-11", "--m-fs-12", "--m-fs-13",
  "--m-fs-14", "--m-fs-16", "--m-fs-18", "--m-fs-22", "--m-fs-28",
];

const groups = Array.from(new Set(COLOR_SWATCHES.map((s) => s.group)));

function SwatchGroup({ group }: { group: string }) {
  const swatches = COLOR_SWATCHES.filter((s) => s.group === group);
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-9)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {group}
      </div>
      <div style={{ display: "grid", gap: 6, gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}>
        {swatches.map((swatch) => (
          <div key={swatch.name} style={{ border: "1px solid var(--m-line)", borderRadius: "var(--m-r-3)", overflow: "hidden", background: "var(--m-bg-1)" }}>
            <div style={{ height: 48, background: `var(${swatch.name})` }} />
            <div style={{ padding: "8px 10px" }}>
              <code style={{ fontSize: "var(--m-fs-9)", color: "var(--m-fg-2)", fontFamily: "var(--m-font-mono)" }}>{swatch.name}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TokensStory() {
  return (
    <div style={{ display: "grid", gap: 24, padding: 20, background: "var(--m-bg-0)", minHeight: "100dvh" }}>
      <div style={{ display: "grid", gap: 4 }}>
        <div style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-18)", fontWeight: 600 }}>Design Tokens</div>
        <div style={{ color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-10)" }}>
          Canonical token reference from metraly-theme.css
        </div>
      </div>

      {groups.map((group) => <SwatchGroup key={group} group={group} />)}

      <div style={{ display: "grid", gap: 8 }}>
        <div style={{ color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-9)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Spacing scale
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "flex-end" }}>
          {SPACE_TOKENS.map((token) => (
            <div key={token} style={{ display: "grid", gap: 4, justifyItems: "center" }}>
              <div style={{ background: "var(--m-cyan-500)", width: `var(${token})`, height: `var(${token})`, minWidth: 2, minHeight: 2 }} />
              <code style={{ fontSize: "var(--m-fs-9)", color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)" }}>{token.replace("--m-", "")}</code>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        <div style={{ color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-9)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Border radius
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          {RADIUS_TOKENS.map((token) => (
            <div key={token} style={{ display: "grid", gap: 4, justifyItems: "center" }}>
              <div style={{ width: 48, height: 48, background: "var(--m-bg-2)", border: "1px solid var(--m-line)", borderRadius: `var(${token})` }} />
              <code style={{ fontSize: "var(--m-fs-9)", color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)" }}>{token.replace("--m-", "")}</code>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        <div style={{ color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-9)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Font size scale
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          {FONT_SIZE_TOKENS.map((token) => (
            <div key={token} style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <code style={{ fontSize: "var(--m-fs-9)", color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)", minWidth: 80 }}>{token.replace("--m-", "")}</code>
              <span style={{ fontSize: `var(${token})`, color: "var(--m-fg-0)" }}>The quick brown fox</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const meta: Meta<typeof TokensStory> = {
  title: "Foundation/Tokens",
  component: TokensStory,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof TokensStory>;

export const Default: Story = {};
