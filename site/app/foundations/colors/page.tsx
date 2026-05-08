import DocsShell from "../../components/docs/DocsShell";
import { DocsSection } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

const swatches = [
  ["Primary cyan", "#00E5CC", "Primary action and telemetry signal"],
  ["Secondary purple", "#A855F7", "Brand depth and secondary highlights"],
  ["Success green", "#22C55E", "Healthy and completed states"],
  ["Warning orange", "#F59E0B", "Delayed and review states"],
  ["Base", "#0B0F14", "Product canvas"],
  ["Surface", "#111722", "Panels and navigation"],
  ["Card", "#151D28", "Metric cards and widgets"],
  ["Text", "#F0F4F8", "Primary content"],
];

export default function ColorsPage() {
  return (
    <DocsShell currentPath="/foundations/colors" title="Colors" description="Metraly uses a dark telemetry-native color system with cyan as the primary signal, purple for depth and semantic colors for product state." status="ready" related={getRelatedLinks(["/components/primitives", "/components/data-display"])}>
      <DocsSection id="swatches" title="Core swatches">
        <div className="swatches">
          {swatches.map(([name, value, usage]) => (
            <div className="swatch" key={name}>
              <div className="swatch-color" style={{ background: value }} />
              <div className="swatch-meta"><strong>{name}</strong><span>{value}</span><span>{usage}</span></div>
            </div>
          ))}
        </div>
      </DocsSection>
    </DocsShell>
  );
}
