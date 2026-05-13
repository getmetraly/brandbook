import DocsShell from "../components/docs/DocsShell";
import { DocsCardGrid, DocsRouteCard, DocsSection } from "../components/docs/DocsBlocks";
import { docsNavigation, getRelatedLinks } from "../lib/docs/navigation";

export const dynamic = "force-dynamic";

const group = docsNavigation.find((item) => item.href === "/examples")!;

export default function ExamplesPage() {
  return (
    <DocsShell currentPath="/examples" title="Examples" description={group.description} related={getRelatedLinks(["/components/dashboard", "/components/data-display", "/patterns/dashboard-layout"])}>
      <DocsSection id="examples" title="Dashboard examples" description="Examples show components inside realistic analytics screens instead of isolated visual fragments.">
        <DocsCardGrid>{group.items.map((item) => <DocsRouteCard key={item.href} item={item} />)}</DocsCardGrid>
      </DocsSection>
    </DocsShell>
  );
}
