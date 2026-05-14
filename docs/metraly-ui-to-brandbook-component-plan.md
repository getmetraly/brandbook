# Metraly UI → Brandbook Component Plan

**Status:** Updated after UI/UX research for future `@metraly/ui` migration into `getmetraly/metraly/ui`.  
**Last updated:** 2026-05-15  
**Companion documents:**
- `docs/metraly-ui-to-brandbook-component-map.md`
- `docs/metraly-ui-ux-scenario-audit.md`

**Scope rule:** `getmetraly/metraly/ui` is the product inventory and future migration target. `getmetraly/brandbook` remains the source of truth for reusable UI contracts, design tokens, component APIs, Storybook scenarios, and migration documentation.

---

## 1. Executive decision

The next workstream should not start with new visual components. It should start by closing **screen-level UX gaps** and **migration contracts** that will prevent a clean adoption of `@metraly/ui` inside `getmetraly/metraly/ui`.

Current `@metraly/ui` already has a useful public foundation:

- shell/navigation seams;
- dashboard grid/widget seams;
- form primitives;
- cards/panels/badges/tables;
- chart wrappers;
- dashboard editor scenarios;
- mobile drawer and bottom sheet primitives.

The missing layer is the **product scenario layer**: what each screen does, which states it must support, which components it must use, and what must remain product-owned.

---

## 2. Updated UX findings from the research pass

### 2.1 Information architecture issues

| Finding | Impact | Required action |
|---|---|---|
| Dashboard / Board / Dashboard Editor / Dashboard Wizard overlap conceptually. | Users can perceive four different ways to do the same thing. | Define canonical naming and screen ownership before migration. |
| Metrics Explorer is a strong candidate for a primary analysis workflow, but needs clearer relationship to dashboards. | Users may not know when to explore metrics versus save a widget to a dashboard. | Add an explicit "Explore → Save as widget → Add to dashboard" scenario. |
| Marketplace / Integrations and Connectors overlap. | Integration setup can become fragmented. | Separate catalogue discovery from connection configuration/status. |
| AI Assistant is useful but can become unclear if it is not grounded in selected data/context. | Users may not trust suggestions or know what the assistant is acting on. | Add contextual states: no context, selected metric, selected dashboard, incident investigation. |
| Onboarding currently needs stronger product intent. | First-time users may not know what to connect or what success looks like. | Make onboarding goal-oriented: connect data → validate events → create first dashboard. |

### 2.2 Navigation and layout issues

| Finding | Impact | Required action |
|---|---|---|
| Desktop shell can use sidebar + topbar, but mobile needs explicit navigation behavior. | Responsive migration can regress quickly. | Use `MetralyDrawer` for mobile nav and `MetralyBottomSheet` for utility/widget library surfaces. |
| Widget library on mobile needs a dedicated interaction model. | A desktop side panel does not scale down cleanly. | Treat widget library as a searchable bottom sheet with categories and selected-state feedback. |
| Topbar actions can crowd the viewport. | 320–430px layouts can overflow. | Define action priority: primary action visible; secondary actions collapse into drawer/sheet/menu recipe. |
| Tables/charts need internal scroll contracts. | Body-level horizontal overflow breaks the app shell. | Keep page shell overflow controlled; only table/chart regions scroll internally. |

### 2.3 Component system issues

| Finding | Impact | Required action |
|---|---|---|
| Existing package API is mostly sufficient. | New components now would add API churn. | Prefer recipes and product adapters over new public exports. |
| Drawer/sheet are public but not fully modal-accessible. | Production mobile navigation/utility overlays are not complete. | Phase 1a must harden focus trap, focus restore, and body scroll lock. |
| Gauge and heatmap are still deferred. | Dashboard parity may require them later. | Do not add preemptively; add only when migration proves repeated usage. |
| Wizard stepper is reusable-looking but not proven enough. | Premature public API risk. | Keep stepper as recipe until a third production flow reuses it. |
| AI chat bubbles and streaming states are product-specific. | Bad fit for package public API today. | Keep in product; document recommended composition from primitives. |

