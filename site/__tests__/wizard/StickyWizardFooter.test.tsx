import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { StickyWizardFooter } from "@metraly/ui";

describe("StickyWizardFooter", () => {
  it("renders primary action", () => {
    render(
      <StickyWizardFooter
        primary={<button type="button">Continue</button>}
      />
    );
    expect(screen.getByRole("button", { name: "Continue" })).toBeInTheDocument();
  });

  it("renders back button when provided", () => {
    render(
      <StickyWizardFooter
        back={<button type="button">Back</button>}
        primary={<button type="button">Continue</button>}
      />
    );
    expect(screen.getByRole("button", { name: "Back" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue" })).toBeInTheDocument();
  });

  it("does not render back slot when omitted", () => {
    render(
      <StickyWizardFooter
        primary={<button type="button">Get started</button>}
      />
    );
    expect(document.querySelector(".metraly-sticky-wizard-footer__back")).toBeNull();
  });

  it("adds no-back modifier class when back is absent", () => {
    const { container } = render(
      <StickyWizardFooter
        primary={<button type="button">Go</button>}
      />
    );
    expect(container.firstChild).toHaveClass("metraly-sticky-wizard-footer--no-back");
  });

  it("does not add no-back modifier when back is present", () => {
    const { container } = render(
      <StickyWizardFooter
        back={<button type="button">Back</button>}
        primary={<button type="button">Continue</button>}
      />
    );
    expect(container.firstChild).not.toHaveClass("metraly-sticky-wizard-footer--no-back");
  });

  it("renders status slot when provided", () => {
    render(
      <StickyWizardFooter
        status={<span data-testid="status">Save failed</span>}
        primary={<button type="button">Retry</button>}
      />
    );
    expect(screen.getByTestId("status")).toBeInTheDocument();
  });

  it("does not render status slot when omitted", () => {
    render(
      <StickyWizardFooter
        primary={<button type="button">Continue</button>}
      />
    );
    expect(document.querySelector(".metraly-sticky-wizard-footer__status")).toBeNull();
  });

  it("accepts custom className", () => {
    const { container } = render(
      <StickyWizardFooter
        primary={<button type="button">Go</button>}
        className="my-footer"
      />
    );
    expect(container.firstChild).toHaveClass("my-footer");
    expect(container.firstChild).toHaveClass("metraly-sticky-wizard-footer");
  });
});
