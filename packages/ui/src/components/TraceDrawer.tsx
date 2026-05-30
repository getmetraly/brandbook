import * as React from "react";
import { MetralyDrawer } from "../shell/MetralyDrawer";
import { StepRail } from "../wizard/StepRail";
import { PulseMarker } from "./PulseMarker";
import type { StepRailStep, StepRailStepStatus } from "../wizard/StepRail";

export type TraceStepStatus = "pending" | "running" | "done" | "error";

export interface TraceStep {
  id: string;
  label: string;
  detail?: string;
  status: TraceStepStatus;
}

export interface TraceDrawerProps {
  open: boolean;
  onClose: () => void;
  steps: TraceStep[];
  title?: string;
}

function traceToRailStatus(s: TraceStepStatus): StepRailStepStatus {
  if (s === "done") return "done";
  if (s === "running") return "current";
  if (s === "error") return "warning";
  return "next";
}

export function TraceDrawer({ open, onClose, steps, title = "AI reasoning" }: TraceDrawerProps) {
  const railSteps: StepRailStep[] = steps.map((s) => ({
    id: s.id,
    label: s.label,
    detail: s.detail,
    status: traceToRailStatus(s.status),
  }));

  const isRunning = steps.some((s) => s.status === "running");

  return (
    <MetralyDrawer open={open} onOpenChange={(o) => { if (!o) onClose(); }} title={title} side="right" width="min(480px, 100vw)">
      {isRunning && (
        <div className="metraly-trace__running">
          <PulseMarker tone="live" />
          <span className="metraly-trace__running-label">Analysing…</span>
        </div>
      )}
      <StepRail steps={railSteps} orientation="vertical" ariaLabel="AI reasoning steps" />
    </MetralyDrawer>
  );
}
export default TraceDrawer;
