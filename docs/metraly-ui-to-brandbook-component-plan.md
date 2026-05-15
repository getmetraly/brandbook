# Metraly UI → Brandbook Migration Execution Plan

**Status:** Reworked from the attached source-of-truth report and updated with the upstream CardShell foundation implementation for card-like surfaces.  
**Last updated:** 2026-05-15  
**Companion documents:**
- `docs/metraly-ui-to-brandbook-component-map.md`
- `docs/metraly-ui-ux-scenario-audit.md`
- `docs/metraly-local-ui-layer-architecture.md`

**Scope rule:** `getmetraly/brandbook` remains the upstream design-system authority. `getmetraly/metraly/ui` must become a downstream product UI layer with a local design-system adapter, explicit contracts, canonical names, and app-owned feature bindings.

---

## 1. Source-of-truth decision

This plan intentionally follows the audit report as the source of truth.

The migration is **not** only a cosmetic adoption of `@metraly/ui`. The audit identifies structural, naming, API, accessibility, testing, and scenario gaps. Therefore the plan must include:

- local `design-system/` structure inside `getmetraly/metraly/ui/src`;
- a compatibility adapter for old/brandbook names;
- canonical component renames for the local app UI layer;
- API changes for core surfaces, including a shared CardFrame/CardShell foundation;
- naming/status taxonomy freeze;
- AppShell/navigation cleanup;
- accessibility hardening for tabs, focus, drag-and-drop, and board edit mode;
- Storybook/visual/a11y conformance inside the app repo;
- cleanup of mixed JS/TS entrypoints after migration.

---

## 2. Executive summary

The audit states that the main problem is not visual polish. The problem is the gap between the canonical design system and product UI:

- navigation context is inconsistent;
- status terminology is inconsistent;
- component contracts are not explicit enough;
- app UI has no local design-system layer;
- dashboard/edit-mode accessibility risks are high;
- app-level Storybook/typecheck/visual conformance maturity is behind brandbook.

The migration strategy is:

```text
brandbook = upstream authority
metraly/ui = downstream app consumer with local adapters
```

Migration order:

```text
tokens + primitives
→ local design-system structure
→ component rename/API contracts
→ app shell/navigation
→ dashboard surfaces
→ tables/data surfaces
→ board edit mode
→ wizards/connectors
→ AI/plugins gated surfaces
→ conformance and cleanup
```

---

## 3. Non-negotiables from the audit

| Area | Required decision |
|---|---|
| Brandbook authority | Brandbook remains canonical for visual language, tokens, component behavior, density, focus/hover states, and pulse-wave rules. |
| Local app layer | `getmetraly/metraly/ui` must get a local `src/design-system/` layer instead of importing or copying primitives ad hoc inside feature code. |
| Adapter layer | Add `src/design-system/compat/brandbook-legacy.ts` to preserve old names during phased migration. |
| Component names | Local app names should become product-neutral and shorter: `Card`, `WidgetShell`, `BoardToolbar`, `DataTable`, etc. |
| API contracts | Core surfaces need explicit slots and typed state contracts, not loose page-level composition; Card, MetricCard, and WidgetShell share a CardFrame foundation. |
| AppShell IA | Sidebar/title/top-tabs must never show conflicting role or dashboard context. |
| Status taxonomy | One status vocabulary must be used across website/docs/app: preview, designed, planned, in progress, gated, benchmark pending, policy defined, live. |
| AI and plugins | Planned/gated surfaces must be truthfully labeled in UI and must not look fully launched. |
| DnD/edit mode | Board editing must have non-drag fallback, visible focus, clear edit/view mode, and no pulse-as-drag-handle. |
| Reflow/mobile | Dashboard shell, headers, filters, tables, charts, and widget catalog must be verified at 320–1440px. |
| App conformance | App repo needs typecheck/story/visual/a11y verification, not only brandbook. |

---

## 4. Required local structure in `getmetraly/metraly/ui`

The migration must introduce this local layer. It should sit above existing `features/*`, not destroy feature ownership.

