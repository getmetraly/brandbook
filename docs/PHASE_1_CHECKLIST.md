# Phase 1 — Implementation pack checklist

Mark each item before handing the pack to the integration agent.

## Source files present

### Charts
- [x] `packages/ui/src/charts/MetralyGauge.tsx`
- [x] `packages/ui/src/charts/MetralyHeatmap.tsx`
- [x] `packages/ui/src/charts/index.ts` (Phase 1 additions only — merge with existing)

### Components
- [x] `packages/ui/src/components/ActivityFeed.tsx`
- [x] `packages/ui/src/components/InsightCard.tsx`
- [x] `packages/ui/src/components/StateBoard.tsx`
- [x] `packages/ui/src/components/WidgetStateMatrix.tsx`

### Source / connector primitives
- [x] `packages/ui/src/source/TokenInput.tsx`
- [x] `packages/ui/src/source/PermissionExplainer.tsx`
- [x] `packages/ui/src/source/BackfillRangePicker.tsx`
- [x] `packages/ui/src/source/ConnectionTestPanel.tsx`
- [x] `packages/ui/src/source/SyncProgressPanel.tsx`

### Settings
- [x] `packages/ui/src/settings/SettingsSection.tsx`
- [x] `packages/ui/src/settings/SettingsAuditRow.tsx`
- [x] `packages/ui/src/settings/AIProviderConnectorCard.tsx`
- [x] `packages/ui/src/settings/BYOLLMConnectorPanel.tsx`

### Dashboard
- [x] `packages/ui/src/dashboard/DashboardWidgetExamples.tsx`
- [x] `packages/ui/src/dashboard/MoveMenuA11yExample.tsx`
- [x] `packages/ui/src/dashboard/DashboardWizardSplitBuilder.tsx`

### Styles
- [x] `packages/ui/src/styles/metraly-gauge.css`
- [x] `packages/ui/src/styles/metraly-heatmap.css`
- [x] `packages/ui/src/styles/metraly-activity-feed.css`
- [x] `packages/ui/src/styles/metraly-insight-card.css`
- [x] `packages/ui/src/styles/metraly-state-board.css`
- [x] `packages/ui/src/styles/metraly-state-matrix.css`
- [x] `packages/ui/src/styles/metraly-source.css`
- [x] `packages/ui/src/styles/metraly-settings.css`
- [x] `packages/ui/src/styles/metraly-dashboard-wizard.css`

### Package index
- [x] `packages/ui/src/index.ts` (Phase 1 additions only — merge with existing)

## Storybook files present (16)
- [x] `site/stories/Charts/MetralyGauge.stories.tsx`
- [x] `site/stories/Charts/MetralyHeatmap.stories.tsx`
- [x] `site/stories/Components/ActivityFeed.stories.tsx`
- [x] `site/stories/Components/InsightCard.stories.tsx`
- [x] `site/stories/Components/StateBoard.stories.tsx`
- [x] `site/stories/Components/WidgetStateMatrix.stories.tsx`
- [x] `site/stories/Source/TokenInput.stories.tsx`
- [x] `site/stories/Source/PermissionExplainer.stories.tsx`
- [x] `site/stories/Source/BackfillRangePicker.stories.tsx`
- [x] `site/stories/Source/ConnectionTestPanel.stories.tsx`
- [x] `site/stories/Source/SyncProgressPanel.stories.tsx`
- [x] `site/stories/Settings/SettingsSection.stories.tsx`
- [x] `site/stories/Settings/AIProviderConnectorCard.stories.tsx`
- [x] `site/stories/Settings/BYOLLMConnectorPanel.stories.tsx`
- [x] `site/stories/Dashboard/DashboardWizardSplitBuilder.stories.tsx`
- [x] `site/stories/Dashboard/MoveMenuA11yExample.stories.tsx`

## Docs present (5)
- [x] `docs/PHASE_1_IMPLEMENTATION_NOTES.md`
- [x] `docs/PHASE_1_COMPONENT_MATRIX.md`
- [x] `docs/PHASE_1_WIDGET_STATE_MATRIX.md`
- [x] `docs/PHASE_1_MIGRATION_NOTES.md`
- [x] `docs/PHASE_1_VALIDATION.md`
- [x] `CHECKLIST.md` (this file)

## Acceptance criteria (from the brief)

- [x] `MetralyGauge` is a reusable chart primitive (under `charts/`, not under `dashboard/`).
- [x] `MetralyHeatmap` is a reusable chart primitive (under `charts/`).
- [x] Both have widget-shell composition stories (`InsideDashboardWidget`, `CompactDashboardWidget`) and recipes in `DashboardWidgetExamples`.
- [x] Both render every state in the 12-state `WidgetStateStatus` matrix (`FullStateMatrix` story per component + dedicated `WidgetStateMatrix` component).
- [x] `ActivityFeed`, `InsightCard`, `StateBoard` implemented as reusable brandbook components.
- [x] Source primitives implemented with token secrecy (`TokenInput`) and permission clarity (`PermissionExplainer`).
- [x] BYO LLM appears only under Settings → AI Provider Connectors (`BYOLLMConnectorPanel`).
- [x] AI plugin provider cards live inside the same panel, tagged "via Plugin", not as marketplace decoration.
- [x] Plugin Marketplace is hidden for ineligible workspaces — no disabled teaser UI exists in this pack.
- [x] `MoveMenu` keyboard fallback story exists (`MoveMenuA11yExample`) and proves non-drag movement.
- [x] No new brand colors introduced (only existing `--m-*` tokens used).
- [x] Light theme not made a blocker (P3, per the approved plan).
- [x] No production claims introduced (component copy uses sentence case + factual descriptions).
- [x] Full TSX, CSS, stories, docs, export plan and this checklist delivered.
