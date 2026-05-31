export { MetralyBadge } from "./components/MetralyBadge";
export type { MetralyBadgeProps, MetralyBadgeVariant } from "./components/MetralyBadge";

export { MetralyButton } from "./components/MetralyButton";
export type { MetralyButtonProps, MetralyButtonVariant, MetralyButtonSize } from "./components/MetralyButton";

export { MetralyInput } from "./components/MetralyInput";
export type { MetralyInputProps } from "./components/MetralyInput";

export { MetralyIcon, metralyIconPaths } from "./components/MetralyIcon";
export { metralyIconSizeMap } from "./components/MetralyIcon";
export type { MetralyIconName, MetralyIconProps, MetralyIconSize } from "./components/MetralyIcon";

export { FieldShell, FieldCopy } from "./components/FieldShell";
export type { FieldCopyProps, FieldShellContext, FieldShellElement, FieldShellLayout, FieldShellProps, FieldShellState } from "./components/FieldShell";

export { StateBlock } from "./components/StateBlock";
export type { StateBlockAlign, StateBlockDensity, StateBlockProps, StateBlockVariant } from "./components/StateBlock";

export { NavigationItemFrame } from "./components/NavigationItemFrame";
export type { NavigationItemFrameAs, NavigationItemFrameProps, NavigationItemFrameTone } from "./components/NavigationItemFrame";

export { useRovingSelection } from "./components/useRovingSelection";
export type { RovingSelectionItem, RovingSelectionMode, UseRovingSelectionOptions } from "./components/useRovingSelection";

export { CardShell } from "./components/CardShell";
export type { CardShellDensity, CardShellProps, CardShellState, CardShellTone } from "./components/CardShell";

export { MetralyCard } from "./components/MetralyCard";
export type { MetralyCardDensity, MetralyCardProps, MetralyCardState } from "./components/MetralyCard";

export { MetralyLogo } from "./components/MetralyLogo";

export { MetralyMetricCard } from "./components/MetralyMetricCard";
export type {
  MetralyMetricCardDensity,
  MetralyMetricCardProps,
  MetralyMetricCardVariant,
} from "./components/MetralyMetricCard";

export { MetralyPanel } from "./components/MetralyPanel";
export type { MetralyPanelPadding, MetralyPanelProps } from "./components/MetralyPanel";

export { MetralyTable } from "./components/MetralyTable";
export type { MetralyTableColumn, MetralyTableProps, MetralyTableRowMarker } from "./components/MetralyTable";

export { MetralyTelemetryLine } from "./components/MetralyTelemetryLine";
export type { MetralyTelemetryLineProps } from "./components/MetralyTelemetryLine";

export { ThemeProvider, MetralyThemeProvider } from "./components/ThemeProvider";
export type { ThemeMode, ThemeProviderProps } from "./components/ThemeProvider";

export { StateBadge } from "./components/StateBadge";
export type { StateBadgeProps, StateBadgeSize, StateBadgeState, StateBadgeTone } from "./components/StateBadge";

export { StatusBadge } from "./components/StatusBadge";
export type { StatusBadgeProps, StatusBadgeStatus } from "./components/StatusBadge";

export { TrendBadge } from "./components/TrendBadge";
export type {
  TrendBadgeDirection,
  TrendBadgeProps,
  TrendBadgeSentiment,
  TrendBadgeSize,
} from "./components/TrendBadge";

export { PulseMarker } from "./components/PulseMarker";
export type {
  PulseMarkerProps,
  PulseMarkerSize,
  PulseMarkerTone,
  PulseMarkerVariant,
} from "./components/PulseMarker";

export { MetralySkeleton } from "./components/MetralySkeleton";
export type { MetralySkeletonProps, MetralySkeletonVariant } from "./components/MetralySkeleton";

export { MetralyEmptyState } from "./components/MetralyEmptyState";
export type { MetralyEmptyStateProps, MetralyEmptyStateVariant } from "./components/MetralyEmptyState";

export { MetralyFilterBar } from "./components/MetralyFilterBar";
export type { MetralyFilterBarItem, MetralyFilterBarProps } from "./components/MetralyFilterBar";

export { MetralyCheckbox } from "./components/MetralyCheckbox";
export type { MetralyCheckboxProps } from "./components/MetralyCheckbox";

export { MetralyRadio } from "./components/MetralyRadio";
export type { MetralyRadioProps } from "./components/MetralyRadio";

export { MetralySwitch } from "./components/MetralySwitch";
export type { MetralySwitchProps } from "./components/MetralySwitch";

export { MetralySelect } from "./components/MetralySelect";
export type { MetralySelectOption, MetralySelectProps } from "./components/MetralySelect";

