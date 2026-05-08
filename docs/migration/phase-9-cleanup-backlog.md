# Phase 9 Cleanup Backlog

## Purpose

Turn the final cleanup and deprecation phase into concrete backlog items. This phase removes stale duplicate paths after the canonical contract is stable and the migration has enough regression coverage to retire old surfaces safely.

## Phase Goal

Remove the remaining duplicate, preview-only and legacy pathways so the canonical brandbook source of truth stays clean and current.

## Scope

### In Scope

- Deprecation and removal of duplicate local component families in the app.
- Cleanup of stale `/draft` or legacy language in older docs.
- Removal of preview-only duplicates once canonical pages and package exports are stable.
- Final documentation and status updates that reflect the completed migration shape.

### Out of Scope

- No new product features.
- No direct changes to `../app` or `../website`.
- No premature removal of legacy variants before replacement paths are proven.
- No dependency upgrades that are not already justified by prior phases.

## Backlog Items

### 9.1 Deprecate Duplicate Local Component Families

- Identify app-local shells, tables, cards, badges and dashboard pieces that now have canonical replacements.
- Mark duplicate local implementations as deprecated before removal.
- Confirm which duplicates must remain temporarily because some screens are not migrated yet.

### 9.2 Remove Stale Legacy Language

- Rewrite or remove leftover `/draft` and legacy sandbox language in older docs where the canonical surface has already moved on.
- Keep historical notes only where they still add migration value.
- Ensure terminology matches the current grouped preview and docs portal structure.

### 9.3 Remove Preview-Only Duplicates

- Remove preview-only component duplicates once the canonical pages and package exports are stable.
- Verify that the removal does not strand any docs or product page references.
- Keep the canonical preview surfaces focused on residual hardening only.

### 9.4 Archive Or Rewrite Obsolete Notes

- Review older migration notes, phase notes and cleanup reports for obsolescence.
- Archive or rewrite notes that no longer reflect the actual canonical contract.
- Preserve only the historical context that is still useful for future migration understanding.

### 9.5 Update Final Status Documents

- Update migration notes and status docs to reflect the final shape of the canonical source.
- Confirm that the audit and backlog documents no longer describe temporary surfaces as canonical.
- Make sure completion language is explicit about what was removed and what remains.

### 9.6 Verify Final Regression Coverage

- Run the final regression suite across brandbook, website and app surfaces that remain relevant.
- Add route smoke checks and a11y spot checks for anything that was touched during cleanup.
- Confirm that no removal broke the remaining public or product flows.

### 9.7 Close Out Deprecation Paths

- Ensure each removed duplicate has a clear replacement path documented.
- Confirm that deprecation windows are not left open indefinitely.
- Keep any remaining temporary variants clearly labelled as transitional.

## Required Tests

- final regression suite across brandbook, website and app.
- route smoke checks.
- a11y spot checks.
- targeted tests for any cleanup that touches canonical pages or package exports.

## Deliverables

- Clean canonical docs and component references.
- Clear deprecation path for removed duplicates.
- Updated status documents for the completed migration shape.
- Final regression notes for the cleanup pass.

## Acceptance Criteria

- The migration stops accumulating duplicate component families.
- The canonical source of truth remains clean and up to date.
- Legacy language is removed or rewritten where it is no longer accurate.
- Removal of old surfaces does not break any un-migrated screens.

## Risks

- Removing legacy variants too early can break un-migrated screens.
- Over-aggressive doc cleanup can erase useful migration context.
- If deprecation paths are not explicit, future maintainers may reintroduce duplicate surfaces.

