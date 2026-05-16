# Storybook Visual Parity + App UI Kit Migration Audit

Generated: 2026-05-16. Working directory: `brandbook/`.

---

## Sources reviewed

| Source | Path | Status |
|---|---|---|
| Claude archive extraction tree | `../claude/**` | ✅ Fully inspected |
| Implementation-pack viewer | `../claude/implementation-pack-viewer.html` | ✅ Found at root |
| App kit source | `../claude/ui_kits/metraly_app/` | ✅ 10 files |
| Website kit | `../claude/ui_kits/metraly_website/` | ✅ Reviewed — out of scope |
| Implementation pack components | `../claude/implementation-pack/packages/ui/src/` | ✅ Already migrated in prior pass |
| Existing brandbook Storybook | `stories/**/*.stories.tsx` | ✅ 58 story files |
| Existing brandbook packages | `packages/ui/src/**` | ✅ Full inventory |

### Resolved paths

```
CLAUDE_ROOT=../claude
CLAUDE_VIEWER=../claude/implementation-pack-viewer.html
CLAUDE_APP_KIT=../claude/ui_kits/metraly_app
CLAUDE_IMPLEMENTATION_PACK=../claude/implementation-pack
```

---

## Claude viewer component inventory

18 Phase 1 components confirmed present in `implementation-pack-viewer.html`:

1. MetralyGauge
2. MetralyHeatmap
3. ActivityFeed
4. InsightCard
5. StateBoard
6. WidgetStateMatrix
7. TokenInput
8. PermissionExplainer
9. BackfillRangePicker
10. ConnectionTestPanel
11. SyncProgressPanel
12. SettingsSection
13. SettingsAuditRow
14. AIProviderConnectorCard
15. BYOLLMConnectorPanel
16. DashboardWidgetExamples
17. MoveMenuA11yExample
18. DashboardWizardSplitBuilder

---

## Claude app-kit inventory (`../claude/ui_kits/metraly_app/`)

| Claude file | Component | Purpose |
|---|---|---|
| `Sidebar.jsx` | `AppSidebar` | Product navigation sidebar with sections, items, health pill, user footer |
| `Topbar.jsx` | `AppTopbar` | Page header with search, bell, refresh |
| `Widget.jsx` | `AppWidget` + `AppSparkline` | Dashboard widget shell + inline sparkline |
| `DashboardScreen.jsx` | `AppDashboardScreen` | VP Engineering overview screen composition |
| `AIWorkspaceScreen.jsx` | `AppAIWorkspaceScreen` | AI chat + evidence screen composition |
| `PluginsScreen.jsx` | `AppPluginsScreen` | Plugin catalog screen composition |
| `ConnectorWizardScreen.jsx` | `AppConnectorWizardScreen` | Connector setup wizard screen |
| `Icon.jsx` | `AppIconLibrary` (+ `MetralyIcon` already exists) | Icon set definition |
| `styles.css` | `metraly-app-kit.css` | App-kit CSS (translated to metraly-* prefix) |
| `index.html` | N/A | App kit demo HTML — not migrated |

---

## Existing brandbook Storybook inventory (pre-migration)

58 story files across sections: Charts, Components, Source, Settings, Dashboard, Scenarios, + root-level stories. All 18 Phase 1 components had existing stories. No AppKit section existed.

---

## Core visual mismatch root cause

| Cause | Description | Fix type |
|---|---|---|
| **Story framing issue** (primary) | Storybook renders primitives in isolation with weak maxWidth wrappers. Claude Design viewer wraps each component in a gallery card with category/title/description/status/tags header and dark preview canvas. | MetralyStoryFrame + ProductPreview stories |
| **Missing app-kit composition** | Claude Design has full-screen composition demos (Dashboard, AI Workspace, Plugins, Connector Wizard) not present in brandbook. | App-kit package components + stories |
| **Canvas framing** | Storybook `layout: "padded"` vs Claude viewer's dark-bg preview surface | MetralyStoryFrame previewVariant controls this |

---

## Component-by-component visual mismatch table

