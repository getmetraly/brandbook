import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import {
  MetralyTable,
  type MetralyTableColumn,
  type MetralyTableProps,
} from "./MetralyTable";

type ServiceRow = {
  service: string;
  latency: string;
  errorRate: string;
};

const serviceColumns: MetralyTableColumn<ServiceRow>[] = [
  { key: "service", header: "Service", width: "48%" },
  { key: "latency", header: "P95 latency", width: "26%", align: "right" },
  { key: "errorRate", header: "Error rate", width: "26%", align: "right" },
];

const serviceRows: ServiceRow[] = [
  { service: "payments-api", latency: "182 ms", errorRate: "0.12%" },
  { service: "connector-sync", latency: "228 ms", errorRate: "0.34%" },
  { service: "policy-engine", latency: "96 ms", errorRate: "0.03%" },
];

function ServiceTableStory(props: MetralyTableProps<ServiceRow>) {
  return <MetralyTable<ServiceRow> {...props} />;
}

const meta = {
  component: ServiceTableStory,
  tags: ["ai-generated", "needs-work"],
  args: {
    ariaLabel: "Deployment health table",
    columns: serviceColumns,
    data: serviceRows,
    rowKey: (row: ServiceRow) => row.service,
  },
} satisfies Meta<typeof ServiceTableStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedRowKeys: ["payments-api"],
    liveRowKeys: ["payments-api"],
    footer: "Last refreshed 42 seconds ago.",
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("row", { name: /payments-api row live/i }),
    ).toHaveAttribute("aria-selected", "true");
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const ErrorState: Story = {
  args: {
    error: true,
    errorText: "Failed to refresh deployment health from the telemetry pipeline.",
  },
};
