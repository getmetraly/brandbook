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
        <div className="msf__section-title">Basic</div>
        <div className="msf__stack msf__constrained-md">
          <MetralyInput label="Repository name" placeholder="my-org/my-repo" />
          <MetralyInput label="Base URL" description="Include the https:// prefix." placeholder="https://api.example.com" />
        </div>
      </section>

      {/* Search */}
      <section>
        <div className="msf__section-title">Search</div>
        <div className="msf__constrained-md">
          <MetralyInput search placeholder="Search connectors…" fullWidth />
        </div>
      </section>

      {/* States */}
      <section>
        <div className="msf__section-title">States</div>
        <div className="msf__stack msf__constrained-md">
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
