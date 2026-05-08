import { MetralyCard, MetralyLogo, StateBadge } from "@metraly/ui";
import DocsShell from "./components/docs/DocsShell";
import { DocsCardGrid, DocsRouteCard, DocsSection, LegacyNotice } from "./components/docs/DocsBlocks";
import { docsNavigation, getRelatedLinks } from "./lib/docs/navigation";

export default function HomePage() {
  return (
    <DocsShell
      currentPath="/"
      eyebrow="Metraly design system"
      title="A clean portal for brand, UI and dashboard patterns."
      description="The brandbook site is now structured as a Next.js documentation portal instead of a single oversized draft page. Use the grouped sections to inspect foundations, component previews, patterns, examples and the dashboard editor flow."
      related={getRelatedLinks(["/components/forms", "/components/dashboard", "/examples/engineering-dashboard", "/editor"])}
      toc={[{ title: "Start here", href: "#start" }, { title: "Current architecture", href: "#architecture" }, { title: "Legacy cleanup", href: "#legacy" }]}
    >
      <DocsSection id="start" title="Start here" description="Every primary page is linked from the sidebar and top navigation. Component previews are grouped by domain so pages do not grow like the legacy /draft sandbox.">
        <DocsCardGrid>
          {docsNavigation.slice(0, 4).map((group) => (
            <DocsRouteCard key={group.href} item={{ title: group.title, href: group.href, description: group.description }} />
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

      <DocsSection id="legacy" title="Legacy cleanup" description="The draft page remains available while previews are migrated into grouped canonical pages.">
        <LegacyNotice>
          /draft is now a legacy sandbox. New previews should land under /components, /patterns or /examples. The next cleanup pass should remove migrated blocks from /draft and then delete draft-only CSS that no longer has consumers.
        </LegacyNotice>
        <div className="component-preview panel" style={{ marginTop: 16 }}>
          <div className="component-preview-copy">
            <h3>Metraly identity</h3>
            <p>The logo and core surfaces are reusable through @metraly/ui and should be shown in the portal instead of recreated per page.</p>
          </div>
          <div className="component-preview-stage">
            <MetralyLogo />
          </div>
        </div>
      </DocsSection>
    </DocsShell>
  );
}