---

## 3. Updated migration principles

1. **Brandbook owns primitives, shells, recipes, visual contracts, and Storybook benchmarks.**
2. **Metraly product owns data adapters, state machines, permissions, API calls, and business copy.**
3. **Do not migrate screen-specific components into `packages/ui` unless they repeat across at least three product areas.**
4. **Every migration phase must preserve functionality first, then improve visual parity.**
5. **Mobile behavior is not a follow-up. It is part of the acceptance criteria for every screen.**
6. **No body-level horizontal overflow is allowed at 320px, 375px, 390px, 430px, 768px, 1024px, 1280px, and 1440px.**
7. **Storybook scenarios are migration benchmarks, not marketing demos.**

---

## 4. Canonical product IA proposal

Use this as the migration target unless the product team decides otherwise.

| Product area | Canonical role | Keep / rename / merge recommendation |
|---|---|---|
| Dashboard | Primary overview and saved operational boards. | Keep as the main landing experience. |
| Board | If it duplicates dashboard, merge into Dashboard terminology. | Avoid a separate top-level nav item unless it has a different mental model. |
| Dashboard Editor | Edit mode for an existing dashboard. | Keep as a mode/state, not necessarily a separate product destination. |
| Dashboard Wizard | Guided dashboard creation. | Keep as onboarding/creation flow, not a competing dashboard screen. |
| Metrics Explorer | Deep analysis and metric discovery. | Keep as a primary workflow connected to "Add to dashboard". |
| Marketplace | Integration catalogue. | Keep as discovery/catalogue. |
| Connectors | Active connection setup and health. | Add or document as a product scenario separate from Marketplace. |
| AI Assistant | Contextual analysis helper. | Keep but ground it in selected metric/dashboard/incident context. |
| Onboarding | First-run activation path. | Rework around connection, validation, and first dashboard creation. |
| Settings | Workspace/account/integration configuration. | Add scenario if product already has settings-like screens. |

---

## 5. Updated phase plan

### Phase 0 — Documentation alignment and scenario audit

**Status:** current phase.

Work:

- Update `docs/metraly-ui-to-brandbook-component-map.md`.
- Update `docs/metraly-ui-to-brandbook-component-plan.md`.
- Add `docs/metraly-ui-ux-scenario-audit.md`.
- Explicitly document screen ownership, scenario gaps, and migration acceptance criteria.

Acceptance:

- Plan and map no longer describe only component coverage.
- Each product area has an explicit migration stance.
- Unresolved product scenarios are captured as phase inputs, not forgotten.

---

### Phase 1 — Foundation hardening before product migration

#### Phase 1a — Overlay accessibility hardening

Work:

- Add focus trap to `MetralyDrawer` and `MetralyBottomSheet`.
- Restore focus to trigger/previous element on close.
- Lock body scroll while open.
- Preserve Escape, scrim close, and close button behavior.
- Add interaction tests or Storybook play checks.

Acceptance:

- Drawer and bottom sheet keep current visuals.
- Keyboard users cannot tab into the background.
- Body scroll is locked while overlays are open.
- No horizontal overflow at mobile widths.

#### Phase 1b — Shell/mobile verification

Work:

- Verify `MetralyShell`, `MetralySidebar`, `MetralyTopbar`, `MetralyDrawer`, and `MetralyBottomSheet` together.
- Add or update Storybook scenarios for desktop, tablet, and mobile app shell.
- Confirm action collapse rules in topbar.

Acceptance:

- Mobile nav opens from topbar and behaves consistently.
- Secondary actions do not cause overflow.
- Sidebar, drawer, and topbar are documented as the canonical product shell.

---

### Phase 2 — Dashboard and dashboard editor migration contract

Work:

