import DocsShell from "../components/docs/DocsShell";
import { DocsCardGrid, DocsRouteCard, DocsSection } from "../components/docs/DocsBlocks";
import { docsNavigation, getRelatedLinks } from "../lib/docs/navigation";

const group = docsNavigation.find((item) => item.href === "/components")!;

export default function ComponentsPage() {
  return (
    <DocsShell
      currentPath="/components"
      title="Components"
      description="Grouped canonical previews for @metraly/ui. This page replaces the old single-page component dump with focused sections."
      related={getRelatedLinks(["/components/forms", "/components/data-display", "/components/dashboard", "/editor"])}
    >
      <DocsSection id="component-groups" title="Component groups" description="Open the group that matches the product surface you are building.">
        <DocsCardGrid>{group.items.map((item) => <DocsRouteCard key={item.href} item={item} />)}</DocsCardGrid>
      </DocsSection>
    </DocsShell>
  );
}
