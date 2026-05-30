# Cleanup Manifest

Records what the V2 baseline keeps and removes, anchored to `getmetraly/brandbook@main`
(commit `940013a`). This supersedes the earlier manifest, which was generated from a
`.zip` snapshot and is no longer the reference.

## Kept paths

```text
README.md
package.json
.gitignore
docs/source-of-truth.md
docs/style-contract.md
docs/component-model.md
docs/component-inventory.md
docs/component-contract.md
docs/composition-patterns.md
docs/design-principles.md
docs/responsive-contract.md
docs/prototype-visual-spec.md
docs/component-design-recipes.md
docs/contribution-guide.md
docs/storybook-roadmap.md
docs/cleanup-manifest.md
docs/v2-cleanup-audit.md
docs/v2-readiness-report.md
packages/ui/package.json
packages/ui/tsconfig.json
packages/ui/.gitignore
packages/ui/src/index.ts
packages/ui/src/{components,shell,dashboard,charts,source,settings,app-kit,wizard}/**/*.{ts,tsx}
packages/ui/src/styles/**/*.css
```

## Deleted paths

```text
test-results/                     (generated Playwright run metadata)
```

## Deleted because temporary

```text
(none remaining — temporary artifacts were removed by the prior cleanup pass)
```

## Deleted because legacy report / audit

```text
(none remaining in repo — audit/report backlog was removed by the prior pass;
 the canonical audit now lives at docs/v2-cleanup-audit.md)
```

## Deleted because Storybook / site scaffold not part of V2 core

```text
(none remaining — Storybook host, stories, and site app already removed.
 Reintroduction plan: docs/storybook-roadmap.md)
```

## Deleted because generated

```text
test-results/.last-run.json
```

## Changed (not deleted) on the way to V2

```text
packages/ui/src/components/EvidencePanel.tsx        inline styles → metraly-evidence-* CSS
packages/ui/src/components/PluginCatalog.tsx        inline styles → metraly-plugins.css
packages/ui/src/components/PluginReviewDrawer.tsx   inline styles → metraly-plugin-review-* CSS
packages/ui/src/components/TraceDrawer.tsx          inline styles → metraly-trace__running CSS
packages/ui/src/app-kit/AppConnectorWizardScreen.tsx inline styles → metraly-app-wizard-* CSS
packages/ui/src/styles/metraly-ai-workspace.css     + evidence/trace rules
packages/ui/src/styles/metraly-app-kit.css          + card-head / cadence-note rules
packages/ui/src/styles/metraly-plugins.css          NEW — plugins surface stylesheet
packages/ui/src/styles/metraly-ui.css               + @import metraly-plugins.css
```

## Review later

```text
docs/component-design-recipes.md   small; consider folding into contribution-guide.md
prototype-visual-spec.md           large; verify it still matches V2 tokens before each prototype
[data-theme="light"] tokens        defined but not verified across the component set
```

## Notes

This baseline removes Storybook and site commands from the root `package.json` because
those folders are no longer present. The root scripts are `ui:check` and `check` only.
Future Storybook/docs work returns as a separate `apps/` workspace, never inside
`packages/ui/src`.
