import DocsShell from "../components/docs/DocsShell";
import { DocsCardGrid, DocsRouteCard, DocsSection } from "../components/docs/DocsBlocks";
import { docsNavigation, getRelatedLinks } from "../lib/docs/navigation";

const group = docsNavigation.find((item) => item.href === "/foundations")!;

export default function FoundationsPage() {
  return (
    <DocsShell currentPath="/foundations" title="Foundations" description={group.description} related={getRelatedLinks(["/components/primitives", "/components/forms", "/patterns/dashboard-layout"])}>
      <DocsSection id="foundation-map" title="Foundation map" description="Use these pages as the baseline before adding or changing components.">
        <DocsCardGrid>{group.items.map((item) => <DocsRouteCard key={item.href} item={item} />)}</DocsCardGrid>
      </DocsSection>
    </DocsShell>
  );
}
