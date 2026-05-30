# Component Inventory

Every public surface exported from `@metraly/ui` (`packages/ui/src/index.ts` and the
per-area `index.ts` barrels). `Exported` = reachable from the package root. `CSS` =
the stylesheet that owns its `metraly-*` classes (all `@import`ed by
`styles/metraly-ui.css`).

## Foundations (structure / state / a11y owners)

| Component | Path | Exported | CSS |
| --- | --- | :--: | --- |
| `CardShell` | `components/CardShell.tsx` | ✅ | `metraly-card.css` |
| `FieldShell`, `FieldCopy` | `components/FieldShell.tsx` | ✅ | `metraly-forms.css` |
| `OverlayShell` | `shell/OverlayShell.tsx` | ✅ | `metraly-shell.css` |
| `StateBlock` | `components/StateBlock.tsx` | ✅ | `metraly-empty-state.css` |
| `NavigationItemFrame` | `components/NavigationItemFrame.tsx` | ✅ | `metraly-navigation-tree.css` |
| `HandlePrimitive` | `dashboard/HandlePrimitive.tsx` | ✅ | `metraly-dashboard.css` |
| `useRovingSelection` (hook) | `components/useRovingSelection.ts` | ✅ | — |
| `MetralyPanel` | `components/MetralyPanel.tsx` | ✅ | `metraly-theme.css` (`.metraly-panel`) |

## Core primitives & controls

| Component | Path | Exported | CSS |
| --- | --- | :--: | --- |
| `MetralyButton` | `components/MetralyButton.tsx` | ✅ | `metraly-button.css` |
| `MetralyInput` | `components/MetralyInput.tsx` | ✅ | `metraly-input.css` |
| `MetralyIcon` (+ `metralyIconPaths`) | `components/MetralyIcon.tsx` | ✅ | — (inline SVG) |
| `MetralyLogo` | `components/MetralyLogo.tsx` | ✅ | `metraly-logo.css` |
| `MetralyCheckbox` | `components/MetralyCheckbox.tsx` | ✅ | `metraly-forms.css` |
| `MetralyRadio` | `components/MetralyRadio.tsx` | ✅ | `metraly-forms.css` |
| `MetralySwitch` | `components/MetralySwitch.tsx` | ✅ | `metraly-forms.css` |
| `MetralySelect` | `components/MetralySelect.tsx` | ✅ | `metraly-forms.css` |
| `MetralyTabs` | `components/MetralyTabs.tsx` | ✅ | `metraly-segmented.css` |
| `MetralySegmentedControl` | `components/MetralySegmentedControl.tsx` | ✅ | `metraly-segmented.css` |
| `MetralyFilterBar` | `components/MetralyFilterBar.tsx` | ✅ | `metraly-filter-bar.css` |
| `MetralyCodeBlock` | `components/MetralyCodeBlock.tsx` | ✅ | `metraly-code-block.css` |
| `MetralySkeleton` | `components/MetralySkeleton.tsx` | ✅ | `metraly-skeleton.css` |
| `MetralyEmptyState` | `components/MetralyEmptyState.tsx` | ✅ | `metraly-empty-state.css` |
| `MetralyNavigationTree` | `components/MetralyNavigationTree.tsx` | ✅ | `metraly-navigation-tree.css` |
| `MetralyTelemetryLine` | `components/MetralyTelemetryLine.tsx` | ✅ | `metraly-pulse-marker.css` |
| `PulseMarker` | `components/PulseMarker.tsx` | ✅ | `metraly-pulse-marker.css` |
| `ThemeProvider` / `MetralyThemeProvider` | `components/ThemeProvider.tsx` | ✅ | `metraly-theme.css` |

## Badges & status

| Component | Path | Exported | CSS |
| --- | --- | :--: | --- |
| `MetralyBadge` | `components/MetralyBadge.tsx` | ✅ | `metraly-badge.css` |
| `StateBadge` | `components/StateBadge.tsx` | ✅ | `metraly-state-badge.css` |
| `StatusBadge` | `components/StatusBadge.tsx` | ✅ | `metraly-state-badge.css` |
| `TrendBadge` | `components/TrendBadge.tsx` | ✅ | `metraly-trend-badge.css` |
| `PermissionBadge` | `components/PermissionBadge.tsx` | ✅ | `metraly-state-badge.css` |

## Cards & data display

