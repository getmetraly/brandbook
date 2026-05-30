# Metraly Brandbook V2 Cleanup Audit

Audit of `getmetraly/brandbook@main` (commit `940013a`) performed to prepare the
**V2 design-system core**. The repository had already been through one cleanup pass
(410 → 151 files); this audit verifies that baseline, fixes the CSS-contract
violations the first pass missed, and completes the canonical documentation set.

---

## Current repository shape

```text
.
├── .gitignore
├── README.md                     (1 KB — minimal, pre-V2)
├── package.json                  (workspace root: ui:check / check)
├── docs/                         (9 files)
│   ├── cleanup-manifest.md
│   ├── component-contract.md
│   ├── component-design-recipes.md
│   ├── composition-patterns.md
│   ├── design-principles.md
│   ├── prototype-visual-spec.md
│   ├── responsive-contract.md
│   ├── source-of-truth.md
│   └── style-contract.md
├── packages/ui/                  (package source — 138 src files)
│   ├── .gitignore
│   ├── package.json              (@metraly/ui, exports map, peer deps)
│   ├── tsconfig.json
│   └── src/{components,shell,dashboard,charts,source,settings,app-kit,wizard,styles}
└── test-results/                 (1 generated file — .last-run.json)
```

The earlier pass already removed Storybook, the site app, e2e harnesses, visual-parity
artifacts, migration reports, patch history, and lock files. The structure already
matches the V2 target. Remaining problems were **inside** `packages/ui/src`, not in the
repo shape.

## Claude Design internal references reviewed

| Area | Files | Used for |
| --- | --- | --- |
| Design language | `README.md`, `audit/00-canonical-design-language.md` | Confirming token names, pulse-glyph rules, density modes, status taxonomy. |
| Tokens | `colors_and_type.css` | Cross-checking `--m-*` token set against `packages/ui/src/styles/metraly-theme.css`. |
| Implementation pack | `implementation-pack/packages/ui/src/{charts,components,source,settings,dashboard,styles}` | Verifying every pack component (Gauge, Heatmap, ActivityFeed, InsightCard, StateBoard, WidgetStateMatrix, Token/Permission/Backfill/Connection/Sync source primitives, Settings primitives) is already promoted into `packages/ui`. |
| App UI kit | `ui_kits/metraly_app/*` | Reference for app-kit screen composition (sidebar, topbar, dashboard, AI workspace, plugins, connector wizard). |
| Website kit | `ui_kits/metraly_website/*` | Secondary tone/rhythm reference only — not promoted into core. |

**Result:** every Claude Design implementation-pack pattern already has a canonical
equivalent in `packages/ui`. No new component had to be created. Raw Claude Design
files were **not** copied into the repo.

## Files/folders to keep

```text
README.md            package.json         .gitignore
docs/**              (canonical V2 docs — kept, refined, and extended)
packages/ui/**       (package source, metadata, CSS — kept; 6 files fixed)
```

## Files/folders to delete

```text
test-results/        (generated Playwright run metadata — not design-system source)
```

Everything else the original brief lists for deletion (`.tmp/`, `site/`, `stories/`,
`storybook-static/`, `e2e/`, `scripts/`, `migration/`, `coverage/`, etc.) **does not
exist** in the current repo — removed by the previous pass. Only `test-results/`
remains and must go.

## Component inventory

Full per-component inventory lives in [`component-inventory.md`](component-inventory.md).
Summary of coverage against the V2 component groups:

| Group | Required (brief §6) | Present in `packages/ui`? |
| --- | --- | --- |
| Core primitives | 15 | ✅ all (Button, Input, FieldShell, CardShell, State/Status/Trend badges, PulseMarker, Icon, CodeBlock, EmptyState, Skeleton, Segmented, FilterBar, NavigationItemFrame) |
| Data display | 8 | ✅ all (Table, MetricCard, Gauge, Heatmap, ActivityFeed, InsightCard, StateBoard, WidgetStateMatrix) |
| Shell | 6 | ✅ all (Shell, Sidebar, SidebarSection, SidebarItem, Topbar, NavigationTree) |
| Dashboard | 6 | ✅ all (DashboardWidget + WidgetShell via CardShell, WidgetPicker, Examples, WizardSplitBuilder, MoveMenuA11yExample) |
| Source / connector | 5 | ✅ all (TokenInput, PermissionExplainer, BackfillRangePicker, ConnectionTestPanel, SyncProgressPanel) |
| Settings | 4 | ✅ all (SettingsSection, SettingsAuditRow, AIProviderConnectorCard, BYOLLMConnectorPanel) |
| AppKit compositions | 9 | ✅ all (Sidebar, Topbar, Widget, MetricStrip, Dashboard/AIWorkspace/Plugins/ConnectorWizard screens, IconLibrary) |

## Missing components from Claude Design / Design System

