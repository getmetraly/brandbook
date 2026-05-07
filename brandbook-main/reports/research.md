# Research and Best‑Practice Review for Metraly’s Brandbook and Design System

This research document summarises findings from industry‑leading design systems, accessibility resources and component library documentation.  The goal is to inform decisions for the Metraly brandbook and design system.  Citations are provided for all external sources.  Throughout this document, the term **Metraly core product** refers to the developer analytics platform that will be the source of truth for website and documentation design.

## 1. Typography and Font Selection

Metraly’s UI must support dense dashboards, code blocks and long documentation pages.  A combination of legible sans‑serif and mono fonts will be needed.  Candidate fonts were evaluated on readability, personality and technical tone.

| Candidate font | Rationale (research summary) |
| --- | --- |
| **Inter** | Designed for interface work with a large x‑height and open forms.  Inter excels at small sizes and structured information (e.g. dashboards) but is widely used, so using it alone may make the brand feel generic【950181788847832†L128-L173】. |
| **Space Grotesk** | A proportional sans‑serif based on Space Mono with a 70 % x‑height; it retains monospace details but improves readability at UI scales, making it suitable for modern dashboards and forms【286089253215765†L137-L148】. |
| **Geist** | Designed for developers and designers; has a high x‑height, short descenders and angular strokes to ensure clarity across sizes.  It emphasises simplicity, minimalism and speed【302162457732827†L138-L156】. |
| **IBM Plex Sans** | Balanced and expressive; built for digital use, ideal for documentation and corporate interfaces【599075782024369†L160-L174】. |
| **Manrope** | Geometric yet humanist; balances legibility with personality—suitable for tech start‑ups and modern websites【599075782024369†L160-L174】. |

**Recommendation:** adopt a **primary sans‑serif** for body and UI (e.g. Inter, Geist or Space Grotesk) and a **secondary** for headings or emphasised copy (e.g. Manrope or IBM Plex Sans).  Include a **monospace** for code blocks (e.g. Space Mono) and ensure fonts load via variable‑font files to minimise network weight.  The chosen fonts must support Cyrillic and Latin scripts and provide good hinting.

## 2. Token Architecture

A token system will unify colours, spacing, typography, radii, shadows and motion across Metraly’s products.  Research shows that clear, consistent naming is critical for adoption: well‑named tokens make variables discoverable and scalable, whereas cryptic names cause duplication and erode trust【766331026675180†L222-L233】.  Tokens act as atomic building blocks that encode colours, spacing, typography and motion in a platform‑agnostic format, serving as a shared language between designers and developers【766331026675180†L238-L246】.

### 2.1 Hierarchical naming

Mature design systems follow a three‑tier model【766331026675180†L258-L290】:

1. **Global tokens** – raw values such as `color-blue-60`, `spacing-04` or `radius-02`.  These never carry semantic meaning and remain platform‑agnostic【766331026675180†L265-L273】.
2. **Alias (semantic) tokens** – map global tokens to roles in the UI (e.g. `color-primary`, `spacing-large`).  Aliases allow themes (dark mode, brand customisation) by remapping values without renaming tokens【766331026675180†L275-L283】.
3. **Component‑level tokens** – scoped to specific components for overrides or variants (e.g. `button-background`, `input-border-radius`)【766331026675180†L285-L292】.

Naming must signal intent and usage.  For multi‑brand systems, adopt a prefix such as `color‑brand‑primary` and remap values per brand【766331026675180†L302-L314】.  Platform‑specific styles can be captured via suffixes (`elevation-medium‑ios`, `elevation-medium‑web`)【766331026675180†L316-L329】.  Avoid duplicating tokens for each mode; instead map semantic tokens dynamically (e.g. `color-surface` → `#ffffff` in light mode and `#1A1A1A` in dark mode【766331026675180†L332-L345】).

### 2.2 Token governance

Use automation tools such as **Figma Tokens** and **Style Dictionary** to manage token naming and keep design files and codebases in sync【766331026675180†L349-L370】.  CI pipelines should lint token files and enforce conventions.  Document token usage thoroughly in the brandbook and ensure website/docs inherit tokens from the core product.

## 3. Colour and Theme System

The palette should include primary, secondary and semantic colours (success, warning, error) plus a neutral scale.  For graphs, provide a multi‑hued palette with accessible contrast.  The dark theme must be first‑class (not an afterthought) with tokens remapped rather than duplicated, as noted above【766331026675180†L332-L345】.  Key considerations:

* **Contrast & Accessibility:** Ensure colour pairs meet WCAG contrast ratios.  For icons and small UI elements, maintain at least a 3:1 contrast ratio【299657478959534†L75-L82】.
* **Theming:** Use CSS variables for all colours and avoid hard‑coding values.  Map semantic tokens to global values in a theme context.  Provide a `prefers-color-scheme` hook to sync with the user’s OS mode.
* **Graph palette:** Define discrete sets for lines, fills and backgrounds; avoid oversaturated colours and ensure lines remain distinguishable on both dark and light backgrounds.
* **Elevation and Glow:** Represent depth via subtle shadows and glows.  Provide tokens for elevation levels; avoid using box‑shadow for interactive states (use border emphasis or subtle scale instead).

