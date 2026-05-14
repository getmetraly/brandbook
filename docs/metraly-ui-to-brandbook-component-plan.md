# Metraly UI → Brandbook Component Plan

**Status:** Phase 0 review plan updated; implementation paused until this plan is accepted or a minimal follow-up phase is explicitly selected.  
**Last updated:** 2026-05-14  
**Author:** Design-system audit — Metraly brandbook review

**Scope rule:** `getmetraly/metraly/ui` remains a read-only product inventory and migration target. `getmetraly/brandbook` is the only repository that may receive changes in this workstream.

**Current decision:** The recently added `@metraly/ui` seams are directionally correct and should remain public. This pass does **not** justify a large refactor. The safest immediate change is documentation alignment: the previous plan still described several now-shipped seams as “missing” and did not capture the current API/a11y trade-offs.

---

## 1. Current state summary

### Reviewed baseline

The architecture baseline is:

- `docs/metraly-ui-to-brandbook-component-plan.md`
- `docs/metraly-ui-to-brandbook-component-map.md`

Supporting contracts inspected for this pass:

- `docs/component-contract.md`
- `docs/responsive-contract.md`
- `docs/storybook-contract.md`
- `docs/design-principles.md`

Source files inspected directly:

- `packages/ui/src/index.ts`
- `packages/ui/src/components/MetralyButton.tsx`
- `packages/ui/src/components/MetralyInput.tsx`
- `packages/ui/src/components/MetralyIcon.tsx`
- `packages/ui/src/components/MetralyBadge.tsx`
- `packages/ui/src/components/MetralySegmentedControl.tsx`
- `packages/ui/src/components/MetralyNavigationTree.tsx`
- `packages/ui/src/shell/MetralyShell.tsx`
- `packages/ui/src/shell/MetralySidebar.tsx`
- `packages/ui/src/shell/MetralyTopbar.tsx`
- `packages/ui/src/shell/MetralyDrawer.tsx`
- `packages/ui/src/shell/MetralyBottomSheet.tsx`
- `packages/ui/src/styles/metraly-button.css`
- `packages/ui/src/styles/metraly-input.css`
- `packages/ui/src/styles/metraly-segmented.css`
- `packages/ui/src/styles/metraly-navigation-tree.css`
- `packages/ui/src/styles/metraly-code-block.css`
- `packages/ui/src/styles/metraly-shell.css`
- `site/.storybook/preview.ts`
- `stories/MetralyShell.stories.tsx`

Storybook source references used as visual/composition proxies:

- `stories/MetralyButton.stories.tsx`
- `stories/MetralyInput.stories.tsx`
- `stories/MetralyIcon.stories.tsx`
- `stories/MetralyShell.stories.tsx`
- `stories/MetralySegmentedControl.stories.tsx`
- `stories/MetralyNavigationTree.stories.tsx`
- `stories/MetralyCodeBlock.stories.tsx`
- `stories/MetralyDrawer.stories.tsx`
- `stories/MetralyBottomSheet.stories.tsx`
- `stories/MetricsExplorerRecipe.stories.tsx`
- `stories/AuthFormRecipe.stories.tsx`
- `stories/IntegrationCardRecipe.stories.tsx`
- `stories/WizardLayoutRecipe.stories.tsx`
- `stories/scenarios/dashboard-editor/DashboardEditorScenario.tsx`

### Manual Storybook rendering status

Manual browser inspection at `localhost:6006` was **not executed in this API-only pass**. Source-level review indicates the stories exist and import package CSS through `site/.storybook/preview.ts`, but visual sign-off still requires the verification checklist below.

### Current public seams

The current `packages/ui/src/index.ts` exports the intended seams:

- Foundation: `MetralyButton`, `MetralyInput`, `MetralyIcon`, `MetralyCodeBlock`
- Shell/overlays: `MetralyShell`, `MetralySidebar`, `MetralySidebarSection`, `MetralySidebarItem`, `MetralyTopbar`, `MetralyDrawer`, `MetralyBottomSheet`
- Navigation: `MetralySegmentedControl`, `MetralyNavigationTree`, `MetralyTabs`, `DashboardToolbar`
- Existing primitives/data display: badges, cards, panel, metric card, table, telemetry line, forms, dashboard widgets, chart wrappers

---

## 2. Visual audit summary

### Colors

