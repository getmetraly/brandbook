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
    <div className={["metraly-plugin-catalog", className].filter(Boolean).join(" ")} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <MetralyInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search plugins…"
          style={{ flex: 1, minWidth: 160 }}
        />
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {allCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "7px 14px",
                borderRadius: 8,
                cursor: "pointer",
                border: activeCategory === cat
                  ? "1px solid color-mix(in srgb, var(--m-cyan-500, var(--cyan)) 40%, transparent)"
                  : "1px solid var(--m-line, var(--border))",
                background: activeCategory === cat
                  ? "color-mix(in srgb, var(--m-cyan-500, var(--cyan)) 10%, transparent)"
                  : "var(--m-bg-1, var(--glass))",
                color: activeCategory === cat ? "var(--m-cyan-500, var(--cyan))" : "var(--m-fg-2, var(--muted2))",
                fontSize: 13,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <StateBlock variant="no-results" description="Try a different search or category." />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
          {filtered.map((p) => (
            <CardShell
              key={p.id}
              density="compact"
              leading={
                <span
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: `color-mix(in srgb, ${p.iconColor ?? "var(--m-cyan-500, var(--cyan))"} 12%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${p.iconColor ?? "var(--m-cyan-500, var(--cyan))"} 20%, transparent)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontWeight: 700,
                    fontSize: 14,
                    color: p.iconColor ?? "var(--m-cyan-500, var(--cyan))",
                  }}
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
                <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
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
              <p style={{ margin: 0, fontSize: "var(--m-fs-12, 12px)", color: "var(--m-fg-2, var(--muted))", lineHeight: 1.5 }}>
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
