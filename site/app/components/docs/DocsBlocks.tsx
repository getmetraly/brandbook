import type { ReactNode } from "react";
import Link from "next/link";
import type { DocsNavItem } from "../../lib/docs/navigation";

export function DocsSection({ id, title, description, children }: { id: string; title: string; description?: string; children: ReactNode }) {
  return (
    <section id={id} className="docs-section">
      <div className="docs-section-head">
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function DocsCardGrid({ children }: { children: ReactNode }) {
  return <div className="docs-card-grid">{children}</div>;
}

export function DocsRouteCard({ item }: { item: DocsNavItem }) {
  return (
    <Link className="docs-route-card" href={item.href}>
      <strong>{item.title}</strong>
      {item.description ? <span>{item.description}</span> : null}
      {item.status ? <small>{item.status}</small> : null}
    </Link>
  );
}

export function ComponentPreview({
  title,
  description,
  children,
  states,
  code,
}: {
  title: string;
  description: string;
  children: ReactNode;
  states?: string[];
  code?: string;
}) {
  return (
    <article className="component-preview panel">
      <div className="component-preview-copy">
        <h3>{title}</h3>
        <p>{description}</p>
        {states && states.length > 0 ? (
          <div className="component-preview-states" aria-label={`${title} states`}>
            {states.map((state) => <span key={state}>{state}</span>)}
          </div>
        ) : null}
      </div>
      <div className="component-preview-stage">{children}</div>
      {code ? <CodeBlock code={code} /> : null}
    </article>
  );
}

export function ComponentStateGrid({ children }: { children: ReactNode }) {
  return <div className="component-state-grid">{children}</div>;
}

export function CodeBlock({ code }: { code: string }) {
  return <pre className="code docs-code"><code>{code}</code></pre>;
}
