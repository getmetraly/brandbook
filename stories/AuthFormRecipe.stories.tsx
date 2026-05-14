import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  MetralyBadge,
  MetralyButton,
  MetralyCodeBlock,
  MetralyIcon,
  MetralyInput,
  MetralyPanel,
  MetralySegmentedControl,
  ThemeProvider,
} from "@metraly/ui";

type AuthState = "default" | "loading" | "error" | "sso";

function AuthFormRecipe({ state = "default" }: { state?: AuthState }) {
  const [method, setMethod] = React.useState(state === "sso" ? "sso" : "local");
  const isLoading = state === "loading";
  const isError = state === "error";

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
                <MetralyBadge variant={isError ? "warning" : "success"}>{isError ? "attention" : "live instance"}</MetralyBadge>
              </div>

              <MetralySegmentedControl
                ariaLabel="Authentication method"
                fullWidth
                value={method}
                onValueChange={setMethod}
                options={[
                  { value: "local", label: "Workspace account" },
                  { value: "sso", label: "SSO" },
                ]}
              />

              {method === "sso" ? (
                <div style={{ display: "grid", gap: 10 }}>
                  <MetralyButton variant="primary" fullWidth iconLeft={<MetralyIcon name="lock" size="sm" />} loading={isLoading}>
                    Continue with SSO
                  </MetralyButton>
                  <div style={{ color: "var(--m-fg-3)", fontSize: "var(--m-fs-10)", lineHeight: 1.45 }}>
                    Redirects to the configured identity provider for this workspace.
                  </div>
                </div>
              ) : (
                <>
                  <MetralyInput
                    fullWidth
                    label="Email"
                    type="email"
                    placeholder="ops@metraly.dev"
                    iconLeft={<MetralyIcon name="user" size="sm" />}
                    error={isError ? "No workspace account exists for this email" : undefined}
                  />
                  <MetralyInput
                    fullWidth
                    label="Password"
                    type="password"
                    placeholder="••••••••••••"
                    iconLeft={<MetralyIcon name="lock" size="sm" />}
                    error={isError ? "Password did not match" : undefined}
                    description={!isError ? "Use SSO or a workspace-local account. No auth-only component needed here." : undefined}
                  />

                  <MetralyButton variant="primary" fullWidth loading={isLoading}>
                    Sign in
                  </MetralyButton>
                </>
              )}

              <div style={{ display: "grid", gap: 8 }}>
                <div style={{ color: "var(--m-fg-2)", fontSize: "var(--m-fs-10)", fontWeight: 500 }}>
                  Self-host bootstrap
                </div>
                <MetralyCodeBlock accent="primary">
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

export const Loading: Story = {
  render: () => <AuthFormRecipe state="loading" />,
};

export const InvalidCredentials: Story = {
  render: () => <AuthFormRecipe state="error" />,
};

export const Sso: Story = {
  render: () => <AuthFormRecipe state="sso" />,
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => <AuthFormRecipe />,
};
