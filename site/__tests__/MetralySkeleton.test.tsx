import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MetralySkeleton } from "@metraly/ui";

describe("MetralySkeleton", () => {
  it("renders text lines", () => {
    const { container } = render(<MetralySkeleton variant="text" lines={4} />);
    expect(container.querySelectorAll(".metraly-skeleton__line")).toHaveLength(4);
  });

  it("renders block variant", () => {
    const { container } = render(<MetralySkeleton variant="widget" />);
    expect(container.querySelector(".metraly-skeleton.is-widget .metraly-skeleton__block")).toBeInTheDocument();
  });
});
