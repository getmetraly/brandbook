# Animations and motion

Motion reinforces the feeling of a modern, responsive interface while maintaining user trust.  In an engineering analytics tool like Metraly, animations should be purposeful, restrained and consistent with the technical brand.

## Principles

1. **Purposeful motion**: Animations should communicate a state change—opening a panel, switching a tab, indicating progress—not simply decorate the UI.  Avoid gratuitous bouncing or spinning.
2. **Subtle hover**: On cards and selectable rows, change the border or background colour on hover rather than moving the element vertically.  The Metraly agent guidelines explicitly discourage vertical shift【849328462375381†L71-L79】.
3. **Consistent timing**: Use timing tokens (`--duration‑fast`, `--duration‑medium`, `--duration‑slow`) and easing functions (`--easing‑standard`) so that similar interactions feel coherent.  For example, buttons should animate on press using the fast duration, while modals should fade and slide with the medium duration.
4. **Ease curves**: The standard cubic‑bezier curve `(0.4, 0, 0.2, 1)` produces a quick start and gentle deceleration, ideal for UI transitions.  Use the emphasized curve `(0.2, 0, 0, 1)` to draw attention to critical changes like destructive confirmations.
5. **Reduce motion option**: Respect user preferences.  When `prefers‑reduced‑motion` is enabled, disable non‑essential animations and replace transitions with instant state changes or simple fades.

## Common patterns

- **Fade & slide**: When showing or hiding panels (e.g. the Draggable Tweaks Panel), combine a slight vertical translation with a fade.  Start at 4 px offset and animate to 0 while fading opacity from 0 to 1.
- **Cross‑fade**: For wizard or onboarding screens, cross‑fade between steps instead of sliding sideways to avoid disorienting the user.  Use `--duration‑medium`.
- **Loading indicators**: Use simple linear spinners or skeleton loaders.  Skeletons should pulse between `rgba(0,0,0,0.05)` and `rgba(0,0,0,0.1)` in light mode and reversed values in dark mode【913460924002922†L6-L21】.  Do not rely solely on colour changes; include ARIA `role="status"` and descriptive text.
- **Chart animations**: When charts load or update, animate data points from baseline to their actual values using ease‑out curves.  Avoid repeating animations on every data refresh to prevent distraction.

## Implementation tips

- Leverage CSS transitions for hover and simple state changes; reserve JavaScript animations for more complex interactions such as drag‑and‑drop.
- Trigger animations via utility classes (e.g. `.is‑open`, `.is‑collapsed`) rather than inline styles to keep separation between structure and behaviour.
- Test animations on different devices, paying attention to slower CPUs or high refresh rate displays; adjust durations if interactions feel sluggish or abrupt.

By adhering to these guidelines, motion in Metraly will help users understand how data and UI elements relate to each other without detracting from their workflow.

---

## Current design status

This document should be interpreted together with `brandbook/current-design-state.md` and `AGENTS.md`. The current accepted direction is the phase-13 `/draft` design: dark engineering dashboard UI, cyan telemetry signal, restrained pulse-wave usage, stable interactions, protected `/components` baseline and `/draft` as the active hardening lab.
