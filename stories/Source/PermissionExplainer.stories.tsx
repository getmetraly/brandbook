import type { Meta, StoryObj } from "@storybook/nextjs";
import * as React from "react";
import { PermissionExplainer, type PermissionScope } from "../../packages/ui/src/source/PermissionExplainer";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta<typeof PermissionExplainer> = {
  title: "Source/PermissionExplainer",
  component: PermissionExplainer,
  decorators: [
    (Story) => React.createElement("div", { style: { maxWidth: 700 } }, React.createElement(Story)),
  ],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof PermissionExplainer>;

const GITHUB_SCOPES: PermissionScope[] = [
  {
    id: "repo",
    requirement: "required",
    state: "granted",
    reason: "Read pull requests, deployments, and workflow runs in selected repositories",
    unlocksMetrics: ["lead_time", "deploy_frequency", "change_fail_rate", "pr_aging"],
  },
  {
    id: "read:org",
    requirement: "required",
    state: "missing",
    reason: "Enumerate the organization to attribute events to the right team",
    unlocksMetrics: ["team_throughput", "team_aging"],
  },
  {
    id: "workflow",
    requirement: "required",
    state: "granted",
    reason: "Read GitHub Actions workflow runs",
    unlocksMetrics: ["ci_duration", "flaky_tests"],
  },
  {
    id: "read:user",
    requirement: "optional",
    state: "granted",
    reason: "Display avatars and user names on PR and review chips",
  },
  {
    id: "admin:org_hook",
    requirement: "optional",
    state: "extra",
    reason: "Not used by Metraly. Consider removing from the token.",
  },
];

export const Mixed: Story = {
  args: {
    title: "GitHub permissions",
    description: "Audit of the token currently configured for github · acme",
    scopes: GITHUB_SCOPES,
  },
};

export const AllRequiredMissing: Story = {
  args: {
    title: "GitHub permissions",
    scopes: GITHUB_SCOPES.map((s) => (s.requirement === "required" ? { ...s, state: "missing" as const } : s)),
  },
};

export const AllGranted: Story = {
  args: {
    title: "GitHub permissions",
    scopes: GITHUB_SCOPES.map((s) => ({ ...s, state: s.state === "extra" ? s.state : ("granted" as const) })),
  },
};

export const Compact: Story = {
  args: { title: "Permissions", scopes: GITHUB_SCOPES, compact: true },
};

const JIRA_SCOPES: PermissionScope[] = [
  { id: "read:jira-work",      requirement: "required", state: "granted", reason: "Read issues, sprints, and changelog history", unlocksMetrics: ["sprint_burndown", "cycle_time"] },
  { id: "read:jira-user",      requirement: "optional", state: "granted", reason: "Display Jira user names on issue chips" },
  { id: "read:servicedesk",    requirement: "optional", state: "missing", reason: "Read service desk tickets for incident metrics", unlocksMetrics: ["mttr_servicedesk"] },
  { id: "write:jira-work",     requirement: "optional", state: "extra",   reason: "Not used by Metraly; remove for least-privilege" },
];

export const JiraMixed: Story = {
  args: { title: "Jira permissions", scopes: JIRA_SCOPES },
};

export const ProductPreview: Story = {
  name: "Product Preview",
  parameters: { layout: "padded" },
  render: () => (
    <MetralyStoryFrame
      category="Source"
      title="PermissionExplainer"
      description="Audits the OAuth scopes on a stored token — surfaces missing required scopes, extra scopes, and which metrics each scope unlocks."
      status="Ready"
      tags={["permissions", "scopes", "OAuth", "audit", "GitHub"]}
    >
      <PermissionExplainer
        title="GitHub permissions"
        description="Audit of the token currently configured for github · acme"
        scopes={GITHUB_SCOPES}
      />
    </MetralyStoryFrame>
  ),
};
