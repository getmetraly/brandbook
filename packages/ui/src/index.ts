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