| Pattern | Existing component | Action |
| --- | --- | --- |
| — | — | **None.** Every pattern in the implementation pack and UI kits maps to an existing canonical export. `WidgetShell` is intentionally not a separate component — it is `CardShell` + `metraly-widget-shell.css`. |

## CSS issues

| File | Problem | Action |
| --- | --- | --- |
| `components/EvidencePanel.tsx` | Large inline `style={{}}` objects; forbidden legacy fallbacks `var(--glass)`, `var(--border)`, `var(--muted)`, `var(--text)`, `var(--font-mono)`. | **Fixed** — moved to `.metraly-evidence-*` classes in `metraly-ai-workspace.css`. |
| `components/PluginCatalog.tsx` | Large inline styles (toolbar, category chips, icon tile, grid, footer, description); forbidden fallbacks `var(--cyan)`, `var(--glass)`, `var(--border)`, `var(--muted)`, `var(--muted2)`. | **Fixed** — new `metraly-plugins.css`; dynamic icon color via `--m-plugin-icon` override. |
| `components/PluginReviewDrawer.tsx` | Inline layout styles; forbidden fallback `var(--muted2)`. | **Fixed** — `.metraly-plugin-review*` classes. |
| `components/TraceDrawer.tsx` | Inline "Analysing…" banner; forbidden fallback `var(--cyan)`. | **Fixed** — `.metraly-trace__running*` classes; `var(--m-cyan-bg)`. |
| `app-kit/AppConnectorWizardScreen.tsx` | Inline header flex + cadence note. | **Fixed** — `.metraly-app-wizard__card-head` / `__cadence-note` in `metraly-app-kit.css`. |
| `styles/metraly-ui.css` | New `metraly-plugins.css` not wired. | **Fixed** — added to entrypoint. |

**Verified clean after fixes:**

- No `var(--glass|border|text|muted|muted2|cyan|purple|font-mono)` anywhere in `src`.
- No raw hex / `rgb()` / `rgba()` / `hsl()` in active styling (only PR-id strings like
  `#4821` in app-kit demo data, and one CSS comment).
- No `m-*` active classes (`grep className=".*m-"` → none).
- Remaining `style={{}}` usages are all in the contract's **allowed** categories:
  CSS-variable overrides (`--m-gauge-accent`, `--m-heatmap-cols`, `--m-tree-level`,
  `--m-a11y-cols`), computed chart geometry (gauge fill %, chart-tooltip swatch),
  per-column table width/align, skeleton dimensions, and dynamic data-driven colors
  (`plugin.iconColor`, StepRail tone). See `style-contract.md` §Inline styles.

## Docs issues

| File | Keep / Delete / Rewrite | Reason |
| --- | --- | --- |
| `source-of-truth.md` | Keep (refined) | Already V2-shaped; minor tightening. |
| `style-contract.md` | Keep (refined) | Add explicit allowed-inline list + `--m-plugin-icon` note. |
| `cleanup-manifest.md` | Rewrite | Referenced a `.zip` source and stale counts; re-anchor to the repo + record `test-results/` + the Phase-9 CSS extraction. |
| `component-contract.md` | Keep | Useful per-component API reference, not migration history. |
| `composition-patterns.md` | Keep | Composition reference. |
| `design-principles.md` | Keep | Visual personality. |
| `responsive-contract.md` | Keep | Breakpoint contract. |
| `prototype-visual-spec.md` | Keep | Prototyping spec for downstream design work. |
| `component-design-recipes.md` | Keep | Small recipe reference. |
| `component-model.md` | **Create** | Required V2 doc — foundation/semantic/composition model. |
| `component-inventory.md` | **Create** | Required V2 doc — full exported-component table. |
| `contribution-guide.md` | **Create** | Required V2 doc — how to add/change without breaking the contract. |
| `storybook-roadmap.md` | **Create** | Required V2 doc — how Storybook returns as a layer. |
| `v2-cleanup-audit.md` | **Create** | This document. |
| `v2-readiness-report.md` | **Create** | Required V2 doc — final readiness + validation. |

## V2 target structure

Identical to **Current repository shape** above, minus `test-results/`, plus the six
new docs. No source files moved; only six source/style files edited and one stylesheet
added.

## Implementation plan

1. Delete `test-results/`.
2. Fix the six CSS-contract violators (done — see CSS issues).
3. Wire `metraly-plugins.css` into the entrypoint (done).
4. Keep + refine `source-of-truth.md`, `style-contract.md`; rewrite `cleanup-manifest.md`.
5. Create `component-model.md`, `component-inventory.md`, `contribution-guide.md`,
   `storybook-roadmap.md`, `v2-cleanup-audit.md`, `v2-readiness-report.md`.
6. Rewrite `README.md` for V2.
7. Re-run grep + export checks; record results in `v2-readiness-report.md`.
