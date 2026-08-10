import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border font-medium whitespace-nowrap [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        neutral: "border-border bg-ink-100 text-ink-700",
        brand: "border-brand-200 bg-brand-50 text-brand-800",
        solid: "border-transparent bg-primary text-primary-foreground",
        success: "border-success-border bg-success-soft text-success",
        warning: "border-warning-border bg-warning-soft text-warning",
        danger: "border-danger-border bg-danger-soft text-danger",
        info: "border-info-border bg-info-soft text-info",
        outline: "border-border bg-transparent text-ink-600",
      },
      size: {
        sm: "px-2 py-0.5 text-[0.6875rem] [&_svg]:h-3 [&_svg]:w-3",
        md: "px-2.5 py-1 text-xs [&_svg]:h-3.5 [&_svg]:w-3.5",
      },
    },
    defaultVariants: { variant: "neutral", size: "md" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

/** Small coloured dot + label, for live/paused style states. */
export function StatusDot({
  status,
  label,
  className,
}: {
  status: "active" | "inactive" | "pending";
  label?: string;
  className?: string;
}) {
  const tone = {
    active: "bg-success",
    inactive: "bg-ink-400",
    pending: "bg-warning",
  }[status];

  return (
    <span className={cn("inline-flex items-center gap-2 text-xs text-ink-600", className)}>
      <span className="relative flex h-2 w-2">
        {status === "active" && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
        )}
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", tone)} />
      </span>
      {label ?? status}
    </span>
  );
}

export { badgeVariants };