**Source-level result:** pass with minor follow-up notes.

- New CSS uses `--m-*` tokens for backgrounds, foregrounds, lines, cyan, purple, and semantic state colors.
- `MetralyButton`, `MetralyInput`, `MetralySegmentedControl`, `MetralyNavigationTree`, shell, drawer, and bottom sheet avoid legacy product variables such as `--bg`, `--glass`, `--border`, `--cyan`, `--purple`, `--text`, `--muted`.
- Cyan usage is mostly functional: primary action, selected state, focus, active navigation, dashed add affordance.
- Purple is not overused in the inspected package files.
- Idle shell/card surfaces do not introduce decorative glow.

**Follow-up:** run a repository-level legacy-token grep in a local checkout before marking the visual audit complete:

```bash
rg "--(bg|glass|glass2|border|border2|cyan|purple|success|warning|error|text|muted|muted2)" packages/ui/src
```

### Typography

**Source-level result:** pass.

- Components use `--m-font-ui` for UI controls and `--m-font-mono` for code, breadcrumb/meta text, navigation metadata, and command surfaces.
- Font sizes remain dense: 9–16 tokenized sizes dominate inspected CSS.
- No new marketing-scale display typography was found in package components.

### Spacing and density

**Source-level result:** pass with one non-blocking cleanup.

- Controls align with `--m-control-h` around 30px.
- Navigation rows align with `--m-row-h` around 32px.
- Toolbar/action gaps stay in the 6–12px range.
- `MetralyButton` has duplicate `white-space: nowrap`; this is harmless and does not justify an implementation pass by itself.

### Radius and borders

**Source-level result:** pass.

- Controls use `--m-r-1` / `--m-r-2`.
- Drawer/bottom sheet use restrained panel radii.
- Selected borders use color changes without layout-size changes.
- Borders use `--m-line`, `--m-line-faint`, and `--m-line-strong`.

### Motion and interaction

**Source-level result:** pass for base controls; partial for overlays.

- Hover/focus transitions are tokenized and short.
- Focus-visible rings are present on inspected interactive controls.
- Disabled and loading states are present for `MetralyButton`; disabled/error states are present for `MetralyInput`.
- `MetralyDrawer` and `MetralyBottomSheet` support Escape close and scrim close.

**Overlay limitation:** current drawer/sheet implementations do not implement focus trap, focus restore, or body scroll lock. They are acceptable for recipe validation, but should not be considered production-grade modal primitives until Phase 1a below.

### Accessibility

**Source-level result:** mostly pass, overlay gap noted.

- Buttons are real `<button>` elements unless `MetralySidebarItem` renders an `<a>` for `href`.
- `MetralyInput` supports label, description, error text, `aria-invalid`, and `aria-describedby`.
- `MetralySegmentedControl` uses `aria-pressed` and keyboard arrow navigation.
- `MetralyNavigationTree` uses `role="tree"`, `role="treeitem"`, `aria-level`, `aria-expanded`, and arrow/Home/End keyboard handling.
- `MetralyDrawer` and `MetralyBottomSheet` use `role="dialog"` and `aria-modal="true"` but need focus management.

### Responsiveness

**Source-level result:** pass pending manual visual sign-off.

- `MetralyShell` owns full-height flex layout with `overflow: hidden`.
- `MetralyTopbar` wraps actions on narrow widths.
- Drawer is full-width under 768px.
- Segmented control uses internal horizontal scrolling.
- Navigation tree rows truncate internally.
- Story recipes include desktop/tablet/mobile variants for shell and explorer patterns.

---

## 3. Component-by-component review

