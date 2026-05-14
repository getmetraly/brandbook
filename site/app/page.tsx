import { MetralyCard, StateBadge } from "@metraly/ui";
import DocsShell from "./components/docs/DocsShell";
import { DocsCardGrid, DocsRouteCard, DocsSection } from "./components/docs/DocsBlocks";
import { docsNavigation, getRelatedLinks } from "./lib/docs/navigation";

export const dynamic = "force-dynamic";

const componentGroup = docsNavigation.find((group) => group.href === "/components")!;

export default function HomePage() {
  return (
    <DocsShell
      currentPath="/"
      eyebrow="Metraly docs portal"
      title="A clean portal for brand, UI and dashboard patterns."
      description="The brandbook site is a registry-driven Next.js documentation portal. Use the grouped sections to inspect foundations, prototype-aligned components, patterns, examples and the dashboard editor flow."
      related={getRelatedLinks(["/components/forms", "/components/dashboard", "/examples/engineering-dashboard", "/editor"])}
      toc={[
        { title: "Portal map", href: "#portal-map" },
        { title: "Component groups", href: "#component-groups" },
      ]}
    >
      <DocsSection id="portal-map" title="Portal map" description="Every primary page is linked from the sidebar and top navigation.">
        <DocsCardGrid>
          {docsNavigation.map((group) => (
            <DocsRouteCard key={group.href} item={{ title: group.title, href: group.href, description: group.description }} />
          ))}
        </DocsCardGrid>
      </DocsSection>

      <DocsSection id="component-groups" title="Component groups" description="These sections keep the component pages focused on one product surface at a time.">
        <DocsCardGrid>
          {componentGroup?.items.map((item) => (
            <DocsRouteCard key={item.href} item={item} />
          ))}
        </DocsCardGrid>
      </DocsSection>

      <DocsSection id="architecture" title="Current architecture" description="@metraly/ui is the canonical component package. The site consumes package exports, not raw source files.">
        <div className="component-state-grid">
          <MetralyCard title="Package boundary" subtitle="Canonical import path" footer={<StateBadge state="live" label="Ready" />}>
            <pre className="code"><code>{`import { MetralyCard, StateBadge } from "@metraly/ui";`}</code></pre>
          </MetralyCard>
          <MetralyCard title="Navigation model" subtitle="Registry-driven links" footer={<StateBadge state="live" label="Ready" />}>
            <p>All top-level documentation links are defined in <code>site/app/lib/docs/navigation.ts</code>.</p>
          </MetralyCard>
        </div>
      </DocsSection>
    </DocsShell>
  );
}
