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
          minHeight: "100dvh",
          background:
            "radial-gradient(circle at top, color-mix(in oklab, var(--m-cyan-500) 8%, transparent), transparent 32%), var(--m-bg-0)",
          display: "grid",
          placeItems: "center",
          padding: "clamp(12px, 4vw, 24px)",
          overflowX: "hidden",
        }}
      >
        <div style={{ width: "min(100%, 430px)", display: "grid", gap: 12 }}>
          <div style={{ display: "grid", gap: 6, justifyItems: "center", textAlign: "center" }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "var(--m-r-3)",
                border: "1px solid var(--m-line)",
                background: "linear-gradient(180deg, var(--m-bg-2), var(--m-bg-3))",
                display: "grid",
                placeItems: "center",
                color: "var(--m-cyan-500)",
              }}
            >
              <MetralyIcon name="lock" size="md" />
            </div>
            <div style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-16)", fontWeight: 600 }}>Sign in to Metraly</div>
            <div style={{ color: "var(--m-fg-3)", maxWidth: 340, fontSize: "var(--m-fs-11)", lineHeight: 1.4 }}>
              Canonical auth recipe using existing panel, input, button and code seams only.
            </div>
          </div>

          <MetralyPanel padding="md">
            <div style={{ display: "grid", gap: 12, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                <div style={{ display: "grid", gap: 3, minWidth: 0 }}>
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
                <div style={{ display: "grid", gap: 10, minWidth: 0 }}>
                  <MetralyButton variant="primary" fullWidth iconLeft={<MetralyIcon name="lock" size="sm" />} loading={isLoading}>
                    Continue with SSO
                  </MetralyButton>
                  <div style={{ color: "var(--m-fg-3)", fontSize: "var(--m-fs-10)", lineHeight: 1.45 }}>
                    Redirects to the configured identity provider for this workspace.
                  </div>
                </div>
              ) : (
                <div style={{ display: "grid", gap: 10, minWidth: 0 }}>
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
                    description={!isError ? "Use SSO or a workspace-local account." : undefined}
                  />

                  <MetralyButton variant="primary" fullWidth loading={isLoading}>
                    Sign in
                  </MetralyButton>
                </div>
              )}

              <div style={{ display: "grid", gap: 6, minWidth: 0 }}>
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
                  gap: 10,
                  flexWrap: "wrap",
                  paddingTop: 2,
                }}
              >
                <MetralyButton variant="neutral" size="sm">
                  Forgot password
                </MetralyButton>
                <div style={{ color: "var(--m-fg-3)", fontSize: "var(--m-fs-10)", lineHeight: 1.4 }}>
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