| Component | Category | Public export | Should remain public | Merge / recipe-only | API change now | Visual quality | Token usage | Storybook coverage | Migration usefulness | Decision / required action |
|---|---:|---:|---:|---|---:|---|---|---|---|---|
| `MetralyButton` | Form primitive | yes | yes | no | no | pass | pass | enough | high | Keep. Do not add polymorphic `as` until a real link-button migration requires it. |
| `MetralyInput` | Form primitive | yes | yes | no | no | pass | pass | enough | high | Keep. `search`, label, description, error, icon slots are sufficient. Defer `size` prop. |
| `MetralyIcon` | Icon primitive | yes | yes | no | no | pass | pass | enough | high | Keep typed names. Add icons only when product migration exposes a missing name. |
| `MetralyCodeBlock` | Data primitive | yes | yes | no | no | pass | pass | enough | medium | Keep public because auth, onboarding, CLI, and formula flows reuse it. |
| `MetralyShell` | Layout seam | yes | yes | no | no | pass | pass | enough | high | Keep public; it enforces overflow and app-shell contract. |
| `MetralySidebar` | Navigation shell | yes | yes | no | no | pass | pass | enough | high | Keep public. Do not add product-only pin/user/search behavior. |
| `MetralySidebarSection` | Navigation shell | yes | yes | no | no | pass | pass | enough | high | Keep as subcomponent. |
| `MetralySidebarItem` | Navigation shell | yes | yes | no | no | pass | pass | enough | high | Keep. Button/link duality is justified. |
| `MetralyTopbar` | Layout seam | yes | yes | no | no | pass | pass | enough | high | Keep separate from `DashboardToolbar`; page header vs dashboard sub-toolbar are different. |
| `MetralyDrawer` | Overlay | yes | yes | no | no | minor issues | pass | enough | medium | Keep public, but document focus-trap/body-scroll-lock gap before production modal use. |
| `MetralyBottomSheet` | Overlay | yes | yes | no | no | minor issues | pass | enough | medium | Keep public for mobile utility trays; same a11y gap as drawer. |
| `MetralySegmentedControl` | Navigation/form | yes | yes | no | no | pass | pass | enough | high | Keep separate from `MetralyTabs`; it is a filled pill selector, not a tab bar. |
| `MetralyNavigationTree` | Navigation/data | yes | yes | no | no | pass | pass | enough | high | Keep. Current groups toggle instead of selecting; acceptable for Metrics Explorer. |
| `MetralyBadge` | Badge primitive | yes | yes | no | docs only | pass | pass | enough | high | Keep. Docs must reflect actual variants: `primary`, `secondary`, `success`, `warning`, `error`, `info`. |
| `StateBadge` | Operational status | yes | yes | no | no | pass | pass | enough | high | Keep. Use for live/stale/error/new telemetry states. |
| `MetralyCard` | Surface primitive | yes | yes | no | no | pass | pass | enough | high | Keep as base card shell. |
| `MetralyPanel` | Surface primitive | yes | yes | no | no | pass | pass | enough | high | Keep as panel container. |
| `MetralyMetricCard` | Data display | yes | yes | no | no | pass | pass | enough | high | Keep. Covers stat cards and DORA cards. |
| `MetralyTable` | Data display | yes | yes | no | no | pass | pass | enough | high | Keep real table semantics and internal horizontal scroll. |
| `MetralyTabs` | Navigation | yes | yes | no | no | pass | pass | enough | high | Keep; do not merge with segmented control. |
| `MetralyTelemetryLine` | Dense telemetry row | yes | yes | no | no | pass | pass | enough | medium | Keep for widget/metric dense rows. |
| `MetralyCheckbox` | Form | yes | yes | no | no | pass | pass | enough | high | Keep. |
| `MetralyRadio` | Form | yes | yes | no | no | pass | pass | enough | medium | Keep. |
| `MetralySwitch` | Form | yes | yes | no | no | pass | pass | enough | high | Keep. |
| `MetralySelect` | Form | yes | yes | no | no | pass | pass | enough | high | Keep. Do not add `MetralyFilterPill`; only extend select if recipe pressure proves it. |
| `WidgetPickerCard` | Dashboard | yes | yes | no | no | pass | pass | enough | high | Keep. Pulse-free selected state remains intentional. |
| `DashboardGrid` | Dashboard | yes | yes | no | no | pass | pass | enough | high | Keep; product grid adapter remains product-side. |
| `DashboardWidget` | Dashboard | yes | yes | no | no | pass | pass | enough | high | Keep. Do not add product widget bodies to package. |
| `DashboardToolbar` | Dashboard | yes | yes | no | no | pass | pass | enough | high | Keep separate from topbar. |
| `DashboardEmptyState` | Dashboard | yes | yes | no | no | pass | pass | enough | medium | Keep for dashboard/editor flows. |
| `DashboardDropZone` | Dashboard | yes | yes | no | no | pass | pass | enough | high | Keep pulse-free. |
| `DashboardResizeHandle` | Dashboard | yes | yes | no | no | pass | pass | enough | high | Keep; only selected/resizing states. |
| `WidgetRegistry` helpers/types | Dashboard | yes | yes | no | no | n/a | n/a | enough | high | Keep type/helpers public; renderers remain product-side. |
| Chart wrappers | Charts | yes | yes | no | no | pass | pass | enough | high | Keep. Gauge/heatmap remain deferred until product migration needs canonical wrappers. |

