import type { Meta, StoryObj } from "@storybook/react";
import FormsPrototypeConformancePage from "../site/app/components/forms/prototype-conformance/page";

const meta: Meta<typeof FormsPrototypeConformancePage> = {
  title: "Prototype Conformance/Phase 1 Forms",
  component: FormsPrototypeConformancePage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Phase 1 prototype conformance examples for StateBadge and form controls. This story mirrors the /components/forms/prototype-conformance route and should be kept aligned with the phase plan.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof FormsPrototypeConformancePage>;

export const CorePrimitivesAndForms: Story = {};