```text
ui/src/
  app/
    routing/
    providers/
    shell/
      AppShell.tsx
      Sidebar.tsx
      HeaderBar.tsx
      PageHeader.tsx

  design-system/
    tokens/
      semantic.css
      aliases.css
      status-tokens.css
    primitives/
      Button/
      IconButton/
      Tabs/
      Input/
      Select/
      Dialog/
      Tooltip/
    telemetry/
      StatusBadge/
      TrendBadge/
      PulseMarker/
      HealthPill/
    surfaces/
      CardFrame/
      Card/
      Panel/
      MetricCard/
      WidgetShell/
      WidgetCatalogCard/
      DataTable/
      EmptyState/
      Skeleton/
      FilterBar/
    board/
      BoardCanvas/
      BoardDropZone/
      BoardToolbar/
      GripHandle/
      MoveMenu/
    wizard/
      WizardLayout/
      StepRail/
      ReviewPanel/
      StickyWizardFooter/
    ai/
      AIWorkspaceLayout/
      EvidencePanel/
      AnswerCard/
      TraceDrawer/
    plugins/
      PluginCatalog/
      PluginReviewDrawer/
      PermissionBadge/
      SigningBanner/
    compat/
      brandbook-legacy.ts

  features/
    dashboards/
    dashboard-editor/
    metrics-explorer/
    connectors/
    plugins/
    ai-workspace/
    setup/
    notifications/

  widgets/
    metric-card/
    sparkline-widget/
    heatmap-widget/
    risk-list-widget/
    bar-chart-widget/

  lib/
    formatters/
    a11y/
    analytics/
    feature-gates/

  test/
    visual/
    interactions/
    accessibility/
```

### Structure rules

1. `design-system/*` owns reusable UI contracts.
2. `features/*` owns product flows, data loading, routing, permissions, API calls, and copy.
3. `widgets/*` owns widget renderers that plug into `WidgetShell`.
4. `lib/a11y/*` owns keyboard/focus helpers that are not component-specific.
5. `compat/*` is temporary and must be removed after migration.

---

## 5. Required component renames

These are now plan items, not deferred ideas.

| Current / brandbook name | Local app target name | Migration stance |
|---|---|---|
| `MetralyCard` | `Card` | Rename locally; keep compat export during transition. |
| `MetralyMetricCard` | `MetricCard` | Rename locally; keep semantics aligned with brandbook. |
| `DashboardWidget` | `WidgetShell` | Rename and split shell from renderer. |
| `DashboardGrid` | `BoardCanvas` / dashboard layout adapter | Product app owns layout adapter; shell uses `WidgetShell`. |
| `DashboardDropZone` | `BoardDropZone` | Rename and extend for keyboard/pointer fallback. |
| `DashboardToolbar` | `BoardToolbar` | Rename and make edit/view mode explicit. |
| `DashboardResizeHandle` | `GripHandle` / `ResizeHandle` | Use neutral grip/resize affordance; no pulse marker. |
| `WidgetPickerCard` | `WidgetCatalogCard` | Rename and add category/compatibility/status contract. |
| `MetralyTable` | `DataTable<Row>` | Rename locally and add typed table API. |
| `MetralyBadge` | `StatusBadge` / `Badge` split | Use `StatusBadge` for operational state; generic `Badge` for labels. |
| `StateBadge` | `HealthPill` or `StatusBadge` | Consolidate operational status vocabulary. |
| `MetralyTabs` | `Tabs` | Must follow real tab semantics when used as tabs. |
| route-like tabs | links/nav items | If control changes route/page, do not use pseudo-tabs. |
| `AI Assistant` page | `AIWorkspace` | Assistant becomes capability inside workspace. |
| `Connect Sources` | `Connectors` | Canonical product name. |
| `Marketplace` | `Plugins` / `Plugin Marketplace` | Top-level is `Plugins`; marketplace is gated subset. |

---

## 6. Required API changes

### 6.0 `CardFrame` / `CardShell` foundation

Upstream brandbook implementation now introduces `CardShell` as the shared card layout foundation. The app-side local layer should expose this as an internal `CardFrame` or equivalent foundation, not as the primary feature-facing card API.

Target:

