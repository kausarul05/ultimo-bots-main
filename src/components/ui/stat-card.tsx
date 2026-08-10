import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  /** Percentage change vs. the previous period. Positive renders as a rise. */
  delta?: number;
  hint?: string;
  className?: string;
}

/**
 * KPI tile. The value leads visually; the label sits beneath it in muted
 * text so a row of tiles scans as numbers first.
 */
export function StatCard({
  label,
  value,
  icon: Icon,
  delta,
  hint,
  className,
}: StatCardProps) {
  const hasDelta = typeof delta === "number" && Number.isFinite(delta);
  const rising = hasDelta && delta! >= 0;

  return (
    <div
      className={cn(
        "rounded-card border border-border bg-card p-5 shadow-card transition-all duration-200 hover:border-brand-300 hover:shadow-card-hover",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-ink-500">{label}</p>
        {Icon && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-field bg-brand-50 text-brand-600">
            <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2.5">
        <span className="text-3xl font-bold tracking-tight text-foreground tabular-nums">
          {value}
        </span>
        {hasDelta && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-semibold",
              rising ? "text-success" : "text-danger"
            )}
          >
            {rising ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            {Math.abs(delta!)}%
          </span>
        )}
      </div>

      {hint && <p className="mt-1 text-xs text-ink-400">{hint}</p>}
    </div>
  );
}
