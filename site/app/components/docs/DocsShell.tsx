import Link from "next/link";
import type { ReactNode } from "react";
import {
  buildBreadcrumbs,
  docsNavigation,
  getPrevNext,
  topLevelDocsLinks,
  type DocsNavItem,
} from "../../lib/docs/navigation";

export type TableOfContentsItem = {
  title: string;
  href: string;
};

export interface DocsShellProps {
  currentPath: string;
  title: string;
  description: string;
  eyebrow?: string;
  status?: DocsNavItem["status"];
  toc?: TableOfContentsItem[];
  related?: DocsNavItem[];
  children: ReactNode;
}

function StatusBadge({ status }: { status?: DocsNavItem["status"] }) {
  if (!status) return null;
  const label = status === "ready" ? "Ready" : status === "legacy" ? "Legacy" : status === "planned" ? "Planned" : "Draft";
  return <span className={`docs-status docs-status-${status}`}>{label}</span>;
}

export function DocsTopNav() {
  return (
    <header className="docs-topnav">
      <Link href="/" className="docs-brand" aria-label="Metraly Brandbook home">
        <span className="docs-brand-mark" aria-hidden="true"><span className="metraly-pulse-marker" /></span>
        <span>Metraly Brandbook</span>
      </Link>
      <nav className="docs-topnav-links" aria-label="Primary documentation navigation">
        {topLevelDocsLinks.map((item) => (
          <Link key={item.href} href={item.href}>{item.title}</Link>
        ))}
      </nav>
    </header>
  );
}

export function DocsSidebar({ currentPath }: { currentPath: string }) {
  return (
    <aside className="docs-sidebar" aria-label="Documentation sidebar">
      {docsNavigation.map((group) => (
        <section className="docs-sidebar-group" key={group.title}>
          <Link className={currentPath === group.href ? "docs-sidebar-title is-active" : "docs-sidebar-title"} href={group.href}>
            {group.title}
          </Link>
          <div className="docs-sidebar-items">
            {group.items.map((item) => (
              <Link key={item.href} className={currentPath === item.href ? "docs-sidebar-link is-active" : "docs-sidebar-link"} href={item.href}>
                <span>{item.title}</span>
                <StatusBadge status={item.status} />
              </Link>
            ))}
          </div>
        </section>
      ))}
    </aside>
  );
}

export function DocsBreadcrumbs({ currentPath }: { currentPath: string }) {
  const crumbs = buildBreadcrumbs(currentPath);
  return (
    <nav className="docs-breadcrumbs" aria-label="Breadcrumbs">
      {crumbs.map((crumb, index) => (
        <span key={crumb.href} className="docs-breadcrumb-item">
          {index > 0 ? <span aria-hidden="true">/</span> : null}
          {index === crumbs.length - 1 ? <span>{crumb.title}</span> : <Link href={crumb.href}>{crumb.title}</Link>}
        </span>
      ))}
    </nav>
  );
}

export function RelatedLinks({ links }: { links: DocsNavItem[] }) {
  if (links.length === 0) return null;
  return (
    <section className="docs-related" aria-label="Related pages">
      <h2>Related</h2>
      <div className="docs-related-grid">
        {links.map((link) => (
          <Link key={link.href} className="docs-related-card" href={link.href}>
            <strong>{link.title}</strong>
            {link.description ? <span>{link.description}</span> : null}
          </Link>
        ))}
      </div>
    </section>
  );
}

function DocsToc({ items }: { items: TableOfContentsItem[] }) {
  if (items.length === 0) return null;
  return (
    <nav className="docs-toc" aria-label="On this page">
      <strong>On this page</strong>
      {items.map((item) => <a key={item.href} href={item.href}>{item.title}</a>)}
    </nav>
  );
}

function PrevNextLinks({ currentPath }: { currentPath: string }) {
  const { previous, next } = getPrevNext(currentPath);
  if (!previous && !next) return null;
  return (
    <nav className="docs-prev-next" aria-label="Previous and next pages">
      {previous ? <Link href={previous.href}><span>Previous</span><strong>{previous.title}</strong></Link> : <span />}
      {next ? <Link href={next.href}><span>Next</span><strong>{next.title}</strong></Link> : <span />}
    </nav>
  );
}

export function DocsShell({
  currentPath,
  title,
  description,
  eyebrow = "Design system",
  status,
  toc = [],
  related = [],
  children,
}: DocsShellProps) {
  return (
    <main className="docs-root">
      <DocsTopNav />
      <div className="docs-layout">
        <DocsSidebar currentPath={currentPath} />
        <article className="docs-content">
          <DocsBreadcrumbs currentPath={currentPath} />
          <header className="docs-page-header">
            <div className="eyebrow"><span className="metraly-pulse-marker" />{eyebrow}</div>
            <div className="docs-title-row">
              <h1>{title}</h1>
              <StatusBadge status={status} />
            </div>
            <p>{description}</p>
          </header>
          <DocsToc items={toc} />
          {children}
          <RelatedLinks links={related} />
          <PrevNextLinks currentPath={currentPath} />
        </article>
      </div>
    </main>
  );
}

export default DocsShell;
