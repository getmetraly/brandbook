import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { WizardLayout } from "@metraly/ui";

describe("WizardLayout", () => {
  const steps = [
    { id: "sources", label: "Choose sources", status: "done" as const, detail: "GitHub selected" },
    { id: "auth", label: "Connect auth", status: "current" as const, detail: "Waiting for provider token" },
    { id: "review", label: "Review setup", status: "next" as const, detail: "Confirm workspace mapping" },
  ];

  it("renders title, steps, and footer slots", () => {
    render(
      <WizardLayout
        steps={steps}
        title="Connect your delivery sources"
        description="Source selection and auth instructions assembled from current seams."
        footer={<button type="button">Continue</button>}
      >
        <div>Wizard content</div>
      </WizardLayout>,
    );

    expect(screen.getByText("Connect your delivery sources")).toBeInTheDocument();
    expect(screen.getByText("Choose sources")).toBeInTheDocument();
    expect(screen.getByText("Wizard content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue" })).toBeInTheDocument();
  });

  it("opens the mobile steps sheet when the steps button is pressed", () => {
    render(
      <WizardLayout steps={steps} title="Connect your delivery sources">
        <div>Wizard content</div>
      </WizardLayout>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Steps" }));

    expect(screen.getByRole("dialog", { name: "Wizard progress" })).toBeInTheDocument();
    expect(screen.getAllByText("Connect auth").length).toBeGreaterThan(0);
  });
});
