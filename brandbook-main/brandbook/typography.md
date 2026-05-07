# Typography

Metraly’s typography system balances **readability** for dense dashboards and documentation with a distinctive personality for marketing and overview pages.  Three font families are used: a primary sans‑serif for most UI and body text, a secondary sans‑serif for display/headlines, and a monospaced font for code and metrics.

## Candidates and rationale

| Font            | Role                | Rationale |
|-----------------|---------------------|-----------|
| **Inter**       | Primary UI & body   | Designed for on‑screen readability with generous x‑height and open forms.  Widely available via Google Fonts, supports many weights and provides good legibility at small sizes – ideal for dense tables and dashboards. |
| **Space Grotesk** or **Geist** | Secondary / display | Contemporary grotesk families with subtle quirks that convey modernity without sacrificing legibility.  Suitable for hero headings on the marketing site or key numbers in analytics cards. |
| **IBM Plex Sans** / **Manrope** | Alternate body | Both offer a neutral yet distinctive voice.  IBM Plex has excellent coverage and performs well at small sizes; Manrope has a slightly softer feel.  These can be considered if Inter feels too ubiquitous. |
| **JetBrains Mono** or **IBM Plex Mono** | Mono / code | High legibility in code blocks, dashboards and metrics labels.  Distinct shapes for similar characters (O/0, I/1, l/1) aid readability. |

## Recommendations

1. **Primary font:** Use **Inter** for all UI labels, body copy and dashboard text.  It is optimised for digital interfaces and matches Metraly’s engineering‑first tone.  Fall back to `system-ui, -apple-system, BlinkMacSystemFont, Segoe UI` if Inter is unavailable.
2. **Secondary font:** Use **Space Grotesk** (or **Geist** if licensed) for large headings on marketing pages and hero metrics.  Its modern character shapes complement Inter and add distinction without overwhelming the UI.
3. **Monospace font:** Use **JetBrains Mono** for code snippets, CLI commands and metric IDs.  If unavailable, fall back to **IBM Plex Mono**.

### Sizing & hierarchy

- Use a **base font size of 16 px** for body text.  Headings scale responsively: `h1` (36–72 px), `h2` (28–44 px), `h3` (20–28 px).  Dashboard labels can be smaller (14–12 px) but maintain contrast against backgrounds.
- Maintain a clear vertical rhythm by aligning type sizes with the spacing scale (see `docs/design-system/spacing.md`).
- For code blocks and dense tables, reduce the font size by 1–2 px but ensure a minimum of 12 px for readability.

### Line height & letter spacing

- Set body text **line‑height** between **1.5 and 1.75** to improve readability in long paragraphs.
- Tighten letter‑spacing slightly for uppercase headings to avoid excessive whitespace (e.g., `-0.02em`).
- Avoid extra letter‑spacing on small labels; rely on weight and colour for hierarchy.

### Accessibility considerations

- Ensure text remains legible at 200% zoom.  Avoid using fixed pixel values for container heights that might clip text at larger font sizes.
- Use relative units (`rem`, `em`) when possible, which respect user preferences.
- Reserve all‑caps styling for short labels or CTAs; never use all caps for long sentences.

By adhering to this typography system, Metraly maintains a cohesive and accessible reading experience across dashboards, documentation and marketing.