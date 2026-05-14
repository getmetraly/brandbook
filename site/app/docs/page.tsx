import Link from "next/link";
import { getAllDocs } from "@/lib/docs";
import DocsShell from "../components/docs/DocsShell";
import { DocsSection } from "../components/docs/DocsBlocks";
import { getRelatedLinks } from "../lib/docs/navigation";

export const dynamic = "force-dynamic";

export default function DocsIndexPage() {
  const docs = getAllDocs();
  const grouped = docs.reduce<Record<string, typeof docs>>((acc, doc) => {
    acc[doc.section] ||= [];
    acc[doc.section].push(doc);
    return acc;
  }, {});

  return (
    <DocsShell currentPath="/docs" title="Source Docs" description="Browse the raw brandbook markdown source directly from the repository structure." status="draft" related={getRelatedLinks(["/foundations", "/components", "/patterns"])}>
      {Object.entries(grouped).map(([section, items]) => (
        <DocsSection key={section} id={section} title={section} description={`${items.length} document(s)`}>
          <div className="docs-card-grid">
            {items.map((doc) => (
              <Link key={`${doc.section}-${doc.slug.join("/")}`} href={`/docs/${doc.section}/${doc.slug.join("/")}`} className="docs-route-card">
                <strong>{doc.title}</strong>
                <span>{doc.slug.join("/")}</span>
              </Link>
            ))}
          </div>
        </DocsSection>
      ))}
    </DocsShell>
  );
}
