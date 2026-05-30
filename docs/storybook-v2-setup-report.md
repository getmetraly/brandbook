# Storybook V2 Setup Report

## Summary

A clean Storybook layer has been added to the `storybook/` directory at the root of the
`getmetraly/brandbook` monorepo. It is a pure documentation layer — `packages/ui` is
untouched, no story code lives inside the package, and no legacy site/storybook artifacts
were imported. `npm run build-storybook` passes with zero errors.

---

## Files added

### Storybook configuration

| File | Purpose |
| --- | --- |
| `storybook/.storybook/main.ts` | Storybook config: `@storybook/react-vite` framework, `addon-essentials`, `addon-a11y`, vite alias `@metraly/ui` → `packages/ui/src/index.ts` |
| `storybook/.storybook/preview.ts` | Global CSS import (`metraly-ui.css`), canvas helper CSS, `ThemeProvider` dark decorator |
| `storybook/.storybook/preview.css` | Canvas helpers only: `sb-show-main` background, `sb-story-fullscreen`, `sb-story-bounded` |

### Shared helpers

| File | Purpose |
| --- | --- |
| `storybook/stories/_shared/MetralyStoryFrame.tsx` | Story frame component: category / title / description / status / tags / fullscreen |
| `storybook/stories/_shared/metraly-story-frame.css` | Frame layout CSS (header, meta pills, product-preview border) |
| `storybook/stories/Introduction.mdx` | Top-level intro page: system overview, structure table, story conventions |

### Stories

| Group | File | Coverage |
| --- | --- | --- |
| Core | `Button.stories.tsx` | 6 variants · 3 sizes · icon slots · loading · disabled · full-width |
| Core | `Input.stories.tsx` | label · description · error · search · icon slots · disabled |
| Core | `Badges.stories.tsx` | MetralyBadge · StateBadge · StatusBadge · TrendBadge · PulseMarker |
| Core | `CardShell.stories.tsx` | 6 tones · 2 densities · 5 states · composed example |
| Core | `EmptyState.stories.tsx` | default · error · no-results · gated |
| Core | `Skeleton.stories.tsx` | text · card · widget · table |
| Core | `Segmented.stories.tsx` | MetralySegmentedControl · MetralyTabs |
| Core | `FilterBar.stories.tsx` | filter chips with controls · collapsed |
| Core | `Icon.stories.tsx` | full icon library grid · 5 sizes |
| Shell | `Sidebar.stories.tsx` | expanded + collapsed |
| Shell | `Topbar.stories.tsx` | 3 densities · breadcrumb · inline search |
| Shell | `Shell.stories.tsx` | MetralyShell + Sidebar + Topbar composition |
| Shell | `NavigationTree.stories.tsx` | 2-level tree · defaultExpanded · disabled |
| Dashboard | `DashboardWidget.stories.tsx` | ready · loading · stale · error · empty · selected · example widgets |
| Dashboard | `WidgetPicker.stories.tsx` | catalog list · default · selected · loading · disabled |
| Dashboard | `DashboardWizardSplitBuilder.stories.tsx` | interactive step navigator + live preview slot |
| Dashboard | `MoveMenuA11y.stories.tsx` | keyboard-driven widget reorder |
| Charts | `Gauge.stories.tsx` | 4 tones · threshold-driven · 3 variants · 5 widget states |
| Charts | `Heatmap.stories.tsx` | deploy freq · PR age · widget states |
| Source | `TokenInput.stories.tsx` | draft · committed · validating · invalid · webhook |
| Source | `PermissionExplainer.stories.tsx` | mixed scope state · compact |
| Source | `BackfillRangePicker.stories.tsx` | interactive · no estimate |
| Source | `ConnectionTestPanel.stories.tsx` | not_tested · ready · degraded · auth_failed |
| Source | `SyncProgressPanel.stories.tsx` | backfilling · incremental · rate_limited · completed · failed |
| Settings | `SettingsSection.stories.tsx` | configured + audit log · gated · compact |
| Settings | `AIProviderConnectorCard.stories.tsx` | ready · not_configured · auth_failed · via plugin |
| Settings | `BYOLLMConnectorPanel.stories.tsx` | full panel with plugin-contributed providers |
| AppKit | `AppDashboardScreen.stories.tsx` | ProductPreview · custom nav |
| AppKit | `AppAIWorkspaceScreen.stories.tsx` | ProductPreview (interactive chat) |
| AppKit | `AppSidebar.stories.tsx` | brand · sections · badge pills · user footer |
| AppKit | `AppWidget.stories.tsx` | health states · AppMetricStrip |
| AppKit | `AppPluginsScreen.stories.tsx` | ProductPreview |
| AppKit | `AppConnectorWizardScreen.stories.tsx` | ProductPreview |
| AppKit | `AppIconLibrary.stories.tsx` | full icon grid |

### Documentation

