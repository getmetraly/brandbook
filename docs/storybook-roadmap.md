# Storybook Roadmap

Storybook was removed from this baseline on purpose: the previous repo mixed a Storybook
host, story-only helpers, and a docs/site app into the package source, which made the
"source of truth" ambiguous. V2 keeps the package clean and reintroduces Storybook later
as a **deliberate, separate layer** that consumes `@metraly/ui` — it never lives inside
`packages/ui/src`.

## Principles

1. **Stories consume the package, they are not part of it.** A story imports from
   `@metraly/ui` and `@metraly/ui/styles/metraly-ui.css`. It adds zero production code to
   the package.
2. **One CSS entrypoint.** Every story preview loads `styles/metraly-ui.css` only — no
   per-story stylesheet imports. A component missing from the entrypoint is a bug.
3. **No fixtures in the package.** Demo data and composed scenarios live in the
   Storybook workspace, not in `src`. (`DashboardWidgetExamples` and `MoveMenuA11yExample`
   are the exceptions already promoted as documented usage examples.)
4. **Contract-as-test.** The grep checks in `contribution-guide.md` run in CI alongside
   the Storybook build so a story can never introduce a forbidden token or class.

## Target structure

```text
brandbook/
├── packages/ui/                  ← unchanged: the source of truth
└── apps/
    └── storybook/                ← new workspace, depends on @metraly/ui
        ├── package.json
        ├── .storybook/
        │   ├── main.ts
        │   └── preview.ts        ← imports metraly-ui.css + ThemeProvider decorator
        └── stories/
            ├── foundations/      ← CardShell, FieldShell, OverlayShell, StateBlock
            ├── primitives/       ← buttons, inputs, badges, icons, tabs, segmented
            ├── data-display/     ← table, metric card, gauge, heatmap, activity feed
            ├── shell/            ← shell, sidebar, topbar, drawers
            ├── dashboard/        ← grid, widget, toolbar, move menu, wizard builder
            ├── source/           ← token input, permission, backfill, connection, sync
            ├── settings/         ← settings section, audit row, AI provider, BYO LLM
            ├── ai-workspace/     ← answer card, evidence, trace, layout
            ├── plugins/          ← catalog, review drawer, signing, permission badge
            └── app-kit/          ← full screen compositions
```

## Phasing

| Phase | Scope | Exit criteria |
| --- | --- | --- |
| **0 — Harness** | New `apps/storybook` workspace; preview loads `metraly-ui.css`; `ThemeProvider` + density/glow toolbar decorators. | One smoke story renders on dark canvas. |
| **1 — Foundations + primitives** | Stories for every foundation and core control. Each shows default / hover / focus / disabled / error / loading + compact density. | Every primitive in `component-inventory.md` has a story. |
| **2 — Data display + shell** | Table, metric card, gauge, heatmap, feed, insight, state board; shell + drawers. | States: default / empty / error / loading per component. |
| **3 — Dashboard + wizard + source + settings** | Grid/widget/editor interactions, both wizard families, connector and settings primitives. | Interaction stories pass a11y addon checks. |
| **4 — AI Workspace + Plugins + App Kit** | Phase-9 components and full screens at all responsive breakpoints. | No horizontal overflow at 320–1440 px. |
| **5 — CI + visual baseline** | Storybook build + grep contract checks + (optional) visual snapshots in CI. | Build + checks green on every PR. |

## What does **not** return to the package

- Story files, fixtures, mock data inside `packages/ui/src`.
- A site/docs application bundled with the package.
- Visual-parity screenshots, `test-results/`, or generated artifacts committed to the
  repo.
