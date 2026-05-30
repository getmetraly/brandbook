# Metraly Brandbook V2 Readiness Report

## Summary

The brandbook is ready as a **V2 design-system core**. The repository shape was already
minimal from a prior cleanup; this pass verified it, fixed the CSS-contract violations
that pass missed (large inline styles + forbidden legacy token fallbacks in the Phase-9
components), wired a missing stylesheet into the entrypoint, removed the one generated
folder, and completed the canonical documentation set. No components were missing — every
group in the component brief already had a canonical export — so no new components were
created and no design-tool internal files were copied into the repo.

## Final repository structure

```text
README.md
package.json
.gitignore
docs/
  source-of-truth.md      style-contract.md       component-model.md
  component-inventory.md   component-contract.md   composition-patterns.md
  design-principles.md     responsive-contract.md  prototype-visual-spec.md
  component-design-recipes.md
  contribution-guide.md    storybook-roadmap.md    cleanup-manifest.md
  v2-cleanup-audit.md      v2-readiness-report.md
packages/ui/
  package.json  tsconfig.json  .gitignore
  src/
    index.ts
    components/  shell/  dashboard/  charts/  source/  settings/  app-kit/  wizard/
    styles/      (one entrypoint: metraly-ui.css)
```

## Claude Design internal references used

- `README.md` + `audit/00-canonical-design-language.md` — token names, pulse-glyph
  rules, density modes, frozen status taxonomy.
- `colors_and_type.css` — cross-check of `--m-*` tokens vs `metraly-theme.css`.
- `implementation-pack/packages/ui/src/**` — confirmed every pack component is already
  promoted into `packages/ui` (charts, data-display, source, settings, dashboard).
- `ui_kits/metraly_app/**` — reference for app-kit screen composition.
- `ui_kits/metraly_website/**` — secondary tone reference only; not promoted.

## What was deleted

| Path | Reason |
| --- | --- |
| `test-results/` (`.last-run.json`) | Generated Playwright metadata — not design-system source. |

All other deletion categories from the brief were already absent (removed by the prior
cleanup pass).

## What was kept

- `packages/ui` source, metadata, and CSS (the source of truth).
- All canonical docs (refined where noted) plus six new V2 docs.
- The existing reference docs (`component-contract`, `composition-patterns`,
  `design-principles`, `responsive-contract`, `prototype-visual-spec`,
  `component-design-recipes`) — they are design contracts, not migration history.

## Components added or improved

| Area | Component | Action | Notes |
| --- | --- | --- | --- |
| AI Workspace | `EvidencePanel` | Improved (B/F) | Inline styles → `.metraly-evidence-*`; removed `var(--glass/border/muted/text/font-mono)`. |
| Plugins | `PluginCatalog` | Improved (B/F) | Inline styles → `metraly-plugins.css`; dynamic icon color via `--m-plugin-icon`; removed `var(--cyan/glass/border/muted/muted2)`. |
| Plugins | `PluginReviewDrawer` | Improved (B/F) | Inline styles → `.metraly-plugin-review*`; removed `var(--muted2)`. |
| AI Workspace | `TraceDrawer` | Improved (B/F) | Banner → `.metraly-trace__running`; `var(--m-cyan-bg)`; removed `var(--cyan)`. |
| App Kit | `AppConnectorWizardScreen` | Improved (B/F) | Header + cadence note → `metraly-app-kit.css` classes. |
| — | (no class-D additions) | — | No missing components; nothing new created. |

## CSS stabilization

- Single public entrypoint `styles/metraly-ui.css` now imports **all 37** component
  stylesheets, including the new `metraly-plugins.css`.
- No forbidden / undefined tokens remain in `packages/ui/src`.
- No raw colors in active styling (only demo PR-id strings and one comment matched the
  hex pattern).
- No active `m-*` classes; `@keyframes m-*` retained (allowed).
- Remaining inline styles are confined to the contract's allowed categories and are
  enumerated in `style-contract.md`.

## Documentation rewritten

- `README.md` — rewritten for V2 (source-of-truth + five rules + doc index).
- `cleanup-manifest.md` — re-anchored to the repo; records the deletion + the Phase-9
  CSS extraction.
- `style-contract.md` — explicit allowed-inline list + `--m-plugin-icon` pattern + the
  `muted2` / `font-mono` forbidden tokens.
- **New:** `component-model.md`, `component-inventory.md`, `contribution-guide.md`,
  `storybook-roadmap.md`, `v2-cleanup-audit.md`, `v2-readiness-report.md`.

## Package exports check

`index.ts`, `app-kit/index.ts`, and `charts/index.ts` were swept: **every** relative
export path resolves to an existing `.ts` / `.tsx` / `index.*` file (138 source files).
The `packages/ui/package.json` `exports` map subpaths all point to existing files. No
broken subpaths.

## Storybook readiness

Storybook is intentionally absent from the package. The return plan
(`storybook-roadmap.md`) reintroduces it as a separate `apps/storybook` workspace that
consumes `@metraly/ui` + the single CSS entrypoint, phased foundations → primitives →
data-display/shell → dashboard/wizard/source/settings → Phase-9/app-kit → CI. The
entrypoint already covers every component, so a story can never silently miss styles.

## Validation

- **`npm run ui:check`** — *not run — dependencies not installed in this environment.*
  The command is `tsc --noEmit`; run `npm install && npm run ui:check` locally to confirm.
- **`npm run check`** — *not run — same reason.*
- **grep checks** — run via the workspace search over `packages/ui/src`:
  - forbidden tokens `var(--glass|border|text|muted|muted2|cyan|purple|font-mono)` → **0 matches** ✅
  - raw colors `#hex` / `rgb()` / `rgba()` / `hsl()` in active styling → **0** (only demo PR-ids + 1 comment) ✅
  - active `m-*` classes → **0** ✅
  - large inline styles outside allowed categories → **0** after fixes ✅
- **export paths** — path-resolution sweep → **all resolve** ✅

## Remaining known limitations

- TypeScript type-check was not executed here (no installed deps); the edits were
  className/CSS changes with no type-surface changes, but run `npm run ui:check` before
  committing to be certain.
- A handful of *allowed* inline styles remain (CSS-var overrides, computed geometry,
  per-item dynamic values) — documented in `style-contract.md`, not violations.
- `[data-theme="light"]` tokens exist but are not verified across the full component set.
- `component-design-recipes.md` is small and overlaps `contribution-guide.md`; consider
  folding it in a later pass.

## Suggested next step

Run `npm install && npm run ui:check` to confirm the type check is green, then commit:

```bash
git commit -m "chore: prepare brandbook v2 design-system core"
```

Then scaffold `apps/storybook` per `storybook-roadmap.md` Phase 0.
