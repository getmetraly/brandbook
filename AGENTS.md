
---

## AGENT.md — Metraly Brandbook Rules

This repository is the Metraly framework UI / brandbook layer. Treat it as a strict design-system repository, not as a playground for visual experiments.

### Source of truth

Canonical implementation lives in:

```text
packages/ui/src
packages/ui/src/styles/metraly-ui.css
packages/ui/src/styles/metraly-theme.css
packages/ui/src/styles/metraly-fonts.css
packages/ui/src/fonts/*.woff2
```

### Repository layers

```text
packages/ui/      production UI package and canonical CSS
storybook/        validation/demo layer that consumes @metraly/ui
assets/           brand assets only when intentionally synced from design-system source
fonts/            optional top-level assets; package fonts live in packages/ui/src/fonts
```

Storybook may wrap components for documentation, but it must not redefine how the components look.

### Styling rules

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

### Inline CSS policy

Inline CSS is forbidden in Storybook stories. Use shared Storybook layout classes from `storybook/stories/_shared/metraly-story-frame.css`.

### CSS class policy

Production package classes: `metraly-*`. Storybook helpers: `msf__*`. No `brand-*`, `claude-*`, `m-*` classes.

### Fonts

`metraly-ui.css` must import `metraly-fonts.css` before theme/component CSS. Bundled font files stay at `packages/ui/src/fonts/`.

### Storybook rules

Storybook is a validation layer. It must consume the package, not fork it.

### Makefile-first workflow

Use Makefile targets first.
If a Make target exists for an operation, do not use raw `docker`, `npm`, or `go` commands as the primary path.
Add/update a Make target when common workflow coverage is missing.

### Brandbook build boundary

App/docs consume built `@metraly/ui` artifacts only.
Do not allow app/docs-side patches to brandbook internals as an integration path.
Brandbook changes must be built and validated in this repository before any app integration claim.

### Build and dependency order

Brandbook build/validation must complete before app UI build/check flows that consume `@metraly/ui`.
Do not treat app-side verification against stale package artifacts as valid integration proof.

### Source import boundary

Expose integration surfaces through package/public entrypoints only.
Do not permit direct relative imports into `packages/ui/src/*` from app/docs repositories.


### Docs-code truth precedence

When docs and implementation disagree, implementation is the source of truth.
Update docs only after code/build verification so documentation reflects actual behavior.
### Validation commands

```bash
npm run check
npm run build-storybook
```


### App integration workflow

`@metraly/ui` consumers depend on `packages/ui/dist`.
Before app runtime verification, run brandbook package build and confirm `dist/` is fresh.
Do not require app repos to import brandbook source files directly; integration boundary is package exports (`@metraly/ui`, `@metraly/ui/styles.css`).
### Commit discipline

Use focused commits. Example: `fix(brandbook): align storybook with metraly design-system tokens`