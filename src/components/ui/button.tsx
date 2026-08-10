import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-field",
    "font-medium leading-none transition-all duration-150",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "disabled:pointer-events-none disabled:opacity-55",
    // Icons inside buttons should never be stretched by flex.
    "[&_svg]:shrink-0 [&_svg]:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary-hover hover:shadow-brand active:scale-[0.985]",
        /** Alias of `primary`, kept so existing marketing call sites keep working. */
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary-hover hover:shadow-brand active:scale-[0.985]",
        gradient:
          "bg-brand-gradient text-white shadow-xs hover:shadow-brand active:scale-[0.985]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-ink-200 active:scale-[0.985]",
        outline:
          "border border-input bg-card text-foreground shadow-xs hover:bg-ink-50 hover:border-ink-400 active:scale-[0.985]",
        ghost: "text-ink-600 hover:bg-ink-100 hover:text-foreground",
        subtle: "bg-accent text-accent-foreground hover:bg-brand-100",
        danger:
          "bg-danger text-white shadow-xs hover:bg-red-700 active:scale-[0.985]",
        link: "text-primary underline-offset-4 hover:underline hover:text-brand-700",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-5 text-[0.9375rem]",
        xl: "h-12 px-6 text-base",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
      },
      full: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Shows a spinner and blocks interaction while an action is in flight. */
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, full, asChild = false, loading = false, children, disabled, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    // asChild forwards to a single child element, so a spinner can't be
    // injected alongside it — render the child untouched in that case.
    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, full, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, full, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
