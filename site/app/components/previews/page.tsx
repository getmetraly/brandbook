import DocsShell from "../docs/DocsShell";
import { DocsSection, LegacyNotice } from "../docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";
import ClaudeDesignStateBoard from "./ClaudeDesignStateBoard";

export default function ComponentPreviewsPage() {
  return (
    <DocsShell
      currentPath="/components/previews"
      title="Preview Hardening"
      description="State board and dashboard editor previews integrated from the Claude Design visual reference."
      status="hardening"
      related={getRelatedLinks(["/components/dashboard", "/components/charts", "/patterns/widget-editor", "/examples/engineering-dashboard"])}
      toc={[
        { title: "Reference boundary", href: "#reference-boundary" },
        { title: "State board", href: "#state-board" },
      ]}
    >
      <DocsSection id="reference-boundary" title="Reference boundary">
        <LegacyNotice>
          `brandbook-metraly(2).zip` is a visual reference only. This page uses current `@metraly/ui`
          primitives, Metraly chart wrappers and static state previews instead of browser-Babel prototype code.
        </LegacyNotice>
      </DocsSection>
      <DocsSection id="state-board" title="State board and editor scenario">
        <ClaudeDesignStateBoard />
      </DocsSection>
    </DocsShell>
  );
}