---

## 4. API review

### Recommended API changes now

No code/API changes are recommended in this pass.

Reason: the current API is already minimal enough for future `metraly/ui` migration, and the remaining issues are documentation, verification, and overlay accessibility hardening. A broad API churn now would add risk without clear migration value.

### API documentation corrections

The previous plan still described several shipped seams as missing and used proposed props that are not the actual implementation. The plan/map should now describe the shipped API, not the old proposal.

Corrections:

- `MetralyButton` is button-only today. Do not document `as` as accepted API.
- `MetralyInput` uses `search`, `label`, `description`, `iconLeft`, `iconRight`, `error`, `fullWidth`, and `wrapperClassName`. Do not document `size` as accepted API until implemented.
- `MetralyBadge` actual variants are `primary`, `secondary`, `success`, `warning`, `error`, `info`.
- `MetralyDrawer` and `MetralyBottomSheet` are public, but current accessibility is dialog semantics + Escape/scrim close only. Focus trap, focus restore, and body scroll lock are pending.
- `MetralyNavigationTree` supports controlled/uncontrolled selected value and expanded values. It does not currently support selecting a group item independently from expanding it.

### Components that must stay public

- `MetralyButton`
- `MetralyInput`
- `MetralyIcon`
- `MetralyCodeBlock`
- `MetralyShell`
- `MetralySidebar`, `MetralySidebarSection`, `MetralySidebarItem`
- `MetralyTopbar`
- `MetralyDrawer`
- `MetralyBottomSheet`
- `MetralySegmentedControl`
- `MetralyNavigationTree`
- Existing primitives/forms/data/dashboard/chart exports currently in `packages/ui/src/index.ts`

### Components to keep recipe-only or product-only

Recipe-only:

- App shell assembly
- Metrics Explorer layout
- Auth/login card
- Integration/plugin card
- Wizard layout / step indicator
- AI chat layout sketch
- Dashboard editor widget library assembly

Product-only:

- `DraggableTweaksPanel`
- AI message bubbles and assistant flow logic
- Dashboard wizard flow logic
- Onboarding wizard flow logic
- `DashboardRenderer` / `DraggableDashboardRenderer` react-grid-layout integration
- Marketplace notification channel configuration
- First-run choice screen
- Product-specific filter pill wrapper unless `MetralySelect` extension becomes necessary

### Components not to implement now

- `MetralyPopover`
- `MetralyGauge`
- `MetralyHeatmap`
- `MetralyFilterPill`
- `MetralyNotificationButton`
- `MetralyUserBlock`
- `MetralyCommandSearch`
- `WizardStepIndicator` as public API
- Any product-specific screen component inside `packages/ui`

---

## 5. Minimal public API decision

The current public set is a good minimal migration foundation.

The core principle is:

```text
public package = reusable primitives, shells, dashboard seams, chart wrappers
recipes = screen-level assemblies
product = stateful business flows and data adapters
```

`packages/ui` should remain intentionally boring: tokenized, dense, accessible, and composable. It should not become a catalogue of every product screen.

---

## 6. Storybook UX findings