- Treat `Scenarios/DashboardEditor` as the primary benchmark.
- Define the product adapter boundary for `react-grid-layout`.
- Keep widget data rendering in product.
- Use package seams:
  - `DashboardGrid`
  - `DashboardWidget`
  - `DashboardToolbar`
  - `DashboardEmptyState`
  - `DashboardDropZone`
  - `DashboardResizeHandle`
  - `WidgetPickerCard`
  - cards, badges, tables, chart wrappers.

Mobile requirements:

- Widget library becomes a bottom sheet or drawer-backed surface.
- Drag/reorder affordances must not rely only on hover.
- Selected/resizing/drop states must be visible without decorative pulse.

Acceptance:

- Create, edit, remove, resize, and save widget flows are documented.
- Empty dashboard and error states are documented.
- Mobile widget library has a clear open/search/select/close path.
- Product adapter remains outside `packages/ui`.

---

### Phase 3 — Metrics Explorer scenario expansion

Work:

- Define the canonical flow:
  1. Search/select metric.
  2. Inspect chart and table.
  3. Change time range/view.
  4. Compare or filter.
  5. Save as widget.
  6. Add to dashboard.
- Use:
  - `MetralyNavigationTree`
  - `MetralySegmentedControl`
  - `MetralyInput`
  - `MetralySelect`
  - chart wrappers
  - `MetralyTable`
  - `MetralyMetricCard`
  - `StateBadge`.

Deferred:

- `MetralyGauge`
- `MetralyHeatmap`
- `MetralyFilterPill`

Acceptance:

- Explorer has loading, empty, no-results, invalid-query, stale-data, and error states.
- Mobile explorer prioritizes metric tree/search first, filters second.
- "Save as widget" handoff to dashboard is explicitly documented.

---

### Phase 4 — Connectors, marketplace, and integration health

Work:

- Split catalogue discovery from connection management.
- Marketplace recipe covers:
  - available integration;
  - installed integration;
  - setup required;
  - error;
  - loading;
  - disabled/coming soon.
- Connector health scenario covers:
  - connected;
  - syncing;
  - delayed;
  - failed auth;
  - rate-limited;
  - no data yet.

Components:

- `MetralyCard`
- `MetralyButton`
- `MetralyBadge`
- `StateBadge`
- `MetralyIcon`
- `MetralyCodeBlock`
- `MetralyTable`
- `MetralyDrawer` / `MetralyBottomSheet` for setup details where needed.

Acceptance:

- Do not create public `PluginCard` yet.
- Use recipe composition unless three or more product flows require the same card API.
- Document retry/reconnect states.

---

### Phase 5 — Onboarding and dashboard wizard

Work:

- Rework onboarding around activation:
  1. Choose source.
  2. Connect source.
  3. Validate incoming data.
  4. Pick first dashboard template.
  5. Review and create dashboard.
- Keep wizard state machine product-owned.
- Use brandbook primitives and recipe layout only.

Components:

- `MetralyButton`
- `MetralyInput`
- `MetralySelect`
- `MetralyCodeBlock`
- `MetralyCard`
- `StateBadge`
- `MetralySegmentedControl`
- `MetralyBottomSheet` for mobile step details if needed.

Acceptance:

- First-run empty state leads to onboarding.
- User can skip and resume later if product supports it.
- Failure/retry states are documented.
- Stepper remains recipe-only.

---

### Phase 6 — AI Assistant contextual UX

Work:

- Keep assistant UI product-owned.
- Define context modes:
  - no context;
  - selected metric;
  - selected dashboard;
  - selected widget;
  - incident/regression investigation;
  - onboarding helper.
- Define states:
  - empty prompt suggestions;
  - streaming;
  - partial answer;
  - failed answer;
  - cited/linked insight;
  - action suggestion.

Components:

- `MetralyPanel`
- `MetralyCard`
- `MetralyInput`
- `MetralyButton`
- `MetralyBadge`
- `StateBadge`
- `MetralyCodeBlock`
- `MetralyTelemetryLine`.

Acceptance:

