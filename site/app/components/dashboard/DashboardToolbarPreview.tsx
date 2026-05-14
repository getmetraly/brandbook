"use client";

import { DashboardToolbar } from "@metraly/ui";

export default function DashboardToolbarPreview() {
  return (
    <DashboardToolbar
      tabs={[{ value: "delivery", label: "Delivery" }, { value: "dora", label: "DORA" }, { value: "flow", label: "Flow" }]}
      activeTab="delivery"
      searchValue=""
      syncState="live"
    />
  );
}
