# Shadows and elevation

Shadows convey depth and help users understand the hierarchy of content.  In Metraly, elevation is subtle—much like an engineered dashboard—so shadows are lightweight and never distract from the data.  Shadows are defined through tokens (see `tokens.md`) and applied consistently across all themes.

## Shadow levels

| Level            | Token               | Example (light theme)                                             | Guidelines                                                  |
|------------------|---------------------|-------------------------------------------------------------------|-------------------------------------------------------------|
| **0: Flat**      | `--shadow‑none`     | `none`                                                            | Used for elements that sit flush with the surface (e.g. badges, dividers). |
| **1: Subtle**    | `--shadow‑sm`       | `0 1px 2px rgba(0,0,0,0.05)`                                       | Default for buttons and inputs.  Minimal lift, crisp edges. |
| **2: Raised**    | `--shadow‑md`       | `0 2px 4px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.04)`            | Cards, dropdown menus, tooltips.  Helps separate content from background. |
| **3: Floating**  | `--shadow‑lg`       | `0 8px 16px rgba(0,0,0,0.08)`                                      | Modals, side panels, Draggable Tweaks Panel.  Indicates a layer above the main UI. |

The opacity values above assume the light theme.  In the dark theme, lighten the colour (e.g. `rgba(0,0,0,0.5)` becomes `rgba(0,0,0,0.6)` or use white tints) so that shadows remain visible against dark surfaces without appearing heavy.【913460924002922†L6-L21】

## Usage guidelines

1. **Single shadow per layer**: Don’t stack multiple box‑shadow declarations on a single element.  Instead, choose the appropriate elevation token.
2. **Transition gracefully**: When elements elevate (e.g. card hover), animate between shadow tokens using the standard duration token (`--duration‑medium`) for subtlety.
3. **Keep edges soft**: Avoid large spreads or heavy blurs; the goal is to hint at depth, not to mimic physical materials.  Data should remain the focal point.
4. **Contrast**: Ensure shadows provide enough contrast against their background to be perceptible.  Test both light and dark themes.

Shadows complement other depth cues such as colour and separation.  Combined with the consistent spacing scale and tokens, elevation helps users navigate complex dashboards without confusion.
