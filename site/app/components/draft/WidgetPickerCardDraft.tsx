import { WidgetPickerCard } from "@metraly/ui";

type WidgetPickerCardDraftProps = {
  title?: string;
  description?: string;
  selected?: boolean;
  iconLabel?: string;
  tags?: string[];
  state?: "live" | "stale" | "delayed" | "disconnected" | "no-data";
};

const stateMap = {
  live: "live",
  stale: "stale",
  delayed: "delayed",
  disconnected: "disconnected",
  "no-data": "noData",
} as const;

export default function WidgetPickerCardDraft({
  title = "Flow efficiency",
  description = "Track delivery throughput, review health and deployment flow.",
  selected = true,
  iconLabel = "pulse",
  tags = ["github", "telemetry"],
  state = "live",
}: WidgetPickerCardDraftProps) {
  const normalizedState = stateMap[state];
  const stateLabel = state === "no-data" ? "No data" : state[0].toUpperCase() + state.slice(1);

  return (
    <WidgetPickerCard
      title={title}
      description={description}
      selected={selected}
      iconLabel={iconLabel}
      tags={tags}
      state={normalizedState}
      stateLabel={stateLabel}
      className="widget-picker-card-draft"
    />
  );
}
