import DocsShell from "../../components/docs/DocsShell";
import { DocsSection, LegacyNotice } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

export default function FeedbackPage() {
  return (
    <DocsShell currentPath="/components/feedback" title="Feedback" description="This component group is reserved for the next cleanup pass." status="planned" related={getRelatedLinks(["/components/primitives", "/components/forms"])}>
      <DocsSection id="planned" title="Planned extraction">
        <LegacyNotice>Move matching legacy draft components into @metraly/ui, add stories/tests, then replace this placeholder with canonical previews.</LegacyNotice>
      </DocsSection>
    </DocsShell>
  );
}
