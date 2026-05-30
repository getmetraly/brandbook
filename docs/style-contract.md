# Style Contract

## CSS prefix

Active component classes use the canonical prefix:

```text
metraly-*
```

Forbidden in active UI:

```text
.m-*
.brand-*
.claude-*
```

Exception: `@keyframes m-*` names may remain because keyframes are not public class contracts.

## Token layer

Use `--m-*` tokens first. `--metraly-*` aliases may exist only when already defined as compatibility aliases.

Forbidden undefined or legacy tokens:

```css
var(--m-fg)
var(--m-fg-muted)
var(--m-cyan)
var(--m-purple)
var(--glass)
var(--border)
var(--text)
var(--muted)
```

Forbidden active UI color formats:

```css
#00e5ff
#16f2ff
rgb(...)
rgba(...)
hsl(...)
hsla(...)
```

## CSS entrypoint

The public stylesheet entrypoint is:

```text
packages/ui/src/styles/metraly-ui.css
```

New component CSS must be imported there unless it is intentionally private and imported directly by the component.

## Inline styles

Large layout/style objects in TSX are not allowed.

Allowed inline styles are limited to:

- CSS variable overrides;
- computed geometry values;
- unavoidable dynamic values.

Prefer CSS classes for layout, spacing, border, background, color, typography, and interaction states.
