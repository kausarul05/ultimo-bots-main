import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Renders the error state and wires aria-invalid for assistive tech. */
  invalid?: boolean;
  /** Icon rendered inside the field, on the leading edge. */
  leadingIcon?: React.ReactNode;
  /** Node rendered inside the field, on the trailing edge (e.g. a reveal button). */
  trailing?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, invalid, leadingIcon, trailing, ...props }, ref) => {
    const field = (
      <input
        type={type}
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          "h-11 w-full rounded-field border bg-card px-3.5 text-sm text-foreground",
          "shadow-xs transition-colors duration-150",
          "placeholder:text-ink-400",
          "focus:outline-none focus:border-primary focus:ring-4 focus:ring-brand-100",
          "disabled:cursor-not-allowed disabled:bg-ink-50 disabled:text-ink-400",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          invalid
            ? "border-danger focus:border-danger focus:ring-danger-soft"
            : "border-input",
          leadingIcon && "pl-10",
          trailing && "pr-10",
          className
        )}
        {...props}
      />
    );

    if (!leadingIcon && !trailing) return field;

    return (
      <div className="relative w-full">
        {leadingIcon && (
          <span
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400 [&_svg]:h-4 [&_svg]:w-4"
            aria-hidden="true"
          >
            {leadingIcon}
          </span>
        )}
        {field}
        {trailing && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 [&_svg]:h-4 [&_svg]:w-4">
            {trailing}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