| Pattern/story | Issue | Why it matters | Suggested improvement | Difficulty | Implement now |
|---|---|---|---|---:|---:|
| `Patterns/MetralyShell` | Mobile drawer demonstrates navigation, but should explicitly show focus return behavior once supported. | Mobile shell is the canonical future app shell reference. | After overlay a11y hardening, add focus return note/example. | medium | no |
| `Patterns/MetricsExplorerRecipe` | Utility switching pattern is correct, but should keep filter/action hierarchy visibly secondary to metric selection. | Prevents mobile explorer from feeling like a generic SaaS filter page. | In recipe polish, ensure metric tree/search is primary and filters remain compact. | low | no |
| `Patterns/AuthFormRecipe` | Auth should teach `MetralyInput`, `MetralyButton`, `MetralyCodeBlock`, status chip composition, not introduce a public `AuthCard`. | Keeps package API lean. | Keep as recipe; document migration steps in map. | low | yes, docs only |
| `Patterns/IntegrationCardRecipe` | Plugin/integration card should remain card composition, not a public component. | Avoids a marketplace-specific package surface. | Keep recipe and add installed/error/loading examples later. | low | no |
| `Patterns/WizardLayoutRecipe` | Step indicator repeats across product screens but still has too little evidence for public API. | Avoids premature `WizardStepIndicator` export. | Keep as recipe; promote only if a third product flow reuses it. | medium | no |
| `Components/MetralyDrawer` and `Components/MetralyBottomSheet` | Dialog semantics exist, but focus trap/restore/body lock are absent. | Production overlays must be keyboard-safe and avoid background scroll. | Phase 1a: add focus management or wrap with a proven dialog primitive if dependencies policy allows. | medium | no, not in docs-only pass |
| `Scenarios/DashboardEditor` | Scenario is a strong visual reference; avoid hiding overflow/responsiveness bugs with preview-only CSS. | This scenario is the key future product migration benchmark. | Continue using package seams and run viewport smoke tests at 320–1440px. | medium | verification |

---

## 7. Future `getmetraly/metraly/ui` migration coverage

| Product area | Can current brandbook components cover this? | Missing piece | New public component? | Recipe? | Recommended action |
|---|---|---|---:|---:|---|
| App shell | yes | Focus-managed mobile overlay polish | no | yes | Use `MetralyShell`, `MetralySidebar`, `MetralyTopbar`, `MetralyDrawer`. Keep user footer/search/notifications as slots. |
| Dashboard | yes | Product grid adapter remains external | no | yes | Use dashboard seams; keep `react-grid-layout` adapter in product. |
| Metrics Explorer | yes / partial | Filter pill can be `MetralySelect` composition; gauge/heatmap wrappers deferred | no for filter; maybe later for charts | yes | Use `MetralyNavigationTree`, `MetralySegmentedControl`, chart wrappers, table, metric cards. |
| Auth / onboarding | yes / partial | Full wizard flow remains product logic | no | yes | Use primitives inside product-owned flow. Keep auth/wizard as recipes. |
| Marketplace / integrations | yes | Installed/error/loading examples could be richer | no | yes | Use card/button/badge/icon composition. |
| AI Assistant | partial | Chat bubbles and streaming state are product-specific | no | optional sketch | Use panel/card/badge/input/button/icon/code block; keep chat primitives out of package. |

---

## 8. Implementation phases

### Phase 0 — Review and planning only

**Status:** this document and the companion map update.

Work:

- Inspect architecture docs and current public exports.
- Inspect representative component/source files and CSS.
- Inspect Storybook source references.
- Update plan and map to reflect shipped seams.
- Do not change component code.

Acceptance:

- Plan/map no longer describe shipped components as missing.
- Plan/map include component-by-component review, API decisions, Storybook UX findings, migration coverage, risks, and verification checklist.

### Phase 1a — Overlay accessibility hardening

**Do next only after Phase 0 is accepted.**

Work:

- Add focus trap and focus restore to `MetralyDrawer` and `MetralyBottomSheet`, or document a dependency-backed dialog primitive decision.
- Add body scroll lock while open.
- Add tests or interaction stories for Escape, scrim close, close button, and focus order.

Why:

- These components are public dialog seams.
- They already have `role="dialog"` and `aria-modal="true"`; focus management should match the semantic promise.

Do not:

- Add popover.
- Add additional overlay variants.
- Refactor shell/sidebar/topbar while doing this.

### Phase 1b — Verification pass

Work:

- Run the full local verification suite.
- Manually inspect Storybook at required viewports.
- Capture notes/screenshots for key stories.

### Phase 2 — Recipe polish, not new primitives

Work:

- Improve `patterns-*` stories where hierarchy or mobile usability is weak.
- Add missing recipe states: empty/loading/error/installed where relevant.
- Keep examples composed from current public primitives.

### Phase 3 — Migration guide expansion

Work:

- Add or update screen-by-screen migration guidance for `getmetraly/metraly/ui`.
- Include replacement order, risk level, tests, and rollback notes.

### Phase 4 — Deferred chart wrappers only if needed

Work:

- Consider `MetralyGauge` and `MetralyHeatmap` only when product migration needs canonical chart parity.