export { MetralyTabs } from "./components/MetralyTabs";
export type { MetralyTabItem, MetralyTabsProps } from "./components/MetralyTabs";

export { MetralySegmentedControl } from "./components/MetralySegmentedControl";
export type {
  MetralySegmentedControlOption,
  MetralySegmentedControlProps,
  MetralySegmentedControlSize,
} from "./components/MetralySegmentedControl";

export { MetralyNavigationTree } from "./components/MetralyNavigationTree";
export type {
  MetralyNavigationTreeItem,
  MetralyNavigationTreeProps,
  MetralyNavigationTreeTone,
} from "./components/MetralyNavigationTree";

export { MetralyCodeBlock } from "./components/MetralyCodeBlock";
export type {
  MetralyCodeBlockAccent,
  MetralyCodeBlockProps,
  MetralyCodeBlockVariant,
} from "./components/MetralyCodeBlock";

export { MetralyShell } from "./shell/MetralyShell";
export type { MetralyShellProps } from "./shell/MetralyShell";

export { MetralySidebar, MetralySidebarSection, MetralySidebarItem } from "./shell/MetralySidebar";
export type {
  MetralySidebarProps,
  MetralySidebarSectionProps,
  MetralySidebarItemProps,
} from "./shell/MetralySidebar";

export { MetralyTopbar } from "./shell/MetralyTopbar";
export type { MetralyTopbarDensity, MetralyTopbarProps } from "./shell/MetralyTopbar";

export { MetralyDrawer } from "./shell/MetralyDrawer";
export type { MetralyDrawerProps, MetralyDrawerSide } from "./shell/MetralyDrawer";

export { MetralyBottomSheet } from "./shell/MetralyBottomSheet";
export type { MetralyBottomSheetProps } from "./shell/MetralyBottomSheet";

export { OverlayShell } from "./shell/OverlayShell";
export type { OverlayShellPlacement, OverlayShellProps } from "./shell/OverlayShell";

export { WidgetPickerCard, WidgetPickerList } from "./components/WidgetPickerCard";
export type { WidgetPickerCardProps, WidgetPickerListProps } from "./components/WidgetPickerCard";
 
 // Semantic alias — preferred name when building catalog UIs
 export { WidgetPickerCard as WidgetCatalogCard, WidgetPickerList as WidgetCatalogList } from "./components/WidgetPickerCard";
 export type { WidgetPickerCardProps as WidgetCatalogCardProps, WidgetPickerListProps as WidgetCatalogListProps } from "./components/WidgetPickerCard";

export { DashboardGrid } from "./dashboard/DashboardGrid";
export type { DashboardGridProps } from "./dashboard/DashboardGrid";

export { DashboardWidget } from "./dashboard/DashboardWidget";
export type { DashboardWidgetProps } from "./dashboard/DashboardWidget";

export { DashboardToolbar } from "./dashboard/DashboardToolbar";
export type { DashboardToolbarProps } from "./dashboard/DashboardToolbar";

export { DashboardEmptyState } from "./dashboard/DashboardEmptyState";
export type { DashboardEmptyStateProps } from "./dashboard/DashboardEmptyState";

export { DashboardDropZone } from "./dashboard/DashboardDropZone";
export type { DashboardDropZoneProps } from "./dashboard/DashboardDropZone";

export { DashboardResizeHandle } from "./dashboard/DashboardResizeHandle";
export { dashboardResizeHandleDirections } from "./dashboard/DashboardResizeHandle";
export type {
  DashboardResizeHandleDirection,
  DashboardResizeHandleProps,
} from "./dashboard/DashboardResizeHandle";

export { MoveMenu } from "./dashboard/MoveMenu";
export type { MoveMenuDirection, MoveMenuProps } from "./dashboard/MoveMenu";

export { HandlePrimitive } from "./dashboard/HandlePrimitive";
export type { HandlePrimitiveKind, HandlePrimitiveProps, HandlePrimitiveState } from "./dashboard/HandlePrimitive";

export { WizardLayout } from "./wizard/WizardLayout";
export type {
  WizardLayoutProgressPlacement,
  WizardLayoutProps,
  WizardLayoutStep,
  WizardLayoutStepStatus,
} from "./wizard/WizardLayout";

export { StepRail } from "./wizard/StepRail";
export type {
  StepRailOrientation,
  StepRailProps,
  StepRailStep,
  StepRailStepStatus,
} from "./wizard/StepRail";

export { ReviewPanel } from "./wizard/ReviewPanel";
export type { ReviewPanelItem, ReviewPanelProps } from "./wizard/ReviewPanel";

