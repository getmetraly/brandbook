import DocsShell from "../components/docs/DocsShell";
import { DocsCardGrid, DocsRouteCard, DocsSection } from "../components/docs/DocsBlocks";
import { docsNavigation, getRelatedLinks } from "../lib/docs/navigation";

export const dynamic = "force-dynamic";

const group = docsNavigation.find((item) => item.href === "/patterns")!;

export default function PatternsPage() {
  return (
    <DocsShell currentPath="/patterns" title="Patterns" description={group.description} related={getRelatedLinks(["/components/dashboard", "/examples/engineering-dashboard", "/editor"])}>
      <DocsSection id="patterns" title="Pattern pages" description="Patterns describe how reusable components should be composed in product flows.">
        <DocsCardGrid>{group.items.map((item) => <DocsRouteCard key={item.href} item={item} />)}</DocsCardGrid>
      </DocsSection>
    </DocsShell>
  );
}
