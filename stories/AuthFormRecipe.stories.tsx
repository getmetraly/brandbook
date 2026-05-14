import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  MetralyBadge,
  MetralyButton,
  MetralyCodeBlock,
  MetralyIcon,
  MetralyInput,
  MetralyPanel,
  ThemeProvider,
} from "@metraly/ui";

function AuthFormRecipe() {
  return (
    <ThemeProvider>
      <div
        style={{
          minHeight: 820,
          background:
            "radial-gradient(circle at top, color-mix(in oklab, var(--m-cyan-500) 10%, transparent), transparent 34%), var(--m-bg-0)",
          display: "grid",
          placeItems: "center",
          padding: 24,
        }}
      >
        <div style={{ width: "100%", maxWidth: 460, display: "grid", gap: 14 }}>
          <div style={{ display: "grid", gap: 6, justifyItems: "center", textAlign: "center" }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "var(--m-r-4)",
                border: "1px solid var(--m-line)",
                background: "linear-gradient(180deg, var(--m-bg-2), var(--m-bg-3))",
                display: "grid",
                placeItems: "center",
                color: "var(--m-cyan-500)",
              }}
            >
              <MetralyIcon name="lock" size="lg" />
            </div>
            <div style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-18)", fontWeight: 600 }}>Sign in to Metraly</div>
            <div style={{ color: "var(--m-fg-3)", maxWidth: 360 }}>
              Canonical auth recipe using existing panel, input, button and code seams only.
            </div>
          </div>

          <MetralyPanel padding="lg">
            <div style={{ display: "grid", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div style={{ display: "grid", gap: 4 }}>
                  <div style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-12)", fontWeight: 600 }}>Workspace login</div>
                  <div style={{ color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-9)" }}>
                    Operators and engineering leads
                  </div>
                </div>
                <MetralyBadge variant="success">live instance</MetralyBadge>
              </div>

              <MetralyInput
                fullWidth
                label="Email"
                type="email"
                placeholder="ops@metraly.dev"
                iconLeft={<MetralyIcon name="user" size="sm" />}
              />
              <MetralyInput
                fullWidth
                label="Password"
                type="password"
                placeholder="••••••••••••"
                iconLeft={<MetralyIcon name="lock" size="sm" />}
                description="Use SSO or a workspace-local account. No auth-only component needed here."
              />

              <MetralyButton variant="primary" fullWidth>
                Sign in
              </MetralyButton>

              <div style={{ display: "grid", gap: 8 }}>
                <div style={{ color: "var(--m-fg-2)", fontSize: "var(--m-fs-10)", fontWeight: 500 }}>
                  Self-host bootstrap
                </div>
                <MetralyCodeBlock accent="cyan">
                  {`npx @metraly/bootstrap login \
  --workspace acme-core \
  --env production`}
                </MetralyCodeBlock>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  flexWrap: "wrap",
                  paddingTop: 4,
                }}
              >
                <MetralyButton variant="neutral" size="sm">
                  Forgot password
                </MetralyButton>
                <div style={{ color: "var(--m-fg-3)", fontSize: "var(--m-fs-10)" }}>
                  Need help? Contact your workspace operator.
                </div>
              </div>
            </div>
          </MetralyPanel>
        </div>
      </div>
    </ThemeProvider>
  );
}

const meta: Meta<typeof AuthFormRecipe> = {
  title: "Patterns/Auth Form Recipe",
  component: AuthFormRecipe,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof AuthFormRecipe>;

export const Default: Story = {
  render: () => <AuthFormRecipe />,
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => <AuthFormRecipe />,
};
