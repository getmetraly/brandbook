import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as React from "react";
import { MetralyBottomSheet, MetralyButton, MetralyDrawer, MetralyInput } from "@metraly/ui";

function DrawerHarness() {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <MetralyButton variant="primary" onClick={() => setOpen(true)}>
        Open drawer
      </MetralyButton>
      <MetralyDrawer open={open} onOpenChange={setOpen} title="Drawer test" description="Verify focus restore">
        <div style={{ padding: 12 }}>
          <MetralyInput fullWidth placeholder="Drawer input" />
        </div>
      </MetralyDrawer>
    </div>
  );
}

function BottomSheetHarness() {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <MetralyButton variant="primary" onClick={() => setOpen(true)}>
        Open sheet
      </MetralyButton>
      <MetralyBottomSheet open={open} onOpenChange={setOpen} title="Sheet test" description="Verify focus restore">
        <div style={{ padding: 12 }}>
          <MetralyInput fullWidth placeholder="Sheet input" />
        </div>
      </MetralyBottomSheet>
    </div>
  );
}

describe("Metraly overlays", () => {
  afterEach(() => {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  });

  it("drawer locks body scroll and restores focus to the trigger", async () => {
    render(<DrawerHarness />);

    const trigger = screen.getByRole("button", { name: "Open drawer" });
    trigger.focus();
    fireEvent.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "Drawer test" });
    expect(dialog).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.click(within(dialog).getByRole("button", { name: "Close panel" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Drawer test" })).not.toBeInTheDocument();
      expect(document.activeElement).toBe(trigger);
      expect(document.body.style.overflow).toBe("");
    });
  });

  it("bottom sheet locks body scroll and restores focus to the trigger", async () => {
    render(<BottomSheetHarness />);

    const trigger = screen.getByRole("button", { name: "Open sheet" });
    trigger.focus();
    fireEvent.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "Sheet test" });
    expect(dialog).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.click(within(dialog).getByRole("button", { name: "Close panel" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Sheet test" })).not.toBeInTheDocument();
      expect(document.activeElement).toBe(trigger);
      expect(document.body.style.overflow).toBe("");
    });
  });
});