```ts
type CardFrameProps = {
  state?: "default" | "selected" | "loading" | "empty" | "error" | "stale";
  density?: "compact" | "default" | "comfortable";
  tone?: "neutral" | "cyan" | "purple" | "success" | "warning" | "danger";
  header?: React.ReactNode;
  footer?: React.ReactNode;
  overlay?: React.ReactNode;
  children?: React.ReactNode;
};
```

Rules:

- `Panel` remains the surface primitive;
- `CardFrame` owns header/body/footer/overlay rhythm, equal-height behavior, overflow, and state metadata;
- `Card`, `MetricCard`, and `WidgetShell` compose `CardFrame`;
- product code should normally use semantic components, not `CardFrame` directly;
- widget-specific drag/resize/remove chrome stays in `WidgetShell`, not `Card`.

### 6.1 `Card`

Target:

`Card` composes `CardFrame` and remains the generic content card API.

```ts
type CardProps = {
  variant?: "default" | "elevated" | "outlined" | "interactive";
  density?: "compact" | "default" | "comfortable";
  tone?: "neutral" | "cyan" | "purple" | "success" | "warning" | "danger";
  header?: React.ReactNode;
  footer?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
};
```

Rules:

- no ad hoc card header/footer layouts in feature pages;
- no hover layout jumps;
- tokenized border/background/focus states only.

### 6.2 `WidgetShell`

Target:

```ts
type WidgetShellProps = {
  title: string;
  description?: string;
  status?: StatusState;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
  emptyState?: React.ReactNode;
  errorState?: React.ReactNode;
  selected?: boolean;
  editMode?: boolean;
  children: React.ReactNode;
};
```

Rules:

- widget shell composes `CardFrame` and owns title/status/actions/footer/loading/empty/error frame;
- widget renderer owns chart/table/content only;
- widget errors are contained inside the widget.

### 6.3 `BoardToolbar`

Target:

```ts
type BoardToolbarProps = {
  mode: "view" | "edit";
  status?: React.ReactNode;
  viewControls?: React.ReactNode;
  editControls?: React.ReactNode;
  primaryActions?: React.ReactNode;
  secondaryActions?: React.ReactNode;
};
```

Rules:

- view/edit mode must be visible;
- unsaved changes must be visible;
- primary action stays reachable on mobile;
- secondary actions collapse on narrow widths.

### 6.4 `BoardDropZone`

Target:

```ts
type BoardDropZoneProps = {
  active?: boolean;
  intent?: "insert" | "replace" | "reorder";
  keyboardTarget?: boolean;
  pointerFallbackLabel?: string;
  children?: React.ReactNode;
};
```

Rules:

- no pulse marker as drag handle;
- must support keyboard/single-pointer alternative;
- must expose clear drop intent.

### 6.5 `DataTable<Row>`

Target:

```ts
type DataTableProps<Row> = {
  rows: Row[];
  columns: Array<DataTableColumn<Row>>;
  loadingState?: React.ReactNode;
  emptyState?: React.ReactNode;
  errorState?: React.ReactNode;
  statusRow?: React.ReactNode;
  summaryFooter?: React.ReactNode;
  bulkActions?: React.ReactNode;
  mobilePresentation?: "table" | "cards" | "stacked";
  getRowId: (row: Row) => string;
};
```

Rules:

- metrics explorer and catalog/list pages use this table contract;
- tables/charts scroll internally, never force body overflow;
- footer/status row is first-class.

### 6.6 `WidgetCatalogCard`

Target:

```ts
type WidgetCatalogCardProps = {
  title: string;
  category: string;
  compatibility?: string[];
  density?: "compact" | "default";
  preview?: React.ReactNode;
  requiresPro?: boolean;
  status?: "available" | "installed" | "gated" | "coming-soon";
  onAdd?: () => void;
};
```

Rules:

- width must follow brandbook picker constraints;
- card is catalog item, not full-page block;
- disabled/gated state must be visible.

### 6.7 `Tabs` / navigation

Rules:

- if the control is a tabbed interface, use `tablist`, `tab`, `tabpanel` semantics and keyboard behavior;
- if the control changes route/page/scope, use navigation links;
- role navigation must not exist simultaneously in sidebar and top tabs without different scopes.

