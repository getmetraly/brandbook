# Phase 1 — Implementation notes

Source of truth: `Metraly Brandbook System Design Extension Plan.md` (Phase 1 scope).

This pack contains migration-ready source files for the new Phase 1 components, intended to be transplanted into `getmetraly/brandbook/packages/ui` and `getmetraly/brandbook/site`.

---

## What was implemented

### Chart primitives (charts/)

- **`MetralyGauge`** — semicircle / compact / inline variants. `role="meter"` semantics. Threshold bands, tone-aware arc, mono-font value, full 12-state matrix, optional retry hook for error states. Reduced-motion respected.
- **`MetralyHeatmap`** — `role="grid"` with row/column semantics. Roving focus across cells via `useRovingSelection`. Per-cell aria labels, hidden text summary, status-tinted cells, optional legend. Mobile-safe (scroll-overflow + cell-value suppression).

### Surface components (components/)

- **`ActivityFeed`** — engineering event stream. `feed` and `widget` modes. Group-by `none` / `day` / `kind`. Mono timestamps and chip-rendered metadata. No emoji. Skeleton loading state. Realistic engineering kinds (deploy, PR, incident, sync, alert, plugin, ai, connector, audit).
- **`InsightCard`** — product-level insight (distinct from `AnswerCard`). Source modes: `rules / anomaly / trend / policy / ai`. AI-generated tag only when `source === "ai"`. Confidence as tone-tagged label, not magic %. Evidence list (compact 3 / full 8). Primary + secondary actions.
- **`StateBoard`** — grid or list of per-item status tiles. Summary chips above. Status semantics: `ok / warning / danger / info / neutral / gated / disabled`. Interactive tiles via `onActivate`.
- **`WidgetStateMatrix`** — documentation helper. Generic over the WidgetStateStatus enum. Used in stories and reviewer dashboards to verify state coverage at a glance.

### Source / connector primitives (source/)

- **`TokenInput`** — committed-mode shows only masked preview; never re-displays the full token. Reveal-on-draft auto-closes on blur. Validation states wire through `aria-live`. Disables 1Password / LastPass autofill on the field. Token kinds: `github-pat / github-pat-fine-grained / api-key / webhook-secret / provider-token`.
- **`PermissionExplainer`** — scope-by-scope explanation with state (`granted / missing / extra / deprecated / unknown`), required vs optional, metric mapping. Source-agnostic — no embedded scope catalog.
- **`BackfillRangePicker`** — `7d / 30d / 90d / custom`. Estimated events prefixed with `~` unless confidence is `exact`. ETA only shown if provided. Optional friction warning.
- **`ConnectionTestPanel`** — covers 8 statuses (`not_tested / testing / ready / auth_failed / permission_denied / rate_limited / source_unavailable / degraded`). Per-check breakdown. Single retry action.
- **`SyncProgressPanel`** — covers 9 stages (`queued / discovering / backfilling / incremental / paused / rate_limited / completed / failed / cancelled`). Indeterminate progress when total is unknown. Mono numbers throughout. Cancel/pause/resume/retry are presentational only — backend wired by caller.

### Settings (settings/)

- **`SettingsSection`** — title + description + optional badge + actions + body. Heading level configurable. CardShell-framed by default.
- **`SettingsAuditRow`** — mono-rendered audit log row (timestamp / actor / action / subject / detail / refId).
- **`AIProviderConnectorCard`** — one card per AI provider. Provider state matrix (`not_configured / configured / testing / ready / auth_failed / rate_limited / disabled / gated`). Models list with default tag. Privacy line. Optional `pluginAttribution` shows "via Plugin · <name>".
- **`BYOLLMConnectorPanel`** — Settings → AI Provider Connectors. First-party providers + plugin-contributed providers in the same panel. Empty state with "Add provider" CTA. Routing + privacy summary lines.

### Dashboard (dashboard/)

- **`DashboardWidgetExamples`** — composition recipes for embedding Gauge / Heatmap / ActivityFeed / InsightCard / StateBoard inside `DashboardWidget`. Used by stories so reviewers can see widget-shell composition without an app harness.
- **`MoveMenuA11yExample`** — P0 keyboard fallback for Dashboard Editor. Demonstrates Tab to select, arrow keys to move, MoveMenu as non-drag alternative. Pulse glyph never used as drag handle; HandlePrimitive's neutral grip is.
- **`DashboardWizardSplitBuilder`** — dashboard-builder-specific split layout (rail + canvas). Distinct from generic `WizardLayout`. Locked-step + error-step support. Mobile-collapses to single column.

### CSS

One stylesheet per component family in `packages/ui/src/styles/`. All values reference `--m-*` tokens; no raw hex. Reduced-motion respected throughout.

---

## What was intentionally NOT implemented

