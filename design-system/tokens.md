# Design system tokens

This section defines a shared set of **design tokens**—the smallest pieces of design information like colours, spacing and sizes—that allow every part of the Metraly ecosystem to speak the same visual language.  Tokens live in CSS variables and TypeScript constants so they can be reused in the application UI, the marketing site and the documentation.

## Colour tokens

Metraly already exposes a base palette through global CSS variables in `globals.css`.  There are two themes, *dark* and *light*, that define foundational backgrounds, borders and text colours.  The dark theme provides muted surfaces such as `--bg‑base`, `--bg‑surface`, `--bg‑card` and high‑contrast text colours【913460924002922†L6-L21】.  The light theme mirrors the same token names but with brighter values for backgrounds and darker text【913460924002922†L24-L36】.  A separate accent palette defines bright hues like cyan, purple, green, orange, red and indigo【913460924002922†L39-L54】.  These hues should never be hard‑coded; instead, semantic tokens below map them to roles like **primary**, **success** or **danger**.

| Semantic role      | Default mapping                | Usage examples                                                    |
|--------------------|--------------------------------|------------------------------------------------------------------|
| `--color-primary`  | `--cyan` (or current accent)   | Primary buttons, active navigation and highlights.               |
| `--color-success`  | `--green`                      | Success messages, completed statuses, positive metrics.          |
| `--color-warning`  | `--orange`                     | Warnings, non‑blocking alerts.                                    |
| `--color-error`    | `--red`                        | Errors, failed states, destructive actions.                      |
| `--color-info`     | `--indigo`                     | Informational banners, secondary interactive elements.           |

When switching themes, these semantic tokens stay the same while the underlying palette values adapt.  New hues (e.g. additional graph colours) should derive from the accent palette to maintain harmony.

## Spacing tokens

All components should align to a consistent spacing scale.  We recommend a **4 px base unit**—small increments of 4 px make layouts predictable and responsive across devices.  Define the following tokens:

| Token          | Value | Purpose                                            |
|---------------|------|-----------------------------------------------------|
| `--space‑0`    | 0    | No spacing.                                        |
| `--space‑xs`   | 4 px | Tiny gaps, icon padding.                            |
| `--space‑sm`   | 8 px | Small gaps between labels and inputs.               |
| `--space‑md`   | 16 px | Default margin between cards and sections.          |
| `--space‑lg`   | 24 px | Generous padding in modals or hero banners.         |
| `--space‑xl`   | 32 px | Large whitespace in landing pages or dashboards.    |

Spacing tokens should always be used in multiples; avoid arbitrary pixel values to ensure vertical rhythm.  Components like `DraggableTweaksPanel` allow users to modify density—those customisations should adjust the scale globally rather than overriding individual margins.

## Radius tokens

Rounded corners help separate layers and soften the engineering‑driven aesthetic.  Metraly uses subtle radii defined through tokens:

| Token              | Value | Description                                               |
|--------------------|------|-----------------------------------------------------------|
| `--radius‑sm`      | 2 px  | Chips, badges and small controls.                        |
| `--radius‑md`      | 4 px  | Cards, panels and graph containers.                      |
| `--radius‑lg`      | 8 px  | Modals and hero sections where a softer outline is needed.|

When designing new components, choose the smallest radius that retains alignment with existing panels; avoid mixing multiple radii within the same context.

## Typography tokens

Typography tokens centralise font families and sizes.  The brandbook recommends **Inter** for UI text and **Space Grotesk** or **Geist** for headings, with **JetBrains Mono** for code blocks and monospaced values.  Define tokens such as:

| Token                     | Example value | Notes                                                      |
|---------------------------|---------------|------------------------------------------------------------|
| `--font‑family‑base`      | `"Inter", sans‑serif`  | Primary UI font for body copy, labels and numbers.         |
| `--font‑family‑heading`   | `"Space Grotesk", sans‑serif` | Used for H1–H3 headings and hero statements.             |
| `--font‑family‑mono`      | `"JetBrains Mono", monospace`  | For code, terminal output and metric names.                |
| `--font‑size‑sm`          | 12 px        | Captions and secondary text.                               |
| `--font‑size‑md`          | 14 px        | Body copy and form labels.                                 |
| `--font‑size‑lg`          | 18 px        | Section headings and card titles.                          |
| `--line‑height‑sm`        | 1.4          | Tight line height for small text.                          |
| `--line‑height‑base`      | 1.6          | Default line height for readability.                       |
| `--line‑height‑heading`   | 1.3          | Reduced line height for headings to tighten vertical rhythm.|

These tokens make it trivial to adjust font scale or substitute alternative families across all applications without refactoring each component.  See the typography guidelines for more details.

## Elevation and shadow tokens

Elevation communicates hierarchy.  Define shadow tokens representing different depth levels:

| Token                  | Example CSS value (light)                              | Use cases                          |
|------------------------|---------------------------------------------------------|------------------------------------|
| `--shadow‑none`        | `none`                                                 | Flat surfaces, inline elements.    |
| `--shadow‑sm`          | `0 1px 2px rgba(0,0,0,0.05)`                           | Buttons and input fields.          |
| `--shadow‑md`          | `0 2px 4px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.04)` | Cards and modals.                  |
| `--shadow‑lg`          | `0 8px 16px rgba(0,0,0,0.08)`                          | Floating panels, sidebars.         |

Shadows should adapt in dark mode: lighten the alpha channel and soften blur to avoid harshness on dark surfaces.  Avoid stacking multiple shadows on the same component; if deeper elevation is needed, use a higher token instead.

## Animation tokens

Motion is part of the Metraly brand—subtle yet responsive.  Define timing tokens to keep animation durations consistent:

| Token                  | Value    | Suggested usage                                     |
|------------------------|---------|-----------------------------------------------------|
| `--duration‑fast`      | 100 ms  | Quick feedback such as button taps.                 |
| `--duration‑medium`    | 200 ms  | Hover transitions, navigation between wizard steps. |
| `--duration‑slow`      | 400 ms  | Complex transitions (e.g. drag‑and‑drop reorder).    |
| `--easing‑standard`    | `cubic‑bezier(0.4, 0, 0.2, 1)` | Default ease for material‑like feel.    |
| `--easing‑emphasized`  | `cubic‑bezier(0.2, 0, 0, 1)`   | For elements that need to draw attention. |

Use these tokens when defining CSS transitions or JavaScript animation durations.  See the dedicated animations section for behavioural guidelines.