### 6.8 Wizard components

Required local components:

- `WizardLayout`
- `StepRail`
- `ReviewPanel`
- `StickyWizardFooter`

Rules:

- setup, connectors, onboarding, and dashboard wizard use the same wizard pattern;
- stepper is now part of local app design-system layer, not only a Storybook recipe.

### 6.9 AI / evidence components

Required local components:

- `AIWorkspaceLayout`
- `EvidencePanel`
- `AnswerCard`
- `TraceDrawer`

Rules:

- AI is evidence-backed workspace, not just chat;
- every answer must show context/data/provenance state where applicable;
- model/source mode must be visible if synthetic/local/BYO differs.

### 6.10 Plugins / trust components

Required local components:

- `PluginCatalog`
- `PluginReviewDrawer`
- `PermissionBadge`
- `SigningBanner`

Rules:

- plugin install must go through review;
- signed/unsigned, permissions, publisher, version/update/revocation status must be visible;
- marketplace remains gated until trust requirements are met.

---

## 7. Compatibility adapter

Required temporary file:

```ts
// ui/src/design-system/compat/brandbook-legacy.ts
export { Card as MetralyCard } from "../surfaces/Card";
export { MetricCard as MetralyMetricCard } from "../surfaces/MetricCard";
export { WidgetShell as DashboardWidget } from "../surfaces/WidgetShell";
export { DataTable as MetralyTable } from "../surfaces/DataTable";
export { BoardDropZone as DashboardDropZone } from "../board/BoardDropZone";
export { BoardToolbar as DashboardToolbar } from "../board/BoardToolbar";
export { WidgetCatalogCard as WidgetPickerCard } from "../surfaces/WidgetCatalogCard";
export { StatusBadge as StateBadge } from "../telemetry/StatusBadge";
```

Rules:

- app migration can use compat imports temporarily;
- new code must import canonical local names;
- final cleanup phase removes compat imports.

---

## 8. Canonical product naming

| Domain | Canonical name | Deprecated names / notes |
|---|---|---|
| Dashboard | `Dashboard` | `Board` only if it has a distinct model; otherwise merge into Dashboard terminology. |
| Dashboard edit mode | `Dashboard Editor` or `Edit mode` | Not a separate competing product destination. |
| Dashboard creation | `Dashboard Wizard` | Guided creation flow. |
| Metrics analysis | `Metrics Explorer` | Must hand off to Save as widget. |
| Integrations setup/health | `Connectors` | Replace `Connect Sources` and inconsistent wizard naming. |
| Plugin catalogue | `Plugins` | `Marketplace` becomes gated `Plugin Marketplace` subset. |
| AI surface | `AI Workspace` | `AI Assistant` is a capability inside workspace. |
| New dashboard action | `+ New Dashboard` | Opens Dashboard Wizard, not raw empty canvas by default. |

---

## 9. Canonical status taxonomy

Use one status vocabulary across website, docs, app shell, cards, wizards, and trust surfaces.

| Canonical status | Meaning | UI treatment |
|---|---|---|
| `Live` | Available and operational. | `StatusBadge` success/live. |
| `Preview` | User-visible but not final. | Info/neutral badge with explicit copy. |
| `Designed` | Design exists, not production-ready. | Gated/read-only preview. |
| `Planned` | Roadmap item, not user-operable. | Disabled/gated surface. |
| `In progress` | Implementation is active. | Non-clickable or limited CTA. |
| `Gated` | Access depends on entitlement, pilot, or trust requirement. | Lock/permission state. |
| `Policy defined` | Governance exists, implementation may not. | Trust/docs-only status. |
| `Benchmark pending` | Claim not yet validated. | Must not be marketed as done. |
| `Coming soon` | Optional marketing state; must map to Planned or Designed internally. | Disabled CTA only. |
| `Error` | Operation failed. | Recoverable error with retry/details. |
| `Delayed` | Sync/data not current. | Warning state with next retry/last update. |

Deprecated unstructured terms:

```text
AI Soon
AI direction
Plugin ecosystem
Connect Sources
Next
Then
Later
```

These can appear in copy only if mapped to canonical statuses.

