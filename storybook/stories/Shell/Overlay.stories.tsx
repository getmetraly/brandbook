import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { MetralyDrawer, MetralyBottomSheet, MetralyButton, MetralyIcon } from "@metraly/ui";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Shell/Overlay",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

export const Drawers: Story = {
  render: () => {
    function DrawerDemo() {
      const [left, setLeft] = useState(false);
      const [right, setRight] = useState(false);
      return (
        <>
          <div className="msf__row msf__row--wrap">
            <MetralyButton variant="secondary" size="sm" onClick={() => setLeft(true)}>
              Open left drawer
            </MetralyButton>
            <MetralyButton variant="secondary" size="sm" onClick={() => setRight(true)}>
              Open right drawer
            </MetralyButton>
          </div>

          <MetralyDrawer
            open={left}
            onOpenChange={setLeft}
            side="left"
            title="Navigation"
            description="Primary app nav"
          >
            <div style={{ padding: "16px" }}>
              <p style={{ color: "var(--m-fg-2)", fontSize: "var(--m-fs-12)" }}>
                Drawer body content goes here. Scrollable when content overflows.
              </p>
            </div>
          </MetralyDrawer>

          <MetralyDrawer
            open={right}
            onOpenChange={setRight}
            side="right"
            title="Widget settings"
            description="Configure this widget"
            width={360}
          >
            <div style={{ padding: "16px" }}>
              <p style={{ color: "var(--m-fg-2)", fontSize: "var(--m-fs-12)" }}>
                Right-side settings panel. Full-screen on mobile (≤ 767px).
              </p>
            </div>
          </MetralyDrawer>
        </>
      );
    }
    return (
      <MetralyStoryFrame
        category="Shell"
        title="MetralyDrawer"
        description="Overlay side panel. Left and right variants. Full-screen on mobile, configurable width on desktop."
        status="stable"
        tags={["shell", "overlay", "a11y"]}
      >
        <section>
          <div className="msf__section-title">Left and right drawers</div>
          <DrawerDemo />
        </section>
      </MetralyStoryFrame>
    );
  },
};

export const BottomSheets: Story = {
  render: () => {
    function BottomSheetDemo() {
      const [open, setOpen] = useState(false);
      const [filterOpen, setFilterOpen] = useState(false);
      return (
        <>
          <div className="msf__row msf__row--wrap">
            <MetralyButton variant="secondary" size="sm" onClick={() => setOpen(true)}>
              Open bottom sheet
            </MetralyButton>
            <MetralyButton variant="secondary" size="sm" onClick={() => setFilterOpen(true)}>
              Open filter sheet
            </MetralyButton>
          </div>

          <MetralyBottomSheet
            open={open}
            onOpenChange={setOpen}
            title="Add data source"
            description="Connect a new integration"
          >
            <div style={{ padding: "16px" }}>
              <p style={{ color: "var(--m-fg-2)", fontSize: "var(--m-fs-12)" }}>
                Bottom sheet slides up from the bottom. Max height is 78dvh by default.
              </p>
            </div>
          </MetralyBottomSheet>

          <MetralyBottomSheet
            open={filterOpen}
            onOpenChange={setFilterOpen}
            title="Filters"
            description="Refine the current view"
            maxHeight="60dvh"
          >
            <div style={{ padding: "16px" }}>
              <p style={{ color: "var(--m-fg-2)", fontSize: "var(--m-fs-12)" }}>
                Compact filter sheet at 60dvh.
              </p>
            </div>
          </MetralyBottomSheet>
        </>
      );
    }
    return (
      <MetralyStoryFrame
        category="Shell"
        title="MetralyBottomSheet"
        description="Bottom-anchored overlay. Drag handle, scrim dismiss, configurable max height."
        status="stable"
        tags={["shell", "overlay", "mobile", "a11y"]}
      >
        <section>
          <div className="msf__section-title">Bottom sheet variants</div>
          <BottomSheetDemo />
        </section>
      </MetralyStoryFrame>
    );
  },
};
