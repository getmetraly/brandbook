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
| `StateBadge` | Hardening | `/components/previews`, `/components/feedback` | Yes | Yes | Candidate | Candidate | First RC candidate. Validate compact use in cards, tables and status rows. |
| `MetralyCard` | Hardening | `/components/previews`, `/components/primitives` | Yes | Basic | Candidate | Candidate | Needs component passport and visual baseline before RC. |
| `MetralyPanel` | Hardening | `/components/previews`, `/components/primitives` | Partial | Basic | Candidate | Candidate | Should stay small and tokenized. |
| `MetralyMetricCard` | Hardening | `/components/previews`, `/examples/engineering-dashboard` | Partial | Basic | Candidate | Candidate | Validate dashboard and marketing variants without adding separate components. |
| `MetralyTelemetryLine` | Visual-ready | `/components/previews` | Partial | Basic | Candidate | Candidate | Keep pulse usage restrained and semantic. |
| `MetralyCheckbox` | Hardening | `/components/previews`, `/components/forms` | Yes | Yes | Later | Later | Candidate for forms batch after visual/focus review. |
| `MetralyRadio` | Hardening | `/components/previews`, `/components/forms` | Yes | Yes | Later | Later | Needs group behavior and keyboard review before RC. |
| `MetralySwitch` | Hardening | `/components/previews`, `/components/forms` | Yes | Yes | Later | Later | Needs keyboard and disabled-state review before RC. |
| `MetralySelect` | Hardening | `/components/previews`, `/components/forms` | Partial | Basic | No | No | Keep native/simple until custom behavior has full keyboard/a11y model. |
| `MetralyTabs` | Hardening | `/components/previews`, `/components/forms` | Partial | Basic | No | No | Needs roving/tab keyboard model before RC. |
| `MetralyTable` | Hardening | `/components/previews`, `/components/data-display` | Yes | Yes | Candidate | Candidate | Promote only as display-first primitive; sorting/filtering wrappers come later. |
| `WidgetPickerCard` | Hardening | `/components/previews`, `/components/dashboard` | Yes | Yes | No | Candidate | Useful for product app editor; not first website candidate. |
| `DashboardWidget` | Hardening | `/components/previews`, `/components/dashboard` | Yes | Yes | No | Candidate | First dashboard primitive candidate for metraly pilot. |
| `DashboardToolbar` | Hardening | `/components/previews`, `/components/dashboard` | Partial | Yes | No | Later | API still shaping; verify readonly/search/tabs/action states. |
| `DashboardDropZone` | Hardening | `/components/previews`, `/components/dashboard` | Partial | Yes | No | Later | Default drop zones must stay pulse-free. Real DnD is not Ready. |
| `DashboardResizeHandle` | Hardening | `/components/previews`, `/components/dashboard` | Partial | Yes | No | Later | Needs full keyboard resize contract before RC. |
| `DashboardGrid` | Hardening | `/components/dashboard`, `/patterns/widget-editor` | Partial | Basic | No | Later | Keep compatible with `react-grid-layout`. Do not rewrite product grid yet. |
| `DashboardEmptyState` | Hardening | `/components/previews`, `/components/dashboard` | Partial | Basic | Candidate | Candidate | Good low-risk primitive after card/badge batch. |
| `MetralyChartCard` | Hardening | `/components/charts`, `/components/previews` | Yes | Yes | Later | Candidate | First chart wrapper candidate; validate SSR and downstream usage. |
| `MetralySparkline` | Hardening | `/components/charts`, `/components/previews` | Yes | Basic | Later | Candidate | Useful in metric cards and dashboard widgets. |
| `MetralyLineChart` | Hardening | `/components/charts` | Yes | Basic | No | Later | Keep wrapper minimal; do not scatter raw Recharts. |
| `MetralyAreaChart` | Hardening | `/components/charts` | Yes | Basic | No | Later | Validate tooltip and axis readability. |
| `MetralyBarChart` | Hardening | `/components/charts` | Yes | Basic | No | Later | Validate dense dashboard containers. |
| `MetralyComposedChart` | Hardening | `/components/charts`, `/components/previews` | Yes | Basic | No | Later | Keep API compact; avoid every chart becoming a separate component. |
| `MetralyChartTooltip` | Hardening | `/components/charts` | Indirect | Basic | No | Later | Tooltip must include labels and values, not color-only series identification. |
| Full dashboard editor composition | Preview-only | `/components/previews`, `/patterns/widget-editor` | Yes | Smoke | No | No | Static reference only until DnD, keyboard and persistence are verified. |
| Real DnD behavior | Preview-only | `/components/previews` | No | No | No | No | Must remain compatible with `@dnd-kit/*`, `react-grid-layout` and product persistence. |

## Next promotion targets

1. `StateBadge` to Release Candidate.
2. `MetralyCard` / `MetralyPanel` to Release Candidate.
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
