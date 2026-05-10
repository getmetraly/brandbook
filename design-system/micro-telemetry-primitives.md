# Micro Telemetry Primitives

Status: active brand primitive.

Micro telemetry primitives are small UI accents that connect Metraly controls to the product's engineering analytics identity.

## Current primitive set

- Pulse-wave marker.
- State pulse inside badges.
- Selected control pulse inside checkbox/radio/select circles.
- Sidebar active pulse.
- Logo mark pulse.
- Notification/timeline pulse markers.
- Telemetry dividers.
- Chart accents and sparklines.

## Pulse-wave rules

Use pulse-wave for signal, not decoration.

Allowed:

- selected checkbox/radio indicator;
- active state badge;
- hero telemetry line;
- sidebar logo mark;
- empty state divider;
- small time/status marker;
- widget picker icon and selected control;
- chart accent where it supports telemetry meaning.

Avoid:

- pulse before drag handles;
- pulse before `Drag to move` text;
- pulse in default drop zones;
- repeated pulse spam in every row;
- random rotation;
- aggressive animation;
- oversized waveforms outside hero or dedicated mark containers.

## Size guidance

| Context | Guidance |
|---|---|
| Logo/sidebar mark | centered, medium-bold, clearly readable |
| Checkbox/radio/select circle | bold enough to read at small size |
| Badge/status | compact but legible |
| Hero | larger pulse-wave with calm surrounding gradient |
| Divider | low contrast, used sparingly |
| Notification/timeline | aligned in a grid with title/body/time |

## Motion

Most pulse-wave use should be static. If animated, use subtle opacity or glow changes only and respect reduced-motion preferences.
