# Logos

A strong logo system is essential for brand recognition across product surfaces.  Metraly’s logo should embody the **telemetry vibe** and **observability aesthetics** described in the brand philosophy: pulse waves, telemetry lines and realtime graphs.  The mark must scale from a small favicon to a dashboard sidebar without losing legibility.

## Design principles

1. **Letter M with signal:** Base the mark on the letter *M*, stylised with a continuous line that evokes a telemetry waveform or realtime metrics graph.  The peaks and troughs of the wave convey motion and performance.
2. **Angular geometry:** Use clipped polygons and angular shapes to reflect the dashboard geometry of Metraly’s UI.  Rounded corners can soften the form but the overall silhouette should feel engineered rather than organic.
3. **Modularity:** Create multiple lockups for different contexts: a horizontal logotype with wordmark (`metraly`) and signal mark; a stacked version for square formats; and an icon‑only glyph for favicons and avatar circles.
4. **Colour system:** Use the primary accent colour (`--cyan`) for the mark on dark backgrounds and the inverted colour (`--bg-card`) for light backgrounds.  Provide monochrome variants (black, white, single‑colour) for use on busy backgrounds or when colour reproduction is limited.
5. **Responsiveness:** Ensure the waveform detail simplifies at smaller sizes.  At 16 px (e.g. favicons), remove the minor peaks to retain a clear ‘M’ outline; at larger sizes, include finer details.

## Variants

| Variant                | Use case |
|------------------------|---------|
| **Primary logo** (wordmark + signal mark) | Main header, hero sections, presentation slides |
| **Compact logo** (stacked mark + wordmark beneath) | Square avatars, social cards |
| **Icon‑only** (signal mark) | Favicon, GitHub org avatar, sidebar collapse button |
| **Monochrome** (single colour) | Watermarks, embossing, low‑colour printing |
| **Inverted** | Light theme or dark backgrounds |

## Usage guidelines

- Maintain clear space around the mark equal to the height of the signal waveform.
- Do not stretch, distort or recolour the logo outside the specified palette.
- Minimum sizes: 24 px height for the full logo; 16 px square for the icon.
- When placing the logo on patterned backgrounds, use the monochrome or inverted variant and ensure sufficient contrast.
- Use vector SVGs with optimised `viewBox` attributes.  Provide separate exports for screen (SVG, PNG) and print (PDF).

Once the logotype and mark are finalised, save all variants in `docs/assets/logos/` with naming conventions such as `metraly-primary-dark.svg`, `metraly-primary-light.svg`, `metraly-icon.svg`, etc.