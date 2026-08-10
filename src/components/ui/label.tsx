import * as React from "react";
import { cn } from "@/lib/utils";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  /** Muted helper text rendered under the label. */
  hint?: string;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, hint, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("block text-sm font-medium text-ink-700", className)}
      {...props}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        {required && (
          <span className="text-danger" aria-hidden="true">
            *
          </span>
        )}
      </span>
      {hint && <span className="mt-0.5 block text-xs font-normal text-ink-500">{hint}</span>}
    </label>
  )
);
Label.displayName = "Label";

/** Label + control + optional error, with consistent vertical rhythm. */
export function Field({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
  className,
}: {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={htmlFor} required={required} hint={hint}>
          {label}
        </Label>
      )}
      {children}
      {error && (
        <p className="text-xs font-medium text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export { Label };
