# Prototype Source Rebuild

This migration resets the brandbook around the prototype in `../docs/prototypes/brandbook/*`.

## What changed

- Old preview-hardening notes were removed.
- Old `--metraly-*` assumptions were demoted to compatibility only.
- The docs now point to the prototype as the only source of truth.
- `site` is being reduced to a clean docs and showcase host.
- `packages/ui` is being rebuilt as the production implementation of the prototype primitives.

## Keep doing

- Translate the prototype surfaces into package primitives.
- Keep widget picker rows compact and pulse-free unless the prototype uses pulse semantically.
- Keep drop zones neutral by default.
- Keep drag handles as grip dots.
- Keep resize handles visible only in the correct states.
