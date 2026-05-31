import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  MetralyBadge,
  MetralyButton,
  MetralyCard,
  MetralyIcon,
  MetralyInput,
  MetralySegmentedControl,
  ThemeProvider,
} from "@metraly/ui";

const integrations = [
  {
    name: "GitHub",
    subtitle: "PRs, review latency, merge health",
    icon: "github" as const,
    status: <MetralyBadge variant="success">installed</MetralyBadge>,
    action: "Manage",
    state: "installed" as const,
    note: "Pull request telemetry and deployment hooks are connected.",
  },
  {
    name: "GitLab",
    subtitle: "MRs, pipelines, environments",
    icon: "gitlab" as const,
    status: <MetralyBadge variant="primary">available</MetralyBadge>,
    action: "Install",
    state: "available" as const,
    note: "Enable merge request and release telemetry.",
  },
  {
    name: "PagerDuty",
    subtitle: "Incidents, MTTR, paging correlation",
    icon: "pagerduty" as const,
    status: <MetralyBadge variant="warning">needs auth</MetralyBadge>,
    action: "Connect",
    state: "needs-auth" as const,
    note: "Reconnect OAuth to correlate incidents with deployments.",
  },
  {
    name: "Slack",
    subtitle: "Alert routing, digests, workflow hooks",
    icon: "slack" as const,
    status: <MetralyBadge variant="info">optional</MetralyBadge>,
    action: "Enable",
    state: "optional" as const,
    note: "Send team summaries and incident review prompts.",
  },
  {
    name: "Buildkite",
    subtitle: "Pipeline duration, flaky jobs, retries",
    icon: "refresh" as const,
    status: <MetralyBadge variant="secondary">syncing</MetralyBadge>,
    action: "View",
    state: "syncing" as const,
    note: "Indexing 42 pipelines and test retry data.",
  },
  {
    name: "Sentry",
    subtitle: "Errors, release health, blast radius",
    icon: "alertTri" as const,
    status: <MetralyBadge variant="error">sync error</MetralyBadge>,
    action: "Retry",
    state: "error" as const,
    note: "Release-health sync failed. Check token scope.",
  },
];

function actionVariant(action: string, state: string) {
  if (state === "error") return "danger" as const;
  if (action === "Manage" || action === "View") return "secondary" as const;
  return "primary" as const;
}

function matchesFilter(integration: (typeof integrations)[number], filter: string) {
  if (filter === "all") return true;
  if (filter === "errors") return integration.state === "error";
  return integration.state === filter;
}

function IntegrationCardRecipe() {
  const [filter, setFilter] = React.useState("all");
  const [query, setQuery] = React.useState("");
  const filteredIntegrations = integrations.filter((integration) => {
    const queryValue = query.trim().toLowerCase();
    const matchesQuery = !queryValue || [integration.name, integration.subtitle, integration.note].join(" ").toLowerCase().includes(queryValue);
    return matchesFilter(integration, filter) && matchesQuery;
  });

  return (
    <ThemeProvider>
      <div style={{ minHeight: "100dvh", background: "var(--m-bg-0)", padding: "clamp(12px, 3vw, 24px)", overflowX: "hidden" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gap: 14, minWidth: 0 }}>
          <div style={{ display: "grid", gap: 4, minWidth: 0 }}>
            <div style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-18)", fontWeight: 600 }}>
              Integration cards
            </div>
            <div style={{ color: "var(--m-fg-3)", maxWidth: 720, fontSize: "var(--m-fs-11)", lineHeight: 1.45 }}>
              Marketplace cards stay as recipe-level compositions of `MetralyCard`, `MetralyButton`, `MetralyBadge` and `MetralyIcon`.
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap", minWidth: 0 }}>
            <div style={{ minWidth: 0, flex: "1 1 260px" }}>
              <MetralyInput search fullWidth placeholder="Search integrations" value={query} onChange={(event) => setQuery(event.currentTarget.value)} />
            </div>
            <MetralySegmentedControl
              ariaLabel="Integration filter"
              size="sm"
              value={filter}
              onValueChange={setFilter}
              interactionMode="toolbar"
              options={[
                { value: "all", label: "All" },
                { value: "installed", label: "Installed" },
                { value: "needs-auth", label: "Needs auth" },
                { value: "errors", label: "Errors" },
              ]}
            />
          </div>

          {filteredIntegrations.length > 0 ? (
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))", alignItems: "start" }}>
              {filteredIntegrations.map((integration) => (
                <MetralyCard
                  key={integration.name}
                  density="compact"
                  title={integration.name}
                  subtitle={integration.subtitle}
                  icon={<MetralyIcon name={integration.icon} size="md" />}
                  state={integration.state === "error" ? "error" : integration.state === "syncing" ? "loading" : "default"}
                  footer={(
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                      {integration.status}
                      <MetralyButton variant={actionVariant(integration.action, integration.state)} size="sm" loading={integration.state === "syncing"}>
                        {integration.action}
                      </MetralyButton>
                    </div>
                  )}
                >
                  <div style={{ display: "grid", gap: 8, minWidth: 0 }}>
                    <div style={{ color: "var(--m-fg-2)", fontSize: "var(--m-fs-10)", lineHeight: 1.45 }}>
                      {integration.note}
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      <MetralyBadge variant="info">compact</MetralyBadge>
                      <MetralyBadge variant="info">operational</MetralyBadge>
                    </div>
                  </div>
                </MetralyCard>
              ))}
            </div>
          ) : (
            <div style={{ border: "1px dashed var(--m-line)", borderRadius: "var(--m-r-3)", padding: 18, color: "var(--m-fg-3)", fontSize: "var(--m-fs-11)", textAlign: "center" }}>
              No integrations match the current filter.
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

const meta: Meta<typeof IntegrationCardRecipe> = {
  title: "Patterns/Integration Card Recipe",
  component: IntegrationCardRecipe,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof IntegrationCardRecipe>;

export const Grid: Story = {
  render: () => <IntegrationCardRecipe />,
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => <IntegrationCardRecipe />,
};
