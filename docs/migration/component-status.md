# Component Status

Status: active migration tracker.

This table records the current maturity of Metraly Brandbook components. It should be updated in every PR that changes component API, visual state coverage, Storybook coverage, tests or downstream adoption status.

## Prototype conformance references

Use these files as the current execution baseline for bringing Brandbook components into alignment with the Claude Design prototype source of truth in `getmetraly/docs/prototypes/brandbook/*`:

- `docs/migration/brandbook-prototype-audit-handoff.md` — checkpoint/handoff context.
- `docs/migration/brandbook-prototype-conformance-audit.md` — full mismatch matrix and recommended implementation order.
- `docs/migration/brandbook-prototype-phase-plan.md` — active phase plan, canonical state vocabulary and exit criteria.
- `docs/migration/brandbook-prototype-state-board-checklist.md` — expected state-board coverage by family.
- `docs/migration/brandbook-prototype-downstream-migration-notes.md` — downstream adoption guidance for `website` and `metraly`.
- `docs/migration/brandbook-prototype-pr-readiness-checklist.md` — validation and review checklist for this branch.

When changing any component below, update this tracker and keep the phase plan in sync.

## Status legend

- **Preview-only** — reference scenario only, not a reusable contract.
- **Visual-ready** — visual direction accepted, implementation still needs hardening.
- **Hardening** — reusable implementation exists or is being shaped, but API/a11y/tests are not final.
- **Release Candidate** — ready for controlled pilot usage in `website` or `metraly`.
- **Adopted** — used and verified in at least one downstream repository.
- **Deprecated** — old local implementation has a replacement path.

## Promotion rule

The status values below assume implementation, documentation, Storybook and focused tests are present in this branch. Components should move from **RC candidate** to **Release Candidate** only after local validation passes:

```bash
npm run site:test
npm run ui:check
```

## Current component matrix