export { StickyWizardFooter } from "./wizard/StickyWizardFooter";
export type { StickyWizardFooterProps } from "./wizard/StickyWizardFooter";

export { defaultDashboardWidgetRegistry, findDashboardWidgetDefinition, createDashboardWidgetInstance } from "./dashboard/WidgetRegistry";
export type {
  DashboardLayoutItem,
  DashboardWidgetDefinition,
  DashboardWidgetInstance,
  DashboardWidgetSize,
} from "./dashboard/types";

// ── AI Workspace (Phase 9) ────────────────────────────────────────────────────
export type { EvidenceCitation, AnswerCardProps } from "./components/AnswerCard";
export { AnswerCard } from "./components/AnswerCard";
export type { EvidencePanelProps } from "./components/EvidencePanel";
export { EvidencePanel } from "./components/EvidencePanel";
export type { TraceStep, TraceStepStatus, TraceDrawerProps } from "./components/TraceDrawer";
export { TraceDrawer } from "./components/TraceDrawer";
export type { ChatMessage, AIWorkspaceLayoutProps } from "./components/AIWorkspaceLayout";
export { AIWorkspaceLayout } from "./components/AIWorkspaceLayout";
// ── Plugins (Phase 9) ─────────────────────────────────────────────────────────
export type { PermissionLevel, PermissionBadgeProps } from "./components/PermissionBadge";
export { PermissionBadge } from "./components/PermissionBadge";
export type { SigningStatus, SigningBannerProps } from "./components/SigningBanner";
export { SigningBanner } from "./components/SigningBanner";
export type { Plugin, PluginCatalogProps } from "./components/PluginCatalog";
export { PluginCatalog } from "./components/PluginCatalog";
export type { PluginPermission, PluginReviewDrawerProps } from "./components/PluginReviewDrawer";
export { PluginReviewDrawer } from "./components/PluginReviewDrawer";

// ── Phase 1 System Design Extensions ────────────────────────────────────────
export { MetralyGauge } from "./charts/MetralyGauge";
export type {
  MetralyGaugeProps,
  MetralyGaugeState,
  MetralyGaugeTone,
  MetralyGaugeVariant,
  MetralyGaugeThreshold,
} from "./charts/MetralyGauge";

export { MetralyHeatmap } from "./charts/MetralyHeatmap";
export type {
  MetralyHeatmapProps,
  MetralyHeatmapState,
  MetralyHeatmapCell,
  MetralyHeatmapCellStatus,
  MetralyHeatmapDensity,
  MetralyHeatmapLegend,
  MetralyHeatmapRamp,
  MetralyHeatmapValueVisibility,
  MetralyHeatmapTooltipMode,
  MetralyHeatmapTooltipContext,
  MetralyHeatmapColorScale,
} from "./charts/MetralyHeatmap";

export { ActivityFeed } from "./components/ActivityFeed";
export type {
  ActivityFeedProps,
  ActivityFeedState,
  ActivityItem,
  ActivityKind,
  ActivitySeverity,
} from "./components/ActivityFeed";

export { InsightCard } from "./components/InsightCard";
export type {
  InsightCardProps,
  InsightState,
  InsightTone,
  InsightSource,
  InsightConfidence,
  InsightEvidence,
  InsightAction,
} from "./components/InsightCard";

export { StateBoard } from "./components/StateBoard";
export type {
  StateBoardProps,
  StateBoardState,
  StateBoardItem,
  StateBoardItemStatus,
} from "./components/StateBoard";

export { WidgetStateMatrix, WIDGET_STATE_ORDER } from "./components/WidgetStateMatrix";
export type { WidgetStateMatrixProps, WidgetStateStatus } from "./components/WidgetStateMatrix";

export { TokenInput } from "./source/TokenInput";
export type { TokenInputProps, TokenKind, TokenValidationStatus } from "./source/TokenInput";

export { PermissionExplainer } from "./source/PermissionExplainer";
export type { PermissionExplainerProps, PermissionScope, ScopeRequirement, ScopeState } from "./source/PermissionExplainer";

export { BackfillRangePicker } from "./source/BackfillRangePicker";
export type { BackfillRangePickerProps, BackfillPresetId, BackfillEstimate, EstimateConfidence } from "./source/BackfillRangePicker";

export { AIInsightCard } from "./components/AIInsightCard";
export type { AIInsightCardProps } from "./components/AIInsightCard";

export { InlineInsight } from "./components/InlineInsight";
export type { InlineInsightProps } from "./components/InlineInsight";

export { Leaderboard } from "./components/Leaderboard";
export type { LeaderboardProps, LeaderboardItem } from "./components/Leaderboard";

