"use client";

import * as React from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  /** Renders the dash state for "some but not all children selected". */
  indeterminate?: boolean;
  disabled?: boolean;
  label?: React.ReactNode;
  description?: string;
  id?: string;
  className?: string;
}

/**
 * Custom-rendered checkbox with a real input underneath, so it stays
 * keyboard- and screen-reader-accessible while looking consistent across
 * browsers.
 */
export function Checkbox({
  checked,
  onCheckedChange,
  indeterminate,
  disabled,
  label,
  description,
  id,
  className,
}: CheckboxProps) {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  const inputRef = React.useRef<HTMLInputElement>(null);

  // indeterminate is a DOM property, not an attribute — it has to be set here.
  React.useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = Boolean(indeterminate);
  }, [indeterminate]);

  const control = (
    <span className="relative inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center">
      <input
        ref={inputRef}
        id={inputId}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-[5px] border border-input bg-card transition-colors checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:bg-ink-100"
      />
      <span className="pointer-events-none text-white opacity-0 transition-opacity peer-checked:opacity-100 peer-indeterminate:opacity-100">
        {indeterminate ? (
          <Minus className="h-3 w-3" strokeWidth={3} />
        ) : (
          <Check className="h-3 w-3" strokeWidth={3.5} />
        )}
      </span>
    </span>
  );

  if (!label) return <span className={className}>{control}</span>;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-field px-2 py-1.5 transition-colors hover:bg-ink-50",
        disabled && "cursor-not-allowed opacity-55",
        className
      )}
    >
      <span className="mt-0.5">{control}</span>
      <span className="min-w-0 space-y-0.5">
        <span className="block text-sm text-foreground">{label}</span>
        {description && <span className="block text-xs text-ink-500">{description}</span>}
      </span>
    </label>
  );
}
