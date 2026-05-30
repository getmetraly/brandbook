import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { PermissionExplainer } from "@metraly/ui";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Source/PermissionExplainer",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

const GITHUB_SCOPES = [
  { id: "repo",      requirement: "required" as const, state: "granted" as const,  reason: "Read PRs, commits, and branches from private repositories",    unlocksMetrics: ["pr-throughput","cycle-time","lead-time"] },
  { id: "read:org",  requirement: "required" as const, state: "granted" as const,  reason: "Resolve team membership to group metrics by team",              unlocksMetrics: ["team-velocity"] },
  { id: "read:user", requirement: "optional" as const, state: "missing"  as const, reason: "Attribute commits to individual contributors",                   unlocksMetrics: ["contributor-activity"] },
  { id: "gist",      requirement: "optional" as const, state: "extra"    as const, reason: "Not requested by Metraly — revoke for minimal footprint" },
];

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Source"
      title="PermissionExplainer"
      description="Connector scope list with granted/missing/extra/deprecated state per scope."
      status="stable"
      tags={["connector", "a11y"]}
    >
      <section>
        <div className="msf__section-title">GitHub scopes — mixed state</div>
        <div className="msf__constrained-2xl">
          <PermissionExplainer
            title="GitHub OAuth scopes"
            description="Metraly requests the minimum scopes needed to compute DORA metrics."
            scopes={GITHUB_SCOPES}
          />
        </div>
      </section>

      <section>
        <div className="msf__section-title">Compact mode</div>
        <div className="msf__constrained-2xl">
          <PermissionExplainer scopes={GITHUB_SCOPES} compact />
        </div>
      </section>
    </MetralyStoryFrame>
  ),
};
