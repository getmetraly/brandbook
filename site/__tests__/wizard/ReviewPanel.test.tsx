import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ReviewPanel } from "@metraly/ui";
import type { ReviewPanelItem } from "@metraly/ui";

const items: ReviewPanelItem[] = [
  { id: "a", label: "GitHub", value: "github.com/acme-corp", badgeState: "live" },
  { id: "b", label: "Scope", value: "pull_requests, commits" },
  { id: "c", label: "Sync frequency", value: "Every 15 minutes" },
];

describe("ReviewPanel", () => {
  it("renders title and description", () => {
    render(
      <ReviewPanel
        title="Review your connection"
        description="Confirm before syncing."
        items={items}
      />
    );
    expect(screen.getByText("Review your connection")).toBeInTheDocument();
    expect(screen.getByText("Confirm before syncing.")).toBeInTheDocument();
  });

  it("renders item labels and values", () => {
    render(<ReviewPanel items={items} />);
    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("github.com/acme-corp")).toBeInTheDocument();
    expect(screen.getByText("Scope")).toBeInTheDocument();
    expect(screen.getByText("pull_requests, commits")).toBeInTheDocument();
  });

  it("uses list role for the item container", () => {
    render(<ReviewPanel items={items} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(items.length);
  });

  it("renders badge state when provided", () => {
    render(<ReviewPanel items={items} />);
    // StateBadge renders the state text — check at least one badge is rendered
    const badge = document.querySelector(".metraly-state-badge");
    expect(badge).toBeInTheDocument();
  });

  it("shows empty text when items array is empty", () => {
    render(<ReviewPanel items={[]} emptyText="Nothing to configure." />);
    expect(screen.getByText("Nothing to configure.")).toBeInTheDocument();
  });

  it("shows default empty text when unspecified", () => {
    render(<ReviewPanel items={[]} />);
    expect(screen.getByText("Nothing to review")).toBeInTheDocument();
  });

  it("renders skeleton rows when loading", () => {
    render(<ReviewPanel items={[]} loading loadingRows={3} />);
    const skeletons = document.querySelectorAll(".metraly-skeleton");
    expect(skeletons.length).toBeGreaterThanOrEqual(3);
  });

  it("does not render title or description when omitted", () => {
    render(<ReviewPanel items={items} />);
    expect(document.querySelector(".metraly-review-panel__head")).toBeNull();
  });

  it("renders icon slot when provided", () => {
    const iconItems: ReviewPanelItem[] = [
      { id: "x", label: "Test item", icon: <span data-testid="icon">★</span> },
    ];
    render(<ReviewPanel items={iconItems} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
});