---

## 10. Updated migration phases

### Phase 0 — Audit ingestion and plan rewrite

**Status:** current documentation phase.

Work:

- Treat the attached UI/UX audit as source of truth.
- Rewrite plan/map/scenario documents to include structure, rename, API, quality gates.
- Add local UI layer architecture document.

Acceptance:

- Plan explicitly includes package structure, renames, API changes, testing, accessibility, and cleanup.
- No “defer by default” language remains for audit-mandated changes.

---

### Phase 1 — Inventory, naming freeze, and status taxonomy

Work:

- Inventory existing `ui/src/api`, `components`, `context`, `features`, `hooks`, `types`, `utils`, `test`.
- Identify duplicate `App.jsx`/`App.tsx` and `index.jsx`/`index.tsx` entrypoints.
- Freeze canonical names for Dashboard, Board, AI Workspace, Plugins, Connectors, Wizards.
- Freeze status taxonomy and map old terms to canonical statuses.
- Fix shell context mismatch: title/sidebar/top-tabs must point to one scope.

Acceptance:

- One source file documents route names, nav names, status names, and deprecated names.
- No role dashboard can render conflicting sidebar/title/top-tab state.
- Planned/gated surfaces are visibly labeled.

---

### Phase 2 — Local design-system structure and token bridge

Work:

- Add `ui/src/design-system/` structure.
- Add semantic token bridge:
  - `tokens/semantic.css`
  - `tokens/aliases.css`
  - `tokens/status-tokens.css`
- Add lint or grep guard against raw/ad hoc colors in feature code.
- Add `compat/brandbook-legacy.ts`.
- Add local app design-system barrel exports.
- Add typecheck script if missing.
- Add app-level Storybook/visual harness plan.

Acceptance:

- Feature code starts importing from `design-system/` or compat layer.
- Raw color usage is forbidden outside token sources.
- Typecheck path exists.
- Storybook/visual conformance plan exists for app repo.

---

### Phase 3 — Component rename and API contract migration

Work:

- Implement/adapter-wrap:
  - `CardFrame` / `CardShell` foundation
  - `Card`
  - `MetricCard`
  - `WidgetShell`
  - `DataTable<Row>`
  - `WidgetCatalogCard`
  - `StatusBadge`
  - `TrendBadge`
  - `PulseMarker`
  - `HealthPill`
  - `Tabs`
  - `BoardToolbar`
  - `BoardDropZone`
  - `GripHandle`
  - `MoveMenu`
- Keep legacy exports through compat layer.
- Update docs and examples to canonical names.

Acceptance:

- New code uses canonical names.
- Legacy names resolve through compat only.
- Core components expose explicit loading/empty/error/disabled/gated/selected states.
- `Card`, `MetricCard`, and `WidgetShell` share the same surface foundation instead of duplicating shell CSS.
- No pulse marker is used as drag handle.

---

### Phase 4 — AppShell and role navigation cleanup

Work:

- Implement `app/shell/AppShell`, `Sidebar`, `HeaderBar`, `PageHeader`.
- Remove ambiguous duplicate role navigation.
- Decide whether top role controls are tabs, segmented control, or route links.
- Ensure tabs follow tab semantics only when they really are tabs.
- Add mobile nav behavior.

Acceptance:

- Sidebar/title/top controls never conflict.
- Focus order is predictable.
- Mobile shell does not overflow.
- Planned AI/plugins/connectors surfaces are gated truthfully.

---

### Phase 5 — Dashboard surfaces migration

Work:

- Replace dashboard cards with `Card`, `MetricCard`, `WidgetShell`.
- Move widget renderers into `widgets/*`.
- Add explicit widget states:
  - loading;
  - empty;
  - error;
  - stale;
  - permission-limited;
  - gated;
  - selected/edit.
- Use `StatusBadge`/`HealthPill` consistently.

Acceptance:

- All dashboard widgets use `WidgetShell`.
- Widget shell owns header/actions/footer/status/states.
- Product renderer owns only data visualization/content.
- Empty/error states do not break layout.

---

### Phase 6 — DataTable and Metrics Explorer migration

Work:

