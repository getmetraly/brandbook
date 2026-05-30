import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ConnectionTestPanel } from "@metraly/ui";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Source/ConnectionTestPanel",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

const CHECKS_OK = [
  { id: "reachable",   label: "Host reachable",   result: "ok"   as const, detail: "api.github.com:443" },
  { id: "auth",        label: "Authentication",   result: "ok"   as const },
  { id: "scope-repo",  label: "repo scope",       result: "ok"   as const },
  { id: "scope-org",   label: "read:org scope",   result: "ok"   as const },
];

const CHECKS_DEGRADED = [
  { id: "reachable",  label: "Host reachable",   result: "ok"   as const },
  { id: "auth",       label: "Authentication",   result: "ok"   as const },
  { id: "scope-repo", label: "repo scope",       result: "ok"   as const },
  { id: "scope-org",  label: "read:org scope",   result: "fail" as const, detail: "Token missing read:org — team-level metrics unavailable" },
];

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Source"
      title="ConnectionTestPanel"
      description="Connector reachability panel. Shows per-check breakdown, latency, and last-tested timestamp."
      status="stable"
      tags={["connector", "a11y"]}
    >
      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Not tested</div>
        <div style={{ maxWidth: 560 }}>
          <ConnectionTestPanel status="not_tested" onRetry={() => undefined} />
        </div>
      </section>

      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Ready</div>
        <div style={{ maxWidth: 560 }}>
          <ConnectionTestPanel
            status="ready"
            checks={CHECKS_OK}
            latencyMs={48}
            lastTestedAt={new Date(Date.now() - 120_000).toISOString()}
            nextStep="Proceed to pick backfill range."
            onRetry={() => undefined}
          />
        </div>
      </section>

      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Degraded (partial scope)</div>
        <div style={{ maxWidth: 560 }}>
          <ConnectionTestPanel
            status="degraded"
            checks={CHECKS_DEGRADED}
            latencyMs={52}
            nextStep="Grant read:org scope and re-test."
            onRetry={() => undefined}
          />
        </div>
      </section>

      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Auth failed</div>
        <div style={{ maxWidth: 560 }}>
          <ConnectionTestPanel
            status="auth_failed"
            nextStep="Generate a new PAT and paste it above."
            onRetry={() => undefined}
          />
        </div>
      </section>
    </MetralyStoryFrame>
  ),
};
