import type { Meta, StoryObj } from "@storybook/react";
import { MetralyIcon, MetralyIconName, metralyIconPaths, metralyIconSizeMap } from "@metraly/ui";
import { ThemeProvider } from "@metraly/ui";
import React from "react";

const meta: Meta<typeof MetralyIcon> = {
  title: "Primitives/MetralyIcon",
  component: MetralyIcon,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: 24, background: "var(--m-bg-0)" }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MetralyIcon>;

const allNames = Object.keys(metralyIconPaths) as MetralyIconName[];

export const Gallery: Story = {
  name: "Full gallery",
  render: () => (
    <ThemeProvider>
      <div style={{ padding: 24, background: "var(--m-bg-0)" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
            gap: 8,
          }}
        >
          {allNames.map((name) => (
            <div
              key={name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                padding: "10px 4px",
                borderRadius: 6,
                border: "1px solid var(--m-line-faint)",
                background: "var(--m-bg-1)",
              }}
            >
              <MetralyIcon name={name} size={16} color="var(--m-fg-1)" />
              <span
                style={{
                  fontFamily: "var(--m-font-mono)",
                  fontSize: 9,
                  color: "var(--m-fg-3)",
                  textAlign: "center",
                  lineHeight: 1.3,
                  wordBreak: "break-all",
                }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ThemeProvider>
  ),
};

export const SizeGrid: Story = {
  name: "Size scale",
  render: () => (
    <ThemeProvider>
        <div style={{ padding: 24, background: "var(--m-bg-0)", display: "flex", gap: 24, alignItems: "flex-end" }}>
        {(Object.entries(metralyIconSizeMap) as Array<[keyof typeof metralyIconSizeMap, number]>).map(([token, px]) => (
          <div key={token} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <MetralyIcon name="zap" size={token} color="var(--m-cyan-500)" />
            <span style={{ fontFamily: "var(--m-font-mono)", fontSize: 10, color: "var(--m-fg-3)" }}>{token} · {px}px</span>
          </div>
        ))}
      </div>
    </ThemeProvider>
  ),
};

export const ColorVariants: Story = {
  name: "Color variants",
  render: () => (
    <ThemeProvider>
      <div style={{ padding: 24, background: "var(--m-bg-0)", display: "flex", gap: 16, alignItems: "center" }}>
        <MetralyIcon name="activity" size={16} color="var(--m-fg-1)" />
        <MetralyIcon name="activity" size={16} color="var(--m-cyan-500)" />
        <MetralyIcon name="activity" size={16} color="var(--m-purple-500)" />
        <MetralyIcon name="activity" size={16} color="var(--m-ok)" />
        <MetralyIcon name="activity" size={16} color="var(--m-warn)" />
        <MetralyIcon name="activity" size={16} color="var(--m-err)" />
      </div>
    </ThemeProvider>
  ),
};

export const Accessible: Story = {
  name: "With aria-label",
  render: () => (
    <ThemeProvider>
      <div style={{ padding: 24, background: "var(--m-bg-0)", display: "flex", gap: 16, alignItems: "center" }}>
        <MetralyIcon name="bell" size={20} color="var(--m-fg-1)" aria-label="Notifications" />
        <MetralyIcon name="settings" size={20} color="var(--m-fg-1)" aria-label="Settings" />
      </div>
    </ThemeProvider>
  ),
};
