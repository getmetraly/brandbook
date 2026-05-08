"use client";

import dynamic from "next/dynamic";

const DashboardEditor = dynamic(() => import("../components/dashboard/DashboardEditor"), {
  ssr: false,
  loading: () => (
    <div className="panel" style={{ padding: "1rem" }}>
      Loading dashboard editor…
    </div>
  ),
});

export default function EditorClient() {
  return <DashboardEditor />;
}