| File | Purpose |
| --- | --- |
| `docs/storybook-roadmap.md` | Updated with actual structure, implemented phase status, and remaining QA items |
| `docs/storybook-v2-setup-report.md` | This document |

---

## Package changes

Only the **root** `package.json` was modified. `packages/ui/package.json` is unchanged.

### Scripts added

```json
"storybook":       "storybook dev -p 6006 -c storybook/.storybook",
"build-storybook": "storybook build -c storybook/.storybook -o storybook-static",
"storybook:check": "npm run build-storybook"
```

### devDependencies added (root)

```json
"@storybook/addon-a11y":        "^8.6.12",
"@storybook/addon-essentials":  "^8.6.12",
"@storybook/react-vite":        "^8.6.12",
"@vitejs/plugin-react":         "^4.5.2",
"react":                        "^19.1.0",
"react-dom":                    "^19.1.0",
"recharts":                     "^3.8.1",
"storybook":                    "^8.6.12",
"typescript":                   "^5.8.3",
"vite":                         "^6.3.5"
```

`react`, `react-dom`, and `recharts` are installed at root to satisfy
`packages/ui` peerDependencies in the Storybook build context.

---

## Storybook structure

```
storybook/
  .storybook/
    main.ts          ← Storybook 8 config; viteFinal adds @metraly/ui alias
    preview.ts       ← CSS + ThemeProvider decorator
    preview.css      ← Canvas helpers (bg, padding, fullscreen class)
  stories/
    Introduction.mdx
    _shared/
      MetralyStoryFrame.tsx
      metraly-story-frame.css
    Core/            ← 9 story files
    Shell/           ← 4 story files
    Dashboard/       ← 4 story files
    Charts/          ← 2 story files
    Source/          ← 5 story files
    Settings/        ← 3 story files
    AppKit/          ← 7 story files
```

**Total: 34 story files + 1 MDX + 2 shared helpers**

---

## CSS integration

The single CSS entrypoint is loaded unconditionally in `preview.ts`:

```ts
import "../../packages/ui/src/styles/metraly-ui.css";
```

This imports all component stylesheets via `@import` chains. No story imports
individual component CSS directly. No per-story stylesheet side-channel exists.

`preview.css` is strictly additive canvas scaffolding (background, padding).
It does not override or shadow any `metraly-*` variables or classes.

The `vite alias` in `main.ts` maps `@metraly/ui` to
`packages/ui/src/index.ts` so TypeScript, Vite, and the CSS resolver all
agree on the source of truth — no workspace symlink ambiguity.

---

## Validation

### npm install

```
exit 0 — packages installed (Storybook 8.6.18, Vite 6.4.2, React 19.1.0)
Warnings: deprecated glob (transitive dep from Storybook — not our code)
```

### npm run ui:check

```
exit 0 — TypeScript noEmit passed
packages/ui is unchanged; zero type errors
```

### npm run build-storybook

```
exit 0 — ✓ built in 6.40s
245 modules transformed
34 story JS chunks emitted
Warnings (non-fatal):
  - "use client" directives in packages/ui components — Vite ignores, not an error
  - eval usage in @storybook/core/dist/preview/runtime.js — Storybook internal, not ours
  - Chunk size warnings — recharts + axe are large; no chunking configured intentionally
No story compilation errors. No TypeScript errors.
```

---

## Known limitations

1. **`"use client"` warnings** — Several `packages/ui` components carry Next.js
   `"use client"` directives. Vite ignores them with a non-fatal warning. This is
   expected in a Vite/Storybook context; the components render correctly.

2. **Chunk size warnings** — `recharts`, `axe-core`, and Storybook's own preview
   runtime exceed Rollup's 500 kB warning threshold. This is inherent to the
   dependency set; no manual chunking has been applied.

3. **Stories not yet covered** — `MetralyCheckbox`, `MetralyRadio`, `MetralySwitch`,
   `MetralyTable`, `MetralyMetricCard`, `WizardLayout`/`StepRail`/`ReviewPanel`,
   individual `ActivityFeed`/`InsightCard`/`StateBoard` stories, and overlay
   stories (`MetralyDrawer`, `MetralyBottomSheet`) are documented as follow-up in
   `storybook-roadmap.md`.

4. **No CI integration yet** — `build-storybook` is not wired into a CI workflow.
   Phase 5 of the roadmap covers this.

5. **No visual baseline** — No Chromatic or Percy snapshot baseline has been
   captured. Phase 5 covers optional visual regression CI.

---

## Next steps

1. Wire `npm run build-storybook` into CI (Phase 5).
2. Add missing form control stories (`MetralyCheckbox`, `MetralyRadio`, etc.).
3. Run a11y addon audit pass on all interactive stories.
4. Verify AppKit ProductPreview screens at 320–1440px viewport.
5. Light mode QA pass via Storybook toolbar background toggle.
6. Consider disabling Storybook telemetry: `storybook telemetry disable`.
