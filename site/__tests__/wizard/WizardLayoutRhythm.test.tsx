import * as React from "react";
import { render, screen } from "@testing-library/react";
import { WizardLayout } from "@metraly/ui";

const steps = [
  { id: "one", label: "Select Sources", status: "done" as const },
  { id: "two", label: "Preview Connection", status: "current" as const },
  { id: "three", label: "Configure", status: "next" as const },
];

describe("WizardLayout app-aligned rhythm", () => {
  it("renders top progress by default for app-like connection flows", () => {
    const { container } = render(
      <WizardLayout steps={steps} title="Choose synthetic demo sources">
        <div>Source grid</div>
      </WizardLayout>,
    );

    expect(container.querySelector(".metraly-wizard-layout")?.getAttribute("data-progress-placement")).toBe("top");
    expect(container.querySelector(".metraly-wizard-stepper")).not.toBeNull();
    expect(screen.getByLabelText("Wizard progress")).toBeInTheDocument();
    expect(screen.getByText("Choose synthetic demo sources")).toBeInTheDocument();
  });

  it("keeps side progress available for dense documentation examples", () => {
    const { container } = render(
      <WizardLayout progressPlacement="side" steps={steps} title="Connect your delivery sources">
        <div>Legacy side rail body</div>
      </WizardLayout>,
    );

    expect(container.querySelector(".metraly-wizard-layout")?.getAttribute("data-progress-placement")).toBe("side");
    expect(container.querySelector(".metraly-wizard-layout-aside")).not.toBeNull();
    expect(container.querySelector(".metraly-wizard-progress")).not.toBeNull();
  });
});