## 4. Icon System

Icons convey meaning quickly.  They must be simple, minimal and scalable across light and dark themes.  Research on adaptive icon design stresses several core principles【299657478959534†L71-L82】:

* **Simplicity:** Bold, minimal shapes improve legibility across themes【299657478959534†L75-L76】.
* **Color flexibility:** Icons should inherit colour via CSS (`currentColor`) rather than hard‑coded values【299657478959534†L75-L80】.  Use custom properties (`--icon-color`) that can be remapped per theme【299657478959534†L87-L130】.
* **Accessibility:** Maintain at least 3:1 contrast for small icons【299657478959534†L79-L80】.  Pair icons with text labels for critical information【299657478959534†L248-L250】.
* **Consistency:** Icons must feel harmonious with surrounding text and UI elements【299657478959534†L81-L82】.

CSS custom properties allow theme variables (e.g. `--icon-color`) to drive icon colours; inside an SVG use `fill="currentColor"` or `stroke="currentColor"`【299657478959534†L126-L153】.  This approach ensures icons adapt automatically to dark mode and simplifies overrides.  For multicolour icons, embed `prefers-color-scheme` media queries within the SVG to switch colours in dark mode【299657478959534†L156-L175】.

Create a library of icons grouped by category (navigation, metrics, observability, status).  Each icon must have a 24×24 or 20×20 viewBox and be centred for optical balance.  Provide React wrappers that accept `size` and `color` props with defaults set to `currentColor`, as shown in the `AdaptiveIcon` pattern【299657478959534†L187-L224】.

## 5. Motion System

Motion is an integral part of a design system and should be documented and tokenised.  Nielsen Norman Group emphasises that animation must be unobtrusive, brief and subtle, used primarily for feedback, state change or navigation metaphors【655436002110531†L62-L85】.  Overly aggressive motion distracts users because our peripheral vision is highly sensitive to motion【655436002110531†L72-L80】.  Therefore, motion should support—not compete with—the user’s task.

Figma’s design systems guidance warns that neglecting motion in a design system forces designers to create ad‑hoc animations, weakening consistency.  Motion contributes directly to user experience by delighting, educating and focusing users【33027700081329†L38-L60】.  To systematise motion:

1. **Audit existing motion:** catalogue current animations, noting timing curves, usage types (express, focus, inform), choreography patterns and flows where motion is missing or too heavy【33027700081329†L70-L88】.  This audit parallels the component audit and identifies reusable patterns.
2. **Establish guiding principles:** define when and how to use motion.  Balance prescriptive rules with creative freedom and consider where stronger affordances are needed (e.g. onboarding flows)【33027700081329†L98-L107】.  Material Design defines three motion principles—informative, focused and expressive—and maps them to hierarchy, feedback, status and character animation【33027700081329†L112-L116】.  IBM distinguishes between expressive and productive motion to differentiate playful versus utilitarian animations【33027700081329†L119-L123】.  Salesforce separates branding motion from functional motion【33027700081329†L126-L129】.
3. **Develop building blocks:** define a library of durations, easing curves and object effects.  Use a scale system (e.g. `t1`–`t5`) to ensure consistent durations across components【33027700081329†L152-L166】.  Provide dynamic duration formulas based on object size and distance【33027700081329†L169-L176】.  For complex sequences, specify choreography patterns.
4. **Support reduced motion:** provide a prefers‑reduced‑motion mode that disables non‑essential animations and replaces them with instant state changes.  All motion tokens should respect user preferences.
5. **Calm telemetry animations:** the “telemetry checkbox” in the initial materials used pulse‑wave forms and swirling rings.  Variants 1 and 6 emphasise subtle circular pulses and swirling rings rather than aggressive spinning.  These should be translated into motion tokens (e.g. `motion-pulse-slow`) with durations around 1.5–2 seconds, easing curves that start slow and end softly, and no infinite loops unless used for ambient backgrounds.

## 6. Drag‑and‑Drop and Sortable Lists (dnd‑kit)

The `@dnd-kit` library powers interactive dashboards and editors.  Accessibility is critical when implementing drag‑and‑drop:

