import { cn } from "@/lib/utils";

/** Shimmering placeholder used while data or auth state is resolving. */
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded-field bg-ink-200/70 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent)] bg-[length:200%_100%] animate-shimmer",
        className
      )}
      {...props}
    />
  );
}
