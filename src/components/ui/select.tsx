import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

/**
 * Styled native <select>. Native is deliberate here: it gets correct
 * keyboard behaviour, mobile pickers and screen-reader support for free.
 * The previous "Select Bot" controls were plain buttons that did nothing.
 */
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, invalid, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          "h-11 w-full appearance-none rounded-field border bg-card pl-3.5 pr-10 text-sm text-foreground",
          "shadow-xs transition-colors duration-150 cursor-pointer",
          "focus:outline-none focus:border-primary focus:ring-4 focus:ring-brand-100",
          "disabled:cursor-not-allowed disabled:bg-ink-50 disabled:text-ink-400",
          invalid ? "border-danger" : "border-input",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
        aria-hidden="true"
      />
    </div>
  )
);
Select.displayName = "Select";

export { Select };
