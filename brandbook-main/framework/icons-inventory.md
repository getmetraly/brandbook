# Icons inventory

Metraly uses a central `Icon` component to render SVG paths based on a `name` prop.  The paths are defined in `ui/src/components/shared/Icon.tsx` as a `Record<string,string>`.  This section catalogues the available icons and provides guidance on adding new ones.

## Built‑in icons

The current icon registry includes approximately 40 symbols.  They fall into several thematic groups:

| Group               | Names (examples)                                                     | Use cases                                  |
|---------------------|---------------------------------------------------------------------|-------------------------------------------|
| **UI & navigation** | `home`, `users`, `bell`, `search`, `star`, `download`, `check`, `x`, `plus`, `database`, `link`, `square` | Generic interface actions and indicators. |
| **Integrations**    | `github`, `jira`, `gitlab`, `linear`, `slack`, `pagerduty`           | Represent third‑party services in integrations lists or settings. |
| **Arrows & chevrons** | `arrowRight`, `chevronDown`, `chevronUp`                          | Indicating navigation, collapse and expand actions. |
| **Status & alerts** | `xCircle`, `alertTri`, `alertCircle`, `checkCircle`, `heart`        | Denote error, warning, success or favourite states. |
| **Data & analytics** | `bar2`, `cpu`, `trendingUp`, `filter`, `layers`, `chart`, `boxes`, `activity`, `sparkles`, `heatmap` | Represent metrics, performance and dashboards. |
| **Dev & Git**       | `gitPR`, `gitMerge`, `gitPullRequest`, `gitCommit`                 | Visualise Git operations in developer insights. |
| **Miscellaneous**   | `clock`, `brain`, `puzzle`, `settings`, `lock`, `rocket`, `target`, `timer`, `pin`, `pinFilled` | Various actions and metaphors across the UI. |

Each icon shares a common style: a 24×24 viewport, round stroke caps and joints, and a stroke width of 1.5 px.  The default colour is `currentColor`, allowing icons to inherit text colour.  To change icon colour, pass a `color` prop referencing a semantic token (e.g. `var(--color-primary)`).

## Adding new icons

When a new feature requires an icon that isn’t covered above:

1. **Search existing icons**: Many general symbols are already included.  Do not duplicate synonyms (e.g. adding `bellNotification` when `bell` exists).
2. **Design**: Use the same viewport and stroke properties.  Keep the geometry simple and aligned to the 24 × 24 grid.  Use open shapes rather than filled forms unless a filled variant is specifically needed (e.g. `pinFilled`).
3. **Naming**: Choose a concise, lower‑camel‑case name that reflects the concept.  Avoid brand or proprietary terms unless representing an integration.
4. **Add to registry**: Update the `iconPaths` object in `Icon.tsx` with the path data.  Provide a comment referencing the source or design tool.
5. **Document**: List the new icon in this inventory and provide usage examples in the Storybook.

By keeping icons in a single registry, Metraly ensures visual consistency and simplifies code bundling.  Future work may involve replacing some internal icons with the open‑source [Feather Icons](https://feathericons.com) or integrating selected Font Awesome symbols while adhering to licensing requirements.
