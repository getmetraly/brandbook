# Storybook Roadmap

Storybook was removed from this baseline on purpose: the previous repo mixed a Storybook
host, story-only helpers, and a docs/site app into the package source, which made the
"source of truth" ambiguous. V2 keeps the package clean and reintroduces Storybook later
as a **deliberate, separate layer** that consumes `@metraly/ui` — it never lives inside
`packages/ui/src`.

## Principles

1. **Stories consume the package, they are not part of it.** A story imports from
   `@metraly/ui` and `../../packages/ui/src/styles/metraly-ui.css`. It adds zero production code to
   the package.
2. **One CSS entrypoint.** Every story preview loads `styles/metraly-ui.css` only — no
   per-story stylesheet imports. A component missing from the entrypoint is a bug.
3. **No fixtures in the package.** Demo data and composed scenarios live in the
   Storybook workspace, not in `src`. (`DashboardWidgetExamples` and `MoveMenuA11yExample`
   are the exceptions already promoted as documented usage examples.)
4. **Contract-as-test.** The grep checks in `contribution-guide.md` run in CI alongside
   the Storybook build so a story can never introduce a forbidden token or class.

## Structure (as implemented)

```text
brandbook/
├── packages/ui/                  ← unchanged: the source of truth
└── storybook/                    ← new layer (not a workspace package — deps live in root package.json)
    ├── .storybook/
    │   ├── main.ts               ← @storybook/react-vite config, vite alias @metraly/ui → packages/ui/src/index.ts
    │   ├── preview.ts            ← imports metraly-ui.css + ThemeProvider decorator (dark mode)
    │   └── preview.css           ← canvas helpers only (bg, padding, .sb-story-fullscreen)
    └── stories/
        ├── Introduction.mdx
        ├── _shared/
        │   ├── MetralyStoryFrame.tsx      ← category/title/description/status/tags/fullscreen frame
        │   └── metraly-story-frame.css
        ├── Core/
        │   ├── Button.stories.tsx         ✅ all variants, sizes, icon slots, states
        │   ├── Input.stories.tsx          ✅ label, description, error, search, icon slots
        │   ├── Badges.stories.tsx         ✅ MetralyBadge, StateBadge, StatusBadge, TrendBadge, PulseMarker
        │   ├── CardShell.stories.tsx      ✅ tones, density, states, composed example
        │   ├── EmptyState.stories.tsx     ✅ default, error, no-results, gated
        │   ├── Skeleton.stories.tsx       ✅ text, card, widget, table
        │   ├── Segmented.stories.tsx      ✅ MetralySegmentedControl + MetralyTabs
        │   ├── FilterBar.stories.tsx      ✅ filter chips with controls, collapsed
        │   └── Icon.stories.tsx           ✅ full icon library grid + sizes
        ├── Shell/
        │   ├── Sidebar.stories.tsx        ✅ expanded + collapsed
        │   ├── Topbar.stories.tsx         ✅ densities, breadcrumb, inline search
        │   ├── Shell.stories.tsx          ✅ MetralyShell + Sidebar + Topbar composition
        │   └── NavigationTree.stories.tsx ✅ 2-level tree, defaultExpanded, disabled items
        ├── Dashboard/
        │   ├── DashboardWidget.stories.tsx       ✅ all states, gauge/activity/insight children
        │   ├── WidgetPicker.stories.tsx           ✅ catalog list + state variants
        │   ├── DashboardWizardSplitBuilder.stories.tsx  ✅ interactive step navigator + preview
        │   └── MoveMenuA11y.stories.tsx           ✅ keyboard-driven widget reorder
        ├── Charts/
        │   ├── Gauge.stories.tsx          ✅ all tones, threshold-driven, 3 variants, widget states
        │   └── Heatmap.stories.tsx        ✅ deploy freq heatmap + PR age heatmap + widget states
        ├── Source/
        │   ├── TokenInput.stories.tsx         ✅ draft, committed, validating, invalid, webhook
        │   ├── PermissionExplainer.stories.tsx ✅ mixed scope state + compact
        │   ├── BackfillRangePicker.stories.tsx ✅ interactive + no estimate
        │   ├── ConnectionTestPanel.stories.tsx ✅ not_tested, ready, degraded, auth_failed
        │   └── SyncProgressPanel.stories.tsx  ✅ backfilling, incremental, rate_limited, completed, failed
        ├── Settings/
        │   ├── SettingsSection.stories.tsx         ✅ configured + gated + compact + audit log
        │   ├── AIProviderConnectorCard.stories.tsx ✅ ready, not_configured, auth_failed, via plugin
        │   └── BYOLLMConnectorPanel.stories.tsx    ✅ full panel with routing + privacy summary
        └── AppKit/
            ├── AppDashboardScreen.stories.tsx       ✅ ProductPreview + custom nav
            ├── AppAIWorkspaceScreen.stories.tsx     ✅ ProductPreview (interactive chat)
            ├── AppSidebar.stories.tsx               ✅ nav + user footer + badge pills
            ├── AppWidget.stories.tsx                ✅ health states + AppMetricStrip
            ├── AppPluginsScreen.stories.tsx         ✅ ProductPreview
            ├── AppConnectorWizardScreen.stories.tsx ✅ ProductPreview
            └── AppIconLibrary.stories.tsx           ✅ full icon grid
```

