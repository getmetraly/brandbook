# Metraly Brandbook

Metraly Brandbook is the source of truth for the current Metraly visual system, design-system direction, component hardening work and agent operating rules.

## Current status

Status: near production-ready design direction.

The current design is centered on a dark, engineering-first, telemetry-native interface:

- `/components` is the protected baseline/reference gallery. Do not change it without explicit approval.
- `/draft` is the hardening lab for near-production component patterns and real product scenarios.
- `site/app/components/draft/` contains the draft component implementations used by `/draft`.
- `site/app/components/draft/draft-components.css` contains the latest visual polish for the draft system.
- `brandbook/current-design-state.md` is the canonical snapshot for the current design.
- `AGENTS.md` defines how agents should work with this repository.

## Design direction

Metraly should feel like a calm self-hosted engineering observability product, not a generic SaaS dashboard template.

Core qualities:

- precise, technical and privacy-first;
- dark by default;
- cyan as the primary operational signal;
- purple as a secondary depth/accent color;
- restrained glow;
- stable layout without hover jumps;
- telemetry pulse-wave as a brand primitive;
- dense but readable analytics cards;
- clear board edit mode and drag-and-drop states.

## Site surfaces

```text
site/app/page.tsx                Brandbook landing page
site/app/components/page.tsx     Protected baseline component reference
site/app/draft/page.tsx          Current draft hardening lab
site/app/components/draft/       Draft component candidates
```

## Documentation map

```text
brandbook/current-design-state.md       Current canonical visual snapshot
brandbook/pulse-marker-draft.md         Pulse-wave primitive rules
brandbook/phase-13-final-polish.md      Latest visual polish notes
brandbook/draft-vs-components-conformance.md

design-system/components.md             Component rules and states
design-system/board-edit-mode.md        Dashboard edit mode and DnD guidance
design-system/charts.md                 Recharts and chart wrapper guidance
design-system/micro-telemetry-primitives.md

framework/README.md                     UI framework direction
framework/testing-strategy.md           Visual, accessibility and interaction QA
migration/unified-migration-plan.md     Adoption plan across product/website/docs
AGENTS.md                               Agent instructions
```

## Local development

```bash
cd site
npm install
npm run dev
npm run build
```

## Non-negotiables

- Keep all brandbook documentation in English.
- Do not edit `/components` unless explicitly instructed.
- Use `/draft` for experiments, review surfaces and component hardening.
- Do not use pulse indicators as drag handles.
- Use neutral grip dots for drag affordances.
- Keep hover/focus states stable: no vertical jumps.
- Use tokenized colors and shared primitives instead of ad-hoc values.