- Replace product tables with `DataTable<Row>`.
- Add `SummaryFooter` and `statusRow`.
- Define mobile table presentation.
- Implement Metrics Explorer flow:
  - select metric;
  - inspect chart/table;
  - change time range;
  - filter/compare;
  - save as widget;
  - add to dashboard.

Acceptance:

- Tables scroll internally.
- Explorer has loading/no-results/no-data/stale/error states.
- Save-as-widget handoff is implemented or explicitly specified.

---

### Phase 7 — Board edit mode hardening

Work:

- Implement `BoardCanvas`, `BoardToolbar`, `BoardDropZone`, `GripHandle`, `MoveMenu`.
- Add keyboard/single-pointer alternatives to DnD:
  - move left/right/up/down;
  - move to row/column if needed;
  - selected widget state;
  - cancel edit.
- Keep `react-grid-layout`/`@dnd-kit` integration product-owned.
- Add focus-visible and name/role/value verification.

Acceptance:

- User can complete key edit operations without drag.
- Edit/view mode is unmistakable.
- No hover-only affordance is required.
- No pulse marker acts as drag handle.

---

### Phase 8 — Unified wizard pattern

Work:

- Implement:
  - `WizardLayout`
  - `StepRail`
  - `ReviewPanel`
  - `StickyWizardFooter`
- Apply to:
  - onboarding;
  - connector wizard;
  - dashboard wizard;
  - setup/progress flows.
- Add review step and recoverable failure states.

Acceptance:

- All wizard-like flows share one structure.
- Dashboard Wizard can create a starter dashboard from goal + role + widget bundle.
- Connector Wizard shows permissions, dry run, partial errors, and health handoff.
- Sticky footer behavior works on mobile.

---

### Phase 9 — Trust-aware AI Workspace and Plugins

Work:

- Replace page-level `AI Assistant` naming with `AI Workspace`.
- Implement:
  - `AIWorkspaceLayout`
  - `EvidencePanel`
  - `AnswerCard`
  - `TraceDrawer`
- Implement plugin governance surfaces:
  - `PluginCatalog`
  - `PluginReviewDrawer`
  - `PermissionBadge`
  - `SigningBanner`
- Gate planned/designed surfaces truthfully.

Acceptance:

- AI answers show context/data/provenance.
- Synthetic/live/BYO provider state is visible where relevant.
- Plugin install requires review.
- Permissions/signing/revocation status is visible.
- Gated surfaces do not look launched.

---

### Phase 10 — App-level conformance and cleanup

Work:

- Add app-level stories or preview harness for:
  - AppShell;
  - Dashboard;
  - Dashboard Editor;
  - Metrics Explorer;
  - Connector Wizard;
  - Dashboard Wizard;
  - AI Workspace;
  - Plugins;
  - DataTable;
  - WidgetShell.
- Add visual regression checks.
- Add accessibility interaction tests.
- Remove mixed entrypoint duplication:
  - resolve `App.jsx` vs `App.tsx`;
  - resolve `index.jsx` vs `index.tsx`.
- Remove compat imports after all screens migrate.
- Reconcile README/package dependency drift, including charts/Recharts assumptions.

Acceptance:

- One runtime entrypoint path remains.
- App typecheck passes.
- Visual snapshots match accepted brandbook-derived contracts.
- Compat barrel is empty or deleted.
- Docs match actual dependencies.

---

## 11. Quality gates

Migration is not complete until all gates pass.

### Component state gate

Every migrated component has:

```text
default
hover
focus-visible
active/selected
loading
empty
error
disabled
gated
mobile
```

### Accessibility gate

- real tabs use APG-style tab semantics;
- route navigation uses links, not pseudo-tabs;
- DnD has non-drag fallback;
- focus-visible is always present;
- meaningful non-text indicators meet contrast expectations;
- target sizes and spacing are checked on mobile.

### Responsive gate

Check:

```text
320px
375px
390px
430px
768px
1024px
1280px
1440px
```

No body-level horizontal overflow is allowed except for intentionally scrollable data regions.

### Trust/claim-safety gate

