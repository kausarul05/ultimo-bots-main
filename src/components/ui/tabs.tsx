"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TabItem<T extends string = string> {
  value: T;
  label: string;
  badge?: string;
}

export interface TabsProps<T extends string = string> {
  tabs: readonly TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  /** "underline" for page-level navigation, "pill" for in-panel switching. */
  variant?: "underline" | "pill";
  className?: string;
  "aria-label"?: string;
}

/**
 * Controlled tab bar with roving-focus arrow-key navigation, matching the
 * WAI-ARIA tabs pattern. Panels are rendered by the caller.
 */
export function Tabs<T extends string = string>({
  tabs,
  value,
  onChange,
  variant = "underline",
  className,
  "aria-label": ariaLabel,
}: TabsProps<T>) {
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const last = tabs.length - 1;
    let next: number | null = null;

    if (e.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (e.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;

    if (next !== null) {
      e.preventDefault();
      onChange(tabs[next].value);
      refs.current[next]?.focus();
    }
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "flex items-center overflow-x-auto scrollbar-slim",
        variant === "underline"
          ? "gap-1 border-b border-border"
          : "gap-1 rounded-field bg-ink-100 p-1",
        className
      )}
    >
      {tabs.map((tab, i) => {
        const active = tab.value === value;
        return (
          <button
            key={tab.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            type="button"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(tab.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={cn(
              "relative whitespace-nowrap text-sm font-medium transition-all duration-150",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              variant === "underline"
                ? cn(
                    "-mb-px border-b-2 px-4 py-2.5",
                    active
                      ? "border-primary text-primary"
                      : "border-transparent text-ink-500 hover:border-ink-300 hover:text-foreground"
                  )
                : cn(
                    "flex-1 rounded-[calc(var(--radius-field)-2px)] px-3.5 py-1.5",
                    active
                      ? "bg-card text-foreground shadow-xs"
                      : "text-ink-500 hover:text-foreground"
                  )
            )}
          >
            <span className="inline-flex items-center gap-2">
              {tab.label}
              {tab.badge && (
                <span className="rounded-full bg-primary px-1.5 py-0.5 text-[0.625rem] font-bold uppercase leading-none text-primary-foreground">
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
