import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FieldShell } from "@metraly/ui";

const meta = {
  component: FieldShell,
  tags: ["ai-generated"],
} satisfies Meta<typeof FieldShell>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Bare field shell renders the label and wraps content. */
export const Default: Story = {
  args: {
    as: "div",
    layout: "field",
    label: "Email address",
    children: (({ controlId }) => (
      <input id={controlId} type="email" placeholder="you@example.com" className="metraly-input__field" />
    )) as any,
  },
};

/** With description helper text below the control. */
export const WithDescription: Story = {
  args: {
    as: "div",
    layout: "field",
    label: "API token",
    description: "Create a token in your account settings.",
    children: (({ controlId }) => (
      <input id={controlId} type="text" placeholder="sk-..." className="metraly-input__field" />
    )) as any,
  },
};

/** Error state shows the helper text in the error colour. */
export const WithError: Story = {
  args: {
    as: "div",
    layout: "field",
    label: "Username",
    error: "Username is already taken.",
    children: (({ controlId }) => (
      <input id={controlId} type="text" defaultValue="admin" className="metraly-input__field" />
    )) as any,
  },
};

/** Disabled state greys out the entire field group. */
export const Disabled: Story = {
  args: {
    as: "div",
    layout: "field",
    label: "Read-only field",
    disabled: true,
    children: (({ controlId }) => (
      <input id={controlId} type="text" defaultValue="locked value" disabled className="metraly-input__field" />
    )) as any,
  },
};
