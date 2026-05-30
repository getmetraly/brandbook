# Contribution Guide

How to add or change a component without breaking the V2 contract.

## Before you write code

1. **Classify the work** using the promotion policy in
   [`component-model.md`](component-model.md) (A–F). Most requests are A/B/C, not D.
2. **Search for an existing primitive.** `index.ts` is the catalog. If it exists, reuse
   or extend it — do not fork.
3. **Decide the layer.** Foundation, semantic component, or App Kit composition?
   When unsure, it belongs lower than you think.

## Adding a new component (class D)

1. Create the file in the correct area:
   `components/`, `shell/`, `dashboard/`, `charts/`, `source/`, `settings/`, `wizard/`,
   or `app-kit/`.
2. Compose a foundation (`CardShell` / `FieldShell` / `OverlayShell` / `StateBlock` /
   `NavigationItemFrame`) rather than re-authoring structure.
3. Style with a dedicated `styles/metraly-<name>.css` using **`metraly-*`** classes and
   **`--m-*`** tokens only.
4. `@import` that stylesheet into `styles/metraly-ui.css` in the matching section.
5. Export the component **and its types** from `index.ts` (and the area barrel if one
   exists). If the package `exports` map needs a new subpath, add it in
   `packages/ui/package.json` pointing at the real file.
6. Run `npm run ui:check`.

## Changing an existing component (class B / C)

- **Additive only.** New behavior arrives as optional props with safe defaults. Never
  change an existing prop's type or default in a way that breaks consumers.
- **Visual upgrades** edit the component's existing CSS file — do not create a second
  stylesheet for the same component.
- Keep `MetralyCard`, `MetralyMetricCard`, and `DashboardWidget` separate. Shared
  behavior goes into `CardShell`, not into a merged card.

## Styling rules (enforced)

- **Tokens, not literals.** `--m-*` first; `--metraly-*` aliases only where already
  defined. No raw `#hex` / `rgb()` / `rgba()` / `hsl()` / `hsla()` in active UI.
- **Forbidden tokens** (legacy / undefined): `var(--m-fg)`, `var(--m-fg-muted)`,
  `var(--m-cyan)`, `var(--m-purple)`, `var(--glass)`, `var(--border)`, `var(--text)`,
  `var(--muted)`, `var(--muted2)`, `var(--font-mono)`.
- **Classes:** `metraly-*` only. No `m-*`, `brand-*`, `claude-*`.
  (`@keyframes m-*` names are exempt.)
- **Inline styles:** allowed *only* for CSS-variable overrides, computed chart geometry,
  per-item dynamic values (column width, skeleton size, data-driven color), and
  unavoidable runtime positioning. Everything else — layout, spacing, border,
  background, color, typography, interaction states — goes to CSS. To pass a dynamic
  color into CSS, set a custom property and consume it in the stylesheet (see
  `--m-plugin-icon` in `PluginCatalog` / `metraly-plugins.css`).

## Storybook rules

Storybook is a validation layer and must not introduce its own visual language.

- Import only the public design-system entrypoint in `.storybook/preview.ts`: `packages/ui/src/styles/metraly-ui.css`.
- Use `ThemeProvider` with the canonical `theme` prop.
- Use shared `msf__*` classes from `storybook/stories/_shared/metraly-story-frame.css` for story layout.
- Do not use inline `style=` in Storybook stories.
- Do not use raw colors, raw spacing, or legacy tokens in Storybook wrappers.
- Add direct stories for primitives that need contract validation; AppKit screens are not a substitute for component-level stories.

## Pulse, motion, focus

- **Pulse is semantic.** Allowed only on: logo mark, live/new badge dot, toolbar sync
  chip, explicitly-annotated telemetry accents. Never on drag handles, drop zones,
  picker rows, sidebar items, or generic icons.
- **Motion** uses the named durations (`--m-dur-1/2/3`) and the single ease (`--m-ease`).
- **Focus** is always visible: `box-shadow: var(--m-glow-focus)` on `:focus-visible`.
  Never `outline: none` without a replacement ring.

## Responsiveness

Body must not overflow horizontally at any of: 320, 375, 390, 430, 768, 1024, 1280,
1440 px. Collapse columns before scaling type. Hover must not shift layout.
See [`responsive-contract.md`](responsive-contract.md).

## Before opening a PR — local checklist

```bash
# type check
npm run ui:check

# contract greps (all should return nothing)
grep -RnE "var\(--m-(bg\)|bg-raised|border|fg\)|fg-muted|fg-muted2|cyan\)|purple\))|var\(--(glass|border|text|muted|muted2|font-mono)" packages/ui/src storybook
grep -RnE "#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(" packages/ui/src storybook   # ignore demo PR-ids / comments
grep -RnE 'className="[^"]*\bm-[a-z]' packages/ui/src storybook
grep -RnE "style=" storybook/stories storybook/.storybook
```

- [ ] New CSS `@import`ed into `metraly-ui.css`.
- [ ] Component + types exported from `index.ts`.
- [ ] `package.json` `exports` updated if a new subpath is needed.
- [ ] No forbidden tokens / classes / raw colors.
- [ ] Inline styles only in allowed categories for `packages/ui/src`.
- [ ] No inline styles in Storybook stories.
- [ ] `npm run ui:check` passes.