- AI and plugins cannot appear as fully launched if they are designed/planned/gated.
- Status labels in app must match website/docs/trust taxonomy.
- Synthetic/live data state must be visible where relevant.

### Design-system gate

- feature code does not use raw colors;
- pulse-wave is only brand/telemetry/status primitive;
- no pulse-as-drag-handle;
- no hover layout jump;
- cyan is operational primary;
- purple is secondary accent only.

---

## 12. Immediate next steps

1. Merge this documentation rewrite or continue review on the PR.
2. Treat brandbook `CardShell` as the upstream proof for app-side `CardFrame`.
3. Continue Phase 3 surface migration by adapting local `Card`, `MetricCard`, and `WidgetShell` to the shared foundation.
4. Do not start screen-by-screen migration until the compat layer, canonical names, and shared surface foundation exist.


## 13. Brandbook foundation consolidation completed — 2026-05-15

A foundation consolidation pass has been applied inside `getmetraly/brandbook` to unblock Phase 3 component-contract migration and reduce one-off visual fixes.

Completed iterations:

1. **Forms foundation** — `FieldShell` now owns control label/helper/error/id/state structure for input, select, checkbox, radio, switch, and filter chips.
2. **Overlay foundation** — `OverlayShell` now owns shared dialog shell behavior for drawer and bottom sheet: scrim, focus trap, body scroll lock, Escape close, header/body slots.
3. **State foundation** — `StateBlock` now owns empty/error/gated/no-results/loading placeholder rhythm and is used by empty states and widget built-in states.
4. **Navigation item foundation** — `NavigationItemFrame` now owns the visual navigation row contract for sidebar/tree rows while preserving separate ARIA roles.
5. **Roving selection foundation** — `useRovingSelection` now centralizes value/focus logic for tabs and segmented controls.
6. **Board interaction foundation** — `HandlePrimitive` now owns drag/resize/move/drop affordance visual/focus contracts.

Migration consequence:

```text
Do not add more one-off shells for cards, controls, overlays, state placeholders, nav rows, tabs/selectors, or board handles.
Compose the foundation primitive and keep the semantic component API small.
```

This does not remove the planned local canonical names (`Card`, `MetricCard`, `WidgetShell`, `BoardCanvas`, `DataTable<Row>`). It gives the brandbook upstream a cleaner foundation that the downstream local design-system layer can map to.

### 6.8.1 Wizard shell alignment update — 2026-05-15

The upstream brandbook `WizardLayout` has been aligned closer to the current demo app wizard structure:

```text
horizontal progress stepper
→ centered wizard card
→ header/body/review inside one surface
→ footer actions below the card
```

Migration rule:

- app-like product flows use the default top stepper;
- side rail is kept only for dense documentation or explicit rail stories;
- Dashboard Wizard, Connector Wizard and onboarding/setup flows must not fork their own wizard shell;
- local app migration can rename the pieces to `WizardLayout`, `StepRail`, `ReviewPanel`, and `StickyWizardFooter`, but the composition contract stays aligned with brandbook.

### 6.8.2 Wizard scenario correction — 2026-05-15

The previous wizard alignment pass treated Dashboard Wizard and Connector Wizard too similarly. The visual contract is now split:

- Connector/setup/onboarding flows use the canonical `WizardLayout` default: horizontal top stepper, centered card, alert/source/review content, footer actions below.
- Dashboard Wizard uses an app-recipe split layout: left builder rail for template/widgets/settings and right dashboard preview canvas.
- The split builder recipe is a scenario proof, not a new low-level component replacement for `WizardLayout`.

Migration consequence for `getmetraly/metraly/ui`:

```text
Connectors route -> WizardLayout pattern
Dashboard creation route -> DashboardWizardShell feature recipe
Shared wizard pieces -> StepRail / ReviewPanel / StickyWizardFooter where useful
```

Agents must not collapse these two flows into a single generic centered card.


### Current wizard follow-up

The next UI migration pass should treat connector setup and dashboard creation as two separate recipes. Connector setup remains a `WizardLayout` usage. Dashboard creation remains a scenario-level composition with AppShell-like navigation, builder rail, search/filter controls, and preview canvas. Agents must not collapse these into a single wizard primitive.
