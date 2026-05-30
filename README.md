# Metraly Brandbook

Canonical design-system source for the **Metraly** UI — a privacy-first, self-hosted
Engineering Intelligence platform. Dark engineering dashboards, composable React
primitives, and a single CSS token contract.

This repository is the **source of truth** for the visual system. It ships one package
(`@metraly/ui`) and the canonical docs that govern it. It deliberately contains **no**
Storybook host, site app, test harness, migration history, or generated artifacts —
those are reintroduced later as deliberate layers, never mixed into the package source.

## Layout

```text
.
├── README.md
├── package.json                  ← workspace root (runs ui:check)
├── docs/                         ← canonical V2 documentation (see below)
└── packages/
    └── ui/                       ← @metraly/ui — the only published surface
        ├── package.json
        ├── tsconfig.json
        └── src/
            ├── index.ts          ← single public export barrel
            ├── components/       ← primitives, foundations, controls, badges
            ├── shell/            ← app frame: shell, sidebar, topbar, overlays
            ├── dashboard/        ← dashboard / editor / widget primitives
            ├── charts/           ← chart wrappers, gauge, heatmap
            ├── source/           ← connector / data-source primitives
            ├── settings/         ← settings + AI-provider primitives
            ├── app-kit/          ← screen-level compositions of the primitives
            └── styles/           ← tokens + per-component CSS (one entrypoint)
```

## Package

```text
packages/ui
```

Public CSS entrypoint (import once, get every component's styles):

```text
packages/ui/src/styles/metraly-ui.css
```

Type check:

```bash
npm install
npm run ui:check
```

## The five rules

1. **Tokens, not literals.** Use `--m-*` design tokens. No raw hex / `rgb()` / `hsl()` in
   active UI. `--metraly-*` aliases exist only as compatibility bridges.
2. **`metraly-*` classes only.** No `m-*`, `brand-*`, `claude-*` active classes.
   (`@keyframes m-*` names are exempt — keyframes are not a class contract.)
3. **One CSS entrypoint.** Every new component stylesheet is `@import`ed into
   `styles/metraly-ui.css`.
4. **Foundations first.** Build on `CardShell` / `FieldShell` / `OverlayShell` /
   `StateBlock` / `NavigationItemFrame` before forking new structure. Semantic
   components compose foundations; they do not duplicate them.
5. **AppKit composes, never forks.** `app-kit/*` screens are examples assembled from
   the canonical primitives — they add no parallel visual system.

## Documentation

| Doc | Purpose |
| --- | --- |
| [`docs/source-of-truth.md`](docs/source-of-truth.md) | What is canonical and what this repo excludes. |
| [`docs/style-contract.md`](docs/style-contract.md) | Token / class / CSS / inline-style rules. |
| [`docs/component-model.md`](docs/component-model.md) | Foundation → semantic → composition layering. |
| [`docs/component-inventory.md`](docs/component-inventory.md) | Every exported component, its path and CSS. |
| [`docs/component-contract.md`](docs/component-contract.md) | Per-component API & behavior contract (reference). |
| [`docs/composition-patterns.md`](docs/composition-patterns.md) | How primitives compose into screens. |
| [`docs/design-principles.md`](docs/design-principles.md) | The visual personality in prose. |
| [`docs/responsive-contract.md`](docs/responsive-contract.md) | Breakpoints and overflow rules. |
| [`docs/prototype-visual-spec.md`](docs/prototype-visual-spec.md) | Visual spec for building Metraly-flavored prototypes. |
| [`docs/contribution-guide.md`](docs/contribution-guide.md) | How to add or change a component without breaking the contract. |
| [`docs/storybook-roadmap.md`](docs/storybook-roadmap.md) | Plan to reintroduce Storybook as a deliberate layer. |
| [`docs/cleanup-manifest.md`](docs/cleanup-manifest.md) | What was kept / removed to reach this baseline. |
| [`docs/v2-cleanup-audit.md`](docs/v2-cleanup-audit.md) | The V2 audit this baseline was verified against. |
| [`docs/v2-readiness-report.md`](docs/v2-readiness-report.md) | V2 readiness summary + validation results. |
