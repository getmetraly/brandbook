#!/usr/bin/env bash
set -euo pipefail

# Removes stale local files from earlier brandbook bundles.
# Safe to run from the repository root after extracting the latest bundle over an older working tree.

rm -rf \
  implementation-pack \
  phase-02 \
  draft \
  __tests__ \
  unzipped \
  brandbook-main \
  node_modules \
  site/node_modules \
  packages/ui/node_modules \
  .next \
  site/.next \
  packages/ui/dist \
  coverage \
  site/coverage \
  playwright-report \
  test-results \
  storybook-static \
  site/storybook-static

rm -f \
  FULL_ARCHIVE_NOTES.md \
  PHASE_08_NOTES.md \
  archive-integrity-report.md \
  runtime-fix-report.md \
  package-lock.json \
  site/package-lock.json \
  packages/ui/package-lock.json \
  tsconfig.tsbuildinfo \
  site/tsconfig.tsbuildinfo \
  packages/ui/tsconfig.tsbuildinfo

echo "Legacy brandbook files removed."