- **Light theme.** P3 per the approved plan. Components use existing `--m-*` tokens; light-theme parity will fall out of the brandbook's theme switch once it ships.
- **Backend behavior.** Token validation, connection probing, sync orchestration, dashboard persistence — all callbacks are presentational. Wiring is the consuming app's job.
- **A new `DashboardWidget`.** The example components use the existing brandbook `DashboardWidget` shell. We do not redesign it.
- **Plugin Marketplace UI.** Per the approved rule, `Plugin Marketplace` is hidden when the workspace is ineligible. Phase 1 ships only the Plugin Catalog scaffolding that already exists in brandbook. We did not add a "Coming soon marketplace" surface.
- **Per-provider catalog of models.** Models lists in stories are illustrative. A real workspace will fetch its provider's catalog.
- **Validation runs (`npm run …`).** This pack is a source drop; CI is a brandbook concern. See `PHASE_1_VALIDATION.md` for commands.

---

## Existing brandbook components reused

| Reused | Used by |
|---|---|
| `CardShell` | every framed surface |
| `FieldShell` | `TokenInput`, `BackfillRangePicker` |
| `StateBlock` | every component's non-ready state |
| `StatusBadge` | every component (state pills) |
| `MetralySkeleton` | `ActivityFeed` loading |
| `useRovingSelection` | `MetralyHeatmap` cell focus |
| `DashboardWidget` | `DashboardWidgetExamples`, `MoveMenuA11yExample` |
| `HandlePrimitive` | `MoveMenuA11yExample` (drag affordance) |
| `MoveMenu` | `MoveMenuA11yExample` (keyboard fallback) |

These imports use relative paths in source files. During migration into `packages/ui`, swap to the canonical package-relative imports (e.g. `from "../components/CardShell"` is already correct for an in-package file).

---

## Folder layout decisions

- `packages/ui/src/charts/` — Gauge and Heatmap are chart primitives. They sit alongside `MetralyChartCard`, `MetralyLineChart`, etc.
- `packages/ui/src/components/` — `ActivityFeed`, `InsightCard`, `StateBoard`, `WidgetStateMatrix` are top-level surfaces. They belong with `MetralyCard`, `MetralyTable`, `StateBadge`, `MetralyEmptyState`.
- `packages/ui/src/source/` — new folder for connector / source primitives. Justification: these are tightly cohesive (one surface family) and not generic enough to live under `components/`. If the brandbook prefers a flat `components/` layout, the files can be moved unchanged — only the import paths shift.
- `packages/ui/src/settings/` — new folder for settings surfaces. Same justification.
- `packages/ui/src/dashboard/` — additions go alongside `DashboardWidget`, `DashboardGrid`, `MoveMenu`, etc.

If the brandbook owners want fewer folders, `source/` and `settings/` files can land directly under `components/`. See `PHASE_1_MIGRATION_NOTES.md` for the rename map.

---

## Risks and assumptions

| Item | Note |
|---|---|
| `useRovingSelection` API | Assumed signature: `{ rowCount, colCount, onActivate }` returning `{ activeIndex, setActiveIndex, getCellProps, gridProps }`. If the brandbook's hook signature differs, the heatmap's roving-focus wiring is a 5-line adapter swap. |
| `StateBlock` API | Assumed props: `tone: "loading" \| "empty" \| "warning" \| "error"`, `title`, `description?`, `action?: { label; onClick }`, `compact?`. Adjust if brandbook's prop names differ. |
| `StatusBadge` API | Assumed `status` enum includes `"live" \| "neutral" \| "warning" \| "error"`. Map to the brandbook's actual enum during integration. |
| `DashboardWidget` shape | Assumed `<DashboardWidget title subtitle state onDrilldown compact editChrome>`. If brandbook's shell uses different prop names, only `DashboardWidgetExamples` and `MoveMenuA11yExample` are affected. |
| `MoveMenu` props | Assumed: `ariaLabel, canMoveUp/Down/Left/Right, onMoveUp/Down/Left/Right, disabled`. Same caveat. |
| `HandlePrimitive` props | Assumed `ariaLabel`. Renders the neutral grip dots; no other props needed for the a11y example. |

The above are documented as **assumptions** rather than dependencies. They are small adapters away if the brandbook's surface differs.

---

## Things a coding agent should check during integration

1. Component-file paths match the brandbook's `src/` conventions (the pack assumes the layout shown in `PHASE_1_COMPONENT_MATRIX.md`).
2. `packages/ui/src/index.ts` exports are MERGED, not REPLACED.
3. CSS files are imported either by each component (current behavior) OR rolled into the brandbook's CSS entry — pick one and be consistent.
4. `StatusBadge` / `StateBlock` / `MetralySkeleton` / `FieldShell` / `CardShell` prop names match the brandbook's current API; adjust call-sites if not.
5. `useRovingSelection` signature matches; if not, write a 5-line adapter in `MetralyHeatmap`.
6. Storybook scenarios use stable paths (`Charts/*`, `Components/*`, `Source/*`, `Settings/*`, `Dashboard/*`); confirm these match the brandbook's Storybook conventions.
7. Run `npm run ui:check`, `site:typecheck`, `site:test`, `build-storybook` and resolve any type drift surfaced by the assumptions above.
