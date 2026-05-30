import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MetralyHeatmap } from "@metraly/ui";
import { MetralyStoryFrame, ProductPreview } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Charts/Heatmap",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

// ── Deploy frequency: teams × weeks ──────────────────────────────────────────
const DEPLOY_X = ["W-8","W-7","W-6","W-5","W-4","W-3","W-2","W-1","W0"];
const DEPLOY_Y = ["Payments","Auth","Data Eng","Frontend","DevOps"];

function buildDeployCells() {
  const vals: Record<string, number> = {
    "Payments:W-8": 12, "Payments:W-7": 9,  "Payments:W-6": 14, "Payments:W-5": 11, "Payments:W-4": 16, "Payments:W-3": 10, "Payments:W-2": 8,  "Payments:W-1": 18, "Payments:W0": 20,
    "Auth:W-8": 4,  "Auth:W-7": 6,  "Auth:W-6": 5,  "Auth:W-5": 4,  "Auth:W-4": 7,  "Auth:W-3": 8,  "Auth:W-2": 6,  "Auth:W-1": 5,  "Auth:W0": 9,
    "Data Eng:W-8": 2, "Data Eng:W-7": 1, "Data Eng:W-6": 3, "Data Eng:W-5": 2, "Data Eng:W-4": 0, "Data Eng:W-3": 4, "Data Eng:W-2": 2, "Data Eng:W-1": 3, "Data Eng:W0": 2,
    "Frontend:W-8": 8, "Frontend:W-7": 10, "Frontend:W-6": 7, "Frontend:W-5": 9, "Frontend:W-4": 11, "Frontend:W-3": 13, "Frontend:W-2": 12, "Frontend:W-1": 15, "Frontend:W0": 14,
    "DevOps:W-8": 6, "DevOps:W-7": 5, "DevOps:W-6": 8, "DevOps:W-5": 6, "DevOps:W-4": 9, "DevOps:W-3": 7, "DevOps:W-2": 6, "DevOps:W-1": 8, "DevOps:W0": 10,
  };
  return DEPLOY_Y.flatMap((y) =>
    DEPLOY_X.map((x) => ({ x, y, value: vals[`${y}:${x}`] ?? null })),
  );
}

// ── PR age heatmap: team × bucket ────────────────────────────────────────────
const PR_X = ["<1d","1-2d","2-4d","4-7d","7-14d",">14d"];
const PR_Y = ["Payments","Auth","Data Eng","Frontend","DevOps"];
const PR_RAW: Record<string, number> = {
  "Payments:<1d": 3, "Payments:1-2d": 5, "Payments:2-4d": 8, "Payments:4-7d": 4, "Payments:7-14d": 2, "Payments:>14d": 1,
  "Auth:<1d": 6, "Auth:1-2d": 4, "Auth:2-4d": 2, "Auth:4-7d": 1, "Auth:7-14d": 0, "Auth:>14d": 0,
  "Data Eng:<1d": 1, "Data Eng:1-2d": 2, "Data Eng:2-4d": 4, "Data Eng:4-7d": 6, "Data Eng:7-14d": 8, "Data Eng:>14d": 5,
  "Frontend:<1d": 4, "Frontend:1-2d": 6, "Frontend:2-4d": 8, "Frontend:4-7d": 5, "Frontend:7-14d": 3, "Frontend:>14d": 2,
  "DevOps:<1d": 2, "DevOps:1-2d": 3, "DevOps:2-4d": 4, "DevOps:4-7d": 2, "DevOps:7-14d": 1, "DevOps:>14d": 0,
};
function buildPRCells() {
  return PR_Y.flatMap((y) =>
    PR_X.map((x) => ({ x, y, value: PR_RAW[`${y}:${x}`] ?? null })),
  );
}

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Charts"
      title="MetralyHeatmap"
      description="x/y intensity grid. Ramps: cyan | purple | success | warning | danger | semantic. Supports tooltip, roving focus, legend, and all widget states."
      status="stable"
      tags={["chart", "a11y"]}
      fullWidth
    >
      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Deploy frequency · teams × weeks</div>
        <ProductPreview>
          <div style={{ padding: 20 }}>
            <MetralyHeatmap
              title="Deploy frequency"
              description="Deployments per team per week"
              xLabels={DEPLOY_X}
              yLabels={DEPLOY_Y}
              cells={buildDeployCells()}
              unit="deploys"
              colorScale={{ ramp: "cyan" }}
              showCellValues
              legend="horizontal"
            />
          </div>
        </ProductPreview>
      </section>

      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>PR age by team · warning ramp</div>
        <ProductPreview>
          <div style={{ padding: 20 }}>
            <MetralyHeatmap
              title="Open PR age"
              description="Number of open PRs by age bucket per team"
              xLabels={PR_X}
              yLabels={PR_Y}
              cells={buildPRCells()}
              unit="PRs"
              colorScale={{ ramp: "warning" }}
              legend="inline"
            />
          </div>
        </ProductPreview>
      </section>

      <section>
        <div style={{ marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Widget states</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <MetralyHeatmap xLabels={DEPLOY_X} yLabels={DEPLOY_Y} cells={[]} state="loading" />
          <MetralyHeatmap xLabels={DEPLOY_X} yLabels={DEPLOY_Y} cells={[]} state="error" />
        </div>
      </section>
    </MetralyStoryFrame>
  ),
};
