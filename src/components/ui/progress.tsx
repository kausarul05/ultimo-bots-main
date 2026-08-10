import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps {
  value: number;
  max?: number;
  /** Colours the bar by how close to the limit it is (used for usage meters). */
  tone?: "brand" | "auto";
  className?: string;
  label?: string;
}

export function Progress({
  value,
  max = 100,
  tone = "brand",
  className,
  label,
}: ProgressProps) {
  const pct = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

  const barColor =
    tone === "brand"
      ? "bg-primary"
      : pct >= 90
        ? "bg-danger"
        : pct >= 70
          ? "bg-warning"
          : "bg-success";

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-ink-200", className)}
    >
      <div
        className={cn("h-full rounded-full transition-[width] duration-500 ease-out", barColor)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
