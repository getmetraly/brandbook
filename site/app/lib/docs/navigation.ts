export type DocsNavItem = {
  title: string;
  href: string;
  description?: string;
  status?: "ready" | "draft" | "legacy" | "planned";
};

export type DocsNavGroup = {
  title: string;
  href: string;
  description: string;
  items: DocsNavItem[];
};

export const docsNavigation: DocsNavGroup[] = [
  {
    title: "Foundations",
    href: "/foundations",
    description: "Brand tokens, layout rules, motion and accessibility foundations.",
    items: [
      { title: "Colors", href: "/foundations/colors", description: "Brand, surface and semantic color tokens.", status: "ready" },
      { title: "Typography", href: "/foundations/typography", description: "Display, UI and mono type rules.", status: "draft" },
      { title: "Spacing", href: "/foundations/spacing", description: "Density, rhythm and dashboard spacing rules.", status: "draft" },
      { title: "Motion", href: "/foundations/motion", description: "Calm transitions and reduced-motion guidance.", status: "draft" },
      { title: "Accessibility", href: "/foundations/accessibility", description: "Keyboard, focus, labels and contrast rules.", status: "draft" },
    ],
  },
  {
    title: "Components",
    href: "/components",
    description: "Grouped previews of production UI from @metraly/ui.",
    items: [
      { title: "Primitives", href: "/components/primitives", description: "Cards, panels, badges, logos and surfaces.", status: "ready" },
      { title: "Forms", href: "/components/forms", description: "Checkbox, radio, switch, select and tabs.", status: "ready" },
      { title: "Data Display", href: "/components/data-display", description: "Tables, state badges and metric cards.", status: "ready" },
      { title: "Dashboard", href: "/components/dashboard", description: "Dashboard grid, widgets, toolbar and empty states.", status: "ready" },
      { title: "Feedback", href: "/components/feedback", description: "Toasts, alerts, skeletons and progress states.", status: "planned" },
      { title: "Navigation", href: "/components/navigation", description: "Sidebar, topbar, breadcrumbs and command surfaces.", status: "planned" },
      { title: "Charts", href: "/components/charts", description: "Recharts-backed chart previews and chart rules.", status: "draft" },
    ],
  },
  {
    title: "Patterns",
    href: "/patterns",
    description: "Reusable product patterns for dashboards and setup flows.",
    items: [
      { title: "Dashboard Layout", href: "/patterns/dashboard-layout", description: "Sidebar, toolbar and board canvas composition.", status: "ready" },
      { title: "Widget Editor", href: "/patterns/widget-editor", description: "Create, arrange, resize and save widgets.", status: "ready" },
      { title: "Filters", href: "/patterns/filters", description: "Scoped filtering and segment switching.", status: "draft" },
      { title: "Empty States", href: "/patterns/empty-states", description: "First-run and no-data dashboard states.", status: "draft" },
      { title: "Loading States", href: "/patterns/loading-states", description: "Skeletons and async state treatment.", status: "draft" },
    ],
  },
  {
    title: "Examples",
    href: "/examples",
    description: "Real dashboard examples composed from the component library.",
    items: [
      { title: "Engineering Dashboard", href: "/examples/engineering-dashboard", description: "Executive engineering overview with delivery metrics.", status: "ready" },
      { title: "Delivery Health", href: "/examples/delivery-health", description: "Deployment and review health page.", status: "draft" },
      { title: "Incident Review", href: "/examples/incident-review", description: "Incident and MTTR review surface.", status: "draft" },
      { title: "Team Performance", href: "/examples/team-performance", description: "Team comparison and flow signals.", status: "draft" },
    ],
  },
  {
    title: "Sandbox",
    href: "/draft",
    description: "Legacy draft laboratory retained temporarily during migration.",
    items: [
      { title: "Legacy Draft", href: "/draft", description: "Large legacy showcase. Use grouped pages as canonical previews.", status: "legacy" },
      { title: "Editor", href: "/editor", description: "Client dashboard editor with local persistence.", status: "ready" },
      { title: "Source Docs", href: "/docs", description: "Raw markdown browser for repository documentation.", status: "draft" },
    ],
  },
];

export const topLevelDocsLinks = [
  { title: "Foundations", href: "/foundations" },
  { title: "Components", href: "/components" },
  { title: "Patterns", href: "/patterns" },
  { title: "Examples", href: "/examples" },
  { title: "Editor", href: "/editor" },
  { title: "Source Docs", href: "/docs" },
];

export function flattenDocsNavigation(): DocsNavItem[] {
  return docsNavigation.flatMap((group) => [
    { title: group.title, href: group.href, description: group.description },
    ...group.items,
  ]);
}

export function getDocsItem(href: string): DocsNavItem | undefined {
  return flattenDocsNavigation().find((item) => item.href === href);
}

export function getPrevNext(href: string): { previous?: DocsNavItem; next?: DocsNavItem } {
  const items = flattenDocsNavigation().filter((item) => item.href !== "/draft");
  const index = items.findIndex((item) => item.href === href);
  return {
    previous: index > 0 ? items[index - 1] : undefined,
    next: index >= 0 && index < items.length - 1 ? items[index + 1] : undefined,
  };
}

export function buildBreadcrumbs(href: string): DocsNavItem[] {
  const crumbs: DocsNavItem[] = [{ title: "Home", href: "/" }];
  const group = docsNavigation.find((candidate) => href === candidate.href || candidate.items.some((item) => item.href === href));
  if (!group) return crumbs;
  if (href !== group.href) {
    crumbs.push({ title: group.title, href: group.href, description: group.description });
  }
  const item = getDocsItem(href);
  if (item) crumbs.push(item);
  return crumbs;
}

export function getRelatedLinks(hrefs: string[]): DocsNavItem[] {
  return hrefs.map(getDocsItem).filter((item): item is DocsNavItem => Boolean(item));
}