export { ConnectionTestPanel } from "./source/ConnectionTestPanel";
export type { ConnectionTestPanelProps, ConnectionTestStatus, ConnectionCheck } from "./source/ConnectionTestPanel";

export { SyncProgressPanel } from "./source/SyncProgressPanel";
export type { SyncProgressPanelProps, SyncStage } from "./source/SyncProgressPanel";

export { SettingsSection } from "./settings/SettingsSection";
export type { SettingsSectionProps } from "./settings/SettingsSection";

export { SettingsAuditRow } from "./settings/SettingsAuditRow";
export type { SettingsAuditRowProps, SettingsAuditAction } from "./settings/SettingsAuditRow";

export { AIProviderConnectorCard } from "./settings/AIProviderConnectorCard";
export type {
  AIProviderConnectorCardProps,
  AIProviderKind,
  AIProviderState,
  AIProviderModel,
  AIProviderPluginAttribution,
} from "./settings/AIProviderConnectorCard";

export { BYOLLMConnectorPanel } from "./settings/BYOLLMConnectorPanel";
export type { BYOLLMConnectorPanelProps, BYOLLMProviderEntry } from "./settings/BYOLLMConnectorPanel";

// ── Fixtures / documentation examples (not design-system primitives) ─────────
// These are provided for Storybook and integration demos. Do not use them in
// production application code — they may change without a semver bump.
export {
  GaugeWidgetExample,
  HeatmapWidgetExample,
  ActivityWidgetExample,
  InsightWidgetExample,
  StateBoardWidgetExample,
} from "./dashboard/DashboardWidgetExamples";

// Keyboard accessibility demonstration fixture — not a production primitive.
export { MoveMenuA11yExample } from "./dashboard/MoveMenuA11yExample";
export type { MoveMenuA11yExampleProps, MoveMenuA11yWidget } from "./dashboard/MoveMenuA11yExample";

export { DashboardWizardSplitBuilder } from "./dashboard/DashboardWizardSplitBuilder";
export type {
  DashboardWizardSplitBuilderProps,
  DashboardWizardStep,
  DashboardWizardStepId,
} from "./dashboard/DashboardWizardSplitBuilder";

// ── App Kit (screen-level composition components) ────────────────────────────
export {
  AppSidebar,
} from "./app-kit/AppSidebar";
export type {
  AppSidebarProps,
  AppSidebarNavItem,
  AppSidebarNavSection,
  AppSidebarUser,
} from "./app-kit/AppSidebar";

export { AppTopbar } from "./app-kit/AppTopbar";
export type { AppTopbarProps } from "./app-kit/AppTopbar";

export { AppWidget, AppSparkline, AppMetric, AppMetricDelta } from "./app-kit/AppWidget";
export type {
  AppWidgetProps,
  AppWidgetHealth,
  AppSparklineProps,
  AppMetricProps,
  AppMetricDeltaProps,
} from "./app-kit/AppWidget";

export { AppMetricStrip } from "./app-kit/AppMetricStrip";
export type { AppMetricStripProps, AppMetricStripItem } from "./app-kit/AppMetricStrip";

export { AppDashboardScreen } from "./app-kit/AppDashboardScreen";
export type { AppDashboardScreenProps } from "./app-kit/AppDashboardScreen";

export { AppAIWorkspaceScreen } from "./app-kit/AppAIWorkspaceScreen";
export type { AppAIWorkspaceScreenProps } from "./app-kit/AppAIWorkspaceScreen";

export { AppPluginsScreen } from "./app-kit/AppPluginsScreen";
export type { AppPluginsScreenProps, PluginsScreenPlugin } from "./app-kit/AppPluginsScreen";

export { AppConnectorWizardScreen } from "./app-kit/AppConnectorWizardScreen";
export type { AppConnectorWizardScreenProps } from "./app-kit/AppConnectorWizardScreen";

export { AppIconLibrary } from "./app-kit/AppIconLibrary";
export type { AppIconLibraryProps } from "./app-kit/AppIconLibrary";

export { MetralyChartCard } from "./charts/MetralyChartCard";
export type { MetralyChartCardProps } from "./charts/MetralyChartCard";

export { MetralyLineChart } from "./charts/MetralyLineChart";
export { MetralyBarChart } from "./charts/MetralyBarChart";
export { MetralyAreaChart } from "./charts/MetralyAreaChart";
export { MetralyComposedChart } from "./charts/MetralyComposedChart";
export { MetralySparkline } from "./charts/MetralySparkline";
export type { MetralySparklineProps } from "./charts/MetralySparkline";
export type {
  MetralyChartBaseProps,
  MetralyChartDatum,
  MetralyChartSeries,
  MetralyChartState,
  MetralyChartTone,
} from "./charts/types";