- No public chat bubble component yet.
- Assistant never hides the selected data context.
- Suggested actions use normal package buttons/links and remain product-owned.

---

### Phase 7 — Product migration execution

Work:

- Add `@metraly/ui` to `getmetraly/metraly/ui`.
- Bootstrap `ThemeProvider`.
- Replace icons, buttons, inputs, badges, cards, panels, tables.
- Replace shell with `MetralyShell` and associated seams.
- Replace dashboard surfaces with dashboard package seams.
- Migrate recipes screen by screen.

Suggested order:

1. Static primitives and tokens.
2. Shell/navigation.
3. Dashboard read-only view.
4. Dashboard editor.
5. Metrics Explorer.
6. Marketplace/connectors.
7. Onboarding/wizard.
8. AI Assistant composition.
9. Cleanup legacy UI components.

Acceptance:

- Product functionality is unchanged or intentionally documented.
- Rollback is possible per screen.
- Visual diffs are captured for each major screen.
- Tests pass after each screen-level migration.

---

## 6. Screen-by-screen acceptance checklist

| Screen/scenario | Required states | Required mobile behavior | Public API changes allowed? |
|---|---|---|---:|
| Dashboard overview | loading, empty, populated, stale data, widget error | stacked cards, internal chart/table scroll | no |
| Dashboard editor | edit, dragging, resizing, drop target, unsaved changes, save success/error | widget library in sheet/drawer | no |
| Metrics Explorer | loading, no results, selected metric, compare/filter, data error | metric tree/search first, filters compact | only if repeated gap appears |
| Marketplace | loading, installed, setup required, coming soon, error | card grid collapses cleanly | no |
| Connectors | connected, syncing, delayed, auth failed, no data | setup detail in drawer/sheet | no |
| Onboarding | first run, skipped, reconnect, validation failed, complete | one primary action per step | no |
| Dashboard wizard | template select, source select, review, create error | step content stays linear | no |
| AI Assistant | no context, selected context, streaming, failed, suggested action | panel or sheet, not full-screen by default | no |

---

## 7. Verification commands

Run in `getmetraly/brandbook`:

```bash
npm run ui:check
npm run site:typecheck
npm run site:test
npm run build-storybook
npm run test:e2e
```

Required Storybook smoke targets:

```text
/scenarios-dashboard-editor--default
/scenarios-component-state-board--default
/story/metraly-shell--expanded
/story/metraly-shell--mobile
/story/metraly-drawer--default
/story/metraly-bottom-sheet--default
/story/metraly-navigation-tree--metric-tree
/story/metraly-segmented-control--default
/patterns-*
/components-*
```

Required viewport matrix:

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

Record:
- body-level horizontal overflow;
- internal scroll behavior;
- focus-visible states;
- overlay keyboard behavior;
- topbar wrapping;
- selected/hover/disabled/loading/error states;
- chart and table clipping;
- dashboard editor widget-library behavior.

---

## 8. Risks and guardrails

| Risk | Guardrail |
|---|---|
| Package becomes product-screen library. | Keep screen-specific logic in product and document recipes only. |
| Mobile migration regresses. | Include mobile acceptance criteria in every phase. |
| AI Assistant becomes too generic or untrusted. | Always show selected context and keep assistant actions explicit. |
| Marketplace/connectors remain ambiguous. | Separate catalogue from active connection health. |
| Dashboard concepts overlap. | Resolve naming before migration, especially Dashboard vs Board vs Editor vs Wizard. |
| Premature chart APIs. | Add gauge/heatmap only after repeated product need. |
| Overlay semantics outpace behavior. | Harden drawer/sheet before production mobile migration. |

---

## 9. Next recommended action

Start with:

```text
Phase 1a — Overlay accessibility hardening
```

Then immediately run:

```text
Phase 1b — Shell/mobile verification
```

Reason: mobile shell, dashboard editor widget library, metrics explorer utilities, onboarding, and connector setup all depend on reliable drawer/sheet behavior.
