import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...props }, ref) => (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        "w-full rounded-field border bg-card px-3.5 py-3 text-sm text-foreground",
        "shadow-xs transition-colors duration-150 resize-y min-h-24",
        "placeholder:text-ink-400",
        "focus:outline-none focus:border-primary focus:ring-4 focus:ring-brand-100",
        "disabled:cursor-not-allowed disabled:bg-ink-50 disabled:text-ink-400",
        invalid
          ? "border-danger focus:border-danger focus:ring-danger-soft"
          : "border-input",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

/**
 * Character counter that turns amber as the limit approaches and red once
 * it is hit, so the constraint is visible before it bites.
 */
export function CharCount({
  value,
  max,
  className,
}: {
  value: number;
  max: number;
  className?: string;
}) {
  const ratio = max > 0 ? value / max : 0;
  return (
    <div
      className={cn(
        "mt-1.5 text-right text-xs tabular-nums",
        ratio >= 1 ? "text-danger font-medium" : ratio >= 0.9 ? "text-warning" : "text-ink-400",
        className
      )}
    >
      {value}/{max}
    </div>
  );
}

export { Textarea };
