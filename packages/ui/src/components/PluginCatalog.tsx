import * as React from "react";
import { CardShell } from "./CardShell";
import { MetralyInput } from "./MetralyInput";
import { MetralyButton } from "./MetralyButton";
import { StateBadge } from "./StateBadge";
import { StateBlock } from "./StateBlock";

export interface Plugin {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  iconColor?: string;
  rating?: number;
  installCount?: string;
  installed?: boolean;
  status?: "live" | "preview" | "coming-soon";
}

export interface PluginCatalogProps {
  plugins: Plugin[];
  onInstall: (id: string) => void;
  onManage: (id: string) => void;
  onReview?: (id: string) => void;
  categories?: string[];
  className?: string;
}

export function PluginCatalog({
  plugins,
  onInstall,
  onManage,
  onReview,
  categories,
  className,
}: PluginCatalogProps) {
  const [search, setSearch] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("All");

  const allCategories = ["All", ...(categories ?? [...new Set(plugins.map((p) => p.category))])];

  const filtered = plugins.filter((p) => {
    const matchesCat = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className={["metraly-plugin-catalog", className].filter(Boolean).join(" ")}>
      <div className="metraly-plugin-catalog__toolbar">
        <MetralyInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search plugins…"
          wrapperClassName="metraly-plugin-catalog__search"
        />
        <div className="metraly-plugin-catalog__cats">
          {allCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              className="metraly-plugin-catalog__cat"
              data-active={activeCategory === cat ? "true" : undefined}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <StateBlock variant="no-results" description="Try a different search or category." />
      ) : (
        <div className="metraly-plugin-catalog__grid">
          {filtered.map((p) => (
            <CardShell
              key={p.id}
              density="compact"
              leading={
                <span
                  className="metraly-plugin-catalog__icon"
                  style={p.iconColor ? ({ "--m-plugin-icon": p.iconColor } as React.CSSProperties) : undefined}
                  aria-hidden="true"
                >
                  {p.name.charAt(0)}
                </span>
              }
              title={p.name}
              subtitle={[
                p.category,
                p.rating != null ? `★ ${p.rating}` : null,
                p.installCount ?? null,
              ].filter(Boolean).join(" · ")}
              trailing={
                p.installed
                  ? <StateBadge state="live" label="Installed" size="sm" />
                  : p.status === "preview"
                  ? <StateBadge state="purple" label="Preview" size="sm" />
                  : undefined
              }
              footer={
                <div className="metraly-plugin-catalog__actions">
                  {onReview && !p.installed && (
                    <MetralyButton variant="ghost" size="sm" onClick={() => onReview(p.id)}>
                      Review
                    </MetralyButton>
                  )}
                  <MetralyButton
                    variant={p.installed ? "ghost" : "secondary"}
                    size="sm"
                    onClick={() => (p.installed ? onManage(p.id) : onInstall(p.id))}
                  >
                    {p.installed ? "Manage" : "Install"}
                  </MetralyButton>
                </div>
              }
            >
              <p className="metraly-plugin-catalog__desc">
                {p.description}
              </p>
            </CardShell>
          ))}
        </div>
      )}
    </div>
  );
}
export default PluginCatalog;
