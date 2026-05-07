import * as React from "react";

type MetralyLogoProps = {
  variant?: "mark" | "horizontal";
  tone?: "dark" | "light" | "mono";
  className?: string;
  title?: string;
};

const toneClass = {
  dark: "text-[#f0f4f8]",
  light: "text-[#0d1117]",
  mono: "text-current",
} as const;

export function MetralyLogo({
  variant = "horizontal",
  tone = "dark",
  className,
  title = "Metraly",
}: MetralyLogoProps) {
  const mark = (
    <svg viewBox="0 0 128 128" className={variant === "mark" ? "h-8 w-8" : "h-9 w-9"} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="metraly-react-gradient" x1="18" y1="64" x2="112" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={tone === "mono" ? "currentColor" : "#00E5CC"} />
          <stop offset="0.62" stopColor={tone === "mono" ? "currentColor" : "#00E5CC"} />
          <stop offset="1" stopColor={tone === "mono" ? "currentColor" : "#A855F7"} />
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="112" height="112" rx="28" fill={tone === "light" ? "#ffffff" : "#0b0f14"} />
      <rect x="8.5" y="8.5" width="111" height="111" rx="27.5" stroke="currentColor" strokeOpacity="0.12" />
      <path
        d="M18 68H34L41 42L53 92L67 28L80 68H110"
        stroke="url(#metraly-react-gradient)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (variant === "mark") {
    return (
      <span className={["inline-flex items-center", toneClass[tone], className].filter(Boolean).join(" ")} aria-label={title}>
        {mark}
      </span>
    );
  }

  return (
    <span className={["inline-flex items-center gap-2.5 font-display font-bold tracking-[-0.035em]", toneClass[tone], className].filter(Boolean).join(" ")} aria-label={title}>
      {mark}
      <span className="text-[1.45rem] leading-none">Metraly</span>
    </span>
  );
}

export default MetralyLogo;
