# Colours

A robust colour system ensures consistency across the Metraly app, website and docs.  It is built on a set of **CSS variables** that support dark and light themes and provide semantic meaning.  The current implementation defines base background, surface and card colours along with accent hues like cyan, purple, green and orange【913460924002922†L6-L54】.  This document formalises those tokens and proposes extensions for semantic statuses and chart palettes.

## Theme layers

### Dark theme

The default dark theme uses deep, desaturated backgrounds with subtle contrast between layers.  From `globals.css`【913460924002922†L6-L21】:

| Token         | Value        | Purpose |
|---------------|-------------|---------|
| `--bg-base`   | `#0b0f14`   | Base canvas – page background |
| `--bg-surface`| `#111722`   | Secondary surfaces (panels, modals) |
| `--bg-card`   | `#151d28`   | Cards & input fields |
| `--bg-card-hover` | `#1a2333` | Hover state for cards |
| `--border`    | `rgba(255,255,255,0.07)` | Dividers & outlines |
| `--border-bright` | `rgba(255,255,255,0.13)` | High‑contrast borders |
| `--text-primary` | `#f0f4f8` | Primary text |
| `--text-secondary` | `#8b9bb4` | Secondary text & descriptions |
| `--text-muted` | `#4a5568` | Muted captions |
| `--nav-bg`     | `rgba(11,15,20,0.88)` | Navigation bar background |
| `--scrollbar-thumb` | `#2a3548` | Dark scrollbar thumb |
| `--code-bg`    | `#0a0e14` | Code blocks |

### Light theme

The light theme inverts the contrast while maintaining similar relationships【913460924002922†L24-L36】:

| Token           | Value        | Purpose |
|-----------------|-------------|---------|
| `--bg-base`     | `#f7f8fa`   | Base canvas |
| `--bg-surface`  | `#ffffff`   | Surfaces and cards |
| `--bg-card`     | `#ffffff`   | Cards & input fields |
| `--bg-card-hover` | `#f0f4f8` | Hover state |
| `--border`      | `rgba(0,0,0,0.08)` | Dividers |
| `--border-bright` | `rgba(0,0,0,0.15)` | High‑contrast borders |
| `--text-primary` | `#0d1117` | Primary text |
| `--text-secondary` | `#4a5568` | Secondary text |
| `--text-muted` | `#8b9bb4` | Muted captions |
| `--nav-bg`      | `rgba(247,248,250,0.92)` | Navigation bar |
| `--scrollbar-thumb` | `#cbd5e0` | Scrollbar |
| `--code-bg`     | `#1a1f2e` | Code blocks |

### Accent palette

The shared accent tokens provide vibrant highlights and chart colours【913460924002922†L39-L54】:

| Token         | Value         | Usage |
|---------------|--------------|-------|
| `--cyan`      | `#00e5cc`    | Primary accent colour (links, CTAs, focus outlines) |
| `--cyan-dim`  | `rgba(0,229,204,0.15)` | Hover backgrounds & chart fills |
| `--purple`    | `#a855f7`    | Secondary accent (hero gradients, highlights) |
| `--purple-dim`| `rgba(168,85,247,0.15)` | Subtle gradients & backgrounds |
| `--green`     | `#22c55e`    | Success state |
| `--green-dim` | `rgba(34,197,94,0.15)` | Chart fills |
| `--orange`    | `#f59e0b`    | Warning state & data series |
| `--red`       | `#ef4444`    | Error state |
| `--indigo`    | `#6366f1`    | Secondary charts & highlights |

These base tokens must be defined at the root level so that they can be overridden by theme wrappers (`[data-theme="dark"]`, `[data-theme="light"]`) without changing their names.

## Semantic palette

To support consistent status messaging and charts, define semantic tokens that map to the accent palette.  This decouples component colours from raw values:

| Semantic token   | Maps to    | Description |
|------------------|-----------|-------------|
| `--color-primary`   | `--cyan`    | Primary actions, links, focus ring |
| `--color-secondary` | `--purple`  | Secondary actions & highlights |
| `--color-success`   | `--green`   | Success messages, healthy metrics |
| `--color-warning`   | `--orange`  | Warnings, cautionary states |
| `--color-error`     | `--red`     | Errors, critical alerts |
| `--color-info`      | `--indigo`  | Neutral informational badges |

Use these semantic tokens in components rather than hard‑coding specific colours.

## Graph palette

Charts require multiple distinguishable colours.  Use a **balanced colour scale** derived from the accent palette (and tinted/darkened variations) for up to 8 series:

1. `--graph-series-1` → `--cyan`
2. `--graph-series-2` → shade of cyan with 20% darkness
3. `--graph-series-3` → `--purple`
4. `--graph-series-4` → shade of purple with 20% darkness
5. `--graph-series-5` → `--green`
6. `--graph-series-6` → shade of green with 20% darkness
7. `--graph-series-7` → `--orange`
8. `--graph-series-8` → shade of orange with 20% darkness

Define these as CSS variables to ensure consistent chart colours across the app and marketing site.

## Accessibility considerations

- Maintain **contrast ratios** of at least **4.5:1** for body text against its background and **3:1** for large text.  Use the WCAG contrast checker to verify pairs.
- Provide **high‑contrast modes** by increasing the difference between background and text colours and limiting gradients.
- Avoid using colour alone to communicate information; accompany with icons or labels (e.g., a warning icon alongside an orange message).  Where charts rely on colour, use patterns or markers for colour‑blind accessibility.

By adopting this colour system, Metraly achieves a cohesive look across dark and light themes while supporting accessibility and scalability.

---

## Current design status

This document should be interpreted together with `brandbook/current-design-state.md` and `AGENTS.md`. The current accepted direction is the phase-13 `/draft` design: dark engineering dashboard UI, cyan telemetry signal, restrained pulse-wave usage, stable interactions, protected `/components` baseline and `/draft` as the active hardening lab.
