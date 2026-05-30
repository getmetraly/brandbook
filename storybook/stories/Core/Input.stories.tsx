import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MetralyInput, MetralyIcon } from "@metraly/ui";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Core/Input",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Core"
      title="MetralyInput"
      description="Text input with label, helper text, error, icon slots, and search mode."
      status="stable"
      tags={["form", "a11y", "interactive"]}
    >
      {/* Basic */}
      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Basic</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
          <MetralyInput label="Repository name" placeholder="my-org/my-repo" />
          <MetralyInput label="Base URL" description="Include the https:// prefix." placeholder="https://api.example.com" />
        </div>
      </section>

      {/* Search */}
      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Search</div>
        <div style={{ maxWidth: 400 }}>
          <MetralyInput search placeholder="Search connectors…" fullWidth />
        </div>
      </section>

      {/* States */}
      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>States</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
          <MetralyInput label="API key" error="Token is invalid or expired." defaultValue="ghp_bad-token" />
          <MetralyInput label="Disabled field" defaultValue="read-only" disabled />
          <MetralyInput
            label="With icons"
            iconLeft={<MetralyIcon name="link" size="sm" />}
            iconRight={<MetralyIcon name="check" size="sm" />}
            defaultValue="https://github.com"
          />
        </div>
      </section>
    </MetralyStoryFrame>
  ),
};
