# Prototype Conformance Audit

## Source of Truth
The prototype JSX/CSS under `/home/zubarev/Projects/metraly/docs/prototypes/brandbook/*` is the visual authority. The HTML export did not render usefully in headless browser, so JSX + tokens were used for intent and structure.

## Prototype Files Reviewed
- `app.jsx`
- `docs.jsx`
- `primitives.jsx`
- `tokens.css`
- `widgets.jsx`
- `tweaks-panel.jsx`
- `form-controls.jsx`
- `dashboard-editor.jsx`
- `state-board.jsx`
- `design-canvas.jsx`
- `Metraly Brandbook.html`
- `.design-canvas.state.json`

## Brandbook Files Reviewed
- `site/app/components/previews/ClaudeDesignStateBoard.tsx`
- `site/app/components/previews/TelemetrySearch.tsx`
- `site/app/components/previews/README.md`
- `site/app/components/previews/previews.css`
- `site/app/components/previews/page.tsx`
- `site/app/components/forms/prototype-conformance/page.tsx`
- `site/app/components/data-display/prototype-conformance/page.tsx`
- `site/app/components/dashboard/prototype-conformance/page.tsx`
- `site/app/components/charts/prototype-conformance/page.tsx`
- `site/app/components/docs/DocsShell.tsx`
- `site/app/components/docs/DocsBlocks.tsx`
- `packages/ui/src/components/MetralyCheckbox.tsx`
- `packages/ui/src/components/MetralyRadio.tsx`
- `packages/ui/src/components/MetralySelect.tsx`
- `packages/ui/src/components/MetralySwitch.tsx`
- `packages/ui/src/components/MetralyTabs.tsx`
- `packages/ui/src/components/StateBadge.tsx`
- `packages/ui/src/components/WidgetPickerCard.tsx`
- `packages/ui/src/components/MetralyTable.tsx`
- `packages/ui/src/dashboard/DashboardWidget.tsx`
- `packages/ui/src/dashboard/DashboardToolbar.tsx`
- `packages/ui/src/dashboard/DashboardDropZone.tsx`
- `packages/ui/src/dashboard/DashboardResizeHandle.tsx`
- `packages/ui/src/styles/metraly-forms.css`
- `packages/ui/src/styles/metraly-table.css`
- `packages/ui/src/styles/metraly-widget-shell.css`
- `packages/ui/src/styles/metraly-state-badge.css`
- `packages/ui/src/styles/metraly-theme.css`
- `packages/ui/src/charts/*`
- `site/__tests__/preview/ClaudeDesignStateBoard.test.tsx`
- `site/__tests__/ui/Phase1PrototypeConformance.test.tsx`
- `site/__tests__/ui/Phase2DashboardPrimitives.test.tsx`
- `site/__tests__/ui/Phase3TableAndComposition.test.tsx`
- `site/__tests__/ui/Phase4Charts.test.tsx`

## Component Inventory
| Category | Prototype coverage | Brandbook coverage | Status |
|---|---|---|---|
| Primitives | PulseWave, GripDots, StatusDot, Sparkline, ChartLine, TelemetryDivider, Icon | `@metraly/ui` primitives + preview surfaces | Matched |
| Controls | Checkbox, Radio, Switch, Select, Tabs, StateBadge, search rail, segmented control | `@metraly/ui` controls + forms conformance page | Matched |
| Cards / panels | WidgetPickerCard, DashboardWidget / WidgetShell, Metric cards, chart cards, empty states | `@metraly/ui` cards + dashboard/data-display/conformance pages | Matched |
| Tables | Dense table, selected rows, loading/empty states, status cells | `MetralyTable` + data-display conformance | Matched |
| Dashboard shell | Toolbar, drop zone, resize handles, grid, picker panel, sidebar/topbar | dashboard conformance + preview hardening surface | Matched after patch |
| Charts | Line, area, bar, composed, sparkline, chart tooltip/card | charts conformance + `@metraly/ui/charts` | Matched |
| Docs shell | Docs shell, cards, route navigation, state labels | docs pages and grouped component routes | Mostly matched |
| Canvas helpers | DesignCanvas, DCSection, DCArtboard, TweaksPanel | no dedicated brandbook route | Intentional non-target / not translated verbatim |

## Missing Components
- No dedicated brandbook route for the prototype’s `DesignCanvas` / `TweaksPanel` host system. That surface is prototype-only and was not translated into a production brandbook page.
- Before this patch, the preview dashboard’s widget-picker search rail was missing; it is now present.