| Component | Path | Exported | CSS |
| --- | --- | :--: | --- |
| `MetralyCard` | `components/MetralyCard.tsx` | ✅ | `metraly-card.css` |
| `MetralyMetricCard` | `components/MetralyMetricCard.tsx` | ✅ | `metraly-metric-card.css` |
| `MetralyTable` | `components/MetralyTable.tsx` | ✅ | `metraly-table.css` |
| `ActivityFeed` | `components/ActivityFeed.tsx` | ✅ | `metraly-activity-feed.css` |
| `InsightCard` | `components/InsightCard.tsx` | ✅ | `metraly-insight-card.css` |
| `StateBoard` | `components/StateBoard.tsx` | ✅ | `metraly-state-board.css` |
| `WidgetStateMatrix` | `components/WidgetStateMatrix.tsx` | ✅ | `metraly-state-matrix.css` |
| `WidgetPickerCard` / `WidgetPickerList` (alias `WidgetCatalogCard` / `…List`) | `components/WidgetPickerCard.tsx` | ✅ | `metraly-widget-picker.css` |

## Charts

| Component | Path | Exported | CSS |
| --- | --- | :--: | --- |
| `MetralyAreaChart` | `charts/MetralyAreaChart.tsx` | via `charts/index.ts` | `metraly-charts.css` |
| `MetralyBarChart` | `charts/MetralyBarChart.tsx` | via `charts/index.ts` | `metraly-charts.css` |
| `MetralyLineChart` | `charts/MetralyLineChart.tsx` | via `charts/index.ts` | `metraly-charts.css` |
| `MetralyComposedChart` | `charts/MetralyComposedChart.tsx` | via `charts/index.ts` | `metraly-charts.css` |
| `MetralyChartCard` | `charts/MetralyChartCard.tsx` | via `charts/index.ts` | `metraly-charts.css` |
| `MetralyChartTooltip` | `charts/MetralyChartTooltip.tsx` | via `charts/index.ts` | `metraly-charts.css` |
| `MetralySparkline` | `charts/MetralySparkline.tsx` | via `charts/index.ts` | `metraly-charts.css` |
| `MetralyGauge` | `charts/MetralyGauge.tsx` | ✅ | `metraly-gauge.css` |
| `MetralyHeatmap` | `charts/MetralyHeatmap.tsx` | ✅ | `metraly-heatmap.css` |

## Shell

| Component | Path | Exported | CSS |
| --- | --- | :--: | --- |
| `MetralyShell` | `shell/MetralyShell.tsx` | ✅ | `metraly-shell.css` |
| `MetralySidebar` (+ `Section`, `Item`) | `shell/MetralySidebar.tsx` | ✅ | `metraly-shell.css` |
| `MetralyTopbar` | `shell/MetralyTopbar.tsx` | ✅ | `metraly-shell.css` |
| `MetralyDrawer` | `shell/MetralyDrawer.tsx` | ✅ | `metraly-shell.css` |
| `MetralyBottomSheet` | `shell/MetralyBottomSheet.tsx` | ✅ | `metraly-shell.css` |

## Dashboard

| Component | Path | Exported | CSS |
| --- | --- | :--: | --- |
| `DashboardGrid` | `dashboard/DashboardGrid.tsx` | ✅ | `metraly-dashboard.css` |
| `DashboardWidget` | `dashboard/DashboardWidget.tsx` | ✅ | `metraly-widget-shell.css` |
| `DashboardToolbar` | `dashboard/DashboardToolbar.tsx` | ✅ | `metraly-dashboard.css` |
| `DashboardEmptyState` | `dashboard/DashboardEmptyState.tsx` | ✅ | `metraly-dashboard.css` |
| `DashboardDropZone` | `dashboard/DashboardDropZone.tsx` | ✅ | `metraly-dashboard.css` |
| `DashboardResizeHandle` | `dashboard/DashboardResizeHandle.tsx` | ✅ | `metraly-dashboard.css` |
| `MoveMenu` | `dashboard/MoveMenu.tsx` | ✅ | `metraly-move-menu.css` |
| `WidgetRegistry` helpers | `dashboard/WidgetRegistry.ts` | ✅ | — |
| `DashboardWidgetExamples` | `dashboard/DashboardWidgetExamples.tsx` | ✅ | `metraly-dashboard.css` |
| `DashboardWizardSplitBuilder` | `dashboard/DashboardWizardSplitBuilder.tsx` | ✅ | `metraly-dashboard-wizard.css` |
| `MoveMenuA11yExample` | `dashboard/MoveMenuA11yExample.tsx` | ✅ | `metraly-move-menu.css` |

> **`WidgetShell`** is not a separate export by design — a dashboard widget shell is
> `CardShell` styled by `metraly-widget-shell.css`. See `component-model.md`.

## Wizard

