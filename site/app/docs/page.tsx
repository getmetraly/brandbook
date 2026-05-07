import Link from "next/link";
import { getAllDocs } from "@/lib/docs";

export default function DocsIndexPage() {
  const docs = getAllDocs();

  const grouped = docs.reduce<Record<string, typeof docs>>((acc, doc) => {
    acc[doc.section] ||= [];
    acc[doc.section].push(doc);
    return acc;
  }, {});

  return (
    <main className="shell" style={{ padding: "64px 0" }}>
      <div className="section-head">
        <h1 style={{ fontSize: "clamp(42px,5vw,72px)" }}>Documentation browser</h1>
        <p>
          Browse the live brandbook source directly from the repository structure.
        </p>
      </div>

      {Object.entries(grouped).map(([section, items]) => (
        <section key={section} className="section">
          <div className="section-head">
            <h2>{section}</h2>
            <p>{items.length} document(s)</p>
          </div>

          <div className="card-grid">
            {items.map((doc) => (
              <Link
                key={`${doc.section}-${doc.slug.join("/")}`}
                href={`/docs/${doc.section}/${doc.slug.join("/")}`}
                className="card"
              >
                <h3>{doc.title}</h3>
                <p>{doc.slug.join("/")}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
