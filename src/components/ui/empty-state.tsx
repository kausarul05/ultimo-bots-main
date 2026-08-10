import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  /** "panel" draws its own dashed container; "bare" sits inside an existing card. */
  variant?: "panel" | "bare";
  className?: string;
}

/**
 * Consistent zero-data state. Every dashboard page rolled its own before,
 * with different icon sizes, copy weights and spacing.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  variant = "bare",
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-6 py-12 text-center",
        variant === "panel" && "rounded-card border border-dashed border-ink-300 bg-ink-50/50",
        className
      )}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <p className="text-sm font-semibold text-foreground">{title}</p>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-ink-500">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