## ProductPreview stories

| Story | Description |
| --- | --- |
| `AppKit/AppDashboardScreen` | Full dashboard screen: sidebar, DORA metrics, service health table, at-risk PRs |
| `AppKit/AppAIWorkspaceScreen` | AI Workspace: chat, evidence, quick prompts (interactive) |
| `AppKit/AppPluginsScreen` | Plugin catalog with signing and permission review |
| `AppKit/AppConnectorWizardScreen` | Multi-step connector wizard |

## Phase status

| Phase | Status | Notes |
| --- | --- | --- |
| **0 — Harness** | ✅ Complete | `storybook/` layer, metraly-ui.css loaded, ThemeProvider dark decorator |
| **1 — Foundations + primitives** | ✅ Complete | All Core + Shell stories |
| **2 — Data display + shell** | ✅ Complete | Charts, DashboardWidget, Shell stories |
| **3 — Dashboard + wizard + source + settings** | ✅ Complete | All groups covered |
| **4 — AI Workspace + Plugins + App Kit** | ✅ Complete | All AppKit screens + Source + Settings |
| **5 — CI + visual baseline** | ⬜ Planned | Add `build-storybook` to CI; optional Chromatic/Percy |

## Not yet covered (follow-up)

- `MetralyCheckbox` / `MetralyRadio` / `MetralySwitch` stories (form controls)
- `MetralyTable` story (data table with sort/selection)
- `MetralyMetricCard` story
- `WizardLayout` / `StepRail` / `ReviewPanel` story
- `ActivityFeed` / `InsightCard` / `StateBoard` individual stories (covered via DashboardWidget examples)
- `MetralyDrawer` / `MetralyBottomSheet` overlay stories
- Responsive breakpoint QA (320px – 1440px) for all AppKit screens
- Light mode QA pass (toolbar toggle)
- a11y addon audit pass for all interactive stories

## Visual QA next steps

1. Run `npm run build-storybook` — verify zero build errors.
2. Open storybook dev server and visually inspect each group.
3. Run a11y addon checks on `Core/Button`, `Core/Input`, `Shell/Sidebar`, `Shell/NavigationTree`.
4. Check `Charts/Gauge` and `Charts/Heatmap` on compact / widget density.
5. Verify AppKit ProductPreview screens have no horizontal overflow at 1280px.
6. Toggle to light mode via toolbar — ensure no hard-coded dark colors break layout.

## What does **not** return to the package

- Story files, fixtures, mock data inside `packages/ui/src`.
- A site/docs application bundled with the package.
- Visual-parity screenshots, `test-results/`, or generated artifacts committed to the repo.