## Components That Exist But Do Not Match
| Prototype component / screen | Existing brandbook component / screen | Mismatch | Required fix | Files to change | Test / visual check |
|---|---|---|---|---|---|
| `dashboard-editor.jsx` widget picker | `EngineeringDashboardEditorPreview` picker panel | Picker catalog was too small and had no search rail | Add search rail and expand cards to include selected/new/loading/delayed/disabled states | `site/app/components/previews/ClaudeDesignStateBoard.tsx` | Route screenshot + preview test |
| `form-controls.jsx` StateBadge board | preview board StateBadge row | `new` sample was mislabeled as live | Switch the sample to `state="new"` | `site/app/components/previews/ClaudeDesignStateBoard.tsx` | Unit test + screenshot |
| `dashboard-editor.jsx` / board-edit states | `DashboardDropZone` | Drop target had no accessible name | Add explicit aria label while keeping the visual contract | `packages/ui/src/dashboard/DashboardDropZone.tsx` | Unit test + RTL query |
| `dashboard-empty-state` preview examples | dashboard/data-display conformance pages | Used nonexistent `actionLabel` prop | Use the supported `action` slot | `site/app/components/dashboard/prototype-conformance/page.tsx`, `site/app/components/data-display/prototype-conformance/page.tsx`, `site/__tests__/ui/Phase3TableAndComposition.test.tsx` | Typecheck + unit tests |
| `MetralyTableRowMarker` type | brandbook public exports | Type was defined but not exported from `@metraly/ui` | Export the type from the package barrel | `packages/ui/src/index.ts` | Typecheck |

## Tables Audit
- Dense table, selected row, loading, empty and row-marker coverage are present in the data-display conformance page.
- The table component itself already supports sticky header and dense mode.
- The main gap was public type export coverage, not rendering.

## Widgets Audit
- Widget shell, drag state, full-width state, drop zone and resize handles are present.
- The preview hardening surface now includes the prototype-style picker search rail and a broader catalog.
- Widget copy and spacing are now close to prototype density; remaining work is only final screenshot confirmation.

## Forms and Controls Audit
- Checkbox, radio, switch, select and tabs are covered.
- StateBadge alias coverage matches the prototype semantics (`live`, `ok`, `stale`, `error`, `new`, `info`, `purple`, `disabled`).
- Accessible names on checkbox/radio/select include helper text; tests were updated to query the visible control labels rather than brittle exact names.

## Dashboard Surfaces Audit
- Sidebar, topbar, toolbar, drop zones, resize handles and widget states are present.
- Drop zones now expose an explicit accessible label.
- Empty dashboard states now use the supported `action` slot.

## Typography Audit
- UI typography is close to the prototype: Inter-style UI text, mono for metrics, restrained headings.
- No new display typeface was introduced.
- Remaining difference is mostly route-level shell phrasing, not component geometry.

## Spacing Audit
- Prototype-style density is mostly matched on the dashboard and table surfaces.
- The picker panel was the biggest spacing gap; it now includes the search rail and fuller card stack.
- No layout-shift hover behavior was introduced.

## States Audit
- Covered: default, hover, focus-visible, selected, disabled, loading, new/unread, stale, delayed, error, no-data, empty, dragging, full-width.
- Drag handles remain neutral grip dots.
- Default drop zones do not render pulse-wave.

## Responsive Audit
- The component surfaces are structured to wrap, but a final browser screenshot pass at desktop and narrow widths is still needed for proof.
- No responsive regressions were found by typecheck or unit tests.

## Accessibility Risks
- Drop zone naming had to be added explicitly; that is now fixed.
- Helper text contributes to accessible names on some controls; tests now use label regexes.
- The preview board uses static state samples, so keyboard drag interaction is still a future product concern, not a current regression.

## Implementation Plan
1. Add the picker search rail and expand card states to mirror the prototype catalog.
2. Fix the `StateBadge` sample and empty-state prop usage.
3. Export the missing table marker type and add the drop-zone accessible label.
4. Update the docs notes so the preview hardening surface reflects the new picker/search structure.

## Testing Plan
- `npm run site:typecheck`
- `./site/node_modules/.bin/jest --config site/jest.config.js --runInBand site/__tests__/preview/ClaudeDesignStateBoard.test.tsx site/__tests__/ui/Phase1PrototypeConformance.test.tsx site/__tests__/ui/Phase2DashboardPrimitives.test.tsx site/__tests__/ui/Phase3TableAndComposition.test.tsx site/__tests__/ui/Phase4Charts.test.tsx`
- Browser screenshot pass for the preview routes once the route navigation is stable in headless Chromium.

## Open Questions
- Should the prototype `DesignCanvas` / `TweaksPanel` host be surfaced as a dedicated brandbook route, or remain prototype-only reference material?
- Do we want one final screenshot pass for `/components/previews` and the prototype-conformance pages at 1440×900 and 1024×768 before declaring visual parity?