* **Keyboard support:** Provide clear focus indicators and ensure draggable items are focusable with proper ARIA attributes.  Elements must be activatable via **Enter** or **Space** to start dragging【888601493971794†L223-L233】.  Screen readers require identity, operation and state information; customise the library’s default `announcements` for meaningful feedback【23584703095371†L78-L180】.
* **Sensors and constraints:** Combine pointer, keyboard and touch sensors.  Use activation constraints (e.g. a long press delay) to prevent accidental drags.  Provide collision detection strategies that respect grid layouts and avoid unexpected snapping.
* **Performance:** Avoid rerender storms by memoising dragged items and using virtualization for large lists.  Limit state updates during drag operations and throttle pointer events.  Use portal overlays for dragging to prevent clipping and z‑index conflicts.
* **Accessibility defaults:** Customise the `keyboardCoordinatesGetter` and `announce` functions to support complex layouts.  Provide instructions for screen‑reader users on how to use arrow keys within drag areas.

## 7. State Management (Zustand)

Zustand is used for lightweight state in the Metraly UI.  Best practices include:

* **Selector functions:** When selecting multiple pieces of state, avoid destructuring objects in selectors because it creates new references and triggers unnecessary re‑renders.  Instead, select individual values or use the `useShallow` comparator to perform shallow equality checks【368704142465245†L46-L155】.
* **Shallow comparison:** Zustand’s `useShallow` helper prevents re‑renders when derived values are equal by performing a shallow comparison【4700086728771†L4-L60】.  Use it when grouping multiple values from the store in a component.
* **Store slicing:** Break the global store into smaller slices to avoid monolithic state structures.  This improves maintainability and reduces subscription churn.
* **Persistence & SSR:** Use middleware like `persist` for state that should survive reloads.  Ensure stores are initialised consistently on server and client to avoid hydration mismatch.

## 8. Grid and Layout (React Grid Layout)

`react-grid-layout` (RGL) is used for resizable and draggable dashboard layouts.  A common performance issue is continuous recalculation of widths during window resizing.  The community proposed adding a `debounceTimeout` prop to delay width updates; this reduces repaints and prevents layout thrashing, especially in dashboards with many items【206706482012678†L240-L283】.  When implementing RGL:

* **Debounce resize events:** Wrap resize handlers with a debounce (e.g. 100–200 ms) to avoid excessive layout recalculations【206706482012678†L240-L283】.
* **Persist layouts:** Save the layout configuration (x, y, width, height) per user and restore it on mount to maintain user preferences.
* **Collision handling:** Use `preventCollision` to avoid overlapping widgets and implement a compacting algorithm.  Provide visual feedback when dragging/resizing near boundaries.
* **Virtualization:** For dashboards with many panels, virtualize off‑screen panels to improve performance.

## 9. Charting (Recharts)

Recharts is the primary charting library used in Metraly dashboards.  Key recommendations:

* **Responsive containers:** Use `ResponsiveContainer` to adjust chart dimensions to the parent’s size.  The component uses the `ResizeObserver` API and may require a polyfill in older browsers【300171914577393†L134-L140】.  The `debounce` prop allows debouncing resize events to improve performance【300171914577393†L259-L263】.
* **Accessibility:** Enable the `accessibilityLayer` prop (on by default in v3) to add ARIA labels, roles and keyboard controls【344032000343319†L203-L209】.  Do not make every chart element a tab stop; instead, treat the chart as a single tab stop and allow arrow keys to navigate between data points【344032000343319†L213-L221】.  For screen readers, instruct users to turn off Quick Nav in VoiceOver or enable Forms Mode in JAWS/NVDA so that arrow‑key navigation works【344032000343319†L226-L248】.  Provide role="application" on the chart container to help screen readers switch modes【344032000343319†L236-L247】.
* **Animation:** Keep chart animations subtle and disable them for complex data or when `prefers-reduced-motion` is set.  Use `isAnimationActive={false}` when performance is a concern.
* **Theme:** Define chart colours via tokens.  Ensure axes, grids and labels maintain good contrast on both themes.

## 10. Accessibility & Performance Guidance

Across the system, adhere to WCAG 2.2 guidelines.  Provide keyboard navigation for all interactive elements and ensure focus indicators are clearly visible.  Avoid layout shift during interactions and test across screen sizes.  For performance:

* **Minimize re‑renders:** Use memoisation, shallow comparisons and virtualisation where possible.
* **Optimise animations:** Use `transform` and `opacity` for GPU‑accelerated animations.  Avoid animating `width`, `height` or `left/top` properties.  Provide reduced‑motion options.
* **SSR/hydration:** Ensure components render consistently on server and client.  Avoid referencing `window` or `document` outside `useEffect`.
* **Testing:** Implement snapshot, accessibility and responsiveness tests as part of the TDD-first strategy.  Use tools like Storybook, Jest and Axe.

## 11. Conclusion

This research provides the evidence base for Metraly’s production‑ready brandbook, design system and UI framework.  It highlights the importance of a robust token architecture, accessible interaction patterns, responsive and performant layouts, adaptive icons and subtle motion.  The selected fonts and palettes will reinforce Metraly’s engineering‑focused identity while retaining calm, technical aesthetics.  Subsequent documents (architecture review, component audit, migration plan, etc.) will build on this foundation.