| Reference | Storybook story | Severity | Main mismatch | Root cause | Fix type |
|---|---|---:|---|---|---|
| MetralyGauge | Charts/MetralyGauge | Medium | No gallery header, plain white bg | Story framing | ProductPreview + MetralyStoryFrame |
| MetralyHeatmap | Charts/MetralyHeatmap | Medium | No gallery header | Story framing | ProductPreview + MetralyStoryFrame |
| ActivityFeed | Components/ActivityFeed | Medium | No gallery header | Story framing | ProductPreview |
| InsightCard | Components/InsightCard | Medium | No gallery header | Story framing | ProductPreview |
| StateBoard | Components/StateBoard | Medium | No gallery header | Story framing | ProductPreview |
| WidgetStateMatrix | Components/WidgetStateMatrix | Medium | No gallery header | Story framing | ProductPreview |
| TokenInput | Source/TokenInput | Low | No gallery header | Story framing | ProductPreview |
| PermissionExplainer | Source/PermissionExplainer | Low | No gallery header | Story framing | ProductPreview |
| BackfillRangePicker | Source/BackfillRangePicker | Low | No gallery header | Story framing | ProductPreview |
| ConnectionTestPanel | Source/ConnectionTestPanel | Low | No gallery header | Story framing | ProductPreview |
| SyncProgressPanel | Source/SyncProgressPanel | Low | No gallery header | Story framing | ProductPreview |
| SettingsSection | Settings/SettingsSection | Medium | No gallery header | Story framing | ProductPreview |
| SettingsAuditRow | Settings/SettingsAuditRow | Low | No story file existed | Missing story | Story added inside SettingsSection ProductPreview |
| AIProviderConnectorCard | Settings/AIProviderConnectorCard | Medium | No gallery header | Story framing | ProductPreview |
| BYOLLMConnectorPanel | Settings/BYOLLMConnectorPanel | Medium | No gallery header | Story framing | ProductPreview |
| DashboardWidgetExamples | stories/DashboardWidget.stories.tsx (root) | Low | No gallery header | Story framing | ProductPreview in DashboardWizardSplitBuilder |
| MoveMenuA11yExample | Dashboard/MoveMenuA11yExample | Low | No gallery header | Story framing | ProductPreview |
| DashboardWizardSplitBuilder | Dashboard/DashboardWizardSplitBuilder | Medium | No gallery header | Story framing | ProductPreview |
| AppSidebar (new) | AppKit/AppSidebar | High | No brandbook component existed | Missing app-kit migration | New component + story |
| AppTopbar (new) | AppKit/AppTopbar | High | No brandbook component existed | Missing app-kit migration | New component + story |
| AppWidget (new) | AppKit/AppWidget | High | No brandbook component existed | Missing app-kit migration | New component + story |
| AppDashboardScreen (new) | AppKit/AppDashboardScreen | High | No composition screen existed | Missing app-kit migration | New screen + story |
| AppAIWorkspaceScreen (new) | AppKit/AppAIWorkspaceScreen | High | No screen composition existed | Missing app-kit migration | New screen + story |
| AppPluginsScreen (new) | AppKit/AppPluginsScreen | High | No screen composition existed | Missing app-kit migration | New screen + story |
| AppConnectorWizardScreen (new) | AppKit/AppConnectorWizardScreen | High | No wizard screen existed | Missing app-kit migration | New screen + story |
| AppIconLibrary (new) | AppKit/AppIconLibrary | Medium | No icon gallery view existed | Missing app-kit migration | New component + story |

---

## ui_kits/metraly_app migration inventory

| Claude app-kit pattern | Brandbook component | Package path | Story path | Status |
|---|---|---|---|---|
| `Sidebar.jsx` | `AppSidebar` | `packages/ui/src/app-kit/AppSidebar.tsx` | `stories/AppKit/AppSidebar.stories.tsx` | ✅ Done |
| `Topbar.jsx` | `AppTopbar` | `packages/ui/src/app-kit/AppTopbar.tsx` | `stories/AppKit/AppTopbar.stories.tsx` | ✅ Done |
| `Widget.jsx` + Sparkline | `AppWidget` + `AppSparkline` + `AppMetric` + `AppMetricDelta` | `packages/ui/src/app-kit/AppWidget.tsx` | `stories/AppKit/AppWidget.stories.tsx` | ✅ Done |
| (metric strip pattern) | `AppMetricStrip` | `packages/ui/src/app-kit/AppMetricStrip.tsx` | included in AppWidget story | ✅ Done |
| `DashboardScreen.jsx` | `AppDashboardScreen` | `packages/ui/src/app-kit/AppDashboardScreen.tsx` | `stories/AppKit/AppDashboardScreen.stories.tsx` | ✅ Done |
| `AIWorkspaceScreen.jsx` | `AppAIWorkspaceScreen` | `packages/ui/src/app-kit/AppAIWorkspaceScreen.tsx` | `stories/AppKit/AppAIWorkspaceScreen.stories.tsx` | ✅ Done |
| `PluginsScreen.jsx` | `AppPluginsScreen` | `packages/ui/src/app-kit/AppPluginsScreen.tsx` | `stories/AppKit/AppPluginsScreen.stories.tsx` | ✅ Done |
| `ConnectorWizardScreen.jsx` | `AppConnectorWizardScreen` | `packages/ui/src/app-kit/AppConnectorWizardScreen.tsx` | `stories/AppKit/AppConnectorWizardScreen.stories.tsx` | ✅ Done |
| `Icon.jsx` | `AppIconLibrary` (uses existing `MetralyIcon`) | `packages/ui/src/app-kit/AppIconLibrary.tsx` | `stories/AppKit/AppIconLibrary.stories.tsx` | ✅ Done |
| `styles.css` | `metraly-app-kit.css` | `packages/ui/src/styles/metraly-app-kit.css` | n/a | ✅ Done |

---

## Components that needed story framing only

All 18 Phase 1 components — they existed and worked correctly but lacked the gallery card header structure.

## Components that needed full app-kit migration

All 8 Claude Design app-kit screens — none existed in brandbook before this pass.

## Components intentionally not migrated

| Component | Reason |
|---|---|
| `ui_kits/metraly_website/**` | Out of scope per task decision. Marketing site kit (Hero, SiteNav, Footer, FeatureGrid, etc.) is separate from the product app kit. Document as follow-up. |
| `DashboardWidgetExamples` story | Covered under `stories/Dashboard/DashboardWizardSplitBuilder` ProductPreview |

---

## Proposed focused patch plan

Completed in this pass:
1. ✅ Shared MetralyStoryFrame wrapper
2. ✅ metraly-app-kit.css
3. ✅ App-kit TSX components (9 files)
4. ✅ ProductPreview stories for all Phase 1 components
5. ✅ AppKit Storybook section (8 stories)
6. ✅ Package exports updated
7. ✅ Playwright capture script

Follow-up (not in scope):
- Website kit migration (`ui_kits/metraly_website`)
- Live Playwright screenshot run (requires running Storybook server)
- Pixel-diff automation for CI