| Component | Current status | Visual route | Storybook | Tests | Website pilot | Metraly pilot | Notes |
|---|---|---|---|---|---|---|---|
| `StateBadge` | RC candidate | `/components/forms/prototype-conformance` | Yes | Yes | Candidate | Candidate | Prototype aliases `ok`, `new`, `purple`, and `disabled` are normalized in `@metraly/ui`; badge pulse defaults only for `live` and `new`. Promote after local validation. |
| `MetralyBadge` | RC candidate | `/components/primitives`, `/components/charts` | Partial | Yes | Candidate | Candidate | Canonical compact semantic chip. Used by `WidgetPickerCard` tags in Phase 2 instead of local `brand-badge` tags. |
| `MetralyCard` | Hardening → RC candidate | `/components/previews`, `/components/primitives` | Yes | Yes | Candidate | Candidate | Density, loading metadata and custom empty copy are covered. Not directly changed by the prototype conformance branch. |
| `MetralyPanel` | Hardening → RC candidate | `/components/previews`, `/components/primitives` | Partial | Yes | Candidate | Candidate | Padding/focus metadata covered; not directly changed by the prototype conformance branch. |
| `MetralyMetricCard` | Hardening → RC candidate | `/components/previews`, `/examples/engineering-dashboard` | Partial | Yes | Candidate | Candidate | Keep as dashboard metric primitive; chart/sparkline contracts now make it safer for dense dashboards. |
| `MetralyTelemetryLine` | Visual-ready | `/components/previews` | Partial | Basic | Candidate | Candidate | Keep pulse usage restrained and semantic. Not directly changed in this branch. |
| `MetralyCheckbox` | RC candidate | `/components/forms/prototype-conformance` | Yes | Yes | Later | Candidate | `hint`, `loading`, `data-state`, `aria-busy`, and disabled-while-loading behavior are covered. |
| `MetralyRadio` | RC candidate | `/components/forms/prototype-conformance` | Yes | Yes | Later | Candidate | `hint`, `error`, `aria-invalid`, `aria-describedby`, and `data-state` are covered. |
| `MetralySwitch` | RC candidate | `/components/forms/prototype-conformance` | Yes | Yes | Later | Candidate | `hint`, `loading`, `accent="cyan|purple"`, `data-state`, and `data-accent` are covered. |
| `MetralySelect` | RC candidate | `/components/forms/prototype-conformance` | Yes | Yes | Later | Candidate | Native select remains safe baseline. `placeholder`, `loading`, `empty`, `hint`, `aria-busy`, and `data-state` are covered. Custom listbox remains deferred. |
| `MetralyTabs` | RC candidate | `/components/forms/prototype-conformance` | Yes | Yes | Candidate | Candidate | `livePulse`, `data-live-pulse`, `data-state`, count slot and disabled-tab keyboard skip are covered. |
| `MetralyTable` | RC candidate | `/components/data-display/prototype-conformance` | Yes | Yes | Candidate | Candidate | Display-first primitive now supports `unreadRowKeys`, `liveRowKeys`, `rowMarker`, `stickyHeader`, and `dense`. Sorting/filtering/pagination remain wrapper responsibilities. |
| `WidgetPickerCard` | RC candidate | `/components/dashboard/prototype-conformance` | Yes | Yes | Later | Candidate | First-class `kind`, `visualState`, `new`, `loading`, `dragging`, `disabled`, `data-state`, and `data-kind` are covered. Tags use `MetralyBadge`. |
| `DashboardWidget` | RC candidate | `/components/dashboard/prototype-conformance` | Yes | Yes | Later | Candidate | Drag grip moved into header, neutral grip dots only, `aria-label="Drag to move"`, and all eight resize handles render for selected/resizable widgets. |
| `DashboardToolbar` | RC candidate | `/components/dashboard/prototype-conformance` | Yes | Yes | Later | Candidate | Two-row prototype layout is enforced with `data-layout="two-row"`, tabs row and controls/actions row. |
| `DashboardDropZone` | RC candidate | `/components/dashboard/prototype-conformance` | Yes | Yes | Later | Candidate | Idle/hover/active/rejected/empty states covered. `data-tone` and `data-pulse="off"` lock the no-idle-pulse contract. |
| `DashboardResizeHandle` | RC candidate | `/components/dashboard/prototype-conformance` | Yes | Yes | Later | Candidate | Eight prototype directions are exported via `dashboardResizeHandleDirections`; each handle has direction/state metadata and accessible labels. |
| `DashboardGrid` | Hardening | `/components/dashboard`, `/patterns/widget-editor` | Partial | Basic | No | Later | Display-first grid wrapper. Real DnD and persistence must remain separate from static conformance work. |
| `DashboardEmptyState` | RC candidate | `/components/dashboard/prototype-conformance`, `/components/data-display/prototype-conformance` | Yes | Yes | Candidate | Candidate | Empty dashboard composition examples are covered in Phase 2/3 routes. |
| `MetralyChartCard` | RC candidate | `/components/charts/prototype-conformance` | Yes | Yes | Later | Candidate | Chart card state matrix covers default/loading/noData/error and badge slot. |
| `MetralySparkline` | RC candidate | `/components/charts/prototype-conformance` | Yes | Yes | Candidate | Candidate | Sparkline now handles default/loading/empty/noData/error and no longer breaks on empty values. |
| `MetralyLineChart` | RC candidate | `/components/charts/prototype-conformance` | Yes | Yes | Later | Candidate | Wrapper has `state`, fallback states, `data-chart-type`, `data-chart-state`, `data-series-count`, and `data-point-count`. |
| `MetralyAreaChart` | RC candidate | `/components/charts/prototype-conformance` | Yes | Yes | Later | Candidate | Wrapper has state/data contracts and loading/empty/error fallback rendering. |
| `MetralyBarChart` | RC candidate | `/components/charts/prototype-conformance` | Yes | Yes | Later | Candidate | Wrapper has state/data contracts and loading/empty/error fallback rendering. |
| `MetralyComposedChart` | RC candidate | `/components/charts/prototype-conformance` | Yes | Yes | Later | Candidate | Wrapper has state/data contracts and supports area/bar/line series in one compact API. |
| `MetralyChartTooltip` | RC candidate | `/components/charts/prototype-conformance` | Yes | Yes | Later | Candidate | Tooltip content includes labels, values and units, not color-only series identification. |
| Full dashboard editor composition | Preview-only | `/components/dashboard/prototype-conformance`, `/components/data-display/prototype-conformance` | Yes | Smoke | No | No | Static reference only until real DnD, keyboard and persistence are verified. Do not promote to RC yet. |
| Real DnD behavior | Preview-only | `/components/previews` | No | No | No | No | Must remain compatible with `@dnd-kit/*`, `react-grid-layout` and product persistence. Not part of this branch's production promotion. |

## Next promotion targets

1. Validate this branch locally with `npm run site:test` and `npm run ui:check`.
2. Promote Phase 1–4 components from RC candidate to Release Candidate only after validation passes.
3. Keep full dashboard editor composition Preview-only until real DnD, keyboard navigation and persistence reloads are verified.
4. Start controlled `metraly` pilot with dashboard primitives and table/chart wrappers after API review.
5. Start controlled `website` pilot only for safe primitives first: badges, tabs, table, sparkline and chart cards.

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
