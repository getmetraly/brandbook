import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AnswerCard } from "@metraly/ui";

const meta = {
  component: AnswerCard,
  tags: ["ai-generated"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof AnswerCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Revenue grew 12% month-over-month, driven by an increase in enterprise subscriptions.",
  },
};

export const WithEvidence: Story = {
  args: {
    text: "Active users increased significantly following the Q2 product launch.",
    evidence: [
      { metricId: "dau", label: "Daily Active Users", value: "24,830", trend: "up" },
      { metricId: "mau", label: "Monthly Active Users", value: "187,200", trend: "up" },
      { metricId: "churn", label: "Churn Rate", value: "2.1%", trend: "down" },
    ],
  },
};

export const Loading: Story = {
  args: {
    text: "",
    loading: true,
  },
};

export const WithTraceCallback: Story = {
  args: {
    text: "EBITDA margin improved from 18% to 23% after the cost-reduction initiative.",
    evidence: [
      { metricId: "ebitda", label: "EBITDA Margin", value: "23%", trend: "up" },
    ],
    onShowTrace: () => console.log("show trace"),
  },
};
