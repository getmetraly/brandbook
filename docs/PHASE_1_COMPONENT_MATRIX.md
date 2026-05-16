# Phase 1 — Component matrix

| Component | Type | Target folder | Depends on | States covered | Stories | A11y notes | Migration risk |
|---|---|---|---|---|---|---|---|
| `MetralyGauge` | Chart primitive | `packages/ui/src/charts/` | `StateBlock`, `StatusBadge` | 12 | 12 + 3 widget-shell compositions + full matrix | `role="meter"`, `aria-valuemin/max/now/text`, optional `aria-describedby` | Low — only direct dep is `StateBlock`/`StatusBadge` API |
| `MetralyHeatmap` | Chart primitive | `packages/ui/src/charts/` | `StateBlock`, `StatusBadge`, `useRovingSelection` | 12 | 6 realistic datasets + 6 state + compact widget + mobile + matrix | `role="grid"`, per-cell `aria-label`, hidden text summary, roving focus | Medium — depends on `useRovingSelection` signature |
| `ActivityFeed` | Surface | `packages/ui/src/components/` | `CardShell`, `StateBlock`, `StatusBadge`, `MetralySkeleton` | 12 | feed, grouped (day, kind), compact widget, 6 state, matrix | Mono timestamps, button row when interactive, focus rings | Low |
| `InsightCard` | Surface | `packages/ui/src/components/` | `CardShell`, `StateBlock`, `StatusBadge` | 12 | rules, anomaly, source-health, AI, compact, 5 state, matrix | "AI generated" tag only on `source === "ai"`; confidence visible | Low |
| `StateBoard` | Surface | `packages/ui/src/components/` | `CardShell`, `StateBlock`, `StatusBadge` | 12 | source-health, services, plugins, 5 state, matrix | Status dots have shadow tint for "ok"; interactive tiles are buttons | Low |
| `WidgetStateMatrix` | Doc helper | `packages/ui/src/components/` | — | n/a | Gauge matrix, 3-column variant | Generic over enum; just a layout helper | None |
| `TokenInput` | Source primitive | `packages/ui/src/source/` | `FieldShell` | 5 token validations + committed/draft | empty, draft, validating, invalid, stored, rate-limited, provider, webhook | `aria-live` validation channel; reveal closes on blur; autocomplete off; password managers suppressed | Low |
| `PermissionExplainer` | Source primitive | `packages/ui/src/source/` | `CardShell`, `StatusBadge` | scope states: granted/missing/extra/deprecated/unknown | mixed, all-granted, all-required-missing, compact, jira-mixed | List semantics; missing-required scope summary chip | Low |
| `BackfillRangePicker` | Source primitive | `packages/ui/src/source/` | `FieldShell`, `StatusBadge` | preset / custom; estimate confidence | 7d / 30d / 90d-warning / custom / unknown | `radiogroup` preset row; `aria-live` estimate | Low |
| `ConnectionTestPanel` | Source primitive | `packages/ui/src/source/` | `CardShell`, `StatusBadge` | 8 test statuses | not-tested, testing, ready, auth_failed, permission_denied, rate_limited, source_unavailable, degraded | `aria-busy` during testing; check list has explicit `failed/passed/skipped` text | Low |
| `SyncProgressPanel` | Source primitive | `packages/ui/src/source/` | `CardShell`, `StatusBadge` | 9 stages | queued, discovering, backfilling, indeterminate, incremental, paused, rate-limited, failed, completed | `role="progressbar"` (hidden), `aria-busy` when active | Low |
| `SettingsSection` | Settings surface | `packages/ui/src/settings/` | `CardShell`, `StatusBadge` | n/a (composition) | basic, with-badge, with-audit, compact | Heading-level configurable; section labelled-by title id | None |
| `SettingsAuditRow` | Settings surface | `packages/ui/src/settings/` | — | n/a (composition) | shown inside SettingsSection story | Mono timestamps; collapses to single column on narrow viewports | None |
| `AIProviderConnectorCard` | Settings surface | `packages/ui/src/settings/` | `CardShell`, `StatusBadge`, `TokenInput` | 8 provider states | ready-anthropic, not-configured-openai, auth-failed, rate-limited, local, custom, disabled, gated, plugin-contributed | Plugin attribution surfaced explicitly; never copies token to clipboard | Low |
| `BYOLLMConnectorPanel` | Settings surface | `packages/ui/src/settings/` | `SettingsSection`, `AIProviderConnectorCard`, `StateBlock` | depends on children | nothing-configured, first-party-only, with-plugin, needs-attention | Section nav structure; empty-state CTA | Low |
| `DashboardWidgetExamples` | Recipe | `packages/ui/src/dashboard/` | `DashboardWidget` + new components | inherits 12 from each wrapped component | used in chart stories | Inherits chart a11y | Low |
| `MoveMenuA11yExample` | Recipe / scenario | `packages/ui/src/dashboard/` | `DashboardWidget`, `HandlePrimitive`, `MoveMenu` | n/a | default 3×3, 4×3, mobile | Arrow-key movement, `role="application"`, `aria-pressed` on selected tile, `aria-live` foot region | Medium — wires existing primitives |
| `DashboardWizardSplitBuilder` | Layout | `packages/ui/src/dashboard/` | `CardShell`, `StatusBadge`, `StateBlock` | preview states: preview/empty/loading/error | default, empty-template, review-step, locked-step | `aria-current="step"`, locked steps disabled, error text rendered under the step | Low |

---

## Coverage matrix at a glance

| Component | ready | loading | empty | partial | stale | rate_limited | auth_failed | source_disconnected | permission_denied | schema_mismatch | formula_invalid | error |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| MetralyGauge       | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| MetralyHeatmap     | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| ActivityFeed       | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| InsightCard        | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| StateBoard         | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| ConnectionTestPanel * | ✓ | ✓ | n/a | n/a | n/a | ✓ | ✓ | ✓ | ✓ | n/a | n/a | n/a |
| SyncProgressPanel * | ✓ | ✓ | n/a | ✓ | n/a | ✓ | n/a | n/a | n/a | n/a | n/a | ✓ |

\* ConnectionTestPanel and SyncProgressPanel use their own domain-specific status enums (8 and 9 values respectively). The 12-state WidgetState matrix maps to these via `PHASE_1_WIDGET_STATE_MATRIX.md`.
