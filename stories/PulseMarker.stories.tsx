import type { Meta, StoryObj } from "@storybook/react";
import { MetralyBadge, PulseMarker } from "@metraly/ui";

const meta: Meta<typeof PulseMarker> = {
  title: "Components/PulseMarker",
  component: PulseMarker,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    variant: "dot",
    tone: "live",
    pulse: true,
  },
  render: (args) => (
    <div
      style={{
        minHeight: 260,
        padding: 24,
        background: "var(--m-bg-0)",
        color: "var(--m-fg-0)",
        display: "grid",
        gap: 16,
      }}
    >
      <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
        <PulseMarker {...args} />
        <span style={{ fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-10)", color: "var(--m-fg-2)" }}>
          Semantic pulse marker
        </span>
      </div>
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof PulseMarker>;

export const LiveDot: Story = {};

export const NewDot: Story = {
  args: {
    tone: "new",
  },
};

export const TelemetryWave: Story = {
  args: {
    variant: "wave",
    tone: "live",
  },
};

export const StaticWarning: Story = {
  args: {
    variant: "wave",
    tone: "warning",
    pulse: false,
  },
};

export const AllowedUsageMatrix: Story = {
  render: () => (
    <div
      style={{
        minHeight: 320,
        padding: 24,
        background: "var(--m-bg-0)",
        color: "var(--m-fg-0)",
        display: "grid",
        gap: 20,
      }}
    >
      <div style={{ display: "grid", gap: 10 }}>
        <div style={{ fontSize: "var(--m-fs-12)", fontWeight: 600 }}>Allowed semantic usages</div>
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <PulseMarker tone="live" />
            <span>Live status and telemetry heartbeat</span>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <PulseMarker variant="wave" tone="new" />
            <span>New or unread operational signal</span>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <MetralyBadge variant="info">No decorative pulse on idle surfaces</MetralyBadge>
          </div>
        </div>
      </div>
      <div style={{ color: "var(--m-fg-3)", fontSize: "var(--m-fs-10)", lineHeight: 1.45, maxWidth: 640 }}>
        Pulse remains reserved for semantic live or new signals. It is not a drag handle, not a generic icon, and not an idle card glow.
      </div>
    </div>
  ),
};
