# Component Status

Status: active migration tracker.

This table records the current maturity of Metraly Brandbook components. It should be updated in every PR that changes component API, visual state coverage, Storybook coverage, tests or downstream adoption status.

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
| `StateBadge` | Hardening → RC candidate | `/components/previews`, `/components/feedback` | Yes | Yes | Candidate | Candidate | Semantic aliases, tone metadata, compact usage, non-wrapping label structure and chart badge slots are covered. Keep in RC candidate until visual review passes. |
| `MetralyBadge` | Hardening → RC candidate | `/components/primitives`, `/components/charts` | Partial | Yes | Candidate | Candidate | Claude Design mono/uppercase/pill contract is covered. Use for static semantic chips without telemetry dot. |
| `MetralyCard` | Hardening → RC candidate | `/components/previews`, `/components/primitives` | Yes | Yes | Candidate | Candidate | Density, loading metadata and custom empty copy are covered. Compact CSS still needs final visual review. |
| `MetralyPanel` | Hardening → RC candidate | `/components/previews`, `/components/primitives` | Partial | Yes | Candidate | Candidate | Padding/focus metadata covered; keep small and tokenized. |
| `MetralyMetricCard` | Hardening → RC candidate | `/components/previews`, `/examples/engineering-dashboard` | Partial | Yes | Candidate | Candidate | Description, density and variant metadata covered. Validate dense dashboard and marketing usage before RC. |
| `MetralyTelemetryLine` | Visual-ready | `/components/previews` | Partial | Basic | Candidate | Candidate | Keep pulse usage restrained and semantic. |
| `MetralyCheckbox` | Hardening | `/components/previews`, `/components/forms` | Yes | Yes | Later | Later | Pulse marker removed from DOM. Candidate for forms batch after final visual/focus review. |
| `MetralyRadio` | Hardening | `/components/previews`, `/components/forms` | Yes | Yes | Later | Later | Pulse marker removed from DOM. Needs group behavior and keyboard review before RC. |
| `MetralySwitch` | Hardening | `/components/previews`, `/components/forms` | Yes | Yes | Later | Later | Pulse marker removed from DOM. Needs keyboard and disabled-state review before RC. |
| `MetralySelect` | Hardening | `/components/previews`, `/components/forms` | Partial | Basic | No | No | Keep native/simple until custom behavior has full keyboard/a11y model. |
| `MetralyTabs` | Hardening | `/components/previews`, `/components/forms` | Partial | Yes | No | No | Count slot and keyboard navigation are covered. Rail/underline geometry now matches the Claude Design prototype source of truth in `metraly-forms.css`; keep final visual verification before RC. |
| `MetralyTable` | Hardening | `/components/previews`, `/components/data-display` | Yes | Yes | Candidate | Candidate | Promote only as display-first primitive; sorting/filtering wrappers come later. |
| `WidgetPickerCard` | Hardening | `/components/previews`, `/components/dashboard` | Yes | Yes | No | Candidate | Widget catalog selection surface for the editor; keep tags, state badges and disabled behavior stable. |
| `DashboardWidget` | Hardening | `/components/previews`, `/components/dashboard` | Yes | Yes | No | Candidate | Canonical widget shell for board composition; owns select/remove/drag chrome, full-width state and content framing, not persistence. Static board-edit previews keep selected, dragging and full-width states anchored. |
| `DashboardToolbar` | Hardening | `/components/previews`, `/components/dashboard` | Partial | Yes | No | Later | Dashboard-level control bar for tabs, search, sync state and editor actions. |
| `DashboardDropZone` | Hardening | `/components/previews`, `/components/dashboard` | Partial | Yes | No | Later | DnD feedback surface only. Default drop zones must stay pulse-free; static board-edit previews cover active and rejected states. |
| `DashboardResizeHandle` | Hardening | `/components/previews`, `/components/dashboard` | Partial | Yes | No | Later | Resize affordance only; needs keyboard and layout contract review. Static board-edit previews cover east, south and southeast handles. |
| `DashboardGrid` | Hardening | `/components/dashboard`, `/patterns/widget-editor` | Partial | Basic | No | Later | Display-first grid wrapper; keep compatible with `react-grid-layout` and upstream layout snapshots and persistence reloads. |
| `DashboardEmptyState` | Hardening | `/components/previews`, `/components/dashboard` | Partial | Basic | Candidate | Candidate | First-run board message and call to action surface. |
| `MetralyChartCard` | Hardening | `/components/charts`, `/components/previews` | Yes | Yes | Later | Candidate | First chart wrapper candidate; badge slot is covered; validate SSR and downstream usage. |
| `MetralySparkline` | Hardening | `/components/charts`, `/components/previews` | Yes | Basic | Later | Candidate | Useful in metric cards and dashboard widgets. |
| `MetralyLineChart` | Hardening | `/components/charts` | Yes | Basic | No | Later | Keep wrapper minimal; do not scatter raw Recharts. |
| `MetralyAreaChart` | Hardening | `/components/charts` | Yes | Basic | No | Later | Validate tooltip and axis readability. |
| `MetralyBarChart` | Hardening | `/components/charts` | Yes | Basic | No | Later | Validate dense dashboard containers. |
| `MetralyComposedChart` | Hardening | `/components/charts`, `/components/previews` | Yes | Basic | No | Later | Keep API compact; avoid every chart becoming a separate component. |
| `MetralyChartTooltip` | Hardening | `/components/charts` | Indirect | Basic | No | Later | Tooltip must include labels and values, not color-only series identification. |
| Full dashboard editor composition | Preview-only | `/components/previews`, `/patterns/widget-editor` | Yes | Smoke | No | No | Static reference only until DnD, keyboard and persistence are verified. |
| Real DnD behavior | Preview-only | `/components/previews` | No | No | No | No | Must remain compatible with `@dnd-kit/*`, `react-grid-layout` and product persistence. |

## Next promotion targets

1. Finish visual review for `StateBadge` + `MetralyCard` / `MetralyPanel` / `MetralyMetricCard` RC candidates.
2. Complete forms-control visual review for `MetralyCheckbox`, `MetralyRadio`, `MetralySwitch`, `MetralySelect`, and `MetralyTabs` against the prototype source of truth.
3. `MetralyTable` as display-only Release Candidate.
4. `MetralyChartCard` + `MetralySparkline` to chart hardening review.
5. `DashboardWidget` shell to metraly pilot candidate.

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
