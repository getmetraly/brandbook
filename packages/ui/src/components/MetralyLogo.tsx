import * as React from "react";

type MetralyLogoProps = {
  variant?: "mark" | "horizontal";
  tone?: "dark" | "light" | "mono";
  className?: string;
  title?: string;
};

export function MetralyLogo({
  variant = "horizontal",
  tone = "dark",
  className,
  title = "Metraly",
}: MetralyLogoProps) {
  const mark = (
    <svg viewBox="0 0 128 128" className="metraly-logo-mark" fill="none" aria-hidden="true">
      <rect x="8" y="8" width="112" height="112" rx="18" fill="var(--m-bg-2)" stroke="var(--m-line)" />
      <path d="M20 84H36L44 60L54 96L66 42L78 84H108" stroke="var(--m-cyan-500)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  if (variant === "mark") {
    return (
      <span className={["metraly-logo-mark", className].filter(Boolean).join(" ")} aria-label={title} data-tone={tone}>
        {mark}
      </span>
    );
  }

  return (
    <span className={["metraly-logo-wordmark", className].filter(Boolean).join(" ")} aria-label={title} data-tone={tone}>
      {mark}
      <span className="metraly-logo-wordmark__text">Metraly</span>
    </span>
  );
}

export default MetralyLogo;
