# Component Status

Status: active migration tracker.

This table records the current maturity of Metraly Brandbook components. It should be updated in every PR that changes component API, visual state coverage, Storybook coverage, tests or downstream adoption status.

## Prototype conformance references

Use these files as the current execution baseline for bringing Brandbook components into alignment with the Claude Design prototype source of truth in `getmetraly/docs/prototypes/brandbook/*`:

- `docs/migration/brandbook-prototype-audit-handoff.md` — checkpoint/handoff context.
- `docs/migration/brandbook-prototype-conformance-audit.md` — full mismatch matrix and recommended implementation order.
- `docs/migration/brandbook-prototype-phase-plan.md` — active phase plan, canonical state vocabulary and exit criteria.

When changing any component below, update this tracker and keep the phase plan in sync.

## Status legend

- **Preview-only** — reference scenario only, not a reusable contract.
- **Visual-ready** — visual direction accepted, implementation still needs hardening.
- **Hardening** — reusable implementation exists or is being shaped, but API/a11y/tests are not final.
- **Release Candidate** — ready for controlled pilot usage in `website` or `metraly`.
- **Adopted** — used and verified in at least one downstream repository.
- **Deprecated** — old local implementation has a replacement path.

## Current component matrix

| Component | Current status | Visual route | Storybook | Tests | Website pilot | Metraly pilot | Notes |
|---|---|---|---|---|---|---|---|
| `StateBadge` | Hardening → RC candidate | `/components/previews`, `/components/feedback` | Yes | Yes | Candidate | Candidate | Phase 1 baseline component. Semantic aliases, tone metadata, compact usage, non-wrapping label structure and chart badge slots are covered, but prototype aliases `ok`, `new`, `purple`, and `disabled` still need explicit normalization before RC. |
| `MetralyBadge` | Hardening → RC candidate | `/components/primitives`, `/components/charts` | Partial | Yes | Candidate | Candidate | Claude Design mono/uppercase/pill contract is covered. Use for static semantic chips without telemetry dot. |
| `MetralyCard` | Hardening → RC candidate | `/components/previews`, `/components/primitives` | Yes | Yes | Candidate | Candidate | Density, loading metadata and custom empty copy are covered. Compact CSS still needs final visual review. |
| `MetralyPanel` | Hardening → RC candidate | `/components/previews`, `/components/primitives` | Partial | Yes | Candidate | Candidate | Padding/focus metadata covered; keep small and tokenized. |
| `MetralyMetricCard` | Hardening → RC candidate | `/components/previews`, `/examples/engineering-dashboard` | Partial | Yes | Candidate | Candidate | Description, density and variant metadata covered. Validate dense dashboard and marketing usage before RC. |
| `MetralyTelemetryLine` | Visual-ready | `/components/previews` | Partial | Basic | Candidate | Candidate | Keep pulse usage restrained and semantic. Phase 1 should verify reduced-motion and semantic allow-list behavior. |
| `MetralyCheckbox` | Hardening | `/components/previews`, `/components/forms` | Yes | Yes | Later | Later | Phase 1 forms batch. Pulse marker removed from DOM. Needs prototype loading/hint/error/focus-visible state verification before RC. |
| `MetralyRadio` | Hardening | `/components/previews`, `/components/forms` | Yes | Yes | Later | Later | Phase 1 forms batch. Pulse marker removed from DOM. Needs group behavior and keyboard review before RC. |
| `MetralySwitch` | Hardening | `/components/previews`, `/components/forms` | Yes | Yes | Later | Later | Phase 1 forms batch. Pulse marker removed from DOM. Needs loading, accent and disabled-state review before RC. |
| `MetralySelect` | Hardening | `/components/previews`, `/components/forms` | Partial | Basic | No | No | Phase 1 forms batch. Keep native/simple until custom behavior has full keyboard/a11y model; add prototype visual-state coverage first. |
| `MetralyTabs` | Hardening | `/components/previews`, `/components/forms` | Partial | Yes | No | No | Phase 1 forms batch. Count slot and keyboard navigation are covered. Rail/underline geometry now matches the Claude Design prototype source of truth in `metraly-forms.css`; keep final visual verification before RC. |
| `MetralyTable` | Hardening | `/components/previews`, `/components/data-display` | Yes | Yes | Candidate | Candidate | Phase 3 target. Promote only as display-first primitive; sorting/filtering wrappers come later. Needs unread/live row marker conformance. |
| `WidgetPickerCard` | Hardening | `/components/previews`, `/components/dashboard` | Yes | Yes | No | Candidate | Phase 2 P0 target. Needs first-class `kind`, `new`, `loading`, and `dragging` prototype states before promotion. |
| `DashboardWidget` | Hardening | `/components/previews`, `/components/dashboard` | Yes | Yes | No | Candidate | Phase 2 P0 target. Canonical widget shell for board composition; current footer drag handle must move to header to match prototype geometry. |
| `DashboardToolbar` | Hardening | `/components/previews`, `/components/dashboard` | Partial | Yes | No | Later | Phase 2/3 target. Dashboard-level control bar for tabs, search, sync state and editor actions. Needs two-row prototype layout verification. |
| `DashboardDropZone` | Hardening | `/components/previews`, `/components/dashboard` | Partial | Yes | No | Later | Phase 2 target. DnD feedback surface only. Default drop zones must stay pulse-free; static board-edit previews cover active and rejected states. |
| `DashboardResizeHandle` | Hardening | `/components/previews`, `/components/dashboard` | Partial | Yes | No | Later | Phase 2 P0 target. Resize affordance only; currently covers east/south/southeast and must expand to all eight prototype directions. |
| `DashboardGrid` | Hardening | `/components/dashboard`, `/patterns/widget-editor` | Partial | Basic | No | Later | Phase 2/3 target. Display-first grid wrapper; keep compatible with `react-grid-layout` and upstream layout snapshots and persistence reloads. |
| `DashboardEmptyState` | Hardening | `/components/previews`, `/components/dashboard` | Partial | Basic | Candidate | Candidate | Phase 2/3 target. First-run board message and call to action surface. |
| `MetralyChartCard` | Hardening | `/components/charts`, `/components/previews` | Yes | Yes | Later | Candidate | Phase 4 target. First chart wrapper candidate; badge slot is covered; validate SSR and downstream usage. |
| `MetralySparkline` | Hardening | `/components/charts`, `/components/previews` | Yes | Basic | Later | Candidate | Phase 4 target. Useful in metric cards and dashboard widgets. |
| `MetralyLineChart` | Hardening | `/components/charts` | Yes | Basic | No | Later | Phase 4 target. Keep wrapper minimal; do not scatter raw Recharts. |
| `MetralyAreaChart` | Hardening | `/components/charts` | Yes | Basic | No | Later | Phase 4 target. Validate tooltip and axis readability. |
| `MetralyBarChart` | Hardening | `/components/charts` | Yes | Basic | No | Later | Phase 4 target. Validate dense dashboard containers. |
| `MetralyComposedChart` | Hardening | `/components/charts`, `/components/previews` | Yes | Basic | No | Later | Phase 4 target. Keep API compact; avoid every chart becoming a separate component. |
| `MetralyChartTooltip` | Hardening | `/components/charts` | Indirect | Basic | No | Later | Phase 4 target. Tooltip must include labels and values, not color-only series identification. |
| Full dashboard editor composition | Preview-only | `/components/previews`, `/patterns/widget-editor` | Yes | Smoke | No | No | Static reference only until DnD, keyboard and persistence are verified. |
| Real DnD behavior | Preview-only | `/components/previews` | No | No | No | No | Must remain compatible with `@dnd-kit/*`, `react-grid-layout` and product persistence. |

## Next promotion targets

1. Finish Phase 1 conformance for `StateBadge`, `MetralyTelemetryLine`, `MetralyCheckbox`, `MetralyRadio`, `MetralySwitch`, `MetralySelect`, and `MetralyTabs`.
2. Start Phase 2 P0 dashboard geometry fixes for `WidgetPickerCard`, `DashboardWidget`, and `DashboardResizeHandle`.
3. `MetralyTable` as display-only Release Candidate after unread/live marker conformance.
4. `MetralyChartCard` + `MetralySparkline` to chart hardening review.
5. `DashboardWidget` shell to metraly pilot candidate only after prototype header grip and resize geometry are fixed.

## Update policy

Every component PR must update this file when it changes:

- status;
- API shape;
- visual routes;
- Storybook coverage;
- tests;
- website pilot readiness;
- metraly pilot readiness;
- known risks.
