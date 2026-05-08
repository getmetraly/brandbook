# Metraly Brandbook

Metraly Brandbook defines the visual and interaction language for Metraly: a self-hosted, privacy-first engineering intelligence platform.

## Current design status

The current design is near production-ready in direction. The most accurate snapshot is:

```text
brandbook/current-design-state.md
site/app/components/previews/previews.css
site/app/components/previews/README.md
```

## Core idea

Metraly should feel like a calm engineering observability console:

- precise, technical and trustworthy;
- dark by default;
- dense but readable;
- telemetry-native;
- focused on engineering analytics, dashboards and ownership of data.

## Source-of-truth structure

```text
brandbook/       Brand identity, philosophy, pulse-wave, current design state
design-system/   Tokens, components, motion, charts, board edit mode
framework/       Future UI framework architecture and inventory
migration/       Adoption plan and rollout tasks
site/            Next.js viewer and component lab
AGENTS.md        Operating instructions for agents
```

## Protected baseline and preview hardening surface

- `/components` is the protected baseline page.
- `site/app/components/previews/` is the active preview hardening surface.

Agents and contributors must preserve `/components` unless explicitly instructed to change it. New visual exploration and production-hardening work belongs in `site/app/components/previews/` first.

## Current visual pillars

1. Dark technical surfaces.
2. Cyan telemetry signal.
3. Purple secondary depth.
4. Space Grotesk / Inter typography pairing.
5. Pulse-wave as controlled brand primitive.
6. Stable interactions with no hover jumps.
7. Product-like dashboard scenarios, not decorative mockups.
8. Board editing and drag-and-drop as first-class patterns.

## Canonical references

- `current-design-state.md` — current visual snapshot.
- `pulse-marker.md` — pulse-wave geometry and usage rules.
- `../design-system/components.md` — component behavior and state rules.
- `../design-system/board-edit-mode.md` — dashboard edit mode, DnD and resize rules.
- `../design-system/charts.md` — chart wrappers and Recharts usage.
- `../framework/testing-strategy.md` — QA expectations.
