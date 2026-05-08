import DocsShell from "../../components/docs/DocsShell";
import { DocsSection, LegacyNotice } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

export default function LoadingStatesPage() {
  return (
    <DocsShell currentPath="/patterns/loading-states" title="Loading States" description="Pattern page scaffold prepared for content extraction from the legacy draft sandbox." status="draft" related={getRelatedLinks(["/components/forms", "/components/dashboard"])}>
      <DocsSection id="draft" title="Draft pattern">
        <LegacyNotice>Extract the best existing examples from /draft, rewrite them against @metraly/ui, then delete the duplicate legacy blocks.</LegacyNotice>
      </DocsSection>
    </DocsShell>
  );
}
