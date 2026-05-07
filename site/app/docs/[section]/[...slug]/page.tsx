import { notFound } from "next/navigation";
import type { DocSection } from "@/lib/docs";
import { getDocBySlug, readDoc } from "@/lib/docs";

const validSections = new Set<DocSection>([
  "brandbook",
  "design-system",
  "framework",
  "migration",
]);

type DocPageParams = {
  section: DocSection;
  slug: string[];
};

export default async function DocPage({
  params,
}: {
  params: Promise<DocPageParams>;
}) {
  const resolvedParams = await params;

  if (!validSections.has(resolvedParams.section)) {
    notFound();
  }

  const doc = getDocBySlug(resolvedParams.section, resolvedParams.slug);

  if (!doc) {
    notFound();
  }

  const content = readDoc(doc.filePath);

  return (
    <main className="shell" style={{ padding: "48px 0 96px" }}>
      <div className="section-head">
        <div>
          <div className="eyebrow">
            <span className="metraly-pulse-marker" />
            {resolvedParams.section}
          </div>
          <h1 style={{ fontSize: "clamp(38px,5vw,72px)", marginTop: 20 }}>
            {doc.title}
          </h1>
        </div>
      </div>

      <article className="panel" style={{ padding: 28 }}>
        <pre
          style={{
            margin: 0,
            whiteSpace: "pre-wrap",
            lineHeight: 1.75,
            fontFamily: "var(--font-ui)",
            color: "var(--text-secondary)",
          }}
        >
          {content}
        </pre>
      </article>
    </main>
  );
}