| Component | Path | Exported | CSS |
| --- | --- | :--: | --- |
| `WizardLayout` | `wizard/WizardLayout.tsx` | ✅ | `metraly-wizard.css` |
| `StepRail` | `wizard/StepRail.tsx` | ✅ | `metraly-wizard.css` |
| `ReviewPanel` | `wizard/ReviewPanel.tsx` | ✅ | `metraly-wizard.css` |
| `StickyWizardFooter` | `wizard/StickyWizardFooter.tsx` | ✅ | `metraly-wizard.css` |

## Source / connector primitives

| Component | Path | Exported | CSS |
| --- | --- | :--: | --- |
| `TokenInput` | `source/TokenInput.tsx` | ✅ | `metraly-source.css` |
| `PermissionExplainer` | `source/PermissionExplainer.tsx` | ✅ | `metraly-source.css` |
| `BackfillRangePicker` | `source/BackfillRangePicker.tsx` | ✅ | `metraly-source.css` |
| `ConnectionTestPanel` | `source/ConnectionTestPanel.tsx` | ✅ | `metraly-source.css` |
| `SyncProgressPanel` | `source/SyncProgressPanel.tsx` | ✅ | `metraly-source.css` |

## Settings

| Component | Path | Exported | CSS |
| --- | --- | :--: | --- |
| `SettingsSection` | `settings/SettingsSection.tsx` | ✅ | `metraly-settings.css` |
| `SettingsAuditRow` | `settings/SettingsAuditRow.tsx` | ✅ | `metraly-settings.css` |
| `AIProviderConnectorCard` | `settings/AIProviderConnectorCard.tsx` | ✅ | `metraly-settings.css` |
| `BYOLLMConnectorPanel` | `settings/BYOLLMConnectorPanel.tsx` | ✅ | `metraly-settings.css` |

## AI Workspace (Phase 9)

| Component | Path | Exported | CSS |
| --- | --- | :--: | --- |
| `AnswerCard` | `components/AnswerCard.tsx` | ✅ | `metraly-ai-workspace.css` |
| `EvidencePanel` | `components/EvidencePanel.tsx` | ✅ | `metraly-ai-workspace.css` |
| `TraceDrawer` | `components/TraceDrawer.tsx` | ✅ | `metraly-ai-workspace.css` |
| `AIWorkspaceLayout` | `components/AIWorkspaceLayout.tsx` | ✅ | `metraly-ai-workspace.css` |

## Plugins (Phase 9)

| Component | Path | Exported | CSS |
| --- | --- | :--: | --- |
| `PluginCatalog` | `components/PluginCatalog.tsx` | ✅ | `metraly-plugins.css` |
| `PluginReviewDrawer` | `components/PluginReviewDrawer.tsx` | ✅ | `metraly-plugins.css` |
| `SigningBanner` | `components/SigningBanner.tsx` | ✅ | `metraly-state-badge.css` |

## App Kit (screen-level compositions)

| Component | Path | Exported | CSS |
| --- | --- | :--: | --- |
| `AppSidebar` | `app-kit/AppSidebar.tsx` | ✅ | `metraly-app-kit.css` |
| `AppTopbar` | `app-kit/AppTopbar.tsx` | ✅ | `metraly-app-kit.css` |
| `AppWidget` (+ `AppSparkline`, `AppMetric`, `AppMetricDelta`) | `app-kit/AppWidget.tsx` | ✅ | `metraly-app-kit.css` |
| `AppMetricStrip` | `app-kit/AppMetricStrip.tsx` | ✅ | `metraly-app-kit.css` |
| `AppDashboardScreen` | `app-kit/AppDashboardScreen.tsx` | ✅ | `metraly-app-kit.css` |
| `AppAIWorkspaceScreen` | `app-kit/AppAIWorkspaceScreen.tsx` | ✅ | `metraly-app-kit.css` |
| `AppPluginsScreen` | `app-kit/AppPluginsScreen.tsx` | ✅ | `metraly-app-kit.css` |
| `AppConnectorWizardScreen` | `app-kit/AppConnectorWizardScreen.tsx` | ✅ | `metraly-app-kit.css` |
| `AppIconLibrary` | `app-kit/AppIconLibrary.tsx` | ✅ | `metraly-app-kit.css` |

---

**Totals:** 9 chart components, 5 shell, 11 dashboard, 4 wizard, 5 source, 4 settings,
4 AI-workspace, 3 plugins, 9 app-kit, plus ~40 primitives/foundations/controls/badges.
All export paths in `index.ts` and the per-area barrels resolve to existing files
(verified by path-resolution sweep — see `v2-readiness-report.md`).
