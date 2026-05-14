import type { Meta, StoryObj } from "@storybook/react";
import {
  MetralyBadge,
  MetralyButton,
  MetralyCard,
  MetralyIcon,
  ThemeProvider,
} from "@metraly/ui";

const integrations = [
  {
    name: "GitHub",
    subtitle: "Pull requests, review latency, merge health",
    icon: "github" as const,
    status: <MetralyBadge variant="success">installed</MetralyBadge>,
    action: "Manage",
  },
  {
    name: "GitLab",
    subtitle: "Merge request telemetry and deployment events",
    icon: "gitlab" as const,
    status: <MetralyBadge variant="primary">available</MetralyBadge>,
    action: "Install",
  },
  {
    name: "PagerDuty",
    subtitle: "Incidents, MTTR, paging correlation",
    icon: "pagerduty" as const,
    status: <MetralyBadge variant="warning">needs auth</MetralyBadge>,
    action: "Connect",
  },
  {
    name: "Slack",
    subtitle: "Alert routing, digests, workflow hooks",
    icon: "slack" as const,
    status: <MetralyBadge variant="info">optional</MetralyBadge>,
    action: "Enable",
  },
];

function IntegrationCardRecipe() {
  return (
    <ThemeProvider>
      <div style={{ minHeight: 820, background: "var(--m-bg-0)", padding: 24 }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gap: 16 }}>
          <div style={{ display: "grid", gap: 4 }}>
            <div style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-18)", fontWeight: 600 }}>
              Integration cards
            </div>
            <div style={{ color: "var(--m-fg-3)", maxWidth: 720 }}>
              Marketplace and onboarding cards can stay as recipe-level compositions of `MetralyCard`,
              `MetralyButton`, `MetralyBadge` and `MetralyIcon`.
            </div>
          </div>

          <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {integrations.map((integration) => (
              <MetralyCard
                key={integration.name}
                title={integration.name}
                subtitle={integration.subtitle}
                icon={<MetralyIcon name={integration.icon} size="md" />}
                footer={(
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                    {integration.status}
                    <MetralyButton variant={integration.action === "Manage" ? "secondary" : "primary"} size="sm">
                      {integration.action}
                    </MetralyButton>
                  </div>
                )}
              >
                <div style={{ display: "grid", gap: 8 }}>
                  <div style={{ color: "var(--m-fg-2)", fontSize: "var(--m-fs-10)" }}>
                    Canonical card surface, compact density and action alignment from existing seams.
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <MetralyBadge variant="info">compact</MetralyBadge>
                    <MetralyBadge variant="info">operational</MetralyBadge>
                    <MetralyBadge variant="info">no custom API</MetralyBadge>
                  </div>
                </div>
              </MetralyCard>
            ))}
          </div>
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
