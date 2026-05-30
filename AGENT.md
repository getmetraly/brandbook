# AGENT.md — Metraly Brandbook Rules

This repository is the Metraly framework UI / brandbook layer. Treat it as a strict design-system repository, not as a playground for visual experiments.

## Source of truth

Canonical implementation lives in:

```text
packages/ui/src
packages/ui/src/styles/metraly-ui.css
packages/ui/src/styles/metraly-theme.css
packages/ui/src/styles/metraly-fonts.css
packages/ui/src/fonts/*.woff2
```

The reference for the current cleanup is `Metraly Design System(2).zip`. When resolving conflicts, prefer the design-system version over ad hoc Storybook or generated output.

## Repository layers

```text
packages/ui/      production UI package and canonical CSS
storybook/        validation/demo layer that consumes @metraly/ui
storybook-static/ generated artifact; do not hand-edit
assets/           brand assets only when intentionally synced from design-system source
fonts/            optional top-level assets; package fonts live in packages/ui/src/fonts
```

Storybook may wrap components for documentation, but it must not redefine how the components look.

## Styling rules

Use only canonical tokens from `metraly-theme.css`:

```text
--m-bg-0..4
--m-line, --m-line-faint, --m-line-strong
--m-fg-0..4
--m-cyan-*, --m-purple-*
--m-ok, --m-warn, --m-err, --m-new
--m-font-*
--m-fs-*
--m-1..9
--m-r-*
--m-glow-*
--m-shadow-*
--m-dur-*, --m-ease
```

Do not introduce legacy/undefined tokens:

```text
--m-bg
--m-bg-raised
--m-border
--m-fg
--m-fg-muted
--m-fg-muted2
--m-cyan
--m-purple
--glass
--border
--text
--muted
--muted2
--font-mono
```

No raw colors in active UI or Storybook wrappers:

```text
#hex
rgb(...)
rgba(...)
hsl(...)
hsla(...)
```

Use `oklch(...)` only inside the canonical theme token file unless there is a documented token-system reason.

## Inline CSS policy

Inline CSS is forbidden in Storybook stories.

Use shared Storybook layout classes from:

```text
storybook/stories/_shared/metraly-story-frame.css
```

Examples:

```tsx
<div className="msf__section-title">Variants</div>
<div className="msf__row msf__row--wrap">...</div>
<div className="msf__grid msf__grid--cards">...</div>
<div className="msf__constrained-lg">...</div>
```

Inline styles inside `packages/ui/src` are allowed only for runtime values that cannot be expressed safely in static CSS:

- CSS custom-property overrides for component internals;
- computed chart geometry;
- table column width / alignment;
- skeleton dimensions;
- unavoidable runtime positioning.

Layout, spacing, border, background, color, typography and interaction states must be in CSS.

## CSS class policy

Production package classes use:

```text
metraly-*
```

Storybook-only documentation helpers use:

```text
msf__*
```

Do not add:

```text
brand-*
claude-*
m-* classes
```

`@keyframes m-*` names are allowed because they are not public class contracts.

## Fonts

Do not remove package fonts. `metraly-ui.css` must import `metraly-fonts.css` before theme/component CSS:

```css
@import "./metraly-fonts.css";
@import "./metraly-theme.css";
```

The bundled font files must stay at:

```text
packages/ui/src/fonts/Inter.woff2
packages/ui/src/fonts/JetBrainsMono.woff2
packages/ui/src/fonts/SpaceGrotesk.woff2
```

## Storybook rules

Storybook is a validation layer. It must consume the package, not fork it.

Required rules:

- import the public CSS entrypoint once from `.storybook/preview.ts`;
- wrap stories with `ThemeProvider` using `theme="dark"` / `theme="light"`, not legacy props;
- use `MetralyStoryFrame` and shared `msf__*` helpers for documentation layout;
- do not add per-story visual language with raw colors, raw spacing, or inline layout objects;
- add direct stories for primitives instead of relying only on AppKit/composition screens;
- every story must pass complete, realistic props for required component contracts;
- exported demo composition components must be runtime-safe when rendered without args in Storybook;
- do not nest a demo composition that already renders its own shell inside a second shell;
- regenerate `storybook-static/` only after source stories pass local checks.

## Generated artifacts

Do not hand-edit:

```text
storybook-static/
node_modules/
dist/
coverage/
test-results/
```

If generated output is committed by project policy, regenerate it from source in the same commit. Otherwise leave it out.

## Validation commands

Run what is available locally:

```bash
npm run check
npm run build-storybook
```

Static hygiene checks:

```bash
# No legacy tokens in source or Storybook
rg "var\(--m-(bg\)|bg-raised|border|fg\)|fg-muted|fg-muted2|cyan\)|purple\))|var\(--(glass|border|text|muted|muted2|font-mono)" packages/ui/src storybook

# No raw colors in active source / Storybook wrappers
rg "#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(" packages/ui/src storybook

# No inline CSS in Storybook stories
rg "style=" storybook/stories storybook/.storybook
```

If a command cannot run because dependencies are missing, state that honestly in the report and do not claim validation passed.

## Commit discipline

Use focused commits. Recommended commit names for this cleanup stream:

```text
fix(brandbook): align storybook with metraly design-system tokens
fix(brandbook): stabilize storybook demo states
```

A good commit includes:

- restored typography assets;
- removed legacy Storybook tokens;
- removed inline Storybook CSS;
- updated documentation/agent rules;
- validation notes with any command that could not be run.