Do not:

- Add these preemptively.
- Add product-specific DORA or dashboard widgets as public package exports.

---

## 9. Acceptance criteria

Phase 0 is accepted when:

- `docs/metraly-ui-to-brandbook-component-plan.md` is updated with the current review plan and decisions.
- `docs/metraly-ui-to-brandbook-component-map.md` is updated with current exports, coverage matrices, token notes, rejected/deferred components, API notes, and migration readiness scores.
- No package code is changed before the plan is updated.

Phase 1a is accepted when:

- Drawer and bottom sheet keep current visuals.
- Focus is trapped while open.
- Focus returns to the trigger or previously focused element on close.
- Escape, scrim, and close button all close the overlay.
- Body scroll is locked while overlay is open.
- Reduced motion behavior is preserved if global CSS supports it.
- No body-level horizontal overflow appears at 320px, 375px, 390px, 430px, 768px, 1024px, 1280px, and 1440px.

---

## 10. Verification checklist

Run locally:

```bash
npm run ui:check
npm run site:typecheck
npm run site:test
npm run build-storybook
npm run test:e2e
```

Manual Storybook smoke URLs:

```text
/scenarios-dashboard-editor--default
/scenarios-component-state-board--default
/components-*
/patterns-*
/story/metraly-button--all-variants
/story/metraly-input--types
/story/metraly-icon--gallery
/story/metraly-shell--expanded
/story/metraly-segmented-control--default
/story/metraly-navigation-tree--metric-tree
/story/metraly-code-block--cli-block
/story/metraly-drawer--default
/story/metraly-bottom-sheet--default
```

Manual viewport matrix:

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

What to record:

- body-level horizontal overflow: yes/no
- topbar action wrapping: pass/fail
- sidebar/drawer behavior: pass/fail
- bottom sheet behavior: pass/fail
- table/chart internal scroll: pass/fail
- focus-visible state on buttons/inputs/nav/tree: pass/fail
- selected states visible without neon overuse: pass/fail
- idle surfaces pulse/glow-free: pass/fail

---

## 11. Remaining risks

1. **Manual visual inspection still required.** Source review cannot prove pixel parity or viewport overflow behavior.
2. **Overlay a11y gap.** Public dialog seams need focus trap, focus restore, and body scroll lock before production migration.
3. **Supporting docs drift.** `docs/component-contract.md` still lists the earlier rebuilt primitive surface and should later be updated to mention the new seams.
4. **Badge vocabulary mismatch.** Existing docs sometimes use old variant names; actual `MetralyBadge` variants are `primary`, `secondary`, `success`, `warning`, `error`, `info`.
5. **Tree behavior is opinionated.** Group rows toggle expansion rather than act as selectable rows. This matches metric-tree use today but may need revisiting for future hierarchical navigation.
6. **Chart gaps are deferred.** Product `Gauge` and `Heatmap` do not yet have canonical brandbook wrappers.
7. **Local checks were not run in this API-only pass.** Verification must happen in a checkout or CI before merging follow-up implementation.

---

## 12. Future migration confidence

| Area | Confidence | Reason |
|---|---:|---|
| App shell | high | Shell/sidebar/topbar/drawer seams exist and match product shell shape. Overlay a11y polish remains. |
| Dashboard | high | Dashboard grid/widget/toolbar/dropzone/resize seams already exist; product adapter remains product-side. |
| Metrics Explorer | medium-high | Navigation tree, segmented control, inputs, table, chart card, and metric cards cover most UI. Gauge/heatmap deferred. |
| Auth/onboarding | medium-high | Inputs/buttons/code/badges/cards cover inner UI; full flow stays product-side. |
| Marketplace/integrations | high | Card/button/badge/icon composition covers plugin cards without new API. |
| AI Assistant | medium | Core pieces exist, but chat bubbles/streaming/suggestions should remain product-specific. |

---

## 13. Next recommended step

Do **not** add new public components next.

Recommended next action:

```text
Phase 1a — overlay accessibility hardening for MetralyDrawer and MetralyBottomSheet
```

Reason:

- It improves an existing public seam.
- It does not bloat `packages/ui`.
- It directly supports mobile shell, metrics explorer, and widget-library migration.
- It is safer and more valuable than adding new components.

If that is too large for the next pass, run Phase 1b verification first and document exact Storybook viewport findings.
